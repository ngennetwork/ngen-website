"use client";

import Image from "next/image";
import { useState } from "react";
import { conference, home } from "@/content/site";
import { programs, capitalNetwork } from "@/content/programs";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";

const { programs: copy } = home;

const ITEMS = [
  ...programs.map((p) => ({ key: p.slug, name: p.name, summary: p.summary, href: `/programs/${p.slug}`, photo: p.photo })),
  {
    key: "capital",
    name: capitalNetwork.name,
    summary: capitalNetwork.summary,
    href: capitalNetwork.href,
    photo: { ...copy.capitalPhoto, position: "50% 50%" },
  },
];

/**
 * The programs as an index. Left, the five names set large; right, one
 * photo with the chosen program's line under it, changing as you point at
 * (or focus) a name. The left list and the right figure share one height.
 * On small screens it's a plain list, each name with its line.
 */
export default function ProgramIndex() {
  const [active, setActive] = useState(0);
  const current = ITEMS[active];

  return (
    <Section
      id="programs-title"
      fill
      title={copy.title}
      action={
        <PageLink href={copy.more.href} className="link text-base">
          {copy.more.label}
        </PageLink>
      }
    >
      <div className="grid flex-1 gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-stretch">
        <ol className="flex flex-col justify-between gap-y-6 lg:col-span-6 lg:gap-y-2">
          {ITEMS.map((item, i) => {
            const on = active === i;
            return (
              <li key={item.key}>
                <PageLink
                  href={item.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex flex-col gap-1.5"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`font-display text-[clamp(1.75rem,0.6rem+2.4vw,2.75rem)] leading-[1.06] tracking-[-0.032em] transition-colors duration-300 ${
                        on ? "text-ink" : "lg:text-ink/40 lg:group-hover:text-ink"
                      }`}
                    >
                      {item.name === conference.name ? (
                        <>
                          <span className="block">{conference.nameLines[0]}</span>
                          <span className="block sm:whitespace-nowrap">{conference.nameLines.slice(1).join(" ")}</span>
                        </>
                      ) : (
                        item.name
                      )}
                    </span>
                    <span aria-hidden="true" className={`node hidden transition-opacity duration-300 lg:inline-block ${on ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  <span className="text-base text-slate lg:hidden">{item.summary}</span>
                </PageLink>
              </li>
            );
          })}
        </ol>

        <figure className="hidden flex-col gap-4 lg:col-span-6 lg:flex">
          <div className="relative min-h-[18rem] flex-1 overflow-hidden rounded-2xl bg-ink/5">
            {ITEMS.map((item, i) => (
              <Image
                key={item.key}
                src={item.photo.src}
                alt={active === i ? item.photo.alt : ""}
                fill
                sizes="(min-width: 1024px) 45vw, 1px"
                className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                  active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
                style={{ objectPosition: item.photo.position ?? "50% 50%" }}
              />
            ))}
          </div>
          <figcaption className="min-h-[3em] text-lead text-slate">{current.summary}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
