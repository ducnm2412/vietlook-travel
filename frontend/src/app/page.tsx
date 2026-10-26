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
import { getDestinations, getPosts, getTours } from "@/lib/api";

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
      <HeroVideo />

      <PackageTours tours={packages} />

      <ServicesShowcase />

      <RegionTours destinations={destinations} />

      <TailorMadeSection />

      <ExperienceCruise culture={experiences} cruise={cruises} />

      <Divider shape="waves" from="#ffffff" to="#f7f3ec" />
      <TravelGuide posts={posts.items} />

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
