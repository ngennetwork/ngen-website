import { home, site } from "@/content/site";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";

const { mission } = home;
const { reach, partners } = site.figures;

/**
 * What NGEN is, as one centred statement standing on the range's ground
 * (the same fog the mountains are filled with): the headline, the body and
 * the mission line, the one action, then two figures as quieter proof.
 */
export default function Statement() {
  return (
    <Section
      id="mission-title"
      tone="fog"
      align="center"
      title={mission.title}
      titleClassName="max-w-[17ch] font-display text-[clamp(2.5rem,1.2rem+4vw,5.25rem)] leading-[1] tracking-[-0.038em]"
      intro={
        <div className="flex flex-col items-center gap-5">
          <p className="max-w-[48ch] text-lead text-slate">{mission.body}</p>
          <p className="flex items-center gap-3 text-lead">
            <span aria-hidden="true" className="node" />
            {mission.line}
          </p>
        </div>
      }
      action={
        <PageLink href={mission.cta.href} className="btn btn-ink">
          {mission.cta.label}
        </PageLink>
      }
    >
      <dl className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-x-8 text-center">
        {[reach, partners].map((f) => (
          <div key={f.value} className="flex flex-col items-center gap-2">
            <dt className="order-2 max-w-[24ch] text-small text-slate">{f.label}</dt>
            <dd className="order-1 font-display text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)] leading-none tracking-[-0.035em] tabular">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
