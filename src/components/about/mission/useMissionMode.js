"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether to show the animated Mission hero or the
 * prefers-reduced-motion fallback (no motion, final state only).
 * Defaults to "reduced" until mounted, so there's no flash of the
 * animated version before we know the real media query result.
 */
export function useMissionMode() {
  const [mode, setMode] = useState("reduced");

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      setMode(reducedQuery.matches ? "reduced" : "animated");
    }

    update();
    reducedQuery.addEventListener("change", update);
    return () => reducedQuery.removeEventListener("change", update);
  }, []);

  return mode;
}
