import { speakers } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";
import { SectionHeader } from "@/components/ui";

/**
 * Previous Speakers. The Trailblazers video that used to pair with a text
 * blurb here now renders as its own cinematic banner directly below Core
 * Programs (see src/app/page.js); the old "Events & Programs" 6-card grid
 * and "Featured Startups" section that used to live here have been
 * superseded by the homepage's CoreProgramsSection / FeaturedStartupsSection
 * components; "In the News" has been folded into StartupCard's
 * funding/press badge instead — this section keeps the content nothing
 * else covers.
 */
export default function EventsSection() {
  return (
    <section id="events" className="bg-[var(--color-bg)] py-10 md:py-12">
      <div className="container-page">
        <SectionHeader title="Previous Speakers" align="center" />
        <div className="mt-6 grid items-start gap-6 sm:grid-cols-3">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
