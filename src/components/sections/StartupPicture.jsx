import Image from "next/image";

/**
 * A startup's picture: its team photo in NGEN's navy duotone (colour when
 * pointed at), or, where no team photo exists yet, its own mark on a raised
 * navy tile, so no card borrows a picture that isn't the company's.
 * The parent sets the frame's size and shape; children sit on top (a badge).
 */
export default function StartupPicture({ startup, sizes, className = "", markClassName = "w-[40%]", children }) {
  const { photo, logo, name } = startup;

  if (photo) {
    return (
      <div className={`duo relative overflow-hidden ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover group-hover:scale-[1.04]"
          style={{ objectPosition: photo.position ?? "center" }}
        />
        {children}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-paper ring-1 ring-ink/8 ring-inset ${className}`}>
      <Image
        src={logo.src}
        alt={`${name} logo`}
        width={logo.width}
        height={logo.height}
        sizes="200px"
        className={`h-auto max-h-[62%] object-contain ${markClassName}`}
      />
      {children}
    </div>
  );
}
