"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange) => {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
};

let cached = 0;
const getSnapshot = () => {
  // Round to the minute so the snapshot is stable between renders.
  const now = Math.floor(Date.now() / 60_000) * 60_000;
  if (now !== cached) cached = now;
  return cached;
};

/** Current time on the client (minute precision); null during server render. */
export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

/** Whole days from now until `iso`, or null on the server. */
export function useDaysUntil(iso) {
  const now = useNow();
  if (now === null) return null;
  const ms = new Date(iso).getTime() - now;
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
