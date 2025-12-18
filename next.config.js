/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output mode for serverless deployment (Contentstack Launch)
  output: 'standalone',
  
  // Image optimization - disabled for serverless (read-only filesystem)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  
  // Production optimizations
  swcMinify: true,
  
  // Strict mode for better React practices
  reactStrictMode: true,
  
  // Powered by header (optional: set to false to hide)
  poweredByHeader: false,
};

module.exports = nextConfig;

