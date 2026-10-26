"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { formData, useInquiry } from "./useInquiry";
import type { Destination } from "@/lib/api";

const INTERESTS = [
  ["Nature & landscapes", "自然风光"], ["Culture & history", "文化历史"], ["Food & cooking", "美食烹饪"],
  ["Trekking & adventure", "徒步探险"], ["Beach & relax", "海滩休闲"], ["Cruises", "游轮之旅"],
  ["Local homestays", "当地民宿"], ["Photography", "摄影"], ["Golf", "高尔夫"],
] as const;
const BUDGETS = ["< $1,000", "$1,000 – 1,500", "$1,500 – 2,000", "$2,000 – 3,000", "> $3,000"];
const DURATIONS = [["Up to 1 week", "一周以内"], ["1 – 2 weeks", "1–2周"], ["2 – 3 weeks", "2–3周"], ["3+ weeks", "3周以上"]] as const;

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl bg-white p-6 ring-1 ring-black/5 md:p-8">
      <legend className="sr-only">{title}</legend>
      <h3 className="mb-5 font-card text-xl font-bold text-brand">{title}</h3>
      {children}
    </fieldset>
  );
}

// Form yêu cầu tour theo yêu cầu (một trang, chia nhóm như localvietnam.com)
export default function TailorRequestForm({ destinations }: { destinations: Destination[] }) {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry("tailor-made");
  const [knowDates, setKnowDates] = useState(true);

  if (state.status === "ok") return <Success />;

  const pick = (e: React.FormEvent<HTMLFormElement>, name: string) => new FormData(e.currentTarget).getAll(name);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({ ...formData(e), destinations: pick(e, "destinations"), interests: pick(e, "interests") });
      }}
      className="space-y-6"
    >
      <Box title={zh ? "您的联系方式" : "Your contact details"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label><span className="label">{zh ? "名" : "First name"} *</span><input required name="name" className="field" /></label>
          <label><span className="label">{zh ? "姓" : "Last name"}</span><input name="lastName" className="field" /></label>
          <label><span className="label">{t("form.email")} *</span><input required type="email" name="email" className="field" /></label>
          <label><span className="label">{t("form.phone")}</span><input name="phone" className="field" /></label>
          <label><span className="label">{zh ? "国家" : "Country"}</span><input name="country" className="field" /></label>
          <label><span className="label">{t("form.company")}</span><input name="company" className="field" /></label>
        </div>
      </Box>

      <Box title={zh ? "出行日期" : "Travel date"}>
        <div className="mb-4 flex flex-wrap gap-2">
          {[true, false].map((v) => (
            <button type="button" key={String(v)} onClick={() => setKnowDates(v)} className={`rounded-full border px-4 py-2 text-sm ${knowDates === v ? "border-brand bg-brand text-white" : "hover:border-brand"}`}>
              {v ? (zh ? "我已确定日期" : "I know my travel dates") : zh ? "日期还不确定" : "Not sure yet"}
            </button>
          ))}
        </div>
        {knowDates ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="label">{zh ? "抵达日期" : "Arrival date"}</span><input type="date" name="arrival" className="field" /></label>
            <label><span className="label">{zh ? "离开日期" : "Departure date"}</span><input type="date" name="departure" className="field" /></label>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="label">{zh ? "大概月份" : "Approximate month"}</span><input type="month" name="month" className="field" /></label>
            <label>
              <span className="label">{zh ? "行程时长" : "Trip length"}</span>
              <select name="duration" className="field">{DURATIONS.map(([en, z]) => <option key={en} value={en}>{zh ? z : en}</option>)}</select>
            </label>
          </div>
        )}
      </Box>

      <Box title={zh ? "预算与人数" : "Budget & travellers"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="label">{zh ? "每人预算（不含国际机票）" : "Budget per person (excl. international flights)"}</span>
            <select name="budget" className="field" defaultValue={BUDGETS[1]}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
          </label>
          <label>
            <span className="label">{zh ? "酒店等级" : "Hotel class"}</span>
            <select name="hotel" className="field" defaultValue="4">
              <option value="3">3★ {zh ? "舒适" : "Comfort"}</option><option value="4">4★ {zh ? "优选" : "Superior"}</option><option value="5">5★ {zh ? "豪华" : "Luxury"}</option>
            </select>
          </label>
          <label><span className="label">{t("form.adults")}</span><input type="number" min={1} name="adults" defaultValue={2} className="field" /></label>
          <label><span className="label">{zh ? "儿童（12岁以下）" : "Children (under 12)"}</span><input type="number" min={0} name="children" defaultValue={0} className="field" /></label>
        </div>
      </Box>

      <Box title={zh ? "心愿与偏好" : "Wishes & preferences"}>
        <p className="label">{zh ? "想去哪些地方？（可多选）" : "Which places would you like to visit? (multiple)"}</p>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {destinations.map((d) => (
            <label key={d.slug} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="destinations" value={d.name} className="h-4 w-4 accent-brand" />
              {zh ? d.zh : d.name}
            </label>
          ))}
        </div>
        <p className="label">{zh ? "您的兴趣" : "What are you interested in?"}</p>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INTERESTS.map(([en, z]) => (
            <label key={en} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="interests" value={en} className="h-4 w-4 accent-brand" />
              {zh ? z : en}
            </label>
          ))}
        </div>
        <label className="block">
          <span className="label">{zh ? "还有什么想告诉我们的？" : "Anything else we should know?"}</span>
          <textarea name="message" rows={5} className="field" placeholder={zh ? "例如：特殊饮食、行动不便、庆祝蜜月……" : "e.g. dietary needs, mobility, celebrating a honeymoon…"} />
        </label>
      </Box>

      <Error />
      <div className="text-center">
        <SubmitButton label={zh ? "提交定制需求" : "Submit your tailor-made request"} />
        <p className="mt-3 text-sm text-muted">{zh ? "无需付费，无任何义务 · 24小时内回复" : "No obligation, no cost · We reply within 24 hours"}</p>
      </div>
    </form>
  );
}
