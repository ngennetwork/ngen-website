import { getTotalCapitalRaised } from "@/content/startups";
import { programs } from "@/content/programs";
import { Card } from "@/components/ui";

// Every value below is a live computation off real content files where
// possible (same convention as the retired MetricsBar.jsx / OutcomesMetrics.jsx
// components) — the two exceptions are called out below.
function formatCapital(usd) {
  if (usd >= 1_000_000) return `$${Math.round(usd / 1_000_000)}M+`;
  if (usd >= 1_000) return `$${Math.round(usd / 1_000)}K+`;
  return `$${usd}`;
}

// Signature Programs = the 4 core pillars shown in CoreProgramsSection's
// bento (same exclusion list as CORE_PROGRAMS there) — Workshops and the
// standing Community network aren't counted here.
const SIGNATURE_PROGRAM_COUNT = programs.filter(
  (p) => p.slug !== "community" && p.slug !== "workshops"
).length;

// The two capital figures sit next to each other in METRICS (below) since
// they're easy to conflate — each label is worded to disambiguate on its
// own: money founders raised on their own vs. money NGEN itself has
// handed out.
const METRICS = [
  // Hardcoded org-level reach total — no content file tracks this yet, so
  // update by hand as the running total changes.
  { value: "20,000", label: "Student\nReach" },
  // Hardcoded — 11 universities represented and growing.
  { value: "11", label: "Universities Represented" },
  { value: `${SIGNATURE_PROGRAM_COUNT}`, label: "Core\nPrograms" },
  { value: formatCapital(getTotalCapitalRaised()), label: "Founder-Raised Capital" },
  // Hardcoded org-level total (grants/prize capital NGEN has directly
  // helped put in founders' hands) — no content file tracks this yet, so
  // update by hand as the running total changes.
  { value: "$500K+", label: "NGEN-Distributed Capital" },
];

/**
 * Hero impact strip — 5 stat tiles sitting under the CTA row, mostly
 * live-computed from src/content / src/data; hardcoded values are called
 * out inline above.
 */
export default function HeroMetrics() {
  return (
    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
      {METRICS.map((m) => (
        <Card key={m.label} variant="light" padded={false} className="px-3 py-5 text-center sm:px-4">
          <div className="font-[family-name:var(--font-display)] text-h3 font-extrabold text-accent-ink md:text-h2">
            {m.value}
          </div>
          <div className="mt-1 whitespace-pre-line text-caption uppercase tracking-wide text-text-muted">
            {m.label}
          </div>
        </Card>
      ))}
    </div>
  );
}
