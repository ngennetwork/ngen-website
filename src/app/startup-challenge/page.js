import Image from "next/image";
import { site } from "@/content/site";
import { universities } from "@/data/universities";
import { challenge } from "@/components/challenge/content";
import Itinerary from "@/components/challenge/Itinerary";
import PageHero from "@/components/layout/PageHero";
import Photo from "@/components/layout/Photo";
import UniversityLogo from "@/components/brand/UniversityLogo";
import PageLink from "@/components/ui/PageLink";

export const metadata = {
  title: "6-Month Start-Up Challenge",
  description:
    "A 6-month start-up challenge for high schoolers to build real world business skills. Five monthly milestones, Ivy League mentorship, an NYC capstone week, and an optional virtual summer internship add-on.",
};

const { hero, school, months, mentors, capstone, ngen, recognition, close } = challenge;

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(challenge.emailSubject)}`;

const SECTION = "wrap py-[clamp(5rem,10vw,8rem)]";

/** The eight Ivies, in the order the copy lists them; the program's mentors come from these alone. */
const mentorSchools = mentors.schools.map((name) => universities.find((u) => u.name === name)).filter(Boolean);

/** NGEN's own figures: the largest leads, the rest follow as smaller proof. */
const { raised, reach, universities: schoolsFigure, events } = site.figures;

/**
 * /startup-challenge: NGEN's pitch to high schools for the six-month
 * Start-Up Challenge. Reachable by direct link; kept out of the sitemap.
 *
 * Top to bottom: what it is, how it fits a school, the six months as a
 * term planner, the mentors, the June capstone (the page's one navy
 * moment, with its itinerary as the signature object), who runs it,
 * recognition, and one way to start: an email.
 */
export default function StartupChallengePage() {
  return (
    <>
      <PageHero
        id="challenge-title"
        title={hero.title}
        intro={hero.intro}
        action={
          <a href={mailto} className="btn btn-ink">
            {hero.cta}
          </a>
        }
        aside={
          <Photo
            src={hero.photo.src}
            alt={hero.photo.alt}
            caption={hero.photo.caption}
            position={hero.photo.position}
            priority
          />
        }
      />

      {/* How it fits a school: the title in the margin, stacked statements beside it */}
      <section aria-labelledby="school-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col gap-5 lg:col-span-4">
              <h2 id="school-title" className="max-w-[14ch] font-display text-h2">
                {school.title}
              </h2>
              <p className="text-lead text-slate">{school.intro}</p>
            </div>
            <dl className="flex flex-col gap-10 lg:col-span-7 lg:col-start-6 lg:gap-12 lg:pt-1">
              {school.points.map((point) => (
                <div key={point.name} className="grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                  <dt className="font-display text-h3">{point.name}</dt>
                  <dd className="text-lead text-slate sm:pt-0.5">{point.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The six months as a term planner: one banded row per month */}
      <section aria-labelledby="months-title" className="bg-snow">
        <div className={SECTION}>
          <div className="mb-12 flex max-w-[40rem] flex-col gap-5">
            <h2 id="months-title" className="font-display text-h2">
              {months.title}
            </h2>
            <p className="text-lead text-slate">{months.intro}</p>
          </div>
          <ol className="flex flex-col">
            {months.steps.map((step) => (
              <li
                key={step.when}
                className="-mx-4 grid gap-x-8 gap-y-2 rounded-lg px-4 py-6 odd:bg-fog sm:-mx-5 sm:px-5 lg:grid-cols-12 lg:items-baseline"
              >
                <p className="flex items-center gap-2.5 text-base text-slate lg:col-span-2">
                  {step.capstone && <span aria-hidden="true" className="node" />}
                  <span className={step.capstone ? "text-ink" : undefined}>{step.when}</span>
                  {step.note && <span className="text-small">({step.note.toLowerCase()})</span>}
                </p>
                <h3 className="font-display text-h3 lg:col-span-4">{step.title}</h3>
                <p className="text-base text-slate lg:col-span-6">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mentors: the copy and the eight schools on the left, what a mentor gives on the right, sharing rows */}
      <section aria-labelledby="mentors-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <h2 id="mentors-title" className="max-w-[18ch] font-display text-h2">
                {mentors.title}
              </h2>
              <p className="text-lead text-slate">{mentors.intro}</p>
              <figure className="mt-6 flex flex-col gap-6">
                <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 [--logo-scale:0.72] sm:grid-cols-4 lg:[--logo-scale:0.74] xl:[--logo-scale:0.84]">
                  {mentorSchools.map((u) => (
                    <li key={u.name} className="flex h-14 w-full items-center justify-center">
                      <UniversityLogo university={u} />
                    </li>
                  ))}
                </ul>
                <figcaption className="text-small text-slate">{mentors.schoolsNote}</figcaption>
              </figure>
            </div>
            <ul className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8 lg:justify-between lg:pt-2">
              {mentors.points.map((point) => (
                <li key={point.name} className="flex flex-col gap-2">
                  <h3 className="font-display text-h3">{point.name}</h3>
                  <p className="text-lead text-slate">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The capstone: the page's one navy moment, with the itinerary as its object */}
      <section id="capstone" aria-labelledby="capstone-title" className="grain bg-ink-deep text-on-dark">
        <div className={SECTION}>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <h2 id="capstone-title" className="max-w-[18ch] font-display text-h2">
                {capstone.title}
              </h2>
              <p className="text-lead text-on-dark/75">{capstone.intro}</p>
              <figure className="mt-6 flex flex-col gap-3 lg:mt-auto">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper/5">
                  <Image
                    src={capstone.photo.src}
                    alt={capstone.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: capstone.photo.position }}
                  />
                </div>
                <figcaption className="text-small text-mist">{capstone.photo.caption}</figcaption>
              </figure>
            </div>
            <Itinerary {...capstone.itinerary} className="lg:col-span-5 lg:col-start-8" />
          </div>
        </div>
      </section>

      {/* Who runs it: NGEN's figures, one leading and the rest smaller */}
      <section aria-labelledby="ngen-title" className="bg-fog">
        <div className={SECTION}>
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col items-start gap-6 lg:col-span-6">
              <h2 id="ngen-title" className="max-w-[18ch] font-display text-h2">
                {ngen.title}
              </h2>
              <p className="text-lead text-slate">{ngen.body}</p>
              <PageLink href={ngen.more.href} className="link mt-auto text-base">
                {ngen.more.label}
              </PageLink>
            </div>
            <dl className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8 lg:justify-between">
              <div className="flex flex-col gap-2">
                <dt className="order-2 max-w-[28ch] text-lead text-slate">{raised.label}</dt>
                <dd className="order-1 font-display text-[clamp(3.5rem,2rem+5vw,6rem)] leading-none tracking-[-0.03em] tabular">
                  {raised.value}
                </dd>
              </div>
              <div className="flex flex-col gap-5">
                {[reach, schoolsFigure, events].map((f) => (
                  <div key={f.value} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-x-6">
                    <dt className="col-start-2 row-start-1 text-base text-slate">{f.label}</dt>
                    <dd className="col-start-1 row-start-1 font-display text-h3 tabular">{f.value}</dd>
                  </div>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Recognition: a banded list, the award on the left, where and when on the right */}
      <section aria-labelledby="recognition-title" className="bg-snow">
        <div className={SECTION}>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col gap-4 lg:col-span-4">
              <h2 id="recognition-title" className="font-display text-h2">
                {recognition.title}
              </h2>
              <p className="text-lead text-slate">{recognition.intro}</p>
            </div>
            <ul className="flex flex-col lg:col-span-8">
              {recognition.awards.map((award) => (
                <li
                  key={award.name}
                  className="-mx-4 flex flex-col gap-1 rounded-lg px-4 py-4 odd:bg-fog sm:-mx-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-5"
                >
                  <span className="text-lead">{award.name}</span>
                  <span className="shrink-0 text-base text-slate tabular sm:text-right">
                    {award.place}, {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* One way to start: an email */}
      <section aria-labelledby="close-title" className="bg-fog">
        <div className={`${SECTION} grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-end`}>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <h2 id="close-title" className="max-w-[18ch] font-display text-h2">
              {close.title}
            </h2>
            <p className="text-lead text-slate">{close.body}</p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:col-start-9 lg:items-end">
            <a href={mailto} className="btn btn-ink">
              {close.cta}
            </a>
            <p className="text-small text-slate">
              {close.or}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
