"use client";

import { useState } from "react";
import { L } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase, faBuilding, faCalendarDays, faClock, faFileContract, faHeadset,
  faPlaneArrival, faRing, faRoute, faScrewdriverWrench, faUserTie, faUserGroup, faEye,
} from "@fortawesome/free-solid-svg-icons";

// Nội dung lấy từ vietlooktravel.com/private-car-rental (ảnh tải về public/images/car-rental)
type T2 = [string, string];
const FLEET: { img: string; title: T2; pax: string; desc: T2; models: T2[]; uses: T2[] }[] = [
  {
    img: "intro1", pax: "1–4", title: ["3–5 Seater Cars", "3–5座轿车"],
    desc: ["Sedan and compact class for solo travellers, couples and small groups who want convenience and easy city driving.", "轿车与紧凑型车，适合独行旅客、情侣和小团体，城市出行便捷灵活。"],
    models: [["Toyota Vios", "丰田威驰"], ["Hyundai Accent", "现代雅绅特"], ["Mazda 3", "马自达3"], ["Kia Cerato (K3)", "起亚K3"], ["Honda City", "本田锋范"]],
    uses: [["Airport pick-up and drop-off", "机场接送"], ["Business meetings", "商务会议"], ["City tours", "市内游览"]],
  },
  {
    img: "car1", pax: "4–7", title: ["6–7 Seater Cars", "6–7座商务车"],
    desc: ["MPV and SUV segment, our most popular choice, balancing space and comfort for families and small groups.", "MPV与SUV车型，最受欢迎，兼顾空间与舒适，适合家庭和小团体。"],
    models: [["Toyota Innova", "丰田Innova"], ["Mitsubishi Xpander", "三菱Xpander"], ["Toyota Fortuner", "丰田Fortuner"], ["Ford Everest", "福特Everest"], ["Kia Carnival", "起亚嘉华"]],
    uses: [["Family vacations", "家庭度假"], ["Long-distance intercity trips", "长途跨城出行"], ["Resort transfers", "度假村接送"]],
  },
  {
    img: "van1", pax: "7–10", title: ["8–10 Seater Vehicles", "8–10座车型"],
    desc: ["Extended MPVs and limousine vans for medium groups, with more legroom than a 7-seater and some with reclining seats and LED lighting.", "加长MPV与豪华商务车，适合中型团体，腿部空间更大，部分车型配备可躺座椅和LED氛围灯。"],
    models: [["Ford Tourneo", "福特途睿欧"], ["Hyundai Starex", "现代Starex"], ["Toyota Hiace", "丰田海狮"], ["Limousine DCar / Auto Kingdom", "DCar / Auto Kingdom 豪华改装车"]],
    uses: [["Small group tours", "小团游览"], ["Family events", "家庭聚会"], ["Premium shuttles", "高端接驳"]],
  },
  {
    img: "van2", pax: "≤16", title: ["12–16 Seater Vehicles", "12–16座面包车"],
    desc: ["Group transport that keeps costs down, with wide seat rows, strong air-conditioning and large luggage space.", "团体出行经济之选，座椅宽敞、空调强劲、行李空间大。"],
    models: [["Ford Transit", "福特全顺"], ["Hyundai Solati", "现代Solati"], ["Toyota Hiace 16", "丰田海狮16座"]],
    uses: [["Corporate and team building", "企业出行与团建"], ["Tour groups", "旅行团"], ["Large-group airport transfers", "大团机场接送"]],
  },
  {
    img: "van3", pax: "9–11", title: ["Premium Limousine and VIP", "豪华VIP商务车"],
    desc: ["Business-class reclining seats, individual lighting and charging, TV and sound system, generous legroom.", "商务舱可躺座椅、独立照明与充电、电视音响系统、宽敞腿部空间。"],
    models: [["9-seat Limousine (Transit / Solati)", "9座豪华版（全顺/Solati改装）"], ["11-seat VIP Limousine", "11座VIP豪华版"]],
    uses: [["VIP guests and executives", "VIP贵宾与高管"], ["High-end trips", "高端旅程"], ["Long-distance premium journeys", "长途高端出行"]],
  },
];

const SERVICES = [
  [faCalendarDays, "Daily car rental", "按日包车"],
  [faRoute, "Intercity and long distance", "跨城与长途"],
  [faPlaneArrival, "Airport transfers", "机场接送"],
  [faRing, "Weddings and events", "婚礼与活动"],
  [faBuilding, "Corporate and team building", "企业出行与团建"],
  [faFileContract, "Long-term contracts", "长期租车合同"],
] as const;

