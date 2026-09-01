import Link from "next/link";

/**
 * The one Button primitive. Renders a Next.js <Link> for internal hrefs, a
 * plain <a> for external hrefs, or a <button> when no href is given.
 *
 * All styling comes from the semantic design tokens in globals.css — no raw
 * color vars or Tailwind palette classes.
 */

const BASE =
  "inline-flex items-center justify-center rounded-full font-sans font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

const SIZES = {
  sm: "px-5 py-2 text-small",
  md: "px-8 py-3.5 text-body",
  lg: "px-10 py-4 text-body-lg",
};

const VARIANTS = {
  primary: "bg-accent-fill text-white hover:bg-accent-fill-hover focus-ring-light",
  secondary:
    "bg-surface-card text-accent-ink border border-neutral-200 hover:bg-neutral-100 focus-ring-light",
  dark: "bg-surface-card text-surface-dark hover:bg-neutral-100 focus-ring-dark",
  ghost: "text-accent-ink hover:bg-neutral-100 focus-ring-light",
  link: "text-accent-ink underline-offset-4 hover:underline focus-ring-light",
};

// The "link" variant is inline text, so it opts out of the pill sizing padding.
function sizeClasses(variant, size) {
  if (variant === "link") return "px-0 py-0 text-body";
  return SIZES[size] || SIZES.md;
}

function isExternalHref(href) {
  return /^(https?:|mailto:|tel:)/.test(href || "");
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  href,
  external,
  type = "button",
  onClick,
  className = "",
  children,
  ...rest
}) {
  const classes = `${BASE} ${sizeClasses(variant, size)} ${
    VARIANTS[variant] || VARIANTS.primary
  }${fullWidth ? " w-full" : ""} ${className}`;

  // No href → real <button>.
  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={classes} {...rest}>
        {children}
      </button>
    );
  }

  // Links can't be natively disabled — render a non-navigating span instead.
  if (disabled) {
    return (
      <span aria-disabled="true" className={classes} {...rest}>
        {children}
      </span>
    );
  }

  const treatExternal = external ?? isExternalHref(href);

  if (treatExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes} {...rest}>
      {children}
    </Link>
  );
}
