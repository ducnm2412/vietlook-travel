import Link from "@/components/LocaleLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import HeroBackground from "./HeroBackground";
import RatingBadges from "./RatingBadges";
import HeroSearch from "./HeroSearch";
import type { Destination } from "@/lib/api";
import { TOUR_THEMES } from "@/lib/themes";
import { L, T } from "@/lib/i18n";

// Thay phiên 2 khung (chữ + 2 nút), mỗi khung hiện ~4,5 giây rồi ẩn hẳn trước khi khung kia hiện.
// Đặt CSS kèm component (CSS thêm ở cuối globals.css không được dev server nạp – xem PackageTours)
const CYCLE_CSS = `
.hero-cycle > * { grid-area: 1 / 1; }
.hero-cycle > .hero-cycle-a { animation: hero-cycle-a 16s linear infinite both; }
.hero-cycle > .hero-cycle-b { animation: hero-cycle-b 16s linear infinite both; }
@keyframes hero-cycle-a { 0%, 38% { visibility: visible; } 39%, 100% { visibility: hidden; } }
@keyframes hero-cycle-b { 0%, 49% { visibility: hidden; } 50%, 88% { visibility: visible; } 89%, 100% { visibility: hidden; } }
/* Vòng 16 giây: khung 1 hiện ~5 giây, trống ~2,5 giây, khung 2 hiện ~5 giây, trống ~2,5 giây.
   Từng phần tử vào lần lượt (cách nhau 0,15 giây): chữ chào trượt từ trái, "Welcome to" / "Vietnam" và cặp nút trượt lên rõ dần (không làm nhoè để không bị mờ giữa chừng),
   cặp nút bật lên từ dưới; khi rời khung thì cả khung mờ và trượt lên */
.hero-cycle .hc-in { will-change: transform, opacity; backface-visibility: hidden; animation: 16s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }
.hero-cycle-a .hc-in { animation-name: hc-a; }
.hero-cycle-b .hc-in { animation-name: hc-b; }
.hero-cycle .hc-in.hc-left { animation-name: var(--hc-left); }
.hero-cycle-a { --hc-left: hc-a-left; }
.hero-cycle-b { --hc-left: hc-b-left; }
.hero-cycle .hc-d1 { animation-delay: 0.15s; }
.hero-cycle .hc-d2 { animation-delay: 0.3s; }
.hero-cycle .hc-d3 { animation-delay: 0.5s; }
@keyframes hc-a {
  0% { opacity: 0; transform: translateY(24px); }
  6%, 30% { opacity: 1; transform: none; }
  34%, 100% { opacity: 0; transform: translateY(-18px); }
}
@keyframes hc-b {
  0%, 50% { opacity: 0; transform: translateY(24px); }
  56%, 80% { opacity: 1; transform: none; }
  84%, 100% { opacity: 0; transform: translateY(-18px); }
}
@keyframes hc-a-left {
  0% { opacity: 0; transform: translateX(-40px); }
  6%, 30% { opacity: 1; transform: none; }
  34%, 100% { opacity: 0; transform: translateY(-18px); }
}
@keyframes hc-b-left {
  0%, 50% { opacity: 0; transform: translateX(-40px); }
  56%, 80% { opacity: 1; transform: none; }
  84%, 100% { opacity: 0; transform: translateY(-18px); }
}
.hero-cycle:hover *, .hero-cycle:focus-within * , .hero-cycle:hover > *, .hero-cycle:focus-within > * { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hero-cycle > .hero-cycle-a, .hero-cycle .hc-in { animation: none; }
  .hero-cycle > .hero-cycle-b { display: none; }
}
`;

// Khung 1: 2 nút tour + báo giá; khung 2: điểm đánh giá Google / Tripadvisor
const SLIDES = [0, 1];

// Hero toàn màn hình với video nền, bố cục theo auroratravel.asia
export default function HeroVideo({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="relative isolate flex min-h-[760px] flex-col overflow-hidden md:min-h-[115vh]">
      <HeroBackground />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="hero-in container-x flex flex-1 flex-col justify-end pb-28 pt-40 md:justify-center md:pb-40">
        {/* 2 khung luân phiên (~5 giây mỗi khung): chữ chào + tiêu đề + 2 nút hiện lên rồi ẩn hẳn, khung sau đổi sang điểm đánh giá Google / Tripadvisor.
            Chồng lên nhau trong cùng ô lưới nên không nhảy bố cục; rê chuột vào thì dừng. */}
        <style>{CYCLE_CSS}</style>
        <div className="hero-cycle grid">
          {SLIDES.map((i) => (
            <div key={i} className={i ? "hero-cycle-b" : "hero-cycle-a"}>
              <p className="hc-in hc-left mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-sm md:mb-4 md:text-base md:tracking-[0.3em]"><T k="hero.hello" /></p>
              {/* Chỉ khung đầu dùng h1 để trang có đúng một tiêu đề chính */}
              {(() => {
                const Tag = i ? "p" : "h1";
                return (
                  <Tag className="max-w-4xl font-script text-5xl leading-[1.1] text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.5)] sm:text-7xl md:text-[8.5rem]">
                    <span className="hc-in hc-d1 block"><T k="hero.big1" /></span>
                    <span className="hc-in hc-d2 block text-accent"><T k="hero.big2" /></span>
                  </Tag>
                );
              })()}
              <div className="hc-in hc-d3 mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
                {i === 0 ? (
                  <>
                    <Link href="/tours" className="hero-pill justify-center gap-2 bg-[#d8b47a] text-xs font-semibold uppercase tracking-wide text-ink shadow-lg transition hover:bg-accent hover:text-white sm:text-[15px]">
                      <FontAwesomeIcon icon={faCompass} /> <L en="Explore our tours" zh="浏览我们的线路" />
                    </Link>
                    <Link href="/tailor-made" className="hero-pill justify-center gap-2 border border-white/40 bg-brand/60 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand sm:text-[15px]">
                      <FontAwesomeIcon icon={faPenToSquare} /> <L en="Get a free quote" zh="免费获取报价" />
                    </Link>
                  </>
                ) : (
                  <RatingBadges compact />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-10 mt-4 md:mt-5">
          <HeroSearch destinations={destinations} styles={TOUR_THEMES.map(({ slug, name, zh }) => ({ slug, name, zh }))} />
        </div>
      </div>

    </section>
  );
}
