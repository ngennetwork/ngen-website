/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/directory",
        destination: "/ecosystem",
        permanent: true,
      },
      {
        source: "/startups",
        destination: "/ecosystem",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/sponsors",
        permanent: true,
      },
      {
        source: "/partners/:path*",
        destination: "/sponsors",
        permanent: true,
      },
      // The evergreen program pages moved from /events/[slug] to
      // /programs/[slug] so the /events route could be freed up for real
      // event instances + open applications.
      {
        source: "/events/:slug",
        destination: "/programs/:slug",
        permanent: true,
      },
      // /apply was merged into /events — one page for browsing and applying.
      {
        source: "/apply",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
