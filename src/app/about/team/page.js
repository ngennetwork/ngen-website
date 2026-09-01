import { team } from "@/data/team";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamDirectory from "@/components/about/TeamDirectory";

export const metadata = {
  title: "Our Team",
  description:
    "Meet the student founders, directors, and campus leads who built and run NGEN, the intercollegiate entrepreneurship network connecting founders across top universities.",
};

/**
 * /about/team — the full roster, filterable by Core & Operations vs.
 * Campus Directors. Data lives in src/data/team.js; TeamDirectory owns
 * the tab state so this page can stay a server component with static
 * metadata. The recruiting banner below replaces the old standalone
 * /join-our-team route — it links out to /contact rather than embedding
 * a form.
 */
export default function TeamPage() {
  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        <SectionHeader
          as="h1"
          align="center"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="Our Team"
          subtext="NGEN is run by a team of student founders, directors, and campus leads who built it because they wished it existed on their own campus."
        />

        <div className="mx-auto mt-8 mb-10 flex w-fit max-w-full flex-col items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-surface-card px-5 py-4 text-center shadow-sm sm:flex-row sm:gap-6 sm:text-left">
          <p className="text-small font-medium text-text-primary">Interested in joining our team?</p>
          <Button href="/contact" variant="primary" size="sm" className="shrink-0">
            Get in Touch
          </Button>
        </div>

        <TeamDirectory team={team} />
      </div>
    </div>
  );
}
