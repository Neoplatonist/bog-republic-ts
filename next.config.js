/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    swcTraceProfiling: true,
  },
};

module.exports = nextConfig;
