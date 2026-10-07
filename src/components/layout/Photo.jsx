import Image from "next/image";

/**
 * A real NGEN photo with a small caption under it. Rooms and events show in
 * colour; portraits (speakers, startups) have their own ink-until-hover
 * treatment.
 *
 * ratio: a Tailwind aspect class, or "fill" for a page header: 4:3 on small
 * screens; on wide ones the frame takes the text column's height (never
 * under 11-14rem), so photo and text end level.
 * `priority` is for a header photo: it loads eagerly at high fetch priority
 * (Next 16 deprecated the Image `priority` prop for this).
 */
export default function Photo({
  src,
  alt,
  caption,
  position = "50% 50%",
  priority = false,
  ratio = "fill",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}) {
  const frame = ratio === "fill" ? "aspect-[4/3] lg:aspect-auto lg:min-h-[11rem] lg:flex-1 xl:min-h-[14rem]" : ratio;
  return (
    <figure className={`flex flex-col gap-3 ${ratio === "fill" ? "lg:h-full" : ""} ${className}`}>
      <div className={`relative ${frame} overflow-hidden rounded-xl bg-ink/5`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          {...(priority ? { loading: "eager", fetchPriority: "high" } : {})}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      {caption && <figcaption className="text-small text-slate">{caption}</figcaption>}
    </figure>
  );
}
