"use client";

import { useState } from "react";

const TABS = [
  { value: "all", label: "All" },
  { value: "core", label: "Core & Operations" },
  { value: "campus", label: "Campus Directors" },
];

/**
 * Tab-filtered grid for /about/team. Client-side only so the server
 * page.js above it can keep the static `metadata` export.
 */
export default function TeamDirectory({ team }) {
  const [activeTab, setActiveTab] = useState("all");

  const visible = activeTab === "all" ? team : team.filter((person) => person.category === activeTab);

  return (
    <>
      <nav
        role="group"
        aria-label="Filter team by group"
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            aria-pressed={activeTab === tab.value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.value
                ? "bg-surface-dark text-white"
                : "bg-neutral-100 text-text-muted hover:bg-neutral-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((person, index) => (
          <div
            key={`${person.name}-${person.role}-${index}`}
            className="rounded-xl border border-neutral-200 bg-surface-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="font-sans text-lg font-bold text-text">{person.name}</p>
            <p className="mt-1 text-sm text-text-muted">{person.role}</p>
            {person.school && (
              <p
                className={`mt-1 text-xs ${
                  person.isPlaceholder ? "text-accent-fill" : "text-text/50"
                }`}
              >
                {person.school}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
