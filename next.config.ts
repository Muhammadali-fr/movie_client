import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true
    },
  },
  reactCompiler: true,
};

export default nextConfig;
