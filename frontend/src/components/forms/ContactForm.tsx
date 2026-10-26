"use client";

import { useLang } from "@/lib/i18n";
import { ContactFields, formData, useInquiry } from "./useInquiry";

/** Form liên hệ chung, type="partner" dùng cho trang đối tác B2B */
export default function ContactForm({ type = "contact" }: { type?: "contact" | "partner" }) {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const { state, submit, Success, Error, SubmitButton } = useInquiry(type);
  if (state.status === "ok") return <Success />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(formData(e)); }} className="space-y-5 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
      <ContactFields />
      {type === "partner" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label><span className="label">{zh ? "国家 / 市场" : "Country / market"}</span><input name="market" className="field" /></label>
          <label><span className="label">{zh ? "每年客量" : "Estimated pax per year"}</span><input name="volume" className="field" /></label>
        </div>
      )}
      <label className="block"><span className="label">{t("form.message")}</span><textarea name="message" rows={5} className="field" /></label>
      <Error />
      <SubmitButton />
    </form>
  );
}
