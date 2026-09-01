/**
 * University logos (homepage marquee, "Represented Universities" section).
 * --------------------------------------------------------------------
 * Fields:
 *   name       - university name
 *   logo       - path under /public/logos/universities/ (full-color PNG),
 *                rendered in full color at all times — see
 *                UniversityMarquee.jsx. null falls back to plain name
 *                text, if a school doesn't have a logo file yet.
 *   logoHeight - px height to render the logo at (Tailwind height utility
 *                number, e.g. 48 = h-12). These are NOT all the same:
 *                the source files vary wildly in how much of the image
 *                is actual wordmark vs. crest/whitespace (a tight single-
 *                line wordmark like Columbia's reads much bigger at a
 *                given height than a stacked crest+two-line lockup like
 *                Duke's) — tuned by eye so the *lettering* reads as a
 *                consistent size across the grid, not the image box.
 */

export const universities = [
  { name: "Brown", logo: "/logos/universities/brown.png", logoHeight: 46 },
  { name: "Columbia", logo: "/logos/universities/columbia.png", logoHeight: 30 },
  { name: "Cornell", logo: "/logos/universities/cornell.png", logoHeight: 64 },
  { name: "Dartmouth", logo: "/logos/universities/dartmouth.png", logoHeight: 38 },
  // Duke's source PNG has ~13.5% empty canvas margin (measured via alpha
  // bbox scan) baked in around the crest+wordmark lockup, so its weight
  // is knocked down from the crest-only tuning to net out the same
  // rendered ink size as the others.
  { name: "Duke", logo: "/logos/universities/duke.png", logoHeight: 60 },
  { name: "Harvard", logo: "/logos/universities/harvard.png", logoHeight: 40 },
  { name: "MIT", logo: "/logos/universities/mit.png", logoHeight: 38 },
  { name: "NYU", logo: "/logos/universities/nyu.png", logoHeight: 34 },
  { name: "Penn", logo: "/logos/universities/penn.png", logoHeight: 42 },
  { name: "Princeton", logo: "/logos/universities/princeton.png", logoHeight: 46 },
  { name: "Yale", logo: "/logos/universities/yale.png", logoHeight: 38 },
];
