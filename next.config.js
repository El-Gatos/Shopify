/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**', // Allows any image path from this domain
      },
    ],
  },
};

module.exports = nextConfig;