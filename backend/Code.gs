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
  // A header-only sheet has no data rows; getRange rejects a row count of 0.
  const lastRow = sheet.getLastRow();
  const existingEmails = lastRow > 1 ? sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat() : [];
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

  // Leave the file on the folder's own sharing. Résumés stay private to
  // whoever already has access to the info@ Drive folder.
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

var LEAD_HEADERS = ["timestamp", "parentName", "parentEmail", "whatsapp", "gradeOrAge", "eligible", "language", "session", "note", "callLanguage"];
var CALL_LANGUAGES = { english: "English", mandarin: "Mandarin", cantonese: "Cantonese" };
var CONSULT_URL = "https://www.ngennetwork.org/intro";
var ZOOM_URL = "https://www.ngennetwork.org/zoom";
var APPLY_URL = "https://www.ngennetwork.org/startup-challenge/apply";

function handleStartupChallengeLead(data) {
  var parentName = oneLine(data.parentName);
  var parentEmail = oneLine(data.parentEmail);
  var whatsapp = oneLine(data.whatsapp);
  if (whatsapp === "—" || whatsapp === "-") whatsapp = "";
  var gradeOrAge = oneLine(data.gradeOrAge);
  var note = oneLine(data.note);
  var callLanguage = CALL_LANGUAGES[oneLine(data.callLanguage).toLowerCase()] || "";
  var eligible = String(data.eligible || "").toLowerCase() === "yes" ? "yes" : "no";
  var language = oneLine(data.language) || "en";

  if (!parentName || !isEmailAddress(parentEmail) || !gradeOrAge) {
    return jsonResponse({ ok: false, error: "Please fill in all required fields." });
  }

  var sheet = getOrCreateSheet("Start-Up Challenge Leads", LEAD_HEADERS);
  ensureTrailingHeaders(sheet, LEAD_HEADERS);
  sheet.appendRow([new Date(), parentName, parentEmail, whatsapp, gradeOrAge, eligible, language, "", note, callLanguage]);
  var row = sheet.getLastRow();

  try {
    MailApp.sendEmail({
      to: CHALLENGE_INBOX,
      replyTo: parentEmail,
      subject: "New consultation request, reach out within 24 hours",
      body: [
        "New consultation request, reach out within 24 hours.",
        "",
        "Parent: " + parentName,
        "Email: " + parentEmail,
        "WeChat, WhatsApp or phone: " + (whatsapp || "—"),
        "Grade or age: " + gradeOrAge,
        "Note: " + (note || "—"),
        "Call language: " + (callLanguage || "—"),
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
      body: leadWelcomeBody(language, parentName, oneLine(data.callLanguage).toLowerCase()),
      htmlBody: leadWelcomeHtml(language, parentName, oneLine(data.callLanguage).toLowerCase()),
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
  if (language === "zh-Hant") return "NGEN 全球學人計劃：已收到您的諮詢申請";
  if (language === "zh-Hans") return "NGEN 全球学人计划：已收到您的咨询申请";
  return "NGEN Global Fellowship: we received your request";
}

function sessionSubject(language) {
  if (language === "zh-Hant") return "您的 NGEN 網上簡介會";
  if (language === "zh-Hans") return "您的 NGEN 网上简介会";
  return "Your NGEN info session";
}

// The welcome email a family gets after requesting a consultation.
// Chinese versions carry the English copy underneath, for bilingual families.
// Keep in step with the fellowship page (src/components/challenge/locales).
var LEAD_COPY = {
  en: {
    program: "NGEN Global Fellowship",
    dates: "January to June 2027",
    hello: function (name) { return "Hello " + name + ","; },
    thanks: "Thank you for your interest in the NGEN Global Fellowship. We received your request for a consultation.",
    nextTitle: "What happens next",
    steps: [
      ["Book a time", "Choose a time for a private Zoom call with our team, or we will reach out within two business days."],
      ["Meet our team", "We answer your questions and share program fees and payment options."],
      ["Confirm a place", "Once you confirm, your student is matched with a mentor and a team, ready for January."],
    ],
    callIn: function (lang) { return "Your call will be in " + lang + "."; },
    languages: { english: "English", mandarin: "Mandarin", cantonese: "Cantonese" },
    book: "Book a consultation",
    cohort: "The first cohort has limited places. Requests close Monday, December 14, 2026.",
    glanceTitle: "The program at a glance",
    glance: [
      "Six months, January to June 2027, online from home.",
      "One mentorship session a week with an Ivy League student mentor.",
      "Fellows are paired up and work as a team, at least 2 hours a week.",
      "A monthly update letter for parents.",
      "A capstone presentation in June, with a certificate and a letter of recommendation from NGEN.",
      "Four days in New York in April: NGEN’s Founder Trek on April 16 and the invitation-only Ivy League Entrepreneurship Conference on April 17. Travel and accommodation are separate.",
    ],
    questions: "Questions? Just reply to this email.",
    sign: "The NGEN team",
    tagline: "The Ivy League entrepreneurship network",
  },
  "zh-Hans": {
    program: "NGEN 全球学人计划",
    dates: "2027年1月至6月",
    hello: function (name) { return name + " 您好："; },
    thanks: "感谢您关注 NGEN 全球学人计划。我们已收到您的咨询申请。",
    nextTitle: "接下来",
    steps: [
      ["预约时间", "选择一个时间，与我们的团队进行私人 Zoom 通话；我们也会在两个工作日内联系您。"],
      ["与团队见面", "我们会解答您的问题，并说明费用和付款方式。"],
      ["确认名额", "确认后，我们会为学生配对导师和团队，一月正式开始。"],
    ],
    callIn: function (lang) { return "通话语言：" + lang + "。"; },
    languages: { english: "英语", mandarin: "普通话", cantonese: "粤语" },
    book: "预约咨询",
    cohort: "首届名额有限，申请截止日期为2026年12月14日（星期一）。",
    glanceTitle: "课程一览",
    glance: [
      "为期六个月，2027年1月至6月，在家线上参加。",
      "每周一次与常春藤盟校学生导师的指导课。",
      "学人两两配对，以团队形式合作，每周至少2小时。",
      "每月寄给家长的进度更新信。",
      "6月的结业展示，并获颁证书及 NGEN 推荐信。",
      "4月在纽约四天：4月16日的 NGEN Founder Trek，以及4月17日仅限受邀者参加的常春藤盟校创业会议。交通和住宿另计。",
    ],
    questions: "如有任何问题，直接回复这封邮件即可。",
    sign: "NGEN 团队",
    tagline: "常春藤盟校创业网络",
  },
  "zh-Hant": {
    program: "NGEN 全球學人計劃",
    dates: "2027年1月至6月",
    hello: function (name) { return name + " 您好："; },
    thanks: "感謝您關注 NGEN 全球學人計劃。我們已收到您的諮詢申請。",
    nextTitle: "接下來",
    steps: [
      ["預約時間", "選擇一個時間，與我們的團隊進行私人 Zoom 通話；我們也會在兩個工作天內聯絡您。"],
      ["與團隊會面", "我們會解答您的問題，並說明費用和付款方式。"],
      ["確認名額", "確認後，我們會為學生配對導師和團隊，一月正式開始。"],
    ],
    callIn: function (lang) { return "通話語言：" + lang + "。"; },
    languages: { english: "英語", mandarin: "普通話", cantonese: "粵語" },
    book: "預約諮詢",
    cohort: "首屆名額有限，申請截止日期為2026年12月14日（星期一）。",
    glanceTitle: "課程一覽",
    glance: [
      "為期六個月，2027年1月至6月，在家線上參加。",
      "每週一次與常春藤盟校學生導師的指導課。",
      "學人兩兩配對，以團隊形式合作，每週至少2小時。",
      "每月寄給家長的進度更新信。",
      "6月的結業發表，並獲頒證書及 NGEN 推薦信。",
      "4月在紐約四天：4月16日的 NGEN Founder Trek，以及4月17日只限受邀者參加的常春藤盟校創業會議。交通和住宿另計。",
    ],
    questions: "如有任何問題，直接回覆這封電郵即可。",
    sign: "NGEN 團隊",
    tagline: "常春藤盟校創業網絡",
  },
};

var FELLOWSHIP_BANNER = "https://www.ngennetwork.org/startup-challenge/og-fellowship.jpg";

function leadCopyFor(language) {
  return LEAD_COPY[language] || LEAD_COPY.en;
}

function leadWelcomeBody(language, parentName, callLanguageKey) {
  var local = leadPlainText(language, parentName, callLanguageKey);
  if (language === "en") return local;
  return local + "\n\n---\n\n" + leadPlainText("en", parentName, callLanguageKey);
}

function leadPlainText(language, parentName, callLanguageKey) {
  var c = leadCopyFor(language);
  var lines = [c.hello(parentName), c.thanks, c.nextTitle];
  c.steps.forEach(function (step, i) {
    var text = (i + 1) + ". " + step[0] + ": " + step[1];
    if (i === 0) text += "\n" + CONSULT_URL;
    if (i === 1 && c.languages[callLanguageKey]) text += " " + c.callIn(c.languages[callLanguageKey]);
    lines.push(text);
  });
  lines.push(c.cohort);
  lines.push(c.glanceTitle + "\n" + c.glance.map(function (item) { return "• " + item; }).join("\n"));
  lines.push(c.questions);
  lines.push(c.sign + "\n" + c.tagline);
  return lines.join("\n\n");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}

// Email-safe HTML in the fellowship page's look: forest green, cream,
// a serif for headings. Tables and inline styles only.
function leadWelcomeHtml(language, parentName, callLanguageKey) {
  var GREEN = "#1c3a2a";
  var CREAM = "#fbfaf7";
  var PAGE = "#f3f1ec";
  var INK = "#151815";
  var SLATE = "#4a4f4a";
  var SERIF = "Georgia, 'Times New Roman', serif";
  var SANS = "'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";

  function section(lang, withBanner) {
    var c = leadCopyFor(lang);
    var steps = c.steps.map(function (step, i) {
      var extra = "";
      if (i === 1 && c.languages[callLanguageKey]) extra = " " + escapeHtml(c.callIn(c.languages[callLanguageKey]));
      return '<tr><td valign="top" style="padding:0 14px 16px 0;width:30px;">' +
        '<div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:' + GREEN + ';color:' + CREAM + ';text-align:center;font:600 13px ' + SANS + ';">' + (i + 1) + '</div></td>' +
        '<td valign="top" style="padding:2px 0 16px;font:15px/1.55 ' + SANS + ';color:' + SLATE + ';">' +
        '<span style="font:17px ' + SERIF + ';color:' + INK + ';">' + escapeHtml(step[0]) + '</span><br>' + escapeHtml(step[1]) + extra + '</td></tr>';
    }).join("");
    var glance = c.glance.map(function (item) {
      return '<tr><td valign="top" style="padding:0 10px 10px 0;color:' + GREEN + ';font:15px/1.55 ' + SANS + ';">&#9679;</td>' +
        '<td style="padding:0 0 10px;font:15px/1.55 ' + SANS + ';color:' + SLATE + ';">' + escapeHtml(item) + '</td></tr>';
    }).join("");
    var banner = withBanner
      ? '<tr><td><img src="' + FELLOWSHIP_BANNER + '" width="600" alt="' + escapeHtml(c.program + ", " + c.dates) + '" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>'
      : '<tr><td style="background:' + GREEN + ';padding:28px 36px;"><div style="font:28px/1.15 ' + SERIF + ';color:' + CREAM + ';">' + escapeHtml(c.program) + '</div>' +
        '<div style="margin-top:8px;font:12px ' + SANS + ';letter-spacing:1px;text-transform:uppercase;color:#c8d4cc;">' + escapeHtml(c.dates) + '</div></td></tr>';
    return banner +
      '<tr><td style="background:' + CREAM + ';padding:32px 36px 12px;">' +
      '<p style="margin:0 0 14px;font:16px/1.6 ' + SANS + ';color:' + INK + ';">' + escapeHtml(c.hello(parentName)) + '</p>' +
      '<p style="margin:0 0 28px;font:16px/1.6 ' + SANS + ';color:' + SLATE + ';">' + escapeHtml(c.thanks) + '</p>' +
      '<div style="margin:0 0 16px;font:24px/1.2 ' + SERIF + ';color:' + INK + ';">' + escapeHtml(c.nextTitle) + '</div>' +
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">' + steps + '</table>' +
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 14px;"><tr><td style="background:' + GREEN + ';border-radius:8px;">' +
      '<a href="' + CONSULT_URL + '" style="display:inline-block;padding:13px 22px;font:600 15px ' + SANS + ';color:' + CREAM + ';text-decoration:none;">' + escapeHtml(c.book) + '</a></td></tr></table>' +
      '<p style="margin:0 0 32px;font:14px/1.55 ' + SANS + ';color:' + SLATE + ';">' + escapeHtml(c.cohort) + '</p>' +
      '<div style="height:1px;background:#e3e0d8;margin:0 0 28px;"></div>' +
      '<div style="margin:0 0 16px;font:24px/1.2 ' + SERIF + ';color:' + INK + ';">' + escapeHtml(c.glanceTitle) + '</div>' +
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">' + glance + '</table>' +
      '<p style="margin:18px 0 6px;font:15px/1.6 ' + SANS + ';color:' + SLATE + ';">' + escapeHtml(c.questions) + '</p>' +
      '<p style="margin:0 0 24px;font:15px/1.6 ' + SANS + ';color:' + INK + ';">' + escapeHtml(c.sign) + '</p>' +
      '</td></tr>';
  }

  var english = language === "en" ? "" :
    '<tr><td style="height:24px;background:' + PAGE + ';"></td></tr>' + section("en", false);

  return '<!doctype html><html><body style="margin:0;padding:0;background:' + PAGE + ';">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + PAGE + ';"><tr><td align="center" style="padding:24px 12px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-radius:14px;overflow:hidden;">' +
    section(language, true) + english +
    '<tr><td style="background:' + GREEN + ';padding:22px 36px;font:13px/1.6 ' + SANS + ';color:#c8d4cc;">' +
    '<span style="font:16px ' + SERIF + ';color:' + CREAM + ';">NGEN</span><br>' + escapeHtml(leadCopyFor(language).tagline) +
    ' · <a href="https://www.ngennetwork.org/startup-challenge" style="color:#c8d4cc;">ngennetwork.org</a></td></tr>' +
    '</table></td></tr></table></body></html>';
}

// Run from the Apps Script editor to preview all three welcome emails in
// the team inbox. Sends nothing to families.
function sendWelcomeSamples() {
  ["en", "zh-Hans", "zh-Hant"].forEach(function (lang) {
    var call = lang === "en" ? "english" : "mandarin";
    MailApp.sendEmail({
      to: CHALLENGE_INBOX,
      name: "NGEN",
      replyTo: CHALLENGE_INBOX,
      subject: "[Sample] " + leadSubject(lang),
      body: leadWelcomeBody(lang, "Sample Parent", call),
      htmlBody: leadWelcomeHtml(lang, "Sample Parent", call),
    });
  });
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