const COMMIT = [
  [faScrewdriverWrench, "Modern vehicles, maintained and cleaned before every trip", "车辆新颖，每趟出发前保养清洁"],
  [faUserTie, "Experienced, courteous professional drivers", "经验丰富、服务周到的专业司机"],
  [faClock, "Punctual, strict adherence to schedules", "准时守约，严格按行程执行"],
  [faEye, "Transparent process, no hidden conditions", "流程透明，无隐藏条款"],
  [faHeadset, "Dedicated support throughout your journey", "全程专属客服支持"],
] as const;

const head = "font-card text-3xl font-bold md:text-4xl";

// Chọn nhóm xe bằng thanh "số chỗ", một khung chi tiết duy nhất thay vì 5 khối lớn xếp chồng
export function FleetByCategory() {
  const [i, setI] = useState(1);
  const f = FLEET[i];
  const seat = ["5", "7", "10", "16", "VIP"];
  return (
    <section className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={head}><L en="Fleet by category and model" zh="车型分类详解" /></h2>
          <p className="mt-2 max-w-xl text-muted"><L en="Pick by group size. Every car comes with a driver, fuel and tolls." zh="按人数选择，均含司机、油费和过路费。" /></p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 border-b border-black/10" role="tablist">
        {FLEET.map((x, k) => (
          <button key={x.img} role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`relative pb-4 text-left transition ${k === i ? "text-ink" : "text-muted hover:text-ink"}`}>
            <span className="block font-card text-3xl font-extrabold md:text-5xl">{seat[k]}</span>
            <span className="mt-1 hidden text-xs font-semibold uppercase tracking-wider sm:block">{k === 4 ? "Limousine" : <L en="seats" zh="座" />}</span>
            <span className={`absolute inset-x-0 -bottom-px h-1 rounded-full transition ${k === i ? "bg-accent" : "bg-transparent"}`} />
          </button>
        ))}
      </div>

      <div key={f.img} className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/car-rental/${f.img}.webp`} alt={f.title[0]} width={555} height={416} className="aspect-[16/10] w-full rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-semibold text-accent"><FontAwesomeIcon icon={faUserGroup} className="mr-1.5" />{f.pax} <L en="passengers" zh="人" /></p>
          <h3 className="mt-1 font-card text-2xl font-bold md:text-3xl"><L en={f.title[0]} zh={f.title[1]} /></h3>
          <p className="mt-3 text-muted"><L en={f.desc[0]} zh={f.desc[1]} /></p>
          <dl className="mt-6 divide-y divide-black/10 border-y border-black/10 text-sm">
            <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
              <dt className="text-muted"><L en="Models" zh="车型" /></dt>
              <dd className="font-medium">{f.models.map(([en, zh], k) => <span key={en}>{k > 0 && <span className="text-black/25"> / </span>}<L en={en} zh={zh} /></span>)}</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
              <dt className="text-muted"><L en="Best for" zh="适用" /></dt>
              <dd className="font-medium">{f.uses.map(([en, zh], k) => <span key={en}>{k > 0 && <span className="text-black/25"> · </span>}<L en={en} zh={zh} /></span>)}</dd>
            </div>
          </dl>
          <a href="#quote" className="btn btn-accent mt-6"><L en="Get a quote for this car" zh="获取此车型报价" /></a>
        </div>
      </div>
    </section>
  );
}

export function NationwideService() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className={head}><L en="Nationwide car rental" zh="全国包车服务" /></h2>
          <p className="mb-6 mt-2 text-muted"><L en="Cars in every province and city of Vietnam, arranged quickly to match your schedule." zh="覆盖越南所有省市，快速按您的行程安排车辆。" /></p>
          <div className="grid grid-cols-2 gap-3">
            {SERVICES.map(([icon, en, zh]) => (
              <div key={en} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand text-brand"><FontAwesomeIcon icon={icon} /></span>
                <span className="text-sm font-semibold"><L en={en} zh={zh} /></span>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/car-rental/svc1.webp" alt="Vietlook Travel private cars" loading="lazy" width={555} height={416} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
        </div>
        <div className="rounded-3xl bg-brand-dark p-8 text-white">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent"><FontAwesomeIcon icon={faBriefcase} /></span>
          <h2 className={`${head} mt-4`}><L en="Our service commitment" zh="服务承诺" /></h2>
          <p className="mt-2 text-white/70"><L en="The Vietlook Travel standard: not just the car, but the whole experience." zh="Vietlook Travel 标准：不只是车辆，更是完整的出行体验。" /></p>
          <ul className="mt-6 space-y-4">
            {COMMIT.map(([icon, en, zh]) => (
              <li key={en} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-accent"><FontAwesomeIcon icon={icon} /></span>
                <span className="pt-1.5 text-sm"><L en={en} zh={zh} /></span>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/car-rental/svc2.webp" alt="VIP limousine interior" loading="lazy" width={555} height={416} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
        </div>
      </div>
    </section>
  );
}
