/** One headline style for every inner page: same face, size, leading and measure. */
const TITLE = "max-w-[17ch] font-display text-[clamp(2.75rem,1.6rem+3vw,4.5rem)] leading-[1.02] tracking-[-0.036em]";

/**
 * The shell every inner page opens with. It sets spacing and type; what
 * fills the right-hand side is chosen per page (a photo, the founders, the
 * tiers, a drawn email), so no two headers look the same.
 *
 * The two columns are one block of one height. The headline sits at the
 * top (same position on every page) with the intro and its one action
 * right under it; a header photo stretches to the text column's height,
 * so the two columns end level and no gap opens in either.
 *
 * @param {object} props
 * @param {string} props.id        id for the h1, so the header can be labelled
 * @param {string} props.title
 * @param {string} props.intro
 * @param {"light"|"dark"} [props.tone]  "dark" sets the header on navy, for a page whose header is the whole answer (Contact)
 * @param {React.ReactNode} [props.aside]   the page's own visual, on the right
 * @param {React.ReactNode} [props.action]  the one thing to do next, under the intro
 * @param {React.ReactNode} [props.footer]  a row pinned to the bottom of a full-screen header
 */
export default function PageHero({ id, title, intro, tone = "light", aside, action, footer }) {
  const dark = tone === "dark";

  return (
    <header
      className={`${dark ? "grain bg-ink-deep text-on-dark" : "bg-snow text-ink"} ${footer ? "flex min-h-svh flex-col" : ""}`}
    >
      <div className={`wrap pt-[clamp(8rem,13vw,10rem)] pb-[clamp(3.5rem,6vw,5rem)] ${footer ? "flex w-full flex-1 flex-col" : ""}`}>
        {/* With a footer, the columns take the screen's height down to it, so the
            aside can fill the room instead of leaving a band of empty ground */}
        <div className={`grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-stretch ${footer ? "lg:flex-1" : ""}`}>
          {/* Headline pinned to the top, so every page's h1 starts at the same height */}
          <div className="flex flex-col items-start gap-7 lg:col-span-7">
            <h1 id={id} className={TITLE}>
              {title}
            </h1>
            <p className={`max-w-[44ch] text-lead ${dark ? "text-on-dark/75" : "text-slate"}`}>{intro}</p>
            {action && <div className="w-full">{action}</div>}
          </div>
          {aside && <div className="flex flex-col lg:col-span-5 lg:col-start-8">{aside}</div>}
        </div>
        {footer && <div className="mt-auto pt-[clamp(4rem,8vw,6rem)]">{footer}</div>}
      </div>
    </header>
  );
}
