import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeadset, faSliders, faWallet } from "@fortawesome/free-solid-svg-icons";
import { L } from "@/lib/i18n";

const FEATURES = [
  { icon: faSliders, en: "100% customised", zh: "100%定制" },
  { icon: faHeadset, en: "24/7 local support", zh: "全天候本地支持" },
  { icon: faWallet, en: "Free planning", zh: "免费规划" },
];

// Tour theo yêu cầu: nội dung ngắn, chữ lớn; nút dẫn sang trang /tailor-made
export default function TailorMadeSection() {
  return (
    <section className="relative isolate overflow-hidden md:py-16">
      {/* Ảnh nền cánh đồng lúa, phủ tối để chữ trắng dễ đọc */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/tailor-bg.webp')] bg-cover bg-center" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/55 to-black/30" aria-hidden />
      <div className="container-x grid items-center gap-8 py-12 md:gap-10 md:py-16 lg:min-h-[75vh] lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
      <div className="order-2 lg:order-1">
        <p className="text-base font-semibold uppercase tracking-[0.2em] text-accent"><L en="Tailor-made Tours" zh="定制旅游" /></p>
        <h2 className="mt-4 whitespace-nowrap font-card text-3xl font-bold sm:text-4xl leading-[1.1] text-white md:text-5xl xl:text-6xl">
          <L en="Your trip," zh="您的旅程，" />{" "}
          <span className="text-accent"><L en="your way." zh="由您做主。" /></span>
        </h2>
        <p className="mt-6 max-w-lg text-xl leading-relaxed text-white/85">
          <L en="Tell us your ideas – we design the rest." zh="告诉我们您的想法，其余交给我们。" />
        </p>

        <ul className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap xl:flex-nowrap">
          {FEATURES.map((f) => (
            <li key={f.en} className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/25 bg-white/15 px-2 py-3 text-center text-white backdrop-blur-sm sm:flex-row sm:gap-2 sm:whitespace-nowrap sm:rounded-full sm:px-4">
              <FontAwesomeIcon icon={f.icon} className="text-lg text-accent" />
              <span className="font-card text-xs font-bold leading-tight sm:text-[15px]"><L en={f.en} zh={f.zh} /></span>
            </li>
          ))}
        </ul>

        <Link href="/tailor-made" className="group mt-8 inline-flex items-center gap-4 rounded-full bg-accent px-9 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-accent-dark">
          <L en="Plan my free trip" zh="免费规划我的旅程" />
          <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Ghép 2 ảnh: ảnh lớn bo góc + ảnh nhỏ viền trắng đè góc dưới */}
      <div className="relative order-1 mx-auto w-full max-w-[260px] pb-10 sm:max-w-sm lg:order-2 lg:max-w-lg lg:pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/_next/image?url=%2Fimages%2Ftailor-hoian.webp&w=640&q=75" alt="Hoi An ancient town" className="ml-auto aspect-[4/5] w-[85%] rounded-[1.5rem] lg:rounded-[2rem] object-cover shadow-2xl" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/_next/image?url=%2Fimages%2Ftailor-hmong.webp&w=640&q=75" alt="Local people in Sapa" className="absolute bottom-0 left-0 aspect-square w-[45%] rounded-2xl border-4 border-white lg:rounded-[1.5rem] lg:border-[6px] object-cover shadow-2xl" loading="lazy" />
      </div>
      </div>
    </section>
  );
}
