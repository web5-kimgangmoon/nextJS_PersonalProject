/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["localhost", "/api", "52.79.197.169"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ hostname: "/api" }],
  },
};

export default nextConfig;
