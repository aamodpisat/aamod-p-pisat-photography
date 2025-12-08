/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;

