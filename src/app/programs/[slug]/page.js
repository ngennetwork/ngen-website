import { notFound } from "next/navigation";
import { pages } from "@/content/site";
import { programs, getProgramBySlug } from "@/content/programs";
import { speakers } from "@/data/speakers";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import Photo from "@/components/layout/Photo";
import PageLink from "@/components/ui/PageLink";
import ProgramName from "@/components/ui/ProgramName";
import SpeakerGrid from "@/components/sections/SpeakerGrid";
import ConferenceFilm from "@/components/sections/ConferenceFilm";

const copy = pages.program;

/**
 * /programs/[slug]: one template for every program. The header carries
 * the program's line, its real application portal and its photo; below,
 * what it is and who it's for. The flagship conference adds its past
 * speakers and its film. Old /events/[slug] URLs redirect here.
 */

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program not found" };
  return { title: program.name, description: program.summary };
}

const isExternal = (href) => href.startsWith("http");

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const others = programs.filter((p) => p.slug !== program.slug);
  const isFlagship = program.slug === "ivy-league-entrepreneurship-conference";

  return (
    <>
      <PageHero
        id="program-title"
        title={<ProgramName name={program.name} />}
        intro={program.summary}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={program.apply.href}
              {...(isExternal(program.apply.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="btn btn-ink"
            >
              {program.apply.label}
            </a>
            <PageLink href={copy.calendar.href} className="btn btn-ghost">
              {copy.calendar.label}
            </PageLink>
          </div>
        }
        aside={<Photo src={program.photo.src} alt={program.photo.alt} position={program.photo.position} priority />}
      />

      <PageSection id="about-program" title="The program" tone="band">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-9">
          <p className="text-lead lg:col-span-5 lg:[text-wrap:pretty]">{program.description}</p>
          <dl className="flex flex-col gap-6 lg:col-span-3 lg:col-start-7">
            <div className="flex flex-col gap-1">
              <dt className="text-small text-slate">{copy.audienceLabel}</dt>
              <dd>{program.audience}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-small text-slate">{copy.applyLabel}</dt>
              <dd>{copy.applyNote}</dd>
            </div>
          </dl>
        </div>
      </PageSection>

      {isFlagship && (
        <>
          <section id="speakers" aria-labelledby="speakers-title" className="bg-snow">
            <div className="wrap py-[clamp(5rem,10vw,8rem)]">
              <div className="mb-12 flex flex-col gap-3">
                <h2 id="speakers-title" className="font-display text-h2">
                  {copy.speakersTitle}
                </h2>
                <p className="text-lead text-slate">{copy.speakersSubtitle}</p>
              </div>
              <SpeakerGrid items={speakers} columns="sm:grid-cols-3" listOnPhones />
            </div>
          </section>

          <PageSection id="film-title" title={copy.filmTitle} tone="band">
            <ConferenceFilm />
          </PageSection>
        </>
      )}

      <PageSection id="others-title" title={copy.otherTitle}>
        <ul className="flex flex-col">
          {others.map((p) => (
            <li key={p.slug}>
              <PageLink
                href={`/programs/${p.slug}`}
                className="group grid gap-2 rounded-lg py-5 transition-colors sm:grid-cols-2 sm:gap-8"
              >
                <span className="font-display text-h3 underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-current">
                  <ProgramName name={p.name} />
                </span>
                <span className="text-base text-slate sm:pt-1.5">{p.summary}</span>
              </PageLink>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <PageLink href={copy.back.href} className="link text-small">
            {copy.back.label}
          </PageLink>
        </p>
      </PageSection>
    </>
  );
}
