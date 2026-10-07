import { home, pages } from "@/content/site";
import { firms, supporters } from "@/data/brands";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";
import LogoRow from "@/components/sections/LogoRow";

const { partners: copy } = home;

/**
 * The pitch to sponsors, from the conference site, on its own screen after
 * the proof (what founders raised, who spoke): the headline, the line under
 * it and the way in, then who has stood behind NGEN, in two honestly
 * labelled rows: companies that supported its events, and the firms its
 * speakers and alumni backers come from.
 */
export default function Partners() {
  return (
    <Section
      id="partners-title"
      title={copy.title}
      titleClassName="max-w-[24ch] font-display text-h2"
      intro={copy.intro}
      action={
        <PageLink href={copy.more.href} className="link text-base">
          {copy.more.label}
        </PageLink>
      }
    >
      <div className="flex flex-col gap-[clamp(1.75rem,4.5svh,3rem)]">
        <LogoRow id="supporters-label" label={pages.partner.supportersNote} items={supporters} />
        <LogoRow id="firms-label" label={pages.partner.firmsLabel} items={firms} />
      </div>
    </Section>
  );
}
