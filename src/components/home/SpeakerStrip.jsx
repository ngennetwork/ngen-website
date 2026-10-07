"use client";

import { useRef } from "react";
import { home } from "@/content/site";
import { speakers } from "@/data/speakers";
import Section from "@/components/layout/Section";
import PageLink from "@/components/ui/PageLink";
import SpeakerGrid, { Chevron, nudgeStrip } from "@/components/sections/SpeakerGrid";

const { speakers: copy } = home;

/**
 * Every past speaker as a filmstrip between the margins. Its controls sit
 * in the section's action row with the link to all of them, not in a corner.
 */
export default function SpeakerStrip() {
  const strip = useRef(null);

  return (
    <Section
      id="speakers-title"
      tone="fog"
      title={copy.title}
      intro={copy.subtitle}
      action={
        <>
          <PageLink href={copy.more.href} className="link text-base">
            {copy.more.label}
          </PageLink>
          <span className="flex gap-2">
            <button type="button" onClick={() => nudgeStrip(strip, -1)} className="btn btn-ghost size-11 p-0" aria-label={copy.previous}>
              <Chevron dir={-1} />
            </button>
            <button type="button" onClick={() => nudgeStrip(strip, 1)} className="btn btn-ghost size-11 p-0" aria-label={copy.next}>
              <Chevron dir={1} />
            </button>
          </span>
        </>
      }
    >
      <SpeakerGrid items={speakers} layout="strip" stripRef={strip} />
    </Section>
  );
}
