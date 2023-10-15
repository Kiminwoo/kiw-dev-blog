/** @type {import('next').NextConfig} */

// next plugin manage
const withPlugins = require('next-compose-plugins');
// next plugin bundle-analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextDefaultConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images : {
    loader: 'akamai',
    path: '/',
    domains : ["media.graphassets.com"],
  },
  experimental: {
    workerThreads: false,
    cpus:1
  },
}

const nextConfig = withBundleAnalyzer({
  compress: true,
  webpack(config, {webpack}){
      const prod = process.env.NODE_ENV === 'production';
      const plugins = [...config.plugins];
      
      return {
          ...config,
          mode: prod? 'production' : 'development',
          devtool: prod? 'hidden-source-map' : 'eval',
          plugins,
          
      };
  },
});

module.exports = withPlugins(
  [
    withBundleAnalyzer,
    nextConfig,
    // 추가적인 Plugin'S....
  ],
  nextDefaultConfig
);

