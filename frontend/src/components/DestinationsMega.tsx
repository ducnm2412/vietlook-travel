"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import { DEST_REGIONS } from "@/lib/destinationMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Mega menu "Destinations": trái 3 thẻ miền (ảnh nền + bản đồ Việt Nam tô sáng miền đó),
// phải là tab Bắc/Trung/Nam + danh sách điểm đến 2 cột có ảnh nhỏ. Rê vào thẻ miền cũng đổi tab.
export default function DestinationsMega({ zh }: { zh: boolean }) {
  const [active, setActive] = useState(0);
  const region = DEST_REGIONS[active];

  return (
    <div className="flex gap-6 p-5">
      <div className="flex w-[38%] shrink-0 flex-col gap-3">
        {DEST_REGIONS.map((r, i) => (
          <Link
            key={r.key}
            href={`/tours?region=${r.key}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group/reg relative flex h-[104px] items-center gap-4 overflow-hidden rounded-xl bg-brand-dark px-5 text-white transition ${i === active ? "ring-2 ring-accent" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/destinations/${r.cover}.webp`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/reg:scale-110" />
            <span className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark/10" />
            {/* Bản đồ: cả nước mờ, miền đang chọn sáng trắng */}
            <span className="relative h-[84px] w-10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/destinations/vn-map.png" alt="" className="absolute inset-0 h-full w-full object-contain opacity-30" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/destinations/vn-map.png" alt="" className="absolute inset-0 h-full w-full object-contain" style={{ clipPath: `inset(${r.map[0]}% 0 ${100 - r.map[1]}% 0)` }} />
            </span>
            <span className="relative leading-tight">
              <span className="block font-script text-2xl text-accent">{zh ? "与 Vietlook 同行" : "With Vietlook"}</span>
              <span className="block font-card text-2xl font-bold">{zh ? r.zh : r.en}</span>
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="relative ml-auto -rotate-45 text-white/70 transition group-hover/reg:rotate-0 group-hover/reg:text-accent" />
          </Link>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/10">
          {DEST_REGIONS.map((r, i) => (
            <button key={r.key} type="button" onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`rounded-lg py-2.5 text-sm font-semibold uppercase tracking-wide transition ${i === active ? "bg-brand-light text-brand" : "text-ink/70 hover:text-brand"}`}>
              {zh ? r.zh.replace("越南", "") : r.en.replace(" Vietnam", "")}
            </button>
          ))}
        </div>

        <ul key={region.key} className="dest-list mt-3 grid max-h-[300px] grid-cols-2 gap-x-6 overflow-y-auto pr-2">
          {region.links.map((l) => (
            <li key={l.href} className="border-b border-black/10">
              <Link href={l.href} className="group/item flex items-center gap-3 py-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/destinations/thumb/${l.img}.webp`} alt="" width={96} height={60} loading="lazy" className="h-[46px] w-[74px] shrink-0 rounded-lg object-cover transition duration-500 group-hover/item:scale-105" />
                <span className="flex-1 whitespace-normal text-[15px] font-medium text-ink transition group-hover/item:text-brand">{zh ? l.zh : l.en}</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-xs text-ink/50 transition group-hover/item:translate-x-1 group-hover/item:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/tours?region=${region.key}`} className="mt-3 self-end text-sm font-semibold text-accent hover:underline">
          {zh ? `查看${region.zh}全部线路` : `All ${region.en} tours`} →
        </Link>
      </div>
    </div>
  );
}
