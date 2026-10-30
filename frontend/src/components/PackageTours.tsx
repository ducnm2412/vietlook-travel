"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import TourGrid from "./TourGrid";
import { useLang } from "@/lib/i18n";
import HandNote from "./HandNote";
import type { Tour } from "@/lib/api";

const TABS = [
  { key: "all", en: "All packages", zh: "全部套餐", min: 5, max: 99 },
  { key: "1w", en: "Up to 1 week", zh: "一周内", min: 5, max: 9 },
  { key: "2w", en: "2 weeks", zh: "两周", min: 10, max: 16 },
  { key: "3w", en: "3 weeks +", zh: "三周以上", min: 17, max: 99 },
];

// Tour trọn gói Việt Nam, lọc theo thời lượng (kiểu lilystravelagency.com)
// Toạ độ (% theo khung 16:9) của từng cụm hình, sinh từ scratch script tách nền download.png
const LANDMARKS = [
  { src: "/images/landmarks/lm-0.webp", x: 0, y: 35.42, w: 36.04 },
  { src: "/images/landmarks/lm-1.webp", x: 0.68, y: 7.47, w: 31.01 },
  { src: "/images/landmarks/lm-2.webp", x: 39.55, y: 9.72, w: 60.45 },
];

// Rê chuột vào cụm hình thì lắc nhẹ quanh chân (đặt kèm component vì chỉ dùng ở đây)
const WIGGLE_CSS = `
.paper-wiggle { transform-origin: 50% 100%; transition: filter 0.3s; }
.paper-wiggle:hover { animation: paper-wiggle 0.7s ease-in-out; filter: drop-shadow(0 8px 14px rgba(90, 60, 30, 0.25)); }
@keyframes paper-wiggle { 20% { transform: rotate(-2deg); } 45% { transform: rotate(1.6deg); } 70% { transform: rotate(-0.8deg); } 100% { transform: rotate(0); } }
@media (prefers-reduced-motion: reduce) { .paper-wiggle:hover { animation: none; } }
`;

export default function PackageTours({ tours }: { tours: Tour[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [tab, setTab] = useState(TABS[0]);
  // Tour dài ngày hiện trước
  const list = tours
    .filter((t) => t.days >= tab.min && t.days <= tab.max)
    .sort((a, b) => b.days - a.days)
    .slice(0, 6);

  return (
    <section className="pointer-events-none relative pb-12 pt-6 md:pb-24 md:pt-8">
      {/* Nền be liền màu section trên; dải dưới cùng là cờ + cụm công trình Hà Nội / Sài Gòn cắt từ download.png,
          có viền giấy xé (public/images/landmarks/), rê chuột vào cụm nào thì cụm đó lắc nhẹ */}
      <div className="absolute inset-0 -z-20 bg-[#f7f1e6]" aria-hidden>
        <style>{WIGGLE_CSS}</style>
        <div className="absolute inset-x-0 bottom-0 aspect-[16/9] max-h-[85%]">
          {LANDMARKS.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l.src} src={l.src} alt="" loading="lazy" decoding="async" className="paper-wiggle pointer-events-auto absolute" style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%` }} />
          ))}
        </div>
      </div>
      {/* Vùng trống để chuột chạm tới cụm hình phía sau; thẻ/nút vẫn bấm được */}
      <div className="container-x pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
      <div className="mb-6 md:mb-14 flex flex-col gap-2 md:flex-row-reverse md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl md:text-right">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{zh ? "越南跟团套餐" : "Vietnam Package Tours"}</p>
        <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{zh ? "越南全程套餐游" : "All-inclusive tours across Vietnam"}</h2>
          </div>
          <HandNote side="left" className="md:mb-10 md:ml-6" lines={[{"en":"Hand-picked itineraries.","zh":"精选行程。"},{"en":"Everything taken care of.","zh":"一切为您安排妥当。"}]} />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t)} className={`rounded-full border px-5 py-2 text-sm font-medium transition ${tab.key === t.key ? "border-brand bg-brand text-white" : "hover:border-brand hover:text-brand"}`}>
            {zh ? t.zh : t.en}
          </button>
        ))}
      </div>

      <TourGrid key={tab.key} tours={list}
        action={
          <Link href={`/tours?theme=vietnam-tours&minDays=${tab.min}${tab.max < 99 ? `&maxDays=${tab.max}` : ""}`} className="btn btn-brand whitespace-nowrap !px-4 !py-2.5 text-sm sm:!px-6 sm:!py-3 sm:text-[0.95rem]">
          {zh ? "查看全部套餐" : "View all package tours"} →
          </Link>
        }
      />
      </div>
    </section>
  );
}
