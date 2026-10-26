"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Img from "./Img";
import { useLang } from "@/lib/i18n";
import HandNote from "./HandNote";
import { formatUsd, type Tour } from "@/lib/api";

// Tour văn hoá & du thuyền: chữ bên trái, khảm ảnh 4 ô bên phải
export default function ExperienceCruise({ culture, cruise }: { culture: Tour[]; cruise: Tour[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [tab, setTab] = useState<"culture" | "cruise">("culture");
  // Ảnh bên phải đổi theo nút đang chọn; bấm ảnh mới vào trang chi tiết
  const list = tab === "culture" ? culture : cruise;
  const tag = tab === "culture" ? (zh ? "文化体验" : "Culture") : zh ? "游轮之旅" : "Cruise";
  const tiles = ["row-span-2", "col-span-2", "", ""].map((cls, i) => ({ tour: list[i], tag, cls })).filter((x) => x.tour);

  return (
    <section className="container-x grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1fr_2.1fr] lg:gap-14">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{zh ? "选择您的旅程" : "Signature experiences"}</p>
        <h2 className="whitespace-nowrap font-card text-3xl font-bold leading-tight md:text-4xl 2xl:text-5xl">{zh ? "文化体验与游轮之旅" : "Culture & Cruises"}</h2>
        <span className="mt-4 block h-0.5 w-12 bg-accent" />
          <HandNote lines={[{"en":"Your ideas.","zh":"您的想法。"},{"en":"Our local expertise.","zh":"我们的本地经验。"},{"en":"An unforgettable journey.","zh":"一段难忘的旅程。"}]} />
        <div className="mt-7 flex flex-wrap gap-3">
          {([["culture", zh ? "文化体验" : "Culture tours"], ["cruise", zh ? "游轮之旅" : "Cruises"]] as const).map(([k, label]) => (
            <button key={k} type="button" onClick={() => setTab(k)} className={`btn !px-5 !py-2.5 text-sm uppercase tracking-wide ${tab === k ? "btn-brand" : "btn-outline text-brand"}`}>{label}</button>
          ))}
        </div>
        <Link href={`/tours?theme=${tab === "culture" ? "travel-experience" : "cruise-tour"}`}className="mt-5 inline-block text-sm font-semibold text-accent hover:underline">{zh ? "查看全部 →" : "View all →"}</Link>
      </div>

      <div key={tab} className="animate-[fade-up_.5s_ease] grid h-[520px] grid-cols-2 grid-rows-[1fr_1fr] gap-3 sm:h-[560px] sm:grid-cols-3 md:gap-4">
        {tiles.map(({ tour, tag, cls }, i) => (
          <Link
            key={tour.slug}
            href={`/tours/${tour.slug}`}
            className={`group relative overflow-hidden rounded-2xl ${cls} ${i === 1 ? "max-sm:col-span-1" : ""} ${i === 3 ? "max-sm:hidden" : ""}`}
          >
            <Img src={tour.image} alt={tour.title} width={i === 0 || i === 1 ? 900 : 600} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">{tag}</span>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
              <h3 className={`font-serif font-semibold leading-tight ${i < 2 ? "text-xl md:text-3xl" : "text-lg md:text-xl"} line-clamp-2`}>
                {zh && tour.titleZh ? tour.titleZh : tour.title}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-xs text-white/85 md:text-sm">
                {tour.priceFrom ? <span>{zh ? "起" : "From"} <b className="text-accent">{formatUsd(tour.priceFrom)}</b></span> : null}
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
