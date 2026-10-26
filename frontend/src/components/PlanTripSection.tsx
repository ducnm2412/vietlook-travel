import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import QuickPlanForm from "./forms/QuickPlanForm";
import { L } from "@/lib/i18n";
import type { Destination } from "@/lib/api";

const POINTS = [
  { en: "Free, no-obligation itinerary", zh: "免费行程，无任何义务" },
  { en: "Reply within 24 hours", zh: "24小时内回复" },
  { en: "Local experts since 2009", zh: "自2009年的本地专家" },
];

// Khối "Lên kế hoạch chuyến đi" trên trang chủ: chữ bên trái, form nhanh bên phải
export default function PlanTripSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="plan" className="bg-photo-dark scroll-mt-28 py-14 text-white md:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Plan your trip" zh="规划您的旅程" /></p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-5xl"><L en="Tell us your dream trip – we'll plan it for free" zh="告诉我们您梦想的旅程，我们免费为您规划" /></h2>
          <ul className="mt-8 space-y-3 text-lg text-white/85">
            {POINTS.map((p) => <li key={p.en} className="flex items-center gap-3"><FontAwesomeIcon icon={faCircleCheck} className="text-accent" /><L en={p.en} zh={p.zh} /></li>)}
          </ul>
        </div>
        <QuickPlanForm destinations={destinations} />
      </div>
    </section>
  );
}
