import ApplyScreen from "@/components/challenge/ApplyScreen";
import { localeFrom, normalizeLang } from "@/components/challenge/content";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const copy = localeFrom(params?.lang);
  return { title: copy.apply.title, description: copy.apply.intro };
}

export default async function ApplyPage({ searchParams }) {
  const params = await searchParams;
  return <ApplyScreen initialLang={normalizeLang(params?.lang) || "en"} />;
}
