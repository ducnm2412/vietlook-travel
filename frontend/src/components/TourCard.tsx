import Link from "next/link";
import Img from "./Img";
import { L, T } from "@/lib/i18n";
import { formatUsd, type Tour } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <Img src={tour.image} alt={tour.title} className="aspect-[4/3] transition duration-500 group-hover:scale-105" />
        {tour.kind === "tour" && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-brand">
            {tour.days} {tour.days > 1 ? <T k="card.days" /> : <T k="card.day" />}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-4 line-clamp-2 font-card text-xl font-bold leading-snug md:text-[22px] text-ink group-hover:text-brand"><L en={tour.title} zh={tour.titleZh ?? undefined} /></h3>
        <div className="mt-auto flex items-center justify-between">
          {tour.priceFrom ? (
            <span className="text-base font-medium text-muted">
              <T k="card.from" /> <b className="text-xl font-bold text-accent">{formatUsd(tour.priceFrom)}</b>
            </span>
          ) : (
            <span className="text-base font-semibold text-accent"><T k="card.price" /></span>
          )}
          <FontAwesomeIcon icon={faArrowRight} className="text-base text-brand transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
