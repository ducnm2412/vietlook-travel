"use client";

import Link from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang, type DictKey } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { stripLang } from "@/lib/locale";
import { GUIDE_GROUPS, topicHref } from "@/lib/guide";
import Img from "./Img";
import LogoBadge from "./LogoBadge";
import DestinationsMega from "./DestinationsMega";
import { TOUR_THEMES } from "@/lib/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type MenuLink = { label: string; zh?: string; href: string; img?: string };
type MenuItem = { key: DictKey; href: string; mega?: { title: string; zh?: string; links: MenuLink[]; all?: MenuLink }[]; tiles?: string[]; extra?: number; panels?: { title: string; zh: string; col: number; all?: MenuLink }[]; cols?: string };

// Ảnh cho ô dropdown, lấy theo href (truyền từ layout: ảnh điểm đến và thành phố xe)
export type MenuImages = Record<string, string | null>;

// Điểm đến theo miền (menu điện thoại mục Destinations; desktop dùng DestinationsMega)
const REGION_MEGA: NonNullable<MenuItem["mega"]> = [
      {
        title: "North Vietnam", zh: "越南北部",
        links: [
          { label: "Ha Noi", zh: "河内", href: "/destinations/ha-noi" },
          { label: "Sapa", zh: "沙坝", href: "/destinations/sapa" },
          { label: "Ha Giang", zh: "河江", href: "/destinations/ha-giang" },
          { label: "Ha Long Bay", zh: "下龙湾", href: "/destinations/ha-long-bay" },
          { label: "Ninh Binh", zh: "宁平", href: "/destinations/ninh-binh" },
          { label: "Cao Bang", zh: "高平", href: "/destinations/cao-bang" },
        ],
      },
      {
        title: "Central Vietnam", zh: "越南中部",
        links: [
          { label: "Hoi An", zh: "会安", href: "/destinations/hoi-an" },
          { label: "Hue", zh: "顺化", href: "/destinations/hue" },
          { label: "Da Nang", zh: "岘港", href: "/destinations/da-nang" },
          { label: "Phong Nha", zh: "风牙", href: "/destinations/quang-binh" },
          { label: "Nha Trang", zh: "芽庄", href: "/destinations/nha-trang" },
        ],
      },
      {
        title: "South Vietnam", zh: "越南南部",
        links: [
          { label: "Ho Chi Minh City", zh: "胡志明市", href: "/destinations/ho-chi-minh-city" },
          { label: "Mekong Delta", zh: "湄公河三角洲", href: "/tours?q=mekong" },
          { label: "Phu Quoc", zh: "富国岛", href: "/destinations/phu-quoc" },
          { label: "Mui Ne", zh: "美奈", href: "/destinations/mui-ne" },
        ],
      },
    ];

