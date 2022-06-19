// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js", "ts", "tsx"],
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uploads-ssl.webflow.com",
        },
        {
          protocol: "https",
          hostname: "img.youtube.com",
        },
        {
          protocol: "https",
          hostname: "**.cdninstagram.com",
        },
      ],
    },
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
