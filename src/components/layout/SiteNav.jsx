"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Logo from "@/components/brand/Logo";
import PageLink from "@/components/ui/PageLink";

const { nav, labels } = site;

/**
 * At the top of the page: the full NGEN logo on the left, the links in a
 * frosted tray (readable over stone or the navy panel), and the one action.
 * Once you scroll, the whole bar lifts into a floating frosted pill and the
 * logo folds down to the mountain alone. Its edges set every page's edges.
 */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const main = document.querySelector("main");
    root.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    firstLinkRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    // The menu only exists below the nav breakpoint.
    const desktop = window.matchMedia("(min-width: 60rem)");
    const onResize = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onResize);

    return () => {
      root.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const isActive = (link) => pathname === link.href || pathname.startsWith(`${link.match ?? link.href}/`) || pathname === link.match;
  const pill = scrolled && !open;
  const frost =
    "bg-paper/72 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.5)] ring-1 ring-ink/6 backdrop-blur-xl backdrop-saturate-150";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 text-ink">
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-open={open ? "" : undefined}
        className="mobile-menu grain fixed inset-0 flex flex-col justify-between overflow-y-auto bg-ink-deep px-5 pt-28 pb-10 text-on-dark nav:hidden"
      >
        <ul className="flex flex-col gap-1">
          {nav.links.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <span style={{ "--i": i }}>
                <PageLink
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link) ? "page" : undefined}
                  className="font-display text-h1 leading-[1.2] aria-[current=page]:text-mist"
                >
                  {link.label}
                </PageLink>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start gap-5">
          <PageLink href={nav.cta.href} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)} className="btn btn-paper">
            {nav.cta.label}
          </PageLink>
          <a href={`mailto:${site.email}`} tabIndex={open ? undefined : -1} className="link text-small text-mist">
            {site.email}
          </a>
        </div>
      </div>

      <nav aria-label="Primary" className={`wrap transition-[padding] duration-500 ease-out ${pill ? "pt-3" : "pt-5"}`}>
        <div
          className={`relative flex h-14 items-center justify-between gap-6 rounded-2xl transition-[background-color,box-shadow,padding] duration-500 ease-out ${
            pill ? `${frost} pr-2 pl-4` : "px-0"
          } ${open ? "text-on-dark" : ""}`}
        >
          <PageLink href="/" aria-label="NGEN home" className="relative block h-12 w-24" onClick={() => setOpen(false)}>
            <span
              className={`absolute inset-y-0 left-0 flex items-center transition-[opacity,transform] duration-500 ease-out ${
                pill ? "pointer-events-none -translate-y-1 opacity-0" : "opacity-100"
              }`}
            >
              <Logo priority className="h-12" />
            </span>
            <span
              className={`absolute inset-y-0 left-0 flex items-center transition-[opacity,transform] duration-500 ease-out ${
                pill ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <Logo shape="mark" className="h-6" />
            </span>
          </PageLink>

          <div className="flex items-center gap-2">
            <ul
              className={`hidden items-center gap-0.5 rounded-xl p-1 transition-[background-color,box-shadow] duration-500 nav:flex ${
                pill ? "" : frost
              }`}
            >
              {nav.links.map((link) => (
                <li key={link.href}>
                  <PageLink
                    href={link.href}
                    aria-current={isActive(link) ? "page" : undefined}
                    className="block rounded-lg px-3.5 py-2 text-small text-ink/75 transition-colors hover:bg-ink/6 hover:text-ink aria-[current=page]:bg-ink/8 aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </PageLink>
                </li>
              ))}
            </ul>
            <PageLink
              href={nav.cta.href}
              className="btn btn-ink min-h-10 px-4 text-small max-nav:hidden"
            >
              {nav.cta.label}
            </PageLink>
            <button
              ref={toggleRef}
              type="button"
              className={`flex size-11 items-center justify-center rounded-xl nav:hidden ${pill || open ? "" : frost}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? labels.menuClose : labels.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-2.5 w-5">
                <span
                  className={`absolute top-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[4.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
