import { Albert_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/site";
import { site } from "@/content/site";

// NGEN's one family: 400 for headlines and reading, 500 for labels and buttons.
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const DEFAULT_TITLE = "NGEN | The Ivy League entrepreneurship network";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | NGEN",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: DEFAULT_TITLE,
    description: site.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: site.description,
  },
  icons: {
    // icon.svg swaps navy/white marks via an internal prefers-color-scheme
    // query, the only dark-mode switch Chrome/Edge/Firefox honor for tab
    // icons. It's listed last so Chrome prefers it; the media-tagged PNGs
    // are the fallback for Safari (no SVG favicons).
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)", type: "image/png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

// One version: NGEN at night (deep navy, glowing orange).
export const viewport = {
  themeColor: "#050e26",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={albertSans.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.timeline-line,.timeline-node{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      {/* Extensions like Grammarly add attributes to <body> before React loads; ignore just those. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[60] bg-paper px-4 py-3 text-small text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {site.labels.skipToContent}
        </a>
        <StructuredData />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
