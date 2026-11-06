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
    const button = buttonRefs.current[lang];
    if (!group || !button) return;
    group.style.setProperty("--pill-x", `${button.offsetLeft}px`);
    group.style.setProperty("--pill-w", `${button.offsetWidth}px`);
  }, [lang]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-40">
      <div className="wrap flex justify-end">
        <div className="pointer-events-auto">
          <div
            ref={groupRef}
            role="group"
            aria-label={label}
            className="relative inline-flex rounded-full bg-[#f6f3ec] p-1 text-[#050e26] shadow-[0_10px_30px_-18px_rgb(5_14_38/0.8)]"
          >
            <span aria-hidden="true" className="lang-pill pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#050e26]" />
            {OPTIONS.map(([id, name]) => {
              const selected = lang === id;
              return (
                <button
                  key={id}
                  ref={(node) => {
                    buttonRefs.current[id] = node;
                  }}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChoose(id)}
                  className={`lang-option relative z-10 min-h-11 rounded-full px-3 text-small font-medium transition-colors duration-200 ${selected ? "text-[#f6f3ec]" : "text-[#3e4d6e]"}`}
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
