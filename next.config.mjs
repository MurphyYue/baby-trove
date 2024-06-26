/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd-mobile'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "baby-trove.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
