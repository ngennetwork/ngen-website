import { NextResponse } from "next/server";
import { sessionById, sessionCatalog } from "@/components/challenge/sessions";
import { normalizeLeadLanguage, validateLead } from "@/lib/challengeLead";

export const runtime = "nodejs";

/**
 * Eligibility leads for the Start-Up Challenge.
 * formType "startupChallengeLead" saves the lead.
 * formType "startupChallengeSession" updates that lead when a session is chosen.
 * The script URL is APPS_SCRIPT_URL or NEXT_PUBLIC_APPS_SCRIPT_URL, same as the apply route.
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

  if (body && body.sessionId) return updateSession(body);
  return createLead(body || {});
}

async function createLead(body) {
  const parsed = validateLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: "invalid", fields: parsed.errors }, { status: 400 });
  }

  const url = scriptUrl();
  if (!url) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });

  try {
    const data = await postToAppsScript(url, {
      formType: "startupChallengeLead",
      ...parsed.value,
      eligible: parsed.value.eligible ? "yes" : "no",
      sessionOptions: sessionCatalog(),
    });
    if (!data || data.ok !== true) {
      return NextResponse.json({ ok: false, error: "generic" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, eligible: parsed.value.eligible, row: data.row || null });
  } catch {
    return NextResponse.json({ ok: false, error: "unreachable" }, { status: 502 });
  }
}

async function updateSession(body) {
  const option = sessionById(String(body.sessionId || ""));
  const parentEmail = String(body.parentEmail || "").trim();
  if (!option || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const url = scriptUrl();
  if (!url) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });

  const language = normalizeLeadLanguage(body.language);
  try {
    const data = await postToAppsScript(url, {
      formType: "startupChallengeSession",
      parentEmail,
      row: Number(body.row) || "",
      sessionId: option.id,
      language,
      sessionOptions: sessionCatalog(),
    });
    if (!data || data.ok !== true) {
      return NextResponse.json({ ok: false, error: "generic" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "unreachable" }, { status: 502 });
  }
}

function scriptUrl() {
  return process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
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
  if (!res.ok && !data) throw new Error(`Status ${res.status}`);
  return data;
}
