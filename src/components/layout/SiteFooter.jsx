import { site } from "@/content/site";
import Logo from "@/components/brand/Logo";
import PageLink from "@/components/ui/PageLink";
import ExternalLink from "@/components/ui/ExternalLink";

const { footer, nav } = site;

// Every page in the nav, About's children included (minus the one that is About itself).
const pageLinks = nav.links.flatMap((link) => [link, ...(link.children ?? []).filter((c) => c.href !== link.href)]);

/**
 * Brand, mission and the one action on the left; three labelled columns of
 * links, spaced so each one is easy to hit; the legal line, copyright
 * included, runs the full measure at the bottom (nothing in a corner).
 * The last column ends on the right margin, in line with the nav.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  // Two sentences, two lines on wide screens: who NGEN is, then what that
  // means for a gift, with the copyright closing the second.
  const [registered, deductible] = footer.legal.split(/(?<=\)\.)\s/);

  return (
    <footer className="grain bg-ink-night text-on-dark">
      <div className="wrap pt-[clamp(4rem,8vw,6rem)] pb-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 sm:col-span-3 lg:col-span-4">
            <Logo tone="light" className="h-16" />
            <p className="max-w-[28ch] text-lead text-on-dark/80">{site.mission}</p>
            <PageLink href={nav.cta.href} className="btn btn-paper">
              {nav.cta.label}
            </PageLink>
          </div>

          <FooterColumn title={footer.columns.pages} className="lg:col-span-2 lg:col-start-6">
            {pageLinks.map((link) => (
              <PageLink key={link.href} href={link.href} className="footer-link">
                {link.label}
              </PageLink>
            ))}
          </FooterColumn>

          <FooterColumn title={footer.columns.involved} className="lg:col-span-3">
            {footer.involved.map((link) => (
              <PageLink key={link.href} href={link.href} className="footer-link">
                {link.label}
              </PageLink>
            ))}
            <a href={`mailto:${site.email}`} className="footer-link whitespace-nowrap">
              {site.email}
            </a>
          </FooterColumn>

          <FooterColumn title={footer.columns.follow} className="lg:col-span-2">
            {footer.follow.map((link) => (
              <ExternalLink key={link.href} href={link.href} className="footer-link">
                {link.label}
              </ExternalLink>
            ))}
          </FooterColumn>
        </div>

        <p className="mt-[clamp(3.5rem,7vw,5rem)] border-t border-on-dark/10 pt-6 text-small text-mist">
          <span className="lg:block">{registered}</span> {deductible} © {year} {footer.copyright}.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="mb-5 text-small text-mist">{title}</h2>
      <div className="flex flex-col items-start gap-3.5">{children}</div>
    </div>
  );
}
