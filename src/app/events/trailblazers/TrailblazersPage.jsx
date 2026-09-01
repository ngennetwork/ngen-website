import Link from "next/link";
import { getProgramBySlug } from "@/content/programs";

const BADGES = ["📍 New York City", "⚡ Flagship Conference", "🎟️ Application Required"];

const METRICS = [
  { value: "200+", label: "Top Student Founders" },
  { value: "50+", label: "Active VCs & Angels" },
  { value: "100%", label: "Free for Accepted Attendees" },
];

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
    role: "Partner",
    company: "Sequoia",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "Stealth",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Marcus Vance",
    role: "VP",
    company: "Founders Fund",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Elena Rostova",
    role: "GP",
    company: "Benchmark",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
];

const AGENDA = [
  { time: "9:00 AM", title: "Doors Open & Check-In", body: "Badge pickup, coffee, and early networking as the venue opens." },
  { time: "10:30 AM", title: "Operator Panel", body: "Founders and operators share hard-won lessons from building category-defining companies." },
  { time: "1:00 PM", title: "VC Office Hours", body: "Book 1:1 time with active investors for direct feedback on your pitch." },
  { time: "3:00 PM", title: "Founder Firesides", body: "Intimate, candid conversations with founders on the record." },
  { time: "5:00 PM", title: "Networking Mixer", body: "Meet peers, mentors, and investors across the NGEN network." },
  { time: "7:00 PM", title: "Closing Remarks", body: "A recap of the day and a look ahead to what's next." },
];

const APPLY_HREF = getProgramBySlug("trailblazers").applicationUrl;

export default function TrailblazersPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.08] bg-[#0B0F17] px-4 py-24 text-white">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-orange-500/15 via-orange-500/5 to-transparent blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="mt-6 bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-center font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
            Trailblazers Conferences
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-normal leading-relaxed text-slate-300 md:text-xl">
            NGEN&apos;s flagship gathering bringing together top student founders, operators, and venture investors
            in NYC.
          </p>

          <div className="mt-8 text-center">
            <Link
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-100 rounded-full bg-[#F26522] px-8 py-3.5 font-[family-name:var(--font-display)] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:bg-[#d85416]"
            >
              Apply to Attend
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-6 text-center">
              {METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="text-4xl font-black tracking-tight text-white">{metric.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bento photo mosaic */}
      <div className="relative border-t border-slate-200/80 bg-[#FCFCFD] py-24">
        <div className="mx-auto max-w-6xl px-4">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-600 shadow-sm">
            01 / Gallery
          </span>
          <h2 className="mt-4 text-left font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] md:text-4xl">
            Inside the Conference
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
            <img
              src={GALLERY[0]}
              alt="Trailblazers Conference attendees networking during the event"
              className="h-[450px] w-full rounded-2xl border border-slate-900/10 object-cover shadow-[0_12px_30px_rgb(0,0,0,0.08)] md:col-span-2"
            />
            <div className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img
                src={GALLERY[1]}
                alt="Founders and investors talking during a Trailblazers session"
                className="h-[215px] w-full rounded-2xl border border-slate-900/10 object-cover shadow-sm"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img
                src={GALLERY[2]}
                alt="Trailblazers Conference audience during a keynote panel"
                className="h-[215px] w-full rounded-2xl border border-slate-900/10 object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Value pillars */}
        <h2 className="text-center font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
          What to Expect
        </h2>
        <div className="mt-8 grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} className="p-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-sm font-bold text-orange-600">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Agenda */}
        <h2 className="mt-20 text-center font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
          1-Day Agenda
        </h2>
        <div className="mx-auto mt-10 max-w-3xl">
          {AGENDA.map((item, i) => (
            <div key={item.time} className="relative flex gap-6 border-l-2 border-slate-200 pb-10 pl-8 last:pb-0">
              <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[#F26522] bg-white" />
              <div className="shrink-0 rounded-full bg-slate-900 px-3 py-1 font-mono text-xs font-semibold text-white">
                {item.time}
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
                  {item.title}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Past speakers */}
        <h2 className="mt-20 text-center font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-wider text-[var(--color-navy)] md:text-2xl">
          Past Speakers{" "}
          <span className="font-[family-name:var(--font-display)] font-[640]">&amp;</span> Guests
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.name}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                {speaker.name}
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-500">
                {speaker.role} @ {speaker.company}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="px-4 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F17] p-12 text-center text-white shadow-2xl">
          <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-gradient-to-b from-orange-500/15 via-orange-500/5 to-transparent blur-3xl" />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-wider md:text-3xl">
              Ready to join the network?
            </h2>
            <div className="mt-8">
              <Link
                href={APPLY_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block scale-100 rounded-full bg-[#F26522] px-8 py-3.5 font-[family-name:var(--font-display)] font-semibold text-white shadow-lg shadow-orange-500/20 ring-4 ring-orange-500/0 transition-all hover:scale-105 hover:bg-[#d85416] hover:ring-orange-500/20"
              >
                Apply to Attend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
