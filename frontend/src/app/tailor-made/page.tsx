import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleCheck, faClock, faHeadset, faSliders, faWallet } from "@fortawesome/free-solid-svg-icons";
import TailorRequestForm from "@/components/forms/TailorRequestForm";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Link from "@/components/LocaleLink";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Tailor-made Tours – Free Trip Proposal",
  description: "Design your private Vietnam trip with local born travel specialists. Free proposal within 24 hours, 3–5★ hotels, flexible itinerary and 24/7 support.",
  path: "/tailor-made",
  image: "/images/tailor-hero.webp",
  keywords: ["tailor-made Vietnam tour","custom Vietnam itinerary","private Vietnam trip"],
});

const WHY = [
  { icon: faSliders, en: "Your pace, your plan", zh: "您的节奏，您的计划", d: "Every day built around what you love.", dz: "每一天都围绕您的喜好安排。" },
  { icon: faHeadset, en: "Local experts, 24/7", zh: "本地专家，全天候", d: "One message away on WhatsApp, Zalo or WeChat.", dz: "WhatsApp、Zalo或微信随时联系。" },
  { icon: faWallet, en: "Free planning", zh: "免费规划", d: "You only pay for the trip you choose.", dz: "您只需为选择的行程付费。" },
];

const PERKS = [
  ["Hotel class of your choice – 3★ to 5★", "酒店等级任选——3★至5★"],
  ["Live 24/7 WhatsApp and WeChat support by local experts", "本地专家24/7 WhatsApp与微信在线支持"],
  ["Fully customizable route, pace and budget", "路线、节奏和预算完全可定制"],
  ["Tour + private car + visa handled in one place", "行程、包车、签证一站式办理"],
  ["Free quote, no extra cost for trip planning", "免费报价，行程规划不额外收费"],
];

const STEPS = [
  { en: "Share your wishes", zh: "告诉我们心愿" },
  { en: "Get a proposal in 24h", zh: "24小时内获得方案" },
  { en: "Adjust and travel", zh: "调整并出发" },
];

const FAQ = [
  ["Is a tailor-made trip more expensive?", "定制游更贵吗？", "Not necessarily. We plan within your budget, and for couples or families the price is often similar to a quality group tour.", "不一定。我们按您的预算规划，情侣或家庭的价格通常与优质跟团游相近。"],
  ["Is the proposal free?", "方案免费吗？", "Yes – requesting and adjusting your proposal is free and without obligation.", "是的，申请和修改方案完全免费，无任何义务。"],
  ["How fast will I hear from you?", "多久能收到回复？", "Usually within 24 hours on working days.", "工作日通常在24小时内。"],
  ["Can you add Laos, Cambodia or Thailand?", "可以加入老挝、柬埔寨或泰国吗？", "Yes, we arrange multi-country trips across Southeast Asia.", "可以，我们安排东南亚多国行程。"],
  ["Do I need a visa for Vietnam?", "去越南需要签证吗？", "Most travellers need an e-visa. We help you apply and can arrange airport fast track.", "大多数游客需要电子签证。我们协助申请，并可安排机场快速通关。"],
  ["How do I pay?", "如何付款？", "A deposit confirms your booking; the balance is paid before arrival.", "支付定金确认预订，余款在抵达前付清。"],
];

export default function TailorMadePage() {
  return (
    <>
      {/* HERO: giới thiệu + checklist bên trái, form 4 bước bên phải */}
      <section id="request" className="relative isolate scroll-mt-28 overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 -z-20 bg-[url('/images/tailor-hero.webp?v=2')] bg-cover bg-center" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/50" />
        <div className="container-x grid items-start gap-10 py-10 md:py-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <Link href="/" className="hover:text-white"><T k="nav.home" /></Link> <span className="mx-2">›</span> <span className="text-white"><L en="Free Trip Planning" zh="免费行程规划" /></span>
            </nav>
            <h1 className="mt-8 font-card text-5xl font-bold leading-[1.05] md:text-6xl"><L en="Plan your trip in 2 minutes" zh="2分钟规划您的旅程" /></h1>
            <p className="mt-6 text-lg text-white/85"><L en="Tell us your dates, group size and wishes. A travel expert will send you a free proposal." zh="告诉我们您的日期、人数和心愿，旅行专家将免费为您提供方案。" /></p>
            <ul className="mt-8 space-y-4">
              {PERKS.map(([en, zh]) => (
                <li key={en} className="flex gap-3"><FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-accent" /><L en={en} zh={zh} /></li>
              ))}
            </ul>
            <p className="mt-8 flex gap-2 text-sm text-white/70"><FontAwesomeIcon icon={faClock} className="mt-0.5" /><L en="Our travel expert will reply within 24 hours (usually much sooner)." zh="旅行专家将在24小时内回复（通常更快）。" /></p>
          </div>
          <TailorRequestForm />
        </div>
        {/* Ảnh Wikimedia Commons, giấy phép CC BY-SA 3.0 yêu cầu ghi nguồn */}
        <a href="https://commons.wikimedia.org/wiki/File:Tam_Coc_(85925447).jpeg" target="_blank" rel="noopener" className="absolute bottom-2 right-3 text-[10px] text-white/60 hover:text-white">Photo: Wolfgang B / CC BY-SA 3.0</a>
      </section>

      {/* WHY: 3 thẻ lớn */}
      <section className="container-x grid gap-6 py-20 md:grid-cols-3">
        {WHY.map((w) => (
          <div key={w.en} className="rounded-3xl bg-sand p-8">
            <FontAwesomeIcon icon={w.icon} className="text-4xl text-brand" />
            <p className="mt-6 font-card text-2xl font-bold"><L en={w.en} zh={w.zh} /></p>
            <p className="mt-2 text-lg text-muted"><L en={w.d} zh={w.dz} /></p>
          </div>
        ))}
      </section>

      {/* STEPS: 3 bước ngang */}
      <section className="bg-photo-dark py-16 text-white">
        <div className="container-x grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.en} className="flex items-center gap-5">
              <span className="font-card text-6xl font-bold text-accent">{i + 1}</span>
              <p className="font-card text-2xl font-bold leading-snug"><L en={s.en} zh={s.zh} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x max-w-4xl py-20">
        <h2 className="text-center font-card text-4xl font-bold md:text-5xl"><L en="Questions?" zh="常见问题" /></h2>
        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {FAQ.map(([q, qz, a, az]) => (
            <details key={q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-card text-xl font-semibold">
                <L en={q} zh={qz} />
                <FontAwesomeIcon icon={faChevronDown} className="text-base text-brand transition group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-lg text-ink/75"><L en={a} zh={az} /></p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-lg text-muted">
          <L en="More questions? " zh="还有问题？" />
          <a href={SITE.whatsapp} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">WhatsApp {SITE.phone}</a>
        </p>
      </section>

    </>
  );
}
