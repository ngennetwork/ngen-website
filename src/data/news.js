/**
 * "In the News" section (home page, below Featured Startups).
 * --------------------------------------------------------------------
 * The section combines two sources:
 *   1. Every startup's existing press link in src/data/startups.json
 *      (link/linkLabel) — no duplicate data entry, always in sync.
 *   2. additionalArticles below, for anything extra you want to add by
 *      hand — a second article about a startup already featured, an
 *      article about a founder/attendee whose startup isn't in
 *      startups.json, etc.
 *
 * Fields (additionalArticles):
 *   title      - headline shown on the card
 *   source     - publication name, e.g. "TechCrunch"
 *   url        - the article link
 *   startupName - (optional) shown as a small badge on the card
 *   logo        - (optional) path under /public/logos/startups/, shown
 *                 in place of the badge text if supplied
 *   date        - (optional) e.g. "Jul 2024", shown at the right of the row
 *   summary     - (optional) 1-2 sentence excerpt shown below the title
 *
 * NOTE: a future pass may auto-populate this by searching the web for
 * coverage of NGEN founders/attendees — not built yet, this is manual
 * for now.
 */

export const additionalArticles = [];
