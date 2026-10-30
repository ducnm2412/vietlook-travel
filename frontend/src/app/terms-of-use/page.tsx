import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description: "The terms that apply when you use the Vietlook Travel website and book tours, private cars, visa and airport fast-track services with us.",
  path: "/terms-of-use",
  image: "/images/heroes/about.webp",
  keywords: ["Vietlook Travel terms of use", "booking terms"],
});

type Item = { en: string; zh: string };
type Section = { id: string; en: string; zh: string; items: Item[] };

// BẢN NHÁP chờ Vietlook duyệt: điều khoản phổ thông cho website đại lý du lịch. Không tự đặt con số (mức hoàn tiền,
// thời hạn huỷ…) – các điều đó dẫn sang trang Chính sách thanh toán và Chính sách huỷ/đổi tour.
const SECTIONS: Section[] = [
  {
    id: "about", en: "About these terms", zh: "关于本条款",
    items: [
      { en: `This website is operated by ${SITE.name} (“Vietlook Travel”, “we”, “us”).`, zh: `本网站由 ${SITE.name}（“Vietlook Travel”、“我们”）运营。` },
      { en: "By using this website or booking a service with us, you agree to these terms. If you do not agree, please do not use the website.", zh: "使用本网站或向我们预订服务，即表示您同意本条款。如不同意，请勿使用本网站。" },
      { en: "We may update these terms from time to time. The version published on this page applies at the time of your booking.", zh: "我们可能不时更新本条款，以您预订时本页面发布的版本为准。" },
    ],
  },
  {
    id: "website", en: "Using our website", zh: "网站使用",
    items: [
      { en: "You may use the website to find information, request quotes and book services for personal, non-commercial purposes.", zh: "您可使用本网站查询信息、索取报价及预订服务，仅限个人非商业用途。" },
      { en: "Do not copy, scrape or misuse the website, upload harmful code, or try to access systems you are not authorised to use.", zh: "不得复制、抓取或滥用本网站，不得上传恶意代码或尝试访问未经授权的系统。" },
      { en: "Information you send through our forms must be true and complete. You are responsible for the details of every traveller in your booking.", zh: "您通过表单提交的信息须真实完整，并对预订中所有旅客的信息负责。" },
    ],
  },
  {
    id: "prices", en: "Information and prices", zh: "信息与价格",
    items: [
      { en: "We try to keep tour descriptions, photos and prices accurate, but itineraries, opening times and prices from suppliers can change.", zh: "我们尽力确保线路介绍、图片和价格准确，但行程、开放时间及供应商价格可能变动。" },
      { en: "Prices on the website are for reference. The final price is the one in the written quotation or booking confirmation we send you.", zh: "网站价格仅供参考，最终价格以我们发送的书面报价或预订确认为准。" },
      { en: "Photos are for illustration and may differ from the actual vehicle, room or cruise on the day.", zh: "图片仅供参考，可能与实际车辆、房间或游轮有所不同。" },
    ],
  },
  {
    id: "booking", en: "Bookings, payment and cancellation", zh: "预订、付款与取消",
    items: [
      { en: "A booking is confirmed only when we send a written confirmation and receive the required payment.", zh: "只有在我们发出书面确认并收到所需款项后，预订方才生效。" },
      { en: "Payment methods, deposits and refunds follow our Payment and refund policy.", zh: "付款方式、订金及退款依照我们的《付款与退款政策》执行。" },
      { en: "Changes and cancellations follow our Cancellation and change policy and any special conditions stated in your confirmation.", zh: "变更与取消依照我们的《取消与改团政策》以及确认书中注明的特殊条款执行。" },
    ],
  },
  {
    id: "travellers", en: "Your responsibilities as a traveller", zh: "旅客责任",
    items: [
      { en: "Make sure your passport, visa and any health documents are valid for Vietnam and every country on your trip.", zh: "请确保您的护照、签证及健康证明对越南及行程中所有国家有效。" },
      { en: "We strongly recommend travel insurance that covers medical costs, cancellation and personal belongings.", zh: "我们强烈建议购买涵盖医疗、取消及个人财物的旅行保险。" },
      { en: "Please follow local laws, safety instructions from guides and drivers, and respect local customs.", zh: "请遵守当地法律、导游和司机的安全指引，并尊重当地习俗。" },
    ],
  },
  {
    id: "liability", en: "Suppliers and our liability", zh: "供应商与责任",
    items: [
      { en: "Some services are provided by independent suppliers such as hotels, cruises, airlines and airports. Their own terms also apply.", zh: "部分服务由酒店、游轮、航空公司和机场等独立供应商提供，其自身条款同样适用。" },
      { en: "We are not responsible for delays or changes caused by events outside our control, such as weather, natural disasters, strikes, flight changes or government decisions.", zh: "对于天气、自然灾害、罢工、航班变动或政府决定等不可抗力造成的延误或变更，我们不承担责任。" },
      { en: "Nothing in these terms limits rights you have under Vietnamese consumer protection law.", zh: "本条款不限制您依据越南消费者权益保护法享有的权利。" },
    ],
  },
  {
    id: "content", en: "Content and personal data", zh: "内容与个人数据",
    items: [
      { en: "Texts, photos, logos and videos on this website belong to Vietlook Travel or are used with permission. Please ask us before reusing them.", zh: "本网站的文字、图片、标志和视频归 Vietlook Travel 所有或经授权使用，转载前请先征得我们同意。" },
      { en: "Links to other websites are provided for convenience; we are not responsible for their content.", zh: "外部网站链接仅为方便提供，我们不对其内容负责。" },
      { en: "How we handle your personal information is explained in our Privacy policy.", zh: "我们如何处理您的个人信息，详见《隐私政策》。" },
    ],
  },
  {
    id: "law", en: "Governing law and contact", zh: "适用法律与联系",
    items: [
      { en: "These terms are governed by the laws of Vietnam. We will always try to resolve any complaint with you directly and quickly first.", zh: "本条款受越南法律管辖。如有投诉，我们会首先尽快与您直接协商解决。" },
      { en: `Questions about these terms: ${SITE.email} · ${SITE.phone}.`, zh: `如对本条款有疑问，请联系：${SITE.email} · ${SITE.phone}。` },
    ],
  },
];

