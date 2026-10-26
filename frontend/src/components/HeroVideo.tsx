import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import HeroBackground from "./HeroBackground";
import HeroSearch from "./HeroSearch";
import type { Destination } from "@/lib/api";
import { TOUR_THEMES } from "@/lib/themes";
import { T } from "@/lib/i18n";

// Hero toàn màn hình với video nền, bố cục theo auroratravel.asia
export default function HeroVideo({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="relative isolate flex min-h-[760px] flex-col overflow-hidden md:h-[115vh]">
      <HeroBackground />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="hero-in container-x flex flex-1 flex-col justify-end pb-28 pt-40 md:justify-center md:pb-40">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-sm md:mb-4 md:text-base md:tracking-[0.3em]"><T k="hero.hello" /></p>
        <h1 className="max-w-4xl font-script text-5xl leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-7xl md:text-[8.5rem]">
          <span className="block"><T k="hero.big1" /></span>
          <span className="block text-accent"><T k="hero.big2" /></span>
        </h1>
        <div className="mt-7 flex gap-2 sm:gap-4 md:mt-10">
          <Link href="/tours" className="inline-flex items-center whitespace-nowrap rounded-full bg-[#d8b47a] px-4 py-2.5 text-xs font-semibold sm:px-9 sm:py-4 sm:text-base uppercase tracking-wide text-ink shadow-lg transition hover:bg-accent hover:text-white">
            <T k="hero.book" />
          </Link>
          <Link href="/tailor-made" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-brand/60 px-4 py-2.5 text-xs font-semibold sm:gap-3 sm:px-8 sm:py-4 sm:text-base uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-brand">
            <FontAwesomeIcon icon={faPenToSquare} />
            <T k="hero.car" />
          </Link>
        </div>
        <div className="mt-8 md:mt-14">
          <HeroSearch destinations={destinations} styles={TOUR_THEMES.map(({ slug, name, zh }) => ({ slug, name, zh }))} />
        </div>
      </div>

      {/* Sóng ở đáy hero, lớp trên cùng màu trắng nối liền với section kế tiếp */}
      <svg className="hero-waves absolute inset-x-0 -bottom-px h-16 w-full md:h-24" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden>
        <defs>
          <path id="hero-wave" d="M-160 44c7.5 0 14.5-8 22-8s14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8v44h-352z" />
        </defs>
        <g>
          <use href="#hero-wave" x="48" y="0" fill="rgba(255,255,255,0.25)" />
          <use href="#hero-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#hero-wave" x="48" y="7" fill="#ffffff" />
        </g>
      </svg>
    </section>
  );
}
