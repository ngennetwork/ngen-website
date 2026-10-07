import { pages, site } from "@/content/site";
import { firms } from "@/data/brands";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import BrandLogo from "@/components/brand/BrandLogo";
import Strip from "@/components/sections/Strip";
import StartupCards from "@/components/sections/StartupCards";

const copy = pages.impact;
const { raised, reach, universities, partners, events } = site.figures;

export const metadata = {
  title: "Impact",
  description: copy.intro,
};

/**
 * The record: one dominant figure with smaller proof beside the headline,
 * then every startup with its press, where the founders come from, and
 * the firms behind the people who spoke and backed them.
 */
export default function ImpactPage() {
  const proof = [reach, universities, partners, events];

  return (
    <>
      <PageHero
        id="impact-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <a href="#startups-title" className="btn btn-ink">
            {copy.action}
          </a>
        }
        aside={
          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <dt className="order-2 text-base text-slate">{raised.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,1.5rem+4vw,5.75rem)] leading-[0.95] tracking-[-0.035em] tabular">
                {raised.value}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {proof.map((f) => (
                <div key={f.value} className="flex flex-col gap-1.5">
                  <dt className="order-2 text-small text-slate">{f.label}</dt>
                  <dd className="order-1 font-display text-[2rem] leading-none tracking-[-0.02em] tabular">{f.value}</dd>
                </div>
              ))}
            </div>
          </dl>
        }
      />

      <section aria-labelledby="startups-title" className="bg-fog">
        <div className="wrap py-[clamp(4rem,8vw,7rem)]">
          <div className="mb-12 flex flex-col gap-3">
            <h2 id="startups-title" className="font-display text-h2">
              {copy.startupsTitle}
            </h2>
            <p className="text-lead text-slate">{copy.startupsIntro}</p>
          </div>
          <StartupCards showFounders />
        </div>
      </section>

      <Strip title={copy.universitiesTitle} intro={copy.universitiesIntro} className="bg-snow" />

      <PageSection id="firms-title" title={pages.partner.firmsLabel} tone="band">
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 text-ink sm:grid-cols-4">
          {firms.map((f) => (
            <li key={f.name} className="flex h-12 items-center max-sm:last:col-span-2">
              <BrandLogo brand={f} />
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
