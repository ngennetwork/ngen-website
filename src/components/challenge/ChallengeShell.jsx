"use client";

import { createContext, useContext } from "react";
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
  return (
    <LocaleContext.Provider value={value}>
      <div lang={value.lang} className="challenge-i18n relative">
        <LanguageSwitcher lang={value.lang} label={value.copy.switcherLabel} onChoose={value.choose} />
        {children}
      </div>
    </LocaleContext.Provider>
  );
}