// Menu theo vietlooktravel.com, trình bày mega menu kiểu localvietnam.com
const MENU: MenuItem[] = [
  {
    key: "nav.tours",
    href: "/tours",
    // Dropdown 4 cột: theo miền · theo số ngày · theo chủ đề · ảnh + tour nổi bật
    cols: "/images/destinations/quang-binh-tour.webp",
    mega: [
      {
        title: "By region", zh: "按地区",
        all: { label: "All Vietnam tours", zh: "全部越南线路", href: "/tours" },
        links: [
          { label: "Northern Vietnam", zh: "越南北部", href: "/tours?region=north", img: "ha-long-tour" },
          { label: "Central Vietnam", zh: "越南中部", href: "/tours?region=central", img: "hoi-an" },
          { label: "Southern Vietnam", zh: "越南南部", href: "/tours?region=south", img: "mekong" },
        ],
      },
      {
        title: "By duration", zh: "按天数",
        all: { label: "All durations", zh: "全部天数", href: "/tours" },
        links: [
          { label: "Day trips", zh: "一日游", href: "/tours?minDays=1&maxDays=1", img: "ha-noi-tour" },
          { label: "Around 1 week", zh: "约1周", href: "/tours?minDays=5&maxDays=9", img: "ninh-binh-tour" },
          { label: "Around 2 weeks", zh: "约2周", href: "/tours?minDays=10&maxDays=16", img: "sapa-tour" },
          { label: "3 weeks or more", zh: "3周以上", href: "/tours?minDays=17&maxDays=999", img: "phu-quoc-tour" },
        ],
      },
      {
        title: "By theme", zh: "按主题",
        all: { label: "All tour themes", zh: "全部主题", href: "/themes/hand-picked" },
        links: [
          { label: "Luxury tours", zh: "奢华之旅", href: "/themes/luxury", img: "theme-luxury" },
          { label: "Hand-picked tours", zh: "精选线路", href: "/themes/hand-picked", img: "theme-hand-picked" },
          { label: "Cultural tours", zh: "文化之旅", href: "/themes/culture", img: "theme-culture" },
          { label: "Family tours", zh: "家庭之旅", href: "/themes/family", img: "theme-family" },
          { label: "Honeymoon tours", zh: "蜜月之旅", href: "/themes/honeymoon", img: "theme-honeymoon" },
          { label: "Classic tours", zh: "经典线路", href: "/themes/classic", img: "theme-classic" },
          { label: "Photography tours", zh: "摄影之旅", href: "/themes/photography", img: "theme-photography" },
        ],
      },
      {
        title: "All Vietnam tours", zh: "全部越南线路",
        links: [
          { label: "All Vietnam tours", zh: "全部越南线路", href: "/tours", img: "da-nang-tour" },
          { label: "Ha Long Bay cruises", zh: "下龙湾游轮", href: "/tours?theme=cruise-tour", img: "theme-cruise" },
          { label: "Ha Giang Loop tours", zh: "河江环线", href: "/tours?q=loop", img: "ha-giang-tour" },
          { label: "Sapa trekking tours", zh: "沙坝徒步", href: "/tours?q=trek", img: "sapa-tour" },
          { label: "Tailor-made tour", zh: "私人定制", href: "/tailor-made", img: "theme-tailor-made" },
        ],
      },
    ],
  },
  {
    key: "nav.packages",
    href: "/tours?theme=vietnam-tours",
    // Cùng kiểu dropdown 4 cột với Tours
    cols: "/images/destinations/hoi-an.webp",
    mega: [
      {
        title: "Our packages", zh: "我们的套餐",
        all: { label: "All package tours", zh: "全部套餐", href: "/tours?theme=vietnam-tours" },
        links: [
          { label: "All Vietnam package tours", zh: "全部越南套餐", href: "/tours?theme=vietnam-tours", img: "ha-long-tour" },
          { label: "Tailor-Made Trip", zh: "定制行程", href: "/tailor-made", img: "theme-tailor-made" },
        ],
      },
      {
        title: "By duration", zh: "按天数",
        all: { label: "All durations", zh: "全部天数", href: "/tours" },
        links: [
          { label: "2 – 5 Days Tours", zh: "2–5天线路", href: "/tours?minDays=2&maxDays=5", img: "ha-noi-tour" },
          { label: "1 Week Vietnam", zh: "越南1周", href: "/tours?minDays=6&maxDays=10", img: "ninh-binh-tour" },
          { label: "2 Weeks Vietnam", zh: "越南2周", href: "/tours?minDays=11&maxDays=17", img: "sapa-tour" },
          { label: "3 Weeks Vietnam", zh: "越南3周", href: "/tours?minDays=18&maxDays=24", img: "hue-tour" },
          { label: "More than 3 Weeks", zh: "3周以上", href: "/tours?minDays=25&maxDays=999", img: "phu-quoc-tour" },
        ],
      },
      {
        title: "By travel style", zh: "按旅行风格",
        all: { label: "All travel styles", zh: "全部旅行风格", href: "/themes/hand-picked" },
        links: [
          { label: "Luxury", zh: "奢华", href: "/themes/luxury", img: "theme-luxury" },
          { label: "Honeymoon", zh: "蜜月", href: "/themes/honeymoon", img: "theme-honeymoon" },
          { label: "Hand-picked", zh: "精选", href: "/themes/hand-picked", img: "theme-hand-picked" },
          { label: "Classic", zh: "经典", href: "/themes/classic", img: "theme-classic" },
          { label: "Culture", zh: "文化", href: "/themes/culture", img: "theme-culture" },
          { label: "Photography", zh: "摄影", href: "/themes/photography", img: "theme-photography" },
          { label: "Family", zh: "家庭", href: "/themes/family", img: "theme-family" },
          { label: "Tailor-made", zh: "私人定制", href: "/themes/tailor-made", img: "theme-tailor-made" },
        ],
      },
      {
        title: "Popular trips", zh: "热门行程",
        all: { label: "All Vietnam tours", zh: "全部越南线路", href: "/tours" },
        links: [
          { label: "North Vietnam trips", zh: "北部行程", href: "/tours?region=north", img: "ha-long-tour" },
          { label: "Central Vietnam trips", zh: "中部行程", href: "/tours?region=central", img: "hoi-an" },
          { label: "South Vietnam trips", zh: "南部行程", href: "/tours?region=south", img: "mekong" },
        ],
      },
    ],
  },
  {
    key: "nav.car",
    href: "/car-rental",
    tiles: ["/car-rental/ha-noi", "/car-rental/ho-chi-minh", "/car-rental/da-nang", "/car-rental/nha-trang", "/car-rental/mui-ne", "/car-rental/phu-quoc", "/car-rental/da-lat", "/car-rental"],
    mega: [
      {
        title: "Private Car Rental", zh: "包车服务",
        links: [
          { label: "Ha Noi", zh: "河内", href: "/car-rental/ha-noi" },
          { label: "Ho Chi Minh City", zh: "胡志明市", href: "/car-rental/ho-chi-minh" },
          { label: "Da Nang", zh: "岘港", href: "/car-rental/da-nang" },
          { label: "Nha Trang", zh: "芽庄", href: "/car-rental/nha-trang" },
          { label: "Mui Ne", zh: "美奈", href: "/car-rental/mui-ne" },
          { label: "Phu Quoc", zh: "富国岛", href: "/car-rental/phu-quoc" },
          { label: "Da Lat", zh: "大叻", href: "/car-rental/da-lat" },
        ],
      },
    ],
  },
  { key: "nav.visa", href: "/visa" },
  {
    key: "nav.news",
    href: "/news",
    // Cẩm nang nhiều cấp kiểu localvietnam.com: mỗi cột là một nhóm chủ đề
    mega: GUIDE_GROUPS.map((g) => ({ title: g.title, zh: g.zh, links: g.topics.map((t) => ({ label: t.en, zh: t.zh, href: topicHref(t) })) })),
  },
  {
    key: "nav.about",
    href: "/about",
    mega: [
      {
        title: "About us", zh: "关于我们",
        links: [
          { label: "About Vietlook Travel", zh: "关于 Vietlook Travel", href: "/about" },
          { label: "Payment policy", zh: "付款政策", href: "/payment-policy" },
          { label: "Cancellation and changes", zh: "取消与变更", href: "/cancellation-policy" },
          { label: "Privacy policy", zh: "隐私政策", href: "/privacy-policy" },
        ],
      },
    ],
  },
];

