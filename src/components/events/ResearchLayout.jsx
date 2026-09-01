"use client";

import { useState } from "react";
import {
  ApplyOrEmpty,
  AudienceEligibility,
  CategoryBadge,
  ClosingCta,
  ContactCta,
  DeadlineBanner,
  ProgramStatus,
  ProgramTimeline,
} from "./shared";
import { getProgramBySlug } from "@/content/programs";

const KEY_DATES = [
  { label: "Abstract Submission", value: "MAR 02, 2026" },
  { label: "Notification", value: "MAR 30, 2026" },
  { label: "Registration Closes", value: "APR 20, 2026" },
  { label: "Symposium Date", value: "MAY 14, 2026" },
];

const TRACKS = [
  {
    id: "ai-systems",
    code: "TRK.01",
    title: "AI & Systems",
    lead: "Dr. Priya Nair, Dr. James Okafor",
    abstract:
      "Foundation models and machine learning infrastructure built for production-scale research. This track examines the transition from academic model architectures to systems engineered for reliability, cost, and deployment at scale, spanning inference optimization, distributed training, and applied ML for scientific discovery.",
  },
  {
    id: "biotech-synbio",
    code: "TRK.02",
    title: "BioTech & SynBio",
    lead: "Dr. Lena Marsh, Dr. Ravi Deshpande",
    abstract:
      "Synthetic and computational biology moving from bench to translational company. Sessions cover programmable biology, therapeutic discovery pipelines, and the regulatory and commercial pathways that determine which lab breakthroughs survive contact with the market.",
  },
  {
    id: "quantum-hardware",
    code: "TRK.03",
    title: "Quantum & Hardware",
    lead: "Dr. Ravi Deshpande, Dr. Priya Nair",
    abstract:
      "Materials science, energy systems, and quantum hardware built on years of deep technical work. This track focuses on ventures where the physics is the moat: device fabrication, error correction, and the capital structures required to fund multi-year hardware roadmaps.",
  },
];

