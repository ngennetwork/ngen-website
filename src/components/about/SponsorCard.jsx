import Link from "next/link";

/**
 * One sponsor card — used on /sponsors for the Current, Previous, and
 * Food Sponsors tiers. Logo on top (in a dark chip if the file needs
 * one — see darkChip in src/data/sponsors.js), name below in bold,
 * description beneath that, and the whole card links out to the
 * sponsor's site.
 */
export default function SponsorCard({ sponsor }) {
  return (
    <Link
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 rounded-xl border border-[var(--color-navy)]/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:-translate-y-0"
    >
      {sponsor.logo && (
        <div
          className={`flex h-16 w-full items-center justify-center ${
            sponsor.darkChip ? "rounded-lg bg-[var(--color-navy-deep)] px-6" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder logo, swapped for real file later */}
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="h-10 w-auto object-contain" />
        </div>
      )}
      <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]">
        {sponsor.name}
      </p>
      <p className="text-sm text-[var(--color-text)]">{sponsor.oneLiner}</p>
    </Link>
  );
}
