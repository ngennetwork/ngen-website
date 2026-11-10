"use client";

import { createContext, useContext, useRef, useState } from "react";
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

  function onChoose(next) {
    if (next === value.lang) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      value.choose(next);
      return;
    }
    setShown(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      value.choose(next);
      setShown(true);
    }, 200);
  }

  return (
    <LocaleContext.Provider value={value}>
      <div lang={value.lang} className="challenge-pages challenge-i18n relative">
        <LanguageSwitcher lang={value.lang} label={value.copy.switcherLabel} onChoose={onChoose} />
        <div className="challenge-lang-fade" data-shown={shown ? "true" : "false"}>
          {children}
        </div>
        <div aria-hidden="true" className="h-24 nav:hidden" />
      </div>
    </LocaleContext.Provider>
  );
}
