import { pages, site } from "@/content/site";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import Photo from "@/components/layout/Photo";
import ExternalLink from "@/components/ui/ExternalLink";

const copy = pages.donate;

export const metadata = {
  title: "Donate",
  description: copy.intro,
};

/**
 * A gift, start to finish on one page: where it goes, then the Zeffy form
 * itself (its embed URL pattern is zeffy.com/embed/donation-form/[form-id]),
 * so a donor never leaves the site.
 */
export default function DonatePage() {
  return (
    <>
      <PageHero
        id="donate-title"
        title={copy.title}
        intro={copy.intro}
        action={
          <a href="#give" className="btn btn-ink">
            {copy.formTitle}
          </a>
        }
        aside={
          <Photo
            // TODO(photo): replace; this first-conference photo is used on four pages.
            src="/about/events/Copy of DSC06515.jpg"
            alt="Student founders in the audience at an NGEN event, one asking a question into a microphone"
            caption="Student founders at an NGEN event."
            priority
          />
        }
      />

      <PageSection id="where-title" title={copy.whereTitle} tone="band">
        <ul className="flex flex-col gap-8">
          {copy.where.map((item) => (
            <li key={item.title} className="grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
              <h3 className="font-display text-h3">{item.title}</h3>
              <p className="text-lead text-slate sm:pt-0.5">{item.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <div id="give">
        <PageSection
          id="give-title"
          title={copy.formTitle}
          aside={<p className="text-small text-slate">EIN: {site.ein}</p>}
        >
          <div className="relative h-[760px] overflow-hidden rounded-2xl bg-white ring-1 ring-ink/8">
            <iframe
              title="Donation form, powered by Zeffy"
              src={site.links.donateEmbed}
              allow="payment"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <p className="mt-4 text-small text-slate">
            <ExternalLink href={site.links.donateZeffy} className="link">
              {copy.formFallback}
            </ExternalLink>
          </p>
          <p className="mt-8 max-w-[72ch] text-small text-slate">{site.footer.legal}</p>
        </PageSection>
      </div>
    </>
  );
}
