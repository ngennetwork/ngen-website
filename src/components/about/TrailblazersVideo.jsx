"use client";

import { useEffect, useRef, useState } from "react";
import { trailblazers } from "@/data/trailblazers";

export default function TrailblazersVideo({ variant = "card" }) {
  const { youtubeVideoId } = trailblazers;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const isBanner = variant === "banner";

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative">
      {!isBanner && (
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[var(--color-orange)] motion-reduce:translate-x-2 motion-reduce:translate-y-2" />
      )}
      <div
        className={`relative overflow-hidden rounded-2xl bg-[var(--color-navy)] aspect-video w-full`}
      >
        {youtubeVideoId ? (
          <>
            <video
              ref={videoRef}
              src="/home/trailblazers.mp4"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="block w-full h-full object-cover rounded-2xl pointer-events-none"
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="group absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-200 ease-out hover:scale-110 hover:border-white/20 hover:bg-white/20 active:scale-95"
            >
              {isMuted ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
                  <path d="M17.5 8.5l4 7M21.5 8.5l-4 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
                  <path
                    className="origin-left transition-transform duration-200 group-hover:scale-x-105"
                    d="M16 9a3.5 3.5 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-white">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
                <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
              </svg>
              <p className="text-sm font-semibold">TODO: video not yet supplied</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
