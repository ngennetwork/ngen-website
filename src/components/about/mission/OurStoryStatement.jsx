"use client";

import { useMissionMode } from "./useMissionMode";
import FoundingStatement from "./FoundingStatement";

/**
 * Thin client wrapper so /about/mission-story/page.js can stay a server
 * component (it just needs to export `metadata`) while still respecting
 * prefers-reduced-motion for the founding statement's fade-in.
 */
export default function OurStoryStatement() {
  const mode = useMissionMode();
  return <FoundingStatement animated={mode !== "reduced"} />;
}
