import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { faBuildingColumns, faHandshake, faPercent } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Payment Policy",
  description: "How to pay Vietlook Travel: bank transfer, cash or card at our Hanoi office, or on arrival for day tours. Deposit and balance terms for multi-day tours.",
  path: "/payment-policy",
  image: "/images/heroes/about.webp",
  keywords: ["Vietlook Travel payment", "Vietnam tour deposit"],
});

// Nội dung theo vietlooktravel-operators.vercel.app/policies/payment
const SECTIONS: PolicySection[] = [
  {
    icon: faBuildingColumns, en: "How to pay", zh: "付款方式",
    items: [
      { strong: { en: "Bank transfer:", zh: "银行转账：" }, en: "international transfer to our company account in Vietnam. Account details are on your booking confirmation.", zh: "国际汇款至我们在越南的公司账户，账户信息见预订确认函。" },
      { strong: { en: "In person:", zh: "现场付款：" }, en: "cash (USD or VND) or card at our Hanoi office.", zh: "在河内办公室以现金（美元或越南盾）或银行卡支付。" },
      { strong: { en: "On arrival:", zh: "抵达后付款：" }, en: "for day tours, car transfers and fast-track services you can pay the guide or driver on request.", zh: "一日游、接送车和快速通关服务，可应要求直接付给导游或司机。" },
    ],
  },
  {
    icon: faPercent, en: "Deposit & balance", zh: "定金与尾款",
    items: [
      { strong: { en: "Multi-day tours:", zh: "多日游：" }, en: "a deposit (usually 30%) secures hotels, cruises and flights; the balance is paid before or on arrival.", zh: "支付定金（通常30%）以确保酒店、游轮和机票，尾款在出发前或抵达时支付。" },
      { strong: { en: "Peak dates", zh: "旺季" }, en: "(Tet, national holidays, Christmas – New Year): full prepayment may be required for cruises and hotels.", zh: "（春节、国家假日、圣诞至新年）：游轮和酒店可能需要全额预付。" },
    ],
  },
  {
    icon: faHandshake, en: "Travel agents (B2B)", zh: "旅行社（B2B）",
    items: [
      { en: "Partner agencies receive net-rate confirmations.", zh: "合作旅行社将收到净价确认。" },
      { en: "Invoice-based payment terms are set out in the partnership contract.", zh: "按发票结算的付款条款以合作合同为准。" },
    ],
  },
];

export default function PaymentPolicyPage() {
  return (
    <PolicyPage
      current="/payment-policy"
      title={{ en: "Payment Policy", zh: "付款政策" }}
      sub={{ en: "Simple, secure ways to pay for your trip.", zh: "简单、安全的付款方式。" }}
      image="/images/heroes/about.webp"
      intro={{ en: "We do not take online card payments on this website. After you send a booking request, our team checks availability and sends a written confirmation with the final price and how to pay.", zh: "本网站不提供在线刷卡支付。您提交预订请求后，我们会确认房态并发送书面确认函，注明最终价格和付款方式。" }}
      sections={SECTIONS}
    />
  );
}
