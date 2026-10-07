/**
 * Startups from the NGEN network: the single source of truth.
 * ======================================================================
 * Read by home (the six largest raises) and /impact (all of them), in this
 * order: largest raise first. `badge` is what the card shows: money raised,
 * or the accelerator that backed them where the amount isn't public.
 *
 * Sources: press where it exists. Series shows $8.2M raised in total; its
 * TechCrunch headline covers the $5.1M pre-seed within that. Zorbe ($8M)
 * and Nirvana Carbon Solutions ($2M) come from Juan (October 2026), before
 * any press, so they link to their own sites. Doe's $500K is Y Combinator's
 * standard deal, which every company in a YC batch receives.
 */

/**
 * @typedef {Object} Startup
 * @property {string} id
 * @property {string} name
 * @property {string} badge
 * @property {string} description
 * @property {{ src: string, alt: string, width: number, height: number, position?: string }} [photo]  team photo; without one, the card shows the logo
 * @property {{ src: string, width: number, height: number }} logo
 * @property {{ title: string, href: string }} [press]  the coverage of the raise
 * @property {string} [site]  the company's own site, linked where there is no press yet
 * @property {string[]} founders  names from public coverage or the founders' own profiles; empty if unnamed there
 */

/** @type {Startup[]} */
export const startups = [
  {
    id: "series",
    name: "Series",
    badge: "$8.2M raised",
    description: "AI-powered social network matching founders and mentors.",
    photo: {
      src: "/team-photos/series-photo.png",
      alt: "The Series founders",
      width: 870,
      height: 840,
      position: "center 25%",
    },
    logo: { src: "/logos/startups/series-logo.png", width: 453, height: 315 },
    press: {
      title: "Two College Kids Raise a $5.1 Million Pre-Seed to Build an AI Social Network in iMessage",
      href: "https://techcrunch.com/2026/04/24/two-college-kids-raise-a-5-1-million-pre-seed-to-build-an-ai-social-network-in-imessage/",
    },
    founders: ["Nathaneo Johnson", "Sean Hargrow"],
  },
  {
    id: "zorbe",
    name: "Zorbe",
    badge: "$8M raised",
    description: "Company-owned AI models that beat the frontier, backed by a16z\u00a0speedrun.",
    // The founders' own profile photos (LinkedIn), side by side
    photo: {
      src: "/team-photos/zorbe-photo.webp",
      alt: "Pranay Sadani and Yash Iyer, Zorbe's co-founders",
      width: 600,
      height: 450,
      position: "center 30%",
    },
    logo: { src: "/logos/startups/zorbe-mark.webp", width: 978, height: 1118 },
    site: "https://www.zorbe.ai/",
    founders: ["Pranay Sadani", "Yash Iyer"],
  },
  {
    id: "freya",
    name: "Freya",
    badge: "$3.5M raised",
    description: "Voice AI agents for financial services.",
    photo: { src: "/team-photos/freya-photo.webp", alt: "The Freya team", width: 1280, height: 720 },
    logo: { src: "/logos/startups/freya-logo.jpeg", width: 200, height: 200 },
    press: {
      title: "Freya: $3.5 Million Raised To Expand Human-Like Voice Automation Technology",
      href: "https://pulse2.com/freya-3-5-million/",
    },
    founders: [],
  },
  {
    id: "nerd-apply",
    name: "Nerd Apply",
    badge: "$3.2M raised",
    description: "Privacy-first data platform for college admissions\u00a0counseling.",
    photo: { src: "/team-photos/nerdapply-photo.jpeg", alt: "The Nerd Apply team", width: 1280, height: 1916 },
    logo: { src: "/logos/startups/nerdapply-logo.jpeg", width: 175, height: 150 },
    press: {
      title: "Nerd Apply raises $3.2 million in seed funding for its college admissions counseling platform",
      href: "https://www.edtechinnovationhub.com/news/nerd-apply-raises-32-million-in-seed-funding-for-its-college-admissions-counseling-platform",
    },
    founders: [],
  },
  {
    id: "nirvana-carbon",
    name: "Nirvana Carbon\u00a0Solutions",
    badge: "$2M raised",
    description: "Turns agricultural waste into critical input products for old-\u2060world\u00a0industry.",
    // Credit: Nirvana Carbon, via The Vertical (May 2025)
    photo: {
      src: "/team-photos/nirvana-photo.webp",
      alt: "Emma Limor and Sunrit Panda, Nirvana Carbon's co-founders, at Princeton",
      width: 800,
      height: 434,
      position: "50% 30%",
    },
    logo: { src: "/logos/startups/nirvana-mark.png", width: 160, height: 161 },
    site: "https://nirvanacarbon.com/",
    founders: ["Emma Limor", "Sunrit Panda"],
  },
  {
    id: "doe",
    name: "Doe",
    badge: "$500K raised",
    description: "AI platform building company-native agents to automate work.",
    photo: {
      src: "/team-photos/doe-photo.jpeg",
      alt: "The Doe team",
      width: 800,
      height: 1333,
      position: "center 30%",
    },
    logo: { src: "/logos/startups/doe-lockup-dark.svg", width: 200, height: 78 },
    press: {
      title: "Doe: A new productivity platform",
      href: "https://www.ycombinator.com/launches/OyO-doe-a-new-productivity-platform",
    },
    founders: [],
  },
  {
    id: "cloak",
    name: "Cloak",
    badge: "$75K raised",
    description: "Protects online publisher content against AI scraping.",
    photo: { src: "/team-photos/cloak-photo.jpg", alt: "The Cloak team", width: 900, height: 600 },
    logo: { src: "/logos/startups/cloak-logo.png", width: 1159, height: 455 },
    press: {
      title: "Cloak Wins $75,000 Perlman Grand Prize in Venture Lab Startup Challenge",
      href: "https://news.wharton.upenn.edu/press-releases/2026/05/cloak-wins-75000-perlman-grand-prize-in-venture-lab-startup-challenge/",
    },
    founders: ["Rishi Ambavanekar", "Tyler Sacharow"],
  },
  {
    id: "cai-creative",
    name: "Cai Creative",
    badge: "Techstars",
    description: "AI co-composer helping musicians create chords and\u00a0melodies.",
    photo: { src: "/team-photos/cai-creative-photo.avif", alt: "Cai Creative", width: 1840, height: 1120 },
    logo: { src: "/logos/startups/cai-creative-logo.png", width: 658, height: 450 },
    press: {
      title: "How Mathematician Reuel Williams Is Uniting Art & Technology",
      href: "https://www.inverse.com/tech/how-mathematician-reuel-williams-is-uniting-art-technology",
    },
    founders: ["Reuel Williams"],
  },
];

/** Where a card's last line points: the press that covered the raise, or the company's own site until there is some. */
export function sourceOf(startup) {
  if (startup.press) return startup.press;
  return { title: startup.site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: startup.site };
}
