import SectionHeading from "./SectionHeading";
import { L } from "@/lib/i18n";

// Icon nét mảnh kiểu ảnh mẫu: nét xanh đậm + một chấm vàng nhấn (vẽ tay bằng SVG, viewBox 48x48)
const Dot = ({ cx, cy }: { cx: number; cy: number }) => <circle cx={cx} cy={cy} r="5" className="fill-accent" stroke="none" />;
const ICONS = [
  <>
    <rect x="6" y="12" width="36" height="24" rx="3" />
    <path d="M27 20h10M27 25h10M27 30h7" />
    <Dot cx={16} cy={24} />
  </>,
  <>
    <path d="M12 38c-4 0-4-6 0-6h20c5 0 5-8 0-8H18c-5 0-5-8 0-8h18" />
    <path d="M36 16V9" /><circle cx="36" cy="6" r="3" />
    <path d="M12 32c0 0-5-5-5-8a5 5 0 0 1 10 0c0 3-5 8-5 8z" /><circle cx="12" cy="24" r="1.6" />
    <Dot cx={24} cy={8} />
  </>,
  <>
    <path d="M6 20l10-4 16 6 10-4v24l-10 4-16-6-10 4z" />
    <path d="M16 16v26M32 22v24" />
    <path d="M24 26s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" className="fill-[var(--hb-bg,#f4e9d3)]" />
    <Dot cx={24} cy={13} />
  </>,
  <>
    <rect x="10" y="10" width="32" height="22" rx="3" />
    <rect x="6" y="15" width="32" height="22" rx="3" className="fill-[var(--hb-bg,#f4e9d3)]" />
    <path d="M6 21h32M11 30h12" />
    <Dot cx={37} cy={37} />
  </>,
  <>
    <circle cx="22" cy="28" r="14" />
    <path d="M8 28h28M22 14c-6 7-6 21 0 28M22 14c6 7 6 21 0 28M10 21h24M10 35h24" />
    <path d="M30 10l12-5 2 2-8 7M36 8l-6-2" />
    <Dot cx={9} cy={26} />
  </>,
];

// Đúng quy trình Vietlook đã duyệt: Liên hệ & cung cấp thông tin → Chia sẻ mong muốn → Nhận lịch trình đề xuất → Xác nhận & thanh toán → Đi du lịch an tâm
const STEPS = [
  { en: "Contact us & provide your information", zh: "联系我们并提供信息" },
  { en: "Share your wishes", zh: "分享您的需求" },
  { en: "Receive a proposed itinerary", zh: "收到推荐行程" },
  { en: "Confirm & pay", zh: "确认并付款" },
  { en: "Travel with peace of mind", zh: "安心出游" },
];

// Quy trình đặt tour 5 bước: icon + mô tả, chấm vàng nối bằng đường chấm, số thứ tự lớn bên dưới
export default function HowToBook() {
  return (
    <div className="mt-16 md:mt-24">
      <SectionHeading center kicker={<L en="Booking process" zh="预订流程" />} title={<L en="How to book a tour with us" zh="如何向我们预订行程" />} />
      <ol className="stagger relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {/* Đường chấm nối các bước (chỉ trên màn rộng, đi qua hàng chấm vàng) */}
        <span className="absolute inset-x-[10%] top-[164px] md:top-[160px] hidden border-t-2 border-dotted border-brand/40 lg:block" aria-hidden />
        {STEPS.map((s, i) => (
          <li key={s.en} className="group relative flex flex-col items-center text-center">
            <svg viewBox="0 0 48 48" className="h-16 w-16 text-brand-dark transition duration-300 group-hover:-translate-y-1 md:h-20 md:w-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {ICONS[i]}
            </svg>
            <p className="mt-4 min-h-[3rem] max-w-[13rem] font-card text-sm font-semibold leading-snug text-ink md:text-[15px]">
              <L en={s.en} zh={s.zh} />
            </p>
            <span className="relative z-10 mt-3 h-3 w-3 rounded-full bg-brand ring-4 ring-white/80" aria-hidden />
            <span className="mt-3 font-card text-5xl font-extrabold tracking-tight text-brand-dark drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
