"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const LABELS = { bio: "Read bio", close: "Close" };

/**
 * Speaker portraits: the photo in NGEN's ink until you point at it, the
 * school tag on it, name and role below. The whole card opens a dialog
 * with the bio.
 *
 * layout "grid": a grid; pick `columns` so no card is left alone on the
 *   last row. `listOnPhones` sets each speaker as a row below `sm`, for
 *   odd counts that would strand a card in two columns.
 * layout "strip": a filmstrip that starts on the page's left edge, runs
 *   past the right margin and scrolls sideways (snap). The caller owns the
 *   scroll buttons: pass `stripRef` and call `nudgeStrip(stripRef, ±1)`.
 */
export function nudgeStrip(ref, dir) {
  const el = ref.current;
  if (!el) return;
  const card = el.querySelector("li");
  // One page of cards at a time: as many as fit between the margins.
  const by = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
  const perPage = Math.max(1, Math.round((el.clientWidth + 20) / by));
  el.scrollBy({ left: dir * by * perPage, behavior: "smooth" });
}

export default function SpeakerGrid({ items, layout = "grid", columns = "grid-cols-2 lg:grid-cols-4", listOnPhones = false, stripRef }) {
  const dialog = useRef(null);
  const [current, setCurrent] = useState(null);

  function open(speaker) {
    setCurrent(speaker);
    dialog.current?.showModal();
  }

  const isStrip = layout === "strip";

  const cards = items.map((speaker) => (
    <li
      key={speaker.name}
      className={isStrip ? "w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]" : ""}
    >
      <button
        type="button"
        onClick={() => open(speaker)}
        aria-haspopup="dialog"
        className={`group w-full gap-4 text-left ${
          listOnPhones ? "grid grid-cols-[6.5rem_1fr] items-center sm:flex sm:flex-col sm:items-stretch" : "flex flex-col"
        }`}
      >
        <Portrait
          speaker={speaker}
          sizes={isStrip ? "340px" : "(min-width: 1024px) 300px, 45vw"}
          tagClass={listOnPhones ? "max-sm:hidden" : ""}
          frame={isStrip ? "aspect-[6/7] max-h-[36svh]" : "aspect-[4/5]"}
        />
        <span className="flex flex-col gap-1">
          <span className="font-display text-[1.625rem] leading-tight tracking-[-0.025em]">{speaker.name}</span>
          <span className="text-small text-slate">{speaker.roles[0]}</span>
          {listOnPhones && speaker.affiliation && <span className="text-small text-slate sm:hidden">{speaker.affiliation}</span>}
          <span className="mt-1 text-small underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
            {LABELS.bio}
          </span>
        </span>
      </button>
    </li>
  ));

  return (
    <>
      {isStrip ? (
        <ul
          ref={stripRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards}
        </ul>
      ) : (
        <ul className={`grid gap-x-5 ${listOnPhones ? "gap-y-6 max-sm:grid-cols-1 sm:gap-y-10" : "gap-y-10"} ${columns}`}>{cards}</ul>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="speaker-dialog-name"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="speaker-dialog m-auto w-[min(56rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink-night/60 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <Portrait speaker={current} sizes="(min-width: 768px) 420px, 100vw" still />
            <div className="flex flex-col gap-5 p-7 md:p-10">
              {current.affiliation && <span className="self-start rounded-full bg-ink/6 px-3 py-1 text-small">{current.affiliation}</span>}
              <div>
                <h3 id="speaker-dialog-name" className="font-display text-h2">
                  {current.name}
                </h3>
                <p className="mt-2 text-small text-slate">
                  {current.roles.map((role) => (
                    <span key={role} className="block">
                      {role}
                    </span>
                  ))}
                </p>
              </div>
              <p className="text-base leading-relaxed text-slate">{current.bio}</p>
              <form method="dialog" className="mt-auto pt-2">
                <button className="btn btn-ghost">{LABELS.close}</button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export function Chevron({ dir }) {
  return (
    <svg aria-hidden="true" width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }}>
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// frame: the strip uses a squarer crop, capped by the screen's height, so a
// row of cards and its header fit one screen on a short laptop too.
function Portrait({ speaker, sizes, still = false, tagClass = "", frame = "aspect-[4/5]" }) {
  const initials = speaker.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <span className={`relative block ${frame} w-full overflow-hidden ${still ? "bg-fog max-md:aspect-[5/4]" : "duo rounded-xl"}`}>
      {speaker.headshot ? (
        <Image
          src={speaker.headshot.src}
          alt={still ? speaker.name : ""}
          fill
          sizes={sizes}
          className={`object-cover ${still ? "" : "group-hover:scale-[1.03]"}`}
          style={{ objectPosition: speaker.headshot.position ?? "center top" }}
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-[4.5rem] text-ink/25">
          {initials}
        </span>
      )}
      {!still && speaker.affiliation && (
        <span className={`absolute bottom-3 left-3 z-[2] rounded-full bg-paper/90 px-3 py-1 text-small backdrop-blur ${tagClass}`}>
          {speaker.affiliation}
        </span>
      )}
    </span>
  );
}
