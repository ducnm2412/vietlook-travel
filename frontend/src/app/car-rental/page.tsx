import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import CarQuoteForm from "@/components/forms/CarQuoteForm";
import PopularRoutes from "@/components/car/PopularRoutes";
import { CAR_CITIES as CITIES } from "@/components/car/cities";
import { FleetByCategory, NationwideService } from "@/components/car/CarFleet";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { formatUsd } from "@/lib/api";
import { getTours, getVehicles } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faClock, faComments, faHandshake, faHeadset, faPhone,
  faPlaneArrival, faPlus, faRoad, faRoute, faShieldHalved, faSignHanging, faStar, faSuitcaseRolling, faTag, faUserGroup, faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faWeixin } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Private Car Rental with Driver in Vietnam",
  description: "Private cars 4–45 seats with professional drivers: airport transfers, day trips and inter-province routes in Hanoi, Da Nang, Nha Trang, Ho Chi Minh City and more.",
  path: "/car-rental",
  image: "/images/heroes/car.webp",
  keywords: ["Vietnam car rental with driver", "airport transfer Vietnam", "private car Hanoi"],
});


const STRENGTHS = [
  [faPlaneArrival, "5 airports", "5个机场", "Hanoi, Da Nang, Nha Trang, Saigon, Phu Quoc", "河内、岘港、芽庄、西贡、富国岛"],
  [faHeadset, "24/7 support", "全天候支持", "Hotline & chat, any time", "热线与在线客服"],
  [faComments, "Your language", "您的语言", "English and Chinese speaking team", "英语和中文团队"],
  [faTag, "Fixed price", "固定价格", "Tolls, fuel and parking included", "含过路费、油费和停车费"],
] as const;

const CHECKS = [
  ["Driver waits with a name sign at arrivals", "司机在到达大厅举牌等候"],
  ["Free waiting if your flight is late", "航班延误免费等候"],
  ["Pay the driver or online in advance", "可付给司机或提前在线支付"],
];

const INCLUDED = [
  [faRoad, "Tolls & parking", "过路费和停车费", "Already in the price you see.", "已包含在报价中。"],
  [faPlaneArrival, "Flight tracking", "航班追踪", "We follow your flight and adjust the pick-up time.", "实时追踪航班，调整接机时间。"],
  [faClock, "Free waiting", "免费等候", "No extra charge if your flight is delayed.", "航班延误不另收费。"],
  [faSignHanging, "Name-sign greeting", "举牌接机", "Driver sends a photo and plate number in advance.", "司机提前发送照片和车牌。"],
  [faWifi, "On-board comfort", "车内舒适", "Air-conditioning, bottled water, phone charging.", "空调、瓶装水、手机充电。"],
  [faComments, "Language support", "语言支持", "Call our hotline, we translate between you and the driver.", "致电热线，我们为您与司机翻译。"],
] as const;

const STEPS = [
  [faRoute, "Choose & request", "选择并询价", "Pick your route, date and car. Get a confirmed price.", "选择路线、日期和车型，获得确认价格。"],
  [faHandshake, "Meet your driver", "与司机会面", "Driver waits at arrivals with a name sign.", "司机在到达大厅举牌等候。"],
  [faShieldHalved, "Relax on the road", "安心出行", "Need help? Call the hotline, we are with you all the way.", "需要帮助？随时拨打热线。"],
] as const;

// Đánh giá minh hoạ cho bản demo
const REVIEWS = [
  { en: "Our flight landed almost an hour late, and the driver was still there with my name on a sign. Clean car, fair price, no haggling.", zh: "航班晚点了将近一个小时，司机仍举着我的名牌在等候。车很干净，价格公道，无需讨价还价。", name: "Emma W.", from: "Australia", fromZh: "澳大利亚" },
  { en: "Hanoi to Halong Bay was smooth all the way. The driver was on time and the car was spotless. Support replied quickly in my language.", zh: "从河内到下龙湾一路很顺利，司机准时，车很干净。客服用中文沟通，非常方便。", name: "Chen L.", from: "Taiwan", fromZh: "台湾" },
  { en: "Booked Hanoi – Ninh Binh – Hanoi for our family of six. The 7-seat car was spacious and the driver knew all the best stops.", zh: "我们一家六口预订了河内—宁平—河内。七座车很宽敞，司机熟悉所有好去处。", name: "David K.", from: "United Kingdom", fromZh: "英国" },
];

