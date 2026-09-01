/**
 * The one Card primitive. A padded surface container in two variants:
 * 'light' (off-white card on the page) and 'dark' (navy surface). Renders
 * whatever element `as` specifies so it can be a div, article, li, etc.
 *
 * Styling comes from the semantic design tokens in globals.css.
 */

const VARIANTS = {
  light: "rounded-xl border border-neutral-200 bg-surface-card text-text shadow-sm",
  dark: "rounded-xl bg-surface-dark text-on-dark shadow-sm",
};

const HOVER = "transition-all hover:-translate-y-1 hover:shadow-lg";

export default function Card({
  variant = "light",
  as: Tag = "div",
  padded = true,
  hover = false,
  className = "",
  children,
  ...rest
}) {
  const classes = `${VARIANTS[variant] || VARIANTS.light}${padded ? " p-8" : ""}${
    hover ? ` ${HOVER}` : ""
  } ${className}`;

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
