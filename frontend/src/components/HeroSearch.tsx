"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import type { Destination } from "@/lib/api";
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
    if (style && !p.size) return router.push(`/themes/${style}`);
    if (style) p.set("style", style);
    router.push(`/tours${p.size ? `?${p}` : ""}`);
  };

  const label = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted";
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 text-ink shadow-2xl sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
      <label>
        <span className={label}>{zh ? "关键词" : "Keyword"}</span>
        <span className="relative block">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted" />
          <input className="field !pl-10" value={q} onChange={(e) => setQ(e.target.value)} placeholder={zh ? "线路名称、地点…" : "Tour name, place…"} />
        </span>
      </label>
      <label>
        <span className={label}>{zh ? "去哪里？" : "Where to?"}</span>
        <select className="field" value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">{zh ? "不限" : "Any"}</option>
          {destinations.map((d) => <option key={d.slug} value={d.slug}>{zh ? d.zh : d.name}</option>)}
        </select>
      </label>
      <label>
        <span className={label}>{zh ? "多长时间？" : "How long?"}</span>
        <select className="field" value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">{zh ? "不限" : "Any"}</option>
          {DUR.map((d) => <option key={d.key} value={d.key}>{zh ? d.zh : d.en}</option>)}
        </select>
      </label>
      <label>
        <span className={label}>{zh ? "旅行风格" : "Travel style"}</span>
        <select className="field" value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="">{zh ? "不限" : "Any"}</option>
          {styles.map((s) => <option key={s.slug} value={s.slug}>{zh ? s.zh : s.name}</option>)}
        </select>
      </label>
      <button className="btn btn-brand h-[46px] whitespace-nowrap sm:col-span-2 lg:col-span-1"><FontAwesomeIcon icon={faMagnifyingGlass} /> {zh ? "搜索线路" : "Search tours"}</button>
    </form>
  );
}
