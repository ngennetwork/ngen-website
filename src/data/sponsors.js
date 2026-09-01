/**
 * /sponsors page. Not to be confused with src/data/partners.js, which is
 * the Investors page's separate "Past Partnerships" logo strip — this is
 * the full page with descriptions, websites, and three tiers (current,
 * previous, food) plus event hosts.
 *
 * Financial sponsors (currentSponsors/previousSponsors) and venue/office
 * hosts (eventHosts) are deliberately kept in separate sections rather
 * than one combined logo grid — putting, say, two competing law firms
 * or banks side by side in the same generic grid creates exactly the
 * brand friction a host is trying to avoid by hosting in the first
 * place. Hosts are shown per event/city (see the `event` field) instead.
 *
 * Fields (sponsors):
 *   name       - sponsor name
 *   oneLiner   - one sentence describing what they do (sourced from
 *                their own site/press so it's accurate, not guessed)
 *   website    - their site; the card links out to this
 *   logo       - path under /public/logos/, or null if not supplied yet
 *                (card falls back to name text)
 *   darkChip   - true if the logo file is white/light-on-transparent
 *                (Mercury's is) and needs a dark background behind it
 *                to actually be visible on our white cards
 *
 * Fields (hosts): name, event (e.g. "Spring 2026 NYC Showcase"),
 * oneLiner — TODO, no hosts supplied yet.
 */

export const currentSponsors = [
  {
    name: "Mercury",
    oneLiner: "Business banking built for startups: accounts, credit cards, and treasury tools in one platform.",
    website: "https://mercury.com",
    logo: "/logos/sponsors/mercury-logo.png",
    darkChip: true,
  },
  {
    name: "Honors Fund",
    oneLiner:
      "A venture fund backed by CEAS Investments, writing $150K checks into student and first-time founders.",
    website: "https://honorsfund.com",
    logo: "/logos/sponsors/honors-fund-logo.avif",
    darkChip: false,
  },
];

export const previousSponsors = [
  {
    // TODO: "M31 Capital" is ambiguous — there are several distinct firms
    // sharing this name (a crypto/blockchain fund, a China-focused growth
    // equity fund, others). Confirm which one sponsored NGEN before
    // publishing a description or a website link, so we don't credit the
    // wrong company.
    name: "M31 Capital",
    oneLiner: "TODO: confirm which M31 Capital this is, the name is shared by multiple unrelated firms.",
    website: "#",
    logo: "/logos/sponsors/m31-capital-logo.png",
    darkChip: false,
  },
  {
    name: "OVO Fund",
    oneLiner: "A pre-seed and seed-stage venture firm backing early founders in the Bay Area and beyond.",
    website: "https://www.ovofund.com",
    logo: "/logos/sponsors/ovo-fund-logo.avif",
    darkChip: false,
  },
  {
    name: "ProtoPie",
    oneLiner: "A no-code interactive prototyping tool used by top product design teams to test UI/UX ideas.",
    website: "https://www.protopie.io",
    logo: "/logos/sponsors/protopie-logo.png",
    darkChip: false,
  },
  {
    name: "BullMont",
    oneLiner: "A venture studio backing student founders with $10K to $100K SAFE notes.",
    website: "https://bullmont.vc",
    logo: "/logos/partners/bullmont-capital.png",
    darkChip: false,
  },
  {
    name: "SOSV IndieBio",
    oneLiner: "A biotech-focused startup accelerator and seed fund, part of SOSV.",
    website: "https://indiebio.co",
    logo: null,
  },
  {
    name: "Cure",
    oneLiner: "A health innovation campus and lab space for biomedicine founders in New York City.",
    website: "https://wewillcure.com",
    logo: null,
  },
  {
    name: "Blue & Gold Ventures",
    oneLiner: "A student-run venture fund investing $3K to $15K SAFEs into ambitious student founders.",
    website: "https://www.thebluegoldventures.com",
    logo: null,
  },
  {
    name: "JPMorgan",
    oneLiner: "A global financial services firm and investment bank.",
    website: "https://www.jpmorgan.com",
    logo: null,
  },
];

export const foodPartners = [
  {
    name: "AVO",
    oneLiner: "A fast-casual restaurant chain serving scratch-made salads, bowls, and avocado toasts.",
    website: "https://orderavo.com",
    logo: null,
  },
  {
    name: "Sweetgreen",
    oneLiner: "A fast-casual restaurant chain known for salads and healthy bowls.",
    website: "https://www.sweetgreen.com",
    logo: null,
  },
  {
    name: "Dig Inn",
    oneLiner: "A farm-to-table fast-casual restaurant chain.",
    website: "https://www.diginn.com",
    logo: null,
  },
];

export const eventHosts = [
  {
    name: "TODO: host name not yet supplied",
    event: "TODO: which event/city not yet supplied",
    oneLiner: "TODO: description not yet written.",
    isPlaceholder: true,
  },
];
