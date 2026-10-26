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
import ThemeTiles from "@/components/ThemeTiles";
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

      <PackageTours tours={packages} />

      <ServicesShowcase />

      {/* Tour theo chủ đề */}
      <section className="container-x py-14 md:py-20">
        <SectionHeading center kicker={<L en="Tour styles" zh="旅行风格" />} title={<L en="Find your way to travel" zh="找到适合您的旅行方式" />} sub={<L en="Eight ways to see Vietnam – pick a style and browse our private tours." zh="八种游览越南的方式，选择风格，浏览我们的私人线路。" />} />
        <ThemeTiles themes={TOUR_THEMES} />
      </section>

      <RegionTours destinations={destinations} />

      <WhyVietlook />

      <TailorMadeSection />

      <ExperienceCruise culture={experiences} cruise={cruises} />

      <Divider shape="waves" from="#ffffff" to="#f7f3ec" />
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
