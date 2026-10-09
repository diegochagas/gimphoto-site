import type { NextConfig } from "next";

// Static files for GitHub Pages: the site lives under /gimphoto-site there
// (SITE_BASE_PATH=/gimphoto-site in the workflow), at / locally.
const basePath = process.env.SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
