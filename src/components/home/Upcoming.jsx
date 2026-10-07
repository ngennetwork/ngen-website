import { home, site } from "@/content/site";
import Section from "@/components/layout/Section";
import ExternalLink from "@/components/ui/ExternalLink";
import LumaCalendar from "@/components/sections/LumaCalendar";
import ConferenceCard from "./ConferenceCard";

const { calendar } = home;

/**
 * What's next: the flagship's ticket and the live Luma calendar side by
 * side, one height, margin to margin.
 */
export default function Upcoming() {
  return (
    <Section
      id="calendar-title"
      tone="fog"
      title={calendar.title}
      intro={calendar.body}
      action={
        <ExternalLink href={site.links.luma} className="link text-base">
          {calendar.follow}
        </ExternalLink>
      }
    >
      <div id="events" className="grid gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-4">
          <ConferenceCard className="h-full" ground="bg-fog" />
        </div>
        <LumaCalendar className="lg:col-span-8" frameClassName="h-[380px] sm:h-[clamp(24rem,51svh,37.5rem)]" />
      </div>
    </Section>
  );
}
