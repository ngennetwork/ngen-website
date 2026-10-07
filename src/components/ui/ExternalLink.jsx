import { site } from "@/content/site";

/** The small diagonal arrow that marks a link leaving the site. */
export function ExternalArrow({ className = "" }) {
  return (
    <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none" className={`inline-block shrink-0 ${className}`}>
      <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** A link to another site: new tab, marked for sighted and screen-reader users alike. */
export default function ExternalLink({ href, children, className = "", arrowClassName = "ml-1.5 opacity-60", ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <ExternalArrow className={arrowClassName} />
      <span className="sr-only"> {site.labels.newTab}</span>
    </a>
  );
}
