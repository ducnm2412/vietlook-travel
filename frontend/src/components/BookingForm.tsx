"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { formatUsd, sendInquiry, type Tour } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar, faChild, faCircleCheck, faMinus, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const HOTEL = [
  { v: "3", en: "3★", zh: "3星" },
  { v: "4", en: "4★", zh: "4星" },
  { v: "5", en: "5★", zh: "5星" },
];

// Cùng kiểu với form đặt xe: ô trong khung chung, nhãn nhỏ phía trên
const cell = "flex items-center gap-3 px-4 py-3";
const tiny = "block text-[11px] font-semibold uppercase tracking-wider text-muted";

function Count({ name, icon, label, value, min, onChange }: { name: string; icon: typeof faUser; label: string; value: number; min: number; onChange: (v: number) => void }) {
  const btn = "grid h-6 w-6 place-items-center rounded-full text-[10px] ring-1 ring-black/20 disabled:opacity-30";
  return (
    <div className={cell}>
      <FontAwesomeIcon icon={icon} className="w-4 text-muted" />
      <span className="flex-1"><span className={tiny}>{label}</span>
        <span className="flex items-center justify-between">
          <button type="button" aria-label="-" disabled={value <= min} onClick={() => onChange(value - 1)} className={btn}><FontAwesomeIcon icon={faMinus} /></button>
          <b className="text-[15px]">{value}</b>
          <button type="button" aria-label="+" onClick={() => onChange(value + 1)} className={btn}><FontAwesomeIcon icon={faPlus} /></button>
        </span>
      </span>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

// Form 2 bước: (1) ngày, số khách, khách sạn; (2) liên hệ. Bước ẩn vẫn nằm trong DOM để FormData lấy đủ giá trị.
export default function BookingForm({ tour }: { tour: Tour }) {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const [state, setState] = useState<{ status: "idle" | "sending" | "ok" | "error"; id?: string }>({ status: "idle" });
  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState("4");
  const step1 = useRef<HTMLDivElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ status: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await sendInquiry({ type: "booking", tour: tour.slug, tourTitle: tour.title, tourCode: tour.code, lang, ...data });
      setState({ status: "ok", id: res.id });
    } catch {
      setState({ status: "error" });
    }
  };

  if (state.status === "ok")
    return <div className="rounded-2xl bg-brand-light p-6 text-brand"><FontAwesomeIcon icon={faCircleCheck} className="mr-2" />{t("common.success")} <b>{state.id}</b></div>;

  const next = () => {
    for (const f of step1.current?.querySelectorAll<HTMLInputElement>("input") ?? []) if (!f.reportValidity()) return;
    setStep(2);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 md:p-6">
      <div className="flex items-baseline justify-between gap-3 border-b border-black/10 pb-4">
        {tour.priceFrom ? (
          <p className="text-sm text-muted">{zh ? "起价" : "From"} <b className="font-card text-2xl text-ink">{formatUsd(tour.priceFrom)}</b></p>
        ) : (
          <p className="font-card text-lg font-bold">{zh ? "预订此行程" : "Book this trip"}</p>
        )}
        <span className="text-xs font-semibold text-muted">{step}/2</span>
      </div>

      <div ref={step1} className={step === 1 ? "mt-5 space-y-4" : "hidden"}>
        <div className="divide-y divide-black/10 rounded-xl ring-1 ring-black/15">
          <label className={cell}>
            <FontAwesomeIcon icon={faCalendar} className="w-4 text-muted" />
            <span className="flex-1"><span className={tiny}>{t("form.date")}</span><input required type="date" name="date" className="w-full bg-transparent text-[15px] font-medium outline-none" /></span>
          </label>
          <div className="grid grid-cols-2 divide-x divide-black/10">
            <Count name="adults" icon={faUser} label={zh ? "成人" : "Adults"} value={adults} min={1} onChange={setAdults} />
            <Count name="children" icon={faChild} label={zh ? "儿童 2–11" : "Kids 2–11"} value={children} min={0} onChange={setChildren} />
          </div>
        </div>

        {tour.kind === "tour" && (
          <div>
            <span className={tiny}>{zh ? "酒店等级" : "Hotel class"}</span>
            <div className="mt-2 flex gap-5 border-b border-black/10 text-sm font-semibold">
              {HOTEL.map((h) => (
                <button type="button" key={h.v} onClick={() => setHotel(h.v)} className={`-mb-px border-b-2 pb-2 transition ${hotel === h.v ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}>{zh ? h.zh : h.en}</button>
              ))}
            </div>
            <input type="hidden" name="hotel" value={hotel} />
          </div>
        )}

        <button type="button" onClick={next} className="w-full rounded-xl bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-dark">{zh ? "查询价格" : "Check price"}</button>
        <p className="text-center text-xs text-muted">{zh ? "无需预付 · 24小时内回复" : "No prepayment · Reply within 24h"}</p>
      </div>

      <div className={step === 2 ? "mt-5 space-y-3" : "hidden"}>
        <p className="text-sm text-muted">{zh ? "我们的本地专家将通过邮件发送报价。" : "A local specialist will email you a tailored quote."}</p>
        <input required={step === 2} name="name" placeholder={`${t("form.name")} *`} className="field" />
        <input required={step === 2} type="email" name="email" placeholder={`${t("form.email")} *`} className="field" />
        <input name="phone" placeholder={zh ? "电话 / WhatsApp / 微信" : "WhatsApp or phone"} className="field" />
        <textarea name="message" rows={2} placeholder={t("form.message")} className="field resize-none" />
        {state.status === "error" && <p className="text-sm text-red-600">{t("common.error")}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={() => setStep(1)} className="btn border border-black/10" aria-label={zh ? "返回" : "Back"}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button disabled={state.status === "sending"} className="btn btn-accent flex-1">{state.status === "sending" ? t("common.sending") : zh ? "获取报价" : "Get my quote"}</button>
        </div>
      </div>
    </form>
  );
}
