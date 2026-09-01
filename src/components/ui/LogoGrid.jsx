/**
 * The one LogoGrid primitive. Normalizes a logo wall so wide wordmarks
 * and square icons carry equal visual weight (fixed-height cells, each
 * logo scaled by an optional `logoWeight` relative to the tallest in
 * the set — same technique as UniversityMarquee.jsx's optical sizing).
 *
 * One treatment per surface: monochrome/desaturated on light, forced
 * white on dark, true color revealed on hover. Missing logo falls back
 * to a typographic wordmark.
 */

const SURFACES = {
  light: {
    cell: "border border-neutral-200 bg-surface-card",
    img: "grayscale opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0",
    fallback: "text-text",
  },
  dark: {
    cell: "border border-on-dark/10 bg-surface-dark",
    img: "opacity-80 brightness-0 invert transition-all duration-200 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0",
    fallback: "text-on-dark",
  },
  // Full-color treatment, for logo walls where the source marks' own colors
  // carry the point (e.g. the Ivy League crests on /startup-challenge).
  color: {
    cell: "border border-neutral-200 bg-surface-card",
    img: "transition-transform duration-200 group-hover:scale-105",
    fallback: "text-text",
  },
};

export default function LogoGrid({
  items = [],
  surface = "light",
  cellHeight = "h-16",
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  className = "",
}) {
  const tone = SURFACES[surface] || SURFACES.light;
  const maxWeight = Math.max(...items.map((item) => item.logoWeight ?? 1), 1);

  return (
    <div className={`grid gap-6 ${columns} ${className}`}>
      {items.map((item) => {
        const scalePct = ((item.logoWeight ?? 1) / maxWeight) * 100;
        const content = item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- fixed optical height, no benefit from Next's raster image optimizer
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            className={`max-w-full object-contain ${tone.img}`}
            style={{ height: `${scalePct}%` }}
          />
        ) : (
          <p className={`text-center font-sans text-sm font-bold ${tone.fallback}`}>{item.name}</p>
        );

        const cellClasses = `group flex ${cellHeight} items-center justify-center rounded-xl p-4 ${tone.cell}`;

        return item.websiteUrl ? (
          <a
            key={item.id}
            href={item.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cellClasses} transition-transform hover:-translate-y-1`}
          >
            {content}
          </a>
        ) : (
          <div key={item.id} className={cellClasses}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
