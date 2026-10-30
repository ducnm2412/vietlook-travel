"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import Img from "./Img";
import { useLang } from "@/lib/i18n";
import { REGIONS } from "@/lib/site";
import HandNote from "./HandNote";
import BronzeDrum from "./BronzeDrum";
import { cityByDest, destHref } from "@/lib/cities";
import type { Destination } from "@/lib/api";

// Bố cục bento (3 cột, hàng 240px) theo số điểm đến của miền (tối đa 5) để lưới luôn kín;
// phần tử cuối mỗi mảng là vị trí thẻ "N+ điểm đến khác"
const T2 = "md:row-span-2";
const LAYOUT: Record<number, string[]> = {
  5: [`md:col-start-1 md:row-start-1 ${T2}`, "md:col-start-2 md:row-start-1", "md:col-start-2 md:row-start-2", `md:col-start-3 md:row-start-1 ${T2}`, "md:col-start-1 md:row-start-3 md:col-span-2", "md:col-start-3 md:row-start-3"],
  4: [`md:col-start-1 md:row-start-1 ${T2}`, "md:col-start-2 md:row-start-1", "md:col-start-2 md:row-start-2", "md:col-start-3 md:row-start-1", "md:col-start-3 md:row-start-2"],
  3: [`md:col-start-1 md:row-start-1 ${T2}`, "md:col-start-2 md:row-start-1", "md:col-start-2 md:row-start-2", `md:col-start-3 md:row-start-1 ${T2}`],
  2: [`md:col-start-1 md:row-start-1 ${T2}`, `md:col-start-2 md:row-start-1 ${T2}`, `md:col-start-3 md:row-start-1 ${T2}`],
  1: [`md:col-start-1 md:row-start-1 md:col-span-2 ${T2}`, `md:col-start-3 md:row-start-1 ${T2}`],
};

// Ảnh biểu tượng thật của từng điểm đến (Wikimedia Commons, giấy phép CC/CC0 – tác giả/giấy phép ghi ở cột 2),
// thay cho ảnh WordPress cũ vốn mờ và không đúng địa danh. Điểm đến chưa có ảnh riêng giữ ảnh cũ.
const ICON: Record<string, [string, string]> = {
  "ha-noi-tour": ["The Huc Bridge, Hoan Kiem Lake", "Wikimedia Commons, CC BY 2.0"],
  "ha-long-tour": ["Limestone karsts of Ha Long Bay", "Wikimedia Commons, CC BY 4.0"],
  "sapa-tour": ["Rice terraces near Sapa", "Wikimedia Commons, CC BY 2.0"],
  "ha-giang-tour": ["Ma Pi Leng Pass and Nho Que River, Ha Giang", "Wikimedia Commons, CC BY-SA 4.0"],
  "ninh-binh-tour": ["Rowing boats at Trang An, Ninh Binh", "Wikimedia Commons, CC BY 4.0"],
  "cao-bang-tour": ["Ban Gioc Waterfall, Cao Bang", "Wikimedia Commons, CC BY 2.0"],
  "hue-tour": ["Ngo Mon Gate, Hue Imperial City", "Wikimedia Commons, CC BY 4.0"],
  "da-nang-tour": ["Golden Bridge, Ba Na Hills, Da Nang", "Wikimedia Commons, CC0"],
  "hoi-an": ["Japanese Covered Bridge, Hoi An", "Wikimedia Commons, CC BY-SA 4.0"],
  "quang-binh-tour": ["Phong Nha Cave, Quang Binh", "Wikimedia Commons, CC BY 4.0"],
  "nha-trang-tour": ["Nha Trang Bay", "Wikimedia Commons, CC BY-SA 2.0"],
  "ho-chi-minh-tour": ["Notre-Dame Cathedral, Ho Chi Minh City", "Wikimedia Commons, CC BY-SA 4.0"],
  "mui-ne-tour": ["Sand dunes of Mui Ne", "Wikimedia Commons, CC BY 4.0"],
  "phu-quoc-tour": ["Sunset on Phu Quoc island", "Wikimedia Commons, CC0"],
  "mekong": ["Cai Rang floating market, Mekong Delta", "Wikimedia Commons, CC BY-SA 4.0"],
  "da-lat": ["Xuan Huong Lake, Da Lat", "Wikimedia Commons, CC BY 4.0"],
  "cu-chi": ["Cu Chi Tunnels", "Wikimedia Commons, CC BY-SA 4.0"],
  "vung-tau": ["Christ of Vung Tau", "Wikimedia Commons, CC BY 3.0"],
  "marble": ["Marble Mountains, Da Nang", "Wikimedia Commons, CC BY 4.0"],
  "my-son": ["My Son Sanctuary", "Wikimedia Commons, CC BY 4.0"],
};

