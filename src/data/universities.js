/**
 * The 15 universities NGEN's student founders come from.
 * ----------------------------------------------------------------------
 * Logos are the official files in /public/logos/universities, recoloured
 * into NGEN's one ink and trimmed to the mark in /public/logos/universities/ink
 * (white detail inside crests is kept as cut-outs).
 *
 * `w`, `h` are the trimmed file's pixels and `fill` the share of that box
 * the ink covers. <UniversityLogo> uses them to give every logo the same
 * inked area, so a heavy block (Caltech) and a fine seal (Cornell) read
 * at the same weight.
 *
 * `ivy` marks the eight Ivy League schools; the home range makes them the
 * summits and the other seven the foothills.
 *
 * Order: alphabetical. Not partners or sponsors: where students come from.
 */

export const universities = [
  { name: "Brown", file: "brown", ivy: true, w: 704, h: 351, fill: 0.189 },
  { name: "Caltech", file: "caltech", w: 800, h: 193, fill: 0.434 },
  // Official wordmark from Wikimedia Commons (Carnegie_Mellon_wordmark.svg).
  // `short` is the label under its foothill, where the full name won't fit.
  { name: "Carnegie Mellon", short: "CMU", file: "cmu", w: 800, h: 121, fill: 0.231 },
  { name: "Columbia", file: "columbia", ivy: true, w: 800, h: 128, fill: 0.169 },
  { name: "Cornell", file: "cornell", ivy: true, w: 784, h: 254, fill: 0.138 },
  { name: "Dartmouth", file: "dartmouth", ivy: true, w: 800, h: 174, fill: 0.145 },
  { name: "Duke", file: "duke", w: 800, h: 432, fill: 0.202 },
  { name: "Harvard", file: "harvard", ivy: true, w: 800, h: 202, fill: 0.235 },
  { name: "MIT", file: "mit", w: 800, h: 189, fill: 0.33 },
  { name: "NYU", file: "nyu", w: 440, h: 76, fill: 0.247 },
  { name: "Penn", file: "penn", ivy: true, w: 796, h: 259, fill: 0.262 },
  { name: "Princeton", file: "princeton", ivy: true, w: 797, h: 218, fill: 0.245 },
  { name: "Stanford", file: "stanford", w: 667, h: 162, fill: 0.282 },
  { name: "UCLA", file: "ucla", w: 800, h: 258, fill: 0.401 },
  { name: "Yale", file: "yale", ivy: true, w: 797, h: 193, fill: 0.19 },
];
