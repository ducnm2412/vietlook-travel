import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ảnh tour gốc từ vietlooktravel.com được resize + chuyển webp/avif qua /_next/image (xem components/Img.tsx)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "vietlooktravel.com", pathname: "/wp-content/**" }],
  },
  // Nhúng CSS vào HTML để bỏ request CSS chặn hiển thị (Lighthouse: ~730ms)
  experimental: { inlineCss: true },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