// Điểm đến bổ sung (chưa có danh mục riêng trên WordPress) để mỗi miền đủ 5 ô + ô "điểm đến khác":
// số tour đếm theo tên tour, bấm vào sẽ tìm tour theo từ khoá q
type Extra = Destination & { q: string };
const EXTRA: Extra[] = [
  { slug: "marble", name: "Marble Mountains", zh: "五行山", region: "central", count: 3, q: "Marble", image: "" },
  { slug: "my-son", name: "My Son Sanctuary", zh: "美山圣地", region: "central", count: 2, q: "My Son", image: "" },
  { slug: "mekong", name: "Mekong Delta", zh: "湄公河三角洲", region: "south", count: 11, q: "Mekong", image: "" },
  { slug: "da-lat", name: "Da Lat", zh: "大叻", region: "south", count: 8, q: "Da Lat", image: "" },
  { slug: "cu-chi", name: "Cu Chi Tunnels", zh: "古芝地道", region: "south", count: 6, q: "Cu Chi", image: "" },
  { slug: "vung-tau", name: "Vung Tau", zh: "头顿", region: "south", count: 4, q: "Vung Tau", image: "" },
] as Extra[];
// Có trang điểm đến thì dẫn tới đó; điểm đến bổ sung chưa có trang thì tìm tour theo tên
const hrefOf = (d: Destination) => (cityByDest(d.slug) || !("q" in d) ? destHref(d.slug) : `/tours?q=${encodeURIComponent((d as Extra).q)}`);
const imageOf = (d: Destination) => (ICON[d.slug] ? `/images/destinations/${d.slug}.webp` : d.image);

