"use client";

import { useState } from "react";

const INITIAL_COUNT = 5;

function articleTitle(article) {
  return article.title ?? article.news_title ?? "Untitled";
}

function articleDate(article) {
  return article.date ?? article.published_at ?? "Recent";
}

function articleSummary(article) {
  return (
    article.summary ??
    article.preview ??
    `Press coverage detailing recent milestones and growth for ${article.startupName ?? "this startup"}.`
  );
}

export default function NewsList({ articles }) {
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll ? articles : articles.slice(0, INITIAL_COUNT);

  return (
    <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-2">
      {visibleArticles.map((article) => (
        <a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-0.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all hover:bg-slate-50/80 hover:shadow sm:px-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {article.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- small startup logo, no benefit from Next's raster image optimizer
                <img
                  src={article.logo}
                  alt=""
                  className="h-6 w-6 shrink-0 rounded-full object-contain sm:h-7 sm:w-7"
                />
              ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)]/5 text-xs font-semibold uppercase text-[var(--color-navy)]/70 sm:h-7 sm:w-7">
                  {article.startupName?.charAt(0)}
                </span>
              )}

              <span className="truncate text-sm font-semibold text-[var(--color-navy)]">
                {article.startupName}
              </span>
            </div>

            <span className="mr-2 shrink-0 text-xs font-medium text-slate-400">
              {articleDate(article)}
            </span>
          </div>

          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-slate-900 transition-colors group-hover:text-[var(--color-orange)]">
            {articleTitle(article)}
          </span>

          <span className="mt-0.5 line-clamp-1 text-xs text-slate-500">
            {articleSummary(article)}
          </span>
        </a>
      ))}

      {!showAll && articles.length > INITIAL_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mx-auto mt-2 rounded-full border border-[var(--color-navy)]/10 px-5 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/20 hover:bg-white"
        >
          Show more
        </button>
      )}
    </div>
  );
}
