"use client";

import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
import PageLink from "@/components/ui/PageLink";
import { policies } from "@/components/challenge/policies";

export default function ChallengePolicies({ initialLang }) {
  return (
    <ChallengeShell initialLang={initialLang}>
      <Policies />
    </ChallengeShell>
  );
}

function Policies() {
  const { lang } = useLocale();
  const page = policies[lang] || policies.en;

  return (
    <div className="bg-snow pb-20 pt-10 text-ink lg:pt-36">
      <div className="wrap max-w-[46rem]">
        <PageLink href="/global-fellowship" className="link text-small text-slate">
          {page.back}
        </PageLink>
        <h1 className="mt-6 font-display text-h2">{page.title}</h1>
        <p className="mt-4 text-lead text-slate">{page.intro}</p>
        <p className="mt-3 text-small text-slate">{page.updated}</p>

        <nav aria-label={page.title} className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-small">
          {page.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="link text-ink">
              {section.title}
            </a>
          ))}
        </nav>

        {page.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="mt-10 scroll-mt-28 border-t border-ink/10 pt-8">
            <h2 id={`${section.id}-title`} className="font-display text-[1.6rem] leading-tight">
              {section.title}
            </h2>
            <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 marker:text-ink/40">
              {section.items.map((item) => (
                <li key={item} className="text-base leading-relaxed text-slate">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
