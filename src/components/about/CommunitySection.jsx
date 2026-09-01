import UniversityMarquee from "@/components/UniversityMarquee";

/**
 * #community — university logo marquee. Rendered on the home page (see
 * src/app/page.js) - there is no separate /about route anymore.
 * Design choice: single-row auto-scrolling marquee (UniversityMarquee.jsx)
 * rather than the static honeycomb grid this section used to render —
 * a deliberate override of that grid's earlier "no marquee" rationale,
 * per updated homepage direction favoring a cleaner top-tier feel over
 * keeping every school equally emphasized at once.
 */
export default function CommunitySection() {
  return (
    <section id="community">
      <UniversityMarquee />
    </section>
  );
}
