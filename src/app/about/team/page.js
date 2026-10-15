import { pages } from "@/content/site";
import { leadership, team } from "@/data/team";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import Photo from "@/components/layout/Photo";
import TeamGrid from "@/components/sections/TeamGrid";

const copy = pages.team;

export const metadata = {
  title: "Team",
  description: copy.intro,
};

/**
 * Who runs NGEN, set like the conference's team page: Leadership, then the
 * Team, each a labelled group on the inner pages' grid. People carry tags
 * for what they work on and where they are instead of titles. All of it is
 * placeholder data for now (src/data/team.js).
 */
export default function TeamPage() {
  return (
    <>
      <PageHero
        id="team-title"
        title={copy.title}
        intro={copy.intro}
        aside={
          // TODO(photo): replace with a current team photo (this one shows the
          // old Trailblazers banner).
          <Photo
            src="/about/events/Copy of DSC06459-Enhanced-NR.jpg"
            alt="NGEN's organizers on stage at its first conference in New York"
            caption={copy.caption}
            position="50% 40%"
            priority
          />
        }
      />

      <PageSection id="leadership-title" title={copy.leadershipTitle} tone="band">
        <TeamGrid people={leadership} label={copy.leadershipTitle} />
      </PageSection>

      <PageSection id="team-members-title" title={copy.teamTitle}>
        <TeamGrid people={team} label={copy.teamTitle} />
      </PageSection>
    </>
  );
}
