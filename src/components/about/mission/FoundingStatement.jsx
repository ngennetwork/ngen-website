"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Mission Beat 4 — the founding statement. Fades in as a normal
 * (non-pinned) scroll-triggered block once the pinned sequence above it
 * releases. When `animated` is false (reduced motion), it just renders
 * visible with no scroll trigger at all.
 */
export default function FoundingStatement({ animated }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!animated || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(ref.current, { autoAlpha: 0, y: 24 });
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => gsap.to(ref.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }),
    });
    return () => trigger.kill();
  }, [animated]);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-surface-dark/90 md:text-lg"
    >
      <p>
        NGEN&rsquo;s story began with the three of us meeting in a group chat for student
        entrepreneurship leaders across top universities. As we led our respective campus
        ecosystems, with Will leading the Brown Medical Entrepreneurship Society and the
        Brown Entrepreneurship Program, Harsha leading the Wharton Undergraduate
        Entrepreneurship Club at UPenn, and Jackson leading the Princeton Entrepreneurship
        Club, we kept seeing the same gap. Ambitious students were building incredible
        things, but our communities were isolated by school boundaries, leaving innovative
        students with no real way to meet peers with complementary skills or shared
        interests across campuses.
      </p>
      <p>
        We decided to host a trial run: the inaugural Trailblazers Conference in NYC. We
        wanted to test if student founders actually cared about collaborating across campus
        lines. Over 100 students from Ivy+ universities attended, and the momentum in that
        room made our next step clear.
      </p>
      <p>
        We incorporated NGEN as a 501(c)(3) nonprofit to create the cross-university
        ecosystem we wished had existed when we started. A core goal for us is long-term
        sustainability, ensuring these intercollegiate programs and events endure as
        permanent infrastructure rather than one-off gatherings or spotty collaborations.
        Our focus goes beyond supporting existing student startups. We build spaces for
        entrepreneurial students to meet through in-person programming, test out new
        projects, find co-founders, and experiment with ideas well before they even
        consider themselves a founder. From these gatherings, an entire ecosystem of
        ongoing support and resources has naturally grown, connecting builders through
        flagship conferences, investor office visits, pitch competitions, and
        skillbuilding workshops. We hope you&rsquo;ll join us and find your place in the
        NGEN community!
      </p>
      <p className="text-left font-[family-name:var(--font-signature)] text-2xl text-neutral-800">
        Warmly,
        <br />
        Harsha, Jackson &amp; Will
      </p>
    </div>
  );
}
