import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import TourFilter from "@/components/TourFilter";
import { T } from "@/lib/i18n";
import Link from "@/components/LocaleLink";
import { L } from "@/lib/i18n";
import { getDestinations, getThemes, getTours } from "@/lib/content";
import { findTheme } from "@/lib/themes";
import BestSellerTour from "@/components/BestSellerTour";
import Reviews from "@/components/Reviews";
import CarServicePromo from "@/components/CarServicePromo";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Tours and Holiday Packages",
  description: "Browse 200+ private tours across North, Central and South Vietnam: Halong Bay cruises, Sapa trekking, Hoi An, Mekong Delta and multi-week packages.",
  path: "/tours",
  image: "/images/heroes/tours.webp",
  keywords: ["Vietnam tours","Vietnam travel packages","Halong Bay tour","private tour Vietnam"],
});

export default async function ToursPage({ searchParams }: PageProps<"/tours">) {
  const sp = await searchParams;
  const pick = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const [tours, destinations, themes] = await Promise.all([getTours(), getDestinations(), getThemes()]);
  // ?style=<chủ đề> (từ ô tìm kiếm ở hero): chỉ lọc trong các tour của chủ đề đó
  const style = findTheme(pick("style"));
  const list = style ? tours.filter((t) => style.tours.includes(t.slug)) : tours;
  const initial = Object.fromEntries(["region", "destination", "theme", "minDays", "maxDays", "q"].map((k) => [k, pick(k)]));

  return (
    <>
      <PageHero title={<T k="nav.tours" />} sub={<T k="sec.long.s" />} image="/images/heroes/tours.webp" />
      <section className="container-x py-14">
        {/* key để bộ lọc reset khi điều hướng từ menu với query mới */}
        {style && (
          <p className="mb-6 rounded-xl bg-brand-light px-4 py-3 text-sm">
            <L en="Travel style:" zh="旅行风格：" /> <b><L en={style.name} zh={style.zh} /></b>
            <Link href="/tours" className="ml-3 font-semibold text-brand hover:underline"><L en="Show all styles" zh="显示全部风格" /> ×</Link>
          </p>
        )}
        <TourFilter key={JSON.stringify({ ...initial, style: style?.slug })} tours={list} destinations={destinations} themes={themes} initial={initial} initialPage={Math.max(1, parseInt(pick("page")) || 1)} />
      </section>

      <BestSellerTour />

      {/* Đánh giá khách: component dùng chữ trắng nên đặt trên nền ảnh tối */}
      <div className="bg-photo-dark">
        <Reviews />
      </div>

      <CarServicePromo />
    </>
  );
}
