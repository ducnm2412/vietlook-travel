"use client";

import { useState } from "react";

// Các bề rộng mà bộ tối ưu ảnh của Next chấp nhận (imageSizes + deviceSizes mặc định)
const NEXT_WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920];

// Ảnh CDN của vietlooktravel.com nhận ?w= để trả đúng kích thước (format=auto → webp/avif);
// ảnh wp-content gốc là jpg/png nặng nên đi qua /_next/image để được resize + webp/avif
function sized(src: string, width: number) {
  // Ảnh trong /images/ cũng đi qua /_next/image để nhận avif (nhẹ hơn webp ~40% cùng chất lượng)
  if (src.startsWith("https://vietlooktravel.com/wp-content/") || src.startsWith("/images/")) {
    const w = NEXT_WIDTHS.find((n) => n >= width) ?? 1920;
    return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  }
  if (!src.includes("cdn.ngay.net") || /[?&]w=/.test(src)) return src;
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}

// Nếu ảnh thiếu/lỗi sẽ hiện nền gradient
export default function Img({ src, alt, className = "", width = 800 }: { src: string | null | undefined; alt: string; className?: string; width?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark ${className}`}>
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sized(src, width)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
