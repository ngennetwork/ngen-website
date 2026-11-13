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
    // The link preview card (iMessage, WhatsApp, LinkedIn), 1200x630.
    images: [{ url: "/home/og-ngen.jpg", width: 1200, height: 630, alt: "NGEN, the Ivy League entrepreneurship network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: site.description,
    images: ["/home/og-ngen.jpg"],
  },
  icons: {
    // A white mountain on a solid navy tile, so the tab icon reads the same
    // on light and dark browser themes. The fellowship layout swaps in green.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icon-apple.png",
  },
};

// One version: NGEN at night (deep navy, solid orange).
export const viewport = {
  themeColor: "#050e26",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={albertSans.variable}>
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
