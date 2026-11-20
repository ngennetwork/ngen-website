import ChallengeHome from "@/components/challenge/ChallengeHome";
import { localeFrom, normalizeLang, pageMeta } from "@/components/challenge/content";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const copy = localeFrom(params?.lang);
  return pageMeta({ title: copy.meta.title, description: copy.meta.description, path: "/global-fellowship" });
}

export default async function StartupChallengePage({ searchParams }) {
  const params = await searchParams;
  return <ChallengeHome initialLang={normalizeLang(params?.lang) || "en"} />;
}
