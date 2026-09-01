import { readFile, writeFile } from "fs/promises";
import path from "path";

/**
 * Featured startups (About page, "Featured Startups from NGEN" section).
 * ------------------------------------------------------------------------
 * Backed by src/data/startups.json, read/written at request time - so
 * edits made through /admin/startups (see that page for how) show up
 * without a rebuild, as long as this app is running as a normal,
 * continuously-running Node server (see src/data/events.js for the same
 * caveat about serverless hosts like Vercel).
 *
 * The section renders however many entries are here — 1, 2, 3, or more —
 * so adding or removing a startup through the admin just works without
 * anyone touching layout code.
 *
 * Fields:
 *   id          - a short unique lowercase-with-dashes id
 *   name        - startup name
 *   oneLiner    - one sentence describing what they do
 *   logo        - path to a transparent PNG under /public/logos/, or null
 *                 if not supplied yet (card falls back to name text)
 *   photo       - path to a team photo under /public/team-photos/, or
 *                 null if not supplied yet (card just shows the logo)
 *   link        - URL for the "read more" press link
 *   linkLabel   - the text shown for that link, e.g. "Wins $75,000 — Wharton"
 *   isPlaceholder - true for entries where the startup hasn't been
 *                   selected yet; renders a visible TODO card instead.
 *
 * Logo note: logos are dark ink on a transparent background — the
 * component places them on white cards so they stay visible, and sizes
 * them by a fixed optical height (not width) since wordmarks vary in
 * aspect ratio.
 */

const startupsFilePath = path.join(process.cwd(), "src/data/startups.json");

export async function getStartups() {
  const raw = await readFile(startupsFilePath, "utf-8");
  return JSON.parse(raw);
}

export async function saveStartups(startups) {
  await writeFile(startupsFilePath, JSON.stringify(startups, null, 2) + "\n", "utf-8");
}
