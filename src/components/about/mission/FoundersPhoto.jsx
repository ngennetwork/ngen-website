/**
 * Mission Beat 5 — event photo banner above the "Our Story" narrative.
 * Full-width 16:9 crop.
 */
export default function FoundersPhoto() {
  return (
    <div className="mb-8 w-full overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed aspect-ratio crop, no benefit from Next's raster image optimizer */}
      <img
        src="/about/founders-photo.jpeg"
        alt="NGEN co-founders Harsha, Jackson, and Will at the Trailblazers Conference NYC"
        className="aspect-[16/9] w-full object-cover object-[50%_22%]"
      />
    </div>
  );
}
