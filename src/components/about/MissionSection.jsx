import MissionHero from "./mission/MissionHero";
import HeroCTAs from "./mission/HeroCTAs";

/**
 * The home page hero. Used to also carry the founders photo + founding
 * statement beat directly beneath it — that's now part of its own page
 * at /about/mission-story (see src/app/about/mission-story/page.js), so
 * this section is just the hero.
 *
 * No client-side mode-switching here on purpose — MissionHero handles
 * prefers-reduced-motion internally (see that file's comment) instead of
 * this component swapping in a different one, which used to cause a
 * layout-shift flash on every load.
 *
 * HeroCTAs is a separate component rendered here (not inside
 * MissionHero.jsx) so its GSAP entrance timeline and refs stay untouched.
 */
export default function MissionSection() {
  return (
    <section id="mission" className="bg-[var(--color-bg)]">
      <MissionHero />
      <HeroCTAs />
    </section>
  );
}
