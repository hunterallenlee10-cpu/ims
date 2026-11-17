import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The member training page and its PDFs are shared by link only: keep them out of search engines.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/training-tu2km4apwv", headers: noindex },
      { source: "/members-tu2km4apwv/:path*", headers: noindex },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so they work with Turbopack.
    remarkPlugins: [["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
