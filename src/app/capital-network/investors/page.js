import { pages, site } from "@/content/site";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import TallyEmbed from "@/components/TallyEmbed";
import ExternalLink from "@/components/ui/ExternalLink";
import CapitalSwitch from "@/components/sections/CapitalSwitch";

const copy = pages.capitalInvestors;

export const metadata = {
  title: "Capital Network for investors",
  description: copy.intro,
};

/**
 * Investors: how deal flow reaches them, in three steps on the right; the
 * request form; then the one other way to help, a gift to the network.
 */
export default function CapitalNetworkInvestorsPage() {
  return (
    <>
      <PageHero
        id="capital-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <div className="flex flex-col items-start gap-8">
            <a href="#request" className="btn btn-ink">
              {copy.formTitle}
            </a>
            <CapitalSwitch current="investors" />
          </div>
        }
        aside={
          <section aria-labelledby="how-title" className="flex flex-col gap-4">
            <h2 id="how-title" className="text-small text-slate">
              {copy.howTitle}
            </h2>
            <ol className="flex flex-col gap-3">
              {copy.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 rounded-xl bg-paper p-5 ring-1 ring-ink/6">
                  <span className="font-display text-[1.375rem] leading-tight text-slate tabular">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col gap-1">
                    <span className="font-medium">{step.title}</span>
                    <span className="text-small text-slate">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-small text-slate">{copy.howNote}</p>
          </section>
        }
      />

      <div id="request">
        <PageSection
          id="request-title"
          title={copy.formTitle}
          aside={<p className="text-small text-slate">{copy.formIntro}</p>}
          tone="band"
        >
          <div className="rounded-2xl bg-white p-[clamp(1rem,3vw,2rem)] ring-1 ring-ink/6">
            <TallyEmbed formId="vG84j4" title="Join the NGEN Capital Network as an investor" />
          </div>
        </PageSection>
      </div>

      <section aria-labelledby="give-title" className="grain bg-ink-deep text-on-dark">
        <div className="wrap flex flex-col items-start gap-6 py-[clamp(4rem,8vw,6rem)] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-3">
            <h2 id="give-title" className="font-display text-h2">
              {copy.giveTitle}
            </h2>
            <p className="text-lead text-on-dark/75">{copy.giveBody}</p>
            <p className="text-small text-mist">EIN: {site.ein}</p>
          </div>
          <ExternalLink href={site.links.giftZeffy} className="btn btn-paper" arrowClassName="opacity-60">
            {copy.giveCta}
          </ExternalLink>
        </div>
      </section>
    </>
  );
}
