/**
 * Startups — the single source of truth for the /startups directory.
 * ======================================================================
 * Every startup's identity, stage, batch, industry, and founder info
 * live HERE. This is a separate module from src/data/startups.js/.json
 * (the admin-editable data behind the About page's "Featured Startups"
 * widget, edited via /admin/startups) — that flow is untouched.
 *
 * Logos/names/websiteUrl below are seeded from the real startups already
 * in src/data/startups.json so the directory isn't showing fabricated
 * companies. batch/stage/industry are realistic placeholders — edit
 * here to reflect real cohorts. founders are filled in where named in
 * public press coverage; TODO where not yet verified.
 */

/**
 * @typedef {Object} Founder
 * @property {string} name
 * @property {string} role
 * @property {string|null} linkedin
 */

/**
 * @typedef {Object} Startup
 * @property {string} id
 * @property {string} name
 * @property {string} logo
 * @property {string} tagline
 * @property {string} description
 * @property {string} batch
 * @property {'Idea'|'MVP'|'Early Revenue'|'Scaling'} stage
 * @property {string} industry
 * @property {string} websiteUrl
 * @property {string|null} articleTitle       headline of the press coverage at
 *   websiteUrl, for cards that link out by article title rather than a button.
 * @property {Founder[]} founders
 * @property {boolean} isFeatured
 * @property {number|null} fundingRaisedUsd  press-sourced capital raised (or
 *   non-dilutive prize money); null where undisclosed — never estimated.
 * @property {string|null} accelerator       e.g. "Y Combinator"; null if none.
 * @property {string|null} photo             team photo, for richer alumni cards.
 * @property {string} [photoPosition]         CSS object-position for `photo`
 *   (e.g. "center 15%"); omit to use object-cover's default centered crop.
 */

