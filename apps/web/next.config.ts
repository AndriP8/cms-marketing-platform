import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching issues early
  reactStrictMode: true,

  // Image optimization — add Sanity CDN domain in Phase 2
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Logging for debugging during development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
