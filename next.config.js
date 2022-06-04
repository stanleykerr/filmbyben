// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js", "ts", "tsx"],
  images: {
    domains: ["uploads-ssl.webflow.com", "img.youtube.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
