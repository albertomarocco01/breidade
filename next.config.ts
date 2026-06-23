import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS project. A parent lockfile in the home
  // directory would otherwise make Next infer the wrong root (Turbopack is the
  // default bundler in Next 16).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
