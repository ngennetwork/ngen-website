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

const CITIES = {
  nyc: {
    label: "New York City",
    coords: "40.7128° N, 74.0060° W",
    polaroids: [
      {
        caption: "MIDTOWN · 09:14",
        photo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "FLATIRON · 12:40",
        photo: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "SOHO · 17:55",
        photo: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  sf: {
    label: "San Francisco",
    coords: "37.7749° N, 122.4194° W",
    polaroids: [
      {
        caption: "SOMA · 09:14",
        photo: "https://images.unsplash.com/photo-1521464302861-ce943915d1c3?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "SAND HILL · 12:40",
        photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "FERRY BLDG · 17:55",
        photo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  london: {
    label: "London",
    coords: "51.5072° N, 0.1276° W",
    polaroids: [
      {
        caption: "SHOREDITCH · 09:14",
        photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "CITY OF LONDON · 12:40",
        photo: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=400&q=80",
      },
      {
        caption: "KING'S CROSS · 17:55",
        photo: "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
};

const ITINERARY = [
  {
    step: "01",
    depart: "09:00",
    arrive: "10:15",
    firm: "Sequoia Capital",
    gate: "GATE A1",
    body: "Kick off the day with a warm intro and a first round of office visits.",
  },
  {
    step: "02",
    depart: "12:00",
    arrive: "13:30",
    firm: "Stripe",
    gate: "GATE B3",
    body: "Lunch meeting with the second stop, keeping the conversation going over food.",
  },
  {
    step: "03",
    depart: "15:00",
    arrive: "16:15",
    firm: "Andreessen Horowitz",
    gate: "GATE C2",
    body: "An afternoon session with the third firm on the day's docket.",
  },
  {
    step: "04",
    depart: "17:30",
    arrive: "19:00",
    firm: "Founders Fund",
    gate: "GATE D4",
    body: "Wind down the trek with drinks and informal conversation with hosts and alumni.",
  },
];

const HOST_FIRMS = ["Sequoia", "Stripe", "OpenAI", "Andreessen Horowitz", "Benchmark", "Founders Fund"];

export default function TreksLayout({ program }) {
  const raw = getProgramBySlug(program.slug);
  const [cityKey, setCityKey] = useState("nyc");
  const city = CITIES[cityKey];

  return (
    <div className="bg-white">
      {/* BLUEPRINT LIGHT HERO */}
      <div className="relative overflow-hidden bg-[#F4F7FB] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] py-24 text-[var(--color-navy)] [background-size:24px_24px]">
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <ProgramStatus slug={program.slug} />
            <CategoryBadge type={raw?.type} />
          </div>
          <div role="group" aria-label="Select a city" className="flex flex-wrap justify-center gap-2">
            {Object.entries(CITIES).map(([key, c]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCityKey(key)}
                aria-pressed={cityKey === key}
                className={`rounded-full border px-5 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors ${
                  cityKey === key
                    ? "border-emerald-600 bg-emerald-600/10 text-emerald-700"
                    : "border-[var(--color-navy)]/15 bg-white text-[var(--color-navy)]/50 hover:border-[var(--color-navy)]/30 hover:text-[var(--color-navy)]/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <h1 className="mt-10 font-[family-name:var(--font-heading-events)] text-5xl font-black uppercase tracking-wider text-[var(--color-navy)] md:text-7xl">
            {program.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text)]">{program.pageBody}</p>

          <div className="mt-6 font-mono text-sm text-[var(--color-navy)]/50">
            <span className="mr-2 inline-block h-3 w-3 animate-ping rounded-full bg-emerald-500 align-middle" />
            {city.label.toUpperCase()} · {city.coords}
          </div>

          {raw && (
            <div className="mt-4 flex justify-center">
              <DeadlineBanner program={raw} />
            </div>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ApplyOrEmpty program={program} label={program.ctaLabel} />
            <ContactCta />
          </div>

          {raw && (
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 text-left sm:grid-cols-2">
              <AudienceEligibility program={raw} />
              <ProgramTimeline program={raw} />
            </div>
          )}
        </div>

        {/* POLAROID STACK GALLERY */}
        <div className="mt-16 flex flex-wrap justify-center gap-y-10 py-8 md:flex-nowrap md:-space-x-8">
          {city.polaroids.map((p, i) => (
            <div
              key={p.caption}
              className={`w-64 rotate-[-4deg] rounded-sm border border-black/5 bg-white p-3 font-mono text-xs text-slate-900 shadow-xl transition-transform duration-300 hover:z-10 hover:rotate-0 ${
                i % 2 === 1 ? "rotate-[4deg]" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo */}
              <img src={p.photo} alt={`${city.label} street scene`} className="aspect-square w-full object-cover" />
              <div className="mt-2 text-center uppercase tracking-wide">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HORIZONTAL SCROLLING ITINERARY RAIL */}
      <div className="border-y border-black/5 bg-[#EDF1F7] py-16">
        <h2 className="px-6 text-center font-[family-name:var(--font-heading-events)] text-xl font-extrabold uppercase tracking-widest text-[var(--color-navy)] md:text-2xl">
          The 1-Day VC Hop Route
        </h2>

        <div className="mt-10 flex snap-x gap-6 overflow-x-auto px-6 pb-6">
          {ITINERARY.map((leg) => (
            <div
              key={leg.step}
              className="relative min-w-[320px] snap-center rounded-2xl border border-[var(--color-navy)]/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-emerald-600">
                <span>Boarding Pass</span>
                <span>{leg.gate}</span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[var(--color-navy)]/40">Depart</div>
                  <div className="font-mono text-lg font-bold text-[var(--color-navy)]">{leg.depart}</div>
                </div>
                <div className="mx-3 flex-1 border-t border-dashed border-[var(--color-navy)]/20" />
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-[var(--color-navy)]/40">Arrive</div>
                  <div className="font-mono text-lg font-bold text-[var(--color-navy)]">{leg.arrive}</div>
                </div>
              </div>

              <div className="mt-5 inline-block rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                {leg.firm}
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-heading-events)] text-base font-semibold uppercase tracking-wide text-[var(--color-navy)]">
                Stop {leg.step}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">{leg.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOST FIRM GRID */}
      <div className="bg-white py-20">
        <h2 className="text-center font-[family-name:var(--font-heading-events)] text-xl font-extrabold uppercase tracking-widest text-[var(--color-navy)] md:text-2xl">
          Hosted By
        </h2>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 sm:grid-cols-3">
          {HOST_FIRMS.map((firm) => (
            <div
              key={firm}
              className="flex items-center justify-center bg-white px-6 py-10 font-[family-name:var(--font-heading-events)] text-sm font-semibold uppercase tracking-wide text-[var(--color-navy)]/50 transition-colors hover:text-emerald-600"
            >
              {firm}
            </div>
          ))}
        </div>
      </div>

      <ClosingCta program={program} />
    </div>
  );
}
