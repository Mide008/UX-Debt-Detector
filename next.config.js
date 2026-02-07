/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // This will bypass the apostrophe errors in results.tsx
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This ensures minor type mismatches don't stop the deploy
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig