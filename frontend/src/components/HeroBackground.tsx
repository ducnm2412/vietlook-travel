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

// Các cảnh video hero (đã nén từ video-src/: 7 giây, 30fps, bản 1080p ≤6Mbps và 720p ≤2,5Mbps), phát nối tiếp và lặp lại
const SCENES = ["halong-cruise", "old-town", "waterfall", "cyclo", "bay-aerial", "fishing-boats", "lake", "halong-boat"];
const FADE = 0.8; // giây chồng mờ giữa 2 cảnh

// Ảnh nền hero (Tràng An) luôn nằm dưới cùng. Video chỉ tải trên màn hình từ 768px; màn ≥1280px dùng bản 1080p cho nét.
// Hai thẻ video luân phiên: thẻ đang phát gần hết thì thẻ kia (đã tải trước cảnh kế) phát và hiện dần lên.
// Lỗi tải thì mờ dần để lộ ảnh. Điện thoại chỉ dùng ảnh (ngân sách hero ≤ 2–3MB).
export default function HeroBackground() {
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [failed, setFailed] = useState(false);
  // scene[k] = cảnh đang gán cho thẻ video k; active = thẻ đang hiện
  const [scene, setScene] = useState([0, 1]);
  const [active, setActive] = useState(0);

  const src = (i: number) => `/videos/hero/${SCENES[i % SCENES.length]}-${window.matchMedia("(min-width: 1280px)").matches ? 1080 : 720}.mp4`;

  const onTime = (k: number, v: HTMLVideoElement) => {
    if (k !== active || !v.duration || v.currentTime < v.duration - FADE) return;
    const next = v.parentElement?.querySelector<HTMLVideoElement>(`video[data-k="${1 - k}"]`);
    if (!next) return;
    next.currentTime = 0;
    next.play().catch(() => {});
    setActive(1 - k);
  };

  // Thẻ vừa ẩn đi: gán cảnh tiếp theo để tải trước khi tới lượt
  const onHidden = (k: number) => {
    if (k === active) return;
    setScene((s) => (k === 0 ? [s[1] + 1, s[1]] : [s[0], s[0] + 1]));
  };

  return (
    <>
      <picture>
        <source media={QUERY} srcSet="/_next/image?url=%2Fimages%2Fhero-fallback.webp&w=1920&q=85" />
        <img src="/_next/image?url=%2Fimages%2Fhero-fallback-m.webp&w=828&q=60" srcSet="/_next/image?url=%2Fimages%2Fhero-fallback-m.webp&w=640&q=60 640w, /_next/image?url=%2Fimages%2Fhero-fallback-m.webp&w=828&q=60 828w" sizes="100vw" alt="Trang An, Ninh Binh" fetchPriority="high" className="ken-burns absolute inset-0 -z-20 h-full w-full object-cover" />
      </picture>
      {desktop &&
        [0, 1].map((k) => (
          <video
            key={k}
            data-k={k}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity ease-linear ${!failed && k === active ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDuration: `${FADE * 1000}ms` }}
            src={src(scene[k])}
            poster={k === 0 ? `/videos/hero/${SCENES[0]}.jpg` : undefined}
            autoPlay={k === 0 && scene[0] === 0}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={(e) => onTime(k, e.currentTarget)}
            onTransitionEnd={() => onHidden(k)}
            onError={() => setFailed(true)}
            aria-hidden
          />
        ))}
    </>
  );
}