const FAQ = [
  ["How do I pay?", "如何付款？", "Pay the driver in cash (VND or USD) or pay online in advance by card or bank transfer.", "可向司机支付现金（越南盾或美元），或提前在线刷卡/转账。"],
  ["What if my flight is delayed?", "航班延误怎么办？", "We track your flight and the driver waits for free. No extra charge.", "我们会追踪航班，司机免费等候，不另收费。"],
  ["What does the price include?", "价格包含什么？", "Car, driver, fuel, tolls, parking and bottled water. No hidden fees.", "包含车辆、司机、油费、过路费、停车费和瓶装水，无隐藏费用。"],
  ["My route is not listed. Can you help?", "我的路线不在列表中，可以安排吗？", "Yes. Send your pick-up and drop-off points and we quote within 30 minutes.", "可以。发送上下车地点，我们30分钟内报价。"],
];

const CHANNELS = [
  { label: "WhatsApp", href: SITE.whatsapp, bg: "bg-[#25d366]", icon: faWhatsapp },
  { label: "Zalo", href: SITE.zalo, bg: "bg-[#0068ff]", icon: null },
  { label: "WeChat", href: "/contact", bg: "bg-[#07c160]", icon: faWeixin },
  { label: "Hotline 2", href: `tel:+${SITE.phone2Raw}`, bg: "bg-accent", icon: faPhone },
];

// Số khách, hành lý và giá khởi điểm (USD/chuyến) minh hoạ cho từng loại xe
const VINFO: Record<number, { pax: number; bags: number; price: number }> = {
  4: { pax: 3, bags: 2, price: 21 },
  7: { pax: 6, bags: 4, price: 32 },
  16: { pax: 12, bags: 10, price: 55 },
  29: { pax: 25, bags: 20, price: 95 },
  45: { pax: 40, bags: 35, price: 140 },
};

const head = "font-card text-3xl font-bold md:text-4xl";

