"use client";

import Image from "next/image";
import { speakers } from "@/data/speakers";
import { universities } from "@/data/universities";
import { site } from "@/content/site";
import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
import EligibilityCheck, { EligibilityState } from "@/components/challenge/EligibilityCheck";
import Icon from "@/components/challenge/Icons";
import Timeline from "@/components/challenge/Timeline";
import Photo from "@/components/layout/Photo";
import UniversityLogo from "@/components/brand/UniversityLogo";
import ExternalLink from "@/components/ui/ExternalLink";
import PageLink from "@/components/ui/PageLink";

const SECTION = "wrap py-[clamp(3.5rem,7vw,5.5rem)]";
const CHROME = "h-full rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10";
const CARD = `flex flex-col ${CHROME}`;
const MUTED = "text-base leading-relaxed text-slate";

export default function ChallengeHome({ initialLang }) {
  return (
    <ChallengeShell initialLang={initialLang}>
      <Home />
    </ChallengeShell>
  );
}

function Home() {
  const { copy } = useLocale();
  const { hero, glance, gets, months, mentors, capstone, gallery, join, ngen, check } = copy;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(copy.emailSubject)}`;
  const mentorSchools = mentors.schools.map((name) => universities.find((u) => u.name === name)).filter(Boolean);
  const ivySchools = universities.filter((school) => school.ivy);
  const stats = [
    { value: "$30M+", label: ngen.raised },
    { value: site.figures.reach.value, label: ngen.reach },
    { value: site.figures.universities.value, label: ngen.universities },
    { value: site.figures.events.value, label: ngen.events },
  ];

  return (
    <EligibilityState>
      <header className="relative isolate overflow-hidden bg-[#1c3a2a] text-on-dark lg:bg-transparent">
        <Image
          src={hero.photo.src}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="hidden object-cover lg:block"
          style={{ objectPosition: hero.photo.position }}
        />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-[#0e110f]/93 via-[#1c3a2a]/68 to-[#0e110f]/30 lg:block" />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-t from-[#0e110f]/88 via-[#0e110f]/20 to-[#0e110f]/55 lg:block" />
        <div className="relative">
          <div className="wrap grid items-start gap-6 pt-6 pb-8 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-16">
            <div className="flex max-w-[40rem] flex-col items-start gap-3 lg:col-span-6 lg:gap-5">
              <p className="inline-flex max-w-full items-center rounded-full border border-dashed border-[#fbfaf7]/50 bg-[#0e110f]/30 px-3 py-1.5 text-small text-[#fbfaf7]">
                {hero.eyebrow}
              </p>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#fbfaf7] px-3 py-1.5 text-small text-[#151815]">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1c3a2a]" />
                {copy.deadlineLabel} {copy.deadline}
              </p>
              <h1 id="challenge-title" className="max-w-[16ch] font-display text-[clamp(2.15rem,1.2rem+4vw,4.5rem)] leading-[1.05] lg:text-[clamp(2.5rem,1.25rem+3.3vw,4.5rem)] lg:leading-[1.02]">
                {hero.title}
              </h1>
              <p className="max-w-[42ch] text-lead text-on-dark/90">{hero.intro}</p>
              <p className="font-medium text-on-dark">{copy.noIdea}</p>
              <p className="max-w-[40ch] text-base leading-relaxed text-on-dark/80">{copy.urgency}</p>
              <p className="hidden text-small text-on-dark/70 lg:block">{hero.photo.caption}</p>
            </div>
            <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
              <EligibilityCheck instanceId="check-hero" />
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="schools-label" className="school-band border-y border-ink/10 bg-snow">
        <div className="wrap py-6 sm:py-10">
          <p id="schools-label" className="text-center text-small text-slate">
            {copy.schools.label}
          </p>
          <ul className="mt-4 grid grid-cols-4 items-center justify-items-center gap-x-2 gap-y-4 [--logo-scale:0.48] sm:gap-x-4 sm:[--logo-scale:0.7] lg:flex lg:flex-wrap lg:justify-center lg:gap-x-8 lg:[--logo-scale:0.84]">
            {ivySchools.map((school) => (
              <li key={school.name} className="flex h-10 items-center justify-center sm:h-11">
                <UniversityLogo university={school} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <figure className="bg-snow lg:hidden">
        <div className="relative aspect-[16/10]">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.photo.position }}
          />
        </div>
        <figcaption className="wrap py-2.5 text-center text-small text-slate">{hero.photo.caption}</figcaption>
      </figure>

      <section className="bg-snow lg:hidden">
        <div className="wrap pb-8">
          <EligibilityCheck instanceId="check-mobile" />
        </div>
      </section>

      <section aria-labelledby="glance-title" className="bg-fog">
        <div className={SECTION}>
          <h2 id="glance-title" className="font-display text-h2">
            {glance.title}
          </h2>
          <ul className="mt-8 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glance.items.map((item) => (
              <li key={item.title} className={`flex flex-row gap-4 sm:max-lg:last:col-span-2 ${CHROME}`}>
                <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1c3a2a]">
                  <Icon name={item.icon} className="size-6 text-[#fbfaf7]" />
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] leading-tight">{item.title}</h3>
                  <p className={`mt-2 ${MUTED}`}>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gets-title" className="bg-snow">
        <div className={SECTION}>
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="gets-title" className="font-display text-h2">
                {gets.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{gets.intro}</p>
              <div className="mt-6">
                <Photo src={gets.photo.src} alt={gets.photo.alt} caption={gets.photo.caption} position={gets.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <ul className="grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:col-span-7">
              {gets.items.map((item) => (
                <li key={item.title} className={CARD}>
                  <Icon name={item.icon} />
                  <h3 className="mt-4 font-display text-[1.35rem] leading-tight">{item.title}</h3>
                  <p className={`mt-2 ${MUTED}`}>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="months-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="months-title" className="font-display text-h2">
                {months.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{months.intro}</p>
              <div className="mt-6">
                <Photo src={months.photo.src} alt={months.photo.alt} caption={months.photo.caption} position={months.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <div className={`${CARD} lg:col-span-7`}>
              <Timeline items={months.steps.map((step) => ({ label: step.when, title: step.title, body: step.body }))} />
              <p className={`mt-4 ${MUTED}`}>{months.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mentors-title" className="bg-snow">
        <div className={SECTION}>
          <h2 id="mentors-title" className="font-display text-h2">
            {mentors.title}
          </h2>
          <p className="mt-3 max-w-[42rem] text-lead text-slate">{mentors.intro}</p>
          <div className="mt-6 grid items-start gap-4 lg:grid-cols-12">
            <ul className="grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:col-span-7">
              {mentors.points.map((point) => (
                <li key={point.name} className={CARD}>
                  <h3 className="font-display text-[1.25rem] leading-tight">{point.name}</h3>
                  <p className={`mt-3 ${MUTED}`}>{point.body}</p>
                </li>
              ))}
            </ul>
            <figure className="lg:col-span-5">
              <ul className="grid grid-cols-4 items-center gap-3 [--logo-scale:0.62]">
                {mentorSchools.map((u) => (
                  <li key={u.name} className="flex h-10 items-center justify-center">
                    <UniversityLogo university={u} />
                  </li>
                ))}
              </ul>
              <figcaption className="mt-3 text-small text-slate">{mentors.schoolsNote}</figcaption>
            </figure>
          </div>
          <div className="mt-10">
            <h3 className="font-display text-h3">{mentors.speakersTitle}</h3>
            <p className="mt-2 max-w-[40rem] text-lead text-slate">{mentors.speakersNote}</p>
            <ul className="mt-6 grid auto-rows-fr grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {speakers.slice(0, 6).map((speaker) => (
                <li key={speaker.name} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-xl bg-paper text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={speaker.headshot.src}
                        alt={speaker.name}
                        fill
                        sizes="(min-width: 1024px) 14vw, 45vw"
                        className="object-cover"
                        style={{ objectPosition: speaker.headshot.position || "center" }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-6">
                      <p className="font-medium leading-tight">{speaker.name}</p>
                      <p className="text-small text-slate">{speaker.roles[0]}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="capstone" aria-labelledby="capstone-title" className="challenge-dark bg-[#1c3a2a] text-[#fbfaf7]">
        <div className={SECTION}>
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="capstone-title" className="font-display text-h2">
                {capstone.title}
              </h2>
              <p className="mt-3 text-lead text-[#fbfaf7]/85">
                {capstone.introBefore}{" "}
                <ExternalLink href={capstone.conferenceHref} className="link">
                  {capstone.conferenceLabel}
                </ExternalLink>{" "}
                {capstone.introAfter}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#fbfaf7]/85">{copy.urgency}</p>
              <h3 className="mt-6 font-display text-h3">{capstone.logisticsTitle}</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {capstone.logistics.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-[#fbfaf7]/85">
                    <Icon name="shield" className="mt-1 size-6 shrink-0 text-[#fbfaf7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Photo src={capstone.photo.src} alt={capstone.photo.alt} caption={capstone.photo.caption} position={capstone.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className={CARD}>
                <p className="text-small font-medium text-[#1c3a2a]">{capstone.itinerary.label}</p>
                <p className="mt-1 font-display text-[1.5rem] text-ink">{capstone.itinerary.place}</p>
                <div className="mt-6">
                  <Timeline
                    items={capstone.itinerary.days.map((day) => ({
                      label: day.when,
                      title: day.title,
                      body: day.body,
                      href: day.href,
                    }))}
                  />
                </div>
                <p className={`mt-4 ${MUTED}`}>{capstone.itinerary.note}</p>
              </div>
              <AdmitTicket ticket={capstone.ticket} href={capstone.conferenceHref} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="bg-fog">
        <div className={SECTION}>
          <h2 id="gallery-title" className="font-display text-h2">
            {gallery.title}
          </h2>
          <p className="mt-3 max-w-[36rem] text-lead text-slate">{gallery.intro}</p>
          <ul tabIndex={0} aria-label={gallery.title} className="mt-6 flex snap-x gap-4 overflow-x-auto pb-1">
            {gallery.photos.map((photo) => (
              <li key={photo.src} className="w-[min(78vw,18rem)] shrink-0 snap-start">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={photo.src} alt={photo.alt} fill sizes="288px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-small text-slate">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="join-title" className="bg-snow">
        <div className={SECTION}>
          <h2 id="join-title" className="font-display text-h2">
            {join.title}
          </h2>
          <ul className="mt-6 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2">
            {join.points.map((point) => (
              <li key={point} className={`${CARD} text-base leading-relaxed`}>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[40rem] text-small text-slate">{copy.feesNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#eligibility" className="btn btn-ink">
              {check.title}
            </a>
            <PageLink href={copy.applyPath} className="btn btn-ghost">
              {join.cta}
            </PageLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="ngen-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="ngen-title" className="font-display text-h2">
                {ngen.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{ngen.body}</p>
              <PageLink href={ngen.more.href} className="link mt-4 inline-block text-base">
                {ngen.more.label}
              </PageLink>
            </div>
            <ul className="grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:col-span-6">
              {stats.map((item) => (
                <li key={item.label} className={`${CARD} gap-3`}>
                  <p className="font-display text-[2.5rem] leading-none tabular">{item.value}</p>
                  <p className="text-base leading-snug text-slate">{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="eligibility" aria-labelledby="eligibility-title" className="bg-snow">
        <div className={`${SECTION} grid items-start gap-8 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 id="eligibility-title" className="font-display text-h2">
              {check.title}
            </h2>
            <p className="mt-3 text-lead text-slate">{check.intro}</p>
            <p className="mt-4 text-small text-slate">
              {check.orEmail}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <EligibilityCheck instanceId="check-bottom" showTitle={false} />
          </div>
        </div>
      </section>
    </EligibilityState>
  );
}

