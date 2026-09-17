import { navGroups } from "@/data/nav";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// The hub pages called out for Google Sitelinks. /programs and /about are
// group-level hubs (no direct nav item of their own — /about redirects to
// /about/mission-story), so they're named from their dropdown group's
// label; /events and /impact resolve off a real nav item.
const NAV_HUB_HREFS = ["/programs", "/events", "/impact", "/about"];

const GROUP_HUB_IDS = { "/programs": "programs", "/about": "about" };

function resolveNavHubName(href) {
  const groupId = GROUP_HUB_IDS[href];
  if (groupId) {
    return navGroups.find((group) => group.id === groupId)?.label ?? href;
  }
  for (const group of navGroups) {
    const match = group.items.find((item) => item.href === href);
    if (match) return match.label;
  }
  if (href === "/events") return "Apply";
  return href;
}

// Sitewide JSON-LD: Organization + WebSite + SiteNavigationElement. All
// source data here is static/internal (nav config, footer's own org info),
// never user input, so dangerouslySetInnerHTML carries no injection risk.
export default function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "NextGen Entrepreneurship Network",
      url: SITE_URL,
      email: "info@ngennetwork.org",
      sameAs: [
        "https://www.linkedin.com/company/ngen-network/",
        "https://www.instagram.com/ngennetwork/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...NAV_HUB_HREFS.map((href) => ({
      "@type": "SiteNavigationElement",
      name: resolveNavHubName(href),
      url: `${SITE_URL}${href}`,
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
