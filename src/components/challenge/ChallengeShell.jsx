"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import LanguageSwitcher from "@/components/challenge/LanguageSwitcher";
import { useChallengeLang } from "@/components/challenge/useChallengeLang";

const LocaleContext = createContext(null);

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside ChallengeShell");
  return value;
}

export default function ChallengeShell({ initialLang, children }) {
  const value = useChallengeLang(initialLang);
  const [shown, setShown] = useState(true);
  const timer = useRef(0);

  useLayoutEffect(() => {
    const boot = document.getElementById("challenge-lang-boot");
    if (!boot) return;
    const wanted = document.documentElement.getAttribute("data-challenge-lang");
    if (!wanted || wanted === value.lang) boot.remove();
  }, [value.lang]);

  function onChoose(next) {
    if (next === value.lang) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      value.choose(next);
      return;
    }
    const y = window.scrollY;
    setShown(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      value.choose(next);
      setShown(true);
      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
      });
    }, 180);
  }

  return (
    <LocaleContext.Provider value={value}>
      <div lang={value.lang} className="challenge-pages challenge-i18n relative max-nav:pt-[calc(3.5rem+env(safe-area-inset-top))]">
        <div className="max-nav:sticky max-nav:top-[calc(3.5rem+env(safe-area-inset-top))] max-nav:z-40">
          <LanguageSwitcher lang={value.lang} label={value.copy.switcherLabel} onChoose={onChoose} />
        </div>
        <div className="challenge-lang-fade" data-shown={shown ? "true" : "false"}>
          {children}
        </div>
      </div>
    </LocaleContext.Provider>
  );
}
