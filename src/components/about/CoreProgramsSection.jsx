import { programs } from "@/content/programs";
import { SectionHeader } from "@/components/ui";
import TrailblazersVideo from "./TrailblazersVideo";

// The 4 core pillars — every program in the data layer. Trailblazers gets
// the cinematic video treatment below too, but still shows up as a card
// like every other program so it's never missing from the list.
const CORE_PROGRAMS = programs;

const ONE_LINERS = {
  trailblazers:
    "Our flagship conference to learn from experienced founders and VCs and network with fellow builders.",
  "research-conferences":
    "Explore how to commercialize research, including IP and tech transfer, across a new field each time.",
  "founder-treks":
    "Spend a day visiting four VCs and angels in their offices while actively raising.",
  "pitch-competitions":
    "Pitch your company and compete against other founders for investment and prize funding.",
};

function ProgramCard({ program, className = "" }) {
  return (
    <div
      className={`p-6 rounded-2xl border border-neutral-200/80 bg-white shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all ${className}`}
    >
      <h3 className="text-body font-sans font-extrabold text-text">{program.name}</h3>
      <p className="mt-2 flex-1 text-small text-text-muted">{ONE_LINERS[program.slug]}</p>
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
        <SectionHeader title="Core Programs" align="center" />

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
