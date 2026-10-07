"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Film from NGEN's flagship conference: plays muted and looped once it's on screen, with
 * one control for sound. Under reduced motion it waits for a click.
 */
export default function ConferenceFilm({ caption }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
    if (video.paused) video.play().catch(() => {});
  }

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-ink-deep">
        <video
          ref={ref}
          src="/home/trailblazers.mp4"
          muted
          playsInline
          loop
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="block size-full object-cover"
        />
        <button
          type="button"
          onClick={toggleSound}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3.5 py-2 text-small text-ink backdrop-blur transition-colors hover:bg-paper"
        >
          <span aria-hidden="true" className={`size-1.5 rounded-full ${playing && !muted ? "bg-signal" : "bg-ink/40"}`} />
          {!playing ? "Play with sound" : muted ? "Sound on" : "Sound off"}
        </button>
      </div>
      {caption && <figcaption className="text-small text-slate">{caption}</figcaption>}
    </figure>
  );
}
