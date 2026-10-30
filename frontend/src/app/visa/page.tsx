import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { pageMeta } from "@/lib/seo";
import TourCard from "@/components/TourCard";
import VisaForm from "@/components/forms/VisaForm";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { getTours } from "@/lib/content";
import FastTrackPricing from "@/components/FastTrackPricing";
import { FT_STEPS } from "@/lib/visa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPassport, faPhone, faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Airport Fast Track and Visa Service",
  description: "Skip immigration queues in Vietnam: visa stamping, priority immigration, baggage help and VIP fast track at Noi Bai, Tan Son Nhat, Da Nang, Cam Ranh and Phu Quoc airports.",
  path: "/visa",
  image: "/images/heroes/visa.webp",
  keywords: ["Vietnam airport fast track", "Vietnam visa on arrival stamping", "Noi Bai fast track", "Tan Son Nhat fast track", "Vietnam e-visa"],
});

// Nội dung lấy từ vietlooktravel.com/fast-track-and-visa. Phong cách: vé máy bay, biển chỉ dẫn sân bay, tờ khai.
const AIRPORTS = [
  ["HAN", "Noi Bai International", "内排国际机场", "Ha Noi", "河内"],
  ["SGN", "Tan Son Nhat International", "新山一国际机场", "Ho Chi Minh City", "胡志明市"],
  ["DAD", "Da Nang International", "岘港国际机场", "Da Nang", "岘港"],
  ["CXR", "Cam Ranh International", "金兰国际机场", "Nha Trang", "芽庄"],
  ["PQC", "Phu Quoc International", "富国国际机场", "Phu Quoc", "富国岛"],
];

const DOCS = [
  ["Passport valid for at least 6 months", "护照有效期至少6个月"],
  ["E-visa printout or visa approval letter", "电子签证打印件或签证批准函"],
  ["Flight number and arrival time", "航班号及抵达时间"],
  ["2 passport photos 4×6 cm (visa on arrival)", "2张4×6厘米护照照片（落地签）"],
  ["Stamping fee in cash, USD (visa on arrival)", "盖章费现金美元（落地签）"],
];

const WHO = [["Business travellers", "商务旅客"], ["Families with kids", "带孩子的家庭"], ["Elderly passengers", "年长旅客"], ["Pregnant travellers", "孕妇"], ["Tight connections", "转机时间短"], ["Groups", "团体旅客"], ["Anyone who hates airport queues", "不想在机场浪费时间的任何人"]];

const SKIP = [["Visa stamping counters", "落地签盖章柜台"], ["Immigration checkpoints", "入境检查"], ["Security screening", "安检区域"]];
const TYPES = [["Arrival", "入境", "Express arrival and immigration clearance", "快速入境通关"], ["Departure", "离境", "Priority check-in, security and exit", "优先值机、安检与出境"], ["Transit", "转机", "Smooth connections between flights", "顺利衔接转机航班"]];
const ADVANTAGES = [
  ["Save valuable time", "节省宝贵时间", "Avoid long queues at immigration and security, especially at peak hours.", "避开入境和安检长队，高峰时段尤其有用。"],
  ["Less stress and fatigue", "减少压力与疲劳", "After a long flight, smooth procedures let you start your trip relaxed.", "长途飞行后，顺畅的手续让您轻松开启旅程。"],
  ["Ideal for priority travellers", "优先旅客的理想选择", "Executives, families with young children, elderly and pregnant travellers, groups.", "高管、带幼儿家庭、年长旅客、孕妇及团体。"],
  ["A great first impression", "美好的第一印象", "Efficient airport handling makes arriving in Vietnam a pleasure.", "高效的机场服务让抵达越南成为一种享受。"],
];

const PROCESSES = [
  { key: "arrival" as const, icon: faPlaneArrival, k: "Arrival", kzh: "入境", en: "Meet and assist", zh: "接机流程", bg: "bg-brand text-white" },
  { key: "departure" as const, icon: faPlaneDeparture, k: "Departure", kzh: "出境", en: "See-off", zh: "送机流程", bg: "bg-tarmac text-white" },
  { key: "evisa" as const, icon: faPassport, k: "Before you fly", kzh: "出发前", en: "Apply for an e-visa", zh: "申请电子签证", bg: "bg-sign text-tarmac" },
];

const mono = "font-mono uppercase tracking-wider";
const head = "font-card text-3xl font-bold md:text-4xl";

