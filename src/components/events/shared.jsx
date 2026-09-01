import { Badge, Button, StatusBadge } from "@/components/ui";
import EmptyState from "@/components/EmptyState";
import { formatDeadline, getProgramBySlug, getProgramStatus } from "@/content/programs";

export const APPLY_LABEL = "Apply to Attend";

const OPEN_STATUSES = new Set(["open", "closing-soon"]);

/** Is this program currently accepting applications (live status)? */
export function isProgramOpen(slug) {
  return OPEN_STATUSES.has(getProgramStatus(slug));
}

export function ApplyButton({ href, external, label = APPLY_LABEL, className = "" }) {
  return (
    <Button variant="primary" href={href} external={external} className={className}>
      {label}
    </Button>
  );
}

/** The program's live status badge, derived from the data layer. */
export function ProgramStatus({ slug, className = "" }) {
  return <StatusBadge status={getProgramStatus(slug)} className={className} />;
}

/**
 * A program hero's primary action: the real Apply button while the cycle
 * is open/closing-soon, or an EmptyState (next window + email capture)
 * once it's closed/announced — so a program page is never a dead end.
 */
export function ApplyOrEmpty({ program, label, className = "" }) {
  if (isProgramOpen(program.slug)) {
    return (
      <ApplyButton
        href={program.ctaHref}
        external={program.ctaExternal}
        label={label ?? program.ctaLabel}
        className={className}
      />
    );
  }
  return <EmptyState program={getProgramBySlug(program.slug)} />;
}

export function ClosingCta({ program }) {
  const open = isProgramOpen(program.slug);
  return (
    <div className="bg-surface-dark py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="font-[family-name:var(--font-heading-events)] text-2xl font-extrabold uppercase tracking-wider text-on-dark md:text-3xl">
          Ready to join the network?
        </h2>
        <div className="mt-8">
          {open ? (
            <ApplyButton href={program.ctaHref} external={program.ctaExternal} label={program.ctaLabel} />
          ) : (
            <Button variant="dark" href="/apply">
              Join the waitlist
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function SectionHeading({ children, light = false, fontClassName = "font-[family-name:var(--font-heading-events)]" }) {
  return (
    <h2
      className={`mt-20 text-center ${fontClassName} text-xl font-extrabold uppercase tracking-wider md:text-2xl ${
        light ? "text-on-dark" : "text-surface-dark"
      }`}
    >
      {children}
    </h2>
  );
}

/**
 * A single full-width photo band, meant to be dropped between content
 * sections so photos read as part of the page flow rather than a
 * clustered gallery block.
 */
export function PhotoBand({ src, alt = "", className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- placeholder photo
    <img
      src={src}
      alt={alt}
      className={`mx-auto h-64 w-full max-w-6xl rounded-2xl object-cover shadow-lg md:h-96 ${className}`}
    />
  );
}

/** Program `type` -> the directory's category label. Shared by the
 * /events grid and each program page's category badge so the taxonomy
 * can't drift between the two. */
export const PROGRAM_CATEGORY = {
  trailblazers: "Conferences",
  research: "Conferences",
  treks: "Founder Treks",
  competitions: "Pitch Competitions",
  workshops: "Workshops",
};

export function categoryLabel(type) {
  return PROGRAM_CATEGORY[type] ?? "Community";
}

export function CategoryBadge({ type, className = "" }) {
  return (
    <Badge tone="neutral" variant="subtle" className={className}>
      {categoryLabel(type)}
    </Badge>
  );
}

/** The live application deadline, shown only while a cycle is actually
 * open — a closed/announced program has nothing to bank a banner on. */
export function DeadlineBanner({ program, className = "" }) {
  const status = getProgramStatus(program.slug);
  if (status !== "open" && status !== "closing-soon") return null;
  const deadline = formatDeadline(program.closesAt);
  if (!deadline) return null;
  return <p className={`text-sm font-semibold text-accent-ink ${className}`}>{deadline}</p>;
}

/** Secondary hero CTA. Standing in for "Download Overview" — no
 * downloadable asset exists in the data model yet. */
export function ContactCta({ className = "" }) {
  return (
    <Button variant="secondary" href="/contact" className={className}>
      Contact Us
    </Button>
  );
}

const AUDIENCE_LABEL = {
  student: "Students",
  partner: "Partners",
  both: "Students & Partners",
};

export function AudienceEligibility({ program }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        Who It&rsquo;s For
      </div>
      <div className="mt-2 text-sm font-semibold text-text">
        {AUDIENCE_LABEL[program.audience] ?? program.audience}
      </div>
      <p className="mt-1 text-sm text-text-muted">{program.eligibility}</p>
    </div>
  );
}

function formatFullDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function ProgramTimeline({ program }) {
  const rows = [
    program.opensAt && { label: "Applications Open", value: formatFullDate(program.opensAt) },
    program.closesAt && { label: "Applications Close", value: formatFullDate(program.closesAt) },
    program.nextEventDate && {
      label: "Next Event",
      value: `${formatFullDate(program.nextEventDate)}${
        program.nextEventCity ? ` · ${program.nextEventCity}` : ""
      }`,
    },
  ].filter(Boolean);

  if (rows.length === 0) return null;

  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-text-muted">Key Dates</div>
      <dl className="mt-2 space-y-1">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className="text-text-muted">{row.label}</dt>
            <dd className="font-semibold text-text">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
