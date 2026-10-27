import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import { T } from "@/lib/i18n";

// Ảnh Wikimedia Commons (CC BY / CC BY-SA) bắt buộc ghi nguồn
export const HERO_CREDITS: Record<string, [string, string]> = {
  "/images/heroes/about.webp": ["Photo: Hòa Nguyễn / CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Van_Long_Swamp_(24135913297).jpg"],
  "/images/heroes/contact.webp": ["Photo: Steffen Schmitz / CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:H%E1%BA%A1_Long_Bay,_Ti_T%E1%BB%91p_Island,_2020-01_CN-01.jpg"],
  "/images/heroes/partners.webp": ["Photo: Jakub Hałun / CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Road_and_paddy_fields_in_Sa_Pa,_Vietnam,_20240126_1203_3590.jpg"],
};

export function HeroCredit({ image }: { image: string }) {
  const c = HERO_CREDITS[image];
  return c ? <a href={c[1]} target="_blank" rel="noopener" className="absolute bottom-2 right-3 text-[10px] text-white/60 hover:text-white">{c[0]}</a> : null;
}

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
      <HeroCredit image={image} />
    </section>
  );
}
