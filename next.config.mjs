// Static export so the site can be hosted on GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is set to "/<repo-name>" by the deploy workflow.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base || undefined,
  trailingSlash: true,
};
