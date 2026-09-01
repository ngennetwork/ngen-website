import {
  ApplyOrEmpty,
  AudienceEligibility,
  CategoryBadge,
  ClosingCta,
  ContactCta,
  ProgramStatus,
  ProgramTimeline,
} from "./shared";
import { formatDeadline, getProgramBySlug } from "@/content/programs";

const JUDGES = [
  {
    name: "Devon Marsh",
    role: "Investor",
    tag: "Honors Fund",
    bio: "Early-stage generalist focused on non-dilutive and pre-seed capital for student founders.",
    investments: "12 portfolio cos · 2 exits",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Nina Ohara",
    role: "Alumni Founder",
    tag: "Series A",
    bio: "Built and scaled a logistics startup through Series A before returning to back the next cohort.",
    investments: "5 angel checks",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Chris Boyle",
    role: "Partner",
    tag: "Seed Fund",
    bio: "Leads seed investments in campus-born startups across fintech and climate.",
    investments: "20+ deals led",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Yara Haddad",
    role: "Alumni Founder",
    tag: "Acquired",
    bio: "Founded and sold a consumer-health startup, now advises early founders on go-to-market.",
    investments: "8 advisory roles",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
];

const STAGES = [
  { label: "Stage 1", title: "Pitch Deck Screening", detail: "100+ Teams" },
  { label: "Stage 2", title: "Closed Semifinals", detail: "16 Teams" },
  { label: "Stage 3", title: "Live Main Stage Pitch", detail: "5 Finalists" },
  { label: "Stage 4", title: "Non-Dilutive Capital Award", detail: "$150k Awarded" },
];

const WINNERS = [
  {
    company: "Verdant Labs",
    logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?auto=format&fit=crop&w=200&q=80",
    year: "2025 Winner",
    raised: "$1.2M raised since",
    video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    company: "Northbeam",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80",
    year: "2024 Winner",
    raised: "$800K raised since",
    video: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
  {
    company: "Sable Health",
    logo: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=200&q=80",
    year: "2023 Winner",
    raised: "$2.4M raised since",
    video: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CompetitionsLayout({ program }) {
  const record = getProgramBySlug(program.slug);
  const deadline = formatDeadline(record?.closesAt);

  return (
    <div className="bg-white text-[var(--color-navy)]">
      {/* HERO */}
      <div className="relative border-b border-[var(--color-orange)]/15 bg-[#FFF6F1] py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_20%,rgba(247,80,0,0.08),transparent_45%)]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ProgramStatus slug={program.slug} />
              <CategoryBadge type={record?.type} />
            </div>

            <h1 className="mt-6 font-[family-name:var(--font-heading-events)] text-4xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-5xl">
              {program.title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text)]">
              {program.pageBody}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]/80">
              {record?.stats?.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[var(--color-navy)]/40">{stat.label}</dt>
                  <dd className="mt-1 text-base font-bold text-[var(--color-navy)]">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ApplyOrEmpty
                program={program}
                label="Apply to Pitch"
                className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)]"
              />
              <ContactCta />
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--color-orange)]/25 bg-white p-8 text-center shadow-lg">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Total Funding Pool
            </div>
            <div className="mt-4 font-[family-name:var(--font-heading-events)] text-6xl font-extrabold text-[var(--color-navy)] md:text-7xl">
              $150,000+
            </div>
            <div className="mt-3 text-sm text-[var(--color-navy)]/50">Non-Dilutive Capital · Honors Fund</div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[var(--color-orange)]/15 pt-6 text-left font-mono text-xs uppercase tracking-widest text-[var(--color-navy)]/50">
              <div>
                <div className="text-[var(--color-orange)]">Deadline</div>
                <div className="mt-1 text-[var(--color-navy)]">
                  {deadline ? deadline.replace("Closes ", "") : "Rolling"}
                </div>
              </div>
              <div>
                <div className="text-[var(--color-orange)]">Eligibility</div>
                <div className="mt-1 text-[var(--color-navy)]">{record?.eligibility}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BRACKET */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-[family-name:var(--font-heading-events)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
            The Competition Bracket
          </h2>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
            {STAGES.map((stage, i) => (
              <div key={stage.title} className="relative flex flex-1 items-center">
                <div className="w-full rounded-xl border border-black/10 bg-[#F8FAFC] p-6 shadow-sm transition-colors hover:border-[var(--color-orange)]/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-orange)]/30 bg-white font-mono text-sm font-bold text-[var(--color-orange)] shadow-sm">
                    {i + 1}
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-orange)]/70">
                    {stage.label}
                  </div>
                  <h3 className="mt-1 font-[family-name:var(--font-heading-events)] text-base font-semibold text-[var(--color-navy)]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-navy)]/50">{stage.detail}</p>
                </div>

                {i < STAGES.length - 1 && (
                  <div className="hidden h-px flex-1 shrink-0 bg-gradient-to-r from-[var(--color-orange)]/40 to-[var(--color-orange)]/10 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* JUDGES */}
      <div className="border-t border-black/5 bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-[family-name:var(--font-heading-events)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
            Investor Judges Leaderboard
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {JUDGES.map((judge) => (
              <div
                key={judge.name}
                className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4 shadow-sm transition-colors hover:border-[var(--color-orange)]/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
                <img
                  src={judge.photo}
                  alt={judge.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-orange)]/25"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-[family-name:var(--font-heading-events)] font-semibold text-[var(--color-navy)]">
                      {judge.name}
                    </div>
                    <span className="rounded border border-[var(--color-orange)]/25 bg-[var(--color-orange)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-orange)]">
                      {judge.tag}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--color-navy)]/50">{judge.role}</div>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-navy)]/40">{judge.bio}</p>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-orange)]/70">
                    {judge.investments}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WINNERS HALL OF FAME */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-[family-name:var(--font-heading-events)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
            Winners Hall of Fame
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WINNERS.map((winner) => (
              <div
                key={winner.company}
                className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-colors hover:border-[var(--color-orange)]/40"
              >
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
                  <img src={winner.video} alt={`${winner.company} pitch competition win`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-orange)]/50 bg-white/90 backdrop-blur-sm">
                      <div className="ml-0.5 h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-[var(--color-orange)]" />
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded border border-[var(--color-orange)]/25 bg-white/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-orange)]">
                    {winner.year}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- placeholder logo */}
                  <img src={winner.logo} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <div className="truncate font-[family-name:var(--font-heading-events)] font-semibold text-[var(--color-navy)]">
                      {winner.company}
                    </div>
                    <div className="text-sm text-[var(--color-orange)]/80">{winner.raised}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIENCE & TIMELINE */}
      {record && (
        <div className="border-t border-black/5 bg-[#F8FAFC] py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
            <AudienceEligibility program={record} />
            <ProgramTimeline program={record} />
          </div>
        </div>
      )}

      <ClosingCta program={program} />
    </div>
  );
}
