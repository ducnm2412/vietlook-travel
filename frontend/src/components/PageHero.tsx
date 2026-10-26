import Link from "next/link";
import type { ReactNode } from "react";
import { T } from "@/lib/i18n";

// Tiêu đề đầu trang con: ảnh nền riêng theo nội dung trang, phủ tối để chữ trắng dễ đọc
export default function PageHero({ title, sub, image }: { title: ReactNode; sub?: ReactNode; image: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="container-x py-16 text-white md:py-28">
        {/* Đường dẫn: Home / Tên trang */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80 drop-shadow">
          <Link href="/" className="hover:text-white hover:underline"><T k="nav.home" /></Link>
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </nav>
        <h1 className="max-w-3xl font-card text-4xl font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow">{sub}</p>}
      </div>
    </section>
  );
}
