/**
 * NGEN logo. Real brand files live under /public/logos/brand/. The
 * standard ("navy") version is navy ink and disappears on a dark
 * background, so there's a matching "-onnavy" (white) file for every
 * navy/dark surface — pick the pair with `variant`, and whether to
 * show the mountain mark alone or the mark + "NGEN" wordmark with
 * `showWordmark`.
 *
 * variant: "navy" (for light backgrounds) | "white" (for navy/dark backgrounds)
 */
const SOURCES = {
  full: {
    // "-v3" ("NGEN Logo New") is a deliberate filename change (not just
    // an in-place edit) so browsers/CDNs holding a cached copy under an
    // old name are forced to fetch the current one. The onnavy (white)
    // variant is generated from the same source — it only ships as one
    // navy-ink file, so the mountain/wordmark strokes are recolored
    // white in code (keeping the orange dots orange) rather than by
    // hand; see the comment above if that file ever needs regenerating.
    navy: "/logos/brand/ngen-logo-full-v3.png",
    white: "/logos/brand/ngen-logo-full-onnavy-v3.png",
  },
  mark: {
    navy: "/logos/brand/ngen-logo-mark.png",
    white: "/logos/brand/ngen-logo-mark-onnavy.png",
  },
};

export default function Logo({ variant = "navy", showWordmark = true, className = "" }) {
  const src = SOURCES[showWordmark ? "full" : "mark"][variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-aspect brand mark, no benefit from Next's raster image optimizer
    <img src={src} alt="NGEN" className={className} />
  );
}
