"use client";

import { useEffect, useRef, useState } from "react";
import UniversityLogo from "@/components/brand/UniversityLogo";
import { RANGE_NARROW, RANGE_WIDE } from "./range-geometry";

const pct = (n) => `${(n * 100).toFixed(3)}%`;

/**
 * The home hero's landscape: NGEN's mountain as a range of campuses. Point
 * at a summit (or tap it) and that school's official logo rises above it.
 *
 * Once, after the ridge has drawn itself, a roll call walks the eight Ivy
 * summits so the gesture explains itself; the first touch of the range, or
 * a preference for reduced motion, cancels it.
 */
export default function IvyRange() {
  const [active, setActive] = useState(null);
  const userTook = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ivies = RANGE_WIDE.schools.filter((s) => s.ivy).map((s) => s.file);
    const timers = [];
    let i = 0;
    const tick = () => {
      if (userTook.current) return;
      if (i < ivies.length) {
        setActive(ivies[i++]);
        timers.push(setTimeout(tick, 640));
      } else {
        setActive(null);
      }
    };
    timers.push(setTimeout(tick, 3100));
    return () => timers.forEach(clearTimeout);
  }, []);

  const take = (file) => {
    userTook.current = true;
    setActive(file);
  };

  const shared = { active, take, release: () => setActive(null) };

  return (
    <div className="ivy-range relative md:flex md:flex-1 md:flex-col">
      <Range geo={RANGE_WIDE} className="hidden md:flex md:flex-1 md:flex-col md:justify-end" {...shared} />
      <Range geo={RANGE_NARROW} className="md:hidden" narrow {...shared} />
    </div>
  );
}

function Range({ geo, className, narrow = false, active, take, release }) {
  const { W, H, schools } = geo;
  const step = (schools[1].x - schools[0].x) / W;
  const current = schools.find((s) => s.file === active);

  return (
    <div className={className}>
      {/* Wide: the ridge grows into the height the hero copy leaves (never
          under 12rem, never over 30rem; past that the sky takes the rest). */}
      <div className={`relative ${narrow ? "h-[clamp(9rem,22svh,12rem)]" : "max-h-[30rem] min-h-[12rem] flex-1"}`} onPointerLeave={release}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <path d={geo.backFill} className="range-back-fill" />
          <path d={geo.back} pathLength="1" className="range-line range-back" />
          <path d={geo.fill} className="range-fill" />
          <path d={geo.trail} className="range-trail" />
          <path d={geo.ridge} pathLength="1" className="range-line range-ridge" />
          {geo.segments.map((d, i) => (
            <path key={schools[i].file} d={d} className="range-line range-seg" data-on={active === schools[i].file ? "" : undefined} />
          ))}
        </svg>

        {schools.map((s) => (
          <span
            key={s.file}
            aria-hidden="true"
            className="range-node"
            data-ivy={s.ivy ? "" : undefined}
            data-on={active === s.file ? "" : undefined}
            style={{ left: pct(s.x / W), top: pct(s.y / H), "--at": `${(0.35 + (s.x / W) * 2.1).toFixed(2)}s` }}
          />
        ))}

        {schools.map((s) => {
          const at = s.x / W;
          // Near the edges the card leans inward so it never leaves the screen.
          const edge = narrow ? 0.26 : 0.09;
          const anchor = at < edge ? "-18%" : at > 1 - edge ? "-82%" : "-50%";
          return (
            <div
              key={s.file}
              aria-hidden="true"
              className="range-card"
              data-on={active === s.file ? "" : undefined}
              style={{ left: pct(at), top: pct(s.y / H), "--anchor": anchor }}
            >
              <span className="flex items-center justify-center rounded-xl bg-paper px-5 py-3.5 shadow-[0_18px_40px_-18px_rgb(21_39_71/0.45),0_0_0_1px_rgb(30_52_96/0.06)] [--logo-scale:0.78]">
                <UniversityLogo university={s} />
              </span>
              <span className="mx-auto block h-4 w-px bg-ink/35" style={{ marginLeft: `calc(${anchor.replace("-", "")} - 0.5px)` }} />
            </div>
          );
        })}

        {/* Hit areas: one column per summit */}
        {schools.map((s) => (
          <span
            key={s.file}
            aria-hidden="true"
            className="absolute inset-y-0 cursor-default"
            style={{ left: pct(s.x / W - step / 2), width: pct(step) }}
            onPointerEnter={(e) => e.pointerType === "mouse" && take(s.file)}
            onPointerDown={() => take(s.file)}
          />
        ))}
      </div>

      {/* The names, on the ground the range stands on */}
      <div className="relative bg-fog">
        {narrow ? (
          <p className="h-12 pt-2 text-center text-small font-medium text-ink" aria-live="polite">
            {current ? current.name : <span className="text-slate">Tap a summit</span>}
          </p>
        ) : (
          <ul aria-label="Universities NGEN’s student founders come from" className="relative h-12">
            {schools.map((s) => (
              <li
                key={s.file}
                className={`absolute top-2 -translate-x-1/2 whitespace-nowrap transition-colors duration-300 ${
                  s.ivy ? "text-small font-medium" : "text-[0.875rem] max-xl:sr-only"
                } ${active === s.file ? "text-ink" : s.ivy ? "text-ink/80" : "text-slate"}`}
                style={{ left: pct(s.x / W) }}
              >
                {s.short ? <abbr title={s.name} className="no-underline">{s.short}</abbr> : s.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
