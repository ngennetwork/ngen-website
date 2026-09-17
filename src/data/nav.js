import { whatWeDo } from "./whatWeDo";

/**
 * Top navigation config.
 * -----------------------
 * This is the ONLY place nav labels and links live. Change wording or a
 * destination here and it updates everywhere the nav is rendered
 * (desktop dropdowns + mobile accordion + footer sitemap).
 *
 * The header is deliberately minimal: two dropdowns and ONE primary CTA.
 * Partner and Donate are NOT in the header — they live in the footer's
 * "Get Involved" column (see src/components/Footer.jsx).
 *
 * Programs holds both the four things students apply to (under an
 * "Events" subheading) AND Capital Network (For Founders / For
 * Investors, under its own subheading below a divider) — Capital
 * Network isn't a program students apply to, so it's set off from the
 * four rather than getting its own top-level slot. About is the second
 * dropdown, each with a stable `id` used for aria-controls wiring.
 *
 * The Programs dropdown's four program items are generated from
 * src/data/whatWeDo.js, a derived view of src/content/programs.js — each
 * with its own /programs/[slug] page. Add or rename a program in
 * programs.js and this dropdown follows automatically.
 *
 * The single CTA is Apply, pointing at /events — the one page that lists
 * open application cycles (with live status badges) and real event
 * instances.
 *
 * Each group item is one of:
 *   - a link:      { label, href, external? }
 *   - a divider:   { type: "divider" }               — a visual rule
 *   - a heading:   { type: "heading", label }         — a subsection label
 * Dividers/headings are presentational only (no href) — Header.jsx and
 * MobileNav.jsx render them as non-interactive; Footer.jsx's flat
 * sitemap list skips them and renders only the real links.
 *
 * Each CTA item is either:
 *   - a button:    { label, type: "button", href } — solid orange pill (primary CTA)
 *   - a secondary
 *     button:      { label, type: "button-secondary", href } — outlined pill
 */

// Public launch switch: subpages exist and keep getting built/edited, but
// stay unlinked from the live site until this flips to "true" (set
// NEXT_PUBLIC_NAV_LIVE=true in the host's env vars, then redeploy — no
// code change needed). While false, Header/Footer render logo-only.
// NOTE: local `next dev` renders the full nav regardless (see below), so
// the restructured site can be clicked through before it goes public.
const NAV_LIVE_ENV = process.env.NEXT_PUBLIC_NAV_LIVE === "true";
export const NAV_LIVE = NAV_LIVE_ENV || process.env.NODE_ENV !== "production";

export const navGroups = [
  {
    id: "programs",
    label: "Programs",
    type: "dropdown",
    items: [
      { type: "heading", label: "Events" },
      ...whatWeDo.map((program) => ({
        label: program.title,
        href: `/programs/${program.slug}`,
      })),
      { type: "divider" },
      { type: "heading", label: "Capital Network" },
      { label: "For Founders", href: "/capital-network/founders" },
      { label: "For Investors", href: "/capital-network/investors" },
    ],
  },
  {
    id: "about",
    label: "About",
    type: "dropdown",
    items: [
      { label: "Mission & Story", href: "/about/mission-story" },
      { label: "Team", href: "/about/team" },
      { label: "Impact", href: "/impact" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// One primary CTA, nothing else. /events is the applications page.
export const ctaItems = [{ label: "Apply", type: "button", href: "/events" }];

export const navItems = [...navGroups, ...ctaItems];
