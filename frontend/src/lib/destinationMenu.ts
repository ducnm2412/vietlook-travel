// Danh sách điểm đến cho dropdown "Destinations" (chỉ Việt Nam, chia 3 miền).
// Ảnh nhỏ ở /images/destinations/thumb/<img>.webp, ảnh lớn ở /images/destinations/<img>.webp
import { destHref } from "./cities";
export type DestLink = { en: string; zh: string; href: string; img: string };
export type DestRegion = { key: "north" | "central" | "south"; en: string; zh: string; cover: string; map: [number, number]; links: DestLink[] };

// Điểm đến có trang riêng thì dẫn tới /destinations/<path>, còn lại về danh sách tour lọc theo điểm đến
const d = (en: string, zh: string, img: string, href = destHref(img)): DestLink => ({ en, zh, href, img });

export const DEST_REGIONS: DestRegion[] = [
  {
    key: "north", en: "North Vietnam", zh: "越南北部", cover: "ha-long-tour", map: [0, 27],
    links: [
      d("Ha Noi", "河内", "ha-noi-tour"),
      d("Ha Long Bay", "下龙湾", "ha-long-tour"),
      d("Sapa", "沙坝", "sapa-tour"),
      d("Ha Giang", "河江", "ha-giang-tour"),
      d("Ninh Binh", "宁平", "ninh-binh-tour"),
      d("Cao Bang", "高平", "cao-bang-tour"),
    ],
  },
  {
    key: "central", en: "Central Vietnam", zh: "越南中部", cover: "hoi-an", map: [27, 77],
    links: [
      d("Hue", "顺化", "hue-tour"),
      d("Da Nang", "岘港", "da-nang-tour"),
      d("Hoi An", "会安", "hoi-an"),
      d("Phong Nha, Quang Binh", "广平风牙", "quang-binh-tour"),
      d("Nha Trang", "芽庄", "nha-trang-tour"),
      d("Da Lat", "大叻", "da-lat"),
    ],
  },
  {
    key: "south", en: "South Vietnam", zh: "越南南部", cover: "mekong", map: [77, 100],
    links: [
      d("Ho Chi Minh City", "胡志明市", "ho-chi-minh-tour"),
      d("Mekong Delta", "湄公河三角洲", "mekong", "/destinations/mekong-delta"),
      d("Cu Chi Tunnels", "古芝地道", "cu-chi"),
      d("Mui Ne", "美奈", "mui-ne-tour"),
      d("Phu Quoc", "富国岛", "phu-quoc-tour"),
      d("Vung Tau", "头顿", "vung-tau"),
    ],
  },
];
