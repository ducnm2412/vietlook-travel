import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ảnh tour gốc từ vietlooktravel.com được resize + chuyển webp/avif qua /_next/image (xem components/Img.tsx)
  images: {
    qualities: [60, 75, 85],
    formats: ["image/avif", "image/webp"],
    // 480 cho thẻ tour/dịch vụ (~430px trên desktop), xem WIDTHS trong components/Img.tsx
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
