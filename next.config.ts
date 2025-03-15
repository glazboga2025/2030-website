import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.(?<domain>.*)',
          },
        ],
        destination: '/blog/:path*',
      },
    ];
  },
};

export default config;
