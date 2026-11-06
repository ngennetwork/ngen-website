"use client";

const OPTIONS = [
  ["en", "EN"],
  ["zh-Hant", "繁體"],
  ["zh-Hans", "简体"],
];

export default function LanguageSwitcher({ lang, label, onChoose }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-40">
      <div className="wrap flex justify-end">
        <div className="pointer-events-auto">
        <div role="group" aria-label={label} className="inline-flex rounded-full bg-[#f6f3ec] p-1 text-[#050e26] shadow-[0_10px_30px_-18px_rgb(5_14_38/0.8)]">
          {OPTIONS.map(([id, name]) => {
            const selected = lang === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChoose(id)}
                className={`min-h-11 rounded-full px-3 text-small font-medium ${selected ? "bg-[#050e26] text-[#f6f3ec]" : "text-[#3e4d6e]"}`}
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
