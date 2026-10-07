import { universities } from "@/data/universities";
import UniversityLogo from "@/components/brand/UniversityLogo";

const ivies = universities.filter((u) => u.ivy);
const others = universities.filter((u) => !u.ivy);

/**
 * Where NGEN's student founders come from, Ivies first: the eight Ivy
 * League logos large in an even 4 x 2 grid, then the seven other schools
 * smaller beneath them. Official files in one ink, at equal weight.
 */
export default function Strip({ title, intro, className = "bg-fog" }) {
  return (
    <section aria-labelledby="universities-title" className={className}>
      <div className="wrap py-[clamp(4rem,8vw,7rem)]">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-col gap-3">
          <h2 id="universities-title" className="font-display text-h2">
            {title}
          </h2>
          {intro && <p className="text-lead text-slate">{intro}</p>}
        </div>

        <ul aria-label="The Ivy League" className="grid grid-cols-2 items-center gap-x-8 gap-y-12 [--logo-scale:1] sm:grid-cols-4 lg:[--logo-scale:1.35]">
          {ivies.map((u) => (
            <li key={u.name} className="flex h-20 items-center justify-center">
              <UniversityLogo university={u} />
            </li>
          ))}
        </ul>

        <ul aria-label="And" className="mt-12 grid grid-cols-3 items-center gap-x-6 gap-y-8 [--logo-scale:0.72] sm:grid-cols-7 lg:[--logo-scale:0.85]">
          {others.map((u) => (
            <li key={u.name} className="flex h-12 items-center justify-center opacity-80 max-sm:last:col-span-3">
              <UniversityLogo university={u} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
