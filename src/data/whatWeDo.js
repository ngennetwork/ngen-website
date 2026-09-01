/**
 * "Events & Programs" — DERIVED VIEW of the programs data layer.
 * --------------------------------------------------------------------
 * The single source of truth is now src/content/programs.js. This module
 * maps those Program objects into the older shape the existing consumers
 * still read (the header's "Events & Programs" dropdown via nav.js, the
 * home-page cards in EventsSection.jsx, and each /events/[slug] layout),
 * so nothing downstream had to change. Edit copy, photos, links, dates,
 * and status in programs.js — NOT here.
 *
 * Status, deadlines, eligibility, and time estimates are NOT part of this
 * shape; consumers that need them read programs.js directly through its
 * helpers (getProgramStatus, formatDeadline, …).
 *
 * "Community" is intentionally NOT one of the nav dropdown's five items
 * (see nav.js) but stays in this array so its home-page card and
 * /events/community page keep working for anyone who lands on them.
 *
 * Derived fields:
 *   slug            <- program.slug
 *   type            <- program.type            (picks the /events/[slug] layout)
 *   title           <- program.name
 *   photo           <- program.cardImage
 *   cardDescription <- program.tagline
 *   pageBody        <- program.description
 *   ctaLabel        <- CTA_COPY[slug]          (button wording, view-only)
 *   ctaHref         <- program.applicationUrl
 *   ctaExternal     <- CTA_COPY[slug]          (leaves the site?)
 */

import { programs } from "@/content/programs";

// Button wording is a presentation concern, kept here so programs.js
// stays focused on data. Preserves the exact labels/targets used before.
const CTA_COPY = {
  trailblazers: { label: "Apply to Attend", external: true },
  "research-conferences": { label: "Apply to Attend", external: true },
  "founder-treks": { label: "Apply for a Trek", external: false },
  "pitch-competitions": { label: "Apply to Pitch", external: true },
  workshops: { label: "See Upcoming Workshops", external: false },
  community: { label: "Join Our Network", external: false },
};

export const whatWeDo = programs.map((program) => ({
  slug: program.slug,
  type: program.type,
  title: program.name,
  photo: program.cardImage,
  cardDescription: program.tagline,
  pageBody: program.description,
  ctaLabel: CTA_COPY[program.slug]?.label ?? "Learn more",
  ctaHref: program.applicationUrl,
  ctaExternal: CTA_COPY[program.slug]?.external ?? false,
}));
