import {
  ApplyOrEmpty,
  AudienceEligibility,
  CategoryBadge,
  ContactCta,
  DeadlineBanner,
  ProgramStatus,
  ProgramTimeline,
} from "./shared";
import { getProgramBySlug } from "@/content/programs";

const INSTRUCTOR = {
  name: "Morgan Ellsworth",
  role: "Operator-in-Residence, ex-Head of Growth",
  photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  bio: "Morgan has led growth and fundraising teams at two venture-backed startups and now runs NGEN's workshop series, teaching the same hands-on skills founders need in their first year.",
};

function formatCohort(date) {
  if (!date) return "Next cohort: TBD";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "Next cohort: TBD";
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
  return `Next Cohort: ${formatted}`;
}

const PREREQUISITES = [
  "A laptop with your current pitch deck or product one-pager",
  "An early-stage startup idea or company (pre-seed to seed)",
  "No prior fundraising or GTM experience required",
];

const TOOLS = ["Google Slides or Figma", "A spreadsheet tool (Sheets/Excel)", "Notion (optional, for notes)"];

const MODULES = [
  {
    time: "90 min",
    title: "Fundraising Narrative Lab",
    takeaways: "Build a pitch narrative investors actually remember, from scratch in the room.",
    download: "Narrative Worksheet (PDF)",
  },
  {
    time: "75 min",
    title: "Pricing & GTM Frameworks",
    takeaways: "Repeatable frameworks for pricing, go-to-market, and early hiring decisions.",
    download: "GTM Playbook (PDF)",
  },
  {
    time: "60 min",
    title: "Customer Conversation Playbook",
    takeaways: "The common mistakes founders make in their first 100 customer conversations, and how to avoid them.",
    download: "Interview Script Template (DOCX)",
  },
  {
    time: "45 min",
    title: "Term Sheet Breakdown",
    takeaways: "A plain-language walkthrough of a term sheet before your lawyer explains it to you.",
    download: "Term Sheet Glossary (PDF)",
  },
];

const GALLERY = [
  {
    label: "Sample Pitch Deck",
    photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Financial Model",
    photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "GTM One-Pager",
    photo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
  },
];

function Accordion({ modules }) {
  return (
    <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
      {modules.map((mod, i) => (
        <details key={mod.title} className="group p-6" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-orange)]">
                Module {i + 1} · {mod.time}
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-heading-events)] text-lg font-semibold text-[#111622]">
                {mod.title}
              </h3>
            </div>
            <span className="mt-1 shrink-0 text-xl text-[#111622] transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-3 pl-0">
            <p className="text-sm leading-relaxed text-[#111622]/70">{mod.takeaways}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted">
              {mod.download} (coming soon)
            </span>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function WorkshopsLayout({ program }) {
  const record = getProgramBySlug(program.slug);
  const cohort = formatCohort(record?.nextEventDate);
  const location = record?.nextEventCity ?? "NGEN Studio, New York, NY";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
      {/* LEFT: fixed action sidebar */}
      <div className="lg:col-span-5 bg-[#111622] text-white p-8 lg:p-12 lg:fixed lg:w-[41.6%] lg:h-screen flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <ProgramStatus slug={program.slug} />
            <CategoryBadge type={record?.type} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
            Tactical Workshops
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-heading-events)] text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
            Building in Real Time
          </h1>
          <p className="mt-4 max-w-md text-slate-300">{program.pageBody}</p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img src={INSTRUCTOR.photo} alt={INSTRUCTOR.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading-events)] font-semibold">{INSTRUCTOR.name}</div>
              <div className="text-sm text-[var(--color-orange)]">{INSTRUCTOR.role}</div>
            </div>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">{INSTRUCTOR.bio}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">{cohort}</div>
          <div className="mt-1 text-sm text-slate-400">{location}</div>
          {record && <DeadlineBanner program={record} className="mt-2 text-[var(--color-orange)]" />}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ApplyOrEmpty program={program} label="Reserve Seat" className="text-center" />
            <ContactCta className="text-center" />
          </div>
        </div>
      </div>

      {/* RIGHT: scrollable canvas */}
      <div className="lg:col-start-6 lg:col-span-7 bg-[#FBFBFC] p-8 lg:p-16 space-y-16">
        <section>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
            Section A
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-heading-events)] text-2xl font-extrabold uppercase tracking-wider text-[#111622]">
            Overview &amp; Prerequisites
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111622]/60">What to Bring</h3>
              <ul className="mt-3 space-y-3">
                {PREREQUISITES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-orange)] text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-[#111622]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111622]/60">Software &amp; Tools</h3>
              <ul className="mt-3 space-y-3">
                {TOOLS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#111622]/20 text-xs font-bold text-[#111622]/60">
                      ·
                    </span>
                    <span className="text-sm leading-relaxed text-[#111622]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
            Section B
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-heading-events)] text-2xl font-extrabold uppercase tracking-wider text-[#111622]">
            The Curriculum Modules
          </h2>
          <div className="mt-6">
            <Accordion modules={MODULES} />
          </div>
        </section>

        <section>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
            Section C
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-heading-events)] text-2xl font-extrabold uppercase tracking-wider text-[#111622]">
            What You Will Leave With
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {GALLERY.map((item) => (
              <div key={item.label} className="overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
                  <img src={item.photo} alt={item.label} className="h-full w-full object-cover" />
                </div>
                <div className="p-3 text-sm font-semibold text-[#111622]">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {record && (
          <section>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Section D
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-heading-events)] text-2xl font-extrabold uppercase tracking-wider text-[#111622]">
              Who Should Attend
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <AudienceEligibility program={record} />
              <ProgramTimeline program={record} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
