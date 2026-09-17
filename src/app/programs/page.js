import { programs, getProgramStatus, formatDeadline } from "@/content/programs";
import { categoryLabel } from "@/components/events/shared";
import EventsHub from "@/components/events/EventsHub";

export const metadata = {
  title: "Programs",
  description:
    "Explore NGEN's four core programs: Trailblazers Conferences, Lab-to-Startup Conferences, Founder Treks, and Pitch Competitions.",
};

/**
 * /programs — the evergreen program directory. One card per program,
 * driven directly by src/content/programs.js. EventsHub owns the
 * category/status filtering and card rendering.
 *
 * Application cycles and real event instances live at /events, not here.
 */
export default async function ProgramsPage() {
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
