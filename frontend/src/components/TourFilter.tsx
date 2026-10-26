"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faChevronLeft, faChevronRight, faHeart as faHeartSolid, faLocationDot, faMagnifyingGlass, faRotateLeft, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Img from "./Img";
import { useLang } from "@/lib/i18n";
import { REGIONS } from "@/lib/site";
import { formatUsd, USD_TO_VND, type Destination, type Theme, type Tour } from "@/lib/api";

const PAGE = 12;

const DUR = [
  { key: "1", en: "1 day", zh: "1天", min: 0, max: 1 },
  { key: "2-5", en: "2 – 5 days", zh: "2–5天", min: 2, max: 5 },
  { key: "1w", en: "1 week", zh: "1周", min: 6, max: 10 },
  { key: "2w", en: "2 weeks", zh: "2周", min: 11, max: 17 },
  { key: "3w", en: "3 weeks", zh: "3周", min: 18, max: 24 },
  { key: "25", en: "More than 3 weeks", zh: "3周以上", min: 25, max: 999 },
];

const SORTS = [
  { v: "", en: "Recommended", zh: "推荐" },
  { v: "price-asc", en: "Price: low to high", zh: "价格从低到高" },
  { v: "price-desc", en: "Price: high to low", zh: "价格从高到低" },
  { v: "days-desc", en: "Longest first", zh: "天数从多到少" },
];

type Filters = { region: string; destination: string; theme: string; minDays: string; maxDays: string; q: string };

// Bật/tắt một giá trị trong danh sách chọn nhiều
const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Check({ checked, onChange, label, n }: { checked: boolean; onChange: () => void; label: string; n: number }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 shrink-0 accent-[var(--color-brand)]" />
      <span className={`flex-1 ${checked ? "font-medium text-brand" : ""}`}>{label}</span>
      <span className="text-xs text-muted">{n}</span>
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/10 py-6 last:border-0">
      <p className="mb-3 font-card text-base font-semibold">{title}</p>
      {children}
    </div>
  );
}

// Thẻ tour dạng lưới: ảnh vuông có nhãn, nút lưu và băng chuyền ảnh khi rê chuột
function GridCard({ t, zh, fav, onFav, theme, place }: { t: Tour; zh: boolean; fav: boolean; onFav: () => void; theme: string; place: string }) {
  const imgs = [...new Set([t.image, ...(t.gallery ?? [])].filter(Boolean))] as string[];
  const [i, setI] = useState(0);
  const go = (d: number) => (e: React.MouseEvent) => { e.preventDefault(); setI((i + d + imgs.length) % imgs.length); };
  const badge =
    t.days >= 10 ? { text: zh ? "长线精选" : "GRAND TOUR", cls: "bg-brand-dark text-white" }
    : t.days === 1 ? { text: zh ? "一日游" : "DAY TRIP", cls: "bg-accent text-ink" }
    : !t.priceEstimated ? { text: zh ? "固定价格" : "FIXED PRICE", cls: "bg-[#3554d1] text-white" }
    : null;
  return (
    <Link href={`/tours/${t.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        <Img src={imgs[i] ?? t.image} alt={t.title} width={440} className="aspect-square transition duration-500 group-hover:scale-105" />
        {badge && <span className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badge.cls}`}>{badge.text}</span>}
        <button type="button" aria-label="Save" onClick={(e) => { e.preventDefault(); onFav(); }}
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-sm shadow transition ${fav ? "text-red-500" : "text-ink hover:text-red-500"}`}>
          <FontAwesomeIcon icon={fav ? faHeartSolid : faHeart} />
        </button>
        {imgs.length > 1 && (
          <>
            {[[-1, faChevronLeft, "left-3"], [1, faChevronRight, "right-3"]].map(([d, icon, pos]) => (
              <button key={String(d)} type="button" aria-label={d === 1 ? "Next photo" : "Previous photo"} onClick={go(d as number)}
                className={`absolute ${pos} top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-xs text-ink opacity-0 shadow transition group-hover:opacity-100`}>
                <FontAwesomeIcon icon={icon as typeof faChevronLeft} />
              </button>
            ))}
            <div className="absolute inset-x-0 bottom-3 hidden justify-center gap-1.5 md:flex">
              {imgs.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-white transition-all ${k === i ? "w-4" : "w-1.5 opacity-60"}`} />)}
            </div>
          </>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">
        {zh ? `${t.days}天` : `${t.days} ${t.days > 1 ? "days" : "day"}`}
        {theme && <><span className="mx-1.5">•</span>{theme}</>}
      </p>
      <h3 className="mt-1 line-clamp-2 font-card text-lg font-semibold leading-snug group-hover:underline">{zh && t.titleZh ? t.titleZh : t.title}</h3>
      {place && <p className="mt-1 text-sm text-muted">{place}</p>}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted">{zh ? "私人团 · 全天候支持" : "Private tour · 24/7 support"}</span>
        {t.priceFrom ? <span className="text-muted">{zh ? "起" : "From"} <b className="text-lg font-bold text-ink">US{formatUsd(t.priceFrom)}</b></span> : null}
      </div>
    </Link>
  );
}

