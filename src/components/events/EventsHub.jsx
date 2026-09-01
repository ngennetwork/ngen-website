"use client";

import { useState } from "react";
import { Button, Card, Badge, StatusBadge, SectionHeader } from "@/components/ui";
import EmptyState from "@/components/EmptyState";
import { PROGRAM_CATEGORY } from "./shared";

const CATEGORY_FILTERS = ["All Programs", ...new Set(Object.values(PROGRAM_CATEGORY)), "Community"];

const STATUS_FILTERS = ["All", "Open Applications", "Upcoming"];

const OPEN_STATUSES = new Set(["open", "closing-soon"]);

function matchesStatusFilter(status, filter) {
  if (filter === "All") return true;
  if (filter === "Open Applications") return OPEN_STATUSES.has(status);
  if (filter === "Upcoming") return status === "announced";
  return true;
}

function formatEventLine(program) {
  if (program.deadlineLabel) return program.deadlineLabel;
  if (program.nextEventDate) {
    const date = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(program.nextEventDate));
    return program.nextEventCity ? `${date} · ${program.nextEventCity}` : date;
  }
  return null;
}

/**
 * EventsHub — the client half of /events. Receives the program list
 * assembled server-side (see src/app/events/page.js) and owns the
 * category/status filtering. Renders the hero, filter pills, the program
 * grid, and an EmptyState so a filtered-out category is never a dead end.
 */
export default function EventsHub({ programs }) {
  const [category, setCategory] = useState("All Programs");
  const [status, setStatus] = useState("All");

  const visible = programs.filter((p) => {
    const categoryMatch = category === "All Programs" || p.category === category;
    const statusMatch = matchesStatusFilter(p.status, status);
    return categoryMatch && statusMatch;
  });

  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        <SectionHeader
          as="h1"
          title="Everything NGEN runs for student founders"
          subtext="Flagship conferences, founder treks, pitch competitions, and workshops across our university network. Find the program that fits where you are and apply in minutes."
          align="center"
        />

        {/* Category filters */}
        <nav
          role="group"
          aria-label="Filter by program category"
          className="mt-12 flex gap-2 overflow-x-auto pb-1"
        >
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              aria-pressed={category === filter}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === filter
                  ? "bg-surface-dark text-white"
                  : "bg-neutral-100 text-text-muted hover:bg-neutral-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </nav>

        {/* Status filters */}
        <nav
          role="group"
          aria-label="Filter by application status"
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatus(filter)}
              aria-pressed={status === filter}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                status === filter
                  ? "border-accent-fill bg-accent-fill/10 text-accent-ink"
                  : "border-neutral-200 text-text-muted hover:border-neutral-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </nav>

        {/* Program grid */}
        {visible.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((program) => {
              // Community is the standing network, not an application cycle
              // (see src/app/apply/page.js) — it always routes to its own page.
              const canApply = program.category !== "Community" && OPEN_STATUSES.has(program.status);
              const eventLine = formatEventLine(program);

              return (
                <Card key={program.slug} as="article" hover className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="neutral" variant="subtle">
                      {program.category}
                    </Badge>
                    <StatusBadge status={program.status} />
                  </div>
                  <h3 className="mt-4 text-h4 font-sans font-extrabold text-text">{program.name}</h3>
                  {eventLine && (
                    <p className="mt-1 text-small font-semibold uppercase tracking-wide text-text-muted">
                      {eventLine}
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-body text-text-muted">{program.tagline}</p>

                  {program.stats?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {program.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-small font-extrabold text-text">{stat.value}</div>
                          <div className="text-caption text-text-muted">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    {canApply ? (
                      <Button variant="primary" size="sm" href="/apply" fullWidth>
                        Apply Now →
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" href={`/events/${program.slug}`} fullWidth>
                        View Program →
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="mt-12">
            <EmptyState
              heading="No programs match these filters"
              message="Join the list and we'll email you as new programs are announced."
            />
          </div>
        )}
      </div>
    </div>
  );
}
