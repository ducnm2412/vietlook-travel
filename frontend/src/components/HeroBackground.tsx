"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// Video chạy trên mọi màn hình (cả điện thoại), trừ khi máy bật chế độ tiết kiệm dữ liệu (Save-Data)
const noop = () => () => {};
const canPlay = () => !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

// Các cảnh video hero (đã nén từ video-src/: 7 giây, 30fps, bản 1080p ≤6Mbps và 720p ≤2,5Mbps), phát nối tiếp và lặp lại
const SCENES = ["halong-cruise", "old-town", "waterfall", "cyclo", "bay-aerial", "fishing-boats", "lake", "halong-boat"];
const FADE = 0.8; // giây chồng mờ giữa 2 cảnh

// Ảnh nền là khung hình đầu của cảnh 1 (hero-first-frame.webp) để khi video bắt đầu không bị "nhảy" cảnh.
// Màn ≥1280px dùng bản 1080p, nhỏ hơn (kể cả điện thoại) dùng bản 720p.
// Hai thẻ video luân phiên: thẻ đang phát gần hết thì thẻ kia (đã tải trước cảnh kế) phát và hiện dần lên.
// Lỗi tải thì mờ dần để lộ ảnh.
export default function HeroBackground() {
  const play = useSyncExternalStore(noop, canPlay, () => false);
  const [failed, setFailed] = useState(false);
  // scene[k] = cảnh đang gán cho thẻ video k; active = thẻ đang hiện
  const [scene, setScene] = useState([0, 1]);
  const [active, setActive] = useState(0);
  // Tải video bất đồng bộ: chỉ gắn thẻ video sau khi trang tải xong và trình duyệt rảnh (chữ/ảnh hero hiện mượt trước),
  // và ảnh nền giữ nguyên cho tới khi video thật sự phát (ready)
  const [start, setStart] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!play) return;
    let idle = 0;
    const go = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setStart(true), { timeout: 2500 });
      else idle = window.setTimeout(() => setStart(true), 800);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      clearTimeout(idle);
    };
  }, [play]);

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/_next/image?url=%2Fimages%2Fhero-first-frame.webp&w=1920&q=60"
        srcSet="/_next/image?url=%2Fimages%2Fhero-first-frame.webp&w=828&q=60 828w, /_next/image?url=%2Fimages%2Fhero-first-frame.webp&w=1920&q=60 1920w"
        sizes="100vw"
        alt="Ha Long Bay cruise"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {play && start &&
        [0, 1].map((k) => (
          <video
            key={k}
            data-k={k}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity ease-linear ${!failed && ready && k === active ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDuration: `${FADE * 1000}ms` }}
            src={src(scene[k])}
            poster={k === 0 ? "/images/hero-first-frame.webp" : undefined}
            autoPlay={k === 0 && scene[0] === 0}
            muted
            playsInline
            preload={k === 0 || ready ? "auto" : "none"}
            onPlaying={() => setReady(true)}
            onTimeUpdate={(e) => onTime(k, e.currentTarget)}
            onTransitionEnd={() => onHidden(k)}
            onError={() => setFailed(true)}
            aria-hidden
          />
        ))}
    </>
  );
}
