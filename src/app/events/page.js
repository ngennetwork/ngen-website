import { programs, getProgramStatus, formatDeadline } from "@/content/programs";
import { categoryLabel } from "@/components/events/shared";
import EventsHub from "@/components/events/EventsHub";

export const metadata = {
  title: "Programs & Events",
  description:
    "Explore NGEN's conferences, founder treks, pitch competitions, and workshops: the programs connecting student founders across our partner universities.",
};

/**
 * /events — the program directory. One card per program (the 5
 * application-cycle programs plus the standing Community entry), driven
 * directly by src/content/programs.js. EventsHub owns the category/status
 * filtering and card rendering.
 */
export default async function EventsPage() {
  const items = programs.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: categoryLabel(p.type),
    status: getProgramStatus(p.slug),
    deadlineLabel: formatDeadline(p.closesAt),
    nextEventDate: p.nextEventDate,
    nextEventCity: p.nextEventCity,
    stats: p.stats,
  }));

  return <EventsHub programs={items} />;
}
