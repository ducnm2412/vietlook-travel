"use client";

import { useState, useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  // Safari < 14 chỉ có addListener
  if (mq.addEventListener) {
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }
  mq.addListener(cb);
  return () => mq.removeListener(cb);
};

// Ảnh nền hero (Tràng An) luôn nằm dưới cùng. Video chỉ tải trên màn hình từ 768px, phát 1 lần;
// khi phát hết hoặc lỗi thì mờ dần để lộ ảnh. Điện thoại chỉ dùng ảnh (ngân sách hero ≤ 2–3MB).
export default function HeroBackground() {
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [done, setDone] = useState(false);

  return (
    <>
      <picture>
        <source media={QUERY} srcSet="/_next/image?url=%2Fimages%2Fhero-fallback.webp&w=1920&q=75" />
        <img src="/_next/image?url=%2Fimages%2Fhero-fallback-m.webp&w=828&q=75" alt="Trang An, Ninh Binh" fetchPriority="high" className="ken-burns absolute inset-0 -z-20 h-full w-full object-cover" />
      </picture>
      {desktop && (
        <video
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1500ms] ${done ? "opacity-0" : "opacity-100"}`}
          src="/videos/hero-720.mp4"
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={() => setDone(true)}
          onError={() => setDone(true)}
          aria-hidden
        />
      )}
    </>
  );
}
