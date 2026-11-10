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

export const locales = {
  en,
  "zh-Hant": zhHant,
  "zh-Hans": zhHans,
};

export const challenge = en;
