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
 *   region     - "west" for the California schools, "east" for the rest.
 *                Only used to keep the two clusters interleaved in the
 *                marquee (see UniversityMarquee.jsx) so the run of
 *                California logos never reads as one block.
 *
 * Order below is the first-paint order (the marquee reshuffles it on
 * mount) — West/East alternating, so no two California schools sit next
 * to each other, including across the loop seam.
 */

export const universities = [
  { name: "Berkeley", logo: "/logos/universities/berkeley.png", logoHeight: 44, region: "west" },
  { name: "Harvard", logo: "/logos/universities/harvard.png", logoHeight: 40, region: "east" },
  { name: "Stanford", logo: "/logos/universities/stanford.png", logoHeight: 32, region: "west" },
  { name: "Columbia", logo: "/logos/universities/columbia.png", logoHeight: 30, region: "east" },
  { name: "Caltech", logo: "/logos/universities/caltech.png", logoHeight: 23, region: "west" },
  { name: "Princeton", logo: "/logos/universities/princeton.png", logoHeight: 46, region: "east" },
  { name: "UCLA", logo: "/logos/universities/ucla.png", logoHeight: 23, region: "west" },
  { name: "Yale", logo: "/logos/universities/yale.png", logoHeight: 38, region: "east" },
  { name: "MIT", logo: "/logos/universities/mit.png", logoHeight: 38, region: "east" },
  { name: "Brown", logo: "/logos/universities/brown.png", logoHeight: 46, region: "east" },
  { name: "Cornell", logo: "/logos/universities/cornell.png", logoHeight: 64, region: "east" },
  { name: "NYU", logo: "/logos/universities/nyu.png", logoHeight: 34, region: "east" },
  // Duke's source PNG has ~13.5% empty canvas margin (measured via alpha
  // bbox scan) baked in around the crest+wordmark lockup, so its weight
  // is knocked down from the crest-only tuning to net out the same
  // rendered ink size as the others.
  { name: "Duke", logo: "/logos/universities/duke.png", logoHeight: 60, region: "east" },
  { name: "Dartmouth", logo: "/logos/universities/dartmouth.png", logoHeight: 38, region: "east" },
  { name: "Penn", logo: "/logos/universities/penn.png", logoHeight: 42, region: "east" },
];
