import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Sanity image CDN (used once the CMS is connected)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // Keep old-style /blog/* URLs working if ever shared
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
