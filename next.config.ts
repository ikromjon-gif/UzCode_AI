import type { NextConfig } from "next";

/**
 * UzCode AI — Next.js Configuration
 * Sprint 1: Project Foundation
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    // typedRoutes disabled: Sprint 4's sidebar intentionally includes
    // nav items (Templates, Marketplace, Analytics) with no page yet —
    // strict route-literal typing would fail the build on those hrefs.
    // Re-enable once every sidebar item has a real route (Sprint 20+).
  },
};

export default nextConfig;
