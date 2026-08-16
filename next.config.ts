import type { NextConfig } from "next";

// GitHub Pages serves project sites at username.github.io/<repo-name>/,
// so assets and links need that prefix when built in CI for Pages.
const basePath = process.env.GITHUB_ACTIONS ? "/finance-flowchart" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
};

export default nextConfig;
