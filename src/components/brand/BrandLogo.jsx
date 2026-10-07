/** The height a 4:1 wordmark gets; wider and taller marks scale to match its visual weight. */
const BASE = 24;

/**
 * Another organization's official logo, set in NGEN's one ink so a wall of
 * them reads as a single set. The file is used as a mask over the current
 * text colour, so it takes the exact navy (or paper, on navy grounds).
 * Heights are optical, not equal: each logo gets the same area, so a long
 * wordmark sits lower and a compact mark stands taller. Without a logo
 * file the name stands in, in the sans (nameClassName sizes it).
 */
export default function BrandLogo({ brand, className = "", nameClassName = "text-[1.125rem]" }) {
  const { name, logo, logoText } = brand;

  if (!logo) {
    return <span className={`leading-none font-medium tracking-[-0.01em] opacity-90 ${nameClassName} ${className}`}>{name}</span>;
  }

  const ratio = logo.width / logo.height;
  const height = Math.round(Math.min(44, Math.max(16, BASE * Math.sqrt(4 / ratio))));
  // A mark paired with its name (Y Combinator's square) stays text-height.
  const markHeight = logoText ? 26 : height;
  const mask = `url("${logo.src}") center / contain no-repeat`;

  return (
    <span role="img" aria-label={name} className={`inline-flex items-center gap-2 opacity-90 ${className}`}>
      <span
        aria-hidden="true"
        className="block max-w-full shrink-0 bg-current"
        style={{ height: markHeight, width: Math.round(markHeight * ratio), mask, WebkitMask: mask }}
      />
      {logoText && (
        <span aria-hidden="true" className="text-[1.3rem] leading-none font-semibold tracking-[-0.02em]">
          {logoText}
        </span>
      )}
    </span>
  );
}
