"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang, type DictKey } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Img from "./Img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type MenuLink = { label: string; zh?: string; href: string };
type MenuItem = { key: DictKey; href: string; mega?: { title: string; zh?: string; links: MenuLink[] }[]; tiles?: string[]; extra?: number; panels?: { title: string; zh: string; col: number; all?: MenuLink }[] };

// Ảnh cho ô dropdown, lấy theo href (truyền từ layout: ảnh điểm đến và thành phố xe)
export type MenuImages = Record<string, string | null>;

// Menu theo vietlooktravel.com, trình bày mega menu kiểu localvietnam.com
const MENU: MenuItem[] = [
  { key: "nav.home", href: "/" },
  {
    key: "nav.tours",
    href: "/tours",
    // Dropdown desktop 2 cột: trái là các nhóm (theo miền / tour đặc biệt), rê chuột để đổi lưới ảnh bên phải
    panels: [
      { title: "Tours in North Vietnam", zh: "越南北部线路", col: 0, all: { label: "All North Vietnam tours", zh: "全部北部线路", href: "/tours?region=north" } },
      { title: "Tours in Central Vietnam", zh: "越南中部线路", col: 1, all: { label: "All Central Vietnam tours", zh: "全部中部线路", href: "/tours?region=central" } },
      { title: "Tours in South Vietnam", zh: "越南南部线路", col: 2, all: { label: "All South Vietnam tours", zh: "全部南部线路", href: "/tours?region=south" } },
      { title: "Special tours", zh: "特色旅游", col: 3, all: { label: "All Vietnam tours", zh: "全部越南线路", href: "/tours" } },
    ],
    mega: [
      {
        title: "North Vietnam", zh: "越南北部",
        links: [
          { label: "Ha Noi", zh: "河内", href: "/tours?destination=ha-noi-tour" },
          { label: "Sapa", zh: "沙坝", href: "/tours?destination=sapa-tour" },
          { label: "Ha Giang", zh: "河江", href: "/tours?destination=ha-giang-tour" },
          { label: "Ha Long Bay", zh: "下龙湾", href: "/tours?destination=ha-long-tour" },
          { label: "Ninh Binh", zh: "宁平", href: "/tours?destination=ninh-binh-tour" },
          { label: "Cao Bang", zh: "高平", href: "/tours?destination=cao-bang-tour" },
        ],
      },
      {
        title: "Central Vietnam", zh: "越南中部",
        links: [
          { label: "Hoi An", zh: "会安", href: "/tours?destination=hoi-an" },
          { label: "Hue", zh: "顺化", href: "/tours?destination=hue-tour" },
          { label: "Da Nang", zh: "岘港", href: "/tours?destination=da-nang-tour" },
          { label: "Phong Nha", zh: "风牙", href: "/tours?destination=quang-binh-tour" },
          { label: "Nha Trang", zh: "芽庄", href: "/tours?destination=nha-trang-tour" },
        ],
      },
      {
        title: "South Vietnam", zh: "越南南部",
        links: [
          { label: "Ho Chi Minh City", zh: "胡志明市", href: "/tours?destination=ho-chi-minh-tour" },
          { label: "Mekong Delta", zh: "湄公河三角洲", href: "/tours?q=mekong" },
          { label: "Phu Quoc", zh: "富国岛", href: "/tours?destination=phu-quoc-tour" },
          { label: "Mui Ne", zh: "美奈", href: "/tours?destination=mui-ne-tour" },
        ],
      },
      {
        title: "Special tours", zh: "特色旅游",
        links: [
          { label: "Ha Giang Loop tours", zh: "河江环线", href: "/tours?q=loop" },
          { label: "Best Halong Bay cruises", zh: "下龙湾游轮", href: "/tours?theme=cruise-tour" },
          { label: "Sapa Trekking tours", zh: "沙坝徒步", href: "/tours?q=trek" },
          { label: "Vietnam Food tours", zh: "美食之旅", href: "/tours?q=food" },
          { label: "Adventure tours", zh: "探险之旅", href: "/tours?q=adventure" },
          { label: "Cultural Experience", zh: "文化体验", href: "/tours?theme=travel-experience" },
        ],
      },
    ],
  },
  {
    key: "nav.packages",
    href: "/tours?theme=vietnam-tours",
    // Cùng layout với Tours: trái chọn nhóm, phải là lưới ảnh
    panels: [
      { title: "Our package tours", zh: "我们的套餐", col: 0 },
      { title: "Duration", zh: "行程天数", col: 1 },
      { title: "Travel Styles", zh: "旅行风格", col: 2 },
      { title: "Popular trips", zh: "热门行程", col: 3 },
    ],
    mega: [
      {
        title: "Our package tours", zh: "我们的套餐",
        links: [
          { label: "All Vietnam package tours", zh: "全部越南套餐", href: "/tours?theme=vietnam-tours" },
          { label: "Tailor-Made Trip", zh: "定制行程", href: "/tailor-made" },
        ],
      },
      {
        title: "Duration", zh: "行程天数",
        links: [
          { label: "2 – 5 Days Tours", zh: "2–5天线路", href: "/tours?minDays=2&maxDays=5" },
          { label: "1 Week Vietnam", zh: "越南1周", href: "/tours?minDays=6&maxDays=10" },
          { label: "2 Weeks Vietnam", zh: "越南2周", href: "/tours?minDays=11&maxDays=17" },
          { label: "3 Weeks Vietnam", zh: "越南3周", href: "/tours?minDays=18&maxDays=24" },
          { label: "More than 3 Weeks", zh: "3周以上", href: "/tours?minDays=25&maxDays=999" },
        ],
      },
      {
        title: "Travel Styles", zh: "旅行风格",
        links: [
          { label: "Couple trips", zh: "情侣游", href: "/tailor-made#couple" },
          { label: "Family Trips", zh: "家庭游", href: "/tailor-made#family" },
          { label: "Relaxed / Slow Travel", zh: "慢旅行", href: "/tailor-made#senior" },
          { label: "Honeymoon trips", zh: "蜜月游", href: "/tours?q=honeymoon" },
          { label: "Luxury packages", zh: "豪华套餐", href: "/tours?q=luxury" },
        ],
      },
      {
        title: "Popular trips", zh: "热门行程",
        links: [
          { label: "North Vietnam trips", zh: "北部行程", href: "/tours?region=north" },
          { label: "Central Vietnam trips", zh: "中部行程", href: "/tours?region=central" },
          { label: "South Vietnam trips", zh: "南部行程", href: "/tours?region=south" },
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
  { key: "nav.news", href: "/news" },
  { key: "nav.about", href: "/about" },
];

// Ô ảnh trong dropdown: ảnh nền tối, tên nằm giữa
function Tile({ href, label, src }: { href: string; label: string; src?: string | null }) {
  return (
    <Link href={href} className="group/tile relative block aspect-[16/9] overflow-hidden bg-brand-dark">
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
  const pathname = usePathname();
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
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-0.5 ${lang === l ? "bg-accent text-white" : ""}`}>
                  {l === "en" ? "EN" : "中文"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`container-x relative flex h-[76px] items-center justify-between gap-4 ${overlay ? "border-b border-white/30" : ""}`}>
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${SITE.logo}&w=260`} alt={SITE.shortName} className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center whitespace-nowrap text-sm font-bold uppercase tracking-wide">
            {MENU.map((item) => (
              <li key={item.key} className="group">
                <Link href={item.href} className={`block rounded-md px-2 py-7 xl:px-3 ${overlay ? "hover:text-accent" : "hover:text-brand"}`}>
                  {t(item.key)} {item.mega && <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-[10px]" />}
                </Link>
                {item.panels && item.mega && (() => {
                  const p = item.panels[panel] ?? item.panels[0];
                  return (
                    <div className="invisible absolute right-0 top-full z-50 flex w-[min(1100px,calc(100vw-2rem))] bg-white normal-case tracking-normal text-ink opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                      <div className="w-72 shrink-0 border-r border-black/10 py-4">
                        {item.panels.map((x, i) => (
                          <button key={x.title} type="button" onMouseEnter={() => setPanel(i)} onFocus={() => setPanel(i)} onClick={() => setPanel(i)} className={`flex w-full items-center justify-between gap-3 whitespace-normal border-b border-black/5 px-5 py-3.5 text-left text-sm font-bold uppercase tracking-wide transition ${i === panel ? "text-brand" : "text-ink/70 hover:text-brand"}`}>
                            {zh ? x.zh : x.title}
                            <FontAwesomeIcon icon={faChevronRight} className={`text-[10px] transition ${i === panel ? "opacity-100" : "opacity-0"}`} />
                          </button>
                        ))}
                        <Link href={p.all?.href ?? item.href} className="block px-5 py-3.5 text-sm font-semibold text-accent hover:underline">{p.all ? (zh ? p.all.zh : p.all.label) : (zh ? "查看全部" : "View all")} →</Link>
                      </div>
                      <div className="grid flex-1 grid-cols-3 content-start gap-1.5 p-1.5">
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
                    <div className="invisible absolute right-0 top-full z-50 w-[min(900px,calc(100vw-2rem))] bg-white p-1.5 normal-case tracking-normal text-ink opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                      <div className="grid grid-cols-4 gap-1.5">
                        {item.tiles.map((href) => {
                          const l = links.find((x) => x.href === href) ?? (href === item.href ? all : null);
                          if (!l) return null;
                          return (
                            <Link key={href} href={href} className="group/tile relative block aspect-[16/9] overflow-hidden">
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
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/tailor-made" className="btn btn-accent hidden whitespace-nowrap !py-2.5 md:max-lg:inline-flex">{t("nav.tailor")}</Link>
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
