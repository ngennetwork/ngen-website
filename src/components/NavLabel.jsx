// Renders a nav label, styling a standalone "&" in a medium weight
// (matching the ampersand treatment used in section headers sitewide).
export default function NavLabel({ label, sub = false }) {
  const parts = label.split(/(&)/);
  return parts.map((part, i) =>
    part === "&" ? (
      <span
        key={i}
        className={
          sub
            ? "font-[family-name:var(--font-display)] font-medium inline-block text-[0.95em] align-middle -translate-y-[1px]"
            : "font-[family-name:var(--font-display)] font-medium"
        }
      >
        &amp;
      </span>
    ) : (
      part
    )
  );
}
