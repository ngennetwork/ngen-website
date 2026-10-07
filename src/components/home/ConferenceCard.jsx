"use client";

import Image from "next/image";
import { conference, home, site } from "@/content/site";
import { useDaysUntil } from "@/lib/use-now";
import { ExternalArrow } from "@/components/ui/ExternalLink";

const { card } = home.calendar;

/**
 * The flagship NGEN presents, as the conference's own admission ticket:
 * "Admit one" over its official wordmark and motto, the date with the days
 * left and the place, then a perforated stub (invite-only, and its site).
 * It stretches to its column; its edge glows orange like NGEN's dark tiles.
 *
 * ground: the background class of the section it sits on, so the two
 * notches in the perforation read as cut out of the ticket.
 */
export default function ConferenceCard({ className = "", ground = "bg-fog" }) {
  const days = useDaysUntil(conference.startsAt);

  return (
    <a
      href={conference.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${conference.name}, ${conference.dateLabel}, ${conference.city}. ${card.cta} ${site.labels.newTab}`}
      className={`glow-card group flex flex-col rounded-2xl bg-paper text-ink transition-transform duration-500 ease-out hover:-translate-y-1 ${className}`}
    >
      <div className="flex flex-col gap-3.5 px-7 pt-6 pb-5">
        <p className="text-small text-slate">{card.kicker}</p>
        <Image
          src="/logos/conference/ilec-wordmark.png"
          alt={conference.name}
          width={2000}
          height={548}
          sizes="260px"
          className="h-auto w-full max-w-[15rem] brightness-0 invert"
        />
        <p className="text-small text-ink/70">{conference.motto}</p>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-ink/12 px-7 py-4 text-base">
        <div>
          <dt className="text-small text-slate">{card.dateLabel}</dt>
          <dd className="mt-1 font-medium">
            {conference.dateLabel}
            <span className="block min-h-[1.5em] font-normal text-slate">{days !== null && site.labels.daysAway(days)}</span>
          </dd>
        </div>
        <div>
          <dt className="text-small text-slate">{card.cityLabel}</dt>
          <dd className="mt-1 font-medium">{conference.city}</dd>
        </div>
      </dl>

      {/* The stub, torn along the perforation */}
      <div className="relative flex items-center justify-between gap-4 border-t border-dashed border-ink/25 px-7 py-3.5 text-small">
        <span aria-hidden="true" className={`absolute -top-2.5 -left-2.5 size-5 rounded-full ${ground}`} />
        <span aria-hidden="true" className={`absolute -top-2.5 -right-2.5 size-5 rounded-full ${ground}`} />
        <span className="rounded-full px-3 py-0.5 whitespace-nowrap ring-1 ring-signal/70">{conference.format}</span>
        <span className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
          {card.cta}
          <ExternalArrow />
        </span>
      </div>
    </a>
  );
}
