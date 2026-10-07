import Image from "next/image";

/**
 * NGEN's logo: the official brand files, never redrawn.
 *
 * shape: "full" (mountain over the NGEN wordmark) | "mark" (mountain only)
 * tone:  "light" for the site's dark grounds (strokes turn light; the orange
 *        nodes stay orange) | "navy" for a light ground (print, email)
 *
 * Size it with a height class; the width follows the file's ratio.
 */
const FILES = {
  full: {
    navy: { src: "/logos/brand/ngen-logo-full-v3.png", width: 1162, height: 944 },
    light: { src: "/logos/brand/ngen-logo-full-onnavy-v3.png", width: 1162, height: 944 },
  },
  mark: {
    navy: { src: "/logos/brand/ngen-logo-mark.png", width: 800, height: 412 },
    light: { src: "/logos/brand/ngen-logo-mark-onnavy.png", width: 800, height: 412 },
  },
};

function File({ shape, tone, className, priority }) {
  const file = FILES[shape][tone];
  return (
    <Image
      src={file.src}
      alt="NGEN"
      width={file.width}
      height={file.height}
      {...(priority ? { loading: "eager", fetchPriority: "high" } : {})}
      sizes="160px"
      className={`w-auto ${className}`}
    />
  );
}

export default function Logo({ shape = "full", tone = "light", className = "", priority = false }) {
  return <File shape={shape} tone={tone} className={className} priority={priority} />;
}
