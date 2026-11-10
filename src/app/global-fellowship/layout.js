import { Hanken_Grotesk, Libre_Caslon_Display } from "next/font/google";

const display = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ilec-display",
  display: "swap",
  adjustFontFallback: true,
});

const sans = Hanken_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ilec-sans",
  display: "swap",
});

const LANG_BOOT = `(function(){try{var q=new URLSearchParams(location.search).get("lang");var s=localStorage.getItem("ngen-challenge-lang");var l=q||s||"en";if(l==="zh-TW"||l==="zh-HK")l="zh-Hant";else if(l==="zh-CN"||l==="zh")l="zh-Hans";if(l!=="en"&&l!=="zh-Hant"&&l!=="zh-Hans")l="en";document.documentElement.setAttribute("data-challenge-lang",l);if(l!=="en"){var e=document.createElement("style");e.id="challenge-lang-boot";e.textContent=".challenge-lang-fade{opacity:0}";document.head.appendChild(e);}}catch(err){}})();`;

export default function StartupChallengeLayout({ children }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* CJK files are large, so they load on this program only, not site-wide. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=Noto+Sans+TC:wght@400;500&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
