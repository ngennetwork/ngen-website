import { pages, site } from "@/content/site";
import { programs } from "@/content/programs";
import { applyFaq } from "@/data/applyFaq";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import Photo from "@/components/layout/Photo";
import PageLink from "@/components/ui/PageLink";
import ExternalLink from "@/components/ui/ExternalLink";
import LumaCalendar from "@/components/sections/LumaCalendar";
import NewsletterForm from "@/components/NewsletterForm";

const copy = pages.events;

export const metadata = {
  title: "Events",
  description: copy.intro,
};

const isExternal = (href) => href.startsWith("http");

/**
 * The calendar first (it's what people come for), then where each program
 * applies, one email field for alerts, and the questions people ask.
 */
export default function EventsPage() {
  return (
    <>
      <PageHero
        id="events-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <a href="#calendar" className="btn btn-ink">
            {copy.calendarCta}
          </a>
        }
        aside={
          <Photo
            src="/about/events/A78A2298.JPG"
            alt="Student founders in conversation in the audience at an NGEN event"
            caption={copy.caption}
            position="50% 45%"
            priority
          />
        }
      />

      <section id="calendar" aria-labelledby="calendar-title" className="bg-fog">
        <div className="wrap grid gap-x-8 gap-y-8 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-12">
          <div className="flex flex-col items-start gap-2 lg:col-span-3 lg:pt-2">
            <h2 id="calendar-title" className="font-display text-[1.75rem] leading-tight tracking-[-0.025em]">
              {copy.calendarTitle}
            </h2>
            <ExternalLink href={site.links.luma} className="link text-small">
              {copy.calendarNote}
            </ExternalLink>
          </div>
          <LumaCalendar className="lg:col-span-9" />
        </div>
      </section>

      <PageSection id="apply-title" title={copy.applyTitle} aside={<p className="text-small text-slate">{copy.applyIntro}</p>}>
        <ul className="flex flex-col">
          {programs.map((p) => (
            <li key={p.slug} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
              <div className="flex flex-col gap-1">
                <PageLink href={`/programs/${p.slug}`} className="font-display text-h3 underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors hover:decoration-current">
                  {p.name}
                </PageLink>
                <p className="text-base text-slate">{p.audience}</p>
              </div>
              <a
                href={p.apply.href}
                {...(isExternal(p.apply.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-ghost justify-self-start"
              >
                {p.apply.label}
              </a>
            </li>
          ))}
        </ul>
      </PageSection>

      <section aria-labelledby="alerts-title" className="grain bg-ink-deep text-on-dark">
        <div className="wrap grid items-end gap-x-8 gap-y-8 py-[clamp(4rem,8vw,6rem)] lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-5">
            <h2 id="alerts-title" className="font-display text-h2">
              {copy.alertsTitle}
            </h2>
            <p className="text-lead text-on-dark/75">{copy.alertsBody}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </section>

      <PageSection id="faq-title" title={copy.faqTitle}>
        <div className="flex flex-col">
          {applyFaq.map((item) => (
            <details key={item.question} className="group border-b border-ink/10 py-5 first:pt-0 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-h3">
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-lead text-slate transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-base text-slate">{item.answer}</p>
            </details>
          ))}
        </div>
      </PageSection>
    </>
  );
}
