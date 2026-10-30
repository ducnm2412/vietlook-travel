import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import QuickPlanForm from "./forms/QuickPlanForm";
import BronzeDrum from "./BronzeDrum";
import { L } from "@/lib/i18n";
import type { Destination } from "@/lib/api";

const POINTS = [
  { en: "Free, no-obligation itinerary", zh: "免费行程，无任何义务" },
  { en: "Reply within 24 hours", zh: "24小时内回复" },
  { en: "Local experts since 2009", zh: "自2009年的本地专家" },
];

// Khối "Lên kế hoạch chuyến đi" trên trang chủ (ý tưởng hero villagesvietnam.com): tiêu đề + form nằm ngang ở trên,
// bên dưới là minh hoạ lớn ở giữa: nửa trên mặt trống đồng (xoay) quanh vòng tròn logo, cụm công trình Hà Nội / Sài Gòn hai bên
export default function PlanTripSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="plan" className="relative isolate scroll-mt-28 overflow-hidden bg-[#f1ece2] pt-14 md:pt-20">
      {/* Nền đồi vàng – núi xanh kiểu tranh sơn thuỷ (plan-bg-hills.webp, cắt từ ảnh người dùng gửi), mờ dần lên trên */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/plan-bg-hills.webp')] bg-cover bg-bottom opacity-80 [mask-image:linear-gradient(to_bottom,transparent_15%,#000_55%)]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,255,255,0.95),rgba(255,255,255,0)_60%)]" aria-hidden />
      <div className="container-x relative z-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Plan your trip" zh="规划您的旅程" /></p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink md:text-5xl"><L en="Tell us your dream trip – we'll plan it for free" zh="告诉我们您梦想的旅程，我们免费为您规划" /></h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-ink/80">
            {POINTS.map((p) => <li key={p.en} className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-accent" /><L en={p.en} zh={p.zh} /></li>)}
          </ul>
        </div>
        <div className="mt-8 md:mt-10"><QuickPlanForm destinations={destinations} wide /></div>
      </div>

      {/* Minh hoạ: chỉ lộ nửa trên của mặt trống (khung cắt cao = nửa bề rộng) */}
      <div className="relative mt-10 w-full md:mt-14">
        <div className="relative mx-auto aspect-[2/1] w-[min(1100px,72vw)] overflow-hidden">
          <BronzeDrum className="drum-spin absolute left-0 top-0 aspect-square w-full opacity-60" />
          <div className="absolute bottom-0 left-1/2 grid aspect-[2/1] w-[46%] -translate-x-1/2 place-items-center rounded-t-full bg-white shadow-[0_0_60px_25px_rgba(255,255,255,0.9)]">
            <div className="flex flex-col items-center pt-[12%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-vietlooktravel2-sm.webp" alt="Vietlook Travel" width={260} height={169} loading="lazy" className="w-24 md:w-44" />
              <p className="mt-1 font-script text-lg text-accent-dark md:text-3xl"><L en="Your trip, your way" zh="您的旅程，由您做主" /></p>
            </div>
          </div>
        </div>
        {/* Lớp sau: Huế + Hội An (trái) và Cầu Vàng Đà Nẵng + Tháp Rùa (phải), cắt từ d347….jpg, nằm sau 2 cụm chính */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/landmarks/lm-3.webp" alt="" aria-hidden loading="lazy" className="paper-pop absolute bottom-0 left-[12vw] w-[22vw] max-w-[400px] drop-shadow-lg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/landmarks/lm-4.webp" alt="" aria-hidden loading="lazy" className="paper-pop absolute bottom-0 right-[24vw] w-[14vw] max-w-[260px] drop-shadow-lg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/landmarks/lm-0.webp" alt="" aria-hidden loading="lazy" className="absolute bottom-0 left-0 w-[36vw] max-w-[640px] drop-shadow-lg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/landmarks/lm-2.webp" alt="" aria-hidden loading="lazy" className="absolute bottom-0 right-0 w-[42vw] max-w-[760px] drop-shadow-lg" />
      </div>
    </section>
  );
}
