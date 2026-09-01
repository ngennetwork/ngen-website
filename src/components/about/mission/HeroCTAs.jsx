import HeroMetrics from "./HeroMetrics";

/**
 * Sits directly below MissionHero's full-bleed photo (see
 * MissionSection.jsx) — the headline/CTA beat the hero's scroll-cue
 * chevron points at. Deliberately NOT inside MissionHero.jsx itself so
 * its GSAP entrance timeline and layout are never touched.
 */
export default function HeroCTAs() {
  return (
    <div className="container-page py-16 text-center md:py-20">
      <h1 className="mx-auto max-w-3xl font-[family-name:var(--font-display)] text-h2 font-extrabold text-text md:text-h1">
        Where students launch companies, connect, and build across campuses.
      </h1>
      <HeroMetrics />
    </div>
  );
}
