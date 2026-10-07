import HomeHero from "@/components/home/HomeHero";
import Statement from "@/components/home/Statement";
import ProgramIndex from "@/components/home/ProgramIndex";
import Timeline from "@/components/home/Timeline";
import Ledger from "@/components/home/Ledger";
import SpeakerStrip from "@/components/home/SpeakerStrip";
import Partners from "@/components/home/Partners";
import Upcoming from "@/components/home/Upcoming";
import Closing from "@/components/home/Closing";

/**
 * Home, top to bottom: the range of campuses, what NGEN is, the programs
 * as an index, how it began, what founders raised, who spoke, who has
 * backed it (the pitch to sponsors), what's next, and the way in, over the
 * room itself.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <Statement />
      <ProgramIndex />
      <Timeline />
      <Ledger />
      <SpeakerStrip />
      <Partners />
      <Upcoming />
      <Closing />
    </>
  );
}
