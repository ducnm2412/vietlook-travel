"use client";

import Link from "next/link";
import { useState } from "react";
import Img from "./Img";
import { useLang } from "@/lib/i18n";
import { REGIONS } from "@/lib/site";
import HandNote from "./HandNote";
import type { Destination } from "@/lib/api";

// Ô rộng (2 cột) theo số điểm đến của miền, để lưới 4 cột luôn kín hàng (kiểu lilystravelagency.com)
const WIDE: Record<number, number[]> = {
  6: [0, 4], // [2,1,1] [1,2,1]
  5: [0, 3, 4], // [2,1,1] [2,2]
  4: [0, 3], // [2,1,1] [... ô cuối rộng]
  3: [0], // [2,1,1]
};

export default function RegionTours({ destinations }: { destinations: Destination[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [region, setRegion] = useState<string>(REGIONS[0].key);
  const list = destinations.filter((d) => d.region === region && d.count > 0).slice(0, 6);
  const wide = WIDE[list.length] ?? [0];

  return (
    <section className="bg-photo-light py-12 md:py-20">
      <div className="container-x">
        <div className="mb-6 md:mb-14 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{zh ? "按地区旅游" : "Tours by Region"}</p>
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{zh ? "越南北部、中部与南部" : "Explore North, Central and South Vietnam"}</h2>
          </div>
          <HandNote side="right" className="md:mb-8 md:mr-10" lines={[{"en":"Three regions.","zh":"三大区域。"},{"en":"One unforgettable country.","zh":"一个难忘的国度。"}]} />
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {REGIONS.map((r) => (
            <button key={r.key} onClick={() => setRegion(r.key)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:px-6 sm:py-2.5 sm:text-sm ${region === r.key ? "border-brand bg-brand text-white" : "bg-white hover:border-brand hover:text-brand"}`}>
              {zh ? r.zh : <><span className="sm:hidden">{r.en.replace(" Vietnam", "")}</span><span className="hidden sm:inline">{r.en}</span></>}
            </button>
          ))}
        </div>

        <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {list.map((d, i) => (
            <Link key={d.slug} href={`/tours?destination=${d.slug}`} className={`group relative block h-64 overflow-hidden rounded-2xl md:h-80 ${wide.includes(i) ? "md:col-span-2" : ""}`}>
              <div className="absolute inset-0">
                <Img src={d.image} alt={d.name} width={600} className="h-full w-full transition duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
              <div className="absolute inset-0 grid place-items-center p-4 text-center">
                <span className="font-card text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] md:text-5xl">
                  {zh ? d.zh : d.name.replace(/ City$/, "")}
                </span>
                <span className="absolute bottom-5 rounded-full bg-white/90 px-5 py-2 text-base font-semibold text-brand">
                  {d.count} {zh ? "条线路" : "tours"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={`/tours?region=${region}`} className="btn btn-brand">
            {zh ? "查看该地区全部线路" : "View all tours in this region"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
