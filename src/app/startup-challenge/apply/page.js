import { challenge } from "@/components/challenge/content";
import { site } from "@/content/site";
import ApplyForm from "@/components/challenge/ApplyForm";
import PageHero from "@/components/layout/PageHero";
import Photo from "@/components/layout/Photo";
import PageLink from "@/components/ui/PageLink";

const { apply } = challenge;

export const metadata = {
  title: "Apply",
  description: apply.intro,
};

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("NGEN Start-Up Challenge application")}`;

export default async function ApplyPage({ searchParams }) {
  const params = await searchParams;
  const tier = typeof params?.tier === "string" ? params.tier : "";

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
        aside={
          <Photo
            src={challenge.hero.photo.src}
            alt={challenge.hero.photo.alt}
            caption={challenge.hero.photo.caption}
            position={challenge.hero.photo.position}
          />
        }
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
            <ApplyForm initialTier={tier} />
          </div>
        </div>
      </section>
    </>
  );
}
