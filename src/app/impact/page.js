import { pages, site } from "@/content/site";
import { startups } from "@/content/startups";
import { perEvent, cohorts, paths, alumni } from "@/content/impact";
import { firms } from "@/data/brands";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import BrandLogo from "@/components/brand/BrandLogo";
import Strip from "@/components/sections/Strip";
import StartupCards from "@/components/sections/StartupCards";
import Todo from "@/components/ui/Todo";

const copy = pages.impact;
const { raised, universities } = site.figures;

export const metadata = {
  title: "Impact",
  description: copy.intro,
};

/**
 * The record underneath the homepage's figures: the total with two facts
 * the homepage doesn't carry, every startup with its press, then the
 * breakdown (per event, by cohort, the two ways in, where alumni are now),
 * where the founders come from, and the firms behind the people who spoke
 * and backed them. Breakdown values are placeholders (src/content/impact.js)
 * and show as TODO until real data replaces them.
 */
export default function ImpactPage() {
  const proof = [{ value: String(startups.length), label: copy.startupsLabel }, universities];

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
          <dl className="flex flex-col gap-8 lg:flex-1 lg:justify-between">
            <div className="flex flex-col gap-2">
              <dt className="order-2 text-base text-slate">{raised.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,1.5rem+4vw,5.75rem)] leading-[0.95] tracking-[-0.035em] tabular">
                {raised.value}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {proof.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
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

      <PageSection id="per-event-title" title={copy.perEventTitle} aside={<Note>{copy.perEventNote}</Note>}>
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {perEvent.map((f) => (
            <div key={f.id} className="flex flex-col gap-3">
              <dt className="order-2 text-base text-slate">{f.label}</dt>
              <dd className="order-1 font-display text-[clamp(2.75rem,1.8rem+2.4vw,4rem)] leading-none tracking-[-0.03em] tabular">
                <Todo value={f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="cohorts-title" title={copy.cohortsTitle} aside={<Note>{copy.cohortsNote}</Note>} tone="band">
        <table className="w-full border-separate border-spacing-0 text-left tabular">
          <thead>
            <tr className="text-small text-slate">
              {Object.values(copy.cohortColumns).map((label, i) => (
                <th key={label} scope="col" className={`px-2 pb-3 font-normal sm:px-4 ${i > 0 ? "text-right" : ""}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base sm:text-lead">
            {cohorts.map((row) => (
              <tr key={row.cohort} className="odd:[&>*]:bg-paper/60 [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg">
                <th scope="row" className="px-2 py-3.5 font-display text-h3 font-normal sm:px-4">
                  {row.cohort}
                </th>
                <td className="px-2 py-3.5 text-right sm:px-4"><Todo value={row.founders} /></td>
                <td className="px-2 py-3.5 text-right sm:px-4"><Todo value={row.startups} /></td>
                <td className="px-2 py-3.5 text-right sm:px-4"><Todo value={row.raised} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageSection>

      <PageSection id="paths-title" title={copy.pathsTitle} aside={<Note>{copy.pathsNote}</Note>}>
        <ul className="flex flex-col gap-10">
          {paths.map((p) => (
            <li key={p.id} className="grid gap-x-8 gap-y-3 md:grid-cols-9">
              <div className="flex flex-col gap-2 md:col-span-5">
                <h3 className="font-display text-h3">{p.name}</h3>
                <p className="text-base text-slate">{p.body}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 md:col-span-4">
                <div className="flex flex-col gap-1.5">
                  <dt className="order-2 text-small text-slate">{copy.pathFounders}</dt>
                  <dd className="order-1 font-display text-[2rem] leading-none tracking-[-0.02em] tabular"><Todo value={p.founders} /></dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="order-2 text-small text-slate">{copy.pathRaised}</dt>
                  <dd className="order-1 font-display text-[2rem] leading-none tracking-[-0.02em] tabular"><Todo value={p.raised} /></dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="alumni-title" title={copy.alumniTitle} aside={<Note>{copy.alumniNote}</Note>} tone="band">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-small text-slate">
              {Object.values(copy.alumniColumns).map((label) => (
                <th key={label} scope="col" className="px-2 pb-3 font-normal sm:px-4">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base">
            {alumni.map((a) => (
              <tr key={a.id} className="odd:[&>*]:bg-paper/60 [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg">
                <th scope="row" className="px-2 py-3.5 font-medium sm:px-4">
                  <Todo value={a.name} />
                </th>
                <td className="px-2 py-3.5 text-slate sm:px-4">{a.path}</td>
                <td className="px-2 py-3.5 sm:px-4"><Todo value={a.now} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageSection>

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

function Note({ children }) {
  return <p className="max-w-[28ch] text-small text-slate">{children}</p>;
}
