import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faRoute, faSliders, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { L } from "@/lib/i18n";

const POINTS = [
  { icon: faRoute, en: "North to South", zh: "纵贯南北", d: "Hanoi, Ha Long, Sapa, Hoi An, Saigon, Mekong and more", dzh: "河内、下龙湾、沙坝、会安、西贡、湄公河等" },
  { icon: faUserTie, en: "Private guide & car", zh: "私人导游与专车", d: "English or Chinese-speaking local guides", dzh: "英语或中文本地导游" },
  { icon: faSliders, en: "Fully customisable", zh: "可完全定制", d: "Change hotels, pace or add days freely", dzh: "酒店、节奏、天数均可调整" },
  { icon: faHeadset, en: "24/7 support", zh: "全天候支持", d: "Our team is with you throughout the trip", dzh: "整个行程我们全程陪伴" },
];

// Đoạn giới thiệu đầu trang danh sách tour (dưới PageHero, trên bộ lọc)
export default function ToursIntro() {
  return (
    <section className="container-x pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Private tours in Vietnam" zh="越南私人旅游" /></p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl"><L en="Discover Vietnam your way, with a local team" zh="与本地团队一起，按您的方式探索越南" /></h2>
          <p className="mt-4 leading-relaxed text-muted">
            <L
              en="From one-day city tours to three-week journeys across the country, every Vietlook tour is private and run by our own local team. Pick a ready-made itinerary below, then we adjust it to your dates, budget and travel style – free of charge."
              zh="从一日城市游到纵贯越南的三周之旅，Vietlook 的每条线路都是私人团，由我们自己的本地团队执行。您可以先在下方挑选现成行程，我们再按您的日期、预算和旅行风格免费调整。"
            />
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {POINTS.map((p) => (
            <li key={p.en} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><FontAwesomeIcon icon={p.icon} /></span>
              <span>
                <b className="block text-sm"><L en={p.en} zh={p.zh} /></b>
                <span className="text-sm text-muted"><L en={p.d} zh={p.dzh} /></span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
