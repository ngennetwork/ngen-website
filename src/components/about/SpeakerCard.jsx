"use client";

import { useState } from "react";

/**
 * One "Previous Speakers" card. Collapsed shows name + title on a plain
 * neutral panel; expands on hover (desktop) or click (works on touch too,
 * since a tap fires a click) to reveal the bio. Colored panelColor
 * backgrounds retired in favor of the house neutral card language.
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
        <p className="font-sans font-extrabold text-text">{speaker.name}</p>
        <p className="text-small text-text-muted">{speaker.title}</p>
        <div
          className={`grid transition-all duration-300 ${
            expanded ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <p className="overflow-hidden text-small leading-relaxed text-text-muted">{speaker.bio}</p>
        </div>
      </button>
    </div>
  );
}
