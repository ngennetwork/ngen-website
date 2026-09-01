import { Button, Card, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "Partner",
  description:
    "Partner with NGEN to power the next generation of founders across top university ecosystems — grant funding, platform credits, and hospitality support.",
};

const PILLARS = [
  {
    name: "Foundations & Family Offices",
    description:
      "Grant funding for intercollegiate conferences, pitch prize pools, and diversity initiatives.",
  },
  {
    name: "Corporations & Tech Platforms",
    description:
      "API credits, cloud infrastructure, masterclasses, and campus recruiting access.",
  },
  {
    name: "Venues & Hospitality",
    description: "Hosting founder treks, regional summits, and investor dinners.",
  },
];

/**
 * /partner — the action page for an organization that wants to partner
 * with NGEN (grants, platform credits, venues). Supersedes the old
 * /sponsor page.
 */
export default function PartnerPage() {
  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        <SectionHeader
          as="h1"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="Partner with NGEN"
          subtext="We collaborate with corporations, foundations, family offices, and tech platforms to power the next generation of founders across top university ecosystems."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Card key={pillar.name} hover className="flex flex-col gap-3">
              <h3 className="text-h4 font-sans font-extrabold text-text">{pillar.name}</h3>
              <p className="text-body text-text-muted">{pillar.description}</p>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-surface-dark px-8 py-14 text-center text-white">
          <h2 className="font-sans text-2xl font-bold">
            Put your organization in front of student founders.
          </h2>
          <p className="mt-4 text-white/85">
            Tell us what you&rsquo;re looking for and we&rsquo;ll put together a partnership
            proposal that fits.
          </p>
          <Button variant="primary" href="mailto:info@ngennetwork.org" className="mt-8">
            Start a conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
