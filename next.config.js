/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
    async rewrites() {
      return [
        {
          source: "/api/:path",
          destination: "/",
        },
      ];
    },
  },
};

module.exports = nextConfig;
