import { pages } from "@/content/site";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import TallyEmbed from "@/components/TallyEmbed";
import CapitalSwitch from "@/components/sections/CapitalSwitch";

const copy = pages.capitalFounders;

export const metadata = {
  title: "Capital Network for founders",
  description: copy.intro,
};

/**
 * Founders who are raising: the header's right side is the ladder of what
 * NGEN matches, from micro-grants to seed, rising as it goes; the form
 * follows.
 */
export default function CapitalNetworkFoundersPage() {
  return (
    <>
      <PageHero
        id="capital-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <div className="flex flex-col items-start gap-8">
            <a href="#submit" className="btn btn-ink">
              {copy.formTitle}
            </a>
            <CapitalSwitch current="founders" />
          </div>
        }
        aside={
          <section aria-labelledby="tiers-title" className="flex flex-col gap-4">
            <h2 id="tiers-title" className="text-small text-slate">
              {copy.tiersTitle}
            </h2>
            {/* Listed largest first, so the ladder rises toward the top */}
            <ol className="flex flex-col-reverse gap-3">
              {copy.tiers.map((tier) => (
                <li key={tier.name} className="grid gap-x-6 gap-y-1 rounded-xl bg-paper px-5 py-6 ring-1 ring-ink/6 sm:grid-cols-[8.5rem_1fr] lg:py-7">
                  <span className="font-display text-[1.375rem] leading-tight tracking-[-0.02em] tabular">{tier.range}</span>
                  <span className="flex flex-col gap-1">
                    <span className="font-medium">{tier.name}</span>
                    <span className="text-small text-slate">{tier.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        }
      />

      <div id="submit">
        <PageSection id="submit-title" title={copy.formTitle} tone="band">
          <div className="rounded-2xl bg-white p-[clamp(1rem,3vw,2rem)] ring-1 ring-ink/6">
            <TallyEmbed formId="44YLKk" title="Submit your startup to the NGEN Capital Network" />
          </div>
        </PageSection>
      </div>
    </>
  );
}
