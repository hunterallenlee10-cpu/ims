import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so they work with Turbopack.
    remarkPlugins: [["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
