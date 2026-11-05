/**
 * Shared checks for the Start-Up Challenge application. The API route and
 * the form both use this, so a field fails the same way in the browser
 * and on the server. Words come from challenge.apply.errors.
 */

import { challenge } from "@/components/challenge/content";

export const MAX_RESUME_BYTES = 2 * 1024 * 1024;

const GRADES = ["9", "10", "11", "12"];
const APPLYING_AS = ["solo", "team"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errors() {
  return challenge.apply.errors;
}

function tierIds() {
  return challenge.pricing.plans.map((plan) => plan.id);
}

export function validateApplication(input) {
  const copy = errors();
  const fields = {};
  const name = String(input.name || "").trim();
  const email = String(input.email || "").trim();
  const grade = String(input.grade || "").trim();
  const dob = String(input.dob || "").trim();
  const school = String(input.school || "").trim();
  const phone = String(input.phone || "").trim();
  const motivation = String(input.motivation || "").trim();
  const applyingAs = String(input.applyingAs || "").trim();
  const cofounderName = String(input.cofounderName || "").trim();
  const cofounderEmail = String(input.cofounderEmail || "").trim();
  const cofounderSchool = String(input.cofounderSchool || "").trim();
  const tier = String(input.tier || "").trim();
  const guardian = String(input.guardian || "").trim();

  if (name.length < 2 || name.length > 120) fields.name = copy.name;
  if (!EMAIL.test(email) || email.length > 200) fields.email = copy.email;
  if (!GRADES.includes(grade)) fields.grade = copy.grade;
  if (dob && !isPlausibleDob(dob)) fields.dob = copy.dob;
  if (school.length < 2 || school.length > 160) fields.school = copy.school;
  if (phone && !isPlausiblePhone(phone)) fields.phone = copy.phone;
  if (motivation.length < 20 || motivation.length > 2000) fields.motivation = copy.motivation;
  if (!APPLYING_AS.includes(applyingAs)) fields.applyingAs = copy.applyingAs;
  if (applyingAs === "team") {
    if (cofounderName.length < 2 || cofounderName.length > 120) fields.cofounderName = copy.cofounderName;
    if (cofounderEmail && (!EMAIL.test(cofounderEmail) || cofounderEmail.length > 200)) {
      fields.cofounderEmail = copy.cofounderEmail;
    }
    if (cofounderSchool.length > 160) fields.cofounderSchool = copy.cofounderSchool;
  }
  if (tier && !tierIds().includes(tier)) fields.tier = copy.tier;
  if (guardian !== "yes") fields.guardian = copy.guardian;

  const withTeam = applyingAs === "team";
  return {
    ok: Object.keys(fields).length === 0,
    fields,
    value: {
      name,
      email,
      grade,
      dob,
      school,
      phone,
      motivation,
      applyingAs,
      cofounderName: withTeam ? cofounderName : "",
      cofounderEmail: withTeam ? cofounderEmail : "",
      cofounderSchool: withTeam ? cofounderSchool : "",
      tier,
      guardian: guardian === "yes" ? "yes" : "",
    },
  };
}

export function validateResume(file) {
  const copy = errors();
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
  if (b.length >= 4 && b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04) {
    return "docx";
  }
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
    if (b[i] === 0x25 && b[i + 1] === 0x50 && b[i + 2] === 0x44 && b[i + 3] === 0x46 && b[i + 4] === 0x2d) {
      return "pdf";
    }
  }
  return null;
}

function isPlausiblePhone(phone) {
  if (phone.length > 30) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^[\d\s()+.\-]+$/.test(phone);
}

function isPlausibleDob(dob, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return false;
  const [year, month, day] = dob.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return false;
  let age = now.getUTCFullYear() - year;
  const monthDelta = now.getUTCMonth() - (month - 1);
  if (monthDelta < 0 || (monthDelta === 0 && now.getUTCDate() < day)) age -= 1;
  return age >= 12 && age <= 20;
}
