import { home, site } from "@/content/site";
import PageLink from "@/components/ui/PageLink";

const { mission } = home;
const { reach, partners, raised } = site.figures;

/**
 * What NGEN is, read left to right on the range's ground (the same fog the
 * mountains are filled with): the headline, the body, the mission line and
 * the one action on the left; three figures on the right as quieter proof,
 * the first level with the headline and the last ending level with the
 * button, so both columns start and end on one line.
 */
export default function Statement() {
  return (
    <section aria-labelledby="mission-title" className="flex flex-col bg-fog lg:min-h-svh">
      <div className="wrap flex flex-1 flex-col justify-center pt-[clamp(5.5rem,11svh,8.5rem)] pb-[clamp(3rem,7.5svh,6.5rem)]">
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <h2
              id="mission-title"
              className="max-w-[15ch] font-display text-[clamp(2.5rem,1.2rem+3.7vw,4.75rem)] leading-[1] tracking-[-0.038em]"
            >
              {mission.title}
            </h2>
            <p className="text-lead text-slate">{mission.body}</p>
            <p className="flex items-center gap-3 text-lead">
              <span aria-hidden="true" className="node" />
              {mission.line}
            </p>
            <PageLink href={mission.cta.href} className="btn btn-ink mt-2">
              {mission.cta.label}
            </PageLink>
          </div>

          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-4 lg:col-start-9 lg:flex lg:flex-col lg:justify-between lg:pt-[0.4rem]">
            {[reach, partners, raised].map((f) => (
              <div key={f.value} className="flex flex-col gap-2">
                <dt className="order-2 max-w-[26ch] text-small text-slate">{f.label}</dt>
                <dd className="order-1 font-display text-[clamp(2.25rem,1.6rem+1.8vw,3.5rem)] leading-none tracking-[-0.035em] tabular">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
