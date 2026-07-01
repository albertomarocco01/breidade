import type { NextConfig } from "next";
import path from "node:path";

// Baseline security headers applied to every route. Deliberately NON-breaking:
// no Content-Security-Policy here — a strict CSP would need nonces for GSAP /
// inline styles, next/font and Vercel Analytics, so it's left for a dedicated
// pass. HSTS is always sent; browsers ignore it over plain http (local dev) and
// only honour it on HTTPS.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS project. A parent lockfile in the home
  // directory would otherwise make Next infer the wrong root (Turbopack is the
  // default bundler in Next 16).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // A Sanity Studio chunk shared with the (server) config graph imports `swr`'s
  // default export. Turbopack resolves that import through swr's "react-server"
  // condition, which has no default export, and crashes. Externalizing just
  // `swr` routes it through plain Node `require` instead, avoiding that
  // condition — without externalizing all of `sanity` (which caused a second
  // React copy to load and broke Studio's hooks).
  serverExternalPackages: ["swr"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
