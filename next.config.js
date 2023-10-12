/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images : {
    domains : ["media.graphassets.com"],
  },
}

module.exports = nextConfig;
