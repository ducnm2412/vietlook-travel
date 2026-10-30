import Link from "@/components/LocaleLink";
import { L } from "@/lib/i18n";
import LogoBadge from "./LogoBadge";

// Ảnh ngôi sao ruy băng vàng (section B2B): khung frame.webp phủ trên cùng, mỗi vùng trống trong khung là
// một ảnh địa danh cắt theo đường viền vùng (clip-path tính từ ảnh khung gốc 1534×1635, đơn vị % của ô box).
// clip-path cắt luôn vùng nhận chuột, nên rê/bấm chỉ trúng đúng cánh đang trỏ.
type Petal = { key: string; box: number[]; clip: string; img?: string; href: string; en: string; zh: string };

const PETALS: Petal[] = [
  { key: "top", box: [37.03, 11.68, 31.94, 32.97], img: "top", href: "/destinations/ha-long-bay", en: "Ha Long Bay", zh: "下龙湾", clip: "polygon(24.5% 0.0%,16.3% 0.9%,8.8% 8.9%,3.5% 19.7%,0.2% 35.1%,0.2% 51.2%,3.9% 71.6%,8.4% 87.0%,11.6% 95.2%,15.1% 99.3%,17.1% 99.8%,44.9% 93.9%,55.7% 86.5%,67.6% 79.6%,96.7% 65.5%,99.8% 62.7%,95.5% 55.1%,83.3% 38.8%,74.3% 28.9%,63.7% 19.1%,51.2% 9.8%,42.7% 5.0%,34.1% 1.7%)" },
  { key: "ul", box: [3.06, 24.22, 35.46, 33.27], img: "ul", href: "/destinations/hue", en: "Hue Imperial City", zh: "顺化皇城", clip: "polygon(79.4% 0.0%,66.9% 2.9%,43.4% 10.5%,28.9% 16.2%,18.6% 21.1%,12.9% 24.6%,5.1% 31.4%,1.5% 36.8%,0.2% 40.6%,0.2% 45.4%,3.1% 52.4%,9.6% 60.8%,18.0% 69.3%,26.8% 76.5%,41.4% 86.4%,66.5% 99.8%,76.8% 98.0%,91.9% 93.0%,96.0% 91.0%,98.3% 88.6%,98.9% 86.8%,99.8% 73.0%,89.2% 44.5%,85.1% 31.6%,81.4% 14.2%,81.1% 1.7%)" },
  { key: "ur", box: [54.63, 29.3, 42.18, 24.71], img: "ur", href: "/destinations/ninh-binh", en: "Trang An, Ninh Binh", zh: "宁平长安", clip: "polygon(99.2% 13.1%,97.7% 8.4%,94.9% 4.0%,88.1% 0.7%,75.7% 0.2%,59.7% 5.2%,45.7% 13.1%,25.7% 29.0%,10.8% 44.8%,5.1% 52.2%,0.0% 60.6%,7.4% 74.0%,11.4% 86.9%,13.1% 89.6%,37.2% 94.1%,54.6% 99.5%,66.5% 99.8%,74.0% 89.9%,81.1% 78.5%,85.6% 70.0%,91.7% 56.2%,95.8% 44.3%,98.9% 31.2%,99.8% 21.5%)" },
  { key: "lr", box: [50.26, 56.15, 47.46, 28.99], img: "lr", href: "/destinations/da-nang", en: "Golden Bridge, Da Nang", zh: "岘港金桥", clip: "polygon(1.1% 29.5%,0.0% 36.3%,0.4% 38.6%,2.2% 41.4%,58.7% 93.5%,66.2% 98.3%,70.7% 99.8%,74.2% 99.8%,79.1% 97.7%,83.0% 93.5%,86.8% 87.3%,90.4% 79.3%,93.5% 69.2%,97.1% 52.5%,99.2% 37.1%,99.9% 23.6%,97.8% 16.9%,94.2% 10.8%,91.3% 7.6%,85.9% 4.2%,80.2% 2.1%,71.2% 0.4%,48.1% 0.0%,35.4% 2.1%,21.2% 8.0%,16.9% 11.2%,11.7% 19.0%,6.5% 24.3%,2.9% 26.8%)" },
  { key: "ll", box: [2.15, 60.06, 52.54, 27.89], img: "ll", href: "/destinations/hoi-an", en: "Hoi An Ancient Town", zh: "会安古镇", clip: "polygon(0.1% 82.7%,1.5% 89.0%,4.2% 94.1%,6.6% 96.7%,11.0% 98.9%,15.5% 99.8%,23.4% 99.8%,37.2% 97.6%,44.9% 95.4%,61.8% 87.5%,76.8% 76.8%,89.5% 64.9%,97.1% 55.9%,99.9% 51.5%,97.9% 48.7%,74.3% 30.5%,30.9% 0.0%,24.9% 7.2%,18.5% 18.2%,13.9% 27.4%,7.4% 43.4%,4.7% 51.3%,1.1% 65.8%,0.1% 74.6%)" },
  // Mảnh nhỏ giữa 2 dải ruy băng phía trái – dùng chung ảnh Hội An
  { key: "sl", box: [31.62, 57.61, 11.6, 6.06], img: "ll", href: "/destinations/hoi-an", en: "Hoi An Ancient Town", zh: "会安古镇", clip: "polygon(0.0% 25.3%,7.3% 37.4%,83.1% 96.0%,94.4% 99.0%,99.4% 89.9%,78.7% 38.4%,56.2% 1.0%,49.4% 0.0%,6.2% 15.2%)" },
  { key: "bottom", box: [19.75, 74.98, 69.36, 22.75], img: "bottom", href: "/destinations/sapa", en: "Sapa rice terraces", zh: "沙坝梯田", clip: "polygon(99.9% 51.3%,99.1% 48.9%,95.6% 47.3%,92.1% 44.1%,53.0% 0.0%,43.1% 18.8%,29.9% 37.6%,25.6% 42.5%,14.1% 52.7%,0.9% 60.8%,0.0% 63.4%,2.0% 68.0%,8.6% 77.2%,14.6% 83.6%,21.7% 89.5%,29.6% 94.4%,44.9% 99.2%,52.9% 99.7%,59.9% 98.7%,70.1% 94.9%,81.0% 86.8%,87.2% 79.3%,91.5% 72.3%,96.5% 61.6%)" },
];
const CENTER = { box: [38.14, 43.3, 22.03, 20.8] };