// Theo menu mẫu: Tours · Destinations · Tour Themes · Private Car · Visa and Fast-track
MENU.splice(1, 0,
  { key: "nav.destinations", href: "/tours", mega: REGION_MEGA },
  {
    key: "nav.themes",
    href: "/themes/hand-picked",
    tiles: TOUR_THEMES.map((t) => `/themes/${t.slug}`),
    mega: [{ title: "Tour Themes", zh: "旅行主题", links: TOUR_THEMES.map((t) => ({ label: t.name, zh: t.zh, href: `/themes/${t.slug}` })) }],
  },
);

// Ô ảnh trong dropdown: ảnh nền tối, tên nằm giữa
function Tile({ href, label, src }: { href: string; label: string; src?: string | null }) {
  return (
    <Link href={href} className="group/tile relative block aspect-[16/9] overflow-hidden rounded-xl bg-brand-dark">
      <Img src={src ?? null} alt={label} width={400} className="absolute inset-0 h-full w-full transition duration-500 group-hover/tile:scale-110" />
      <span className="absolute inset-0 bg-black/35 transition group-hover/tile:bg-black/15" />
      <span className="absolute inset-0 grid place-items-center px-4 text-center text-sm font-bold uppercase leading-tight tracking-wide text-white [overflow-wrap:anywhere] [text-wrap:balance] xl:text-base [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">{label}</span>
    </Link>
  );
}

