"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-in` on itself the first time it scrolls into view. CSS does
 * the rest (`.reveal`), so nothing re-renders.
 */
export default function InView({ as: Tag = "div", className, children, margin = "0px 0px -15% 0px", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
