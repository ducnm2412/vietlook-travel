"use client";

import { useLang } from "@/lib/i18n";

type Line = { en: string; zh: string };

// Dòng chữ viết tay kèm mũi tên cong (chỉ hiện từ md trở lên, ẩn trên điện thoại).
// Mặc định: chữ căn trái, mũi tên chỉ sang phải (về phía ảnh bên cạnh).
// side: ghi chú đặt lệch sang trái/phải tiêu đề, mũi tên cong chỉ xuống phần nội dung bên dưới.
export default function HandNote({ lines, light = false, side, className = "" }: { lines: Line[]; light?: boolean; side?: "left" | "right"; className?: string }) {
  const { lang } = useLang();
  const color = light ? "text-accent" : "text-brand";
  const text = lines.map((l) => (lang === "zh" ? l.zh : l.en));

  // Ghi chú lệch về một góc, xoay nhẹ như viết tay; mũi tên cong chỉ xuống nội dung bên dưới
  if (side)
    return (
      <div className={`relative mt-4 hidden w-fit md:mt-0 md:block ${side === "left" ? "md:-rotate-3" : "md:rotate-2"} ${color} ${className}`}>
        <p className="font-hand text-2xl leading-snug md:text-[1.75rem]">
          {text.map((t, i) => <span key={i} className={`block ${side === "right" && i > 0 ? "md:pl-8" : ""}`}>{t}</span>)}
        </p>
        <svg viewBox="0 0 80 70" className={`absolute top-full hidden h-10 w-12 md:block ${side === "left" ? "right-2 -scale-x-100" : "left-0"}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M60 4 C 30 10, 14 30, 22 62" />
          <path d="M12 52 L22 64 L32 52" />
        </svg>
      </div>
    );

  return (
    <div className={`relative mt-4 hidden items-end md:inline-flex gap-3 ${color} ${className}`}>
      <p className="font-hand text-2xl leading-snug md:text-[1.75rem]">
        {text.map((t, i) => <span key={i} className="block">{t}</span>)}
      </p>
      <svg viewBox="0 0 120 80" className="mb-2 hidden h-14 w-24 shrink-0 md:block" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 74 C 30 30, 60 14, 108 12" />
        <path d="M92 2 L109 12 L94 24" />
      </svg>
    </div>
  );
}
