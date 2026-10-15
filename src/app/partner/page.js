import { pages, site } from "@/content/site";
import { firms, supporters } from "@/data/brands";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import Photo from "@/components/layout/Photo";
import BrandLogo from "@/components/brand/BrandLogo";
import MeetingDiagram from "@/components/sections/MeetingDiagram";

const copy = pages.partner;

export const metadata = {
  title: "Partner with NGEN",
  description: copy.intro,
};

const mailtoFor = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(`NGEN: ${subject}`)}`;
const mailto = mailtoFor("partnership");

/**
 * For organizations: who is in the room (the conference site's diagram and
 * its three groups), the ways to partner as stacked statements that each
 * open an email, who has supported NGEN before (labelled apart from the
 * firms speakers come from), and the email.
 */
export default function PartnerPage() {
  return (
    <>
      <PageHero
        id="partner-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <a href={mailto} className="btn btn-ink">
            {copy.ctaTitle}
          </a>
        }
        aside={
          <Photo
            // TODO(photo): replace with a sponsor-facing photo; this first-conference panel is also on the home timeline.
            src="/about/events/Copy of DSC06488.jpg"
            alt="A fireside chat on stage at an NGEN event, with a student moderator and an executive"
            caption={copy.caption}
            position="50% 45%"
            priority
          />
        }
      />

      <PageSection id="room-title" title={copy.roomTitle} aside={<p className="text-small text-slate">{copy.roomNote}</p>} tone="band">
        {/* As on the conference site: the diagram, then its three groups under it */}
        <div className="flex flex-col gap-[clamp(2rem,4vw,3rem)]">
          <MeetingDiagram names={copy.room.map((g) => g.name)} center={copy.roomCenter} className="mx-auto max-w-[25rem]" />
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {copy.room.map((group) => (
              <li key={group.name} className="flex flex-col gap-2">
                <h3 className="font-display text-h3">{group.name}</h3>
                <p className="text-base text-slate">{group.body}</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-baseline gap-3 text-base text-ink/85">
                      <span aria-hidden="true" className="node relative top-[-0.1em]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection id="ways-title" title={copy.waysTitle} aside={<p className="text-small text-slate">{copy.waysNote}</p>}>
        <ul className="flex flex-col gap-8">
          {copy.ways.map((way) => (
            <li key={way.title}>
              <a href={mailtoFor(way.title)} className="group grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <span className="font-display text-h3">
                  <span className="link group-hover:decoration-current">{way.title}</span>
                </span>
                <span className="text-lead text-slate sm:pt-0.5">{way.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="supporters-title"
        title={copy.supportersTitle}
        aside={<p className="text-small text-slate">{copy.supportersNote}</p>}
        tone="band"
      >
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 text-ink sm:grid-cols-4">
          {supporters.map((s) => (
            <li key={s.name} className="flex h-12 items-center max-sm:last:col-span-2">
              <BrandLogo brand={s} nameClassName="whitespace-nowrap text-[0.9375rem] sm:text-[1.125rem]" />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="firms-title" title={copy.firmsLabel} className="pt-0" tone="band">
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 text-ink sm:grid-cols-4">
          {firms.map((f) => (
            <li key={f.name} className="flex h-12 items-center max-sm:last:col-span-2">
              <BrandLogo brand={f} />
            </li>
          ))}
        </ul>
      </PageSection>

      <section aria-labelledby="cta-title" className="grain bg-ink-deep text-on-dark">
        <div className="wrap flex flex-col items-start gap-6 py-[clamp(4rem,8vw,6rem)] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-3">
            <h2 id="cta-title" className="font-display text-h2">
              {copy.ctaTitle}
            </h2>
            <p className="text-lead text-on-dark/75">{copy.ctaBody}</p>
          </div>
          <a href={mailto} className="link font-display text-h3 [overflow-wrap:anywhere]">
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}
