"use client";

import Image from "next/image";
import { speakers } from "@/data/speakers";
import { universities } from "@/data/universities";
import { site } from "@/content/site";
import BookingCall from "@/components/challenge/BookingCall";
import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
import Icon from "@/components/challenge/Icons";
import Pricing from "@/components/challenge/Pricing";
import Timeline from "@/components/challenge/Timeline";
import { formatUsd } from "@/components/challenge/money";
import Photo from "@/components/layout/Photo";
import UniversityLogo from "@/components/brand/UniversityLogo";
import PageLink from "@/components/ui/PageLink";

const SECTION = "wrap py-[clamp(2.5rem,4.5vw,3.5rem)]";
const CARD = "rounded-2xl bg-[#f6f3ec] text-[#050e26] shadow-[0_22px_50px_-28px_rgb(5_14_38/0.65)]";
const MUTED = "text-[1.075rem] leading-relaxed text-[#3e4d6e]";

export default function ChallengeHome({ initialLang }) {
  return (
    <ChallengeShell initialLang={initialLang}>
      <Home />
    </ChallengeShell>
  );
}

function Home() {
  const { copy } = useLocale();
  const { hero, glance, gets, months, mentors, capstone, gallery, ngen, recognition, booking, close } = copy;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(copy.emailSubject)}`;
  const mentorSchools = mentors.schools.map((name) => universities.find((u) => u.name === name)).filter(Boolean);
  const { raised, reach, universities: schoolsFigure, events } = site.figures;

  return (
    <>
      <header className="relative isolate overflow-hidden bg-[#050e26] text-on-dark">
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          style={{ objectPosition: hero.photo.position }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#050e26]/92 via-[#050e26]/62 to-[#050e26]/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050e26]/80 via-[#050e26]/15 to-[#050e26]/45" />
        <div className="relative">
          <div className="wrap pb-8 pt-32 lg:pb-10 lg:pt-36">
            <div className="flex max-w-[40rem] flex-col items-start gap-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ec] px-3 py-1.5 text-small text-[#050e26]">
                <span aria-hidden="true" className="node" />
                {hero.deadlineLabel} {copy.deadline}
              </p>
              <h1 id="challenge-title" className="max-w-[16ch] font-display text-[clamp(2.75rem,1.6rem+3vw,4.5rem)] leading-[1.02] tracking-[-0.036em]">
                {hero.title}
              </h1>
              <p className="max-w-[42ch] text-lead text-on-dark/90">{hero.intro}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="btn btn-ink">
                  {hero.cta}
                </a>
                <PageLink href={copy.applyPath} className="btn btn-ghost">
                  {hero.applyCta}
                </PageLink>
              </div>
              <p className="text-small text-on-dark/80">
                <a href="#pricing" className="link">
                  {hero.priceLead} {formatUsd(copy.pricing.total)} {hero.priceMid}
                </a>
              </p>
            </div>
            <p className="mt-5 max-w-[36rem] text-small text-on-dark/70">{hero.photo.caption}</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="glance-title" className="bg-fog">
        <div className={SECTION}>
          <h2 id="glance-title" className="font-display text-h2">
            {glance.title}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {glance.items.map((item) => (
              <li key={item.title} className={`${CARD} flex gap-4 p-6`}>
                <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#050e26]">
                  <Icon name={item.icon} />
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
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="gets-title" className="font-display text-h2">
                {gets.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{gets.intro}</p>
              <div className="mt-5">
                <Photo src={gets.photo.src} alt={gets.photo.alt} caption={gets.photo.caption} position={gets.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {gets.items.map((item) => (
                <li key={item.title} className={`${CARD} p-6`}>
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
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="months-title" className="font-display text-h2">
                {months.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{months.intro}</p>
              <div className="mt-5">
                <Photo src={months.photo.src} alt={months.photo.alt} caption={months.photo.caption} position={months.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <div className={`${CARD} p-6 sm:p-8 lg:col-span-7`}>
              <Timeline
                items={months.steps.map((step) => ({ label: step.when, title: step.title, body: step.body }))}
              />
              <p className={`mt-2 ${MUTED}`}>{months.note}</p>
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
          <div className="mt-5 grid items-start gap-4 lg:grid-cols-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {mentors.points.map((point) => (
                <li key={point.name} className={`${CARD} p-5`}>
                  <h3 className="font-display text-[1.25rem] leading-tight">{point.name}</h3>
                  <p className={`mt-2 ${MUTED}`}>{point.body}</p>
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
          <div className="mt-8">
            <h3 className="font-display text-h3">{mentors.speakersTitle}</h3>
            <p className="mt-2 max-w-[40rem] text-lead text-slate">{mentors.speakersNote}</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {speakers.slice(0, 6).map((speaker) => (
                <li key={speaker.name} className={`${CARD} overflow-hidden p-0`}>
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
                  <div className="p-3">
                    <p className="font-medium leading-tight">{speaker.name}</p>
                    <p className="mt-1 text-small text-[#3e4d6e]">{speaker.roles[0]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="capstone" aria-labelledby="capstone-title" className="bg-ink-deep text-on-dark">
        <div className={SECTION}>
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="capstone-title" className="font-display text-h2">
                {capstone.title}
              </h2>
              <p className="mt-3 text-lead text-on-dark/80">{capstone.intro}</p>
              <h3 className="mt-5 font-display text-h3">{capstone.logisticsTitle}</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {capstone.logistics.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.075rem] leading-relaxed text-on-dark/80">
                    <Icon name="shield" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Photo src={capstone.photo.src} alt={capstone.photo.alt} caption={capstone.photo.caption} position={capstone.photo.position} ratio="aspect-[4/3]" />
              </div>
            </div>
            <div className={`${CARD} p-6 sm:p-8 lg:col-span-7`}>
              <p className="text-small font-medium text-[#c2410c]">{capstone.itinerary.label}</p>
              <p className="mt-1 font-display text-[1.5rem] text-[#050e26]">{capstone.itinerary.place}</p>
              <div className="mt-6">
                <Timeline
                  items={capstone.itinerary.days.map((day, index) => ({
                    label: `${index + 1}`,
                    title: day.title,
                    body: day.body,
                  }))}
                />
              </div>
              <p className={`mt-2 ${MUTED}`}>{capstone.itinerary.note}</p>
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
          <ul
            tabIndex={0}
            aria-label={gallery.title}
            className="mt-5 flex snap-x gap-4 overflow-x-auto pb-1"
          >
            {gallery.photos.map((photo) => (
              <li key={photo.src} className="w-[min(78vw,18rem)] shrink-0 snap-start">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={photo.src} alt={photo.alt} fill sizes="288px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-small text-slate">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Pricing copy={copy} />

      <section aria-labelledby="ngen-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="ngen-title" className="font-display text-h2">
                {ngen.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{ngen.body}</p>
              <PageLink href={ngen.more.href} className="link mt-4 inline-block text-base">
                {ngen.more.label}
              </PageLink>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {[raised, reach, schoolsFigure, events].map((item) => (
                <div key={item.value} className={`${CARD} p-5`}>
                  <dd className="font-display text-[1.75rem] leading-none tabular">{item.value}</dd>
                  <dt className={`mt-2 ${MUTED}`}>{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8">
            <h3 className="font-display text-h3">{recognition.title}</h3>
            <p className="mt-2 text-lead text-slate">{recognition.intro}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {recognition.awards.map((award) => (
                <li key={award.name} className="flex items-baseline justify-between gap-4 rounded-xl bg-paper/60 px-4 py-3">
                  <span>{award.name}</span>
                  <span className="shrink-0 text-small text-slate">
                    {award.place}, {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="book" aria-labelledby="book-title" className="bg-snow">
        <div className={SECTION}>
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="book-title" className="font-display text-h2">
                {booking.title}
              </h2>
              <p className="mt-3 text-lead text-slate">{booking.intro}</p>
            </div>
            <p className="text-small text-slate lg:col-span-5 lg:text-right">
              {booking.or}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
          <div className="mt-5">
            <BookingCall booking={booking} />
          </div>
        </div>
      </section>

      <section aria-labelledby="close-title" className="bg-fog">
        <div className={`${SECTION} grid items-end gap-6 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <h2 id="close-title" className="font-display text-h2">
              {close.title}
            </h2>
            <p className="mt-3 text-lead text-slate">{close.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a href="#book" className="btn btn-ink">
              {close.cta}
            </a>
            <PageLink href={copy.applyPath} className="btn btn-ghost">
              {close.apply}
            </PageLink>
          </div>
        </div>
      </section>
    </>
  );
}
