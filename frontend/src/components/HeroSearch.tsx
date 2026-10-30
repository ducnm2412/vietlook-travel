"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import type { Destination } from "@/lib/api";
import { withLang } from "@/lib/locale";
import { DUR } from "./TourFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Thanh tìm tour ở hero trang chủ: từ khoá, điểm đến, thời lượng, phong cách (chủ đề /themes/*)
export default function HeroSearch({ destinations, styles }: { destinations: Destination[]; styles: { slug: string; name: string; zh: string }[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const router = useRouter();
  const [q, setQ] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [style, setStyle] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (destination) p.set("destination", destination);
    const d = DUR.find((x) => x.key === duration);
    if (d) {
      if (d.min) p.set("minDays", String(d.min));
      p.set("maxDays", String(d.max));
    }
    // Chỉ chọn phong cách: mở thẳng trang chủ đề; kết hợp điều kiện khác: lọc trong danh sách tour
    if (style && !p.size) return router.push(withLang(`/themes/${style}`, lang));
    if (style) p.set("style", style);
    router.push(withLang(`/tours${p.size ? `?${p}` : ""}`, lang));
  };

  // Điện thoại: gọn 2 hàng (từ khoá + nút tìm | 3 ô chọn), ẩn nhãn, ô chọn ghi rõ "Any destination…"
  const label = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted max-sm:sr-only";
  const sel = "field max-sm:!px-2 max-sm:!py-2 max-sm:text-[13px]";
  return (
    <form onSubmit={submit} className="grid grid-cols-6 gap-2 rounded-2xl bg-white p-3 text-ink shadow-2xl sm:grid-cols-2 sm:gap-3 sm:p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
      <label className="col-span-5 sm:col-span-1">
        <span className={label}>{zh ? "关键词" : "Keyword"}</span>
        <span className="relative block">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted" />
          <input className="field !pl-10 max-sm:!py-2.5" value={q} onChange={(e) => setQ(e.target.value)} placeholder={zh ? "线路名称、地点…" : "Tour name, place…"} />
        </span>
      </label>
      <label className="col-span-2 sm:col-span-1">
        <span className={label}>{zh ? "去哪里？" : "Where to?"}</span>
        <select className={sel} value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">{zh ? "全部目的地" : "Anywhere"}</option>
          {destinations.map((d) => <option key={d.slug} value={d.slug}>{zh ? d.zh : d.name}</option>)}
        </select>
      </label>
      <label className="col-span-2 sm:col-span-1">
        <span className={label}>{zh ? "多长时间？" : "How long?"}</span>
        <select className={sel} value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">{zh ? "不限天数" : "Any length"}</option>
          {DUR.map((d) => <option key={d.key} value={d.key}>{zh ? d.zh : d.en}</option>)}
        </select>
      </label>
      <label className="col-span-2 sm:col-span-1">
        <span className={label}>{zh ? "旅行风格" : "Travel style"}</span>
        <select className={sel} value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="">{zh ? "全部风格" : "Any style"}</option>
          {styles.map((s) => <option key={s.slug} value={s.slug}>{zh ? s.zh : s.name}</option>)}
        </select>
      </label>
      <button aria-label={zh ? "搜索线路" : "Search tours"} className="btn btn-brand col-start-6 row-start-1 h-full !px-0 whitespace-nowrap sm:col-span-2 sm:col-start-auto sm:row-start-auto sm:h-[46px] sm:!px-6 lg:col-span-1">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> <span className="hidden sm:inline">{zh ? "搜索线路" : "Search tours"}</span>
      </button>
    </form>
  );
}
