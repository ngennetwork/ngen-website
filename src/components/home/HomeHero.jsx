import { home } from "@/content/site";
import PageLink from "@/components/ui/PageLink";
import IvyRange from "./IvyRange";

const { hero } = home;

/**
 * The cover fits one screen: the line across the full measure, the intro
 * with its two actions under it, and below, standing on the page's floor,
 * the range of campuses NGEN's founders come from. On wide screens the
 * range takes whatever height the copy leaves, so the cover is exactly one
 * screen on a short laptop and a tall monitor alike.
 */
export default function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="hero-sky relative flex min-h-[100svh] flex-col overflow-hidden bg-snow text-ink">
      <div className="wrap flex flex-1 flex-col justify-end gap-7 pt-[clamp(6.5rem,13svh,8rem)] pb-[clamp(2rem,5svh,3.5rem)] md:flex-none">
        <p className="hero-rise flex items-center gap-2.5 text-small text-slate" style={{ "--d": "0.05s" }}>
          <span aria-hidden="true" className="node" />
          {hero.kicker}
        </p>
        <h1
          id="hero-title"
          className="hero-rise font-display text-[clamp(3rem,1.1rem+5vw,6.25rem)] leading-[0.98] tracking-[-0.04em]"
          style={{ "--d": "0.15s" }}
        >
          {hero.title}
        </h1>
        <div className="hero-rise flex flex-col items-start gap-6" style={{ "--d": "0.3s" }}>
          <p className="max-w-[38ch] text-lead text-slate">{hero.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <PageLink href={hero.primary.href} className="btn btn-ink">
              {hero.primary.label}
            </PageLink>
            <PageLink href={hero.secondary.href} className="btn btn-ghost">
              {hero.secondary.label}
            </PageLink>
          </div>
        </div>
      </div>
      <IvyRange />
    </section>
  );
}
