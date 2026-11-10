import { SITE_URL } from "@/lib/site";
import { programs } from "@/content/programs";

// /admin/* and /api/* are excluded via robots.js.
// /global-fellowship is reachable but excluded from the sitemap on
// purpose — direct/shared links, not meant for search indexing.
// The old /startup-challenge addresses redirect to it.
// /zoom and /intro are temporary redirects (next.config); not indexed.
const STATIC_ROUTES = [
  "",
  "/about",
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
