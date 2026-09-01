/**
 * Shared submit function for the newsletter form (/founders). Posts JSON
 * to the same Google Apps Script
 * Web App (see /backend/Code.gs and SETUP.md) using Content-Type
 * "text/plain" — Apps Script web apps handle CORS poorly, and a
 * text/plain body counts as a "simple request" so the browser skips
 * the CORS preflight that would otherwise fail against Apps Script.
 *
 * The endpoint URL lives in NEXT_PUBLIC_APPS_SCRIPT_URL (see
 * .env.example). Until that's set (build step 5, once the backend
 * exists), this throws a clear, catchable error instead of trying to
 * fetch an empty URL.
 */
export async function submitToAppsScript(payload) {
  const url = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!url) {
    throw new Error(
      "The form backend isn't connected yet - NEXT_PUBLIC_APPS_SCRIPT_URL is not set. See SETUP.md."
    );
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`The server responded with an error (status ${res.status}).`);
  }

  const data = await res.json().catch(() => null);
  if (!data || data.ok !== true) {
    throw new Error(data?.error || "Something went wrong submitting the form.");
  }

  return data;
}
