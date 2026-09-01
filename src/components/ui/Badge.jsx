/**
 * The one Badge primitive. A small pill label for statuses, categories, or
 * speaker tags. `tone` picks the color family, `variant` picks solid vs subtle.
 *
 * Styling comes from the semantic design tokens in globals.css.
 */

const BASE =
  "inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wide";

const TONES = {
  subtle: {
    accent: "bg-accent-fill/10 text-accent-ink",
    neutral: "bg-neutral-100 text-text-muted",
    dark: "bg-surface-dark/10 text-surface-dark",
  },
  solid: {
    accent: "bg-accent-fill text-white",
    neutral: "bg-neutral-200 text-text",
    dark: "bg-surface-dark text-on-dark",
  },
};

export default function Badge({
  tone = "accent",
  variant = "subtle",
  className = "",
  children,
  ...rest
}) {
  const group = TONES[variant] || TONES.subtle;
  const toneClasses = group[tone] || group.accent;

  return (
    <span className={`${BASE} ${toneClasses} ${className}`} {...rest}>
      {children}
    </span>
  );
}
