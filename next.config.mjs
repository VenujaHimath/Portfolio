/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // OneDrive on Windows corrupts webpack's disk cache → 500 on layout.js / CSS
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
