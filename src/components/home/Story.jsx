import Image from "next/image";
import { home } from "@/content/site";
import PageLink from "@/components/ui/PageLink";

const { story } = home;

/**
 * How NGEN began, told as a story: the group chat, the three founders and
 * the campus each one led, the gap they kept seeing and the trial run in
 * New York, signed by the three of them. Beside it, the room at that first
 * conference, in NGEN's ink until pointed at.
 */
export default function Story() {
  return (
    <section aria-labelledby="story-title" className="flex flex-col bg-fog lg:min-h-svh">
      <div className="wrap flex flex-1 flex-col justify-center pt-[clamp(5.5rem,11svh,8.5rem)] pb-[clamp(3rem,7.5svh,6.5rem)]">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col items-start gap-[clamp(1.25rem,3svh,1.75rem)] lg:col-span-7">
            <h2 id="story-title" className="font-display text-h2">
              {story.title}
            </h2>
            <p className="max-w-[40ch] text-lead">{story.lead}</p>

            {/* The three founders as a cast list: the name, then the club each one led */}
            <ul className="flex w-full flex-col gap-2.5">
              {story.founders.map((f) => (
                <li key={f.name} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-x-6 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <span className="font-display text-[1.75rem] leading-none tracking-[-0.03em]">{f.name}</span>
                  <span className="text-base text-slate">{f.led}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              {story.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <p className="font-display text-h3">{story.signature}</p>
              <PageLink href={story.more.href} className="link text-base">
                {story.more.label}
              </PageLink>
            </div>
          </div>

          <figure className="group flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
            {/* TODO(photo): replace with a photo of the three founders at the
                first conference, without the old Trailblazers banner. */}
            <div className="duo relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[18rem] lg:flex-1">
              <Image
                src="/about/events/Copy of DSC06515.jpg"
                alt="Students in the audience at NGEN’s first conference in New York, one of them asking a question into a microphone"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[78%_50%] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="text-small text-slate">{story.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
