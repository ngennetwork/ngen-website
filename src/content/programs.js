import { conference } from "./site";

/**
 * Programs: the single source of truth.
 * ======================================================================
 * Four programs, plus the Capital Network for founders who are actively
 * raising. The flagship is the Ivy League Entrepreneurship Conference
 * (formerly Trailblazers; the old /programs/trailblazers URL redirects).
 * Every page that names a program (home's index, /programs,
 * /programs/[slug], /events) reads it from here.
 *
 * Only real facts live here. Earlier versions carried placeholder
 * application dates and attendance stats; they were dropped rather than
 * shown as fact. When a cycle has real dates, add `opensAt` / `closesAt`
 * (ISO strings) to its record and surface them on /events.
 *
 * Fields:
 *   slug        URL segment under /programs
 *   name        full name
 *   shortName   for tight spaces
 *   summary     one sentence (home, /programs, /events)
 *   description a paragraph (the program's own page)
 *   audience    who it's for, one line
 *   apply       { label, href }: the real application portal (the
 *               conference is invite-only, so its action is an invite request)
 *   photo       { src, alt, position? }: a real NGEN photo
 */

export const programs = [
  {
    slug: "ivy-league-entrepreneurship-conference",
    name: "Ivy League Entrepreneurship Conference",
    shortName: "The conference",
    summary: conference.motto,
    description:
      "NGEN’s flagship: an invite-only conference where world-class student entrepreneurs meet today’s most influential leaders face to face. What began as an intimate New York gathering returns on a larger stage in New\u00a0York\u00a0City on April\u00a017,\u00a02027.",
    audience: "Student entrepreneurs, by invitation",
    apply: { label: "Request an invite", href: `${conference.url}/invite` },
    photo: {
      src: "/about/events/conferences.jpg",
      alt: "A panel on stage at NGEN’s conference in New York",
      position: "50% 40%",
    },
  },
  {
    slug: "lab-to-startup",
    name: "Lab to Startup",
    shortName: "Lab to Startup",
    summary:
      "Explore how to commercialize research, including IP and tech transfer, across a new field each time.",
    description:
      "Lab to Startup brings together student founders working on deep tech, biotech and other research-heavy ventures: the ideas that take longer to build but change more when they land. Sessions pair scientific rigor with startup speed, with translational-research panels and direct access to investors who fund science-first companies.",
    audience: "Student founders in deep tech, biotech or applied research",
    apply: { label: "Apply to attend", href: "https://space.ngennetwork.org" },
    photo: {
      src: "/about/events/pitch-competitions.jpg",
      alt: "A speaker presenting to students at an NGEN event",
      position: "50% 45%",
    },
  },
  {
    slug: "founder-treks",
    name: "Founder Treks",
    shortName: "Treks",
    summary:
      "Spend a day visiting four VCs and angels in their offices to pitch and connect while actively raising.",
    description:
      "Founder Treks bring small groups of actively raising founders to investors' own offices for a day of back-to-back visits. Instead of a cold email, founders walk in with a warm introduction and walk out with a real relationship, often the first meeting in a much longer conversation with that fund.",
    audience: "Student founders who are actively raising",
    apply: { label: "Apply for a trek", href: "/capital-network/founders" },
    photo: {
      src: "/about/events/founder-treks.jpg",
      alt: "Student founders at a venture firm's office during a Founder Trek",
      position: "50% 50%",
    },
  },
  {
    slug: "pitch-competitions",
    name: "Pitch Competitions",
    shortName: "Pitch",
    summary:
      "Pitch your company and compete against other founders for investment and prize funding.",
    description:
      "Pitch Competitions give student founders a real stage and a real check on the line: up to $150K from Honors Fund. Teams get direct feedback from the investors judging the room, so even the founders who don't win leave with sharper answers to the questions that matter most.",
    audience: "Student founders",
    apply: { label: "Apply to pitch", href: "https://pitch.ngennetwork.org" },
    photo: {
      src: "/about/events/Copy of DSC06515.jpg",
      alt: "A student founder speaking into a microphone in the audience",
      position: "50% 50%",
    },
  },
];

/** Not a program students apply to, but where founders who are raising go. */
export const capitalNetwork = {
  name: "Capital Network",
  summary:
    "Warm introductions to angels, operators and early capital, from micro-grants to $500K+ rounds.",
  href: "/capital-network/founders",
};

/** @param {string} slug */
export function getProgramBySlug(slug) {
  return programs.find((p) => p.slug === slug) ?? null;
}