const RELATED = [
  { en: "Privacy policy", zh: "隐私政策", href: "/privacy-policy" },
  { en: "Payment and refund policy", zh: "付款与退款政策", href: "/payment-policy" },
  { en: "Cancellation and change policy", zh: "取消与改团政策", href: "/cancellation-policy" },
];

// Mục lục dính bên trái (máy tính), nội dung đánh số bên phải
export default function TermsOfUsePage() {
  return (
    <>
      <PageHero title={<L en="Terms of Use" zh="使用条款" />} sub={<L en="The rules for using our website and booking with Vietlook Travel." zh="使用本网站及向 Vietlook Travel 预订服务的规则。" />} image="/images/heroes/about.webp" />
      <section className="container-x grid gap-10 py-14 lg:grid-cols-[260px_1fr] lg:gap-16 md:py-20">
        <nav className="lg:sticky lg:top-36 lg:self-start" aria-label="Contents">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Contents" zh="目录" /></p>
          <ol className="space-y-1.5 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`} className="flex gap-2 rounded-lg px-2 py-1.5 text-ink/75 transition hover:bg-brand-light hover:text-brand"><span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span><L en={s.en} zh={s.zh} /></a></li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl bg-sand/60 p-4 text-sm">
            <p className="font-semibold"><L en="Related policies" zh="相关政策" /></p>
            <ul className="mt-2 space-y-1">
              {RELATED.map((r) => <li key={r.href}><Link href={r.href} className="text-brand hover:underline"><L en={r.en} zh={r.zh} /></Link></li>)}
            </ul>
          </div>
        </nav>
        <div className="space-y-10">
          {SECTIONS.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-36 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <h2 className="flex items-baseline gap-3 font-card text-2xl font-bold"><span className="font-mono text-lg text-accent">{String(i + 1).padStart(2, "0")}</span><L en={s.en} zh={s.zh} /></h2>
              <ul className="mt-5 space-y-3">
                {s.items.map((it) => (
                  <li key={it.en} className="flex gap-3 leading-relaxed text-ink/80"><FontAwesomeIcon icon={faCircleCheck} className="mt-1 shrink-0 text-brand" /><span><L en={it.en} zh={it.zh} /></span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
