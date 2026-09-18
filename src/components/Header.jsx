"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * Single-page header: logo only.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      </div>
    </header>
  );
}
