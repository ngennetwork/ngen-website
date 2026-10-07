import Image from "next/image";
import { home, site } from "@/content/site";
import PageLink from "@/components/ui/PageLink";

const { closing } = home;

/**
 * The way in, over the room itself: student founders in the audience at
 * an NGEN event, set in NGEN's navy and darkening toward the words. One
 * screen, the headline, the line and the actions grouped at the foot.
 */
export default function Closing() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-ink-deep text-on-dark">
      <Image
        src="/about/events/A78A2298.JPG"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[60%_45%] grayscale"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-deep mix-blend-color" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_29_55/0.94)_0%,rgb(15_29_55/0.82)_45%,rgb(15_29_55/0.45)_100%)]" />

      <div className="wrap flex min-h-svh flex-col justify-end gap-7 pt-[clamp(6rem,12svh,8.5rem)] pb-[clamp(4rem,9svh,6.5rem)]">
        <h2 id="closing-title" className="font-display text-[clamp(3rem,1.4rem+4.6vw,6rem)] leading-[0.98] tracking-[-0.04em]">
          {closing.title}
        </h2>
        <p className="max-w-[40ch] text-lead text-on-dark/80">{closing.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <PageLink href={closing.primary.href} className="btn btn-paper">
            {closing.primary.label}
          </PageLink>
          <PageLink href={closing.secondary.href} className="btn btn-ghost">
            {closing.secondary.label}
          </PageLink>
        </div>
        <p className="mt-6 max-w-[60ch] text-small text-mist">
          {closing.backers}
          {"\u00a0"}
          <a href={`mailto:${site.email}`} className="link text-on-dark">
            {site.email}
          </a>
          .
        </p>
        <p className="sr-only">{closing.caption}</p>
      </div>
    </section>
  );
}
