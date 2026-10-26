"use client";

import Link from "next/link";
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
    <section className="container-x pb-12 pt-6 md:pb-20 md:pt-10">
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
    </section>
  );
}
