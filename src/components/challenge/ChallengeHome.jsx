"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { speakers } from "@/data/speakers";
import { universities } from "@/data/universities";
import { site } from "@/content/site";
import ApplyForm from "@/components/challenge/ApplyForm";
import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
import Icon from "@/components/challenge/Icons";
import Timeline from "@/components/challenge/Timeline";
import Photo from "@/components/layout/Photo";
import UniversityLogo from "@/components/brand/UniversityLogo";
import ExternalLink from "@/components/ui/ExternalLink";
import PageLink from "@/components/ui/PageLink";

const SECTION = "wrap py-[4.25rem] lg:py-[clamp(3.5rem,7vw,5.5rem)]";
const CHROME = "h-full rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10 max-lg:p-7";
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
  const { copy, lang } = useLocale();
  const { hero, trip, glance, gets, months, mentors, capstone, gallery, join, ngen, apply } = copy;
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
    <>
      <header className="bg-[#1c3a2a] text-[#fbfaf7] lg:grid lg:min-h-[44rem] lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:pt-28">
        <div className="relative h-60 max-md:aspect-[6000/2180] max-md:h-auto lg:col-start-2 lg:row-start-1 lg:h-full lg:min-h-[36rem]">
          <div className="absolute inset-0 overflow-hidden lg:top-[var(--gutter)] lg:right-[var(--gutter)] lg:bottom-[var(--gutter)] lg:rounded-2xl lg:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.55)] lg:ring-1 lg:ring-[#fbfaf7]/30">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover md:hidden"
              style={{ objectPosition: "50% 63.74%" }}
            />
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="hidden origin-bottom scale-[1.32] object-cover md:block lg:hidden"
              style={{ objectPosition: "center bottom" }}
            />
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              sizes="80vw"
              loading="eager"
              fetchPriority="high"
              className="hidden origin-bottom scale-[1.41] object-cover lg:block"
              style={{ objectPosition: "center bottom" }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center py-10 pr-[max(var(--gutter),env(safe-area-inset-right))] pl-wrap max-md:py-5 lg:col-start-1 lg:row-start-1 lg:py-20 lg:pr-16">
          <div className="flex max-w-[34rem] flex-col gap-6 max-md:gap-3.5 lg:gap-8">
            <div className="flex flex-col gap-4 max-md:gap-2.5 lg:gap-5">
              <p className={`text-[0.72rem] font-medium text-[#fbfaf7]/65 ${lang === "en" ? "uppercase tracking-[0.22em]" : "tracking-[0.06em]"}`}>
                {hero.eyebrow}
              </p>
              <h1 id="challenge-title" className={`font-display text-[clamp(2.75rem,1.5rem+2.2vw,4.4rem)] leading-[1.02] max-md:text-[2.375rem] max-md:leading-[1.05] ${lang === "en" ? "max-w-[11ch]" : ""}`}>
                {hero.title}
              </h1>
              <div aria-hidden="true" className="h-px w-10 bg-[#fbfaf7]/40" />
            </div>
            <div className="flex flex-col gap-4 max-md:contents">
              <p className="max-w-[34ch] text-lead leading-relaxed text-[#fbfaf7]/92 max-md:max-w-none max-md:text-base max-md:leading-snug">{hero.tagline}</p>
              <p className="max-w-[38ch] text-base leading-relaxed text-[#fbfaf7]/72 max-md:order-2 max-md:max-w-none">{hero.intro}</p>
            </div>
            <div className="flex flex-col items-start gap-5 max-md:order-1 max-md:gap-3">
              <p className="text-small text-[#fbfaf7]/60">
                {copy.deadlineLabel} {copy.deadline}
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <a id="hero-apply" href={copy.applyPath} className="btn btn-on-dark whitespace-normal text-center">
                  {join.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileApplyBar href={copy.applyPath} label={join.cta} />

      <section aria-labelledby="schools-label" className="school-band border-y border-ink/10 bg-snow">
        <div className="wrap py-8 lg:py-10">
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
        <div className="wrap pt-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={gallery.lead.src}
              alt={gallery.lead.alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "50% 42%" }}
            />
          </div>
        </div>
        <figcaption className="wrap py-3 text-center text-small leading-relaxed text-slate">{gallery.lead.caption}</figcaption>
      </figure>

      <section aria-labelledby="trip-title" className="bg-snow">
        <div className="wrap pt-6 pb-8 lg:py-12">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col justify-center rounded-xl bg-fog p-6 ring-1 ring-ink/10 max-lg:p-7 lg:p-8">
              <p className="text-small font-medium text-[#1c3a2a]">{trip.kicker}</p>
              <h2 id="trip-title" className="mt-2 font-display text-h3">
                {trip.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate">{trip.body}</p>
              <a href="#capstone" className="link mt-4 inline-block text-base">
                {trip.more}
              </a>
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink/10">
                <Image
                  src={trip.photo.src}
                  alt={trip.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: trip.photo.position }}
                />
              </div>
              <figcaption className="mt-3 text-small text-slate">{trip.photo.caption}</figcaption>
            </figure>
          </div>
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
              {months.photo && (
                <div className="mt-6">
                  <Photo src={months.photo.src} alt={months.photo.alt} caption={months.photo.caption} position={months.photo.position} ratio="aspect-[4/3]" />
                </div>
              )}
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
          <ul className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {gallery.photos.map((photo) => (
              <li key={photo.src}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 text-small leading-relaxed text-slate">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="request" aria-labelledby="join-title" className="bg-snow">
        <div className={`${SECTION} grid items-start gap-y-8 lg:grid-cols-12 lg:gap-x-8`}>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <h2 id="join-title" className="font-display text-h2">
              {join.title}
            </h2>
            <ul className="flex flex-col gap-3">
              {join.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[#1c3a2a]" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="font-medium">
              {copy.deadlineLabel} {copy.deadline}
            </p>
            <p className="text-small text-slate">{copy.feesNote}</p>
            <p className="text-small text-slate">
              {apply.emailInstead}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
          <div id="request-form" className="flex flex-col gap-5 lg:col-span-7">
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-h3">{apply.formTitle}</h3>
              <p className="text-base text-slate">{apply.formIntro}</p>
            </div>
            <ApplyForm />
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

    </>
  );
}

function MobileApplyBar({ href, label }) {
  const shown = useApplyBar();

  return (
    <div
      className={`challenge-apply-bar fixed inset-x-0 bottom-0 z-40 border-t border-[#1c3a2a]/15 bg-[#f3f1ec]/80 px-[max(1rem,env(safe-area-inset-left))] pt-2.5 pr-[max(1rem,env(safe-area-inset-right))] pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-12px_28px_-20px_rgb(21_24_21/0.55)] backdrop-blur-md motion-safe:transition-opacity motion-safe:duration-200 md:hidden ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={shown ? undefined : true}
      inert={shown ? undefined : true}
    >
      <a href={href} className="btn h-12 min-h-12 w-full whitespace-normal px-3 text-center leading-snug bg-[#1c3a2a] text-[#fbfaf7] hover:bg-[#274e39]">
        {label}
      </a>
    </div>
  );
}

function useApplyBar() {
  const [shown, setShown] = useState(false);

  // Hidden while the hero button or any part of the request form is on screen.
  useEffect(() => {
    const hero = document.getElementById("hero-apply");
    const form = document.getElementById("request-form");
    const targets = [hero, form].filter(Boolean);
    if (!targets.length) return undefined;

    const visible = new Set(targets);
    const track = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setShown(visible.size === 0);
    };

    const observers = [];
    if (hero) {
      const o = new IntersectionObserver(track, { rootMargin: "0px 0px -72px 0px", threshold: 0.6 });
      o.observe(hero);
      observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(track, { rootMargin: "0px 0px -72px 0px", threshold: 0 });
      o.observe(form);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return shown;
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
