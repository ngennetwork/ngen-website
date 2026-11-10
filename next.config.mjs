import { site } from "./src/content/site.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // No dev badge parked in the corner while reviewing.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // The fellowship hero zooms into the full group file, so it needs a larger source than the default 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 6000],
  },
  experimental: {
    // Page changes cross-fade (see ::view-transition rules in globals.css).
    viewTransition: true,
  },
  async redirects() {
    return [
      // Branded short links. Temporary so the targets in site.shortLinks can move.
      {
        source: "/zoom",
        destination: site.shortLinks.zoom,
        permanent: false,
      },
      {
        source: "/intro",
        destination: site.shortLinks.intro,
        permanent: false,
      },
      {
        source: "/directory",
        destination: "/impact",
        permanent: true,
      },
      {
        source: "/startups",
        destination: "/impact",
        permanent: true,
      },
      {
        source: "/ecosystem",
        destination: "/impact",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/partners/:path*",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/sponsors",
        destination: "/partner",
        permanent: true,
      },
      // The flagship program is listed as Conferences (Trailblazers became
      // the Ivy League Entrepreneurship Conference, which leads it).
      {
        source: "/programs/trailblazers",
        destination: "/programs/conferences",
        permanent: true,
      },
      {
        source: "/programs/ivy-league-entrepreneurship-conference",
        destination: "/programs/conferences",
        permanent: true,
      },
      // The research program is called Lab-2-Startup.
      {
        source: "/programs/research-conferences",
        destination: "/programs/lab-2-startup",
        permanent: true,
      },
      {
        source: "/programs/lab-to-startup",
        destination: "/programs/lab-2-startup",
        permanent: true,
      },
      {
        source: "/events/research-conferences",
        destination: "/programs/lab-2-startup",
        permanent: true,
      },
      // The evergreen program pages moved from /events/[slug] to
      // /programs/[slug]; /events is the calendar.
      {
        source: "/events/:slug",
        destination: "/programs/:slug",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/events",
        permanent: true,
      },
      // Mission and story are one page now.
      {
        source: "/about/mission-story",
        destination: "/about",
        permanent: true,
      },
      // Team page is archived in src/_archive/team. Temporary so it can return.
      {
        source: "/about/team",
        destination: "/about",
        permanent: false,
      },
      // The consultation request is a form on the fellowship page now.
      // Old links (welcome emails, shared links) land on it, ?lang= kept.
      {
        source: "/startup-challenge/apply",
        destination: "/startup-challenge#request",
        permanent: false,
      },
      {
        source: "/capital-network",
        destination: "/capital-network/founders",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
