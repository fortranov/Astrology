import type { NextConfig } from "next";

const internalApiBase = process.env.INTERNAL_API_BASE_URL ?? "http://127.0.0.1:8000/api";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/proxy-api/:path*",
        destination: `${internalApiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
