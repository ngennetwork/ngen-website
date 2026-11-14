"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether a program's current round is still taking applications. The page
 * is built ahead of time, so this checks the deadline in the visitor's
 * browser: before `closesAt` it shows the round and its Apply button, after
 * it the page reads "Next round opening soon" and points to the email signup.
 */
const noSubscribe = () => () => {};

function useRoundOpen(closesAt) {
  // Server render assumes open; the browser then checks the real clock.
  return useSyncExternalStore(
    noSubscribe,
    () => Date.now() < new Date(closesAt).getTime(),
    () => true,
  );
}

/** The hero's main button: Apply while the round is open, Get notified after. */
export function RoundAction({ round, apply, alertsHref = "#pitch-alerts" }) {
  const open = useRoundOpen(round.closesAt);
  if (!open) {
    return (
      <a href={alertsHref} className="btn btn-ink">
        Get notified about the next round
      </a>
    );
  }
  return (
    <a href={apply.href} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
      {apply.label}
    </a>
  );
}

/** The current round's dates, or a short "next round" note once it closes. */
export function RoundDetails({ round, apply, alertsHref = "#pitch-alerts" }) {
  const open = useRoundOpen(round.closesAt);

  if (!open) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-lead">Next round opening soon.</p>
        <p className="text-base text-slate">
          Rounds run several times a year.{" "}
          <a href={alertsHref} className="link">
            Leave your email
          </a>{" "}
          and we&rsquo;ll write when applications open.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-small text-slate">{round.name}: applications open</p>
      <dl className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <dt className="text-small text-slate">Applications due</dt>
          <dd className="font-display text-h3">{round.deadlineLabel}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-small text-slate">Final</dt>
          <dd className="font-display text-h3">{round.finalLabel}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={apply.href} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
          {apply.label}
        </a>
        {round.lumaHref && (
          <a href={round.lumaHref} target="_blank" rel="noopener noreferrer" className="link text-small">
            See it on Luma
          </a>
        )}
      </div>
    </div>
  );
}
