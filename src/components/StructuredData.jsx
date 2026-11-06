import { SITE_URL, SITE_NAME } from "@/lib/site";
import { site } from "@/content/site";

// Sitewide JSON-LD: Organization + WebSite + one SiteNavigationElement per
// nav link. All source data is static (content/site.js), never user input,
// so dangerouslySetInnerHTML carries no injection risk.
export default function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: site.fullName,
      url: SITE_URL,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      sameAs: [site.links.linkedin, site.links.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...site.nav.links.map((link) => ({
      "@type": "SiteNavigationElement",
      name: link.label,
      url: `${SITE_URL}${link.href}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
