import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
  eslint: {
    // هذا سيسمح بالبناء حتى مع وجود أخطاء ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
