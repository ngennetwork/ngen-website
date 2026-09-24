"use client";

import { useSyncExternalStore } from "react";
import { universities } from "@/data/universities";

function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Random order, but with the (few) West-coast schools spread evenly
 * through the (many) East-coast ones rather than left where the draw
 * happened to put them — a plain shuffle regularly lands two or three
 * California logos in a row, which reads as a deliberate cluster.
 * Each side is shuffled independently, then the west list is dealt into
 * evenly spaced slots; the track is duplicated end to end, so the seam
 * counts as adjacency too and the last slot is left to an east school.
 */
function spreadShuffle(list) {
  const west = shuffle(list.filter((u) => u.region === "west"));
  const east = shuffle(list.filter((u) => u.region !== "west"));
  if (!west.length || !east.length) return shuffle(list);

  const out = [...east];
  // Insert back to front so earlier insertions don't shift later indices.
  const step = out.length / west.length;
  for (let i = west.length - 1; i >= 0; i--) {
    out.splice(Math.round(i * step), 0, west[i]);
  }
  return out;
}

let shuffledLogos;
const getShuffledLogos = () => (shuffledLogos ??= spreadShuffle(universities));
const getServerLogos = () => universities;
const subscribeNoop = () => () => {};

function LogoItem({ u }) {
  return (
    <div className="flex h-16 w-auto shrink-0 items-center justify-center px-2">
      {u.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed optical height, no benefit from Next's raster image optimizer
        <img
          src={u.logo}
          alt={`${u.name} logo`}
          className="w-auto max-h-full object-contain grayscale opacity-70 transition-all duration-200 hover:opacity-100 hover:grayscale-0"
          style={{ height: `${u.logoHeight ?? 48}px` }}
        />
      ) : (
        <p className="font-[family-name:var(--font-display)] text-sm font-bold text-text">{u.name}</p>
      )}
    </div>
  );
}

/**
 * Homepage university logo marquee — single-row auto-scrolling ticker of
 * the 15 universities NGEN has students involved from (not official
 * partnerships), replacing the honeycomb grid that used to live here
 * (see CommunitySection.jsx). Uses the marquee
 * keyframes/track classes defined in globals.css (already respects
 * prefers-reduced-motion) — the logo list is duplicated once so the
 * -50% translate loop is seamless.
 *
 * Logo order is reshuffled on every page load so no school is
 * permanently first, with the California schools kept spread apart
 * (see spreadShuffle). useSyncExternalStore renders the data file's
 * order on the server and during hydration (so the markup React
 * hydrates against always matches what the server sent), then swaps in
 * the shuffled order — cached so it stays stable across re-renders.
 */
export default function UniversityMarquee() {
  const logos = useSyncExternalStore(subscribeNoop, getShuffledLogos, getServerLogos);

  return (
    <div className="bg-bg py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-wider text-text md:text-3xl">
            15 Universities Represented
          </h2>
          <p className="mt-2 font-sans text-small font-semibold text-accent-ink">
            Innovative Students From
          </p>
        </div>

        {/* Edge fades are painted as overlay gradients rather than a CSS
            mask-image on the scroller: iOS Safari drops the whole masked
            layer when the masked element contains a transform animation,
            which left the logo row rendering as blank space on mobile. */}
        <div className="relative mt-12 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-8 md:gap-12">
            <div className="flex shrink-0 items-center gap-8 md:gap-12">
              {logos.map((u) => (
                <LogoItem key={`a-${u.name}`} u={u} />
              ))}
            </div>
            <div className="marquee-dup flex shrink-0 items-center gap-8 md:gap-12">
              {logos.map((u) => (
                <LogoItem key={`b-${u.name}`} u={u} />
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-bg to-transparent md:w-16"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg to-transparent md:w-16"
          />
        </div>
      </div>
    </div>
  );
}
