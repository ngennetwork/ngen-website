import crypto from "crypto";

/**
 * Minimal password gate for the /admin pages — no user accounts, no
 * database, just one shared password checked against ADMIN_PASSWORD.
 * A successful login gets a signed cookie; the cookie's value is an
 * HMAC of a fixed string keyed by the password itself, so verifying it
 * later needs no server-side session storage — just recompute the same
 * HMAC and compare.
 */
export const SESSION_COOKIE = "ngen_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function checkPassword(candidate) {
  const real = getAdminPassword();
  if (!real || typeof candidate !== "string" || candidate.length === 0) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken() {
  const real = getAdminPassword();
  return crypto.createHmac("sha256", real).update("ngen-admin-session").digest("hex");
}

export function isValidSession(cookieValue) {
  const real = getAdminPassword();
  if (!real || !cookieValue) return false;
  const expected = createSessionToken();
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
