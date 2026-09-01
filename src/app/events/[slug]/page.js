import Link from "next/link";
import { notFound } from "next/navigation";
import { whatWeDo } from "@/data/whatWeDo";
import { programs, getProgramBySlug } from "@/content/programs";
import { Button } from "@/components/ui";
import { AudienceEligibility, CategoryBadge, ContactCta, DeadlineBanner, ProgramTimeline } from "@/components/events/shared";
import TrailblazersLayout from "@/components/events/TrailblazersLayout";
import ResearchLayout from "@/components/events/ResearchLayout";
import TreksLayout from "@/components/events/TreksLayout";
import CompetitionsLayout from "@/components/events/CompetitionsLayout";
import WorkshopsLayout from "@/components/events/WorkshopsLayout";

/**
 * /events/[slug] — one page per program. Existence, metadata, and the new
 * category/deadline/audience/timeline sections read src/content/programs.js
 * directly; the bespoke per-type layouts still take the whatWeDo-shaped
 * `program` prop they were built against. Each program's `type` field picks
 * which layout variant renders below; programs with no `type` (e.g.
 * Community) get the plain fallback layout.
 */

const LAYOUTS = {
  trailblazers: TrailblazersLayout,
  research: ResearchLayout,
  treks: TreksLayout,
  competitions: CompetitionsLayout,
  workshops: WorkshopsLayout,
};

export async function generateStaticParams() {
  // "trailblazers" has its own dedicated route at src/app/events/trailblazers —
  // excluded here so the two don't collide.
  return programs.filter((p) => p.slug !== "trailblazers").map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const raw = getProgramBySlug(slug);
  if (!raw) return { title: "Program Not Found" };
  return { title: raw.name, description: raw.tagline };
}

function DefaultLayout({ program, raw }) {
  return (
    <div className="bg-surface-warm">
      <div className="container-page py-20">
        <div className="flex justify-center gap-2">
          <CategoryBadge type={raw?.type} />
        </div>
        <h1 className="mt-4 text-center font-[family-name:var(--font-heading-events)] text-3xl font-extrabold uppercase tracking-wider text-surface-dark md:text-4xl">
          {program.title}
        </h1>

        <div className="mx-auto mt-12 aspect-[16/9] max-w-3xl overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo, swapped for real file later */}
          <img src={program.photo} alt={`${program.title} program photo`} className="h-full w-full object-cover" />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-text">
          {program.pageBody}
        </p>

        {raw && (
          <div className="mt-4 flex justify-center">
            <DeadlineBanner program={raw} />
          </div>
        )}

        <div className="mt-10 flex justify-center gap-4">
          <Button variant="primary" href={program.ctaHref} external={program.ctaExternal}>
            {program.ctaLabel}
          </Button>
          <ContactCta />
        </div>

        {raw && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-neutral-200 pt-10 sm:grid-cols-2">
            <AudienceEligibility program={raw} />
            <ProgramTimeline program={raw} />
          </div>
        )}
      </div>
    </div>
  );
}

export default async function WhatWeDoPage({ params }) {
  const { slug } = await params;
  const raw = getProgramBySlug(slug);
  if (!raw) notFound();

  const program = whatWeDo.find((p) => p.slug === slug);
  const Layout = LAYOUTS[program.type] ?? DefaultLayout;

  return (
    <>
      <div className="container-page pt-6">
        <Link href="/events" className="text-sm font-semibold text-text-muted hover:text-text">
          ← Back to All Programs
        </Link>
      </div>
      <Layout program={program} raw={raw} />
    </>
  );
}
