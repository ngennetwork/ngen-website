import Link from "next/link";
import { programs } from "@/content/programs";
import { Button, SectionHeader } from "@/components/ui";
import TrailblazersVideo from "./TrailblazersVideo";

// The 4 core pillars, including Trailblazers — it gets the cinematic
// video treatment too, but still shows up as a card like every other
// program so it's never missing from the list. Workshops and the
// standing Community network are excluded from this bento.
const CORE_PROGRAMS = programs.filter((p) => p.slug !== "community" && p.slug !== "workshops");

const ONE_LINERS = {
  trailblazers:
    "Flagship NYC gatherings connecting top student founders with leading VCs and operators.",
  "research-conferences":
    "Deep-tech and biotech showcases pairing university lab research with venture capital.",
  "founder-treks":
    "Curated office visits with top venture capital funds for actively raising founders.",
  "pitch-competitions":
    "Live pitch stages awarding non-dilutive grant funding and direct investor feedback.",
  workshops:
    "Hands-on masterclasses led by operators on GTM, fundraising, and startup execution.",
};

function ProgramCard({ program, className = "" }) {
  return (
    <div
      className={`p-6 rounded-2xl border border-neutral-200/80 bg-white shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all ${className}`}
    >
      <h3 className="text-body font-sans font-extrabold text-text">{program.name}</h3>
      <p className="mt-2 flex-1 text-small text-text-muted">{ONE_LINERS[program.slug]}</p>
      <Link
        href={`/events/${program.slug}`}
        className="mt-3 text-small font-semibold text-accent-ink hover:underline"
      >
        Learn More →
      </Link>
    </div>
  );
}

/**
 * Homepage Core Programs section — the 4 core pillars as centered cards in
 * a 2x2 grid (Trailblazers, Lab-to-Startup Conferences, Founder Treks, Pitch
 * Competitions), followed by the cinematic Trailblazers video banner
 * underneath. Data comes straight from src/content/programs.js, the
 * single source of truth.
 */
export default function CoreProgramsSection() {
  return (
    <section id="programs" className="bg-bg py-16 md:py-20">
      <div className="container-page">
        <SectionHeader title="Core Programs" align="center">
          <Button variant="link" href="/events">
            See all events →
          </Button>
        </SectionHeader>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CORE_PROGRAMS.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-10 md:mt-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-neutral-200/80">
            <TrailblazersVideo variant="banner" />
          </div>
        </div>
      </div>
    </section>
  );
}
