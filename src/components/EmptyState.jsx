"use client";

import NewsletterForm from "@/components/NewsletterForm";

/**
 * EmptyState — shown wherever a program has no open application cycle
 * (a closed/announced program page hero, or the /apply portal when
 * nothing is open). It surfaces the next expected window when known and
 * an email-capture form, so a closed program is never a dead end: the
 * visitor can always ask to be notified.
 *
 * Pass a `program` object (from src/content/programs.js) to derive the
 * heading + next window automatically, or override any of
 * `heading` / `windowDate` / `message` explicitly.
 */
function formatWindow(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export default function EmptyState({
  program = null,
  heading,
  message,
  windowDate,
  id,
  className = "",
}) {
  const title =
    heading ??
    (program ? `${program.name} isn't open right now` : "Applications aren't open right now");

  const when = windowDate ?? program?.opensAt ?? program?.nextEventDate ?? null;
  const windowLabel = formatWindow(when);

  const body =
    message ?? "Join the list and we'll email you the moment the next cycle opens.";

  return (
    <div
      id={id}
      className={`mx-auto max-w-md rounded-xl border border-dashed border-neutral-300 bg-surface-card p-8 text-center ${className}`}
    >
      <h2 className="font-bold text-text">{title}</h2>
      {windowLabel && (
        <p className="mt-2 text-small font-semibold text-accent-ink">
          Next expected: {windowLabel}
        </p>
      )}
      <p className="mt-3 text-text-muted">{body}</p>
      <div className="mt-5">
        <NewsletterForm />
      </div>
    </div>
  );
}
