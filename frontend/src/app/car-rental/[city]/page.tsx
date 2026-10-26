import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import CarQuoteForm from "@/components/forms/CarQuoteForm";
import TourCard from "@/components/TourCard";
import { NationwideService } from "@/components/car/CarFleet";
import { CAR_CITIES, cityPath } from "@/components/car/cities";
import { L, T } from "@/lib/i18n";
import { getCarCities, getTours, getVehicles } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

const findCity = (city: string) => CAR_CITIES.find((c) => cityPath(c.slug) === `/car-rental/${city}`);

export const generateStaticParams = () => CAR_CITIES.map((c) => ({ city: cityPath(c.slug).split("/").pop()! }));

export async function generateMetadata({ params }: PageProps<"/car-rental/[city]">): Promise<Metadata> {
  const city = findCity((await params).city);
  if (!city) return { title: "Private car" };
  return pageMeta({
    title: `${city.name} Private Cars with Driver`,
    description: `Private car transfers in ${city.name}: airport pick-up, city tours and day trips with professional drivers. Fixed prices, tolls included.`,
    path: cityPath(city.slug),
  });
}

export default async function CarCityPage({ params }: PageProps<"/car-rental/[city]">) {
  const city = findCity((await params).city);
  if (!city) notFound();
  const [cars, vehicles, cities] = await Promise.all([getTours("?kind=car&limit=200"), getVehicles(), getCarCities()]);
  const list = cars.filter((t) => t.categories.includes(city.slug));
  const hero = cities.find((c) => c.slug === city.slug)?.image || list[0]?.image || "/images/heroes/car.webp";

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-black/30" />
        <div className="container-x grid items-center gap-10 py-14 text-white md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white hover:underline"><T k="nav.home" /></Link>
              <span className="mx-2">/</span>
              <Link href="/car-rental" className="hover:text-white hover:underline"><T k="nav.car" /></Link>
              <span className="mx-2">/</span>
              <span className="text-white"><L en={city.name} zh={city.zh} /></span>
            </nav>
            <h1 className="font-card text-4xl font-bold leading-tight md:text-5xl">
              <L en={`${city.name} Private Cars`} zh={`${city.zh}司机包车`} />
            </h1>
            <p className="mt-4 flex items-center gap-2 text-white/85"><FontAwesomeIcon icon={faPlaneArrival} className="text-accent" />{city.airport}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {[["Fixed price per car, tolls & parking included", "按车固定价格，含过路费和停车费"], ["Professional local drivers", "专业本地司机"], ["Daily departure, any time you choose", "每日出发，时间自选"]].map(([en, zh]) => (
                <li key={en} className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-accent" /><L en={en} zh={zh} /></li>
              ))}
            </ul>
          </div>
          <div className="text-ink"><CarQuoteForm vehicles={vehicles} cars={cars} /></div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <h2 className="font-card text-3xl font-bold md:text-4xl"><L en={`Private car services in ${city.name}`} zh={`${city.zh}包车服务`} /></h2>
        <p className="mb-8 mt-2 text-muted"><L en={`${list.length} routes · Daily departure`} zh={`${list.length}条路线 · 每日出发`} /></p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>

      <div className="bg-sand"><NationwideService /></div>
    </>
  );
}
