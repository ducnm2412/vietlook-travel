"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLocationDot, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import { formatUsd, type Tour } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { routeStop } from "./cities";

type City = { slug: string; name: string; zh: string; airport: string };

// Tuyến phổ biến theo thành phố: bên trái sơ đồ tuyến, bên phải bảng giá cố định
export default function PopularRoutes({ cities, cars }: { cities: City[]; cars: Tour[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [active, setActive] = useState(cities[0]?.slug);
  const city = cities.find((c) => c.slug === active)!;
  const list = cars.filter((t) => t.categories.includes(active)).slice(0, 6);
  const stop = (t: Tour) => routeStop(t.title);

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {cities.map((c) => (
          <button key={c.slug} onClick={() => setActive(c.slug)} className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition ${active === c.slug ? "border-brand bg-brand text-white" : "bg-white hover:border-brand hover:text-brand"}`}>
            {zh ? c.zh : c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:grid-cols-[300px_1fr] md:p-8">
        {/* Sơ đồ tuyến dạng đường chấm */}
        <div className="hidden rounded-2xl bg-sand p-6 md:block">
          <div className="relative space-y-6 pl-8">
            <span className="absolute left-[11px] top-3 bottom-3 border-l-2 border-dashed border-accent/60" />
            <div className="relative flex items-center gap-3">
              <span className="absolute -left-8 grid h-6 w-6 place-items-center rounded-full bg-accent text-[10px] text-white ring-4 ring-accent/20"><FontAwesomeIcon icon={faPlaneArrival} /></span>
              <div><p className="font-card text-sm font-bold">{zh ? city.zh : city.name}</p><p className="text-xs text-muted">{city.airport}</p></div>
            </div>
            {list.map((t) => (
              <div key={t.slug} className="relative">
                <span className="absolute -left-[26px] top-1 h-3.5 w-3.5 rounded-full border-2 border-brand bg-white" />
                <p className="text-sm font-medium">{stop(t)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-card text-xl font-bold">{zh ? `从${city.zh}出发` : `From ${city.name}`}</h3>
          <p className="mb-4 text-sm text-muted">{city.airport}</p>
          <ul className="divide-y divide-black/5">
            {list.map((t) => (
              <li key={t.slug} className="flex flex-wrap items-center gap-3 py-3.5 sm:flex-nowrap">
                <Link href={`/tours/${t.slug}`} className="group flex min-w-0 flex-1 items-center gap-3">
                  <FontAwesomeIcon icon={faLocationDot} className="text-brand/60" />
                  <span className="flex-1 text-sm font-medium group-hover:text-brand">{zh && t.titleZh ? t.titleZh : t.title}</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
                <div className="ml-7 flex items-center gap-3 sm:ml-0">
                  {t.priceFrom ? <span className="whitespace-nowrap text-sm text-muted">{zh ? "起" : "from"} <b className="text-base text-accent">{formatUsd(t.priceFrom)}</b></span> : null}
                  {/* Đặt nhanh: điền sẵn tuyến vào form báo giá rồi cuộn lên form */}
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("car:book", { detail: { pickup: city.airport, dropoff: stop(t), route: t.title } }));
                      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand"
                  >
                    {zh ? "立即预订" : "Book now"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">{zh ? "没有找到您的路线？发送询价，我们30分钟内回复。" : "Route not listed? Send a request and we reply within 30 minutes."}</p>
        </div>
      </div>
    </div>
  );
}
