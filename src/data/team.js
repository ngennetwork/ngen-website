import { universities } from "@/data/universities";

/**
 * Our Team roster (src/app/about/team/page.js).
 * --------------------------------------------------------------------
 * Fields:
 *   name     - person's name ("TODO" = placeholder, not a real person yet)
 *   role     - title shown on the card
 *   school   - university they're based at (campus directors only)
 *   category - "core" (Core & Operations tab) or "campus" (Campus
 *              Directors tab); "All" tab shows both.
 *
 * All entries below are placeholders (isPlaceholder: true) pending real
 * names — swap them in without touching the tab/grouping logic. Campus
 * directors are pre-seeded one per partner university in
 * src/data/universities.js so all 11 are ready to go.
 *
 * This is a separate roster from src/data/founders.js, which drives the
 * About/Mission-section photo with founder callout arrows and has a
 * different shape (position/labelSide) — that file is untouched.
 */

const CORE_ROLES = [
  "Co-Founder",
  "Co-Founder",
  "Co-Founder",
  "Regional Director",
  "Regional Director",
  "Regional Director",
  "Media Lead",
  "Fundraising Lead",
  "Finance Lead",
  "Program Operations",
  "Program Operations",
];

export const team = [
  ...CORE_ROLES.map((role) => ({
    name: "TODO",
    role,
    category: "core",
    isPlaceholder: true,
  })),
  ...universities.map((u) => ({
    name: "TODO",
    role: "Campus Director",
    school: u.name,
    category: "campus",
    isPlaceholder: true,
  })),
];