export default function RegionTours({ destinations }: { destinations: Destination[] }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [region, setRegion] = useState<string>(REGIONS[0].key);
  const all = [...destinations, ...EXTRA].filter((d) => d.region === region && d.count > 0);
  const list = all.slice(0, 5);
  const others = all.slice(5);
  const layout = LAYOUT[list.length] ?? LAYOUT[5];

  return (
    <section className="relative pb-8 pt-12 md:pb-10 md:pt-20">
      {/* Không isolate/overflow-hidden: trống đồng góc dưới tràn xuống section Package Tours bên dưới (cùng lớp xếp chồng trong khối bọc ở page.tsx) */}
      <div className="absolute inset-0 -z-20 bg-[#f7f1e6]" aria-hidden />
      {/* Nền be với hoa văn trống đồng mờ ở góc trên (lộ ra cạnh tiêu đề) và góc dưới, quay rất chậm */}
      <BronzeDrum className="drum-spin pointer-events-none absolute -bottom-[340px] -left-60 -z-10 w-[680px] opacity-[0.32]" />
      {/* Trống góc trên bị cắt trong section để không đè lên khối dịch vụ phía trên */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <BronzeDrum className="drum-spin absolute -right-56 -top-64 w-[760px] opacity-[0.32]" />
      </div>
      <div className="container-x">
        <div className="mb-6 md:mb-14 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{zh ? "按地区旅游" : "Tours by Region"}</p>
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{zh ? "越南北部、中部与南部" : "Explore North, Central and South Vietnam"}</h2>
          </div>
          <HandNote side="right" className="md:mb-8 md:mr-10" lines={[{"en":"Three regions.","zh":"三大区域。"},{"en":"One unforgettable country.","zh":"一个难忘的国度。"}]} />
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {REGIONS.map((r) => (
            <button key={r.key} onClick={() => setRegion(r.key)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:px-6 sm:py-2.5 sm:text-sm ${region === r.key ? "border-brand bg-brand text-white" : "bg-white hover:border-brand hover:text-brand"}`}>
              {zh ? r.zh : <><span className="sm:hidden">{r.en.replace(" Vietnam", "")}</span><span className="hidden sm:inline">{r.en}</span></>}
            </button>
          ))}
        </div>

        <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 md:auto-rows-[240px] md:grid-cols-3">
          {list.map((d, i) => (
            <Link key={d.slug} href={hrefOf(d)} className={`group relative block h-72 overflow-hidden rounded-3xl shadow-lg md:h-auto ${layout[i]}`}>
              <div className="absolute inset-0">
                <Img src={imageOf(d)} alt={ICON[d.slug]?.[0] ?? d.name} width={i === 4 ? 800 : 480} className="h-full w-full transition duration-700 group-hover:scale-105" />
              </div>
              {/* Phủ tối từ trên xuống để chữ ở góc trên dễ đọc, nửa dưới giữ nguyên ảnh */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/25 via-40% to-transparent" />
              <div className="relative p-5 md:p-6">
                <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">{zh ? d.zh : d.name.replace(/ City$/, "")}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-white">
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">{d.count} {zh ? "条线路" : "tours"}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">{zh ? "私人团" : "Private tours"}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">{zh ? "可定制" : "Tailor-made"}</span>
                </div>
              </div>
              {/* Nút ở góc dưới thẻ */}
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md text-sm font-semibold text-brand transition group-hover:bg-accent group-hover:text-white">
                  {zh ? "立即探索" : "Discover now"} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}

          {/* Thẻ tổng hợp các điểm đến còn lại của miền: nền là ảnh một điểm đến làm mờ, phủ nâu ấm */}
          <Link href={`/tours?region=${region}`} className={`group relative flex h-56 flex-col justify-between overflow-hidden rounded-3xl p-6 text-white shadow-lg md:h-auto ${layout[list.length]}`}>
            <div className="absolute inset-0 scale-110 blur-[6px] transition duration-700 group-hover:scale-125">
              <Img src={imageOf((others.length ? others : all)[0])} alt="" width={256} className="h-full w-full" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#2c1a0e]/80 via-[#3a2414]/55 to-[#2c1a0e]/75" />
            <div className="relative flex items-center gap-4">
              <span className="font-serif text-5xl font-bold italic text-[#f3d28b] drop-shadow">{others.length > 0 ? `${others.length}+` : all.length}</span>
              <div className="flex -space-x-3">
                {(others.length ? others : all).slice(0, 4).map((d) => (
                  <Img key={d.slug} src={imageOf(d)} alt="" width={64} className="h-11 w-11 rounded-full ring-2 ring-[#f3d28b]/80" />
                ))}
              </div>
            </div>
            <p className="relative font-script text-4xl leading-none text-white drop-shadow md:text-5xl">{others.length > 0 ? (zh ? "其他目的地" : "Other locations") : zh ? "个目的地" : "Destinations"}</p>
            <span className="relative self-end inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold uppercase tracking-wider ring-1 ring-white/50 backdrop-blur transition group-hover:bg-accent group-hover:ring-accent">
              {zh ? "查看全部" : "View all"} <span aria-hidden>→</span>
            </span>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link href={`/tours?region=${region}`} className="btn btn-brand">
            {zh ? "查看该地区全部线路" : "View all tours in this region"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
