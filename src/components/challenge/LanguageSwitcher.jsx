"use client";

import { useLayoutEffect, useRef } from "react";

const OPTIONS = [
  ["en", "EN"],
  ["zh-Hant", "繁體"],
  ["zh-Hans", "简体"],
];

export default function LanguageSwitcher({ lang, label, onChoose }) {
  const groupRef = useRef(null);
  const buttonRefs = useRef({});

  useLayoutEffect(() => {
    const group = groupRef.current;

    function measure() {
      const button = buttonRefs.current[lang];
      if (!group || !button) return;
      const groupBox = group.getBoundingClientRect();
      const box = button.getBoundingClientRect();
      group.style.setProperty("--pill-x", `${box.left - groupBox.left}px`);
      group.style.setProperty("--pill-w", `${box.width}px`);
    }

    measure();
    const observer = new ResizeObserver(measure);
    if (group) observer.observe(group);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [lang]);

  function onKeyDown(event) {
    const index = OPTIONS.findIndex(([id]) => id === lang);
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = OPTIONS[(index + delta + OPTIONS.length) % OPTIONS.length][0];
    onChoose(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-40">
      <div className="wrap flex justify-end">
        <div className="pointer-events-auto">
          <div
            ref={groupRef}
            role="radiogroup"
            aria-label={label}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="relative inline-flex rounded-full bg-[#f6f3ec]/95 p-1 text-[#050e26] shadow-[0_10px_30px_-18px_rgb(5_14_38/0.85)] ring-1 ring-white/40"
          >
            <span aria-hidden="true" className="lang-pill pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#ff5a14] shadow-[0_6px_16px_-6px_rgb(255_90_20/0.9)]" />
            {OPTIONS.map(([id, name]) => {
              const selected = lang === id;
              return (
                <button
                  key={id}
                  ref={(node) => {
                    buttonRefs.current[id] = node;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onChoose(id)}
                  className={`lang-option relative z-10 min-h-11 min-w-11 rounded-full px-3.5 text-small font-medium ${selected ? "text-white" : "text-[#3e4d6e]"}`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
