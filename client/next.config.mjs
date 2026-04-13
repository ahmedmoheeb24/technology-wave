/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Forces Next.js to produce a static site
  images: {
    unoptimized: true,   // Required: Cloudflare Pages doesn't support Next.js's native image optimization
  },

  trailingSlash: true, 
};

export default nextConfig;