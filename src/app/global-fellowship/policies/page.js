import ChallengePolicies from "@/components/challenge/ChallengePolicies";
import { normalizeLang, pageMeta } from "@/components/challenge/content";
import { policies } from "@/components/challenge/policies";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = policies[normalizeLang(params?.lang) || "en"] || policies.en;
  return pageMeta({ title: page.meta.title, description: page.meta.description, path: "/global-fellowship/policies" });
}

export default async function FellowshipPoliciesPage({ searchParams }) {
  const params = await searchParams;
  return <ChallengePolicies initialLang={normalizeLang(params?.lang) || "en"} />;
}
