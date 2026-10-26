"use client";

import { useState } from "react";

// Ảnh CDN của vietlooktravel.com nhận ?w= để trả đúng kích thước (format=auto → webp/avif)
function sized(src: string, width: number) {
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
