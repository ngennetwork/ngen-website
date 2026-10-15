/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // No dev badge parked in the corner while reviewing.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Page changes cross-fade (see ::view-transition rules in globals.css).
    viewTransition: true,
  },
  async redirects() {
    return [
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
      // Mission and story are one page now; the team has its own (/about/team).
      {
        source: "/about/mission-story",
        destination: "/about",
        permanent: true,
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
