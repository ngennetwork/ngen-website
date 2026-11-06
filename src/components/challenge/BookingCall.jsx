"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import ExternalLink from "@/components/ui/ExternalLink";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/** Calendly's inline widget. Colors match the page; the script resizes the frame to the calendar. */
function widgetUrl(url) {
  const next = new URL(url);
  next.searchParams.set("background_color", "0d1d45");
  next.searchParams.set("text_color", "eef3ff");
  next.searchParams.set("primary_color", "ff5a14");
  return next.toString();
}

export default function BookingCall({ booking }) {
  const parentRef = useRef(null);
  const url = widgetUrl(booking.embedUrl || booking.url);

  useEffect(() => {
    if (!booking.embed) return undefined;

    function onMessage(event) {
      if (event.origin !== "https://calendly.com") return;
      const data = event.data;
      if (!data || data.event !== "calendly.page_height" || !data.payload?.height) return;
      const height = data.payload.height;
      if (parentRef.current) parentRef.current.style.height = typeof height === "number" ? `${height}px` : height;
    }

    window.addEventListener("message", onMessage);
    initWidget(parentRef.current, url, booking.iframeTitle);
    return () => window.removeEventListener("message", onMessage);
  }, [booking.embed, booking.iframeTitle, url]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <ExternalLink href={booking.url} className="btn btn-ink self-start">
        {booking.cta}
      </ExternalLink>
      {booking.embed ? (
        <>
          <Script src={WIDGET_SRC} strategy="afterInteractive" onLoad={() => initWidget(parentRef.current, url, booking.iframeTitle)} />
          <div
            ref={parentRef}
            className="h-[700px] w-full min-w-0 overflow-hidden rounded-xl bg-paper [&_iframe]:h-full [&_iframe]:max-w-full [&_iframe]:min-w-0 [&_iframe]:w-full"
            data-url={url}
          />
        </>
      ) : null}
    </div>
  );
}

function initWidget(parent, url, title) {
  if (!parent || !window.Calendly || parent.querySelector("iframe")) return;
  window.Calendly.initInlineWidget({ url, parentElement: parent });
  const frame = parent.querySelector("iframe");
  if (!frame) return;
  frame.title = title;
  frame.style.width = "100%";
  frame.style.minWidth = "0";
  frame.style.maxWidth = "100%";
}
