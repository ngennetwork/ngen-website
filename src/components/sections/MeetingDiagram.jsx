/**
 * The conference site's diagram, at night: student founders, influential
 * leaders and sponsors as three circles, and where all three overlap, the
 * room itself: "Face to face", hatched and glowing in NGEN's orange.
 *
 * Drawn on a fixed 420x350 grid (the conference site's), so it scales as
 * one picture. Screen readers get one label for the whole drawing; the
 * names drawn inside it are hidden from them.
 */
const R = 100;
const CIRCLES = [
  { cx: 210, cy: 138 },
  { cx: 162, cy: 221 },
  { cx: 258, cy: 221 },
];
const NAME_AT = [
  { x: 210, y: 24 },
  { x: 70, y: 338 },
  { x: 350, y: 338 },
];

export default function MeetingDiagram({ names, center, className = "" }) {
  return (
    <svg viewBox="0 0 420 350" role="img" aria-label={`${names.join(", ")}: ${center}, where all three meet`} className={`block w-full ${className}`}>
      <defs>
        <pattern id="meeting-hatch" width="5" height="10" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="10" stroke="var(--color-signal)" strokeWidth="0.9" />
        </pattern>
        <radialGradient id="meeting-glow">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="meeting-a">
          <circle cx={CIRCLES[0].cx} cy={CIRCLES[0].cy} r={R} />
        </clipPath>
        <clipPath id="meeting-b">
          <circle cx={CIRCLES[1].cx} cy={CIRCLES[1].cy} r={R} />
        </clipPath>
      </defs>

      {/* Each group a faint disc, so overlaps grow denser */}
      {CIRCLES.map((c, i) => (
        <circle key={`disc-${i}`} cx={c.cx} cy={c.cy} r={R} fill="var(--color-ink)" fillOpacity="0.035" />
      ))}

      {/* Where all three meet: the glow, then the hatch */}
      <circle cx="210" cy="194" r="70" fill="url(#meeting-glow)" />
      <g clipPath="url(#meeting-a)">
        <g clipPath="url(#meeting-b)">
          <circle cx={CIRCLES[2].cx} cy={CIRCLES[2].cy} r={R} fill="url(#meeting-hatch)" opacity="0.75" />
        </g>
      </g>

      {CIRCLES.map((c, i) => (
        <circle key={`ring-${i}`} cx={c.cx} cy={c.cy} r={R} fill="none" stroke="var(--color-ink)" strokeOpacity="0.5" strokeWidth="1" />
      ))}

      {names.map((name, i) => (
        <text key={name} x={NAME_AT[i].x} y={NAME_AT[i].y} textAnchor="middle" aria-hidden="true" className="fill-ink font-display text-[17px]">
          {name}
        </text>
      ))}
      <text
        x="210"
        y="199"
        textAnchor="middle"
        aria-hidden="true"
        className="fill-ink font-display text-[17px] [paint-order:stroke] [stroke-width:6px] [stroke:var(--color-fog)]"
      >
        {center}
      </text>
    </svg>
  );
}
