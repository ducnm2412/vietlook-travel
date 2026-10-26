import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Img from "./Img";
import Divider from "./Divider";
import { T, type DictKey } from "@/lib/i18n";

// 3 dịch vụ chính, theo bố cục khối dịch vụ trên vietlooktravel.com
const SERVICES: { key: DictKey; href: string; image: string }[] = [
  { key: "nav.tours", href: "/tours", image: "/images/service-tour.webp" },
  { key: "nav.car", href: "/car-rental", image: "/images/service-car.webp" },
  { key: "nav.visa", href: "/visa", image: "https://cdn.ngay.net/khach/welcome-vietlook.png?format=auto" },
];

export default function ServicesShowcase() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-40 md:pt-40">
      <Divider shape="mountains" to="#ffffff" overlay="top" />
      {/* Ảnh nền Tràng An (Ninh Bình) */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/services-bg.webp')] bg-cover bg-center parallax-bg" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-brand-dark/55" />
      <div className="stagger container-x grid gap-8 md:grid-cols-3">
        {SERVICES.map((s) => (
          <Link key={s.key} href={s.href} className="group block">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/50" />
              <h3 className="text-center text-lg font-bold uppercase tracking-wide text-white drop-shadow transition group-hover:text-accent md:text-xl">
                <T k={s.key} />
              </h3>
              <span className="h-px flex-1 bg-white/50" />
              <FontAwesomeIcon icon={faChevronRight} className="text-sm text-white/80 transition group-hover:translate-x-1 group-hover:text-accent" />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Img src={s.image} alt="" width={680} className="aspect-[4/5] transition duration-700 group-hover:scale-105" />
            </div>
          </Link>
        ))}
      </div>

      {/* Sóng ở đáy, lớp cuối cùng màu be trùng nền section tour theo miền */}
      <svg className="hero-waves absolute inset-x-0 -bottom-px h-16 w-full md:h-24" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden>
        <defs>
          <path id="services-wave" d="M-160 44c7.5 0 14.5-8 22-8s14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8v44h-352z" />
        </defs>
        <g>
          <use href="#services-wave" x="48" y="0" fill="rgba(247,243,236,0.3)" />
          <use href="#services-wave" x="48" y="3" fill="rgba(247,243,236,0.55)" />
          <use href="#services-wave" x="48" y="7" fill="#f7f3ec" />
        </g>
      </svg>
    </section>
  );
}
