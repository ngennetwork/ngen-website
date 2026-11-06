/**
 * The team (/about/team).
 * ======================================================================
 * Leadership carries the three founders' first names (from the founders'
 * letter). No formal titles: people are described by their tags, and anyone
 * can carry several of each.
 *
 * Fields:
 *   id        stable key
 *   name      full name
 *   photo     { src, position? }, or null for a monogram tile until a photo exists
 *   linkedin  profile URL, or null when there is no public profile yet
 *   programs  program or area tags: "Conferences", "Lab-2-Startup",
 *             "Founder Trek", "Pitch Competitions", "SpaceTech", "Capital Network"
 *   regions   location tags: "New York", "Research Triangle", "SF", ...
 */

export const leadership = [
  { id: "harsha", name: "Harsha", photo: null, linkedin: null, programs: ["Conferences", "Capital Network"], regions: ["New York"] },
  { id: "jackson", name: "Jackson", photo: null, linkedin: null, programs: ["Conferences", "Pitch Competitions"], regions: ["New York"] },
  { id: "will", name: "Will", photo: null, linkedin: null, programs: ["Lab-2-Startup", "Founder Trek"], regions: ["New York", "Boston"] },
];
