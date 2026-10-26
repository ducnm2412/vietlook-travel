"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { formData, useInquiry } from "./useInquiry";
import type { Tour, Vehicle } from "@/lib/api";
import { CAR_CITIES, routeStop } from "@/components/car/cities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar, faCar, faCircle, faLocationDot, faMinus, faPlane, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const SERVICES = [
  { v: "airport", en: "Airport transfer", zh: "机场接送" },
  { v: "day", en: "Day trip", zh: "一日游" },
  { v: "multi", en: "Multi-day", zh: "多日包车" },
];

// Ô nhập trong khung chung kiểu trang đặt xe quốc tế: nhãn nhỏ phía trên, không viền riêng
const cell = "flex items-center gap-3 px-4 py-3";
const tiny = "block text-[11px] font-semibold uppercase tracking-wider text-muted";
const bare = "w-full bg-transparent text-[15px] font-medium outline-none placeholder:font-normal placeholder:text-black/35";

// Form 2 bước: (1) chuyến xe, (2) liên hệ. Bước ẩn vẫn nằm trong DOM để FormData lấy đủ giá trị.
export default function CarQuoteForm({ vehicles, cars = [] }: { vehicles: Vehicle[]; cars?: Tour[] }) {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry("car");
  const [service, setService] = useState("airport");
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState(2);
  const formRef = useRef<HTMLFormElement>(null);
  const step1 = useRef<HTMLDivElement>(null);
  // Xe nhỏ nhất đủ chỗ cho số khách (chừa ghế tài xế)
  // Gợi ý điểm đi/đến từ dữ liệu: sân bay, thành phố và điểm đến của các tuyến xe; vẫn cho gõ tự do (khách sạn, địa chỉ)
  const airports = CAR_CITIES.map((c) => c.airport);
  const places = [...new Set([...CAR_CITIES.map((c) => c.name), ...cars.map((t) => routeStop(t.title))])].filter(Boolean).sort();
  const car = vehicles.find((v) => v.seats - 1 >= pax) ?? vehicles[vehicles.length - 1];

  // Nhận tuyến khách bấm "Book now" ở bảng tuyến phổ biến và điền sẵn vào form
  useEffect(() => {
    const onBook = (e: Event) => {
      const { pickup, dropoff } = (e as CustomEvent<{ pickup: string; dropoff: string }>).detail;
      const form = formRef.current;
      if (!form) return;
      setService(/airport/i.test(pickup) ? "airport" : "day");
      setStep(1);
      (form.elements.namedItem("pickup") as HTMLInputElement).value = pickup;
      (form.elements.namedItem("dropoff") as HTMLInputElement).value = dropoff;
      setTimeout(() => (form.elements.namedItem("datetime") as HTMLInputElement)?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener("car:book", onBook);
    return () => window.removeEventListener("car:book", onBook);
  }, []);

  if (state.status === "ok") return <Success />;

  const next = () => {
    for (const f of step1.current?.querySelectorAll<HTMLInputElement>("input") ?? []) if (!f.reportValidity()) return;
    setStep(2);
  };

  return (
    <form ref={formRef} id="quote" onSubmit={(e) => { e.preventDefault(); submit({ service, ...formData(e) }); }} className="scroll-mt-28 rounded-2xl bg-white p-5 shadow-2xl md:p-6">
      <div className="flex gap-5 border-b border-black/10 text-sm font-semibold">
        {SERVICES.map((s) => (
          <button type="button" key={s.v} onClick={() => setService(s.v)} className={`-mb-px border-b-2 pb-3 transition ${service === s.v ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}>{zh ? s.zh : s.en}</button>
        ))}
      </div>

      <div ref={step1} className={step === 1 ? "mt-5 space-y-4" : "hidden"}>
        <div className="relative divide-y divide-black/10 rounded-xl ring-1 ring-black/15">
          <span className="absolute bottom-[34%] left-[23px] top-[34%] border-l border-dashed border-black/25" />
          <label className={cell}>
            <FontAwesomeIcon icon={service === "airport" ? faPlane : faCircle} className="w-4 text-xs text-brand" />
            <span className="flex-1"><span className={tiny}>{zh ? "出发地" : "From"}</span><input required name="pickup" list={service === "airport" ? "car-airports" : "car-places"} autoComplete="off" placeholder={service === "airport" ? "Noi Bai Airport (HAN)" : zh ? "酒店 / 地址" : "Hotel or address"} className={bare} /></span>
          </label>
          <label className={cell}>
            <FontAwesomeIcon icon={faLocationDot} className="w-4 text-accent" />
            <span className="flex-1"><span className={tiny}>{zh ? "目的地" : "To"}</span><input required name="dropoff" list="car-places" autoComplete="off" placeholder={zh ? "酒店、城市或景点" : "Hotel, city or attraction"} className={bare} /></span>
          </label>
        </div>

        <div className="grid grid-cols-2 divide-x divide-black/10 rounded-xl ring-1 ring-black/15">
          <label className={cell}>
            <FontAwesomeIcon icon={faCalendar} className="w-4 text-muted" />
            <span className="min-w-0 flex-1"><span className={tiny}>{zh ? "日期时间" : "Pick-up time"}</span><input required type="datetime-local" name="datetime" className={`${bare} text-sm`} /></span>
          </label>
          <div className={cell}>
            <FontAwesomeIcon icon={faUser} className="w-4 text-muted" />
            <span className="flex-1"><span className={tiny}>{zh ? "乘客" : "Passengers"}</span>
              <span className="flex items-center justify-between">
                <button type="button" aria-label="Fewer" onClick={() => setPax(Math.max(1, pax - 1))} className="grid h-6 w-6 place-items-center rounded-full ring-1 ring-black/20 text-[10px]"><FontAwesomeIcon icon={faMinus} /></button>
                <b className="text-[15px]">{pax}</b>
                <button type="button" aria-label="More" onClick={() => setPax(Math.min(44, pax + 1))} className="grid h-6 w-6 place-items-center rounded-full ring-1 ring-black/20 text-[10px]"><FontAwesomeIcon icon={faPlus} /></button>
              </span>
            </span>
          </div>
        </div>
        <datalist id="car-airports">{airports.map((p) => <option key={p} value={p} />)}</datalist>
        <datalist id="car-places">{[...airports, ...places].map((p) => <option key={p} value={p} />)}</datalist>
        <input type="hidden" name="passengers" value={pax} />
        <input type="hidden" name="vehicle" value={car?.seats ?? ""} />

        {service !== "day" && (
          <input name={service === "multi" ? "days" : "flight"} placeholder={service === "multi" ? (zh ? "天数" : "Number of days") : zh ? "航班号（可选）" : "Flight number (optional)"} className="w-full rounded-xl px-4 py-3 text-[15px] ring-1 ring-black/15 outline-none focus:ring-brand" />
        )}

        {car && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <FontAwesomeIcon icon={faCar} className="text-brand" />
            <span><b className="text-ink">{zh ? car.zh : car.name}</b> · {car.example}</span>
          </p>
        )}
        <button type="button" onClick={next} className="w-full rounded-xl bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-dark">{zh ? "获取报价" : "See price"}</button>
        <p className="text-center text-xs text-muted">{zh ? "固定价格 · 含过路费和停车费" : "Fixed price · Tolls & parking included"}</p>
      </div>

      <div className={step === 2 ? "mt-5 space-y-3" : "hidden"}>
        <p className="text-sm text-muted">{zh ? "报价将通过邮件或WhatsApp发送给您。" : "We'll send your fixed price by email or WhatsApp within 30 minutes."}</p>
        <input required={step === 2} name="name" placeholder={`${t("form.name")} *`} className="field" />
        <input required={step === 2} type="email" name="email" placeholder={`${t("form.email")} *`} className="field" />
        <input name="phone" placeholder={zh ? "电话 / WhatsApp / 微信" : "WhatsApp or phone"} className="field" />
        <Error />
        <div className="flex gap-3">
          <button type="button" onClick={() => setStep(1)} className="btn border border-black/10" aria-label={zh ? "返回" : "Back"}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <div className="flex-1 [&>button]:w-full"><SubmitButton label={zh ? "获取报价" : "Get my quote"} /></div>
        </div>
      </div>
    </form>
  );
}
