import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "occ-0-8407-2218.1.nflxso.net"
      },
      {
        protocol: "https",
        hostname: "files.tecnoblog.net"
      }
    ],
  },
};

export default nextConfig;
