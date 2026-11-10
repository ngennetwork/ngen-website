import { NextResponse } from "next/server";
import { sessionCatalog } from "@/components/challenge/sessions";
import { validateConsultation } from "@/lib/challengeLead";
import { DEFAULT_APPS_SCRIPT_URL } from "@/lib/appsScriptUrl";

export const runtime = "nodejs";

/**
 * Consultation requests for the Global Fellowship.
 * Posts to the same Apps Script web app as the other challenge forms.
 * formType "startupChallengeLead" is the shape that sheet already stores
 * (parentName, parentEmail, whatsapp, gradeOrAge). A blank phone is sent
 * as an em dash so a script that still requires the column will accept the row.
 */
export async function POST(request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "generic" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "generic" }, { status: 400 });
  }

  const parsed = validateConsultation(body || {});
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: "invalid", fields: parsed.errors }, { status: 400 });
  }

  const url = process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const payload = {
    formType: "startupChallengeLead",
    parentName: parsed.value.parentName,
    parentEmail: parsed.value.parentEmail,
    whatsapp: parsed.value.whatsapp || "—",
    gradeOrAge: parsed.value.gradeOrAge,
    eligible: "yes",
    language: parsed.value.language,
    note: parsed.value.note,
    sessionOptions: sessionCatalog(),
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
