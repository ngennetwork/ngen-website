"use client";

import { useState } from "react";
import { whatWeDo } from "@/data/whatWeDo";
import { applyFaq } from "@/data/applyFaq";
import {
  getProgramBySlug,
  getProgramStatus,
  formatDeadline,
} from "@/content/programs";
import EmptyState from "@/components/EmptyState";
import { Button, Card, SectionHeader, StatusBadge } from "@/components/ui";

// Community isn't something you "apply" to — it's the standing network,
// with its own "Join Our Network" action already surfaced on its own
// page. Every other program has a real apply/attend flow, so those are
// what show up here.
const APPLICABLE_PROGRAMS = whatWeDo.filter((program) => program.slug !== "community");

const OPEN_STATUSES = ["open", "closing-soon"];

function ProgramCard({ program, status }) {
  const record = getProgramBySlug(program.slug);
  const isOpen = OPEN_STATUSES.includes(status);
  const deadline = formatDeadline(record?.closesAt);

  const meta = [record?.eligibility, record?.applicationTimeEstimate];
  if (isOpen && deadline) meta.push(deadline);

  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-neutral-200 bg-surface-card p-6 shadow-sm transition-all hover:border-neutral-400 md:flex-row md:items-center">
      <div className="min-w-0 flex-1">
        <StatusBadge status={status} />
        <h3 className="mt-2 text-lg font-bold text-text">{program.title}</h3>
        <p className="mt-1 text-sm text-text-muted">{program.cardDescription}</p>
        <p className="mt-2 text-caption font-medium uppercase tracking-wide text-text-muted">
          {meta.filter(Boolean).join("  ·  ")}
        </p>
      </div>

      {isOpen ? (
        <Button
          variant="primary"
          size="sm"
          href={program.ctaHref}
          fullWidth
          className="shrink-0 md:w-auto"
        >
          Apply Now →
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          href="#waitlist"
          fullWidth
          className="shrink-0 md:w-auto"
        >
          {status === "announced" ? "Get Notified" : "Join the Waitlist"}
        </Button>
      )}
    </div>
  );
}

/**
 * /apply — "Active Applications," first under the header's "Events &
 * Programs" dropdown.
 *
 * Three vertical tiers, all derived per-program from the data layer
 * (src/content/programs.js) — no hardcoded status anywhere:
 *   1. Active & Urgent   — open / closing-soon, soonest deadline first
 *   2. Upcoming & Future — announced (opens later) or closed (no live
 *      cycle), so a past deadline never silently disappears
 *   3. General Info & FAQ — how the process works, plus the waitlist
 */
export default function ApplyPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const withStatus = APPLICABLE_PROGRAMS.map((program) => ({
    program,
    status: getProgramStatus(program.slug),
  }));

  const activePrograms = withStatus
    .filter(({ status }) => OPEN_STATUSES.includes(status))
    .sort((a, b) => {
      const aCloses = getProgramBySlug(a.program.slug)?.closesAt;
      const bCloses = getProgramBySlug(b.program.slug)?.closesAt;
      if (!aCloses) return 1;
      if (!bCloses) return -1;
      return new Date(aCloses).getTime() - new Date(bCloses).getTime();
    });

  const statusRank = { announced: 0, closed: 1 };
  const upcomingPrograms = withStatus
    .filter(({ status }) => status === "announced" || status === "closed")
    .sort((a, b) => (statusRank[a.status] ?? 2) - (statusRank[b.status] ?? 2));

  return (
    <div className="bg-neutral-50">
      <div className="border-b border-surface-dark-deep bg-surface-dark px-6 pb-12 pt-16 text-center text-white">
        <h1 className="text-3xl font-black tracking-tight md:text-5xl">APPLICATION PORTAL</h1>
        <p className="mx-auto mt-3 max-w-xl text-on-dark/70">
          Select an open program below to begin your application.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Tier 1 — Active & Urgent */}
        <section>
          <SectionHeader eyebrow="ACTIVE APPLICATIONS" title="Apply now" />
          <div className="mt-6 space-y-4">
            {activePrograms.length > 0 ? (
              activePrograms.map(({ program, status }) => (
                <ProgramCard key={program.slug} program={program} status={status} />
              ))
            ) : (
              <p className="text-text-muted">
                Nothing&rsquo;s open for applications right now — see what&rsquo;s next below.
              </p>
            )}
          </div>
        </section>

        {/* Tier 2 — Upcoming & Future */}
        <section className="mt-16">
          <SectionHeader eyebrow="COMING UP" title="Plan ahead" />
          <div className="mt-6 space-y-4">
            {upcomingPrograms.length > 0 ? (
              upcomingPrograms.map(({ program, status }) => (
                <ProgramCard key={program.slug} program={program} status={status} />
              ))
            ) : (
              <p className="text-text-muted">Nothing else in the pipeline right now.</p>
            )}
          </div>
        </section>

        {/* Tier 3 — General Info & FAQ */}
        <section className="mt-16">
          <SectionHeader eyebrow="FAQ" title="How it works" />
          <div className="mt-6 space-y-3">
            {applyFaq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Card key={item.question} padded={false} className="p-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left font-semibold text-text"
                  >
                    {item.question}
                    <svg
                      className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pt-3 text-sm text-text-muted transition-opacity duration-300 ease-in-out ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Waitlist — always available so a closed program is never a
              dead end, and the sole state when nothing is open. */}
          <div className="mt-12">
            <EmptyState
              id="waitlist"
              heading={
                activePrograms.length > 0
                  ? "Don't see the right cycle?"
                  : "Nothing's open for applications right now"
              }
              message="Join the list and we'll email you the moment the next cycle opens."
            />
          </div>
        </section>
      </div>
    </div>
  );
}
