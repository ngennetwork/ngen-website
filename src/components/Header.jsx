"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui";
import MobileNav from "@/components/MobileNav";

const JOIN_HREF = "https://tally.so/r/rjQVD2";

/**
 * Single-page header: logo left, single "Join the Network" CTA
 * (external Tally form) right.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileButtonRef = useRef(null);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-accent-fill bg-bg/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_2px_10px_rgba(30,52,96,0.12)]" : ""
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" aria-label="NGEN home">
          <Logo variant="navy" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" href={JOIN_HREF}>
            Join the Network
          </Button>

          <button
            type="button"
            className="sm:hidden flex flex-col justify-center gap-1.5 h-10 w-10"
            aria-label="Toggle menu"
            aria-haspopup="true"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            ref={mobileButtonRef}
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
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
