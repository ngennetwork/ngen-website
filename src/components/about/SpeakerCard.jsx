"use client";

import { useId, useState, useSyncExternalStore } from "react";

/**
 * One "Previous Speakers" card. Collapsed shows name + title on a plain
 * neutral panel; expands on hover (pointer devices) or click/tap to
 * reveal the bio. Colored panelColor backgrounds retired in favor of the
 * house neutral card language.
 *
 * Two things this has to get right for touch, both learned the hard way:
 *   - The bio lives *outside* the <button>, not inside it. A <button> may
 *     only contain phrasing content, and WebKit's button renderer ignores
 *     the overflow/max-height clip on block children — which left a
 *     bio-sized blank gap under every collapsed card on iOS.
 *   - Hover only counts on devices that actually hover. A tap in mobile
 *     Safari fires mouseenter and then leaves the element "hovered," so
 *     hover-driven expansion stuck open and the second tap couldn't
 *     close it.
 */
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHover(onChange) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getCanHover = () => window.matchMedia(HOVER_QUERY).matches;
const getServerCanHover = () => false;

export default function SpeakerCard({ speaker }) {
  const bioId = useId();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const canHover = useSyncExternalStore(subscribeHover, getCanHover, getServerCanHover);

  const expanded = clicked || (canHover && hovered);

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

      <div className="border-t border-neutral-200">
        <button
          type="button"
          className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
          aria-expanded={expanded}
          aria-controls={bioId}
          onClick={() => setClicked((c) => !c)}
        >
          <span>
            <span className="block font-sans font-extrabold text-text">{speaker.name}</span>
            <span className="block text-small text-text-muted">{speaker.title}</span>
          </span>
          {/* Tap affordance — without it there's no hint the bio exists on
              touch, where the hover reveal never fires. */}
          <span
            className={`mt-1 shrink-0 text-text-muted transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <div
          id={bioId}
          className={`overflow-hidden px-5 transition-all duration-300 ${
            expanded ? "max-h-96 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"
          }`}
        >
          <p className="text-small leading-relaxed text-text-muted">{speaker.bio}</p>
        </div>
      </div>
    </div>
  );
}
