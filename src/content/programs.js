/**
 * Programs — the single source of truth.
 * ======================================================================
 * There are exactly FOUR programs: Trailblazers, Lab-to-Startup, Founder
 * Treks, and Pitch Competitions. (Workshops and Community used to live
 * here as pseudo-programs; they were folded into the four — workshops are
 * a format inside a program, Community is the network itself.)
 *
 * Every program's identity, copy, photos, application link, dates, and
 * status live HERE and nowhere else. Status badges, deadline lines, the
 * header's Apply CTA, the /events applications page, each
 * /programs/[slug] hero, and the home-page cards all derive from this
 * file via the helpers below — so a deadline is edited in exactly one
 * place and can never drift out of sync between pages again.
 *
 * ROUTES: evergreen program pages live at /programs and /programs/[slug].
 * /events is the applications + real-event-instances page.
 *
 * `src/data/whatWeDo.js` is now a thin *derived view* of this array (it
 * maps these objects into the older { title, photo, cardDescription, … }
 * shape the /programs/[slug] layouts still read), so those layouts keep
 * working unchanged.
 *
 * STATUS IS COMPUTED, NOT TRUSTED. The `status` field below is only the
 * baseline intent ("open" / "announced" / "archived"). Always read a
 * program's live status through getProgramStatus(slug), which downgrades
 * to "closed" once closesAt has passed and to "closing-soon" inside the
 * 14-day window — so a passed deadline can never render as open.
 *
 * Fields (see the Program typedef):
 *   slug, name, shortName, type
 *   tagline               one sentence (cards)
 *   description           a paragraph (page hero body)
 *   audience              'student' | 'partner' | 'both'
 *   status                'open' | 'closing-soon' | 'closed' | 'announced' | 'archived'
 *   opensAt, closesAt     ISO date strings or null
 *   nextEventDate, nextEventCity
 *   eligibility           short string
 *   applicationTimeEstimate  e.g. "~15 min"
 *   applicationUrl
 *   heroImage, cardImage
 *   stats                 array of { value, label }
 *   isFeatured            boolean
 *
 * `type` is retained beyond the spec's minimum because the /programs
 * directory's category filter and /programs/[slug]'s layout selection
 * key off it.
 *
 * NOTE: the dates below are realistic placeholders seeded from the copy
 * that used to be hardcoded in the layouts. Edit them here to reflect
 * real cycles — everything else updates automatically.
 */

/**
 * @typedef {Object} ProgramStat
 * @property {string} value
 * @property {string} label
 */

/**
 * @typedef {Object} Program
 * @property {string} slug
 * @property {string} name
 * @property {string} shortName
 * @property {string|null} type
 * @property {string} tagline
 * @property {string} description
 * @property {'student'|'partner'|'both'} audience
 * @property {'open'|'closing-soon'|'closed'|'announced'|'archived'} status
 * @property {string|null} opensAt
 * @property {string|null} closesAt
 * @property {string|null} nextEventDate
 * @property {string|null} nextEventCity
 * @property {string} eligibility
 * @property {string} applicationTimeEstimate
 * @property {string} applicationUrl
 * @property {string} heroImage
 * @property {string} cardImage
 * @property {ProgramStat[]} stats
 * @property {boolean} isFeatured
 */

