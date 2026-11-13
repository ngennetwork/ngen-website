/**
 * A cap-height peak taken from the NGEN mark: two strokes meeting at a point.
 * Still, flat orange, no glow.
 */
export default function PeakMark({ className = "" }) {
  return (
    <svg viewBox="0 0 14 10" aria-hidden="true" className={`peak-mark ${className}`}>
      <path d="M1.15 9.15 L7 1.05 L12.85 9.15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="miter" />
    </svg>
  );
}
