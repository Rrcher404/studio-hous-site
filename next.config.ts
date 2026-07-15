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
    const securityHeaders = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          // 'unsafe-inline' is required for the inline JSON-LD structured-data
          // scripts on the homepage/marketing pages. Tighten to a nonce later.
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self' https://*.supabase.co",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];
    return [
      { source: "/:path*", headers: securityHeaders },
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