export default function TourFilter({ tours, destinations, themes, initial, initialPage = 1 }: { tours: Tour[]; destinations: Destination[]; themes: Theme[]; initial: Partial<Filters>; initialPage?: number }) {
  const { lang } = useLang();
  const zh = lang === "zh";

  const maxUsd = useMemo(() => Math.ceil(Math.max(0, ...tours.map((t) => t.priceFrom ?? 0)) / USD_TO_VND / 50) * 50 || 500, [tours]);
  const initDur = DUR.find((d) => String(d.min || "") === (initial.minDays ?? "") && String(d.max) === (initial.maxDays ?? ""))?.key;

  const [q, setQ] = useState(initial.q ?? "");
  const [destination, setDestination] = useState(initial.destination ?? "");
  const [regions, setRegions] = useState<string[]>(initial.region ? [initial.region] : []);
  const [themeSel, setThemeSel] = useState<string[]>(initial.theme ? [initial.theme] : []);
  const [durs, setDurs] = useState<string[]>(initDur ? [initDur] : []);
  const [price, setPrice] = useState(maxUsd);
  const [minPrice, setMinPrice] = useState(0);
  const [sort, setSort] = useState("");
  // Khi Back từ trang chi tiết, Next dựng lại trang từ cache với initialPage cũ (=1) -> đọc lại ?page trên URL.
  // Lần tải đầu, initialPage từ server đã khớp ?page nên không lệch khi hydrate.
  const [page, setPageState] = useState(() => {
    if (typeof window === "undefined") return initialPage;
    const n = parseInt(new URLSearchParams(window.location.search).get("page") ?? "");
    return n > 1 ? n : initialPage;
  });
  const top = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Lưu trang hiện tại vào URL (?page=N) để bấm Back từ trang chi tiết quay lại đúng trang
  const setPage = (n: number, scroll = false) => {
    setPageState(n);
    const url = new URL(window.location.href);
    if (n > 1) url.searchParams.set("page", String(n)); else url.searchParams.delete("page");
    window.history.replaceState(window.history.state, "", url);
    if (scroll) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const reset = () => { setQ(""); setDestination(""); setRegions([]); setThemeSel([]); setDurs([]); setPrice(maxUsd); setMinPrice(0); setPage(1); };
  const on = <V,>(fn: (v: V) => void) => (v: V) => { fn(v); setPage(1); };

  const result = useMemo(() => {
    const list = tours.filter((t) => {
      const usd = (t.priceFrom ?? 0) / USD_TO_VND;
      return (
        (!regions.length || (t.region && regions.includes(t.region))) &&
        (!destination || t.destinations.includes(destination)) &&
        (!themeSel.length || (t.theme && themeSel.includes(t.theme))) &&
        (!durs.length || durs.some((k) => { const d = DUR.find((x) => x.key === k)!; return t.days >= d.min && t.days <= d.max; })) &&
        (price >= maxUsd || usd <= price) &&
        (!minPrice || usd >= minPrice) &&
        (!q || `${t.title} ${t.titleZh ?? ""} ${t.summary}`.toLowerCase().includes(q.toLowerCase()))
      );
    });
    if (sort === "price-asc") list.sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
    if (sort === "price-desc") list.sort((a, b) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0));
    if (sort === "days-desc") list.sort((a, b) => b.days - a.days);
    return list;
  }, [tours, regions, destination, themeSel, durs, price, minPrice, maxUsd, q, sort]);

  const pages = Math.max(1, Math.ceil(result.length / PAGE));
  const cur = Math.min(page, pages);
  // Danh sách số trang rút gọn: 1 … 4 5 6 … 10
  const nums = [...new Set([1, cur - 1, cur, cur + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);

  // Đếm số tour cho từng lựa chọn (trên toàn bộ danh sách)
  const count = (fn: (t: Tour) => boolean) => tours.filter(fn).length;
  const themeName = (slug: string | null) => { const t = themes.find((x) => x.slug === slug); return t ? (zh ? t.zh : t.name) : ""; };
  const destName = (slug?: string) => { const d = destinations.find((x) => x.slug === slug); return d ? (zh ? d.zh : d.name) : ""; };

  const sidebar = (
    <>
      {/* Khối tìm kiếm */}
      <div className="rounded-2xl bg-sand p-5">
        <p className="mb-4 font-card font-semibold">{zh ? "搜索线路" : "Search tours"}</p>
        <label className="mb-3 flex items-center gap-3 rounded-xl bg-white px-4 py-2.5">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-muted" />
          <span className="flex-1">
            <span className="block text-xs font-semibold">{zh ? "搜索" : "Search"}</span>
            <input value={q} onChange={(e) => on(setQ)(e.target.value)} placeholder={zh ? "线路、地点…" : "Tour, place…"} className="w-full bg-transparent text-sm text-muted outline-none" />
          </span>
        </label>
        <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5">
          <FontAwesomeIcon icon={faLocationDot} className="text-muted" />
          <span className="flex-1">
            <span className="block text-xs font-semibold">{zh ? "目的地" : "Destination"}</span>
            <select value={destination} onChange={(e) => on(setDestination)(e.target.value)} className="-ml-1 w-full bg-transparent text-sm text-muted outline-none">
              <option value="">{zh ? "全部目的地" : "All destinations"}</option>
              {destinations.map((d) => <option key={d.slug} value={d.slug}>{zh ? d.zh : d.name}</option>)}
            </select>
          </span>
        </label>
        <button onClick={reset} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
          <FontAwesomeIcon icon={faRotateLeft} /> {zh ? "重置筛选" : "Reset filters"}
        </button>
      </div>

      <Group title={zh ? "地区" : "Region"}>
        {REGIONS.map((r) => (
          <Check key={r.key} checked={regions.includes(r.key)} onChange={() => on(setRegions)(toggle(regions, r.key))} label={zh ? r.zh : r.en} n={count((t) => t.region === r.key)} />
        ))}
      </Group>

      <Group title={zh ? "主题" : "Category types"}>
        {themes.map((t) => (
          <Check key={t.slug} checked={themeSel.includes(t.slug)} onChange={() => on(setThemeSel)(toggle(themeSel, t.slug))} label={zh ? t.zh : t.name} n={count((x) => x.theme === t.slug)} />
        ))}
      </Group>

      <Group title={zh ? "价格" : "Price"}>
        <p className="mb-4 text-sm text-muted">${minPrice} – ${price}{price >= maxUsd ? "+" : ""}</p>
        {/* Thanh giá 2 đầu: kéo chọn giá thấp nhất và cao nhất */}
        <div className="dual-range relative h-5">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/10" />
          <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand" style={{ left: `${(minPrice / maxUsd) * 100}%`, right: `${100 - (price / maxUsd) * 100}%` }} />
          <input type="range" min={0} max={maxUsd} step={10} value={minPrice} onChange={(e) => on(setMinPrice)(Math.min(+e.target.value, price - 10))} aria-label="Min price" />
          <input type="range" min={0} max={maxUsd} step={10} value={price} onChange={(e) => on(setPrice)(Math.max(+e.target.value, minPrice + 10))} aria-label="Max price" />
        </div>
      </Group>

      <Group title={zh ? "天数" : "Duration"}>
        {DUR.map((d) => (
          <Check key={d.key} checked={durs.includes(d.key)} onChange={() => on(setDurs)(toggle(durs, d.key))} label={zh ? d.zh : d.en} n={count((t) => t.days >= d.min && t.days <= d.max)} />
        ))}
      </Group>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-10">
      {/* Sidebar cuộn riêng, dính khi cuộn danh sách tour */}
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] lg:block">{sidebar}</aside>

      {/* Bộ lọc dạng ngăn kéo trên mobile */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-white p-5">
            <button onClick={() => setOpen(false)} className="mb-4 ml-auto block text-xl text-muted" aria-label="Close"><FontAwesomeIcon icon={faXmark} /></button>
            {sidebar}
          </div>
        </div>
      )}

      <div ref={top} className="scroll-mt-32">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
          <p className="whitespace-nowrap text-sm">
            <b className="font-card text-base">{result.length} {zh ? "条线路" : "tours"}</b> <span className="text-muted">{zh ? "在越南" : "in Vietnam"}</span>
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-medium text-brand lg:hidden">
              <FontAwesomeIcon icon={faSliders} /> {zh ? "筛选" : "Filter"}
            </button>
            <label className="flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-medium text-brand">
              <FontAwesomeIcon icon={faArrowDownWideShort} />
              <select value={sort} onChange={(e) => on(setSort)(e.target.value)} className="bg-transparent outline-none" aria-label="Sort">
                {SORTS.map((s) => <option key={s.v} value={s.v}>{zh ? s.zh : s.en}</option>)}
              </select>
            </label>
          </div>
        </div>

        {result.length ? (
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {result.slice((cur - 1) * PAGE, cur * PAGE).map((t) => (
              <GridCard key={t.slug} t={t} zh={zh} fav={liked.includes(t.slug)} onFav={() => setLiked(toggle(liked, t.slug))} theme={themeName(t.theme)} place={destName(t.destinations[0])} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-sand p-10 text-center text-muted">{zh ? "没有符合条件的线路，欢迎联系我们定制行程。" : "No tours match your filters — ask us for a tailor-made itinerary."}</p>
        )}
        {pages > 1 && (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <button onClick={() => setPage(cur - 1, true)} disabled={cur === 1} aria-label="Previous page"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-sm text-brand transition hover:bg-sand disabled:pointer-events-none disabled:opacity-40">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {nums.map((n, k) => (
              <span key={n} className="flex items-center gap-2">
                {k > 0 && n - nums[k - 1] > 1 && <span className="px-1 text-muted">…</span>}
                <button onClick={() => setPage(n, true)} aria-current={n === cur ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${n === cur ? "bg-brand text-white" : "border border-black/15 text-brand hover:bg-sand"}`}>
                  {n}
                </button>
              </span>
            ))}
            <button onClick={() => setPage(cur + 1, true)} disabled={cur === pages} aria-label="Next page"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-sm text-brand transition hover:bg-sand disabled:pointer-events-none disabled:opacity-40">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
