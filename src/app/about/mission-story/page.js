import FoundersPhoto from "@/components/about/mission/FoundersPhoto";
import OurStoryStatement from "@/components/about/mission/OurStoryStatement";

export const metadata = {
  title: "Mission & Story",
  description:
    "NGEN's mission to connect student founders across top universities, and the founding story behind the network.",
};

/**
 * /about/mission-story — merges what used to be two separate pages
 * (/about/mission and /about/our-story) into one: a streamlined editorial
 * hero (mission statement only, no pillar grid), then the founders photo +
 * founding statement below. Deliberately short — a couple of 30-second
 * reads back to back, not a long history.
 */
export default function MissionStoryPage() {
  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        <h1 className="mx-auto max-w-3xl text-center font-sans text-xl font-extrabold text-accent-ink md:text-2xl">
          Building the Center of Gravity for Student Innovation
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-neutral-600 md:text-xl">
          NGEN is a 501(c)(3) intercollegiate entrepreneurship organization dedicated to
          connecting students across{" "}
          <strong className="font-semibold text-accent-fill">top universities</strong>.
          By bridging campus ecosystems, NGEN serves as the{" "}
          <strong className="font-semibold text-accent-fill">
            center of gravity for student innovation
          </strong>
          .
        </p>

        <div className="mx-auto mt-16 max-w-3xl border-t-2 border-neutral-200 pt-12">
          <h2 className="eyebrow mb-6 text-center text-base">
            Our Story
          </h2>
          <FoundersPhoto />
          <OurStoryStatement />
        </div>
      </div>
    </div>
  );
}
