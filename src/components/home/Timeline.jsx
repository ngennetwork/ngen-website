import Image from "next/image";
import { conference, home } from "@/content/site";
import InView from "@/components/motion/InView";
import Section from "@/components/layout/Section";

const { timeline } = home;

/**
 * What came after the founding, as a trail on NGEN's deepest navy: one
 * line with a node at each milestone, drawn the first time it comes into
 * view. Each milestone reads the same way: its step, a photo (in NGEN's ink
 * until pointed at), what happened, one line on it. The flagship that
 * hasn't happened yet shows its own wordmark instead of a photo (no glow:
 * the conference ticket further down is the page's one glowing object).
 * Across the page from 1280px; below that the trail runs down the left,
 * photo beside the words.
 */
export default function Timeline() {
  return (
    <Section id="timeline-title" tone="deep" title={timeline.title}>
      <InView as="ol" className="timeline relative grid gap-y-12 xl:grid-cols-4 xl:gap-x-8" margin="0px 0px -25% 0px">
        <span aria-hidden="true" className="timeline-line" />
        {timeline.steps.map((step, i) => (
          <li
            key={step.title}
            className="group relative flex flex-col gap-4 pl-10 md:grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:content-start md:gap-x-8 md:gap-y-2 xl:flex xl:pt-10 xl:pl-0"
            style={{ "--i": i }}
          >
            <span aria-hidden="true" className="timeline-node" />
            <p className="flex gap-2 text-small text-mist tabular md:col-start-2 xl:col-start-auto">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true">·</span>
              <span>{step.label}</span>
            </p>
            {step.photo ? (
              <div className="duo relative aspect-[4/3] overflow-hidden rounded-xl md:col-start-1 md:row-span-3 md:row-start-1">
                <Image
                  src={step.photo.src}
                  alt={step.photo.alt}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 15rem, 100vw"
                  className="object-cover group-hover:scale-[1.04]"
                  style={{ objectPosition: step.photo.position ?? "50% 50%" }}
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-paper px-[14%] ring-1 ring-ink/10 ring-inset md:col-start-1 md:row-span-3 md:row-start-1">
                <Image
                  src={step.mark.src}
                  alt={conference.name}
                  width={step.mark.width}
                  height={step.mark.height}
                  sizes="260px"
                  className="h-auto w-full brightness-0 invert"
                />
              </div>
            )}
            <h3 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] md:col-start-2 xl:col-start-auto">{step.title}</h3>
            <p className="text-base text-slate md:col-start-2 xl:col-start-auto">{step.body}</p>
          </li>
        ))}
      </InView>
    </Section>
  );
}
