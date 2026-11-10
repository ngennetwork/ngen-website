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
    <div className="pointer-events-none z-40 nav:fixed nav:top-[5.75rem] nav:left-[max(var(--gutter),calc((100vw-82rem)/2+var(--gutter)))] max-nav:flex max-nav:w-full max-nav:justify-center max-nav:border-b max-nav:border-[#151815]/10 max-nav:bg-[#f3f1ec]/95 max-nav:px-[max(1rem,env(safe-area-inset-right))] max-nav:py-1.5 max-nav:pl-[max(1rem,env(safe-area-inset-left))] max-nav:backdrop-blur-md">
      <div className="pointer-events-auto max-nav:w-full max-nav:max-w-[22rem]">
        <div
          ref={groupRef}
          role="radiogroup"
          aria-label={label}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="lang-switch relative grid grid-cols-3 rounded-full bg-[#fbfaf7]/95 p-1 text-[#151815] shadow-[0_12px_30px_-16px_rgb(21_24_21/0.28)] ring-1 ring-[#151815]/10 max-nav:bg-white"
        >
          <span aria-hidden="true" className="lang-pill pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#1c3a2a]" />
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
                className={`lang-option relative z-10 min-h-11 rounded-full px-2 text-[16px] font-medium ${selected ? "text-[#fbfaf7]" : "text-[#5d625d]"}`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
