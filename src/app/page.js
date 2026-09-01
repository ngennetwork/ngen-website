import MissionSection from "@/components/about/MissionSection";
import CoreProgramsSection from "@/components/about/CoreProgramsSection";
import CommunitySection from "@/components/about/CommunitySection";
import NetworkConnectsSection from "@/components/about/NetworkConnectsSection";
import FeaturedStartupsSection from "@/components/about/FeaturedStartupsSection";
import EventsSection from "@/components/about/EventsSection";

/**
 * The home page. This is the ONLY place the Mission hero, University
 * Marquee, Core Programs (+ Trailblazers video), and How the Network
 * Connects render — the founders photo and founding statement that used
 * to sit right under the hero now live on their own page at
 * /about/mission-story, and Team/Sponsors have their own pages too (see
 * src/app/about/ and src/data/nav.js for the About dropdown).
 */
export default function Home() {
  return (
    <div>
      {/* a) Hero fold — the very first thing visible on load. */}
      <MissionSection />
      <hr className="rule-orange" />

      {/* b) University marquee — attendee pool, not partners */}
      <CommunitySection />
      <hr className="rule-orange" />

      {/* c) Core Programs bento — 4 pillar cards + the Trailblazers
          cinematic video banner, unified in one section */}
      <CoreProgramsSection />
      <hr className="rule-orange" />

      {/* d) How the Network Connects — dark navy bento, 3 initiatives + CTAs */}
      <NetworkConnectsSection />
      <hr className="rule-orange" />

      {/* e) Featured Startups */}
      <FeaturedStartupsSection />
      <hr className="rule-orange" />

      {/* f) Previous Speakers */}
      <EventsSection />
    </div>
  );
}
