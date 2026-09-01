import { readFile, writeFile } from "fs/promises";
import path from "path";

/**
 * Events.
 * -------
 * Every event on the site (Founders page, Investors page, or both) comes
 * from src/data/events.json. This file just reads/writes that JSON from
 * disk at request time — so edits made through /admin/events (see that
 * page for how) show up without a rebuild, as long as this app is running
 * as a normal, continuously-running Node server. (On a serverless host
 * like Vercel, each request can hit a fresh, read-only filesystem, so
 * writes made there won't reliably stick — see the admin page for details.)
 *
 * Fields:
 *   id             - a short unique lowercase-with-dashes id, e.g. "trek-fall-2026"
 *   title          - event name, shown as the card headline
 *   date           - human-readable date string, e.g. "October 4, 2026"
 *   location       - city/venue string
 *   description    - one sentence, shown under the title
 *   audience       - array containing "founders", "investors", or both.
 *                    Controls which page(s) the event shows up on.
 *   targetAudience - (investors page only) a short phrase describing who
 *                    this event is for, e.g. "Seed-stage fintech investors" —
 *                    shown when an investor hovers/taps an event bubble.
 *   photo          - (optional) path under /public, shown as a small round
 *                    thumbnail on the investor-facing event bubble.
 *   isPlaceholder  - set to true for entries that are not real events yet
 *                    (this renders a visible "TODO" label on the card so
 *                    nobody mistakes a placeholder for a real event).
 *
 * If this array has no entries for a given audience, that page shows a
 * friendly empty state instead of a blank space — you don't need to
 * leave a "coming soon" placeholder event just to avoid an empty list.
 *
 * The Investors page shows these as a row of 3 cards, or automatically
 * switches to a carousel if there are more than 3 investor-facing events.
 */

const eventsFilePath = path.join(process.cwd(), "src/data/events.json");

export async function getEvents() {
  const raw = await readFile(eventsFilePath, "utf-8");
  return JSON.parse(raw);
}

export async function saveEvents(events) {
  await writeFile(eventsFilePath, JSON.stringify(events, null, 2) + "\n", "utf-8");
}
