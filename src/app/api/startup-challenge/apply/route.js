import { NextResponse } from "next/server";
import { localeFrom } from "@/components/challenge/content";
import { DEFAULT_APPS_SCRIPT_URL } from "@/lib/appsScriptUrl";
import { resumeKind, validateApplication, validateResume } from "@/lib/challengeApplication";

export const runtime = "nodejs";

/**
 * Student applications for the Start-Up Challenge.
 * Validates the form, then forwards it to the Apps Script backend
 * (formType "startup-challenge"), which stores a sheet row, files the
 * resume in Drive, and emails info@ngennetwork.org. See backend/Code.gs.
 * The script URL is APPS_SCRIPT_URL, NEXT_PUBLIC_APPS_SCRIPT_URL, or the built-in default.
 */
export async function POST(request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "generic" }, { status: 403 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "generic" }, { status: 400 });
  }

  const language = form.get("language");
  const parsed = validateApplication({
    parentName: form.get("parentName"),
    email: form.get("email"),
    phone: form.get("phone"),
    countryCity: form.get("countryCity"),
    name: form.get("studentName") || form.get("name"),
    age: form.get("age"),
    school: form.get("school"),
    grade: form.get("grade"),
    interests: form.get("interests"),
    guardian: form.get("guardian"),
    language,
  });

  const resume = form.get("resume");
  const resumeCheck = validateResume(resume, language);
  const fields = { ...parsed.fields };
  if (!resumeCheck.ok) fields.resume = resumeCheck.error;

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 400 });
  }

  const bytes = Buffer.from(await resume.arrayBuffer());
  const kind = resumeKind(bytes);
  if (kind !== resumeCheck.ext) {
    return NextResponse.json(
      { ok: false, error: "invalid", fields: { resume: localeFrom(language).apply.errors.resumeType } },
      { status: 400 },
    );
  }

  const url = process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const payload = {
    formType: "startup-challenge",
    ...parsed.value,
    resumeBase64: bytes.toString("base64"),
    resumeFileName: safeFileName(parsed.value.name, resumeCheck.ext),
  };

  try {
    const data = await postToAppsScript(url, payload);
    if (!data || data.ok !== true) {
      return NextResponse.json({ ok: false, error: "generic" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function originAllowed(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function postToAppsScript(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok && !data) {
    throw new Error(`Status ${res.status}`);
  }
  return data;
}

function safeFileName(name, ext) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${slug || "student"}-resume.${ext}`;
}
