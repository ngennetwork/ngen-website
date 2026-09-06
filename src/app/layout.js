import { Marck_Script, Figtree, Albert_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// The "NGEN" hero wordmark's font (see --font-ngen in globals.css). Only
// a Regular weight file was supplied — the browser will synthesize bold
// for font-extrabold, which is fine for a display wordmark like this.
const codecPro = localFont({
  src: "../fonts/CodecPro-Regular.ttf",
  variable: "--font-codec-pro",
  weight: "400",
});

const marckScript = Marck_Script({
  variable: "--font-marck-script",
  subsets: ["latin"],
  weight: "400",
});

// Sitewide body/secondary font (see --font-body in globals.css).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Home page heading font (see .home-heading-albert-sans in globals.css).
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEFAULT_TITLE = "NGEN";
const DEFAULT_DESCRIPTION =
  "NGEN is the center of gravity for intercollegiate entrepreneurship across top universities - connecting early-stage student founders with each other and with the investors who back them.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | NGEN",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${marckScript.variable} ${codecPro.variable} ${figtree.variable} ${albertSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StructuredData />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
