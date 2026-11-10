"use client";

import Image from "next/image";
import { site } from "@/content/site";
import ApplyForm from "@/components/challenge/ApplyForm";
import ChallengeShell, { useLocale } from "@/components/challenge/ChallengeShell";
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
      <header className="challenge-dark bg-ink-deep text-on-dark">
        <div className="relative h-[13.75rem] w-full overflow-hidden lg:hidden">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            fill
            sizes="220vw"
            loading="eager"
            fetchPriority="high"
            className="scale-[2.7] object-cover"
            style={{ objectPosition: "50% 88%", transformOrigin: "50% 88%" }}
          />
        </div>
        <div className="wrap grid items-start gap-6 pt-9 pb-12 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <p className="text-small font-medium text-[#fbfaf7]/80">{copy.name}</p>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#fbfaf7] px-4 py-3 text-small leading-snug text-[#151815] lg:px-3 lg:py-1.5 lg:leading-normal">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1c3a2a]" />
              {copy.deadlineLabel} {copy.deadline}
            </p>
            <h1 id="apply-title" className="max-w-[14ch] font-display text-[clamp(2.5rem,1.4rem+2.8vw,4rem)] leading-[1.02]">
              {apply.title}
            </h1>
            <p className="max-w-[42ch] text-lead text-on-dark/80">{apply.intro}</p>
            <p className="font-medium text-on-dark">{copy.noIdea}</p>
            <p className="max-w-[42ch] text-small text-on-dark/75">{copy.feesNote}</p>
            <a href="#application" className="btn btn-on-dark">
              {apply.cta}
            </a>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <figure className="flex flex-col gap-3">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  fill
                  sizes="200vw"
                  loading="eager"
                  fetchPriority="high"
                  className="scale-[3.3] object-cover"
                  style={{ objectPosition: "50% 88%", transformOrigin: "50% 88%" }}
                />
              </div>
              <figcaption className="text-small text-[#fbfaf7]/60">{hero.photo.caption}</figcaption>
            </figure>
          </div>
        </div>
      </header>
      <section id="application" aria-labelledby="application-title" className="bg-fog">
        <div className="wrap grid items-start gap-y-8 py-[clamp(3.5rem,7vw,5.5rem)] lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <h2 id="application-title" className="font-display text-h2">
              {apply.formTitle}
            </h2>
            <p className="text-lead text-slate">{apply.formIntro}</p>
            <p className="text-base text-slate">{copy.noIdea}</p>
            <p className="text-small text-slate">
              {apply.emailInstead}{" "}
              <a href={mailto} className="link text-ink">
                {site.email}
              </a>
            </p>
            <PageLink href="/startup-challenge#eligibility" className="link text-small">
              {copy.check.title}
            </PageLink>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