const POSTERS = [
  {
    lab: "MIT CSAIL",
    title: "Sparse Attention Mechanisms for Long-Context Scientific Retrieval",
    presenter: "Dr. James Okafor",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    lab: "Stanford AI Lab",
    title: "Self-Supervised Representation Learning for Protein Folding Prediction",
    presenter: "Dr. Priya Nair",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    lab: "Berkeley BioE",
    title: "Programmable Gene Circuits for Scalable Cell Therapy Manufacturing",
    presenter: "Dr. Lena Marsh",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    lab: "Harvard SEAS",
    title: "Error-Corrected Qubit Arrays: A Path to Fault-Tolerant Compute",
    presenter: "Dr. Ravi Deshpande",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
];

const AGENDA = [
  { time: "08:30", title: "Registration & Coffee", room: "Atrium", speaker: "" },
  { time: "09:15", title: "Opening Remarks", room: "Main Hall", speaker: "NGen Network" },
  { time: "10:00", title: "AI & Systems: Track Session", room: "Room A", speaker: "Dr. Priya Nair" },
  { time: "11:30", title: "BioTech & SynBio: Track Session", room: "Room B", speaker: "Dr. Lena Marsh" },
  { time: "13:00", title: "Poster Session & Technical Demos", room: "Exhibit Hall", speaker: "All Presenters" },
  { time: "14:30", title: "Quantum & Hardware: Track Session", room: "Room C", speaker: "Dr. Ravi Deshpande" },
  { time: "16:00", title: "Lab-to-Market Investor Office Hours", room: "Room D", speaker: "Venture Partners" },
  { time: "17:30", title: "Closing Keynote", room: "Main Hall", speaker: "Dr. James Okafor" },
];

export default function ResearchLayout({ program }) {
  const raw = getProgramBySlug(program.slug);
  const [activeTrack, setActiveTrack] = useState(TRACKS[0].id);
  const track = TRACKS.find((t) => t.id === activeTrack) ?? TRACKS[0];

  return (
    <div className="bg-white">
      {/* 1. Light paper hero */}
      <div className="border-b border-slate-200 bg-white pt-20 pb-12 text-slate-950">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
            PAGE_ID // SYMPOSIUM_2026
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <ProgramStatus slug={program.slug} />
            <CategoryBadge type={raw?.type} />
          </div>
          <h1 className="mb-6 font-serif text-5xl tracking-tight text-slate-900 md:text-6xl">
            {program.title || "Lab-to-Startup Conferences"}
          </h1>
          <p className="max-w-2xl border-l-2 border-slate-900 pl-6 text-lg text-slate-600">
            {program.pageBody}
          </p>
          {raw && <DeadlineBanner program={raw} className="mt-4" />}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ApplyOrEmpty program={program} label={program.ctaLabel} />
            <ContactCta />
          </div>
          {raw && (
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2">
              <AudienceEligibility program={raw} />
              <ProgramTimeline program={raw} />
            </div>
          )}
        </div>
      </div>

      {/* 2. Sticky sidebar + track navigation */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12">
        {/* Left sticky column */}
        <div className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                Research Tracks
              </div>
              <ul role="tablist" aria-label="Research tracks" className="divide-y divide-slate-200 border-y border-slate-200">
                {TRACKS.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`track-tab-${t.id}`}
                      aria-selected={activeTrack === t.id}
                      aria-controls="track-panel"
                      onClick={() => setActiveTrack(t.id)}
                      className={`flex w-full items-center gap-3 border-l-2 py-4 pl-4 pr-2 text-left transition-colors ${
                        activeTrack === t.id
                          ? "border-slate-900 bg-slate-50"
                          : "border-transparent hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-mono text-xs text-slate-400">{t.code}</span>
                      <span
                        className={`text-sm font-medium ${
                          activeTrack === t.id ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {t.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-xs">
              <div className="mb-3 uppercase tracking-widest text-slate-500">Key Dates</div>
              {KEY_DATES.map((d) => (
                <div key={d.label} className="flex items-center justify-between gap-4 py-1">
                  <span className="text-slate-500">{d.label}</span>
                  <span className="text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right main content column */}
        <div className="lg:col-span-8">
          <article
            id="track-panel"
            role="tabpanel"
            aria-labelledby={`track-tab-${track.id}`}
            className="border-t border-slate-200 pt-8"
          >
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              {track.code}
            </div>
            <h2 className="text-3xl font-serif tracking-tight text-slate-900">{track.title}</h2>
            <div className="mt-3 text-sm text-slate-500">
              Lead Researchers: <span className="text-slate-700">{track.lead}</span>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">{track.abstract}</p>
            <div className="mt-6 flex gap-4 font-mono text-xs uppercase tracking-widest">
              <span className="border-b border-slate-300 text-slate-500">View Paper (PDF), coming soon</span>
              <span className="border-b border-slate-200 text-slate-400">Abstract Archive, coming soon</span>
            </div>
          </article>
        </div>
      </div>

      {/* 3. Research poster exhibition */}
      <div className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 font-mono text-xs uppercase tracking-widest text-slate-500">
            Poster Exhibition
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {POSTERS.map((p) => (
              <div key={p.title} className="rounded-lg border border-slate-200 bg-white p-6 font-sans">
                <span className="inline-block rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">
                  {p.lab}
                </span>
                <h3 className="mt-4 text-lg font-serif leading-snug text-slate-900">{p.title}</h3>
                <div className="mt-4 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
                  <img src={p.photo} alt={p.presenter} className="h-9 w-9 rounded-full object-cover" />
                  <span className="text-sm text-slate-600">{p.presenter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Agenda table */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 font-mono text-xs uppercase tracking-widest text-slate-500">Agenda</div>
        <div className="overflow-x-auto border border-slate-200">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-mono text-xs uppercase tracking-widest text-slate-500">
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Session Title</th>
                <th className="px-4 py-3 font-medium">Room / Stage</th>
                <th className="px-4 py-3 font-medium">Speaker</th>
              </tr>
            </thead>
            <tbody>
              {AGENDA.map((row) => (
                <tr key={row.time} className="border-b border-slate-200 last:border-0">
                  <td className="px-4 py-3 font-mono text-slate-500">{row.time}</td>
                  <td className="px-4 py-3 text-slate-900">{row.title}</td>
                  <td className="px-4 py-3 text-slate-600">{row.room}</td>
                  <td className="px-4 py-3 text-slate-600">{row.speaker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClosingCta program={program} />
    </div>
  );
}