/** @type {Startup[]} */
export const startups = [
  {
    id: "freya",
    name: "Freya",
    logo: "/logos/startups/freya-logo.jpeg",
    tagline: "Voice AI agents for financial services.",
    description:
      "Freya builds human-like voice automation for financial services firms, helping them handle customer calls at scale without losing the human touch.",
    batch: "Fall 2025",
    stage: "Early Revenue",
    industry: "Fintech",
    websiteUrl: "https://pulse2.com/freya-3-5-million/",
    articleTitle: "Freya: $3.5 Million Raised To Expand Human-Like Voice Automation Technology",
    founders: [
      // TODO: confirm founder names/roles/LinkedIn — not named in current press coverage.
    ],
    isFeatured: true,
    fundingRaisedUsd: 3500000,
    accelerator: null,
    photo: "/team-photos/freya-photo.webp",
  },
  {
    id: "series",
    name: "Series",
    logo: "/logos/startups/series-logo.png",
    tagline: "AI-powered social network matching founders and mentors.",
    description:
      "Series is a social network founded by two Yale students, built to connect founders with mentors through AI-driven matching.",
    batch: "Spring 2025",
    stage: "Early Revenue",
    industry: "Social / Consumer",
    websiteUrl: "https://www.forbes.com/sites/davidprosser/2025/04/04/how-two-yale-juniors-just-raised-31-million-for-their-social-network/",
    articleTitle: "How Two Yale Juniors Just Raised $3.1 Million For Their Social Network",
    founders: [
      { name: "Nathaneo Johnson", role: "Co-Founder", linkedin: null },
      { name: "Sean Hargrow", role: "Co-Founder", linkedin: null },
    ],
    isFeatured: true,
    fundingRaisedUsd: 3100000,
    accelerator: null,
    photo: "/team-photos/series-photo.webp",
  },
  {
    id: "nerd-apply",
    name: "Nerd Apply",
    logo: "/logos/startups/nerdapply-logo.jpeg",
    tagline: "Privacy-first data platform for college admissions counseling.",
    description:
      "Nerd Apply is a college counseling platform helping students and counselors manage the admissions process with a privacy-first approach to student data.",
    batch: "Fall 2024",
    stage: "Early Revenue",
    industry: "Edtech",
    websiteUrl: "https://www.edtechinnovationhub.com/news/nerd-apply-raises-32-million-in-seed-funding-for-its-college-admissions-counseling-platform",
    articleTitle: "Nerd Apply raises $3.2 million in seed funding for its college admissions counseling platform",
    founders: [
      // TODO: confirm founder names/roles/LinkedIn — not named in current press coverage.
    ],
    isFeatured: true,
    fundingRaisedUsd: 3200000,
    accelerator: null,
    photo: "/team-photos/nerdapply-photo.jpeg",
  },
  {
    id: "cloak",
    name: "Cloak",
    logo: "/logos/startups/cloak-logo.png",
    tagline: "Protects online publisher content against AI scraping.",
    description:
      "Cloak works with publishers (news, novels, screenplays) to protect their content against AI scraping, giving creators control over how their work is used to train models.",
    batch: "Spring 2026",
    stage: "MVP",
    industry: "Developer Tools / Security",
    websiteUrl: "https://news.wharton.upenn.edu/press-releases/2026/05/cloak-wins-75000-perlman-grand-prize-in-venture-lab-startup-challenge/",
    articleTitle: "Cloak Wins $75,000 Perlman Grand Prize in Venture Lab Startup Challenge",
    founders: [
      { name: "Rishi Ambavanekar", role: "Co-Founder", linkedin: null },
      { name: "Tyler Sacharow", role: "Co-Founder", linkedin: null },
    ],
    isFeatured: true,
    // Perlman Grand Prize winnings — non-dilutive prize money, not a priced round.
    fundingRaisedUsd: 75000,
    accelerator: null,
    photo: "/team-photos/cloak-photo.jpg",
  },
  {
    id: "doe",
    name: "Doe",
    logo: "/logos/startups/doe-lockup-dark.svg",
    tagline: "AI platform building company-native agents to automate work.",
    description:
      "Doe connects to your tools and lets AI agents actually do the work, automating tasks across a company's existing software stack.",
    batch: "Spring 2026",
    stage: "MVP",
    industry: "AI / Productivity",
    websiteUrl: "https://www.ycombinator.com/launches/OyO-doe-a-new-productivity-platform",
    articleTitle: "Doe: A new productivity platform | Y Combinator",
    founders: [
      // TODO: confirm founder names/roles/LinkedIn — not named in current press coverage.
    ],
    isFeatured: true,
    // Launched via Y Combinator; funding amount not publicly disclosed.
    fundingRaisedUsd: null,
    accelerator: "Y Combinator",
    photo: "/team-photos/doe-photo.jpeg",
    // Source photo is a tall full-body shot — object-cover's default
    // center crop lands on his torso, not his face. Biasing toward the
    // top of the frame brings his face into the visible crop.
    photoPosition: "center 30%",
  },
  {
    id: "cai-creative",
    name: "Cai Creative",
    logo: "/logos/startups/cai-creative-logo.png",
    tagline: "AI co-composer helping musicians create chords and melodies.",
    description:
      "Cai Creative is an AI co-composer that helps musicians generate chords and melodies, built by a mathematician uniting art and technology.",
    batch: "Fall 2025",
    stage: "Idea",
    industry: "Creative Tools",
    websiteUrl: "https://www.inverse.com/tech/how-mathematician-reuel-williams-is-uniting-art-technology",
    articleTitle: "How Mathematician Reuel Williams Is Uniting Art & Technology",
    founders: [
      { name: "Reuel Williams", role: "Founder", linkedin: null },
    ],
    isFeatured: true,
    fundingRaisedUsd: null,
    accelerator: null,
    photo: "/team-photos/cai-creative-photo.avif",
  },
];

/**
 * The full directory, in declaration order.
 * @returns {Startup[]}
 */
export function getStartups() {
  return startups;
}

/**
 * Startups flagged for prominent placement (top of the directory).
 * @returns {Startup[]}
 */
export function getFeaturedStartups() {
  return startups.filter((s) => s.isFeatured);
}

/**
 * Sum of every startup's disclosed fundingRaisedUsd. Undisclosed rounds
 * (null) are excluded rather than estimated.
 * @returns {number}
 */
export function getTotalCapitalRaised() {
  return startups.reduce((sum, s) => sum + (s.fundingRaisedUsd ?? 0), 0);
}

/**
 * Startups with a named accelerator (e.g. Y Combinator).
 * @returns {Startup[]}
 */
export function getAcceleratorPlacements() {
  return startups.filter((s) => s.accelerator);
}

/**
 * Startups from a given batch (e.g. "Spring 2026").
 * @param {string} batch
 * @returns {Startup[]}
 */
export function getStartupsByBatch(batch) {
  return startups.filter((s) => s.batch === batch);
}

/**
 * Startups in a given industry.
 * @param {string} industry
 * @returns {Startup[]}
 */
export function getStartupsByIndustry(industry) {
  return startups.filter((s) => s.industry === industry);
}
