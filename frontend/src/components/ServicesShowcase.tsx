import Link from "@/components/LocaleLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Img from "./Img";
import { T, type DictKey } from "@/lib/i18n";

// 3 dịch vụ chính, theo bố cục khối dịch vụ trên vietlooktravel.com
const SERVICES: { key: DictKey; href: string; image: string }[] = [
  { key: "nav.tours", href: "/tours", image: "/images/service-tour.webp" },
  { key: "nav.car", href: "/car-rental", image: "/images/service-car.webp" },
  { key: "nav.visa", href: "/visa", image: "https://cdn.ngay.net/khach/welcome-vietlook.png?format=auto" },
];

const WAVE_MASK = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 0H1440V44C1330 52 1180 70 1010 66C840 62 760 26 620 26C440 26 300 76 0 50Z"/></svg>')}")`;

export default function ServicesShowcase() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-40 md:pt-40">
      {/* Ảnh nền xích lô Hội An nắng chiều (khung hình từ video-src/15815621), tông be vàng hợp nền giấy B2B */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/services-bg-cyclo.webp')] bg-cover bg-center parallax-bg" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[#3a2414]/50" />
      {/* Mép trên lượn mềm (một nhịp lên xuống) cùng màu nền giấy của section B2B, thêm một lớp mờ lệch xuống tạo chiều sâu */}
      <svg className="absolute inset-x-0 -top-px h-14 w-full md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 0H1440V62C1330 68 1180 82 1010 80C840 78 760 50 620 50C440 50 300 92 0 66Z" fill="#f7f2ea" fillOpacity="0.45" />
      </svg>
      {/* Lớp đặc dùng chính nền giấy kẻ vòng của section B2B (cắt theo hình sóng) để các đường cong chạy liền xuống */}
      <div className="b2b-wallpaper absolute inset-x-0 -top-px h-14 md:h-24" style={{ maskImage: WAVE_MASK, WebkitMaskImage: WAVE_MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }} aria-hidden />
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
              <Img src={s.image} alt="" width={540} className="aspect-[4/5] transition duration-700 group-hover:scale-105" />
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
