import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Img from "@/components/Img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard, faCircleCheck, faEnvelope, faLocationDot, faPhone, faRoute, faShieldHalved, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Vietlook Travel collects, uses, stores and protects the personal information you share when you enquire or book a tour, car or visa service.",
  path: "/privacy-policy",
  image: "/images/heroes/about.webp",
  keywords: ["Vietlook Travel privacy policy", "personal data"],
});

// Nội dung theo trang chính sách của vietlooktravel-operators.vercel.app/policies/privacy
const SECTIONS: { id: string; icon: IconDefinition; image: string; en: string; zh: string; items: { en: string; zh: string }[] }[] = [
  {
    id: "collect", icon: faAddressCard, image: "/images/reviews/oldquarter.webp",
    en: "1. Information we collect",
    zh: "1. 我们收集的信息",
    items: [
      { en: "Contact details you enter in our forms: name, email, phone / WhatsApp / WeChat and nationality.", zh: "您在表单中填写的联系方式：姓名、电子邮件、电话 / WhatsApp / 微信及国籍。" },
      { en: "Trip details: travel dates, number of travellers, children's ages, flight numbers and special requests.", zh: "行程信息：出行日期、人数、儿童年龄、航班号及特殊要求。" },
      { en: "Passport details, only when required for visas, flights, cruises or hotel registration.", zh: "护照信息，仅在办理签证、机票、游轮或酒店登记时需要。" },
    ],
  },
  {
    id: "use", icon: faRoute, image: "/images/reviews/boat.webp",
    en: "2. How we use your information",
    zh: "2. 信息的使用",
    items: [
      { en: "To answer your enquiries, arrange and operate the services you book, and send booking confirmations.", zh: "用于回复您的咨询、安排和执行您预订的服务，以及发送预订确认。" },
      { en: "Only the necessary details are passed to hotels, cruises, airlines and immigration services that deliver your trip.", zh: "仅将必要信息提供给为您的行程提供服务的酒店、游轮、航空公司和出入境部门。" },
      { en: "We never share your data with third parties for marketing.", zh: "我们绝不会将您的数据提供给第三方用于营销。" },
    ],
  },
  {
    id: "security", icon: faShieldHalved, image: "/images/reviews/tamcoc.webp",
    en: "3. Security and retention",
    zh: "3. 安全与保存",
    items: [
      { en: "Requests are stored in our protected management system.", zh: "您的请求保存在我们受保护的管理系统中。" },
      { en: "We keep your data only as long as needed for your booking and our legal obligations.", zh: "数据仅在预订及法律义务所需期间内保存。" },
    ],
  },
  {
    id: "rights", icon: faUserCheck, image: "/images/reviews/hats.webp",
    en: "4. Your rights",
    zh: "4. 您的权利",
    items: [
      { en: "You may email us at any time to access, correct or delete your personal data.", zh: "您可随时发送电子邮件，查阅、更正或删除您的个人数据。" },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title={<L en="Privacy Policy" zh="隐私政策" />} sub={<L en="How we collect, use and protect your personal information." zh="我们如何收集、使用和保护您的个人信息。" />} image="/images/heroes/about.webp" />
      {/* Tóm tắt: 4 thẻ icon, bấm để nhảy tới mục */}
      <section className="container-x py-14">
        <p className="mx-auto max-w-2xl text-center text-lg text-muted">
          <L en="Your trust matters to us. Here is a clear summary of what we collect, why, and how you stay in control of your data." zh="您的信任对我们至关重要。以下简要说明我们收集哪些信息、用途，以及您如何掌控自己的数据。" />
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-light text-2xl text-brand transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <FontAwesomeIcon icon={s.icon} />
              </span>
              <p className="mt-4 font-card text-lg font-bold"><L en={s.en.replace(/^\d+\. /, "")} zh={s.zh.replace(/^\d+\. /, "")} /></p>
              <p className="mt-1 text-sm text-muted"><L en={s.items[0].en} zh={s.items[0].zh} /></p>
            </a>
          ))}
        </div>
      </section>

      {/* Từng mục: ảnh minh hoạ xen kẽ trái/phải */}
      {SECTIONS.map((s, k) => (
        <section key={s.id} id={s.id} className={`scroll-mt-32 py-12 md:py-16 ${k % 2 ? "bg-photo-light" : ""}`}>
          <div className="container-x grid items-center gap-10 lg:grid-cols-2">
            <div className={`group relative ${k % 2 ? "lg:order-2" : ""}`}>
              <div className={`absolute -inset-3 -z-10 rounded-3xl bg-accent/20 transition duration-500 group-hover:rotate-0 ${k % 2 ? "-rotate-2" : "rotate-2"}`} />
              <Img src={s.image} alt="" width={640} className="aspect-[4/3] rounded-2xl shadow-lg [&_img]:transition [&_img]:duration-700 group-hover:[&_img]:scale-105" />
              <span className="absolute -bottom-5 left-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand text-2xl text-white shadow-xl">
                <FontAwesomeIcon icon={s.icon} />
              </span>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en={`Section ${k + 1}`} zh={`第${k + 1}部分`} /></p>
              <h2 className="font-card text-3xl font-bold"><L en={s.en.replace(/^\d+\. /, "")} zh={s.zh.replace(/^\d+\. /, "")} /></h2>
              <ul className="mt-6 space-y-4">
                {s.items.map((i) => (
                  <li key={i.en} className="flex gap-3 leading-relaxed text-ink/80">
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-1 shrink-0 text-brand" />
                    <span><L en={i.en} zh={i.zh} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Liên hệ */}
      <section className="bg-photo-dark py-16 text-white">
        <div className="container-x text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl"><L en="Questions about your data?" zh="对您的数据有疑问？" /></h2>
          <p className="mt-3 text-white/80"><L en="Contact us any time — we reply within 24 hours." zh="欢迎随时联系我们，我们将在24小时内回复。" /></p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: faEnvelope, label: { en: "Email", zh: "电子邮件" }, value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: faPhone, label: { en: "Hotline 24/7", zh: "24小时热线" }, value: SITE.phone, href: `tel:+${SITE.phoneRaw}` },
              { icon: faLocationDot, label: { en: "Address", zh: "地址" }, value: "No 58, Yen Nghia Ward, Ha Dong, Hanoi, Vietnam", href: undefined },
            ].map((c) => (
              <a key={c.label.en} href={c.href} className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <FontAwesomeIcon icon={c.icon} className="text-2xl text-accent" />
                <p className="mt-3 text-sm uppercase tracking-wider text-white/70"><L en={c.label.en} zh={c.label.zh} /></p>
                <p className="mt-1 break-words font-semibold">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
