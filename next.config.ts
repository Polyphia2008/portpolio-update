import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*"],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
