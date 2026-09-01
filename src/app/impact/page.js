import { universities } from "@/data/universities";
import { getFeaturedStartups } from "@/content/startups";
import { Button, Card, Badge, LogoGrid, SectionHeader } from "@/components/ui";
import StartupCard from "@/components/startups/StartupCard";

export const metadata = {
  title: "Impact & Metrics",
  description:
    "Measuring the growth, capital raised, and reach of student founders across NGEN's top university ecosystems.",
};

// TODO: upload the real 2026 impact report PDF to /public/reports and
// point this at the final filename before launch.
const IMPACT_REPORT_URL = "/reports/ngen-2026-impact-report.pdf";

const METRICS = [
  { value: "$10M+", label: "Founder Capital Raised" },
  { value: "11", label: "Partner Universities" },
  { value: "5", label: "Signature Programs" },
];

function fundingBadge(startup) {
  if (startup.fundingRaisedUsd) {
    const usd = startup.fundingRaisedUsd;
    const formatted =
      usd >= 1_000_000 ? `$${(usd / 1_000_000).toFixed(1)}M` : `$${Math.round(usd / 1_000)}K`;
    return (
      <Badge tone="dark" variant="solid">
        {formatted} Raised
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

export default function ImpactPage() {
  const universityLogos = universities.map((u) => ({
    id: u.name,
    name: u.name,
    logo: u.logo,
  }));
  const spotlightStartups = getFeaturedStartups();

  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        <SectionHeader
          as="h1"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="Our Impact & Ecosystem Footprint"
          subtext="Measuring the growth, capital raised, and reach of student founders across top university ecosystems."
          align="center"
        >
          <div className="flex justify-center">
            <Button variant="primary" href={IMPACT_REPORT_URL}>
              Download 2026 Impact Report (PDF)
            </Button>
          </div>
        </SectionHeader>

        {/* Metrics bar */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {METRICS.map((m) => (
            <Card key={m.label} className="text-center">
              <div className="font-sans text-h1 font-extrabold text-accent-ink">{m.value}</div>
              <div className="mt-1 text-caption uppercase tracking-wide text-text-muted">
                {m.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Represented universities */}
        <section className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-center font-sans text-h3 font-extrabold text-text">
            Represented Universities
          </h2>
          <div className="mt-10">
            <LogoGrid items={universityLogos} surface="light" />
          </div>
        </section>

        {/* Alumni startup spotlights */}
        <section className="mx-auto mt-20 max-w-6xl">
          <h2 className="text-center font-sans text-h3 font-extrabold text-text">
            Alumni Startup Spotlights
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {spotlightStartups.map((startup) => (
              <Card
                key={startup.id}
                variant="light"
                padded={false}
                hover
                className="flex flex-col overflow-hidden"
              >
                <StartupCard startup={startup} showFounders={false} badge={fundingBadge(startup)} />
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
