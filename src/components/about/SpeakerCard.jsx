"use client";

import { useState } from "react";

/**
 * One "Previous Speakers" card. Collapsed shows name + title on a plain
 * neutral panel; expands on hover (desktop) or click (works on touch too,
 * since a tap fires a click) to reveal the bio. Colored panelColor
 * backgrounds retired in favor of the house neutral card language.
 *
 * Touch devices never fire the hover reveal, so the chevron below is the
 * only cue that there's a bio to open — and the collapse has to actually
 * collapse there (see the max-height note inline).
 */
export default function SpeakerCard({ speaker }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const expanded = clicked || hovered;

  return (
    <div
      className="group overflow-hidden rounded-xl border border-neutral-200 bg-surface-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- placeholder headshot, swapped for real photo later */}
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            objectPosition: speaker.photoPosition || undefined,
            transform: speaker.photoScale ? `scale(${speaker.photoScale})` : undefined,
          }}
        />
      </div>
      <button
        type="button"
        className="w-full border-t border-neutral-200 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
        aria-expanded={expanded}
        onClick={() => setClicked((c) => !c)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-sans font-extrabold text-text">{speaker.name}</p>
            <p className="text-small text-text-muted">{speaker.title}</p>
          </div>
          {/* Tap affordance — without it there's no hint the bio exists on
              touch, where the hover reveal never fires. */}
          <svg
            className={`mt-1 shrink-0 text-text-muted transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            aria-hidden="true"
          >
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Collapsed with max-height rather than a 0fr grid row: Safari
            (iOS included) doesn't shrink an fr track below its content's
            height, so the old version left a bio-sized blank gap under
            every name on mobile. */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-small leading-relaxed text-text-muted">{speaker.bio}</p>
        </div>
      </button>
    </div>
  );
}
