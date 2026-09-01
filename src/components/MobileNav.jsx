"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import NavLabel from "./NavLabel";

// Slide-down drawer for <768px. Locks body scroll, traps Tab focus inside
// the panel while open, and closes on Esc or a backdrop click — `onClose`
// (owned by Header) also restores focus to the hamburger button.
export default function MobileNav({ isOpen, onClose, navGroups, ctaItems }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const panelRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    panelRef.current.querySelector("a[href], button:not([disabled])")?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 top-20 z-40 bg-surface-dark/50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="md:hidden fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-surface-dark/10 bg-bg px-5 pb-6 pt-2"
      >
        {navGroups.map((group) => (
          <div key={group.id} className="border-b border-surface-dark/10">
            <button
              type="button"
              className="focus-ring-light flex w-full items-center justify-between py-4 text-left font-sans font-medium text-text"
              aria-expanded={openAccordion === group.id}
              aria-controls={`mobile-accordion-${group.id}`}
              onClick={() =>
                setOpenAccordion((cur) => (cur === group.id ? null : group.id))
              }
            >
              <NavLabel label={group.label} />
              <svg
                width="12"
                height="8"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
                className={`transition-transform ${
                  openAccordion === group.id ? "rotate-180" : ""
                }`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {openAccordion === group.id && (
              <div id={`mobile-accordion-${group.id}`} className="pb-4 pl-2">
                {group.items.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`focus-ring-light block py-2 text-sm ${
                      pathname === sub.href
                        ? "font-semibold text-accent-fill"
                        : "text-text hover:text-accent-fill"
                    }`}
                    onClick={onClose}
                  >
                    <NavLabel label={sub.label} sub />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {ctaItems.map((item) => (
          <Button
            key={item.label}
            variant={item.type === "button-secondary" ? "secondary" : "primary"}
            size="sm"
            href={item.href}
            fullWidth
            className="mt-4"
            onClick={onClose}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  );
}
