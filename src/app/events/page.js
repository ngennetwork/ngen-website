import { programs, getProgramStatus, formatDeadline } from "@/content/programs";
import { getEvents } from "@/data/events";
import EventsPortal from "./EventsPortal";

export const metadata = {
  title: "Events & Applications",
  description:
    "Open NGEN application cycles — Trailblazers, Lab-to-Startup, Founder Treks, and Pitch Competitions — plus the events we've run across our university network.",
};

/**
 * /events — the ONE destination for both applying and browsing.
 * ---------------------------------------------------------------------
 * Replaces the old /apply portal (which now redirects here, see
 * next.config.mjs). Two stacked sections:
 *
 *   1. Open applications — one row per program whose LIVE status
 *      (getProgramStatus, src/content/programs.js) is open/closing-soon,
 *      soonest deadline first, each with its apply link. Programs with no
 *      live cycle fall to a "Coming up" list below it so a passed
 *      deadline never silently disappears.
 *   2. Events — real event instances from src/data/events.json, upcoming
 *      first, then past ones as proof/history.
 *
 * Evergreen program *pages* live at /programs and /programs/[slug]; this
 * route is only about cycles and instances.
 */

const OPEN_STATUSES = new Set(["open", "closing-soon"]);

// Rendered per request, never prerendered: both halves of this page are
// date-derived (live application status) or read off disk at request time
// (events.json), and a static build would freeze both at build time.
export const dynamic = "force-dynamic";

/**
 * events.json dates are human-readable strings ("October 2, 2026",
 * "April 2027 (exact date TBD)"), so parsing is best-effort: anything
 * unparseable is treated as upcoming rather than quietly filed as past.
 */
function parseEventDate(date) {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? null : parsed;
}

/** Split real event instances into upcoming (soonest first) and past
 * (most recent first). Kept out of the component so the `Date.now()`
 * read isn't a render-time side effect. */
function splitEventsByDate(events) {
  const now = Date.now();
  const withTime = events.map((event) => ({ ...event, time: parseEventDate(event.date) }));
  return {
    upcomingEvents: withTime
      .filter((event) => event.time === null || event.time >= now)
      .sort((a, b) => (a.time ?? Infinity) - (b.time ?? Infinity)),
    pastEvents: withTime
      .filter((event) => event.time !== null && event.time < now)
      .sort((a, b) => b.time - a.time),
  };
}

export default async function EventsPage() {
  const applications = programs
    .map((program) => {
      const status = getProgramStatus(program.slug);
      return {
        slug: program.slug,
        name: program.name,
        tagline: program.tagline,
        status,
        isOpen: OPEN_STATUSES.has(status),
        deadlineLabel: formatDeadline(program.closesAt),
        closesAt: program.closesAt,
        eligibility: program.eligibility,
        timeEstimate: program.applicationTimeEstimate,
        applicationUrl: program.applicationUrl,
        opensAt: program.opensAt,
        nextEventDate: program.nextEventDate,
      };
    })
    .sort((a, b) => {
      if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1;
      if (!a.closesAt) return 1;
      if (!b.closesAt) return -1;
      return new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime();
    });

  const { upcomingEvents, pastEvents } = splitEventsByDate(await getEvents());

  return (
    <EventsPortal
      applications={applications}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  );
}
