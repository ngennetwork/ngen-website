import ChallengeHome from "@/components/challenge/ChallengeHome";
import { localeFrom, normalizeLang } from "@/components/challenge/content";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const copy = localeFrom(params?.lang);
  return { title: copy.meta.title, description: copy.meta.description };
}

export default async function StartupChallengePage({ searchParams }) {
  const params = await searchParams;
  return <ChallengeHome initialLang={normalizeLang(params?.lang) || "en"} />;
}
