"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui";

const JOIN_HREF = "https://tally.so/r/rjQVD2";

// Slide-down drawer for <sm — holds the "Join the Network" CTA that
// doesn't fit next to Apply at that width. Closes on Esc or a backdrop
// click; `onClose` (owned by Header) also restores focus to the hamburger.
export default function MobileNav({ isOpen, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    panelRef.current.querySelector("a[href]")?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 top-20 z-40 bg-surface-dark/50 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="sm:hidden fixed inset-x-0 top-20 z-50 border-t border-surface-dark/10 bg-bg px-5 py-6"
      >
        <Button variant="secondary" size="sm" href={JOIN_HREF} fullWidth onClick={onClose}>
          Join the Network
        </Button>
      </div>
    </>
  );
}