export default async function VisaPage() {
  const services = await getTours("?kind=fast-track");
  return (
    <>
      {/* Hero: nền "đường băng", form nằm trong một tấm vé lên máy bay */}
      <section className="relative isolate overflow-hidden bg-tarmac text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/heroes/visa.webp" alt="" fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 grayscale" />
        <div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <nav aria-label="Breadcrumb" className={`mb-6 text-xs text-white/60 ${mono}`}>
              <Link href="/" className="hover:text-white"><T k="nav.home" /></Link> / <span className="text-white"><T k="nav.visa" /></span>
            </nav>
            <p className={`inline-flex items-center gap-3 bg-sign px-3 py-1.5 text-sm font-bold text-tarmac ${mono}`}>
              <FontAwesomeIcon icon={faArrowRight} /> <L en="Fast Track · Priority lane" zh="快速通关 · 优先通道" />
            </p>
            <h1 className="mt-5 font-card text-4xl font-bold leading-tight md:text-5xl">
              <L en="Land, get stamped, walk out. No queues." zh="落地、盖章、出关，全程免排队。" />
            </h1>
            <p className="mt-4 max-w-lg text-white/75">
              <L en="Our airport staff meet you at the gate and take you through visa stamping, immigration and baggage, all the way to your car." zh="我们的机场人员在登机口迎接您，协助落地签盖章、入境和行李，一直护送到车上。" />
            </p>
            <dl className={`mt-8 grid max-w-md grid-cols-3 border-y border-white/15 py-4 text-xs ${mono}`}>
              <div><dt className="text-white/50"><L en="Airports" zh="机场" /></dt><dd className="mt-1 text-2xl font-bold text-sign">5</dd></div>
              <div><dt className="text-white/50"><L en="Queue" zh="排队" /></dt><dd className="mt-1 text-2xl font-bold text-sign">0</dd></div>
              <div><dt className="text-white/50"><L en="Service" zh="服务" /></dt><dd className="mt-1 text-2xl font-bold text-sign">24/7</dd></div>
            </dl>
          </div>

          <div id="apply" className="scroll-mt-28 text-ink">
            {/* Vé: phần cuống phía trên, đường xé răng cưa, rồi form */}
            <div className="rounded-t-3xl bg-sign px-6 py-4 text-tarmac">
              <div className={`flex items-center justify-between text-xs font-bold ${mono}`}>
                <span>Vietlook · Fast track pass</span><span>No. VL-{new Date().getFullYear()}</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-3xl font-bold">
                <span>ARR</span><FontAwesomeIcon icon={faPlane} className="text-xl" /><span>EXIT</span>
              </div>
            </div>
            <div className="relative h-4 bg-white">
              <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-tarmac" />
              <span className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-tarmac" />
              <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-black/15" />
            </div>
            <div className="[&>form]:rounded-t-none [&>form]:shadow-2xl"><VisaForm /></div>
          </div>
        </div>
      </section>

      {/* Bảng sân bay kiểu bảng chuyến bay */}
      <section className="bg-black py-10 text-white">
        <div className="container-x">
          <p className={`mb-4 text-xs text-sign ${mono}`}><L en="Available at · 5 international airports" zh="服务机场 · 5个国际机场" /></p>
          <div className={`divide-y divide-white/10 text-sm ${mono}`}>
            {AIRPORTS.map(([code, en, zh, city, czh]) => (
              <div key={code} className="grid grid-cols-[4rem_1fr_auto] items-center gap-4 py-3 md:grid-cols-[5rem_1fr_1fr_auto]">
                <span className="text-xl font-bold text-sign">{code}</span>
                <span className="truncate"><L en={en} zh={zh} /></span>
                <span className="hidden text-white/50 md:block"><L en={city} zh={czh} /></span>
                <span className="text-xs text-emerald-400">● <L en="Open" zh="可预订" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Track là gì: thay vì xếp hàng ở 3 điểm, đi làn ưu tiên */}
      <section className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-2">
        <div>
          <p className={`text-xs font-bold text-accent ${mono}`}><L en="What is Fast Track?" zh="什么是快速通关？" /></p>
          <h2 className={`${head} mt-2`}><L en="Priority lanes instead of long lines" zh="走优先通道，告别长队" /></h2>
          <p className="mt-4 text-muted"><L en="Airport Fast Track (express airport clearance) lets you bypass crowded areas with direct assistance and priority access, from the arrival gate to the pick-up point." zh="机场快速通关服务让您在专人协助下使用优先通道，避开拥挤区域，从到达口一直到接机点。" /></p>
          <ul className={`mt-6 space-y-2 text-sm ${mono}`}>
            {SKIP.map(([en, zh]) => (
              <li key={en} className="flex items-center justify-between gap-4 border-b border-dashed border-black/15 pb-2">
                <span className="text-muted line-through decoration-red-500 decoration-2"><L en={en} zh={zh} /></span>
                <span className="bg-sign px-2 py-0.5 text-xs font-bold text-tarmac"><L en="Skip" zh="免排队" /></span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-black/10">
            {TYPES.map(([en, zh, d, dzh]) => (
              <div key={en} className="bg-white p-4">
                <p className={`text-sm font-bold ${mono}`}><L en={en} zh={zh} /></p>
                <p className="mt-1 text-xs text-muted"><L en={d} zh={dzh} /></p>
              </div>
            ))}
          </div>
        </div>
        <ol className="space-y-4">
          {ADVANTAGES.map(([en, zh, d, dzh], i) => (
            <li key={en} className="flex gap-4 border-l-4 border-sign bg-white p-5 ring-1 ring-black/5">
              <span className="font-mono text-sm font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="font-card font-bold"><L en={en} zh={zh} /></p><p className="mt-1 text-sm text-muted"><L en={d} zh={dzh} /></p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* Bảng giá theo sân bay: 3 nhóm Đón / Tiễn / Dịch vụ đi kèm */}
      <section id="prices" className="bg-photo-light scroll-mt-24 py-14 md:py-20">
        <div className="container-x">
          <p className={`text-xs font-bold text-accent ${mono}`}><L en="Price list · USD" zh="价格表 · 美元" /></p>
          <h2 className={`${head} mt-2`}><L en="Fast-track prices by airport" zh="各机场快速通关价格" /></h2>
          <p className="mb-8 mt-2 text-muted"><L en="Choose your airport to see the price of each service." zh="选择机场，查看各项服务价格。" /></p>
          <FastTrackPricing />
          <p className="mt-6 text-sm text-muted">
            <span className="font-semibold text-ink"><L en="Good for: " zh="适合：" /></span>
            {WHO.map(([en, zh], i) => <span key={en}>{i > 0 && " · "}<L en={en} zh={zh} /></span>)}
          </p>
        </div>
      </section>

      {/* Quy trình: Đón (nhập cảnh) · Tiễn (xuất cảnh) · E-visa – mỗi quy trình 5 bước */}
      <section className="container-x py-14 md:py-20">
        <p className={`text-xs font-bold text-accent ${mono}`}><L en="How it works" zh="服务流程" /></p>
        <h2 className={`${head} mt-2 mb-10`}><L en="Step by step, from landing to take-off" zh="从落地到起飞，每一步都清清楚楚" /></h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {PROCESSES.map((pr) => (
            <div key={pr.key} className="relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/10">
              <div className={`-mx-6 -mt-6 mb-6 flex items-center gap-3 px-6 py-4 ${pr.bg}`}>
                <FontAwesomeIcon icon={pr.icon} className="text-2xl" />
                <div><p className={`text-[11px] opacity-75 ${mono}`}><L en={pr.k} zh={pr.kzh} /></p><p className="font-card text-xl font-bold"><L en={pr.en} zh={pr.zh} /></p></div>
              </div>
              <ol className="relative space-y-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-0.5 before:bg-black/10">
                {FT_STEPS[pr.key].map((st, i) => (
                  <li key={st.en} className="relative flex gap-4">
                    <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sign font-mono text-sm font-bold text-tarmac ring-4 ring-white">{i + 1}</span>
                    <span className="pt-1 text-sm leading-relaxed"><L en={st.en} zh={st.zh} /></span>
                  </li>
                ))}
              </ol>
              {pr.key === "evisa" && <a href="https://evisa.gov.vn" target="_blank" rel="noopener" className="mt-5 inline-block text-sm font-semibold text-brand hover:underline">evisa.gov.vn →</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Checklist giấy tờ + dấu mộc */}
      <section className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative rounded-2xl border-2 border-tarmac bg-white p-6 md:p-8">
          <p className={`text-xs font-bold text-muted ${mono}`}><L en="Before you fly · checklist" zh="出发前 · 清单" /></p>
          <h2 className="mt-2 font-card text-2xl font-bold"><L en="Documents to prepare" zh="需准备的证件" /></h2>
          <ul className="mt-5 space-y-3">
            {DOCS.map(([en, zh]) => (
              <li key={en} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-tarmac" />
                <span><L en={en} zh={zh} /></span>
              </li>
            ))}
          </ul>
          <span className={`pointer-events-none absolute -right-2 -top-5 rotate-12 rounded-lg border-4 border-red-600/80 px-3 py-1 text-lg font-bold text-red-600/80 md:right-6 ${mono}`}>Approved</span>
        </div>
        <div>
          <h2 className={head}><L en="Not sure which option you need?" zh="不确定选哪项服务？" /></h2>
          <p className="mt-3 text-muted"><L en="Send us your flight number. We check your visa type and suggest the right service, usually within 30 minutes." zh="发送航班号给我们，我们会确认您的签证类型并推荐合适服务，通常30分钟内回复。" /></p>
          {/* 2 nút luôn nằm cùng một hàng, chia đều bề ngang (điện thoại thu nhỏ chữ) */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="btn whitespace-nowrap bg-[#25d366] !px-3 text-sm text-white sm:!px-6 sm:text-base"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</a>
            <a href={`tel:+${SITE.phoneRaw}`} className="btn whitespace-nowrap border border-black/15 !px-3 text-sm sm:!px-6 sm:text-base"><FontAwesomeIcon icon={faPhone} /> {SITE.phone}</a>
          </div>
        </div>
      </section>

      {/* Dịch vụ thật từ dữ liệu */}
      {services.length > 0 && (
        <section className="bg-photo-light py-14 md:py-20">
          <div className="container-x">
            <h2 className={`${head} mb-8`}><T k="sec.ft.t" /></h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
