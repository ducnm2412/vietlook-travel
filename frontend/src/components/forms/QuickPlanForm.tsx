"use client";

import { useLang } from "@/lib/i18n";
import type { Destination } from "@/lib/api";
import { formData, useInquiry } from "./useInquiry";

const DURATIONS = [["Up to 1 week", "一周以内"], ["1 – 2 weeks", "1–2周"], ["2 – 3 weeks", "2–3周"], ["3+ weeks", "3周以上"]] as const;

// Form lên kế hoạch nhanh ở trang chủ: gửi yêu cầu loại "tailor-made" như form đầy đủ ở /tailor-made
// wide: bản nằm ngang (4 cột trên máy tính) cho section Plan your trip
export default function QuickPlanForm({ destinations, wide = false }: { destinations: Destination[]; wide?: boolean }) {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry("tailor-made");
  if (state.status === "ok") return <Success />;

  // Điện thoại: 2 cột, nhãn nhỏ, ô nhập thấp hơn cho gọn (CSS kèm component, xem .qp bên dưới)
  return (
    <form onSubmit={(e) => { e.preventDefault(); submit({ ...formData(e), source: "home-quick-plan" }); }} className={`qp grid grid-cols-2 gap-x-3 gap-y-3 rounded-2xl bg-white p-4 text-ink shadow-2xl sm:gap-4 sm:p-6 md:p-8 ${wide ? "lg:grid-cols-4 lg:items-end" : ""}`}>
      <label><span className="label">{t("form.name")} *</span><input required name="name" className="field" /></label>
      <label><span className="label">{t("form.email")} *</span><input required type="email" name="email" className="field" /></label>
      <label><span className="label">{zh ? "电话 / WhatsApp / 微信" : "WhatsApp / phone"}</span><input name="phone" className="field" /></label>
      <label><span className="label">{zh ? "出行月份" : "Travel month"}</span><input type="month" name="month" className="field" /></label>
      <label><span className="label">{zh ? "人数" : "Travellers"}</span><input type="number" min={1} name="adults" defaultValue={2} className="field" /></label>
      <label>
        <span className="label">{zh ? "天数" : "Trip length"}</span>
        <select name="duration" className="field">
          {DURATIONS.map(([en, z]) => <option key={en} value={en}>{zh ? z : en}</option>)}
        </select>
      </label>
      <label className="col-span-2">
        <span className="label">{zh ? "想去哪里？" : "Where would you like to go?"}</span>
        <select name="destinations" className="field">
          <option value="">{zh ? "还没决定 / 多个地方" : "Not sure yet / several places"}</option>
          {destinations.map((d) => <option key={d.slug} value={d.name}>{zh ? d.zh : d.name}</option>)}
        </select>
      </label>
      <label className={`col-span-2 ${wide ? "lg:col-span-3" : ""}`}>
        <span className="label">{zh ? "您的想法" : "Your ideas"}</span>
        <textarea name="message" rows={wide ? 1 : 2} className="field" placeholder={zh ? "例如：喜欢美食、徒步，想住海边……" : "e.g. we love food and hiking, want a few beach days…"} />
      </label>
      <style>{"@media (max-width: 639px) { .qp .label { margin-bottom: 0.25rem; font-size: 0.75rem; } .qp .field { padding: 0.5rem 0.75rem; font-size: 0.875rem; } }"}</style>
      <div className={`col-span-2 ${wide ? "lg:col-span-1 [&_button]:w-full" : ""}`}><Error /><SubmitButton label={zh ? "免费获取行程" : "Get my free itinerary"} /></div>
    </form>
  );
}
