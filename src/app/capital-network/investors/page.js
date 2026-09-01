import { Button, SectionHeader } from "@/components/ui";
import TallyEmbed from "@/components/TallyEmbed";

export const metadata = {
  title: "Capital Network — For Investors",
  description:
    "Connect directly with vetted student founders across top university ecosystems through NGEN's hand-curated angel and investor network.",
};

const HNW_ZEFFY_URL =
  "https://www.zeffy.com/en-US/donation-form/power-the-intercollegiate-founder-ecosystem";

export default function CapitalNetworkInvestorsPage() {
  return (
    <div className="bg-bg">
      <div className="container-page py-20">
        {/* Hero */}
        <SectionHeader
          as="h1"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="NGEN Angel & Investor Network"
          subtext="The NGEN Capital Network connects accredited angels and VCs with hand-curated student founders across top university ecosystems."
          align="center"
        />

        <p className="mx-auto mt-4 max-w-2xl text-center text-body text-text-muted">
          <span className="font-semibold text-text">How it works:</span> We do not maintain a
          public pitch database or send cold blasts. Submissions are reviewed by our team to send
          you curated roundups of vetted student startups matched strictly to your check size and
          sector focus, with direct warm intros facilitated upon request.
        </p>

        {/* How deal flow works */}
        <section className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-center font-sans text-h3 font-extrabold text-text">
            How Deal Flow Works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Vetting",
                copy: "Founders submit pitch materials for internal review.",
              },
              {
                step: "Step 2",
                title: "Matching",
                copy: "We pair curated deals with your check size and sector preferences.",
              },
              {
                step: "Step 3",
                title: "Double Opt-in Intro",
                copy: "You receive a warm email intro only when both sides confirm interest.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-neutral-200 bg-surface-card px-6 py-8 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1A305A] font-sans text-small font-bold text-white">
                  {s.step.replace("Step ", "")}
                </div>
                <p className="mt-4 font-sans text-small font-semibold uppercase tracking-wide text-accent-fill">
                  {s.step} – {s.title}
                </p>
                <p className="mt-2 text-body text-text-muted">{s.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selective investor request form */}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center font-sans text-h3 font-extrabold text-text">
            Request Deal Flow Access
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-body text-text-muted">
            Join our network of angels, VC partners, and alumni operators supporting student
            founders.
          </p>
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-surface-card p-6 shadow-sm">
            <TallyEmbed formId="vG84j4" title="Join the NGEN Capital Network as an Investor" />
          </div>
        </section>

        {/* Support the innovation engine */}
        <section className="mx-auto mt-20 max-w-3xl rounded-2xl bg-surface-dark px-8 py-14 text-center text-white">
          <h2 className="font-sans text-2xl font-bold">
            Support the Intercollegiate Innovation Engine
          </h2>
          <p className="mt-4 text-white/85">
            Review our direct outcomes in our 2026 Impact Report before making a 100%
            tax-deductible contribution (EIN: 93-2106846).
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="dark" href="/impact">
              View 2026 Impact Report →
            </Button>
            <Button variant="primary" href={HNW_ZEFFY_URL}>
              Make Tax-Deductible Gift
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
