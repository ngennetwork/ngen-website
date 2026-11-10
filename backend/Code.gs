/**
 * NGEN forms backend — Google Apps Script Web App.
 * ---------------------------------------------------------------------
 * Handles the forms on the site:
 *   - Newsletter signup (site-wide footer + homepage)      -> formType: "newsletter"
 *   - Contact / apply form                                 -> formType: "contact"
 *   - Investor deal-flow request (/capital-network/investors) -> formType: "investor-request"
 *   - Start-Up Challenge application (/startup-challenge/apply)
 *                                                          -> formType: "startup-challenge"
 *     Saves a sheet row, files the resume in Drive, emails
 *     info@ngennetwork.org with the resume attached, and emails the
 *     parent and school contact together (no attachment).
 *   - Start-Up Challenge eligibility lead (/startup-challenge)
 *                                                          -> formType: "startupChallengeLead"
 *     Saves a row on "Start-Up Challenge Leads", emails info@, and
 *     sends the parent a welcome note.
 *   - Info-session choice for that lead
 *                                                          -> formType: "startupChallengeSession"
 *     Updates the session column and emails a short confirmation.
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
    if (data.formType === "startup-challenge") {
      return handleStartupChallenge(data);
    }
    if (data.formType === "startupChallengeLead") {
      return handleStartupChallengeLead(data);
    }
    if (data.formType === "startupChallengeSession") {
      return handleStartupChallengeSession(data);
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

var CHALLENGE_INBOX = "info@ngennetwork.org";

function handleStartupChallenge(data) {
  var name = (data.name || "").trim();
  var email = (data.email || "").trim();
  var grade = (data.grade || "").trim();
  var school = (data.school || "").trim();
  var motivation = (data.motivation || "").trim();
  var applyingAs = (data.applyingAs || "").trim();
  var guardian = (data.guardian || "").trim();

  var parentName = (data.parentName || "").trim();
  var countryCity = (data.countryCity || "").trim();
  var age = (data.age || "").trim();
  var language = (data.language || "en").trim();
  var schoolContactName = (data.schoolContactName || "").trim();
  var schoolContactEmail = (data.schoolContactEmail || "").trim();
  if (!applyingAs) applyingAs = "parent";

  if (!name || !email || !grade || !school || !motivation || guardian !== "yes" || !parentName || !countryCity || !age) {
    return jsonResponse({ ok: false, error: "Please fill in all required fields." });
  }
  if (!isEmailAddress(schoolContactEmail)) {
    return jsonResponse({ ok: false, error: "School contact email is required." });
  }
  if (applyingAs === "team" && !(data.cofounderName || "").trim()) {
    return jsonResponse({ ok: false, error: "Co-founder name is required." });
  }
  if (!data.resumeBase64 || !data.resumeFileName) {
    return jsonResponse({ ok: false, error: "A resume file is required." });
  }

  var resumeLink = "";
  try {
    resumeLink = saveResume(data.resumeBase64, data.resumeFileName);
  } catch (err) {
    resumeLink = "Upload failed: " + err.message;
  }

  var emailStatus = "pending";
  try {
    MailApp.sendEmail({
      to: CHALLENGE_INBOX,
      replyTo: email,
      subject: "Start-Up Challenge application: " + name + " (" + school + ")",
      body: [
        "A parent applied for the NGEN Start-Up Challenge.",
        "",
        "Parent name: " + parentName,
        "Parent email: " + email,
        "Phone / WeChat / WhatsApp: " + (data.phone || ""),
        "Country and city: " + countryCity,
        "Student name: " + name,
        "Age: " + age,
        "Grade: " + grade,
        "School: " + school,
        "Interests: " + motivation,
        "Language: " + language,
        "Guardian confirmed: " + guardian,
        "School contact: " + schoolContactName,
        "School contact email: " + schoolContactEmail,
        "Resume: " + resumeLink,
      ].join("\n"),
      attachments: [resumeBlob(data.resumeBase64, data.resumeFileName)],
    });
    emailStatus = "sent";
  } catch (err) {
    emailStatus = "Email failed: " + err.message;
  }

  try {
    sendApplicationCopy(data, {
      parentName: parentName,
      email: email,
      schoolContactName: schoolContactName,
      schoolContactEmail: schoolContactEmail,
      name: name,
      age: age,
      grade: grade,
      school: school,
      motivation: motivation,
      language: language,
    });
  } catch (err) {
    // The info@ note already went out. A failed family copy should not drop the row.
  }

  var headers = [
    "Timestamp",
    "Name",
    "Email",
    "Grade",
    "Date of birth",
    "School",
    "Phone",
    "Motivation",
    "Applying as",
    "Co-founder name",
    "Co-founder email",
    "Co-founder school",
    "Guardian",
    "Resume",
    "Email status",
    "Parent name",
    "Country and city",
    "Student age",
    "Language",
    "schoolContactName",
    "schoolContactEmail",
  ];
  var sheet = getOrCreateSheet("Start-Up Challenge", headers);
  ensureTrailingHeaders(sheet, headers);
  sheet.appendRow([
    new Date(),
    name,
    email,
    grade,
    data.dob || "",
    school,
    data.phone || "",
    motivation,
    applyingAs,
    data.cofounderName || "",
    data.cofounderEmail || "",
    data.cofounderSchool || "",
    guardian,
    resumeLink,
    emailStatus,
    parentName,
    countryCity,
    age,
    language,
    schoolContactName,
    schoolContactEmail,
  ]);
  return jsonResponse({ ok: true });
}

function resumeBlob(base64, fileName) {
  var ext = (fileName.split(".").pop() || "").toLowerCase();
  var mimeType = RESUME_MIME_TYPES[ext] || MimeType.PLAIN_TEXT;
  var bytes = Utilities.base64Decode(base64);
  return Utilities.newBlob(bytes, mimeType, fileName);
}

function saveResume(base64, fileName) {
  var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var file = folder.createFile(resumeBlob(base64, fileName));

  // Anyone with the link can view it — lets whoever reads the sheet
  // open the resume without needing Drive access to the folder itself.
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function ensureTrailingHeaders(sheet, headerRow) {
  var width = Math.max(sheet.getLastColumn(), 1);
  if (!sheet.getRange(1, 1).getValue()) return;
  if (width >= headerRow.length) return;
  var extra = headerRow.slice(width);
  sheet.getRange(1, width + 1, 1, extra.length).setValues([extra]);
  sheet.getRange(1, width + 1, 1, extra.length).setFontWeight("bold");
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

function isEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function oneLine(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

// Fallback if the site does not send sessionOptions.
// Keep in sync with src/components/challenge/sessions.js.
var DEFAULT_SESSIONS = [
  {
    id: "2026-11-23",
    en: "Monday, November 23, 2026, 8:00 pm Hong Kong time (7:00 am New York)",
    zhHant: "星期一，2026年11月23日，香港時間晚上8:00（紐約時間上午7:00）",
    zhHans: "星期一，2026年11月23日，香港时间晚上8:00（纽约时间上午7:00）",
  },
  {
    id: "2026-11-24",
    en: "Tuesday, November 24, 2026, 8:00 pm Hong Kong time (7:00 am New York)",
    zhHant: "星期二，2026年11月24日，香港時間晚上8:00（紐約時間上午7:00）",
    zhHans: "星期二，2026年11月24日，香港时间晚上8:00（纽约时间上午7:00）",
  },
];

var LEAD_HEADERS = ["timestamp", "parentName", "parentEmail", "whatsapp", "gradeOrAge", "eligible", "language", "session"];
var CONSULT_URL = "https://www.ngennetwork.org/intro";
var ZOOM_URL = "https://www.ngennetwork.org/zoom";
var APPLY_URL = "https://www.ngennetwork.org/startup-challenge/apply";

function handleStartupChallengeLead(data) {
  var parentName = oneLine(data.parentName);
  var parentEmail = oneLine(data.parentEmail);
  var whatsapp = oneLine(data.whatsapp);
  var gradeOrAge = oneLine(data.gradeOrAge);
  var eligible = String(data.eligible || "").toLowerCase() === "yes" ? "yes" : "no";
  var language = oneLine(data.language) || "en";

  if (!parentName || !isEmailAddress(parentEmail) || !whatsapp || !gradeOrAge) {
    return jsonResponse({ ok: false, error: "Please fill in all required fields." });
  }

  var sheet = getOrCreateSheet("Start-Up Challenge Leads", LEAD_HEADERS);
  ensureTrailingHeaders(sheet, LEAD_HEADERS);
  sheet.appendRow([new Date(), parentName, parentEmail, whatsapp, gradeOrAge, eligible, language, ""]);
  var row = sheet.getLastRow();

  try {
    MailApp.sendEmail({
      to: CHALLENGE_INBOX,
      replyTo: parentEmail,
      subject: "New lead, send a personal WhatsApp within 24 hours",
      body: [
        "New lead, send a personal WhatsApp within 24 hours.",
        "",
        "Parent: " + parentName,
        "Email: " + parentEmail,
        "WhatsApp: " + whatsapp,
        "Grade or age: " + gradeOrAge,
        "Eligible: " + eligible,
        "Language: " + language,
      ].join("\n"),
    });
  } catch (err) {
    // The row is already saved. The team can still read it from the sheet.
  }

  try {
    MailApp.sendEmail({
      to: parentEmail,
      name: "NGEN",
      replyTo: CHALLENGE_INBOX,
      subject: leadSubject(language),
      body: leadWelcomeBody(language, parentName, sessionCatalog(data)),
    });
  } catch (err) {
    // Same: do not fail the lead if the welcome note cannot be sent.
  }

  return jsonResponse({ ok: true, row: row, eligible: eligible === "yes" });
}

function handleStartupChallengeSession(data) {
  var parentEmail = oneLine(data.parentEmail).toLowerCase();
  var sessionId = oneLine(data.sessionId);
  var language = oneLine(data.language) || "en";
  var catalog = sessionCatalog(data);
  var chosen = null;
  for (var i = 0; i < catalog.length; i++) {
    if (catalog[i].id === sessionId) chosen = catalog[i];
  }
  if (!isEmailAddress(parentEmail) || !chosen) {
    return jsonResponse({ ok: false, error: "Unknown session." });
  }

  var sheet = getOrCreateSheet("Start-Up Challenge Leads", LEAD_HEADERS);
  var found = findLeadRow(sheet, parentEmail, data.row);
  if (found < 0) return jsonResponse({ ok: false, error: "Lead not found." });

  var english = sessionLine(chosen, "en");
  sheet.getRange(found, 8).setValue(english);

  var parentName = oneLine(sheet.getRange(found, 2).getValue());
  try {
    MailApp.sendEmail({
      to: parentEmail,
      name: "NGEN",
      replyTo: CHALLENGE_INBOX,
      subject: sessionSubject(language),
      body: sessionConfirmBody(language, parentName, sessionLine(chosen, language), english),
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: "Email failed: " + err.message });
  }
  return jsonResponse({ ok: true });
}

function findLeadRow(sheet, email, rowHint) {
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var hint = Number(rowHint);
  if (hint >= 2 && hint <= last) {
    var hinted = String(sheet.getRange(hint, 3).getValue() || "").toLowerCase();
    if (hinted === email) return hint;
  }
  var values = sheet.getRange(2, 3, last - 1, 1).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0] || "").toLowerCase() === email) return i + 2;
  }
  return -1;
}

function clipSessionLine(value) {
  var text = String(value || "").replace(/[\r\n]+/g, " ").trim();
  if (!text || text.length > 180) return "";
  if (/https?:/i.test(text)) return "";
  return text;
}

function sessionCatalog(data) {
  var incoming = data && data.sessionOptions;
  if (!incoming || !incoming.length) return DEFAULT_SESSIONS;
  var clean = [];
  for (var i = 0; i < incoming.length && i < 4; i++) {
    var item = incoming[i] || {};
    var id = String(item.id || "");
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(id)) return DEFAULT_SESSIONS;
    var en = clipSessionLine(item.en);
    if (!en) return DEFAULT_SESSIONS;
    clean.push({
      id: id,
      en: en,
      zhHant: clipSessionLine(item.zhHant) || en,
      zhHans: clipSessionLine(item.zhHans) || en,
    });
  }
  return clean.length ? clean : DEFAULT_SESSIONS;
}

function sessionLine(option, language) {
  if (language === "zh-Hant") return option.zhHant || option.en;
  if (language === "zh-Hans") return option.zhHans || option.en;
  return option.en;
}

function leadSubject(language) {
  if (language === "zh-Hant") return "NGEN 創業挑戰";
  if (language === "zh-Hans") return "NGEN 创业挑战";
  return "NGEN Start-Up Challenge";
}

function sessionSubject(language) {
  if (language === "zh-Hant") return "您的 NGEN 網上簡介會";
  if (language === "zh-Hans") return "您的 NGEN 网上简介会";
  return "Your NGEN info session";
}

function leadWelcomeBody(language, parentName, catalog) {
  var local = leadCopy(language, parentName, catalog);
  if (language === "en") return local;
  return local + "\n\n---\n\n" + leadCopy("en", parentName, catalog);
}

function leadCopy(language, parentName, catalog) {
  var lines = [];
  var sessionsText = catalog.map(function (option) {
    return sessionLine(option, language);
  }).join("\n");
  if (language === "zh-Hant") {
    lines.push(parentName + " 您好：");
    lines.push("多謝您查詢 NGEN 創業挑戰。");
    lines.push("學生用六個月建立一間真實的公司，時間為2027年1月至6月，導師是常春藤大學的學生創辦人。");
    lines.push("申請時不需要已有公司或想法。家庭和學校都會收到進度。");
    lines.push("獲選學生於4月到紐約四天，包括4月16日的 Founder Trek，以及4月17日的常春藤創業會議。");
    lines.push("課程費用和付款方式，會在個別諮詢時說明。\n" + CONSULT_URL);
    lines.push("網上簡介會（30分鐘，Zoom）：\n" + sessionsText + "\n" + ZOOM_URL);
    lines.push("完整申請表：\n" + APPLY_URL);
    lines.push("NGEN");
    return lines.join("\n\n");
  }
  if (language === "zh-Hans") {
    lines.push(parentName + " 您好：");
    lines.push("谢谢您查询 NGEN 创业挑战。");
    lines.push("学生用六个月建立一家真实的公司，时间为2027年1月至6月，导师是常春藤大学的学生创办人。");
    lines.push("申请时不需要已有公司或想法。家庭和学校都会收到进度。");
    lines.push("获选学生于4月前往纽约四天，包括4月16日的 Founder Trek，以及4月17日的常春藤创业会议。");
    lines.push("课程费用和付款方式，会在个别咨询时说明。\n" + CONSULT_URL);
    lines.push("网上简介会（30分钟，Zoom）：\n" + sessionsText + "\n" + ZOOM_URL);
    lines.push("完整申请表：\n" + APPLY_URL);
    lines.push("NGEN");
    return lines.join("\n\n");
  }
  lines.push("Hello " + parentName + ",");
  lines.push("Thank you for writing to us about the NGEN Start-Up Challenge.");
  lines.push("Students build a real company over six months, from January to June 2027, with an Ivy League student founder as the mentor.");
  lines.push("No company or idea is needed to apply. Families and schools stay in the loop.");
  lines.push("Selected students spend four days in New York in April, including Founder Trek on April 16 and the Ivy League Entrepreneurship Conference on April 17.");
  lines.push("Program fees and payment options are shared during your private consultation.\n" + CONSULT_URL);
  lines.push("Online info sessions, 30 minutes on Zoom:\n" + sessionsText + "\n" + ZOOM_URL);
  lines.push("Full application:\n" + APPLY_URL);
  lines.push("NGEN");
  return lines.join("\n\n");
}

function sessionConfirmBody(language, parentName, localLine, englishLine) {
  var local = sessionCopy(language, parentName, language === "en" ? englishLine : localLine);
  if (language === "en") return local;
  return local + "\n\n---\n\n" + sessionCopy("en", parentName, englishLine);
}

function sessionCopy(language, parentName, when) {
  if (language === "zh-Hant") {
    return [
      parentName + " 您好：",
      "已為您預留 NGEN 創業挑戰的網上簡介會。",
      when,
      "30分鐘，Zoom：" + ZOOM_URL,
      "到時見。",
      "NGEN",
    ].join("\n\n");
  }
  if (language === "zh-Hans") {
    return [
      parentName + " 您好：",
      "已为您预留 NGEN 创业挑战的网上简介会。",
      when,
      "30分钟，Zoom：" + ZOOM_URL,
      "到时见。",
      "NGEN",
    ].join("\n\n");
  }
  return [
    "Hello " + parentName + ",",
    "You are signed up for the NGEN Start-Up Challenge online info session.",
    when,
    "30 minutes on Zoom: " + ZOOM_URL,
    "We will see you there.",
    "NGEN",
  ].join("\n\n");
}

function sendApplicationCopy(data, fields) {
  var recipients = [];
  if (isEmailAddress(fields.email)) recipients.push(fields.email);
  if (isEmailAddress(fields.schoolContactEmail) && fields.schoolContactEmail.toLowerCase() !== String(fields.email || "").toLowerCase()) {
    recipients.push(fields.schoolContactEmail);
  }
  if (!recipients.length) return;
  var language = fields.language || "en";
  MailApp.sendEmail({
    to: recipients.join(","),
    name: "NGEN",
    replyTo: CHALLENGE_INBOX,
    subject: applicationSubject(language),
    body: applicationBody(language, fields),
  });
}

function applicationSubject(language) {
  if (language === "zh-Hant") return "已收到創業挑戰申請";
  if (language === "zh-Hans") return "已收到创业挑战申请";
  return "We received the Start-Up Challenge application";
}

function applicationBody(language, fields) {
  var local = applicationCopy(language, fields);
  if (language === "en") return local;
  return local + "\n\n---\n\n" + applicationCopy("en", fields);
}

function applicationCopy(language, fields) {
  var schoolContact = fields.schoolContactName || "—";
  if (language === "zh-Hant") {
    return [
      fields.parentName + " 您好：",
      "我們已收到 " + fields.name + " 的創業挑戰申請。這封信同時發給家長和學校聯絡人。",
      "學生：" + fields.name + "\n年齡：" + fields.age + "\n年級：" + fields.grade + "\n學校：" + fields.school + "\n學校聯絡人：" + schoolContact + "\n興趣：" + fields.motivation,
      "接下來\n我們會閱讀申請，並以電郵回覆。\n課程由2027年1月進行至6月。\n課程費用和付款方式，會在個別諮詢時說明：\n" + CONSULT_URL + "\n獲選學生可能於4月到紐約四天。",
      "如有問題，直接回覆這封信即可。",
      "NGEN",
    ].join("\n\n");
  }
  if (language === "zh-Hans") {
    return [
      fields.parentName + " 您好：",
      "我们已收到 " + fields.name + " 的创业挑战申请。这封信同时发给家长和学校联系人。",
      "学生：" + fields.name + "\n年龄：" + fields.age + "\n年级：" + fields.grade + "\n学校：" + fields.school + "\n学校联系人：" + schoolContact + "\n兴趣：" + fields.motivation,
      "接下来\n我们会阅读申请，并以邮件回复。\n课程由2027年1月进行至6月。\n课程费用和付款方式，会在个别咨询时说明：\n" + CONSULT_URL + "\n获选学生可能于4月前往纽约四天。",
      "如有问题，直接回复这封信即可。",
      "NGEN",
    ].join("\n\n");
  }
  return [
    "Hello " + fields.parentName + ",",
    "We received the Start-Up Challenge application for " + fields.name + ". This copy goes to the parent and the school contact.",
    "Student: " + fields.name + "\nAge: " + fields.age + "\nGrade: " + fields.grade + "\nSchool: " + fields.school + "\nSchool contact: " + schoolContact + "\nInterests: " + fields.motivation,
    "What happens next\nWe read the application and reply by email.\nThe program runs from January to June 2027.\nProgram fees and payment options are shared during your private consultation:\n" + CONSULT_URL + "\nSelected students may spend four days in New York in April.",
    "Reply to this email if you have a question.",
    "NGEN",
  ].join("\n\n");
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
  // Every test email goes to info@ngennetwork.org, and nowhere else.
  handleStartupChallenge({
    name: "Setup Test",
    email: CHALLENGE_INBOX,
    grade: "11",
    school: "Setup High School",
    motivation: "This is a test row from test_verifySetup(). Safe to delete.",
    applyingAs: "parent",
    guardian: "yes",
    parentName: "Setup Parent",
    countryCity: "Hong Kong",
    age: "16",
    language: "en",
    schoolContactName: "Setup School",
    schoolContactEmail: CHALLENGE_INBOX,
    resumeBase64: Utilities.base64Encode("This is a test file."),
    resumeFileName: "setup-test.pdf",
  });
  handleStartupChallengeLead({
    parentName: "Setup Parent",
    parentEmail: CHALLENGE_INBOX,
    whatsapp: "+852 00000000",
    gradeOrAge: "grade 11",
    eligible: "yes",
    language: "en",
  });
  handleStartupChallengeSession({
    parentEmail: CHALLENGE_INBOX,
    sessionId: "2026-11-23",
    language: "en",
  });
  Logger.log("Done — check the Sheet tabs, the Drive folder, and info@ only for the test emails.");
}
