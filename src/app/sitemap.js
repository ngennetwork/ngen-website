import { SITE_URL } from "@/lib/site";
import { programs } from "@/content/programs";

// /admin/* and /api/* are excluded via robots.js.
// /startup-challenge and /startup-challenge/apply are reachable but
// excluded from the sitemap on purpose — direct/shared links, not meant
// for search indexing.
const STATIC_ROUTES = [
  "",
  "/about",
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
