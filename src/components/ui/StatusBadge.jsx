/**
 * The one StatusBadge primitive — a pill that renders a program's live
 * application status. Pass the *computed* status from
 * getProgramStatus(slug) (see src/content/programs.js), never the raw
 * stored field, so a passed deadline can never show as "Open".
 *
 * Each status gets a distinct treatment built from the semantic design
 * tokens in globals.css (success/accent/neutral/dark) — no raw hex.
 */

const BASE =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wide";

const STYLES = {
  open: "bg-success-tint text-success-ink",
  "closing-soon": "bg-accent-fill/10 text-accent-ink",
  closed: "bg-neutral-100 text-text-muted",
  announced: "bg-surface-dark/10 text-surface-dark",
  archived: "bg-neutral-100 text-neutral-500",
};

const DOTS = {
  open: "bg-success",
  "closing-soon": "bg-accent-fill",
  closed: "bg-neutral-400",
  announced: "bg-surface-dark",
  archived: "bg-neutral-400",
};

const LABELS = {
  open: "Open",
  "closing-soon": "Closing Soon",
  closed: "Closed",
  announced: "Announced",
  archived: "Archived",
};

export default function StatusBadge({ status = "announced", className = "", ...rest }) {
  const styleClasses = STYLES[status] || STYLES.announced;
  const dotClasses = DOTS[status] || DOTS.announced;
  const label = LABELS[status] || status;
  const pulse = status === "closing-soon" ? "animate-pulse" : "";

  return (
    <span className={`${BASE} ${styleClasses} ${className}`} {...rest}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses} ${pulse}`} aria-hidden="true" />
      {label}
    </span>
  );
}
