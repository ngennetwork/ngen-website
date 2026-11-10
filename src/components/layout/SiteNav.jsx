"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Logo from "@/components/brand/Logo";
import PageLink from "@/components/ui/PageLink";
import MailingAddress from "@/components/ui/MailingAddress";

const { nav, labels } = site;

// The phone menu lists each child under its parent, skipping a child that
// only repeats its parent's page ("Our story" is About itself).
const mobileLinks = nav.links.flatMap((link) => [
  link,
  ...(link.children ?? []).filter((c) => c.href !== link.href).map((c) => ({ ...c, child: true })),
]);

/**
 * At the top of the page: the full NGEN logo on the left, the links in a
 * frosted tray (readable over stone or the navy panel), and the one action.
 * Once you scroll, the whole bar lifts into a floating frosted pill and the
 * logo folds down to the mountain alone. Its edges set every page's edges.
 * A link with children (About: its story and the team) opens a small
 * frosted list under it when pointed at or focused; on phones the children
 * sit indented under their parent.
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
  const ivy = pathname === "/global-fellowship" || pathname.startsWith("/global-fellowship/");
  const pill = scrolled && !open;
  const frost =
    "bg-paper/72 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.5)] ring-1 ring-ink/6 backdrop-blur-xl backdrop-saturate-150";
  const ivyBar =
    "bg-[#fbfaf7]/92 text-[#151815] shadow-[0_10px_30px_-14px_rgb(21_24_21/0.28)] ring-1 ring-[#151815]/10 backdrop-blur-xl";
  const linkClass = ivy
    ? "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-small text-[#151815]/75 transition-colors hover:bg-[#151815]/6 hover:text-[#151815] aria-[current=page]:bg-[#151815]/8 aria-[current=page]:text-[#151815]"
    : "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-small text-ink/75 transition-colors hover:bg-ink/6 hover:text-ink aria-[current=page]:bg-ink/8 aria-[current=page]:text-ink";
  const childClass = ivy
    ? "block rounded-lg px-3.5 py-2 text-small whitespace-nowrap text-[#151815]/75 transition-colors hover:bg-[#151815]/6 hover:text-[#151815] aria-[current=page]:text-[#151815]"
    : "block rounded-lg px-3.5 py-2 text-small whitespace-nowrap text-ink/75 transition-colors hover:bg-ink/6 hover:text-ink aria-[current=page]:text-ink";

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${ivy ? "ivy-chrome text-[#151815]" : "text-ink"}`}>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-open={open ? "" : undefined}
        className={`mobile-menu fixed inset-0 flex flex-col justify-between overflow-y-auto px-5 pt-28 pb-10 nav:hidden ${ivy ? "bg-[#f3f1ec] text-[#151815]" : "grain bg-ink-deep text-on-dark"}`}
      >
        <ul className="flex flex-col gap-1">
          {mobileLinks.map((link, i) => (
            <li key={`${link.href}-${link.label}`} className={`overflow-hidden ${link.child ? "pl-6" : ""}`}>
              <span style={{ "--i": i }}>
                <PageLink
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  aria-current={(link.child ? pathname === link.href : isActive(link)) ? "page" : undefined}
                  className={`font-display leading-[1.2] aria-[current=page]:text-mist ${link.child ? "text-h3" : "text-h1"}`}
                >
                  {link.label}
                </PageLink>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start gap-5">
          <PageLink href={nav.cta.href} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)} className={`btn ${ivy ? "ivy-btn" : "btn-paper"}`}>
            {nav.cta.label}
          </PageLink>
          <a href={`mailto:${site.email}`} tabIndex={open ? undefined : -1} className="link text-small text-mist">
            {site.email}
          </a>
          <MailingAddress className="text-small text-mist" />
        </div>
      </div>

      <nav aria-label="Primary" className={`${ivy ? "ivy-nav wrap" : "wrap"} transition-[padding] duration-500 ease-out ${pill && !ivy ? "pt-3" : ivy ? "nav:pt-5" : "pt-5"}`}>
        <div
          className={`relative flex h-14 items-center justify-between gap-6 rounded-2xl transition-[background-color,box-shadow,padding] duration-500 ease-out ${
            ivy ? `ivy-nav-bar ${ivyBar} pr-2 pl-4` : pill ? `${frost} pr-2 pl-4` : "px-0"
          } ${open && !ivy ? "text-on-dark" : ""}`}
        >
          <PageLink href="/" aria-label="NGEN home" className="flex h-12 shrink-0 items-center" onClick={() => setOpen(false)}>
            <Logo priority shape="mark" tone={ivy ? "navy" : "light"} className={`h-8 ${ivy ? "ivy-logo-mono max-nav:h-7" : ""}`} />
          </PageLink>

          <div className="flex items-center gap-2">
            <ul
              className={`hidden items-center gap-0.5 rounded-xl p-1 transition-[background-color,box-shadow] duration-500 nav:flex ${
                ivy ? "" : pill ? "" : frost
              }`}
            >
              {nav.links.map((link) => (
                <li key={link.href} className={link.children ? "group/sub relative" : undefined}>
                  <PageLink
                    href={link.href}
                    aria-current={isActive(link) ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                    {link.children && (
                      <svg aria-hidden="true" width="8" height="8" viewBox="0 0 10 10" fill="none" className="opacity-60 transition-transform duration-300 group-hover/sub:rotate-180 group-focus-within/sub:rotate-180">
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    )}
                  </PageLink>
                  {link.children && (
                    <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/sub:visible group-focus-within/sub:opacity-100 group-hover/sub:visible group-hover/sub:opacity-100">
                      <ul className={`min-w-40 rounded-xl p-1 shadow-[0_10px_30px_-14px_rgb(21_24_21/0.28)] backdrop-blur-xl ${ivy ? "bg-[#fbfaf7] ring-1 ring-[#151815]/10" : "bg-paper/95 ring-1 ring-ink/6 backdrop-saturate-150"}`}>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <PageLink
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={childClass}
                            >
                              {child.label}
                            </PageLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <PageLink
              href={nav.cta.href}
              className={`btn min-h-10 px-4 text-small max-nav:hidden ${ivy ? "ivy-btn" : "btn-ink"}`}
            >
              {nav.cta.label}
            </PageLink>
            <button
              ref={toggleRef}
              type="button"
              className={`flex size-11 items-center justify-center rounded-xl nav:hidden ${ivy || pill || open ? "" : frost}`}
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
