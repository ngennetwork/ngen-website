import Image from "next/image";
import { pages } from "@/content/site";
import { programs, capitalNetwork } from "@/content/programs";
import PageHero from "@/components/layout/PageHero";
import Photo from "@/components/layout/Photo";
import PageLink from "@/components/ui/PageLink";
import ProgramSummary from "@/components/ui/ProgramSummary";
import ExternalLink from "@/components/ui/ExternalLink";

const copy = pages.programs;

export const metadata = {
  title: "Programs",
  description: copy.intro,
};

const isExternal = (href) => href.startsWith("http");

/**
 * The four programs as stacked statements: each one's photo on the left,
 * its name, line and two ways in on the right; then SpaceTech, highlighted
 * with the ticket's glow and a way to its own site. Then the Capital
 * Network, set apart, for founders who are already raising.
 */
export default function ProgramsPage() {
  return (
    <>
      <PageHero
        id="programs-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <PageLink href={copy.action.href} className="btn btn-ink">
            {copy.action.label}
          </PageLink>
        }
        aside={
          // TODO(photo): keep or replace with a newer panel photo.
          <Photo
            src="/about/events/Copy of DSC06558.jpg"
            alt="A panel of founders and investors on stage at an NGEN event"
            caption="A founder and investor panel at an NGEN event."
            position="50% 45%"
            priority
          />
        }
      />

      <section aria-label={copy.listTitle} className="bg-fog">
        <ol className="wrap flex flex-col gap-[clamp(4rem,8vw,6rem)] pt-[clamp(4rem,8vw,7rem)] pb-[clamp(4rem,8vw,6rem)]">
          {programs.map((p, i) => (
            <li key={p.slug} className="grid items-center gap-x-8 gap-y-8 lg:grid-cols-12">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/5 lg:col-span-6">
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: p.photo.position }}
                />
              </div>
              <div className="flex flex-col items-start gap-5 lg:col-span-6 lg:col-start-7">
                <p className="flex items-center gap-2.5 text-small text-slate tabular">
                  <span aria-hidden="true" className="node" />
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
                  {p.name}
                </h2>
                <p className="text-lead text-slate">
                  <ProgramSummary program={p} />
                </p>
                <p className="text-small text-slate">
                  <span className="text-ink">For:</span> {p.audience}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <PageLink href={`/programs/${p.slug}`} className="btn btn-ghost">
                    {copy.more}
                  </PageLink>
                  <a
                    href={p.apply.href}
                    {...(isExternal(p.apply.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link text-small"
                  >
                    {p.apply.label}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* SpaceTech, highlighted: the one card on the page that glows */}
        <div className="wrap pb-[clamp(4rem,8vw,7rem)]">
          <article
            aria-labelledby="spacetech-title"
            className="glow-card grid items-end gap-x-8 gap-y-8 rounded-2xl bg-paper px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-12"
          >
            <div className="flex flex-col items-start gap-4 lg:col-span-8">
              <p className="flex items-center gap-2.5 text-small text-slate">
                <span aria-hidden="true" className="node" />
                {copy.spaceTech.kicker}
              </p>
              <h2 id="spacetech-title" className="font-display text-h2">
                {copy.spaceTech.name}
              </h2>
              <p className="text-lead text-slate">{copy.spaceTech.body}</p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <ExternalLink href={copy.spaceTech.cta.href} className="btn btn-ink" arrowClassName="">
                {copy.spaceTech.cta.label}
              </ExternalLink>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="capital-title" className="bg-snow">
        <div className="wrap grid items-end gap-x-8 gap-y-8 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <p className="text-small text-slate">{copy.capitalTitle}</p>
            <h2 id="capital-title" className="font-display text-h2">
              {capitalNetwork.name}
            </h2>
            <p className="text-lead text-slate">{capitalNetwork.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <PageLink href="/capital-network/founders" className="btn btn-ghost">
              For founders
            </PageLink>
            <PageLink href="/capital-network/investors" className="btn btn-ghost">
              For investors
            </PageLink>
          </div>
        </div>
      </section>
    </>
  );
}
