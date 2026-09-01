import { whatWeDo } from "./whatWeDo";

/**
 * Top navigation config.
 * -----------------------
 * This is the ONLY place nav labels and links live. Change wording or a
 * destination here and it updates everywhere the nav is rendered
 * (desktop dropdowns + mobile accordion + footer sitemap).
 *
 * Grouped around the three audiences the site serves — Students
 * (Programs), capital partners and founders (Capital Network), and
 * everyone else (About) — each a dropdown with a stable `id` used for
 * aria-controls wiring.
 *
 * The Programs dropdown's items are generated from src/data/whatWeDo.js,
 * filtered to the flagship programs — each gets its own /events/[slug]
 * page, so edit titles/links there, not here, to keep the dropdown and
 * the pages in sync. Workshops is intentionally excluded from this list
 * (its /events/workshops page still exists, just isn't in the nav).
 *
 * The three CTAs are a fixed set: Partner and Donate (secondary, static)
 * and Active Applications (primary, links to /apply).
 *
 * Each group item is either:
 *   - a dropdown:  { id, label, type: "dropdown", items: [{ label, href, external? }, ...] }
 *   - a link:      { label, type: "link", href }
 * Each CTA item is either:
 *   - a button:    { label, type: "button", href } — solid orange pill (primary CTA)
 *   - a secondary
 *     button:      { label, type: "button-secondary", href } — outlined pill
 */

// Public launch switch: subpages exist and keep getting built/edited, but
// stay unlinked from the live site until this flips to "true" (set
// NEXT_PUBLIC_NAV_LIVE=true in the host's env vars, then redeploy — no
// code change needed). While false, Header/Footer render logo-only.
export const NAV_LIVE = process.env.NEXT_PUBLIC_NAV_LIVE === "true";

const PROGRAM_SLUGS = ["trailblazers", "research-conferences", "founder-treks", "pitch-competitions"];

export const navGroups = [
  {
    id: "programs",
    label: "Programs",
    type: "dropdown",
    items: whatWeDo
      .filter((program) => PROGRAM_SLUGS.includes(program.slug))
      .map((program) => ({
        label: program.title,
        href: `/events/${program.slug}`,
      })),
  },
  {
    id: "capital-network",
    label: "Capital Network",
    type: "dropdown",
    items: [
      { label: "For Investors", href: "/capital-network/investors" },
      { label: "For Founders", href: "/capital-network/founders" },
    ],
  },
  {
    id: "about",
    label: "About",
    type: "dropdown",
    items: [
      { label: "Mission & Story", href: "/about/mission-story" },
      { label: "Our Team", href: "/about/team" },
      { label: "Impact & Metrics", href: "/impact" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const ctaItems = [
  { label: "Active Applications", type: "button", href: "/apply" },
  { label: "Partner", type: "button-secondary", href: "/partner" },
  { label: "Donate", type: "button-secondary", href: "/donate" },
];

export const navItems = [...navGroups, ...ctaItems];
