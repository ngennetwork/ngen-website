import { universities } from "@/data/universities";

function LogoItem({ u }) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center px-2">
      {u.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed optical height, no benefit from Next's raster image optimizer
        <img
          src={u.logo}
          alt={`${u.name} logo`}
          className="w-auto max-h-full object-contain grayscale opacity-70 transition-all duration-200 hover:opacity-100 hover:grayscale-0"
          style={{ height: `${u.logoHeight ?? 48}px` }}
        />
      ) : (
        <p className="font-[family-name:var(--font-display)] text-sm font-bold text-text">{u.name}</p>
      )}
    </div>
  );
}

/**
 * Homepage university logo marquee — single-row auto-scrolling ticker of
 * the 11 universities NGEN has students involved from (not official
 * partnerships), replacing the honeycomb grid that used to live here
 * (see CommunitySection.jsx). Uses the marquee
 * keyframes/track classes defined in globals.css (already respects
 * prefers-reduced-motion) — the logo list is duplicated once so the
 * -50% translate loop is seamless.
 */
export default function UniversityMarquee() {
  return (
    <div className="bg-slate-50 py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-wider text-text md:text-3xl">
            11 Universities Represented
          </h2>
          <p className="mt-2 font-sans text-small font-semibold text-accent-ink">
            Innovative Students From
          </p>
        </div>

        <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-12">
            <div className="flex shrink-0 items-center gap-12">
              {universities.map((u) => (
                <LogoItem key={`a-${u.name}`} u={u} />
              ))}
            </div>
            <div className="marquee-dup flex shrink-0 items-center gap-12">
              {universities.map((u) => (
                <LogoItem key={`b-${u.name}`} u={u} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