const pos = (b: number[]) => ({ left: `${b[0]}%`, top: `${b[1]}%`, width: `${b[2]}%`, height: `${b[3]}%` });

export default function B2BStar({ className = "" }: { className?: string }) {
  return (
    <div className={`b2b-star relative aspect-[1534/1635] ${className}`}>
      {/* Lớp giấy xé màu kem phía sau (tràn ra 70px quanh khung gốc 1534×1635) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/b2b-frame/paper.webp" alt="" aria-hidden loading="lazy" decoding="async" className="pointer-events-none absolute max-w-none drop-shadow-[0_10px_18px_rgba(90,60,20,0.25)]" style={{ left: "-4.56%", top: "-4.28%", width: "109.13%", height: "108.56%" }} />
      {PETALS.map((p) => (
        <Link key={p.key} href={p.href} aria-label={p.en} className="b2b-petal group absolute block" style={{ ...pos(p.box), clipPath: p.clip }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/b2b-frame/${p.img}.webp`} alt={p.en} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          {p.key !== "sl" && (
            <span className="b2b-label pointer-events-none absolute inset-0 grid place-items-center">
              <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"><L en={p.en} zh={p.zh} /></span>
            </span>
          )}
        </Link>
      ))}

      {/* Vòng tròn giữa: logo huy hiệu giống header (vòng chữ xoay), không có hiệu ứng hover */}
      <div className="pointer-events-none absolute" style={pos(CENTER.box)}>
        <LogoBadge className="h-full w-full" />
      </div>

      {/* Khung ruy băng vàng + cờ phủ trên cùng, không nhận chuột */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/b2b-frame/frame.webp" alt="" aria-hidden width={1534} height={1635} loading="lazy" decoding="async" className="b2b-ribbon pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
