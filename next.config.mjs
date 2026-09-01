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
    ];
  },
};

export default nextConfig;
