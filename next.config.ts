import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/reporistory-explorer/' : '',
  basePath: isProd ? '/reporistory-explorer' : '',
  output: 'export'
};

export default nextConfig;
