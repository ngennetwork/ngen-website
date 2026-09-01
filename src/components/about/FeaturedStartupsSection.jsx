import { getFeaturedStartups } from "@/content/startups";
import { Card, Badge, SectionHeader } from "@/components/ui";
import StartupCard from "@/components/startups/StartupCard";

function formatCapital(usd) {
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
  if (usd >= 1_000) return `$${Math.round(usd / 1_000)}K`;
  return `$${usd}`;
}

// Funding badge if a round is disclosed, else the accelerator name, else
// no badge — never fabricate a number for undisclosed rounds.
function tractionBadge(startup) {
  if (startup.fundingRaisedUsd) {
    return (
      <Badge tone="dark" variant="solid">
        {formatCapital(startup.fundingRaisedUsd)} Raised
      </Badge>
    );
  }
  if (startup.accelerator) {
    return (
      <Badge tone="dark" variant="solid">
        {startup.accelerator}
      </Badge>
    );
  }
  return null;
}

export default function FeaturedStartupsSection() {
  const featuredStartups = getFeaturedStartups();

  return (
    <section id="startups" className="bg-bg py-16 md:py-20">
      <div className="container-page">
        <SectionHeader
          title="Featured Startups"
          subtext="Companies founded by students from the 10 universities represented in our network."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 max-w-6xl mx-auto md:grid-cols-3">
          {featuredStartups.map((s) => (
            <Card key={s.id} variant="light" padded={false} hover className="flex flex-col overflow-hidden">
              <StartupCard startup={s} showFounders={false} badge={tractionBadge(s)} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
