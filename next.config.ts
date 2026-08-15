import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/journal", destination: "/duyurular" },
      { source: "/journal/:id", destination: "/duyurular/:id" },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["wallpaperset.com"],
  },
};

export default nextConfig;
