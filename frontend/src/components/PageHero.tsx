import LogoBadge from "./LogoBadge";
import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import { T } from "@/lib/i18n";

// Ảnh Wikimedia Commons (CC BY / CC BY-SA) bắt buộc ghi nguồn
export const HERO_CREDITS: Record<string, [string, string]> = {
  "/images/heroes/about.webp": ["Photo: Hòa Nguyễn / CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Van_Long_Swamp_(24135913297).jpg"],
  "/images/heroes/contact.webp": ["Photo: Steffen Schmitz / CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:H%E1%BA%A1_Long_Bay,_Ti_T%E1%BB%91p_Island,_2020-01_CN-01.jpg"],
  "/images/themes/luxury.webp": ["Photo: Jakub Hałun / CC BY 4.0", "https://commons.wikimedia.org/wiki/File:View_of_sea_from_Titov_Island,_Ha_Long_Bay,_Vietnam,_20240128_1337_3732.jpg"],
  "/images/heroes/partners.webp": ["Photo: Jakub Hałun / CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Road_and_paddy_fields_in_Sa_Pa,_Vietnam,_20240126_1203_3590.jpg"],
  "/images/destinations/hero/ha-noi-tour.webp": ["Photo: Richard Mortel from Riyadh, Saudi Arabia / CC BY 2.0", "https://commons.wikimedia.org/wiki/File%3ASunbeam_Bridge%2C_Hoan_Kiem_Lake%2C_Hanoi_%282%29_%2837610144095%29.jpg"],
  "/images/destinations/hero/ha-long-tour.webp": ["Photo: Vyacheslav Argenberg / CC BY 4.0", "https://commons.wikimedia.org/wiki/File%3AHa_Long_Bay%2C_Tower_karsts.jpg"],
  "/images/destinations/hero/sapa-tour.webp": ["Photo: Alphab.fr / CC BY 2.0", "https://commons.wikimedia.org/wiki/File%3ARice_fields_near_Sapa%2C_Vi%C3%AAt_Nam.jpg"],
  "/images/destinations/hero/ha-giang-tour.webp": ["Photo: Khánh Hmoong / CC BY 2.0", "https://commons.wikimedia.org/wiki/File%3AMa_Pi_Leng_Pass_winding_road_Ha_Giang_Vietnam.jpg"],
  "/images/destinations/hero/ninh-binh-tour.webp": ["Photo: Jakub Hałun / CC BY 4.0", "https://commons.wikimedia.org/wiki/File%3ATour_boats_at_Trang_An_Landscape_Complex%2C_Ninh_Binh_Province%2C_Vietnam%2C_20240202_1446_5308.jpg"],
  "/images/destinations/hero/cao-bang-tour.webp": ["Photo: jankgo / CC BY 2.0", "https://commons.wikimedia.org/wiki/File%3ABan_Gioc_-_Detian_Falls2.jpg"],
  "/images/destinations/hero/hue-tour.webp": ["Photo: Supanut Arunoprayote.\n\nFeel free to use / CC BY 4.0", "https://commons.wikimedia.org/wiki/File%3AMeridian_Gate%2C_Hue_%28I%29.jpg"],
  "/images/destinations/hero/da-nang-tour.webp": ["Photo: DvTor8303 / CC0", "https://commons.wikimedia.org/wiki/File%3AGolden_Bridge_at_Ba_Na_Hills_20250718.jpg"],
  "/images/destinations/hero/hoi-an.webp": ["Photo: Steffen Schmitz / CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File%3AH%E1%BB%99i_An%2C_Ch%C3%B9a_C%E1%BA%A7u%2C_2020-01_CN-02.jpg"],
  "/images/destinations/hero/quang-binh-tour.webp": ["Photo: Andre Hospers / CC BY 4.0", "https://commons.wikimedia.org/wiki/File%3ADong_Hoi_Phong_Nha_grotten_%2868776%29.jpg"],
  "/images/destinations/hero/nha-trang-tour.webp": ["Photo: calflier001 / CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File%3ANHA_TRANG_BAY_VIETNAM_JAN_2012_%286821806424%29.jpg"],
  "/images/destinations/hero/ho-chi-minh-tour.webp": ["Photo: Steffen Schmitz / CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File%3AHo_Chi_Minh_City%2C_Notre-Dame_Basilica%2C_2020-01_CN-01.jpg"],
  "/images/destinations/hero/mui-ne-tour.webp": ["Photo: Vyacheslav Argenberg / CC BY 4.0", "https://commons.wikimedia.org/wiki/File%3AVietnam%2C_Mui_Ne_sand_dunes%2C_trees_on_the_sand.jpg"],
  "/images/destinations/hero/phu-quoc-tour.webp": ["Photo: Elmschrat / CC0", "https://commons.wikimedia.org/wiki/File%3A1_Phu_Quoc_sunset.jpg"],
};

export function HeroCredit({ image }: { image: string }) {
  const c = HERO_CREDITS[image];
  return c ? <a href={c[1]} target="_blank" rel="noopener" className="absolute bottom-2 right-3 text-[10px] text-white/60 hover:text-white">{c[0]}</a> : null;
}

// Logo huy hiệu (vòng chữ xoay) nổi lơ lửng góc phải ảnh đầu trang con – chỉ hiện từ tablet trở lên
export function HeroBadge() {
  return (
    <div aria-hidden className="hero-badge pointer-events-none absolute right-[6%] top-1/2 hidden -translate-y-1/2 md:block">
      <LogoBadge alt="" className="h-36 w-36 lg:h-44 lg:w-44" />
    </div>
  );
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
