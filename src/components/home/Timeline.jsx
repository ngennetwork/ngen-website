import { home } from "@/content/site";
import InView from "@/components/motion/InView";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";

const { story } = home;

/**
 * How NGEN began, as a trail: one line across the page with a node at each
 * step, drawn left to right the first time it comes into view, each node
 * lighting as the line reaches it. Below 1280px the trail runs down the left.
 */
export default function Timeline() {
  return (
    <Section
      id="story-title"
      tone="fog"
      title={story.title}
      action={
        <PageLink href={story.more.href} className="link text-base">
          {story.more.label}
        </PageLink>
      }
    >
      <InView as="ol" className="timeline relative grid gap-y-14 xl:grid-cols-4 xl:gap-x-10" margin="0px 0px -25% 0px">
        <span aria-hidden="true" className="timeline-line" />
        {story.steps.map((step, i) => (
          <li
            key={step.label}
            className="relative flex flex-col gap-3 pl-10 md:grid md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-x-10 md:gap-y-2 xl:flex xl:pt-14 xl:pl-0"
            style={{ "--i": i }}
          >
            <span aria-hidden="true" className="timeline-node" />
            <span className="font-display text-[clamp(3.25rem,2rem+3.4vw,5.5rem)] leading-[0.9] tracking-[-0.045em] tabular md:row-span-3 xl:row-span-1">
              {step.figure}
            </span>
            <span className="text-small text-slate md:col-start-2 xl:col-start-auto">{step.label}</span>
            <h3 className="mt-1 font-display text-h3 md:col-start-2 xl:col-start-auto xl:text-[1.5rem]">{step.title}</h3>
            <p className="max-w-[52ch] text-base text-slate md:col-start-2 xl:col-start-auto">{step.body}</p>
          </li>
        ))}
      </InView>
    </Section>
  );
}
