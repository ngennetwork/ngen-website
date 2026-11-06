"use client";

import { site } from "@/content/site";
import ApplyForm from "@/components/challenge/ApplyForm";
import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
import PageHero from "@/components/layout/PageHero";
import Photo from "@/components/layout/Photo";
import PageLink from "@/components/ui/PageLink";

export default function ApplyScreen({ initialLang }) {
  return (
    <ChallengeShell initialLang={initialLang}>
      <ApplyBody />
    </ChallengeShell>
  );
}

function ApplyBody() {
  const { copy } = useLocale();
  const { apply, hero } = copy;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(copy.emailSubject)}`;

  return (
    <>
      <PageHero
        id="apply-title"
        title={apply.title}
        intro={apply.intro}
        action={
          <div className="flex flex-wrap gap-3">
            <a href="#application" className="btn btn-ink">
              {apply.cta}
            </a>
            <PageLink href="/startup-challenge#book" className="btn btn-ghost">
              {apply.book}
            </PageLink>
          </div>
        }
        aside={<Photo src={hero.photo.src} alt={hero.photo.alt} caption={hero.photo.caption} position={hero.photo.position} />}
      />
      <section id="application" aria-labelledby="application-title" className="bg-fog">
        <div className="wrap grid gap-y-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <h2 id="application-title" className="font-display text-h2">
              {apply.formTitle}
            </h2>
            <p className="text-lead text-slate">{apply.formIntro}</p>
            <p className="text-small text-slate">
              {apply.emailInstead}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
