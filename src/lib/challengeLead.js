/**
 * Eligibility check for the Start-Up Challenge.
 * Grades 9 to 12, or ages 14 to 18, are eligible. Everyone else is still saved.
 * The grade-or-age box accepts a grade, an age, or a common Hong Kong form.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CN_DIGIT = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };

export function normalizeLeadLanguage(value) {
  if (value === "zh-Hant" || value === "zh-TW" || value === "zh-HK") return "zh-Hant";
  if (value === "zh-Hans" || value === "zh-CN" || value === "zh") return "zh-Hans";
  return "en";
}

export function assessEligibility(input) {
  const raw = String(input || "").trim();
  if (!raw) return false;
  const text = raw.toLowerCase();
  let sawSignal = false;
  let eligible = false;

  function addGrade(n) {
    const grade = Number(n);
    if (!Number.isFinite(grade)) return;
    sawSignal = true;
    if (grade >= 9 && grade <= 12) eligible = true;
  }

  function addAge(n) {
    const age = Number(n);
    if (!Number.isFinite(age)) return;
    sawSignal = true;
    if (age >= 14 && age <= 18) eligible = true;
  }

  const gradeWord = text.match(/\b(?:grade|gr\.?|g)\s*(1[0-2]|[1-9])(?:st|nd|rd|th)?\b/);
  if (gradeWord) addGrade(gradeWord[1]);
  const gradeOrdinal = text.match(/\b(1[0-2]|[1-9])(?:st|nd|rd|th)\s*grade\b/);
  if (gradeOrdinal) addGrade(gradeOrdinal[1]);

  const ageWord = text.match(/\b(?:age|aged)\s*(\d{1,2})\b/);
  if (ageWord) addAge(ageWord[1]);
  const ageUnit = text.match(/\b(\d{1,2})\s*(?:years?\s*old|yo|y\/o)\b/);
  if (ageUnit) addAge(ageUnit[1]);
  const ageZhUnit = raw.match(/(\d{1,2})\s*[歲岁]/);
  if (ageZhUnit) addAge(ageZhUnit[1]);

  const form = text.match(/\b(?:form|secondary)\s*([1-6])\b/) || text.match(/\b[fs]\s*([1-6])\b/);
  if (form) addGrade(Number(form[1]) + 6);

  const year = text.match(/\byear\s*(1[0-3]|[7-9])\b/);
  if (year) addGrade(Number(year[1]) - 1);

  const senior = raw.match(/中\s*([一二三四五六])/);
  if (senior) addGrade(CN_DIGIT[senior[1]] + 6);
  const gao = raw.match(/高\s*([一二三])/);
  if (gao) addGrade(CN_DIGIT[gao[1]] + 9);

  const cnGrade = raw.match(/([一二三四五六七八九十]{1,3})\s*年級/) || raw.match(/([一二三四五六七八九十]{1,3})\s*年级/);
  if (cnGrade) addGrade(cnNumber(cnGrade[1]));
  const cnAge = raw.match(/([一二三四五六七八九十]{1,3})\s*[歲岁]/);
  if (cnAge) addAge(cnNumber(cnAge[1]));

  if (sawSignal) return eligible;

  const nums = [...text.matchAll(/\b\d{1,2}\b/g)].map((match) => Number(match[0]));
  if (nums.length === 0) return false;
  return nums.some((n) => (n >= 9 && n <= 12) || (n >= 14 && n <= 18));
}

function cnNumber(token) {
  if (!token) return NaN;
  if (token === "十") return 10;
  if (token.startsWith("十")) return 10 + (CN_DIGIT[token[1]] || 0);
  const ten = token.indexOf("十");
  if (ten === -1) return CN_DIGIT[token] || NaN;
  const tens = CN_DIGIT[token.slice(0, ten)] || 1;
  const ones = CN_DIGIT[token.slice(ten + 1)] || 0;
  return tens * 10 + ones;
}

export function validateLead(input) {
  const language = normalizeLeadLanguage(input.language);
  const parentName = String(input.parentName || "").trim();
  const parentEmail = String(input.parentEmail || "").trim();
  const countryCode = String(input.countryCode || "").trim();
  let local = String(input.whatsapp || "").trim();
  const gradeOrAge = String(input.gradeOrAge || "").trim();
  const errors = {};

  if (parentName.length < 2 || parentName.length > 120) errors.parentName = "parentName";
  if (!EMAIL.test(parentEmail) || parentEmail.length > 200) errors.parentEmail = "parentEmail";
  if (!/^\+\d{1,4}$/.test(countryCode)) errors.whatsapp = "whatsapp";
  if (countryCode && local.startsWith(countryCode)) local = local.slice(countryCode.length).trim();
  const digits = local.replace(/\D/g, "");
  if (digits.length < 6 || digits.length > 15) errors.whatsapp = "whatsapp";
  if (gradeOrAge.length < 1 || gradeOrAge.length > 80) errors.gradeOrAge = "gradeOrAge";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: {
      parentName,
      parentEmail,
      whatsapp: `${countryCode} ${local}`.trim(),
      gradeOrAge,
      eligible: assessEligibility(gradeOrAge),
      language,
    },
  };
}
