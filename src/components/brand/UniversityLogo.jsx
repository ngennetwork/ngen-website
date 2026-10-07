import Image from "next/image";

/** The inked area every logo gets, in square pixels at the base size. */
const AREA = 860;

/**
 * A university's official logo in NGEN's one ink, sized by inked area
 * rather than box height (see data/universities.js), so every school reads
 * at the same weight. `scale` shrinks the whole set for small screens.
 */
export default function UniversityLogo({ university, className = "" }) {
  const { name, file, w, h, fill } = university;
  const ratio = w / h;
  const height = Math.round(Math.min(52, Math.max(18, Math.sqrt(AREA / (ratio * fill)))));

  return (
    <Image
      src={`/logos/universities/ink/${file}.png`}
      alt={name}
      width={w}
      height={h}
      sizes="240px"
      style={{ height: `calc(${height}px * var(--logo-scale, 1))`, width: "auto" }}
      className={`uni-logo max-w-full object-contain ${className}`}
    />
  );
}
