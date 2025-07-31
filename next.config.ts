import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env['NEXT_PUBLIC_APP_ENV'] ?? "development",
    NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL'] ?? 'https://localhost:3001',
    NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'] ?? "https://localhost:4001",
  },

};

export default nextConfig;
