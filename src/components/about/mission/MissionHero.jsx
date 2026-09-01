"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const TAGLINE_SENTENCES = [
  [
    { text: "NGEN is a 501(c)(3) intercollegiate entrepreneurship organization dedicated to connecting students across " },
    { text: "top universities", strong: true },
    { text: "." },
  ],
  [
    { text: "By bridging campus ecosystems, NGEN serves as the " },
    { text: "center of gravity for student innovation", strong: true },
    { text: "." },
  ],
];

// Shared between the JSX's default inline styles (below, so the very
// first server-rendered paint already matches the animation's starting
// point) and the GSAP timeline (so it animates from that exact state).
// Without matching them, there's a gap — between the raw HTML painting
// and React hydrating enough to run the entrance effect — where the
// browser shows everything in its unstyled, fully-visible, unscaled
// state: the photo flashes fully zoomed out, and the logo/text flash at
// full size, before JS catches up and hides them to animate in "from
// scratch." Baking the hidden/zoomed starting values into the initial
// render means there's nothing to flash — the page loads already in
// that state, then animates forward from it.
const PHOTO_START_SCALE = 2.15;
const PHOTO_END_SCALE = 2.05;
const PHOTO_OBJECT_POSITION = "center 68%";

export default function MissionHero() {
  const photoRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const mountainRef = useRef(null);
  const lineRefs = useRef([]);
  const chevronRef = useRef(null);
  // eslint-disable-next-line react-hooks/refs -- standard ref-list reset-on-render pattern; read only by the entrance-animation effect below, never during render
  lineRefs.current = [];

  // Keep the mountain mark's width locked to the "NGEN" text's rendered
  // width, so its left/right edges line up with the text's edges — the
  // text is sized with clamp(), so this has to track actual layout
  // rather than a fixed CSS ratio.
  useLayoutEffect(() => {
    if (!textRef.current || !mountainRef.current) return;
    const syncWidth = () => {
      if (!mountainRef.current || !textRef.current) return;
      mountainRef.current.style.width = `${textRef.current.offsetWidth}px`;
    };
    syncWidth();
    const observer = new ResizeObserver(syncWidth);
    observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  // useLayoutEffect (not useEffect) so this runs before the browser's
  // first paint of the hydrated tree — combined with the matching
  // default inline styles in the JSX below, there's no state for the
  // user to ever see flash between.
  useLayoutEffect(() => {
    const lines = lineRefs.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Jump straight to the fully-settled end state, no motion at all.
      gsap.set(photoRef.current, { scale: PHOTO_END_SCALE, autoAlpha: 1 });
      gsap.set(logoRef.current, { autoAlpha: 1, y: 0, scale: 0.62 });
      gsap.set(lines, { autoAlpha: 1, y: 0 });
      gsap.set(chevronRef.current, { autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline();

    tl.to(photoRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out" })
      .to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.35")
      .to({}, { duration: 0.35 }) // brief hold on NGEN alone
      .to(logoRef.current, { scale: 0.62, duration: 0.5, ease: "power2.inOut" })
      .to(lines, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" }, "-=0.2")
      .to(chevronRef.current, { autoAlpha: 1, duration: 0.35, ease: "power1.out" }, "-=0.1")
      // Slow background zoom, added last (anchored to the timeline's very
      // start) so its long duration can't shift the "-=" offsets above —
      // those were all resolved relative to each other before this got
      // appended.
      .to(photoRef.current, { scale: PHOTO_END_SCALE, duration: 18, ease: "none" }, 0);

    // Gentle infinite bounce on the scroll cue.
    const bounce = gsap.to(chevronRef.current, {
      y: 6,
      duration: 0.9,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.6,
    });

    return () => {
      tl.kill();
      bounce.kill();
    };
  }, []);

  return (
    <div className="relative flex min-h-[calc(100dvh-82px)] flex-col items-center justify-center overflow-hidden bg-[#211A14]">
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed full-bleed background, no benefit from Next's raster image optimizer */}
      <img
        ref={photoRef}
        src="/home/hero-ngen-new-group.jpg"
        alt="NGEN students at the Trailblazers Conference"
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        style={{
          objectPosition: PHOTO_OBJECT_POSITION,
          transformOrigin: PHOTO_OBJECT_POSITION,
          transform: `scale(${PHOTO_START_SCALE})`,
        }}
      />

      {/* Warm dark gradient wash, darkest at the edges so the photo reads
          as backdrop rather than the main subject. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(33,26,20,0.55)_0%,_rgba(33,26,20,0.86)_65%,_rgba(33,26,20,0.96)_100%)]" />

      {/* Soft orange glow centered behind the wordmark, for depth — dialed
          back a bit (was 0.28/55%) so it adds warmth without washing out
          the orange logo text sitting right on top of it. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(247,80,0,0.16)_0%,_transparent_45%)]" />

      {/* Small dark vignette tucked in tight behind just the wordmark —
          raises local contrast right where the text sits without
          darkening the wider photo. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_420px_260px_at_center,_rgba(0,0,0,0.32)_0%,_transparent_70%)]" />

      {/* Faint grain for a tactile, premium finish rather than a flat gradient. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="container-page relative z-10 flex flex-col items-center gap-0 px-6 text-center text-white"
        style={{ transform: "translateY(-1.25rem)" }}
      >
        <div ref={logoRef} className="flex flex-col items-center opacity-0" style={{ transform: "translateY(16px)" }}>
          {/* width/height reserve the correct aspect ratio before the file
              finishes loading. The clamp() inline width is a CSS-only
              approximation of the "NGEN" text's width (same shape as its
              font-size clamp below) so there's a reasonable size on the
              very first paint, before React even hydrates — the
              ResizeObserver effect then corrects it to an exact px match
              once mounted. Without this default, the image briefly
              renders at its full native 2250px width pre-hydration. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- brand mark, no benefit from Next's raster image optimizer */}
          <img
            ref={mountainRef}
            src="/logos/brand/ngen-mountain-white.png"
            width={2250}
            height={1154}
            alt=""
            aria-hidden="true"
            className="mb-2 h-auto"
            style={{
              width: "clamp(9rem, 29vw, 27rem)",
              filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
            }}
          />
          <div
            ref={textRef}
            className="bg-gradient-to-b from-[#FF7A33] to-[var(--color-orange)] bg-clip-text font-[family-name:var(--font-ngen)] font-extrabold tracking-tight text-transparent"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              lineHeight: 1,
              // Zero-offset shadows wrap evenly around the letterforms
              // themselves (a halo) rather than casting behind/below
              // them — a small dark one for a slight contrast edge, a
              // wider orange one underneath it for warmth.
              filter:
                "drop-shadow(0 0 4px rgba(0,0,0,0.3)) drop-shadow(0 0 30px rgba(247,80,0,0.45))",
            }}
          >
            NGEN
          </div>
        </div>
        <div
          className="max-w-2xl font-[family-name:var(--font-body)] leading-relaxed text-white"
          // Codec Pro's line-box reserves visible space below the
          // baseline for descenders even at line-height:1, on top of the
          // flex gap above — this negative margin pulls the tagline up
          // into that reserved space so it actually sits close to "NGEN"
          // instead of just removing the (much smaller) flex gap.
          style={{ fontSize: "clamp(1rem, 1.9vw, 1.3rem)", marginTop: "clamp(-2.5rem, -5vw, -4rem)" }}
        >
          {TAGLINE_SENTENCES.map((sentence, i) => (
            <p
              key={i}
              ref={(el) => el && lineRefs.current.push(el)}
              className={`opacity-0 ${i > 0 ? "mt-3" : ""}`}
              style={{ textWrap: "balance", transform: "translateY(14px)" }}
            >
              {sentence.map((part, j) => (
                <span key={j} className={part.strong ? "font-semibold text-[var(--color-orange)]" : ""}>
                  {part.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Scroll cue — invites the next beat instead of leaving the hero
          feeling like a dead end. */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 opacity-0"
        aria-hidden="true"
      >
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
          <path d="M1 1L11 11L21 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
