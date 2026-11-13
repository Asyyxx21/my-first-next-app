import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/nextjs-vvedenie",
        destination: "/blog/1",
        permanent: false,
      },
      {
        source: "/blog/react-osnovy",
        destination: "/blog/2",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
