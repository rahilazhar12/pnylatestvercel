/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.admin777.pny-trainings.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
  async headers() {
    return [
      {
        // Apply the X-Robots-Tag header to all files under /_next/static
        source: '/_next/static/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
    ];
  },
};

export default nextConfig;