/** @type {Program[]} */
export const programs = [
  {
    slug: "trailblazers",
    name: "Trailblazers Conferences",
    shortName: "Trailblazers",
    type: "trailblazers",
    tagline:
      "Flagship conference where student innovators meet one another and learn from experienced entrepreneurs and VCs.",
    description:
      "The Trailblazers Conference is NGEN's flagship event: a full day in New York City bringing together the sharpest student founders from every partner school. Attendees hear directly from operators and investors who've built and backed category-defining companies, then spend the rest of the day turning hallway conversations into co-founders, mentors, and first checks.",
    audience: "student",
    status: "open",
    opensAt: "2026-07-01",
    closesAt: "2026-08-08",
    nextEventDate: "2026-09-15",
    nextEventCity: "New York City",
    eligibility: "Students at NGEN partner universities",
    applicationTimeEstimate: "~15 min",
    applicationUrl: "https://space.ngennetwork.org",
    heroImage: "/about/events/conferences.jpg",
    cardImage: "/about/events/conferences.jpg",
    stats: [
      { value: "200+", label: "Top Student Founders" },
      { value: "50+", label: "Active VCs & Angels" },
      { value: "100%", label: "Free for Accepted Attendees" },
    ],
    isFeatured: true,
  },
  {
    slug: "research-conferences",
    name: "Lab-to-Startup Conferences",
    shortName: "Lab-to-Startup",
    type: "research",
    tagline:
      "Specialized conferences that help student researchers turn their work into real commercial applications.",
    description:
      "Lab-to-Startup Conferences bring together student founders working on deep tech, biotech, and other research-heavy ventures: the ideas that take longer to build but change more when they land. Sessions pair scientific rigor with startup speed: technical deep dives, translational-research panels, and direct access to investors who fund science-first companies.",
    audience: "student",
    // Last cycle's deadline (below) is already in the past — getProgramStatus
    // therefore computes "closed" and no page shows a live Apply button.
    status: "open",
    opensAt: "2026-02-01",
    closesAt: "2026-05-14",
    nextEventDate: null,
    nextEventCity: null,
    eligibility: "Student founders in deep tech, biotech, or applied research",
    applicationTimeEstimate: "~15 min",
    applicationUrl: "https://space.ngennetwork.org",
    heroImage: "/about/events/conferences.jpg",
    cardImage: "/about/events/conferences.jpg",
    stats: [
      { value: "3", label: "Research Tracks" },
      { value: "1 Day", label: "Symposium" },
    ],
    isFeatured: false,
  },
  {
    slug: "founder-treks",
    name: "Founder Treks",
    shortName: "Treks",
    type: "treks",
    tagline:
      "Curated office visits for actively raising founders to meet top VCs and angel groups and get live feedback.",
    description:
      "Founder Treks bring together select groups of brilliant, actively-raising founders for a day of back-to-back visits with VCs in their own offices. Instead of a cold email, founders walk in with a warm introduction and walk out with a real relationship, often the first meeting in a much longer conversation with that fund.",
    audience: "student",
    status: "open",
    opensAt: "2026-07-01",
    closesAt: "2026-08-30",
    nextEventDate: "2026-09-05",
    nextEventCity: "New York City",
    eligibility: "Actively-raising student founders",
    applicationTimeEstimate: "~10 min",
    applicationUrl: "/capital-network/founders",
    heroImage: "/about/events/founder-treks.jpg",
    cardImage: "/about/events/founder-treks.jpg",
    stats: [
      { value: "3", label: "Cities" },
      { value: "1 Day", label: "VC Hop Route" },
    ],
    isFeatured: true,
  },
  {
    slug: "pitch-competitions",
    name: "Pitch Competitions",
    shortName: "Pitch",
    type: "competitions",
    tagline:
      "Pitch opportunities for founders to win funding and land direct investments, both non-dilutive and dilutive.",
    description:
      "Pitch Competitions give student founders a real stage and a real check on the line: up to $150K from Honors Fund. Teams get direct feedback from the investors judging the room, not just a trophy, so even the founders who don't win walk away with sharper answers to the questions that matter most.",
    audience: "student",
    status: "open",
    opensAt: "2026-07-01",
    closesAt: "2026-09-20",
    nextEventDate: "2026-10-10",
    nextEventCity: "New York City",
    eligibility: "Student Founders",
    applicationTimeEstimate: "~15 min",
    applicationUrl: "https://pitch.ngennetwork.org",
    heroImage: "/about/events/pitch-competitions.jpg",
    cardImage: "/about/events/pitch-competitions.jpg",
    stats: [
      { value: "100+", label: "Teams" },
      { value: "5", label: "Finalists" },
      { value: "$150K", label: "Funding Pool" },
    ],
    isFeatured: true,
  },
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const CLOSING_SOON_DAYS = 14;

/**
 * Look up a single program by slug.
 * @param {string} slug
 * @returns {Program | null}
 */
export function getProgramBySlug(slug) {
  return programs.find((p) => p.slug === slug) ?? null;
}

/**
 * The dynamic status engine. Starts from the stored baseline `status`,
 * then overrides from the dates so a passed deadline can never read as
 * open:
 *   - a program flagged `archived` stays archived,
 *   - a `closesAt` in the past  → "closed",
 *   - a `closesAt` within 14 days → "closing-soon",
 *   - otherwise the stored baseline is returned.
 * @param {string} slug
 * @returns {Program['status']}
 */
export function getProgramStatus(slug) {
  const program = getProgramBySlug(slug);
  if (!program) return "closed";
  if (program.status === "archived") return "archived";

  if (program.closesAt) {
    const now = Date.now();
    const closes = new Date(program.closesAt).getTime();
    if (!Number.isNaN(closes)) {
      if (closes < now) return "closed";
      if (closes - now <= CLOSING_SOON_DAYS * MS_PER_DAY) return "closing-soon";
    }
  }

  return program.status;
}

/**
 * Programs currently accepting applications (computed status open or
 * closing-soon), in declaration order.
 * @returns {Program[]}
 */
export function getOpenPrograms() {
  return programs.filter((p) => {
    const status = getProgramStatus(p.slug);
    return status === "open" || status === "closing-soon";
  });
}

/**
 * The soonest upcoming deadline among open programs.
 * @returns {{ program: Program, date: string } | null}
 */
export function getNextDeadline() {
  const now = Date.now();
  const upcoming = getOpenPrograms()
    .filter((p) => p.closesAt && new Date(p.closesAt).getTime() >= now)
    .sort((a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime());
  if (upcoming.length === 0) return null;
  return { program: upcoming[0], date: upcoming[0].closesAt };
}

/**
 * Programs with a future nextEventDate, soonest first.
 * @returns {Program[]}
 */
export function getUpcomingEvents() {
  const now = Date.now();
  return programs
    .filter((p) => p.nextEventDate && new Date(p.nextEventDate).getTime() >= now)
    .sort((a, b) => new Date(a.nextEventDate).getTime() - new Date(b.nextEventDate).getTime());
}

/**
 * Human-readable deadline, e.g. "Closes Oct 3". Null-safe. Formatted in
 * UTC so a plain "2026-08-08" date renders the same in every timezone.
 * @param {string|null|undefined} date
 * @returns {string | null}
 */
export function formatDeadline(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
  return `Closes ${formatted}`;
}
