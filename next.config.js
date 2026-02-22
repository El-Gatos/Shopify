/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevents clickjacking — stops your site being embedded in an iframe elsewhere
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stops browsers sniffing content types (prevents some XSS vectors)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Full URL in referrer for same-origin, only origin for cross-origin
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disables browser features you don't use
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Forces HTTPS for 1 year once visited
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Basic XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopifycdn.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;