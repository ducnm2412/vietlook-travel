import Link from "@/components/LocaleLink";
import Img from "./Img";
import { L } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCarSide, faMapLocationDot, faPlaneArrival, faTags } from "@fortawesome/free-solid-svg-icons";

const POINTS = [
  { icon: faCarSide, en: "4 – 45 seat vehicles", zh: "4–45座车型", d: "Sedans, SUVs, limousine vans and coaches", dzh: "轿车、SUV、豪华商务车和大巴" },
  { icon: faPlaneArrival, en: "Airport pick-up", zh: "机场接送", d: "Flight tracking, driver waits for free", dzh: "跟踪航班，司机免费等候" },
  { icon: faMapLocationDot, en: "Nationwide service", zh: "全国服务", d: "City tours, day trips and long-distance transfers", dzh: "市内游、一日游和长途接送" },
  { icon: faTags, en: "Fixed prices", zh: "固定价格", d: "Fuel, tolls and parking included", dzh: "含油费、过路费和停车费" },
];

// Giới thiệu dịch vụ xe riêng kèm tài xế (đặt cuối trang danh sách tour), dẫn sang /car-rental
export default function CarServicePromo() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Private car hire with driver" zh="包车服务（含司机）" /></p>
          <h2 className="mt-3 font-card text-3xl font-bold leading-tight md:text-4xl"><L en="Travel at your own pace with a private driver" zh="专车专司机，按自己的节奏出行" /></h2>
          <p className="mt-4 text-muted"><L en="Add a car to any tour, or book transfers on their own – English-speaking drivers, clean modern vehicles, 24/7 support." zh="可为任何线路加订包车，也可单独预订接送：会英语的司机、干净的新车、全天候支持。" /></p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.en} className="group flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white"><FontAwesomeIcon icon={p.icon} /></span>
                <span>
                  <span className="block font-semibold"><L en={p.en} zh={p.zh} /></span>
                  <span className="block text-sm text-muted"><L en={p.d} zh={p.dzh} /></span>
                </span>
              </div>
            ))}
          </div>
          <Link href="/car-rental" className="btn btn-brand mt-8 inline-flex"><L en="Explore car rental" zh="了解包车服务" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>

        {/* Ghép 2 ảnh: xe bên ngoài + nội thất */}
        <div className="relative order-1 pb-10 lg:order-2">
          <Img src="/images/car-rental/intro2.webp" alt="Private car with driver" width={560} className="aspect-[4/3] w-[85%] rounded-3xl shadow-xl" />
          {/* Bọc khung riêng để định vị: Img tự gắn class relative */}
          <div className="absolute bottom-0 right-0 w-[45%] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl">
            <Img src="/images/car-rental/svc2.webp" alt="Limousine van interior" width={320} className="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}
