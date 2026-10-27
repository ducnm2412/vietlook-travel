"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "@/lib/i18n";
import { formData, useInquiry } from "./useInquiry";

const PLACES = [
  ["North Vietnam", "越南北部"], ["Central Vietnam", "越南中部"], ["South Vietnam", "越南南部"], ["Hanoi", "河内"], ["Halong Bay", "下龙湾"],
  ["Ninh Binh", "宁平"], ["Sapa", "沙坝"], ["Ha Giang", "河江"], ["Hue", "顺化"], ["Hoi An", "会安"], ["Da Nang", "岘港"], ["Nha Trang", "芽庄"],
  ["Ho Chi Minh City", "胡志明市"], ["Mekong Delta", "湄公河三角洲"], ["Phu Quoc", "富国岛"],
] as const;
const INTERESTS = [
  ["Nature and landscapes", "自然风光"], ["Culture and history", "文化历史"], ["Food and cooking", "美食烹饪"],
  ["Trekking and adventure", "徒步探险"], ["Beach and relax", "海滩休闲"], ["Cruises", "游轮之旅"],
  ["Local homestays", "当地民宿"], ["Photography", "摄影"], ["Golf", "高尔夫"],
] as const;
const BUDGETS = ["< $1,000", "$1,000 – 1,500", "$1,500 – 2,000", "$2,000 – 3,000", "> $3,000"];
const STEPS = [["Your trip", "您的行程"], ["Travellers and hotels", "人数与酒店"], ["Interests and budget", "兴趣与预算"], ["Contact", "联系方式"]] as const;

// Chip chọn nhiều: checkbox ẩn + nhãn bo tròn
function Chip({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" name={name} value={value} className="peer sr-only" />
      <span className="block rounded-full border border-black/15 px-4 py-2 text-sm transition hover:border-brand peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">{label}</span>
    </label>
  );
}

