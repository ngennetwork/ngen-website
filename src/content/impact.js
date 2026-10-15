/**
 * The breakdown under /impact: placeholder data.
 * ======================================================================
 * TODO(data): every `null` below is a number or name NGEN hasn't supplied
 * yet. The page shows each one as a dashed "TODO" so it can't pass for a
 * real figure. Replace a `null` with the real value (a string, as it
 * should read: "$1.2M", "14") and the marker disappears on its own.
 * Headings and notes live in site.js (pages.impact).
 */

/** Averages per NGEN event (conference, trek or pitch competition). */
export const perEvent = [
  { id: "raised", label: "average capital raised by founders, per\u00a0event", value: null },
  { id: "invested", label: "average invested in students, per\u00a0event", value: null },
];

/** Alumni funding totals by cohort: the year a founder first came to an NGEN event. */
export const cohorts = [
  { cohort: "2023", founders: null, startups: null, raised: null },
  { cohort: "2024", founders: null, startups: null, raised: null },
  { cohort: "2025", founders: null, startups: null, raised: null },
  { cohort: "2026", founders: null, startups: null, raised: null },
];

/** How founders came through NGEN. */
export const paths = [
  {
    id: "attendees",
    name: "Event attendees",
    body: "Came to a conference, a Founder Trek or a pitch competition, and built from the people they met there.",
    founders: null,
    raised: null,
  },
  {
    id: "team",
    name: "Team alumni",
    body: "Ran NGEN programs on the team, then went on to found companies of their own.",
    founders: null,
    raised: null,
  },
];

/** The alumni track: where alumni and former team members are now. */
export const alumni = [
  { id: "a1", name: null, path: "Event attendee", now: null },
  { id: "a2", name: null, path: "Event attendee", now: null },
  { id: "a3", name: null, path: "Team alumni", now: null },
  { id: "a4", name: null, path: "Team alumni", now: null },
];
