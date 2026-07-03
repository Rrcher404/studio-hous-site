import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The whole app (every Link, every canonical URL) is built around
  // trailing-slash paths (/work/, /sessions/, ...), matching the original
  // static site's actual URLs. Without this, Next 308-redirects every
  // single page request to strip the slash.
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/fieldnotes",
        destination: "/field-notes/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