// Form "Plan your trip" 4 bước. Mọi bước luôn nằm trong DOM (chỉ ẩn) để FormData gửi đủ dữ liệu.
export default function TailorRequestForm() {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry("tailor-made");
  const [step, setStep] = useState(0);
  const [days, setDays] = useState(10);
  const [placeError, setPlaceError] = useState(false);
  const steps = useRef<(HTMLFieldSetElement | null)[]>([]);

  if (state.status === "ok") return <Success />;

  // Kiểm tra trường bắt buộc của bước hiện tại trước khi sang bước sau
  const valid = () => {
    const fs = steps.current[step];
    if (!fs) return true;
    if (step === 0 && !fs.querySelector("input[name=destinations]:checked")) return setPlaceError(true), false;
    return [...fs.querySelectorAll<HTMLInputElement>("input,select,textarea")].every((el) => el.reportValidity());
  };
  const pick = (e: React.FormEvent<HTMLFormElement>, name: string) => new FormData(e.currentTarget).getAll(name);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid()) return;
        if (step < STEPS.length - 1) return setStep(step + 1);
        submit({ ...formData(e), destinations: pick(e, "destinations"), interests: pick(e, "interests") });
      }}
      className="rounded-3xl bg-white p-6 text-ink shadow-2xl md:p-10"
    >
      {/* Thanh tiến trình 4 bước */}
      <ol className="grid grid-cols-4 gap-3">
        {STEPS.map(([en, z], i) => (
          <li key={en}>
            <span className={`block h-1.5 rounded-full ${i <= step ? "bg-accent" : "bg-black/10"}`} />
            <span className={`mt-3 flex items-center gap-2 text-sm ${i === step ? "font-semibold" : "text-muted"}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] ${i <= step ? "bg-accent text-white" : "bg-black/5"}`}>{i + 1}</span>
              <span className="hidden truncate sm:inline">{zh ? z : en}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <fieldset ref={(el) => { steps.current[0] = el; }} hidden={step !== 0}>
          <legend className="font-semibold">{zh ? "您想去哪里？" : "Where would you like to go?"} <span className="text-red-500">*</span></legend>
          <div className="mt-3 flex flex-wrap gap-2" onChange={() => setPlaceError(false)}>
            {PLACES.map(([en, z]) => <Chip key={en} name="destinations" value={en} label={zh ? z : en} />)}
          </div>
          <p className={`mt-2 text-xs ${placeError ? "text-red-600" : "text-muted"}`}>{zh ? "可选择一个或多个地区/地点" : "Choose one or more regions or places"}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label><span className="label">{zh ? "抵达日期" : "Arrival date"}</span><input type="date" name="arrival" className="field" /></label>
              <label className="mt-3 flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" name="flexible" value="yes" className="h-4 w-4 accent-brand" /> {zh ? "日期可灵活调整" : "My dates are flexible"}
              </label>
            </div>
            <label>
              <span className="label">{zh ? "行程天数" : "Trip length (days)"}: {days}</span>
              <input type="range" name="days" min={1} max={30} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-accent" style={{ background: `linear-gradient(to right, var(--color-accent) ${((days - 1) / 29) * 100}%, rgb(0 0 0 / 0.1) 0)` }} />
              <span className="mt-1 flex justify-between text-xs text-muted">{[1, 7, 14, 21, 30].map((n) => <span key={n}>{n}</span>)}</span>
            </label>
          </div>
        </fieldset>

        <fieldset ref={(el) => { steps.current[1] = el; }} hidden={step !== 1} className="grid gap-4 sm:grid-cols-2">
          <label><span className="label">{t("form.adults")}</span><input type="number" min={1} name="adults" defaultValue={2} className="field" /></label>
          <label><span className="label">{zh ? "儿童（12岁以下）" : "Children (under 12)"}</span><input type="number" min={0} name="children" defaultValue={0} className="field" /></label>
          <label className="sm:col-span-2">
            <span className="label">{zh ? "酒店等级" : "Hotel class"}</span>
            <select name="hotel" className="field" defaultValue="4">
              <option value="3">3★ {zh ? "舒适" : "Comfort"}</option><option value="4">4★ {zh ? "优选" : "Superior"}</option><option value="5">5★ {zh ? "豪华" : "Luxury"}</option>
            </select>
          </label>
        </fieldset>

        <fieldset ref={(el) => { steps.current[2] = el; }} hidden={step !== 2}>
          <legend className="font-semibold">{zh ? "您的兴趣" : "What are you interested in?"}</legend>
          <div className="mt-3 flex flex-wrap gap-2">{INTERESTS.map(([en, z]) => <Chip key={en} name="interests" value={en} label={zh ? z : en} />)}</div>
          <label className="mt-6 block">
            <span className="label">{zh ? "每人预算（不含国际机票）" : "Budget per person (excl. international flights)"}</span>
            <select name="budget" className="field" defaultValue={BUDGETS[1]}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
          </label>
        </fieldset>

        <fieldset ref={(el) => { steps.current[3] = el; }} hidden={step !== 3} className="grid gap-4 sm:grid-cols-2">
          <label><span className="label">{t("form.name")} *</span><input required name="name" className="field" /></label>
          <label><span className="label">{t("form.email")} *</span><input required type="email" name="email" className="field" /></label>
          <label><span className="label">{t("form.phone")} / WhatsApp</span><input name="phone" className="field" /></label>
          <label><span className="label">{zh ? "国家" : "Country"}</span><input name="country" className="field" /></label>
          <label className="sm:col-span-2">
            <span className="label">{zh ? "还有什么想告诉我们的？" : "Anything else we should know?"}</span>
            <textarea name="message" rows={3} className="field" placeholder={zh ? "例如：特殊饮食、庆祝蜜月……" : "e.g. dietary needs, celebrating a honeymoon…"} />
          </label>
        </fieldset>
      </div>

      <Error />
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-muted hover:text-brand"><FontAwesomeIcon icon={faArrowLeft} /> {zh ? "上一步" : "Back"}</button>
        ) : <span />}
        {step < STEPS.length - 1 ? (
          <button className="btn btn-accent">{zh ? "下一步" : "Next"} <FontAwesomeIcon icon={faArrowRight} /></button>
        ) : (
          <SubmitButton label={zh ? "获取免费方案" : "Get my free proposal"} />
        )}
      </div>
    </form>
  );
}
