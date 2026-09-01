"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navGroups, ctaItems, NAV_LIVE } from "@/data/nav";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui";
import NavLabel from "@/components/NavLabel";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const headerRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const triggerRefs = useRef({});
  const mobileButtonRef = useRef(null);
  const pathname = usePathname();

  // Desktop dropdowns open on hover — a short close delay so crossing the
  // small gap between the trigger and the panel doesn't flicker it shut.
  function openOnHover(id) {
    clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(id);
  }
  function closeOnHoverOut() {
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }
  function closeDropdown(id) {
    setOpenDropdown(null);
    triggerRefs.current[id]?.focus();
  }
  function closeMobile() {
    setMobileOpen(false);
    mobileButtonRef.current?.focus();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close an open dropdown when the user clicks anywhere outside the header.
  useEffect(() => {
    if (openDropdown === null) return;
    function handleClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openDropdown]);

  // Esc closes an open desktop dropdown and returns focus to its trigger.
  useEffect(() => {
    if (openDropdown === null) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeDropdown(openDropdown);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown]);

  useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b-2 border-accent-fill bg-bg/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_2px_10px_rgba(30,52,96,0.12)]" : ""
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" aria-label="NGEN home">
          <Logo variant="navy" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        {NAV_LIVE && <nav className="hidden md:flex items-center gap-2">
          {navGroups.map((group) => {
            const isActive = group.items.some((sub) => sub.href === pathname);
            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => openOnHover(group.id)}
                onMouseLeave={closeOnHoverOut}
              >
                <button
                  ref={(el) => {
                    triggerRefs.current[group.id] = el;
                  }}
                  type="button"
                  className={`focus-ring-light flex items-center gap-1 rounded-md px-3 py-2 font-sans font-medium text-sm ${
                    isActive ? "text-accent-fill" : "text-text hover:text-accent-fill"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === group.id}
                  aria-controls={`nav-panel-${group.id}`}
                  onClick={() =>
                    setOpenDropdown((cur) => (cur === group.id ? null : group.id))
                  }
                >
                  <NavLabel label={group.label} />
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {openDropdown === group.id && (
                  <div
                    id={`nav-panel-${group.id}`}
                    className="absolute left-0 top-full mt-1 min-w-[240px] rounded-lg border border-surface-dark/10 bg-bg py-2 shadow-lg"
                  >
                    {group.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`focus-ring-light block px-4 py-2 text-sm hover:bg-surface-dark/5 ${
                          pathname === sub.href
                            ? "font-semibold text-accent-fill"
                            : "text-text hover:text-accent-fill"
                        }`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        <NavLabel label={sub.label} sub />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="ml-2 flex items-center gap-1.5">
            {ctaItems.map((item) => {
              // Below lg, the row is too tight for the full deadline-aware
              // Apply label alongside Donate, fall back to the short form
              // (text before ":") so the pill never wraps to two lines.
              const shortLabel = item.label.split(":")[0];
              return (
                <Button
                  key={item.label}
                  variant={item.type === "button-secondary" ? "secondary" : "primary"}
                  size="sm"
                  href={item.href}
                  className="whitespace-nowrap"
                >
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden">{shortLabel}</span>
                </Button>
              );
            })}
          </div>
        </nav>}

        {/* Mobile hamburger */}
        {NAV_LIVE && <button
          ref={mobileButtonRef}
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 h-10 w-10"
          aria-label="Toggle menu"
          aria-haspopup="true"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-surface-dark transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-surface-dark transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-surface-dark transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>}
      </div>

      {NAV_LIVE && (
        <MobileNav
          isOpen={mobileOpen}
          onClose={closeMobile}
          navGroups={navGroups}
          ctaItems={ctaItems}
        />
      )}
    </header>
  );
}
