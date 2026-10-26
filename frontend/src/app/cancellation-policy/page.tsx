import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { faCalendarXmark, faCarSide, faCloudShowersHeavy, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Cancellation & Changes Policy",
  description: "Vietlook Travel cancellation fees by days before departure, free date changes, day tour and car cancellations, and force majeure refunds.",
  path: "/cancellation-policy",
  image: "/images/heroes/tours.webp",
  keywords: ["Vietlook Travel cancellation", "Vietnam tour refund policy"],
});

// Nội dung theo vietlooktravel-operators.vercel.app/policies/cancellation
const SECTIONS: PolicySection[] = [
  {
    icon: faCalendarXmark, en: "Cancellation by the guest (tour packages)", zh: "客人取消（套餐线路）",
    items: [
      { strong: { en: "More than 30 days", zh: "出发前30天以上：" }, en: "before departure: deposit refunded, minus bank fees.", zh: "退还定金，扣除银行手续费。" },
      { strong: { en: "15 – 30 days:", zh: "15–30天：" }, en: "30% of the tour price.", zh: "收取线路价格的30%。" },
      { strong: { en: "7 – 14 days:", zh: "7–14天：" }, en: "50% of the tour price.", zh: "收取线路价格的50%。" },
      { strong: { en: "Less than 7 days or no-show:", zh: "7天以内或未出现：" }, en: "100% of the tour price.", zh: "收取线路价格的100%。" },
    ],
  },
  {
    icon: faPenToSquare, en: "Changes", zh: "行程变更",
    items: [
      { en: "Date or itinerary changes are free more than 15 days before departure, subject to availability.", zh: "出发前15天以上更改日期或行程免费（视供应情况而定）。" },
      { en: "Later changes may incur supplier fees.", zh: "之后的更改可能产生供应商费用。" },
    ],
  },
  {
    icon: faCarSide, en: "Day tours, cars & fast-track", zh: "一日游、包车与快速通关",
    items: [
      { en: "Free cancellation up to 24 hours before the service.", zh: "服务开始前24小时可免费取消。" },
      { en: "We track flight delays – your driver waits at no extra cost.", zh: "我们会跟踪航班延误，司机免费等候。" },
    ],
  },
  {
    icon: faCloudShowersHeavy, en: "Force majeure", zh: "不可抗力",
    items: [
      { en: "If weather (typhoons, Halong Bay closures) or the authorities cancel a service, we offer an alternative or refund the unused part.", zh: "如因天气（台风、下龙湾封航）或政府原因取消服务，我们将提供替代方案或退还未使用部分。" },
    ],
  },
];

export default function CancellationPolicyPage() {
  return (
    <PolicyPage
      current="/cancellation-policy"
      title={{ en: "Cancellation & Changes", zh: "取消与变更" }}
      sub={{ en: "Clear, fair rules if your plans change.", zh: "计划有变时，清晰公平的规则。" }}
      image="/images/heroes/tours.webp"
      intro={{ en: "Plans change – we understand. These general rules apply unless your booking confirmation says otherwise.", zh: "计划总有变化，我们理解。除预订确认函另有说明外，适用以下一般规则。" }}
      note={{ en: "Some cruises and peak-season hotels have stricter conditions; we will always tell you before you confirm.", zh: "部分游轮和旺季酒店条件更严格，我们会在您确认前告知。" }}
      sections={SECTIONS}
    />
  );
}
