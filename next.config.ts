import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "richardkyereh.com",
      },
      {
        protocol: "https",
        hostname: "www.richardkyereh.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "richardkyereh.com" }],
        destination: "https://www.richardkyereh.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
