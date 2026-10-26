import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Vietlook Travel collects, uses, stores and protects the personal information you share when you enquire or book a tour, car or visa service.",
  path: "/privacy-policy",
  image: "/images/heroes/about.webp",
  keywords: ["Vietlook Travel privacy policy", "personal data"],
});

// Nội dung theo trang chính sách của vietlooktravel-operators.vercel.app/policies/privacy
const SECTIONS: { en: string; zh: string; items: { en: string; zh: string }[] }[] = [
  {
    en: "1. Information we collect",
    zh: "1. 我们收集的信息",
    items: [
      { en: "Contact details you enter in our forms: name, email, phone / WhatsApp / WeChat and nationality.", zh: "您在表单中填写的联系方式：姓名、电子邮件、电话 / WhatsApp / 微信及国籍。" },
      { en: "Trip details: travel dates, number of travellers, children's ages, flight numbers and special requests.", zh: "行程信息：出行日期、人数、儿童年龄、航班号及特殊要求。" },
      { en: "Passport details, only when required for visas, flights, cruises or hotel registration.", zh: "护照信息，仅在办理签证、机票、游轮或酒店登记时需要。" },
    ],
  },
  {
    en: "2. How we use your information",
    zh: "2. 信息的使用",
    items: [
      { en: "To answer your enquiries, arrange and operate the services you book, and send booking confirmations.", zh: "用于回复您的咨询、安排和执行您预订的服务，以及发送预订确认。" },
      { en: "Only the necessary details are passed to hotels, cruises, airlines and immigration services that deliver your trip.", zh: "仅将必要信息提供给为您的行程提供服务的酒店、游轮、航空公司和出入境部门。" },
      { en: "We never share your data with third parties for marketing.", zh: "我们绝不会将您的数据提供给第三方用于营销。" },
    ],
  },
  {
    en: "3. Security and retention",
    zh: "3. 安全与保存",
    items: [
      { en: "Requests are stored in our protected management system.", zh: "您的请求保存在我们受保护的管理系统中。" },
      { en: "We keep your data only as long as needed for your booking and our legal obligations.", zh: "数据仅在预订及法律义务所需期间内保存。" },
    ],
  },
  {
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
      <section className="container-x max-w-3xl py-14">
        {SECTIONS.map((s) => (
          <div key={s.en} className="mb-10">
            <h2 className="font-card text-2xl font-bold"><L en={s.en} zh={s.zh} /></h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink/80">
              {s.items.map((i) => <li key={i.en}><L en={i.en} zh={i.zh} /></li>)}
            </ul>
          </div>
        ))}
        <div className="rounded-2xl bg-brand-light p-6">
          <h2 className="font-card text-2xl font-bold"><L en="Contact us" zh="联系我们" /></h2>
          <ul className="mt-4 space-y-1 text-ink/80">
            <li>Email: <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">{SITE.email}</a></li>
            <li><L en="Hotline 24/7" zh="24小时热线" />: <a href={`tel:+${SITE.phoneRaw}`} className="text-brand hover:underline">{SITE.phone}</a></li>
            <li><L en="Address" zh="地址" />: No 58, Yen Nghia Ward, Ha Dong, Hanoi, Vietnam</li>
          </ul>
        </div>
      </section>
    </>
  );
}
