import ApplyScreen from "@/components/challenge/ApplyScreen";
import { localeFrom, normalizeLang, pageMeta } from "@/components/challenge/content";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const copy = localeFrom(params?.lang);
  return pageMeta({ title: copy.meta.applyTitle, description: copy.meta.description, path: "/startup-challenge/apply" });
}

export default async function ApplyPage({ searchParams }) {
  const params = await searchParams;
  return <ApplyScreen initialLang={normalizeLang(params?.lang) || "en"} />;
}
