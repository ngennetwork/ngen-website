"use client";

import { useEffect } from "react";

export default function TallyEmbed({ formId, title, className = "", transparentBackground = true }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`pt-0 mt-0 ${className}`} style={{ paddingTop: 0, marginTop: 0 }}>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?hideTitle=1&alignLeft=1&transparentBackground=${
          transparentBackground ? 1 : 0
        }&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{ verticalAlign: "top", border: "none" }}
        title={title}
      />
    </div>
  );
}
