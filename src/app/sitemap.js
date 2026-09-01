import { SITE_URL } from "@/lib/site";
import { programs } from "@/content/programs";

// /about is excluded — it's a redirect to /about/mission-story, not
// canonical content. /admin/* and /api/* are excluded via robots.js.
const STATIC_ROUTES = [
  "",
  "/about/mission-story",
  "/about/team",
  "/apply",
  "/contact",
  "/donate",
  "/events",
  "/events/trailblazers",
  "/capital-network/investors",
  "/capital-network/founders",
  "/partner",
  "/impact",
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // "trailblazers" has its own static route above, excluded here to avoid a duplicate.
  const programEntries = programs
    .filter((program) => program.slug !== "trailblazers")
    .map((program) => ({
      url: `${SITE_URL}/events/${program.slug}`,
      lastModified: new Date(),
    }));

  return [...staticEntries, ...programEntries];
}
