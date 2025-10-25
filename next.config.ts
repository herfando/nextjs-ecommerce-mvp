import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com", // kadang digunakan untuk thumbnail
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // gambar produk utama
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com", // jaga-jaga kalau masih pakai sumber lama
      },
    ],
  },
};

export default nextConfig;
