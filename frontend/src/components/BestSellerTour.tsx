import Link from "@/components/LocaleLink";
import Img from "./Img";
import { L } from "@/lib/i18n";
import { formatUsd } from "@/lib/api";
import { findTour, destinations } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faLocationDot, faStar, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// Tour nổi bật đặt cuối trang danh sách tour: đổi slug để giới thiệu tour khác
export const FEATURED_TOUR = "ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour";
const HIGHLIGHTS = [
  { en: "Overnight Halong Bay cruise with kayaking", zh: "下龙湾游轮过夜，含皮划艇" },
  { en: "Trang An boat ride through Ninh Binh's limestone caves", zh: "宁平长安乘船穿越石灰岩溶洞" },
  { en: "Ba Na Hills, Golden Bridge and Da Nang beaches", zh: "巴拿山、金桥与岘港海滩" },
  { en: "Lantern-lit evenings in Hoi An Ancient Town", zh: "会安古镇的灯笼之夜" },
];

// bg: lớp nền của section (mặc định ảnh nền sáng; trang tin tức dùng nền trắng để xen kẽ với section khác)
export default function BestSellerTour({ bg = "bg-photo-light" }: { bg?: string }) {
  const tour = findTour(FEATURED_TOUR);
  if (!tour) return null;
  const route = tour.destinations.map((s) => destinations.find((d) => d.slug === s)).filter(Boolean);
  const thumbs = (tour.gallery ?? []).slice(0, 3);

  return (
    <section className={`${bg} py-14 md:py-20`}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        {/* Ảnh lớn + dải ảnh nhỏ */}
        <div className="relative">
          <Img src="/images/tailor-hero.webp" alt={tour.title} width={720} className="aspect-[4/3] rounded-3xl shadow-xl" />
          {thumbs.length > 0 && (
            <div className="absolute -bottom-6 right-5 flex gap-2">
              {thumbs.map((src) => <Img key={src} src={src} alt="" width={160} className="h-20 w-24 rounded-xl border-4 border-white shadow-lg md:h-24 md:w-32" />)}
            </div>
          )}
        </div>

        <div className="pt-6 lg:pt-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Our most-booked journey" zh="最受欢迎的旅程" /></p>
          <h2 className="mt-3 font-card text-3xl font-bold leading-tight md:text-4xl"><L en={tour.title} zh={tour.titleZh ?? undefined} /></h2>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-brand" /> <L en={`${tour.days} days`} zh={`${tour.days}天`} /></span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faLocationDot} className="text-brand" /> {route.map((d) => d!.name).join(" – ")}</span>
            <span className="flex items-center gap-1 text-accent">{[0, 1, 2, 3, 4].map((i) => <FontAwesomeIcon key={i} icon={faStar} />)} <span className="ml-1 text-muted">5.0 · TripAdvisor</span></span>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h.en} className="flex gap-3 text-ink/80"><FontAwesomeIcon icon={faCircleCheck} className="mt-1 shrink-0 text-brand" /><L en={h.en} zh={h.zh} /></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {tour.priceFrom ? (
              <p className="text-sm text-muted"><L en="From" zh="起价" /> <b className="font-card text-3xl text-ink">US{formatUsd(tour.priceFrom)}</b> <L en="/ person" zh="/ 人" /></p>
            ) : null}
            <Link href={`/tours/${tour.slug}#book`} className="btn btn-accent"><L en="Book this tour" zh="预订此线路" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
            <Link href={`/tours/${tour.slug}`} className="font-semibold text-brand hover:underline"><L en="View itinerary" zh="查看行程" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
