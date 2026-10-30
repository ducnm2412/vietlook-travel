import HeroVideo from "@/components/HeroVideo";
import PackageTours from "@/components/PackageTours";
import ServicesShowcase from "@/components/ServicesShowcase";
import RegionTours from "@/components/RegionTours";
import TailorMadeSection from "@/components/TailorMadeSection";
import ExperienceCruise from "@/components/ExperienceCruise";
import TravelGuide from "@/components/TravelGuide";
import Divider from "@/components/Divider";
import Reviews from "@/components/Reviews";
import NewsSection from "@/components/NewsSection";
import SectionHeading from "@/components/SectionHeading";
import HowToBook from "@/components/HowToBook";
import ThemeTiles from "@/components/ThemeTiles";
import B2BSection from "@/components/B2BSection";
import WhyVietlook from "@/components/WhyVietlook";
import PlanTripSection from "@/components/PlanTripSection";
import { L } from "@/lib/i18n";
import { TOUR_THEMES } from "@/lib/themes";
import { getDestinations, getPosts, getTours } from "@/lib/content";

export default async function Home() {
  const [experiences, cruises, packages, destinations, posts, news] = await Promise.all([
    getTours("?theme=travel-experience&limit=6"),
    getTours("?theme=cruise-tour&limit=6"),
    getTours("?category=vietnam-tours&minDays=5"),
    getDestinations(),
    getPosts("?type=guide&limit=8"),
    getPosts("?type=news&limit=4"),
  ]);

  return (
    <>
      <HeroVideo destinations={destinations} />

      {/* Thứ tự: 1. B2B → 2. Dịch vụ toàn Việt Nam (tour, xe, visa) → 3. Tour */}
      <B2BSection />

      {/* Sáu lý do chọn Vietlook: cùng nền giấy kẻ vòng với B2B nên 2 section liền một khối */}
      <WhyVietlook />

      <ServicesShowcase />

      {/* Bọc 2 section để trống đồng của RegionTours tràn xuống nền PackageTours; nền be đặt ở khối bọc để khi section bên dưới còn đang hiện dần (reveal) không lộ khoảng trắng */}
      <div className="relative isolate overflow-x-clip bg-[#f7f1e6]">
      <RegionTours destinations={destinations} />

      <PackageTours tours={packages} />
      </div>

      {/* Tour theo chủ đề */}
      {/* Nền giấy cát có dãy núi mờ ở đáy (styles-bg-sand.webp, tự vẽ); mép trên cùng màu #f7f1e6 với Package Tours nên liền mạch */}
      <section className="bg-[#f7f1e6] bg-[url('/images/styles-bg-sand.webp')] bg-cover bg-bottom">
      <div className="container-x py-14 md:py-20">
        <SectionHeading center kicker={<L en="Tour styles" zh="旅行风格" />} title={<L en="Find your way to travel" zh="找到适合您的旅行方式" />} sub={<L en="Eight ways to see Vietnam – pick a style and browse our private tours." zh="八种游览越南的方式，选择风格，浏览我们的私人线路。" />} />
        <ThemeTiles themes={TOUR_THEMES} />
        {/* Quy trình đặt tour, chung nền giấy cát (dãy núi nằm dưới các bước) */}
        <HowToBook />
      </div>
      </section>

      <TailorMadeSection />

      <ExperienceCruise culture={experiences} cruise={cruises} />

      <TravelGuide posts={posts.items} />

      <PlanTripSection destinations={destinations} />

      {/* Nền ảnh vịnh biển cho các section cuối, phủ xanh đậm để chữ trắng dễ đọc */}
      <div className="relative isolate">
        <div className="absolute inset-0 -z-20 bg-[url('/images/bay-bg.webp')] bg-cover bg-center parallax-bg" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/85" aria-hidden />
        <Reviews />
        <NewsSection posts={news.items} />
        <Divider shape="mountains" to="#08312f" />
      </div>
    </>
  );
}
