import { en } from "@/components/challenge/locales/en";
import { zhHans } from "@/components/challenge/locales/zh-Hans";
import { zhHant } from "@/components/challenge/locales/zh-Hant";

export const LOCALE_IDS = ["en", "zh-Hant", "zh-Hans"];

export function normalizeLang(value) {
  if (value === "zh-Hant" || value === "zh-TW" || value === "zh-HK") return "zh-Hant";
  if (value === "zh-Hans" || value === "zh-CN" || value === "zh") return "zh-Hans";
  if (value === "en") return "en";
  return null;
}

export function localeFrom(value) {
  return locales[normalizeLang(value)] || en;
}

// The link preview card (iMessage, WhatsApp, WeChat, social), 1200x630.
const OG_IMAGE = {
  url: "/startup-challenge/og-fellowship.jpg",
  width: 1200,
  height: 630,
  alt: "NGEN Global Fellowship, January to June 2027",
};

export function pageMeta({ title, description, path }) {
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: path, siteName: "NGEN", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export const locales = {
  en,
  "zh-Hant": zhHant,
  "zh-Hans": zhHans,
};

export const challenge = en;