export default function Header({ images = {} }: { images?: MenuImages }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const zh = lang === "zh";
  const pathname = stripLang(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trang chủ: header trong suốt đè lên video hero (kiểu auroratravel.asia), cuộn xuống thì nền trắng
  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header className={`top-0 z-40 w-full transition-colors duration-300 ${pathname === "/" ? "fixed" : "sticky"} ${overlay ? "bg-transparent text-white" : "bg-white/95 text-ink shadow-sm backdrop-blur"}`}>
      <div className={`text-xs text-white/90 transition-colors ${overlay ? "bg-black/25" : "bg-brand-dark"}`}>
        <div className="container-x flex items-center justify-end gap-4 py-2">
          <div className="flex items-center gap-4">
            <a href={`tel:+${SITE.phoneRaw}`}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="hidden md:inline">{SITE.email}</a>
            <div className="flex overflow-hidden rounded-full border border-white/30">
              {(["en", "zh"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-0.5 ${lang === l ? "bg-accent font-semibold text-ink" : ""}`}>
                  {l === "en" ? "EN" : "中文"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`container-x relative flex h-[76px] items-center justify-between gap-4 ${overlay ? "border-b border-white/30" : ""}`}>
        {/* Logo huy hiệu tròn, to và nhô xuống dưới thanh header cho nổi bật */}
        {/* Đang ở trang chủ: bấm logo cuộn mượt về đầu trang thay vì tải lại */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname !== "/") return;
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative z-10 shrink-0 self-start pt-2 transition hover:scale-105"
        >
          <LogoBadge alt={SITE.shortName} className="h-[84px] w-[84px] md:h-[104px] md:w-[104px]" />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center whitespace-nowrap text-[15px] font-semibold">
            {MENU.map((item) => (
              <li key={item.key} className={`group ${item.mega && !item.panels && !item.tiles && item.mega.length === 1 ? "relative" : ""}`}>
                <Link href={item.href} className={`nav-line block rounded-md px-2 py-7 xl:px-3 ${overlay ? "hover:text-accent" : "hover:text-brand"}`}>
                  {t(item.key)} {item.mega && <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-[10px]" />}
                </Link>
                {item.panels && item.mega && (() => {
                  const p = item.panels[panel] ?? item.panels[0];
                  return (
                    <div className="invisible absolute right-0 top-full z-50 overflow-hidden rounded-2xl flex w-[min(1100px,calc(100vw-2rem))] bg-white normal-case tracking-normal text-ink -translate-y-2 opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="w-72 shrink-0 border-r border-black/10 p-3">
                        {item.panels.map((x, i) => (
                          <button key={x.title} type="button" onMouseEnter={() => setPanel(i)} onFocus={() => setPanel(i)} onClick={() => setPanel(i)} className={`flex w-full items-center justify-between gap-3 whitespace-normal rounded-xl px-4 py-3.5 text-left text-sm font-bold uppercase tracking-wide transition ${i === panel ? "bg-brand-light text-brand" : "text-ink/70 hover:bg-sand hover:text-brand"}`}>
                            {zh ? x.zh : x.title}
                            <FontAwesomeIcon icon={faChevronRight} className={`text-[10px] transition ${i === panel ? "opacity-100" : "opacity-0"}`} />
                          </button>
                        ))}
                        <Link href={p.all?.href ?? item.href} className="block px-4 py-3.5 text-sm font-semibold text-accent hover:underline">{p.all ? (zh ? p.all.zh : p.all.label) : (zh ? "查看全部" : "View all")} →</Link>
                      </div>
                      <div className="grid flex-1 grid-cols-3 content-start gap-3 p-4">
                        {item.mega[p.col].links.map((l) => <Tile key={l.href} href={l.href} label={zh && l.zh ? l.zh : l.label} src={images[l.href]} />)}
                      </div>
                    </div>
                  );
                })()}
                {item.tiles && item.mega && (() => {
                  const links = item.mega.flatMap((c) => c.links);
                  const all: MenuLink = { label: zh ? "查看全部" : "View all", href: item.href };
                  const extra = item.extra != null ? item.mega[item.extra] : null;
                  return (
                    <div className="invisible absolute right-0 top-full z-50 overflow-hidden rounded-2xl w-[min(900px,calc(100vw-2rem))] bg-white p-4 normal-case tracking-normal text-ink -translate-y-2 opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="grid grid-cols-4 gap-3">
                        {item.tiles.map((href) => {
                          const l = links.find((x) => x.href === href) ?? (href === item.href ? all : null);
                          if (!l) return null;
                          return (
                            <Link key={href} href={href} className="group/tile relative block aspect-[16/9] overflow-hidden rounded-xl">
                              <Img src={images[href]} alt={l.label} width={400} className="absolute inset-0 h-full w-full transition duration-500 group-hover/tile:scale-110" />
                              <span className="absolute inset-0 bg-black/35 transition group-hover/tile:bg-black/15" />
                              <span className="absolute inset-0 grid place-items-center px-4 text-center text-sm font-bold uppercase leading-tight tracking-wide text-white [overflow-wrap:anywhere] [text-wrap:balance] xl:text-base [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">{zh && l.zh ? l.zh : l.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                      {extra && (
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-3 py-3 text-sm">
                          <span className="font-bold uppercase tracking-wider text-accent">{zh && extra.zh ? extra.zh : extra.title}</span>
                          {extra.links.map((l) => <Link key={l.label} href={l.href} className="text-ink/75 hover:text-brand">{zh && l.zh ? l.zh : l.label}</Link>)}
                          <Link href={item.href} className="ml-auto font-semibold text-brand hover:underline">{all.label} →</Link>
                        </div>
                      )}
                    </div>
                  );
                })()}
                {/* Dropdown nhiều cột (menu cẩm nang): mỗi cột một nhóm, cuối có link xem tất cả */}
                {/* Dropdown 4 cột (Tours, Packages): 3 cột link + cột cuối có ảnh và nhóm nổi bật */}
                {item.cols && item.mega && (
                  <div className="invisible absolute right-0 top-full z-50 grid w-[min(1100px,calc(100vw-2rem))] -translate-y-2 grid-cols-4 gap-8 overflow-hidden rounded-2xl bg-white p-8 normal-case tracking-normal text-ink opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.mega.map((col, ci) => (
                      <div key={col.title} className="min-w-0">
                        {ci === item.mega!.length - 1 && (
                          <Link href={col.links[0]?.href ?? item.href} className="group/pic mb-5 block overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.cols} alt="" loading="lazy" decoding="async" className="aspect-[16/7] w-full object-cover transition duration-700 group-hover/pic:scale-110" />
                          </Link>
                        )}
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">{zh && col.zh ? col.zh : col.title}</p>
                        <ul className="space-y-2.5 text-[15px] font-medium">
                          {col.links.map((l) => (
                            <li key={l.href + l.label}>
                              <Link href={l.href} className="group/lk flex items-center gap-3 whitespace-normal text-ink/85 transition hover:text-brand">
                                {l.img && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={`/images/destinations/thumb/${l.img}.webp`} alt="" width={64} height={40} loading="lazy" className="h-10 w-16 shrink-0 rounded-lg object-cover transition duration-300 group-hover/lk:scale-105 group-hover/lk:shadow-md" />
                                )}
                                <span className="transition group-hover/lk:translate-x-1">{zh && l.zh ? l.zh : l.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {col.all && <Link href={col.all.href} className="mt-4 inline-block whitespace-normal text-[15px] font-bold text-ink transition hover:text-brand">{zh && col.all.zh ? col.all.zh : col.all.label} →</Link>}
                      </div>
                    ))}
                  </div>
                )}
                {item.key === "nav.destinations" && (
                  <div className="invisible absolute right-0 top-full z-50 overflow-hidden rounded-2xl w-[min(1100px,calc(100vw-2rem))] -translate-y-2 rounded-b-2xl bg-sand normal-case tracking-normal text-ink opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <DestinationsMega zh={zh} />
                  </div>
                )}
                {item.mega && !item.panels && !item.tiles && item.mega.length > 1 && item.key !== "nav.destinations" && !item.cols && (
                  <div className="invisible absolute right-0 top-full z-50 overflow-hidden rounded-2xl w-[min(900px,calc(100vw-2rem))] -translate-y-2 bg-white p-6 normal-case tracking-normal text-ink opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="grid grid-cols-4 gap-6">
                      {item.mega.map((col) => (
                        <div key={col.title}>
                          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">{zh && col.zh ? col.zh : col.title}</p>
                          <ul className="space-y-2 text-sm font-medium">
                            {col.links.map((l) => <li key={l.href}><Link href={l.href} className="text-ink/80 hover:text-brand">{zh && l.zh ? l.zh : l.label}</Link></li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link href={item.href} className="mt-5 block border-t border-black/10 pt-4 text-sm font-semibold text-brand hover:underline">{item.key === "nav.news" ? (zh ? "全部旅行指南" : "All travel guides") : (zh ? "查看全部线路" : "View all tours")} →</Link>
                  </div>
                )}
                {/* Dropdown dạng danh sách (mục có menu con nhưng không có lưới ảnh) */}
                {item.mega && !item.panels && !item.tiles && item.mega.length === 1 && (
                  <ul className="invisible absolute right-0 top-full z-50 overflow-hidden rounded-2xl min-w-56 bg-white py-2 text-sm normal-case tracking-normal text-ink -translate-y-2 opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.mega.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}><Link href={l.href} className="block px-5 py-2.5 font-semibold hover:bg-brand-light hover:text-brand">{zh && l.zh ? l.zh : l.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Nút báo giá hiện cả trên điện thoại (thu nhỏ) để lấp khoảng trống giữa logo và nút menu */}
          <Link href="/tailor-made" className="btn btn-accent whitespace-nowrap !px-4 !py-2 text-xs sm:!px-6 sm:!py-2.5 sm:text-sm lg:hidden">{t("nav.tailor")}</Link>
          <button className="rounded-md p-2 text-2xl lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><FontAwesomeIcon icon={open ? faXmark : faBars} className="w-6" /></button>
        </div>
      </div>

      {/* Menu điện thoại phủ hết phần màn hình còn lại dưới header */}
      {open && (
        <nav className="h-[calc(100vh-110px)] supports-[height:100dvh]:h-[calc(100dvh-110px)] overflow-y-auto border-t bg-white lg:hidden">
          <ul className="container-x flex min-h-full flex-col py-3">
            {MENU.map((item) => (
              <li key={item.key} className="border-b border-black/5">
                {item.mega ? (
                  // Mục có menu con: bấm để mở/đóng danh sách con
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium">
                      {t(item.key)}
                      <FontAwesomeIcon icon={faChevronDown} className="text-xs text-muted transition group-open:rotate-180" />
                    </summary>
                    <div className="space-y-4 pb-4 pl-3">
                      <Link href={item.href} onClick={() => setOpen(false)} className="block text-sm font-semibold text-brand">
                        {zh ? "查看全部" : "View all"} →
                      </Link>
                      {item.mega.map((col) => (
                        <div key={col.title}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">{zh && col.zh ? col.zh : col.title}</p>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link href={l.href} onClick={() => setOpen(false)} className="text-ink/80">{zh && l.zh ? l.zh : l.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-3 font-medium">{t(item.key)}</Link>
                )}
              </li>
            ))}
            <li className="mt-auto py-5">
              <Link href="/tailor-made" onClick={() => setOpen(false)} className="btn btn-accent w-full">{t("nav.tailor")}</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
