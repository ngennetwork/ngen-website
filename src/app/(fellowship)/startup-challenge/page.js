import ChallengeHome from "@/components/challenge/ChallengeHome";
import { localeFrom, normalizeLang, pageMeta } from "@/components/challenge/content";

/**
 * The QR code on the printed Hong Kong flyer points here
 * (ngennetwork.org/startup-challenge). It shows the same page as
 * /global-fellowship, so visits from the flyer show up as their own page
 * in Vercel Web Analytics, and requests sent from it are tagged "flyer".
 * next.config adds ?lang=zh-Hant when no language is given, to match the flyer.
 */
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const copy = localeFrom(params?.lang);
  return {
    ...pageMeta({ title: copy.meta.title, description: copy.meta.description, path: "/global-fellowship" }),
    alternates: { canonical: "/global-fellowship" },
    robots: { index: false, follow: true },
  };
}

export default async function FlyerLandingPage({ searchParams }) {
  const params = await searchParams;
  return <ChallengeHome initialLang={normalizeLang(params?.lang) || "zh-Hant"} />;
}
