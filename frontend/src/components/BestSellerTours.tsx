import Link from "@/components/LocaleLink";
import TourCard from "./TourCard";
import SectionHeading from "./SectionHeading";
import { L } from "@/lib/i18n";
import type { Tour } from "@/lib/api";
import { findTour } from "@/lib/content";
import { findTheme } from "@/lib/themes";
import { FEATURED_TOUR } from "./BestSellerTour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarCheck, faCommentDots, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

const PERKS = [
  { icon: faHandHoldingDollar, en: "No prepayment to enquire", zh: "咨询无需预付" },
  { icon: faCalendarCheck, en: "Free changes 15+ days before", zh: "出发前15天以上免费改期" },
  { icon: faCommentDots, en: "Reply within 24 hours", zh: "24小时内回复" },
];

// Khối khích lệ đặt tour + lưới tour bán chạy (tour nhiều ngày trong chủ đề "Hand-picked" – đội ngũ đề xuất nhiều nhất)
export default function BestSellerTours({ limit = 4, bg = "bg-photo-light" }: { limit?: number; bg?: string }) {
  const tours = (findTheme("hand-picked")?.tours ?? [])
    .map(findTour)
    // Bỏ tour đang được giới thiệu riêng (BestSellerTour) để không trùng khi 2 khối đứng cạnh nhau
    .filter((t): t is Tour => !!t && t.days > 1 && t.slug !== FEATURED_TOUR)
    .slice(0, limit)
    .map(({ contentHtml, contentHtmlZh, ...t }) => t);
  if (!tours.length) return null;

  return (
    <section className={`${bg} py-14 md:py-20`}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title={<L en="Tours you may like" zh="您可以参考的线路" />}
            sub={<L en="Some of our most-loved itineraries for inspiration. Every tour is private, flexible and planned by local experts." zh="以下是我们最受欢迎的部分行程，供您参考。所有线路均为私人团，灵活安排，由本地专家规划。" />}
          />
          <Link href="/themes/hand-picked" className="mb-10 inline-flex items-center gap-2 font-semibold text-brand hover:underline"><L en="See more tours" zh="查看更多线路" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{tours.map((t) => <TourCard key={t.slug} tour={t} />)}</div>

        {/* Dải ưu đãi + nút hành động */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-brand-dark px-6 py-6 text-white md:px-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {PERKS.map((p) => (
              <li key={p.en} className="flex items-center gap-3"><FontAwesomeIcon icon={p.icon} className="text-xl text-accent" /><span className="font-medium"><L en={p.en} zh={p.zh} /></span></li>
            ))}
          </ul>
          <Link href="/tailor-made" className="btn btn-accent"><L en="Plan my trip" zh="规划我的行程" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
      </div>
    </section>
  );
}
