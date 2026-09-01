/**
 * Sponsors — the single source of truth for the /sponsors ("Our
 * Partners") page. Every sponsor is grouped by `category` rather than
 * by recency.
 *
 * University partners are intentionally NOT included here — NGEN has
 * no formal sponsorship relationship with partner schools, so listing
 * them as sponsors would misrepresent that relationship. See
 * src/data/universities.js for the homepage's #community honeycomb
 * section, which remains the source for partner-school logos.
 *
 * This is a separate module from src/data/sponsors.js (still used
 * elsewhere if referenced).
 *
 * Fields:
 *   id, name, logo, category, tier, description, websiteUrl, isFeatured
 *   category  - 'Venture & Capital' | 'Platform & Product' |
 *               'Venue & Hospitality'
 *   tier      - freeform status badge, e.g. "Current", "Alumni"
 */

/**
 * @typedef {Object} Sponsor
 * @property {string} id
 * @property {string} name
 * @property {string|null} logo
 * @property {'Venture & Capital'|'Platform & Product'|'Venue & Hospitality'} category
 * @property {string} tier
 * @property {string} description
 * @property {string} websiteUrl
 * @property {boolean} isFeatured
 */

/** @type {Sponsor[]} */
export const sponsors = [
  // Venture & Capital
  {
    id: "honors-fund",
    name: "Honors Fund",
    logo: "/logos/sponsors/honors-fund-logo.avif",
    category: "Venture & Capital",
    tier: "Current",
    description: "A venture fund backed by CEAS Investments, writing $150K checks into student and first-time founders.",
    websiteUrl: "https://honorsfund.com",
    isFeatured: true,
  },
  {
    id: "m31-capital",
    name: "M31 Capital",
    logo: "/logos/sponsors/m31-capital-logo.png",
    category: "Venture & Capital",
    tier: "Alumni",
    // TODO: "M31 Capital" is ambiguous — several distinct firms share this
    // name. Confirm which one sponsored NGEN before publishing a real
    // description or website link.
    description: "TODO: confirm which M31 Capital this is, the name is shared by multiple unrelated firms.",
    websiteUrl: "#",
    isFeatured: false,
  },
  {
    id: "ovo-fund",
    name: "OVO Fund",
    logo: "/logos/sponsors/ovo-fund-logo.avif",
    category: "Venture & Capital",
    tier: "Alumni",
    description: "A pre-seed and seed-stage venture firm backing early founders in the Bay Area and beyond.",
    websiteUrl: "https://www.ovofund.com",
    isFeatured: false,
  },
  {
    id: "bullmont",
    name: "BullMont",
    logo: "/logos/partners/bullmont-capital.png",
    category: "Venture & Capital",
    tier: "Alumni",
    description: "A venture studio backing student founders with $10K to $100K SAFE notes.",
    websiteUrl: "https://bullmont.vc",
    isFeatured: false,
  },
  {
    id: "sosv-indiebio",
    name: "SOSV IndieBio",
    logo: null,
    category: "Venture & Capital",
    tier: "Alumni",
    description: "A biotech-focused startup accelerator and seed fund, part of SOSV.",
    websiteUrl: "https://indiebio.co",
    isFeatured: false,
  },
  {
    id: "blue-gold-ventures",
    name: "Blue & Gold Ventures",
    logo: null,
    category: "Venture & Capital",
    tier: "Alumni",
    description: "A student-run venture fund investing $3K to $15K SAFEs into ambitious student founders.",
    websiteUrl: "https://www.thebluegoldventures.com",
    isFeatured: false,
  },
  {
    id: "jpmorgan",
    name: "JPMorgan",
    logo: null,
    category: "Venture & Capital",
    tier: "Alumni",
    description: "A global financial services firm and investment bank.",
    websiteUrl: "https://www.jpmorgan.com",
    isFeatured: false,
  },

  // Platform & Product
  {
    id: "mercury",
    name: "Mercury",
    logo: "/logos/sponsors/mercury-logo.png",
    category: "Platform & Product",
    tier: "Current",
    description: "Business banking built for startups: accounts, credit cards, and treasury tools in one platform.",
    websiteUrl: "https://mercury.com",
    isFeatured: true,
  },
  {
    id: "protopie",
    name: "ProtoPie",
    logo: "/logos/sponsors/protopie-logo.png",
    category: "Platform & Product",
    tier: "Alumni",
    description: "A no-code interactive prototyping tool used by top product design teams to test UI/UX ideas.",
    websiteUrl: "https://www.protopie.io",
    isFeatured: false,
  },

  // Venue & Hospitality
  {
    id: "cure",
    name: "Cure",
    logo: null,
    category: "Venue & Hospitality",
    tier: "Alumni",
    description: "A health innovation campus and lab space for biomedicine founders in New York City.",
    websiteUrl: "https://wewillcure.com",
    isFeatured: false,
  },
  {
    id: "avo",
    name: "AVO",
    logo: null,
    category: "Venue & Hospitality",
    tier: "Alumni",
    description: "A fast-casual restaurant chain serving scratch-made salads, bowls, and avocado toasts.",
    websiteUrl: "https://orderavo.com",
    isFeatured: false,
  },
  {
    id: "sweetgreen",
    name: "Sweetgreen",
    logo: null,
    category: "Venue & Hospitality",
    tier: "Alumni",
    description: "A fast-casual restaurant chain known for salads and healthy bowls.",
    websiteUrl: "https://www.sweetgreen.com",
    isFeatured: false,
  },
  {
    id: "dig-inn",
    name: "Dig Inn",
    logo: null,
    category: "Venue & Hospitality",
    tier: "Alumni",
    description: "A farm-to-table fast-casual restaurant chain.",
    websiteUrl: "https://www.diginn.com",
    isFeatured: false,
  },
];

/**
 * Sponsors flagged for prominent placement within their category.
 * @returns {Sponsor[]}
 */
export function getFeaturedSponsors() {
  return sponsors.filter((s) => s.isFeatured);
}

/**
 * Sponsors in a given category, in declaration order.
 * @param {Sponsor['category']} category
 * @returns {Sponsor[]}
 */
export function getSponsorsByCategory(category) {
  return sponsors.filter((s) => s.category === category);
}
