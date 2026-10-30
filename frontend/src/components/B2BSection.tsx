import Link from "@/components/LocaleLink";
import { L, T } from "@/lib/i18n";
import B2BStar from "./B2BStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck, faHandshake } from "@fortawesome/free-solid-svg-icons";

const POINTS = [
  { en: "Net rates", zh: "净价", d: "Competitive contract rates for agents", dzh: "为旅行社提供有竞争力的合同价" },
  { en: "White-label documents", zh: "白标文件", d: "Itineraries and vouchers under your brand", dzh: "以您的品牌出具行程与凭证" },
  { en: "Dedicated account manager", zh: "专属客户经理", d: "Fast quotes and 24/7 on-tour support", dzh: "快速报价，行程中全天候支持" },
  { en: "One partner, all services", zh: "一站式服务", d: "Tours, cars, hotels, visa and fast-track", dzh: "线路、包车、酒店、签证与快速通关" },
];

// Khối B2B (section đầu dưới hero trang chủ) theo bố cục kiểu lotuscharmtravel.com:
// ảnh ghép công trình Việt Nam bên trái, chữ bên phải, nền giấy "wallpaper" (vòng tròn mờ + logo in chìm, đứng yên khi cuộn trên máy tính)
export default function B2BSection() {
  return (
    <section className="b2b-wallpaper relative isolate overflow-hidden py-16 md:py-24">
      {/* Biểu tượng logo in chìm sau phần chữ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-mark.webp" alt="" aria-hidden width={210} height={210} loading="lazy" className="pointer-events-none b2b-watermark absolute right-[8%] top-1/2 -z-10 hidden w-[420px] -translate-y-1/2 opacity-[0.07] grayscale lg:block" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <B2BStar className="b2b-float b2b-in mx-auto w-full max-w-[560px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]" />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><T k="sec.b2b.k" /></p>
          <h2 className="mt-3 flex gap-3 font-card text-3xl font-semibold leading-tight text-brand-dark md:text-[2.5rem]">
            <FontAwesomeIcon icon={faHandshake} className="b2b-wave mt-1 shrink-0 text-2xl text-accent md:text-3xl" />
            <span><T k="sec.b2b.t" /></span>
          </h2>

          {/* Đường kẻ trang trí có hình thoi ở giữa */}
          <div className="my-6 flex items-center gap-3 text-accent" aria-hidden>
            <span className="b2b-line h-px flex-1 bg-black/15" />
            <span className="b2b-diamond h-2 w-2 rotate-45 border border-accent" />
            <span className="b2b-line h-px flex-1 bg-black/15" />
          </div>

          <p className="leading-relaxed text-ink/75"><T k="sec.b2b.s" /></p>
          <ul className="b2b-list mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.en} className="flex gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="mt-1 shrink-0 text-accent" />
                <span>
                  <span className="block font-semibold text-ink"><L en={p.en} zh={p.zh} /></span>
                  <span className="block text-sm text-muted"><L en={p.d} zh={p.dzh} /></span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/partners" className="btn btn-accent group mt-8 inline-flex !rounded-full !px-7"><L en="Become a partner" zh="成为合作伙伴" /> <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </section>
  );
}
