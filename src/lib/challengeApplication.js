/**
 * Shared checks for the Start-Up Challenge application.
 * Field names stay in English. Messages come from the locale selected
 * on the form (`language`: en, zh-Hant, or zh-Hans).
 */

import { localeFrom } from "@/components/challenge/content";

export const MAX_RESUME_BYTES = 2 * 1024 * 1024;

const GRADES = ["9", "10", "11", "12"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(input) {
  const language = localeId(input.language);
  const copy = localeFrom(language).apply.errors;
  const fields = {};
  const parentName = String(input.parentName || "").trim();
  const email = String(input.email || "").trim();
  const phone = String(input.phone || "").trim();
  const countryCity = String(input.countryCity || "").trim();
  const name = String(input.name || "").trim();
  const age = String(input.age || "").trim();
  const school = String(input.school || "").trim();
  const grade = String(input.grade || "").trim();
  const interests = String(input.interests || input.motivation || "").trim();
  const guardian = String(input.guardian || "").trim();

  if (parentName.length < 2 || parentName.length > 120) fields.parentName = copy.parentName;
  if (!EMAIL.test(email) || email.length > 200) fields.email = copy.email;
  if (phone.length < 3 || phone.length > 80) fields.phone = copy.phone;
  if (countryCity.length < 2 || countryCity.length > 120) fields.countryCity = copy.countryCity;
  if (name.length < 2 || name.length > 120) fields.name = copy.name;
  if (!isPlausibleAge(age)) fields.age = copy.age;
  if (!GRADES.includes(grade)) fields.grade = copy.grade;
  if (school.length < 2 || school.length > 160) fields.school = copy.school;
  if (interests.length < 20 || interests.length > 2000) fields.interests = copy.interests;
  if (guardian !== "yes") fields.guardian = copy.guardian;

  return {
    ok: Object.keys(fields).length === 0,
    fields,
    value: {
      name,
      email,
      grade,
      dob: "",
      school,
      phone,
      motivation: interests,
      applyingAs: "parent",
      cofounderName: "",
      cofounderEmail: "",
      cofounderSchool: "",
      guardian: guardian === "yes" ? "yes" : "",
      parentName,
      countryCity,
      age,
      language,
    },
  };
}

function localeId(value) {
  if (value === "zh-Hant" || value === "zh-Hans" || value === "en") return value;
  if (value === "zh-TW" || value === "zh-HK") return "zh-Hant";
  if (value === "zh-CN" || value === "zh") return "zh-Hans";
  return "en";
}

export function validateResume(file, language) {
  const copy = localeFrom(language).apply.errors;
  if (!file || typeof file !== "object" || typeof file.size !== "number") {
    return { ok: false, error: copy.resume };
  }
  if (file.size <= 0) return { ok: false, error: copy.resumeEmpty };
  if (file.size > MAX_RESUME_BYTES) return { ok: false, error: copy.resumeSize };
  const ext = String(file.name || "")
    .split(".")
    .pop()
    .toLowerCase();
  if (!["pdf", "doc", "docx"].includes(ext)) return { ok: false, error: copy.resume };
  return { ok: true, ext };
}

/** @param {Uint8Array} bytes */
export function resumeKind(bytes) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (b.length >= 4 && b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04) return "docx";
  if (
    b.length >= 8 &&
    b[0] === 0xd0 &&
    b[1] === 0xcf &&
    b[2] === 0x11 &&
    b[3] === 0xe0 &&
    b[4] === 0xa1 &&
    b[5] === 0xb1 &&
    b[6] === 0x1a &&
    b[7] === 0xe1
  ) {
    return "doc";
  }
  const limit = Math.min(b.length, 1024);
  for (let i = 0; i <= limit - 5; i++) {
    if (b[i] === 0x25 && b[i + 1] === 0x50 && b[i + 2] === 0x44 && b[i + 3] === 0x46 && b[i + 4] === 0x2d) return "pdf";
  }
  return null;
}

function isPlausibleAge(age) {
  if (!/^\d{1,2}$/.test(age)) return false;
  const years = Number(age);
  return years >= 12 && years <= 20;
}
