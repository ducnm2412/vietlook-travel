"use client";

import { useState } from "react";

// Bề rộng ảnh dùng cho srcset; phải khớp images.imageSizes + deviceSizes trong next.config.ts
const WIDTHS = [256, 384, 480, 640, 828, 1080, 1200, 1920];

// Ảnh wp-content gốc (jpg/png nặng) và ảnh trong /images/ đi qua /_next/image để được resize + avif/webp;
// ảnh CDN cdn.ngay.net nhận ?w= để trả đúng kích thước (format=auto → webp/avif)
function sized(src: string, w: number) {
  if (src.startsWith("https://vietlooktravel.com/wp-content/") || src.startsWith("/images/")) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  }
  if (!src.includes("cdn.ngay.net") || /[?&]w=/.test(src)) return null;
  return `${src}${src.includes("?") ? "&" : "?"}w=${w}`;
}

// width = bề rộng hiển thị tối đa (CSS px) trên desktop; trình duyệt tự chọn ảnh theo màn hình và DPR.
// Nếu ảnh thiếu/lỗi sẽ hiện nền gradient
export default function Img({ src, alt, className = "", width = 800 }: { src: string | null | undefined; alt: string; className?: string; width?: number }) {
  const [failed, setFailed] = useState(false);
  const widths = WIDTHS.filter((w) => w <= width * 2);
  const srcSet = src && sized(src, width) ? widths.map((w) => `${sized(src, w)} ${w}w`).join(", ") : undefined;
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark ${className}`}>
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sized(src, WIDTHS.find((w) => w >= width) ?? 1920) ?? src} srcSet={srcSet} sizes={srcSet ? `(max-width: 640px) calc(100vw - 2rem), ${width}px` : undefined} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
