import { NextResponse } from "next/server";

/**
 * Soft-launch gate: only the homepage and the Start-Up Challenge page are
 * live publicly right now — every other route in this repo still exists
 * and keeps getting built/edited (see src/data/nav.js's NAV_LIVE flag),
 * it's just not reachable until this allowlist is widened.
 *
 * Add a path here the moment it's ready to go public; nothing else about
 * the route needs to change.
 */
const ALLOWED_PATHS = ["/", "/startup-challenge"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (ALLOWED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  return new NextResponse("Not Found", { status: 404 });
}

export const config = {
  // Run on every request except static assets, images, and Next internals
  // — those need to keep loading even on pages this gate blocks.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico|css|js|woff2?|ttf|mp4)$).*)"],
};
