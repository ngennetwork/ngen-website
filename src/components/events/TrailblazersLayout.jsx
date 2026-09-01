import {
  ApplyOrEmpty,
  AudienceEligibility,
  CategoryBadge,
  ClosingCta,
  ContactCta,
  DeadlineBanner,
  PhotoBand,
  ProgramStatus,
  ProgramTimeline,
  SectionHeading,
} from "./shared";
import { getProgramBySlug } from "@/content/programs";

const BADGES = ["📍 New York City", "⚡ Flagship Conference", "🎟️ Application Required"];

const PILLARS = [
  {
    title: "Keynote Panels & Firesides",
    body: "Hear directly from operators and investors who've built and backed category-defining companies.",
  },
  {
    title: "Investor Office Hours",
    body: "Turn hallway conversations into mentors, advisers, and first checks.",
  },
  {
    title: "Peer Network",
    body: "Build lifelong relationships with the sharpest student founders across our university network.",
  },
];

const SPEAKERS = [
  {
    name: "Alex Rivera",
    role: "Partner @ Sequoia",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Founder @ Stealth",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Marcus Vance",
    role: "VP @ Founders Fund",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Elena Rostova",
    role: "GP @ Benchmark",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
];

const AGENDA = [
  { time: "9:00 AM", title: "Doors Open" },
  { time: "10:30 AM", title: "Operator Panel" },
  { time: "1:00 PM", title: "VC Office Hours" },
  { time: "5:00 PM", title: "Networking Mixer" },
];

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";

const GALLERY_1 =
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80";
const GALLERY_2 =
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=80";

export default function TrailblazersLayout({ program }) {
  const raw = getProgramBySlug(program.slug);
  const metrics = raw?.stats ?? [];

  return (
    <div className="bg-[#F2F5FB]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <ProgramStatus slug={program.slug} />
              <CategoryBadge type={raw?.type} />
            </div>
            <div className="flex flex-wrap gap-2 md:justify-start">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[var(--color-navy)]/15 bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-navy)]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-[family-name:var(--font-heading-events)] text-3xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-4xl">
              {program.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text)]">{program.pageBody}</p>

            {raw && <DeadlineBanner program={raw} className="mt-4" />}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ApplyOrEmpty program={program} label={program.ctaLabel} />
              <ContactCta />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
          <img
            src={HERO_PHOTO}
            alt="Trailblazers Conference attendees networking"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="font-[family-name:var(--font-heading-events)] text-4xl font-extrabold text-[var(--color-navy)]">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-[var(--color-text)]">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <PhotoBand src={GALLERY_1} alt="Trailblazers Conference attendees during a panel session" />
        </div>

        <SectionHeading fontClassName="font-[family-name:var(--font-heading-events)] font-semibold">
          What to Expect
        </SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-[var(--color-navy)]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-[family-name:var(--font-heading-events)] text-lg font-semibold text-[var(--color-navy)]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">{pillar.body}</p>
            </div>
          ))}
        </div>

        <SectionHeading fontClassName="font-[family-name:var(--font-heading-events)] font-semibold">
          1-Day Conference Agenda
        </SectionHeading>
        <div className="mx-auto mt-8 max-w-2xl space-y-4">
          {AGENDA.map((item) => (
            <div
              key={item.time}
              className="flex items-center gap-5 rounded-xl border border-[var(--color-navy)]/10 bg-white p-5 shadow-sm"
            >
              <div className="w-24 shrink-0 font-[family-name:var(--font-heading-events)] text-sm font-bold text-[var(--color-orange)]">
                {item.time}
              </div>
              <div className="font-[family-name:var(--font-heading-events)] font-semibold text-[var(--color-navy)]">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <PhotoBand src={GALLERY_2} alt="Founders and speakers networking at Trailblazers Conference" />
        </div>

        <SectionHeading fontClassName="font-[family-name:var(--font-heading-events)] font-semibold">
          Past Speakers{" "}
          <span className="font-[family-name:var(--font-display)] font-[640]">
            &amp;
          </span>{" "}
          Guests
        </SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {SPEAKERS.map((speaker) => (
            <div key={speaker.name} className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <div className="mt-3 font-[family-name:var(--font-heading-events)] font-semibold text-[var(--color-navy)]">
                {speaker.name}
              </div>
              <div className="text-sm text-[var(--color-text)]">{speaker.role}</div>
            </div>
          ))}
        </div>

        {raw && (
          <>
            <SectionHeading fontClassName="font-[family-name:var(--font-heading-events)] font-semibold">
              Who Should Apply
            </SectionHeading>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
              <AudienceEligibility program={raw} />
              <ProgramTimeline program={raw} />
            </div>
          </>
        )}
      </div>

      <ClosingCta program={program} />
    </div>
  );
}
