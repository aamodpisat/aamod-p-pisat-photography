/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: '/journal', destination: '/stories', permanent: true },
      { source: '/packages', destination: '/services', permanent: true },
    ];
  },
  // Output mode for serverless deployment (Contentstack Launch)
  output: 'standalone',

  // The environment name is safe to expose; the delivery token stays server-side.
  env: {
    NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
  },
  
  // Let Contentstack resize once for each responsive <Image> candidate.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/contentstack-image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
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
  
  // Strict mode for better React practices
  reactStrictMode: true,
  
  // Powered by header (optional: set to false to hide)
  poweredByHeader: false,
};

module.exports = nextConfig;

