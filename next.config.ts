import type { NextConfig } from "next";

// Served from a custom domain (money.genevereyes.com) at the root, so no
// basePath prefix is needed even in the GitHub Pages Actions build.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
