import { redirect } from "next/navigation";

/**
 * /about itself isn't a page - "About" in the nav is a dropdown with
 * four real pages under it (Mission & Story, Team, Impact & Metrics,
 * Contact - see src/data/nav.js; Impact & Metrics lives at the
 * top-level /impact, not under /about/). This bare route only exists to
 * send old /about links (bookmarks, anything indexed before that
 * split) somewhere sensible.
 */
export default function AboutPage() {
  redirect("/about/mission-story");
}