export default async function CarRentalPage() {
  const [vehicles, cars] = await Promise.all([getVehicles(), getTours("?kind=car&limit=200")]);
  const minPrice = Math.min(...cars.map((c) => c.priceFrom || Infinity));
  return (
    <>
      {/* Hero: tiêu đề bên trái, form báo giá bên phải */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/heroes/car.webp" alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-black/30" />
        <div className="container-x grid items-center gap-10 py-14 text-white md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white hover:underline"><T k="nav.home" /></Link>
              <span className="mx-2">/</span>
              <span className="text-white"><T k="nav.car" /></span>
            </nav>
            <h1 className="font-card text-4xl font-bold leading-tight md:text-5xl">
              <L en="Airport transfers & private cars with driver, fixed prices" zh="机场接送与司机包车，价格固定" />
            </h1>
            <p className="mt-4 max-w-xl text-white/85">
              <L en="Airport pick-up, inter-province transfers and day trips across Vietnam. English and Chinese speaking support, no hidden fees." zh="越南全境机场接送、跨省包车和一日游。中英文客服，无隐藏费用。" />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#routes" className="btn btn-accent"><L en="See routes" zh="查看路线" /></a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="btn border border-white/40 text-white hover:bg-white/10">
                <FontAwesomeIcon icon={faWhatsapp} /> <L en="Chat with us" zh="联系我们" />
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              {CHECKS.map(([en, zh]) => (
                <li key={en} className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-accent" /><L en={en} zh={zh} /></li>
              ))}
            </ul>
          </div>
          <div className="text-ink"><CarQuoteForm vehicles={vehicles} cars={cars} /></div>
        </div>
      </section>

      {/* Dải 4 điểm mạnh */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {STRENGTHS.map(([icon, en, zh, d, dzh]) => (
            <div key={en} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-brand"><FontAwesomeIcon icon={icon} /></span>
              <div><p className="font-card text-sm font-bold"><L en={en} zh={zh} /></p><p className="text-xs text-muted"><L en={d} zh={dzh} /></p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tuyến phổ biến */}
      <section id="routes" className="scroll-mt-28 bg-photo-light py-14 md:py-20">
        <div className="container-x">
          <h2 className={head}><L en="Popular routes" zh="热门路线" /></h2>
          <p className="mb-8 mt-2 text-muted"><L en="Choose a city to see fixed prices. Per car, not per person, tolls included." zh="选择城市查看固定价格。按车计价，含过路费。" /></p>
          <PopularRoutes cities={CITIES} cars={cars} />
        </div>
      </section>

      {/* Loại xe */}
      <section className="container-x py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className={head}><L en="Our vehicles" zh="车型" /></h2>
          <a href="#quote" className="text-sm font-semibold text-accent hover:underline"><L en="Get a quote →" zh="获取报价 →" /></a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {vehicles.map((v, i) => (
            <div key={v.seats} className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-xl">
              {/* Ảnh minh hoạ dòng xe (Wikimedia Commons) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/cars/${v.seats}.webp`} alt={v.name} loading="lazy" width={640} height={400} className="aspect-[8/5] w-full bg-sand object-cover" />
              <div className="p-4">
                <p className="font-card font-bold"><L en={v.name} zh={v.zh} /></p>
                <p className="text-xs text-muted">{v.example}</p>
                {VINFO[v.seats] && (
                  <>
                    <div className="mt-3 flex gap-3 text-xs text-muted">
                      <span><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-brand/70" />{VINFO[v.seats].pax}</span>
                      <span><FontAwesomeIcon icon={faSuitcaseRolling} className="mr-1 text-brand/70" />{VINFO[v.seats].bags}</span>
                    </div>
                    <p className="mt-2 border-t border-black/5 pt-2 text-sm">
                      <L en="from" zh="起" /> <b className="text-lg text-accent">{i === 0 && Number.isFinite(minPrice) ? formatUsd(minPrice) : `$${VINFO[v.seats].price}`}</b> / <L en="trip" zh="趟" />
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FleetByCategory />

      {/* Giá đã bao gồm */}
      <section className="bg-photo-light py-14 md:py-20">
        <div className="container-x">
          <h2 className={head}><L en="What's included" zh="价格包含" /></h2>
          <p className="mb-8 mt-2 text-muted"><L en="The price you see is the price you pay." zh="所见即所付。" /></p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map(([icon, en, zh, d, dzh], i) => (
              <div key={en} className="relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <span className="absolute right-4 top-2 font-card text-5xl font-extrabold text-accent/15">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sand text-brand"><FontAwesomeIcon icon={icon} /></span>
                <p className="mt-4 font-card font-bold"><L en={en} zh={zh} /></p>
                <p className="mt-1 text-sm text-muted"><L en={d} zh={dzh} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NationwideService />

      {/* Cách đặt xe */}
      <section className="bg-photo-dark py-14 text-white md:py-20">
        <div className="container-x">
          <h2 className={head}><L en="How to book" zh="预订流程" /></h2>
          <p className="mb-8 mt-2 text-white/70"><L en="Three steps from request to arrival." zh="从询价到抵达，只需三步。" /></p>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(([icon, en, zh, d, dzh], i) => (
              <div key={en} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="relative w-fit">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-accent"><FontAwesomeIcon icon={icon} /></span>
                  <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">{i + 1}</span>
                </div>
                <p className="mt-4 font-card font-bold"><L en={en} zh={zh} /></p>
                <p className="mt-1 text-sm text-white/70"><L en={d} zh={dzh} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đánh giá */}
      <section className="container-x py-14 md:py-20">
        <h2 className={head}><L en="What travellers say" zh="客户评价" /></h2>
        <p className="mb-8 mt-2 text-muted"><L en="Guests from many countries share their trips." zh="来自各国的客人分享他们的旅程。" /></p>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <span className="absolute right-5 top-0 font-serif text-7xl text-accent/20">&ldquo;</span>
              <div className="flex gap-0.5 text-xs text-accent">{Array.from({ length: 5 }, (_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}</div>
              <blockquote className="mt-3 text-sm leading-relaxed"><L en={r.en} zh={r.zh} /></blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-bold text-white">{r.name[0]}</span>
                <div><p className="text-sm font-bold">{r.name}</p><p className="text-xs text-muted"><L en={r.from} zh={r.fromZh} /></p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-photo-light py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className={head}><L en="Frequently asked questions" zh="常见问题" /></h2>
            <p className="mt-3 text-muted"><L en="Can't find your answer? Message us any time." zh="没找到答案？随时联系我们。" /></p>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="btn btn-accent mt-6"><L en="Message us" zh="联系我们" /></a>
          </div>
          <div className="space-y-3">
            {FAQ.map(([q, qzh, a, azh], i) => (
              <details key={q} className="group rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <summary className="flex cursor-pointer list-none items-center gap-4 font-semibold">
                  <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1"><L en={q} zh={qzh} /></span>
                  <FontAwesomeIcon icon={faPlus} className="text-accent transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 pl-8 text-sm text-muted"><L en={a} zh={azh} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ đa kênh */}
      <section className="container-x py-14 md:py-20">
        <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-brand-dark to-brand p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <h2 className={head}><L en="Talk to us in your language" zh="用您的语言与我们沟通" /></h2>
            <p className="mt-3 text-white/75"><L en="Message us on the app you already use. Our team speaks English and Chinese." zh="使用您习惯的应用联系我们，团队会说英语和中文。" /></p>
            <a href={`tel:+${SITE.phoneRaw}`} className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/15">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent"><FontAwesomeIcon icon={faPhone} /></span>
              <span><span className="block text-xs text-white/70">Hotline 24/7</span><b className="text-xl">{SITE.phone}</b></span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CHANNELS.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/20">
                <span className={`grid h-9 w-9 place-items-center rounded-lg ${c.bg}`}>{c.icon ? <FontAwesomeIcon icon={c.icon} /> : <b className="text-[10px]">Zalo</b>}</span>
                <span className="font-semibold">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
