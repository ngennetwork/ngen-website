"use client";

import { Button, SectionHeader } from "@/components/ui";

/**
 * Homepage "How the Network Connects" — 3 equal-width core initiative
 * cards on a full-width dark navy section (breaks up cream-card
 * fatigue). Each card carries an explicit CTA into the right next step
 * for that initiative.
 */
export default function NetworkConnectsSection() {
  return (
    <section className="py-16 md:py-20 bg-surface-dark">
      <div className="container-page">
        <SectionHeader onDark title="How the Network Connects" align="center" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto w-full items-stretch">
          <div className="flex flex-col justify-between h-full p-8 rounded-2xl bg-white/5 border border-white/10 text-on-dark">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 mb-3 block h-4">
                FOR BUILDERS &amp; FOUNDERS
              </span>
              <div className="min-h-[3.25rem] flex items-end mb-4">
                <h3 className="text-h3 font-sans font-extrabold text-on-dark">Peer Matching</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8 flex-1">
                Match with co-founders and operators across campuses.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <Button
                variant="dark"
                href="https://tally.so/r/rjQVD2?peer_matching=1:1%20peer%20matching%20with%20student%20builders%20across%20campuses"
                className="w-full py-3.5 px-6 rounded-full text-center font-medium"
              >
                Apply for Matching →
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full p-8 rounded-2xl bg-white/5 border border-white/10 text-on-dark">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 mb-3 block h-4">
                FOR ALL STUDENTS
              </span>
              <div className="min-h-[3.25rem] flex items-end mb-4">
                <h3 className="text-h3 font-sans font-extrabold text-on-dark">
                  Student Opportunities Newsletter
                </h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8 flex-1">
                Active Students Only. Internships, venture roles, and events.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <Button
                variant="dark"
                href="https://tally.so/r/rjQVD2?newsletter=Receive%20our%20NGEN%20Opportunities%20Digest"
                className="w-full py-3.5 px-6 rounded-full text-center font-medium"
              >
                Join Student Newsletter →
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full p-8 rounded-2xl bg-white/5 border border-white/10 text-on-dark">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 mb-3 block h-4">
                FOR INVESTORS &amp; FOUNDERS
              </span>
              <div className="min-h-[3.25rem] flex items-end mb-4">
                <h3 className="text-h3 font-sans font-extrabold text-on-dark">
                  NGEN Capital Network
                </h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8 flex-1">
                Curated &amp; Selective. Dealflow, pitch judging, and warm intros.
              </p>
            </div>
            <div className="mt-auto pt-4">
              {/* /capital-network/founders isn't public yet — disabled
                  rather than linked until that page goes live. */}
              <Button
                variant="dark"
                disabled
                className="w-full py-3.5 px-6 rounded-full text-center font-medium"
              >
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
