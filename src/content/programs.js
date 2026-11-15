import { conference } from "./site";

/**
 * Programs: the single source of truth.
 * ======================================================================
 * Four programs, plus the Capital Network for founders who are actively
 * raising. Listings call them by the program, not the event: "Conferences"
 * and "Lab-2-Startup", always with dashes. The Ivy League Entrepreneurship
 * Conference is the one conference: wherever Conferences is listed, it's
 * named (`featured`), and no other conference appears. Old slugs (/programs/trailblazers,
 * /programs/ivy-league-entrepreneurship-conference, /programs/lab-to-startup)
 * redirect in next.config.mjs.
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
 *   featured    the one event a program presents (Conferences: the Ivy
 *               League Entrepreneurship Conference), named before its summary
 *   brandName   optional co-branded title for the program's own page
 *   round       optional current round { name, closesAt, deadlineLabel,
 *               finalLabel, lumaHref }; the page switches itself once it closes
 *   terms       optional list of key terms shown on the program's page
 *   partner     optional program partner { name, href, logo, line, stats }
 *
 * TODO(photo): new photos are coming; each record notes whether its photo
 * should be replaced.
 */

export const programs = [
  {
    slug: "conferences",
    name: "Conferences",
    shortName: "Conferences",
    featured: conference.name,
    summary: conference.motto,
    description:
      "The Ivy League Entrepreneurship Conference is NGEN’s conference: invite-only, where world-class student entrepreneurs meet today’s most influential leaders face to face. What began as an intimate New York gathering returns on a larger stage in New\u00a0York\u00a0City on April\u00a017,\u00a02027.",
    audience: "Student entrepreneurs, by invitation",
    apply: { label: "Request an invite", href: `${conference.url}/invite` },
    // TODO(photo): keep until a photo from the 2027 conference exists.
    photo: {
      src: "/about/events/conferences.jpg",
      alt: "A panel on stage at NGEN’s conference in New York",
      position: "50% 40%",
    },
  },
  {
    slug: "lab-2-startup",
    name: "Lab-2-Startup",
    shortName: "Lab-2-Startup",
    summary:
      "Explore how to commercialize research, including IP and tech transfer, across a new field each time.",
    description:
      "Lab-2-Startup brings together student founders working on deep tech, biotech and other research-heavy ventures: the ideas that take longer to build but change more when they land. Sessions pair scientific rigor with startup speed, with translational-research panels and direct access to investors who fund science-first\u00a0companies.",
    audience: "Student founders in deep tech, biotech or applied research",
    apply: { label: "Apply to attend", href: "https://space.ngennetwork.org" },
    // TODO(photo): replace. This is the pitch competitions photo; use one
    // from a Lab-2-Startup event.
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
    // No trek application yet. Add { label, href } here once one exists.
    apply: null,
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
    // The co-branded name used on the program's own page, F6S and Luma.
    brandName: "NGEN x Honors Fund $150K Pitch Competition",
    summary:
      "Pitch your company and compete against other founders for a $150K investment from Honors Fund.",
    description:
      "NGEN and Honors Fund run the $150K Pitch Competition in rounds, several times a year. Each round, up to 10 finalist teams pitch virtually to the Honors Fund team, and the winner receives a $150K SAFE investment. Because it's virtual, founders can apply from anywhere.",
    audience: "Student, recent grad and faculty founders building software",
    apply: { label: "Apply on F6S", href: "https://www.f6s.com/150k-pitch-competition-18", hideOnEvents: true },
    /**
     * The current round. Update these each round; everything else on the
     * page stays. After `closesAt`, the page switches itself to "Next round
     * opening soon" with the email signup, so it never shows a passed date.
     * Set `lumaHref` once the final is on the Luma calendar.
     */
    round: {
      name: "December 2026 Round",
      closesAt: "2026-11-27T23:59:00-05:00",
      deadlineLabel: "Friday, November 27",
      finalLabel: "Virtual final in early December",
      lumaHref: null,
    },
    terms: [
      "Prize: a $150K SAFE at a $2M post-money valuation, which can increase with prior rounds or strong traction. Pro rata rights included.",
      "Software startups, legally incorporated. Honors Fund typically invests in Delaware C Corporations.",
      "At least one founder is a student, recent grad (within 24 months), post-doc or faculty member planning to work on the company full-time.",
      "Open to founders in the USA, Canada and the UK.",
    ],
    partner: {
      name: "Honors Fund",
      href: "https://honorsfund.com",
      logo: { src: "/logos/firms/honors-fund.png", width: 1010, height: 219 },
      // Honors Fund's own description, from honorsfund.com.
      line: "Honors Fund is investing $25M in first checks into student and faculty software startups.",
      stats: [
        { value: "29", label: "startups backed" },
        { value: "$10M+", label: "deployed since 2022" },
      ],
    },
    // TODO(photo): replace. This is the first conference's audience (also on
    // About and home); use one from a pitch competition, e.g. pitch-competitions.jpg.
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
