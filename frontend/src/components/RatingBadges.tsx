import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Logo cú Tripadvisor giản lược (Font Awesome bản free không có icon Tripadvisor)
const Owl = () => (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
    <circle cx="20" cy="20" r="20" fill="#34e0a1" />
    <g fill="#fff" stroke="#000" strokeWidth="2.2">
      <circle cx="13" cy="21" r="6" />
      <circle cx="27" cy="21" r="6" />
    </g>
    <circle cx="13" cy="21" r="2.4" />
    <circle cx="27" cy="21" r="2.4" />
    <path d="M7 15c8-5 18-5 26 0M20 27l-2.5-3h5z" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// Số sao + số đánh giá trên Google và Tripadvisor, bấm vào mở trang đánh giá thật.
// Số đánh giá lấy từ SITE (Tripadvisor: 35 theo vietlooktravel.com); để trống thì chỉ hiện "Read our reviews"
export default function RatingBadges({ compact = false }: { compact?: boolean }) {
  const items = [
    { href: SITE.maps, count: SITE.googleReviews, logo: <><FontAwesomeIcon icon={faGoogle} className="text-3xl" /><span className="font-card text-3xl font-semibold">Google</span></>, mark: <FontAwesomeIcon icon={faStar} className="text-xl text-[#fbbc05]" /> },
    { href: SITE.tripadvisor, count: SITE.tripadvisorReviews, logo: <><Owl /><span className="font-card text-3xl font-semibold">Tripadvisor</span></>, mark: <span className="block h-5 w-5 rounded-full border-2 border-[#34e0a1] bg-[#34e0a1] ring-2 ring-[#34e0a1]/40" /> },
  ];
  // Bản gọn cho hero: 2 viên kính mờ xếp ngang dưới ô tìm kiếm
  if (compact)
    return (
      <div className="flex flex-wrap gap-3">
        {items.map((it) => (
          <a key={it.href} href={it.href} target="_blank" rel="noopener" className="hero-pill gap-3 bg-black/30 pl-3 pr-4 text-white ring-1 ring-white/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-black/45">
            <span className="flex items-center gap-2 max-sm:[&_.font-card]:hidden [&_span]:text-lg [&_svg]:h-6 [&_svg]:w-6">{it.logo}</span>
            <span className="flex flex-col leading-tight">
              <span className="flex gap-0.5 [&_span]:h-3 [&_span]:w-3 [&_svg]:text-xs" role="img" aria-label="5/5">{Array.from({ length: 5 }, (_, i) => <span key={i} className="grid place-items-center">{it.mark}</span>)}</span>
              <span className="mt-1 text-[11px] font-semibold text-white/80">{it.count ? <L en={`${it.count} reviews`} zh={`${it.count} 条评价`} /> : <L en="Read reviews" zh="查看评价" />}</span>
            </span>
          </a>
        ))}
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
      {items.map((it) => (
        <a key={it.href} href={it.href} target="_blank" rel="noopener" className="group flex flex-col items-center gap-2 rounded-3xl bg-white/10 px-6 py-6 text-white ring-1 ring-white/15 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
          <span className="flex items-center gap-3">{it.logo}</span>
          <span className="flex gap-1.5" role="img" aria-label="5/5">{Array.from({ length: 5 }, (_, i) => <span key={i}>{it.mark}</span>)}</span>
          <span className="text-sm font-semibold text-white/85 group-hover:text-accent">
            {it.count ? <L en={`Based on ${it.count} reviews`} zh={`基于 ${it.count} 条评价`} /> : <L en="Read our reviews" zh="查看我们的评价" />} →
          </span>
        </a>
      ))}
    </div>
  );
}
