import { NextResponse } from "next/server";

/**
 * Single-page mode: every route except the homepage and the admin tools
 * redirects to "/". Every other route in this repo still exists and
 * keeps getting built/edited (see src/data/nav.js's NAV_LIVE flag), it's
 * just not reachable until this allowlist is widened.
 *
 * Add a path here the moment it's ready to go public; nothing else about
 * the route needs to change.
 */
const ALLOWED_PATHS = ["/", "/startup-challenge"];
const ALLOWED_PREFIXES = ["/admin"];

function isAllowed(pathname) {
  return ALLOWED_PATHS.includes(pathname) || ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * LOCAL PREVIEW BYPASS
 * --------------------
 * The gate above is a production concern. Locally (`npm run dev`) every
 * page is reachable so the full restructured site can be clicked through
 * while it stays 404 in production.
 *
 * For a production-mode local check (`next build && next start`), set
 * PREVIEW_ALL_PAGES=true in the shell — NOT in the hosting provider's env
 * vars, since that would open the whole site publicly.
 */
const previewAllPages =
  process.env.NODE_ENV !== "production" || process.env.PREVIEW_ALL_PAGES === "true";

export function middleware(request) {
  if (previewAllPages) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isAllowed(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  // Run on every request except static assets, images, and Next internals
  // — those need to keep loading even on pages this gate blocks.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico|css|js|woff2?|ttf|mp4)$).*)"],
};
