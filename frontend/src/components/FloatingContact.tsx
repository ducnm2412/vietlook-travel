"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export default function FloatingContact() {
  const { t } = useLang();
  const [wechat, setWechat] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3">
      {wechat && (
        <div className="w-56 rounded-xl bg-white p-4 text-center text-sm shadow-xl ring-1 ring-black/10">
          <p className="font-semibold">WeChat</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.wechatQr} alt="WeChat QR" className="mx-auto mt-2 h-36 w-36 object-contain" />
          <p className="mt-1 font-bold text-[#07c160]">{SITE.wechatId}</p>
          <p className="mt-1 text-xs text-muted">Add us on WeChat · 添加微信咨询</p>
        </div>
      )}
      <a href={SITE.whatsapp} target="_blank" rel="noopener" className="fab-pulse fab-pop grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg" aria-label="WhatsApp" title="WhatsApp">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>
      </a>
      <button onClick={() => setWechat(!wechat)} className="fab-pop grid h-12 w-12 place-items-center rounded-full bg-[#07c160] text-white shadow-lg" aria-label="WeChat" title="WeChat">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M9 3C4.6 3 1 6 1 9.7c0 2.1 1.2 4 3 5.2l-.7 2.2 2.6-1.3c.9.3 2 .5 3.1.5h.6a5.8 5.8 0 0 1-.2-1.5c0-3.5 3.4-6.3 7.5-6.3h.6C16.8 5.4 13.3 3 9 3Zm-2.8 3.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5.6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM16.9 10c-3.4 0-6.1 2.3-6.1 5.1s2.7 5.1 6.1 5.1c.7 0 1.4-.1 2.1-.3l2 1.1-.5-1.8c1.5-1 2.5-2.4 2.5-4.1 0-2.8-2.7-5.1-6.1-5.1Zm-2 2.6a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Zm4 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z"/></svg>
      </button>
      <a href={`tel:+${SITE.phoneRaw}`} className="fab-pulse fab-pop grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lg" aria-label={t("float.hotline")} title={t("float.hotline")}>
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>
      </a>
    </div>
  );
}
