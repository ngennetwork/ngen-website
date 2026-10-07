import { universities } from "@/data/universities";

/**
 * The Ivy range: where NGEN's students come from, drawn as NGEN's mountain.
 *
 * Each school is a summit. The eight Ivies are the high peaks, each with
 * the small notch on its left flank that NGEN's own mark has; the other
 * seven schools are foothills between them. Heights are a drawing, not
 * data: Ivy peaks vary a little, like a real ridge, so none reads as a rank.
 *
 * Everything is computed in a fixed drawing space (W x H). The SVG stretches
 * to its frame (preserveAspectRatio="none", strokes don't scale), and nodes,
 * logo cards and labels are HTML placed in percentages of the same space,
 * so they always sit on the line whatever the frame's shape.
 */

const BY_FILE = Object.fromEntries(universities.map((u) => [u.file, u]));

/** Left to right: Ivies and the others alternate, so foothills sit in the valleys. */
const ORDER_ALL = ["brown", "cmu", "columbia", "caltech", "cornell", "duke", "dartmouth", "mit", "harvard", "nyu", "penn", "stanford", "princeton", "ucla", "yale"];
const ORDER_IVY = ORDER_ALL.filter((f) => BY_FILE[f].ivy);

/** Summit heights (y, smaller is higher), in order of appearance. */
const IVY_Y = [152, 104, 170, 126, 96, 160, 112, 140];
const FOOT_Y = [282, 258, 290, 268, 276, 262, 286];
/** Valley floors between neighbours. */
const VALLEY_Y = [346, 318, 362, 330, 352, 324, 366, 338, 350, 316, 358, 334, 344, 326];
/** Small sideways offsets, so the summits don't fall on a metronome. */
const JITTER = [0, 14, -10, 8, -14, 6, 12, -8, 4, -12, 10, -6, -10, 8, 0];
/** Ivies whose right flank breaks on a rocky shoulder on the way down. */
const SHOULDER = [true, false, true, false, true, true, false, true];

const round = (n) => Math.round(n * 10) / 10;
const toPath = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${round(x)} ${round(y)}`).join("");

function build(order, W, H, margin, { detail = true } = {}) {
  const step = (W - margin * 2) / (order.length - 1);
  let ivyI = 0;
  let footI = 0;
  const schools = order.map((file, i) => {
    const u = BY_FILE[file];
    const x = margin + i * step + JITTER[i % JITTER.length] * (step / 104);
    const k = u.ivy ? ivyI++ : footI++;
    const y = u.ivy ? IVY_Y[k % IVY_Y.length] : FOOT_Y[k % FOOT_Y.length];
    return { ...u, x, y, shoulder: u.ivy && SHOULDER[k % SHOULDER.length] };
  });

  const base = H - 32;
  const valleys = schools.slice(1).map((s, i) => [(schools[i].x + s.x) / 2, VALLEY_Y[i % VALLEY_Y.length]]);

  // One continuous ridge, so it draws left to right in a single stroke.
  const ridge = [[0, base]];
  const segments = [];
  schools.forEach((s, i) => {
    const left = i === 0 ? [0, base] : valleys[i - 1];
    const right = i === schools.length - 1 ? [W, base] : valleys[i];
    const climb = [];
    if (s.ivy && detail) {
      // The notch from the logo: a shoulder, a small dip, then the summit.
      const run = Math.min(34, step * 0.32);
      climb.push([s.x - run, s.y + 66], [s.x - run * 0.66, s.y + 78]);
    }
    climb.push([s.x, s.y]);
    // Down the right flank, some summits break on a shoulder first.
    if (s.shoulder && detail) {
      const dx = right[0] - s.x;
      const dy = right[1] - s.y;
      climb.push([s.x + dx * 0.42, s.y + dy * 0.5], [s.x + dx * 0.55, s.y + dy * 0.52]);
    }
    if (i > 0) ridge.push(left);
    ridge.push(...climb);
    segments.push(toPath([left, ...climb, right]));
  });
  ridge.push([W, base]);

  const fill = `${toPath(ridge)}L${W} ${H}L0 ${H}Z`;

  // A distant range behind, softer, peaking between the front summits.
  const back = [[0, base - 20]];
  for (let k = 0; k <= order.length * 2; k++) {
    const x = (k * W) / (order.length * 2);
    const y = k % 2 ? (k % 4 === 1 ? 196 : 228) : 300;
    back.push([x, y]);
  }
  back.push([W, base - 20]);

  // The network: a dashed trail hopping from Ivy summit to Ivy summit.
  const ivies = schools.filter((s) => s.ivy);
  const trail = ivies
    .map((s, i) => {
      if (i === 0) return `M${round(s.x)} ${round(s.y)}`;
      const p = ivies[i - 1];
      const cx = (p.x + s.x) / 2;
      const cy = Math.min(p.y, s.y) - 54;
      return `Q${round(cx)} ${round(cy)} ${round(s.x)} ${round(s.y)}`;
    })
    .join("");

  return {
    W,
    H,
    schools,
    ridge: toPath(ridge),
    segments,
    fill,
    back: toPath(back),
    backFill: `${toPath(back)}L${W} ${H}L0 ${H}Z`,
    trail,
  };
}

/** All fifteen schools, for wide screens. */
export const RANGE_WIDE = build(ORDER_ALL, 1600, 420, 96);
/** The eight Ivies, for phones. */
export const RANGE_NARROW = build(ORDER_IVY, 800, 420, 58, { detail: false });
