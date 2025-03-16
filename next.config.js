/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // This helps with hydration warnings without breaking Tailwind
    optimizePackageImports: ['@/components'],
  },
};

module.exports = nextConfig;
