import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeadset, faSliders, faWallet } from "@fortawesome/free-solid-svg-icons";
import TailorRequestForm from "@/components/forms/TailorRequestForm";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { getDestinations } from "@/lib/api";

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

const STEPS = [
  { en: "Share your wishes", zh: "告诉我们心愿" },
  { en: "Get a proposal in 24h", zh: "24小时内获得方案" },
  { en: "Adjust & travel", zh: "调整并出发" },
];

const FAQ = [
  ["Is a tailor-made trip more expensive?", "定制游更贵吗？", "Not necessarily. We plan within your budget, and for couples or families the price is often similar to a quality group tour.", "不一定。我们按您的预算规划，情侣或家庭的价格通常与优质跟团游相近。"],
  ["Is the proposal free?", "方案免费吗？", "Yes – requesting and adjusting your proposal is free and without obligation.", "是的，申请和修改方案完全免费，无任何义务。"],
  ["How fast will I hear from you?", "多久能收到回复？", "Usually within 24 hours on working days.", "工作日通常在24小时内。"],
  ["Can you add Laos, Cambodia or Thailand?", "可以加入老挝、柬埔寨或泰国吗？", "Yes, we arrange multi-country trips across Southeast Asia.", "可以，我们安排东南亚多国行程。"],
  ["Do I need a visa for Vietnam?", "去越南需要签证吗？", "Most travellers need an e-visa. We help you apply and can arrange airport fast track.", "大多数游客需要电子签证。我们协助申请，并可安排机场快速通关。"],
  ["How do I pay?", "如何付款？", "A deposit confirms your booking; the balance is paid before arrival.", "支付定金确认预订，余款在抵达前付清。"],
];

export default async function TailorMadePage() {
  const destinations = await getDestinations();

  return (
    <>
      {/* HERO: ảnh lớn, chữ ngắn */}
      <section className="relative isolate flex min-h-[70vh] items-end">
        <div className="absolute inset-0 -z-20 bg-[url('/images/tailor-hero.webp?v=2')] bg-cover bg-center" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="container-x pb-16 pt-40 text-white md:pb-24">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-accent"><L en="Tailor-made Tours" zh="定制旅游" /></p>
          <h1 className="mt-4 max-w-3xl font-card text-5xl font-bold leading-[1.1] md:text-7xl">
            <L en="Vietnam, designed for you." zh="为您量身打造的越南。" />
          </h1>
          <a href="#request" className="btn btn-accent mt-10 !px-9 !py-5 text-lg"><L en="Plan my free trip" zh="免费规划我的旅程" /></a>
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
      <section className="bg-brand py-16 text-white">
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

      {/* FORM */}
      <section id="request" className="scroll-mt-32 bg-sand py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-center font-card text-4xl font-bold md:text-5xl"><L en="Tell us about your trip" zh="告诉我们您的旅行计划" /></h2>
          <p className="mb-10 mt-4 text-center text-lg text-muted"><L en="Free, no obligation – reply within 24 hours." zh="免费、无义务，24小时内回复。" /></p>
          <TailorRequestForm destinations={destinations} />
        </div>
      </section>
    </>
  );
}
