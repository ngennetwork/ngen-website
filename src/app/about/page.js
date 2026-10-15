import Image from "next/image";
import { pages } from "@/content/site";
import PageHero from "@/components/layout/PageHero";
import Photo from "@/components/layout/Photo";
import ConferenceCard from "@/components/home/ConferenceCard";

const { about } = pages;

export const metadata = {
  title: "About",
  description: about.intro,
};

/**
 * Who NGEN is: NGEN's mission on its own stage, the founders' letter set as
 * a letter beside the room at their first conference, and what it grew
 * into: the Ivy League Entrepreneurship Conference, on the same grid as the
 * letter.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        id="about-title"
        title={about.title}
        intro={about.intro}
        aside={
          // TODO(photo): keep or replace; also stands in on the home timeline.
          <Photo
            src="/about/events/A78A2335.JPG"
            alt="A speaker on stage in front of NGEN's slide: building the Ivy+ intercollegiate entrepreneurship ecosystem"
            caption={about.caption}
            position="50% 38%"
            priority
          />
        }
      />

      <section aria-labelledby="letter-title" className="bg-fog">
        <div className="wrap py-[clamp(4rem,8vw,7rem)]">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <h2 id="letter-title" className="font-display text-[1.75rem] leading-tight tracking-[-0.025em] lg:col-span-3 lg:pt-2">
              {about.letterTitle}
            </h2>
            <article className="rounded-2xl bg-paper px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,5vw,3.5rem)] md:max-lg:px-[14%] shadow-[0_24px_60px_-40px_rgb(21_39_71/0.35)] ring-1 ring-ink/6 lg:col-span-6">
              <div className="flex flex-col gap-5 text-lead text-ink/90 [&>p]:[text-wrap:pretty]">
                {about.letter.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-8 text-lead text-slate">{about.signoff}</p>
              <p className="mt-1 font-display text-h3">{about.signature}</p>
            </article>
            <figure className="flex flex-col gap-3 self-start lg:sticky lg:top-28 lg:col-span-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ink/5">
                {/* TODO(photo): this first-conference photo is used on four pages; replace
                    with a new one of the founders (see public/about/founders-photo.jpeg,
                    which still shows the old Trailblazers banner). */}
                <Image
                  src="/about/events/Copy of DSC06515.jpg"
                  alt="Students in the audience at NGEN’s first conference in New York, one of them asking a question into a microphone"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover object-[78%_50%]"
                />
              </div>
              <figcaption className="text-small text-slate">{about.roomCaption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="conference-title" className="bg-snow">
        <div className="wrap py-[clamp(4rem,8vw,7rem)]">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <h2 id="conference-title" className="font-display text-[1.75rem] leading-tight tracking-[-0.025em] lg:col-span-3 lg:pt-2">
              {about.conferenceTitle}
            </h2>
            <div className="flex flex-col gap-5 lg:col-span-5">
              {about.conference.map((paragraph, i) => (
                <p key={paragraph.slice(0, 32)} className={`text-lead [text-wrap:pretty] ${i === 0 ? "text-ink" : "text-slate"}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ConferenceCard ground="bg-snow" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
