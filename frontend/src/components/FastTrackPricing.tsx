"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { FT_AIRPORTS, FT_GROUPS, FT_NOTES } from "@/lib/visa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleInfo, faPlaneArrival, faPlaneDeparture, faPlus } from "@fortawesome/free-solid-svg-icons";

const ICONS = { arrival: faPlaneArrival, departure: faPlaneDeparture, addon: faPlus };

// Bảng giá Fast-track: chọn sân bay ở trên, chọn nhóm (đón / tiễn / dịch vụ thêm) bằng tab, giá dạng bảng.
// Gói không có ở sân bay đang chọn: dòng nền xám nhạt + nhãn "Not available at …", khoá nút đặt (không làm mờ cả dòng để vẫn đọc được giá các sân bay khác).
export default function FastTrackPricing() {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [ap, setAp] = useState(0);
  const [gi, setGi] = useState(0);
  const group = FT_GROUPS[gi];

  // Chọn sẵn gói trong form đặt dịch vụ rồi cuộn lên form
  const book = (no: number) => {
    const sel = document.querySelector<HTMLSelectElement>('#apply select[name="service"]');
    if (sel) sel.value = `ft-${no}`;
    const radio = document.querySelector<HTMLInputElement>(`#apply input[name="airport"][value^="${FT_AIRPORTS[ap].code}"]`);
    if (radio) radio.checked = true;
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="sticky top-[118px] z-10 -mx-2 mb-8 grid grid-cols-5 gap-1 rounded-2xl bg-white/95 p-1.5 shadow-sm ring-1 ring-black/10 backdrop-blur">
        {FT_AIRPORTS.map((a, i) => (
          <button key={a.code} type="button" onClick={() => setAp(i)} className={`rounded-xl px-2 py-2 text-center transition ${i === ap ? "bg-brand text-white shadow" : "hover:bg-sand"}`}>
            <span className="block font-mono text-lg font-bold">{a.code}</span>
            <span className={`block truncate text-[11px] ${i === ap ? "text-white/80" : "text-muted"}`}>{zh ? a.cityZh : a.city}</span>
          </button>
        ))}
      </div>

      {/* Gọn: chọn nhóm dịch vụ bằng tab, mỗi gói là 1 dòng bảng (tên + mô tả | giá 5 sân bay, cột sân bay đang chọn tô đậm | nút đặt).
          Điện thoại chỉ hiện giá ở sân bay đang chọn. */}
      {/* Điện thoại: 3 tab chia đều một hàng, tên rút gọn (Arrival / Departure / Add-on) */}
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-white p-1 ring-1 ring-black/10 sm:flex sm:flex-wrap sm:gap-2 sm:bg-transparent sm:p-0 sm:ring-0">
        {FT_GROUPS.map((g, i) => (
          <button key={g.key} type="button" onClick={() => setGi(i)} className={`inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-semibold transition sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm ${i === gi ? "bg-brand text-white shadow" : "bg-white text-ink sm:ring-1 sm:ring-black/10 hover:ring-brand/40"}`}>
            <FontAwesomeIcon icon={ICONS[g.key]} />
            <span className="sm:hidden">{zh ? g.zh.slice(0, 4) : g.en.split(/ – | services/)[0]}</span>
            <span className="hidden sm:inline">{zh ? g.zh : g.en}</span>
          </button>
        ))}
      </div>

      <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
        <div className="hidden grid-cols-[minmax(0,1fr)_repeat(5,4.5rem)_9rem] items-center gap-2 border-b border-black/10 bg-sand/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted md:grid">
          <span>{zh ? "服务" : "Service"}</span>
          {FT_AIRPORTS.map((a, i) => (
            <button key={a.code} type="button" onClick={() => setAp(i)} className={`rounded-md py-1 text-center font-mono ${i === ap ? "bg-brand text-white" : "hover:text-brand"}`}>{a.code}</button>
          ))}
          <span />
        </div>
        {group.services.map((s) => {
          const price = s.price[ap];
          const ok = price != null;
          return (
            <div key={s.no} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-black/5 px-5 py-4 last:border-0 md:grid-cols-[minmax(0,1fr)_repeat(5,4.5rem)_9rem] md:gap-2 ${ok ? "" : "bg-sand/40"}`}>
              <div>
                <p className="font-semibold leading-snug">
                  {zh ? s.zh : s.en}
                  {!ok && <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 align-middle text-[11px] font-semibold text-muted">{zh ? `${FT_AIRPORTS[ap].code} 暂无` : `Not available at ${FT_AIRPORTS[ap].code}`}</span>}
                </p>
                <p className="mt-0.5 text-sm text-muted">{zh ? s.dzh : s.d}</p>
                {s.note && <p className="mt-1 flex gap-1.5 text-xs text-accent-dark"><FontAwesomeIcon icon={faCircleInfo} className="mt-0.5" />{zh ? s.note.zh : s.note.en}</p>}
              </div>
              {/* Điện thoại: giá sân bay đang chọn */}
              <span className="text-right font-card text-xl font-bold text-brand md:hidden">{ok ? `$${price}` : "–"}</span>
              {FT_AIRPORTS.map((a, i) => (
                <span key={a.code} className={`hidden rounded-md py-1.5 text-center font-card text-sm font-bold md:block ${i === ap ? "bg-brand-light text-brand" : "text-ink/70"}`}>
                  {s.price[i] != null ? `$${s.price[i]}` : "–"}
                </span>
              ))}
              {group.key !== "addon" ? (
                <button type="button" disabled={!ok} onClick={() => book(s.no)} className="btn btn-accent col-span-2 !py-2 text-sm disabled:pointer-events-none md:col-span-1">
                  {zh ? "预订" : "Book"} <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <span className="hidden md:block" />
              )}
            </div>
          );
        })}
      </div>

      <ul className="space-y-2 rounded-2xl border-l-4 border-accent bg-white p-5 text-sm ring-1 ring-black/5">
        {FT_NOTES.map((n, i) => (
          <li key={n.en} className={`flex gap-2 ${i < 2 ? "font-semibold text-ink" : "text-muted"}`}><FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 text-accent" />{zh ? n.zh : n.en}</li>
        ))}
      </ul>
    </div>
  );
}
