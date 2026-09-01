/**
 * NGEN forms backend — Google Apps Script Web App.
 * ---------------------------------------------------------------------
 * Handles the forms on the site:
 *   - Newsletter signup (site-wide footer + homepage)      -> formType: "newsletter"
 *   - Contact / apply form                                 -> formType: "contact"
 *   - Investor deal-flow request (/capital-network/investors) -> formType: "investor-request"
 *
 * All are posted as JSON (see src/lib/submitToAppsScript.js on the
 * Next.js side). Every submission is appended as a row to a tab in the
 * Google Sheet named in SPREADSHEET_ID below; a submitted resume file
 * (contact form only) is saved into the Drive folder named in
 * DRIVE_FOLDER_ID and linked from the sheet row.
 *
 * See SETUP.md at the project root for how to wire this up end to end —
 * this file alone does nothing until it's pasted into an Apps Script
 * project, the two IDs below are filled in, and it's deployed as a Web
 * App.
 */

// Fill these in — see SETUP.md steps 1 and 2 for where to find them.
const SPREADSHEET_ID = "PUT_YOUR_GOOGLE_SHEET_ID_HERE";
const DRIVE_FOLDER_ID = "PUT_YOUR_DRIVE_FOLDER_ID_HERE";

const RESUME_MIME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.formType === "newsletter") {
      return handleNewsletter(data);
    }
    if (data.formType === "contact") {
      return handleContact(data);
    }
    if (data.formType === "investor-request") {
      return handleInvestorRequest(data);
    }
    return jsonResponse({ ok: false, error: "Unknown form type." });
  } catch (err) {
    return jsonResponse({ ok: false, error: "Server error: " + err.message });
  }
}

// Lets you open the deployed URL directly in a browser to confirm it's
// live, without submitting anything.
function doGet() {
  return ContentService.createTextOutput("NGEN forms backend is running.");
}

function handleNewsletter(data) {
  const email = (data.email || "").trim();
  if (!email) {
    return jsonResponse({ ok: false, error: "Email is required." });
  }

  const sheet = getOrCreateSheet("Newsletter", ["Timestamp", "Email"]);

  // Skip exact duplicates so re-submitting doesn't pile up repeat rows.
  const existingEmails = sheet
    .getRange(2, 2, Math.max(sheet.getLastRow() - 1, 0), 1)
    .getValues()
    .flat();
  if (existingEmails.some((e) => String(e).toLowerCase() === email.toLowerCase())) {
    return jsonResponse({ ok: true });
  }

  sheet.appendRow([new Date(), email]);
  return jsonResponse({ ok: true });
}

function handleContact(data) {
  const firstName = (data.firstName || "").trim();
  const lastName = (data.lastName || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return jsonResponse({ ok: false, error: "Please fill in all required fields." });
  }

  let resumeLink = "";
  if (data.resumeBase64 && data.resumeFileName) {
    try {
      resumeLink = saveResume(data.resumeBase64, data.resumeFileName);
    } catch (err) {
      // Don't fail the whole submission just because the resume upload
      // broke — the message itself still matters.
      resumeLink = "Upload failed: " + err.message;
    }
  }

  const sheet = getOrCreateSheet("Contact", [
    "Timestamp",
    "First Name",
    "Last Name",
    "Email",
    "Message",
    "Resume",
  ]);
  sheet.appendRow([new Date(), firstName, lastName, email, message, resumeLink]);
  return jsonResponse({ ok: true });
}

function handleInvestorRequest(data) {
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const role = (data.role || "").trim();

  if (!name || !email || !role) {
    return jsonResponse({ ok: false, error: "Please fill in all required fields." });
  }

  const sheet = getOrCreateSheet("Investor Requests", [
    "Timestamp",
    "Name",
    "Email",
    "Role",
    "Sectors",
    "Check Size",
    "LinkedIn / Fund URL",
  ]);
  sheet.appendRow([
    new Date(),
    name,
    email,
    role,
    data.sectors || "",
    data.checkSize || "",
    data.linkedin || "",
  ]);
  return jsonResponse({ ok: true });
}

function saveResume(base64, fileName) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const mimeType = RESUME_MIME_TYPES[ext] || MimeType.PLAIN_TEXT;

  const bytes = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(bytes, mimeType, fileName);
  const file = folder.createFile(blob);

  // Anyone with the link can view it — lets whoever reads the sheet
  // open the resume without needing Drive access to the folder itself.
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateSheet(name, headerRow) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.getRange(1, 1, 1, headerRow.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once manually from the Apps Script editor (select it in the
 * function dropdown, then click Run) to confirm SPREADSHEET_ID and
 * DRIVE_FOLDER_ID are both correct before wiring up the live site — it
 * writes one obviously-fake row to each tab and uploads one tiny test
 * file, so you can check the Sheet and Drive folder by hand.
 */
function test_verifySetup() {
  handleNewsletter({ email: "setup-test@example.com" });
  handleContact({
    firstName: "Setup",
    lastName: "Test",
    email: "setup-test@example.com",
    message: "This is a test row from test_verifySetup(). Safe to delete.",
    resumeBase64: Utilities.base64Encode("This is a test file."),
    resumeFileName: "setup-test.pdf",
  });
  Logger.log("Done — check the Sheet tabs and the Drive folder for the test rows/file.");
}
