import TallyEmbed from "@/components/TallyEmbed";

export const metadata = {
  title: "Capital Network — For Founders",
  description:
    "Get hand-curated warm intros to angels, operators, and early capital. From $5k micro-checks and grants to $500k+ rounds.",
};

const ELIGIBILITY_TIERS = [
  {
    name: "Micro-Grants & Prototype",
    range: "< $10k",
    description:
      "Grants, hackathons, initial prototype capital, and campus grant matching. Mostly non-dilutive.",
  },
  {
    name: "Early Pre-Seed",
    range: "$10k – $50k",
    description: "First angel SAFEs or convertible notes to build your MVP.",
  },
  {
    name: "Seed & Beyond",
    range: "$50k – $500k+",
    description: "Priced rounds and lead investor matching for scaling startups.",
  },
];

export default function CapitalNetworkFoundersPage() {
  return (
    <div className="bg-bg">
      <div className="container-page pb-20 pt-6 lg:pt-12">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6">
          {/* Headline — always first, kept to two lines on mobile */}
          <h1 className="font-sans text-2xl font-extrabold leading-tight text-accent-ink sm:text-3xl lg:col-start-1 lg:row-start-1 lg:text-h2">
            Capital &amp; Network Access for Student Founders
          </h1>

          {/* Supporting copy — below the form on mobile, left column on desktop */}
          <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-2">
            <p className="text-body text-text-muted lg:text-body-lg">
              Get hand-curated warm intros to angels, operators, and early capital. From $5k
              micro-checks and grants to $500k+ rounds. Every submission stays 100% confidential.
            </p>

            <div className="mt-6 space-y-3">
              {ELIGIBILITY_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl border border-accent-fill/30 bg-accent-fill/5 px-4 py-3"
                >
                  <p className="font-sans text-small font-semibold text-accent-ink">
                    {tier.name} · {tier.range}
                  </p>
                  <p className="mt-1 text-small text-text-muted">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form — immediately under the headline on mobile, right column on desktop */}
          <div className="rounded-2xl border border-neutral-200 bg-surface-card p-4 shadow-sm sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <TallyEmbed formId="44YLKk" title="Submit Your Startup to the NGEN Capital Network" />
          </div>
        </div>
      </div>
    </div>
  );
}
