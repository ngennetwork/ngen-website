"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LOCALE_IDS, locales, normalizeLang } from "@/components/challenge/content";

const STORAGE_KEY = "ngen-challenge-lang";
const CHANGE = "challenge-lang";

function subscribe(onStoreChange) {
  window.addEventListener(CHANGE, onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE, onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl) return normalizeLang(fromUrl) || "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return LOCALE_IDS.includes(stored) ? stored : "en";
}

export function useChallengeLang(initialLang) {
  const start = normalizeLang(initialLang) || "en";
  const lang = useSyncExternalStore(subscribe, readLang, () => start);

  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);

  function choose(next) {
    if (!LOCALE_IDS.includes(next)) return;
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CHANGE));
  }

  return { lang, copy: locales[lang] || locales.en, choose };
}
