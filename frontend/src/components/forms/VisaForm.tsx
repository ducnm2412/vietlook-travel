"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { formData, useInquiry } from "./useInquiry";
import { FT_AIRPORTS, VISA_SERVICES } from "@/lib/visa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const AIRPORTS = FT_AIRPORTS.map((a) => [a.code, a.city]);

// Form 2 bước: (1) chuyến đi, (2) liên hệ. Bước ẩn vẫn nằm trong DOM để FormData lấy đủ giá trị.
export default function VisaForm() {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry("visa");
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState(1);
  const step1 = useRef<HTMLDivElement>(null);

  if (state.status === "ok") return <Success />;

  const next = () => {
    const fields = step1.current?.querySelectorAll<HTMLInputElement>("input, select") ?? [];
    for (const f of fields) if (!f.reportValidity()) return;
    setStep(2);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(formData(e)); }} className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-bold md:text-2xl">{zh ? "申请签证 / 快速通关" : "Apply for visa / fast track"}</h2>
        <span className="shrink-0 text-xs font-semibold text-muted">{step}/2</span>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-1.5"><span className="h-1 rounded-full bg-accent" /><span className={`h-1 rounded-full ${step === 2 ? "bg-accent" : "bg-black/10"}`} /></div>

      <div ref={step1} className={step === 1 ? "space-y-4" : "hidden"}>
        <select name="service" className="field" aria-label={zh ? "服务" : "Service"}>
          {VISA_SERVICES.map((s) => <option key={s.v} value={s.v}>{zh ? s.zh : s.en}</option>)}
        </select>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <input required name="nationality" placeholder={zh ? "国籍 *" : "Nationality *"} className="field" />
          <div className="flex items-center rounded-xl ring-1 ring-black/10" aria-label={zh ? "人数" : "Applicants"}>
            <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="px-3 py-3 text-muted hover:text-brand"><FontAwesomeIcon icon={faMinus} /></button>
            <input type="hidden" name="pax" value={pax} />
            <span className="w-8 text-center font-semibold">{pax}</span>
            <button type="button" onClick={() => setPax(pax + 1)} className="px-3 py-3 text-muted hover:text-brand"><FontAwesomeIcon icon={faPlus} /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="label">{zh ? "抵达/出发日期" : "Flight date"} *</span><input required type="date" name="arrival" className="field" /></label>
          <label className="block"><span className="label">{zh ? "航班号" : "Flight number"} *</span><input required name="flight" placeholder="VN123" className="field uppercase" /></label>
        </div>
        <div>
          <span className="label">{zh ? "机场" : "Airport"}</span>
          <div className="flex flex-wrap gap-2">
            {AIRPORTS.map(([code, city], i) => (
              <label key={code} className="cursor-pointer">
                <input type="radio" name="airport" value={`${code} – ${city}`} defaultChecked={i === 0} className="peer sr-only" />
                <span className="block rounded-xl px-3 py-2 text-sm ring-1 ring-black/10 transition peer-checked:bg-brand peer-checked:text-white peer-checked:ring-brand"><b>{code}</b> <span className="opacity-70">{city}</span></span>
              </label>
            ))}
          </div>
        </div>
        <button type="button" onClick={next} className="btn btn-accent w-full">{zh ? "下一步" : "Continue"} <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>

      <div className={step === 2 ? "space-y-4" : "hidden"}>
        <input required={step === 2} name="name" placeholder={`${t("form.name")} *`} className="field" />
        <input required={step === 2} type="email" name="email" placeholder={`${t("form.email")} *`} className="field" />
        <input name="phone" placeholder={zh ? "电话 / WhatsApp / 微信" : "Phone / WhatsApp"} className="field" />
        <Error />
        <div className="flex gap-3">
          <button type="button" onClick={() => setStep(1)} className="btn border border-black/10" aria-label={zh ? "返回" : "Back"}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <div className="flex-1 [&>button]:w-full"><SubmitButton /></div>
        </div>
      </div>
    </form>
  );
}
