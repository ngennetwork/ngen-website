import { home, site } from "@/content/site";
import { sourceOf, startups } from "@/content/startups";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";
import { ExternalArrow } from "@/components/ui/ExternalLink";
import StartupPicture from "@/components/sections/StartupPicture";

const { startups: copy } = home;

/**
 * What came of it, led by the money: the headline is the total, and the six
 * largest raises are entries in a two-column ledger that runs margin to
 * margin (all of them are on /impact): the team in NGEN's ink (colour when
 * you point at it, or the company's mark where there is no team photo), the
 * name with what they raised beside it, what they build, and the press that
 * reported it (or the company's site, before there is any).
 */
const LEDGER = startups.slice(0, 6);

export default function Ledger() {
  return (
    <Section
      id="ledger-title"
      title={copy.title}
      titleClassName="max-w-[18ch] font-display text-h2"
      action={
        <PageLink href={copy.more.href} className="link text-base">
          {copy.more.label}
        </PageLink>
      }
    >
      <ol className="grid gap-3 lg:grid-cols-2">
        {LEDGER.map((s) => (
          <li key={s.id}>
            <article className="group grid h-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-5 rounded-2xl bg-fog p-3 transition-colors duration-300 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-x-6">
              <StartupPicture startup={s} sizes="140px" className="aspect-[4/3] rounded-lg" markClassName="w-[42%]" />
              <div className="flex min-w-0 flex-col gap-1">
                {/* Sized so the longest name and its raise share one line from 1280px up */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-display text-[1.625rem] leading-none tracking-[-0.03em]">{s.name}</h3>
                  <p className="font-display text-[1.25rem] leading-none tracking-[-0.03em] tabular">{s.badge}</p>
                </div>
                <p className="text-base text-slate">{s.description}</p>
                <a
                  href={sourceOf(s).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-small text-slate transition-colors hover:text-ink"
                >
                  <span className="line-clamp-1">{sourceOf(s).title}</span>
                  <ExternalArrow className="mt-1.5" />
                  <span className="sr-only"> {site.labels.newTab}</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
