/**
 * The team (/about/team): placeholder data.
 * ======================================================================
 * TODO(data): every person here is a placeholder until the real roster
 * arrives. Leadership carries the three founders' first names (from the
 * founders' letter); their tags, photos and links are placeholders too.
 *
 * No formal titles yet: people are described by their tags, and anyone can
 * carry several of each.
 *
 * Fields:
 *   id        stable key
 *   name      full name; null shows as TODO
 *   photo     { src, position? }, or null for a monogram tile until a photo exists
 *   linkedin  profile URL; null shows as TODO
 *   programs  program or area tags: "Conferences", "Lab-2-Startup",
 *             "Founder Trek", "Pitch Competitions", "SpaceTech", "Capital Network"
 *   regions   location tags: "New York", "Research Triangle", "SF", ...
 */

export const leadership = [
  { id: "harsha", name: "Harsha", photo: null, linkedin: null, programs: ["Conferences", "Capital Network"], regions: ["New York"] },
  { id: "jackson", name: "Jackson", photo: null, linkedin: null, programs: ["Conferences", "Pitch Competitions"], regions: ["New York"] },
  { id: "will", name: "Will", photo: null, linkedin: null, programs: ["Lab-2-Startup", "Founder Trek"], regions: ["New York", "Boston"] },
];

export const team = [
  { id: "t1", name: null, photo: null, linkedin: null, programs: ["SpaceTech", "Lab-2-Startup"], regions: ["Research Triangle"] },
  { id: "t2", name: null, photo: null, linkedin: null, programs: ["Founder Trek"], regions: ["SF", "New York"] },
  { id: "t3", name: null, photo: null, linkedin: null, programs: ["Lab-2-Startup"], regions: ["Boston"] },
  { id: "t4", name: null, photo: null, linkedin: null, programs: ["Pitch Competitions", "Capital Network"], regions: ["New York"] },
  { id: "t5", name: null, photo: null, linkedin: null, programs: ["SpaceTech"], regions: ["SF"] },
  { id: "t6", name: null, photo: null, linkedin: null, programs: ["Conferences", "Founder Trek"], regions: ["Philadelphia"] },
];
