/**
 * The one SectionHeader primitive. A standardized section intro: an optional
 * mono eyebrow (letterspaced caps), a heading, and optional subtext held to a
 * readable measure. `children` render below for optional actions (e.g. a
 * <Button>). Set `onDark` when placed on a navy surface.
 *
 * Styling comes from the semantic design tokens in globals.css.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtext,
  as: Tag = "h2",
  align = "left",
  onDark = false,
  className = "",
  titleClassName = "",
  children,
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow${onDark ? " text-on-dark/80" : ""}`}>{eyebrow}</p>
      )}

      <Tag
        className={
          titleClassName ||
          `text-h2 font-sans font-extrabold uppercase tracking-wide ${eyebrow ? "mt-3" : ""} ${
            onDark ? "text-on-dark" : "text-text"
          }`
        }
      >
        {title}
      </Tag>

      {subtext && (
        <p
          className={`measure text-body-lg mt-4 ${centered ? "mx-auto" : ""} ${
            onDark ? "text-on-dark/80" : "text-text-muted"
          }`}
        >
          {subtext}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
