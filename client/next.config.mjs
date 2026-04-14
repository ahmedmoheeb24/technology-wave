/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.technology-wave.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;