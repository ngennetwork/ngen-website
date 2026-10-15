/**
 * The one shape every home section takes, so the page reads as a system.
 *
 * - Each section is a screen: on wide screens it fills the viewport and
 *   centres its content, so nothing breaks across two screens.
 * - It opens the same way every time: the headline (the first read), the
 *   intro under it (the second), and at most one row of actions grouped
 *   right under that (the third). Nothing is parked in a corner.
 * - Then the content, from the left margin to the right margin. With
 *   `fill`, the content grows to the foot of the screen.
 *
 * Padding clears the floating nav at the top and scales with the screen's
 * height, so a section still fits on a short laptop.
 */
const GROUND = {
  snow: "bg-snow",
  fog: "bg-fog",
  // NGEN's deepest navy, for the one band that should read as night (the timeline)
  deep: "grain bg-ink-deep text-on-dark",
};

export default function Section({
  id,
  title,
  intro,
  action,
  tone = "snow",
  align = "left",
  titleClassName = "max-w-[22ch] font-display text-h2",
  fill = false,
  className = "",
  children,
}) {
  const centered = align === "center";
  // fill: the header sits at the top and the content grows to the foot of
  // the screen (for a photo or a calendar that can take the room).
  return (
    <section aria-labelledby={id} className={`${GROUND[tone]} flex flex-col lg:min-h-svh ${className}`}>
      <div
        className={`wrap flex flex-1 flex-col gap-[clamp(2rem,5.25svh,4rem)] pt-[clamp(5.5rem,11svh,8.5rem)] pb-[clamp(3rem,7.5svh,6.5rem)] ${
          fill ? "" : "justify-center"
        }`}
      >
        <header className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}>
          <h2 id={id} className={titleClassName}>
            {title}
          </h2>
          {intro && (typeof intro === "string" ? <p className="max-w-[52ch] text-lead text-slate">{intro}</p> : intro)}
          {action && <div className={`mt-1 flex flex-wrap items-center gap-x-6 gap-y-3 ${centered ? "justify-center" : ""}`}>{action}</div>}
        </header>
        {fill ? <div className="flex flex-1 flex-col">{children}</div> : children}
      </div>
    </section>
  );
}