function AdmitTicket({ ticket, href }) {
  return (
    <article aria-label={ticket.title} className="relative rounded-xl bg-paper text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/0.45)]">
      <div className="flex items-start justify-between gap-4 p-6 pb-5">
        <div>
          <p className="text-small text-slate">{ticket.kicker}</p>
          <p className="mt-1 font-display text-[1.35rem] leading-tight">{ticket.title}</p>
        </div>
        <span aria-hidden="true" className="mt-1 size-2.5 shrink-0 rounded-full bg-[#1c3a2a]" />
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-ink/10 px-6 py-5 text-small">
        <div>
          <dt className="text-slate">{ticket.dateLabel}</dt>
          <dd className="mt-1 font-medium">{ticket.date}</dd>
        </div>
        <div>
          <dt className="text-slate">{ticket.trekLabel}</dt>
          <dd className="mt-1 font-medium">{ticket.trek}</dd>
        </div>
      </dl>
      <div className="relative flex items-center justify-between gap-4 border-t border-dashed border-ink/25 px-6 py-4">
        <span aria-hidden="true" className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-[#1c3a2a]" />
        <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-[#1c3a2a]" />
        <span className="text-small text-slate">{ticket.by}</span>
        <ExternalLink href={href} className="link text-small">
          ivyleagueconference.org
        </ExternalLink>
      </div>
    </article>
  );
}
