import { SITE_URL } from "@/lib/site";
import { programs } from "@/content/programs";

// /about is excluded — it's a redirect to /about/mission-story, not
// canonical content. /admin/* and /api/* are excluded via robots.js.
// /startup-challenge is excluded on purpose: it's kept off the public
// site (see src/middleware.js).
const STATIC_ROUTES = [
  "",
  "/about/mission-story",
  "/about/team",
  "/impact",
  "/contact",
  "/programs",
  "/events",
  "/capital-network/investors",
  "/capital-network/founders",
  "/partner",
  "/donate",
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const programEntries = programs.map((program) => ({
    url: `${SITE_URL}/programs/${program.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...programEntries];
}
