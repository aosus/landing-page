/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ['*'],
};

export default nextConfig;
