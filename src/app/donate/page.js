import { SectionHeader } from "@/components/ui";

export const metadata = {
  title: "Donate",
  description:
    "Support NGEN's mission with a gift that funds travel grants, mentorship, and the programming connecting student founders across top universities.",
};

const IMPACT_ITEMS = [
  "Travel grants and stipends that make Trailblazers Conference accessible to founders who couldn't otherwise attend.",
  "Mentorship and programming that connects student founders with the operators and investors who've done it before.",
  "The day-to-day work of keeping NGEN's network, treks, pitch competitions, and community, running for the next generation of founders.",
];

/**
 * /donate. Embeds the Zeffy donation form directly
 * (Zeffy's embed URL pattern is https://www.zeffy.com/embed/donation-form/[form-id],
 * confirmed against Zeffy's own help docs) so a donor never leaves the
 * site - the NGEN header/nav and footer stay visible around it, this is
 * just the page's main content.
 *
 * If you later copy the exact embed snippet from the Zeffy dashboard
 * (Campaigns > ... > Share > More ways to share > Embed), it may include
 * a small auto-resize script - swap the iframe below for that snippet
 * and this page still works the same way.
 */
export default function SupportPage() {
  return (
    <div className="bg-bg py-16">
      <div className="container-page">
        <SectionHeader
          as="h1"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="Donate"
          subtext="Every gift goes directly toward connecting student founders with the resources, mentorship, and community they need to build."
          align="center"
        />

        <div className="mx-auto mt-10 max-w-2xl text-center text-body text-text-muted">
          <p>
            NGEN is a 501(c)(3) nonprofit connecting student founders, operators, and builders
            across top universities (EIN: 93-2106846). Your tax-deductible gift directly powers
            our intercollegiate programming, core operations, and student travel grants.
          </p>
          <p className="mt-4">
            Learn more:{" "}
            <a
              href="https://ngennetwork.org"
              className="font-semibold text-accent-ink hover:underline"
            >
              https://ngennetwork.org
            </a>
          </p>
          <p className="mt-2">
            Get Involved:{" "}
            <a href="mailto:info@ngennetwork.org" className="font-semibold text-accent-ink hover:underline">
              info@ngennetwork.org
            </a>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <h2 className="text-center font-sans text-lg font-bold text-surface-dark">
            Where your gift goes
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {IMPACT_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-neutral-200 bg-surface-card px-5 py-4 text-body text-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-surface-dark/10 shadow-sm"
          style={{ height: "700px" }}
        >
          <iframe
            title="Donation form powered by Zeffy"
            src="https://www.zeffy.com/embed/donation-form/donate-to-empower-entrepreneurs"
            style={{ position: "absolute", border: 0, top: 0, left: 0, width: "100%", height: "100%" }}
            allow="payment"
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-text/60">
          Having trouble with the form above? You can also{" "}
          <a
            href="https://www.zeffy.com/en-US/donation-form/donate-to-empower-entrepreneurs"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent-fill"
          >
            open it directly on Zeffy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
