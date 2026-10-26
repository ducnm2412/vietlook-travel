// Dữ liệu thật import từ vietlooktravel.com (scripts/import-vietlook.mjs)
import { readFileSync } from 'node:fs';
import { PRICE_FROM, estimatePrice } from './prices.js';

// Tên tiếng Anh cho các tour site gốc đặt tên tiếng Việt (dịch theo slug)
const TITLES_EN = JSON.parse(readFileSync(new URL('./titles-en.json', import.meta.url), 'utf8'));
// Bản dịch tiếng Anh summary/contentHtml của các tour đó: { slug: { summaryEn, contentHtmlEn } }
const CONTENT_EN = JSON.parse(readFileSync(new URL('./content-en.json', import.meta.url), 'utf8'));
// Tên tour tiếng Trung (dịch theo slug)
const TITLES_ZH = JSON.parse(readFileSync(new URL('./titles-zh.json', import.meta.url), 'utf8'));
const POSTS_ZH = JSON.parse(readFileSync(new URL('./posts-zh.json', import.meta.url), 'utf8'));
// Bản dịch tiếng Trung nội dung bài viết: { slug: { excerptZh, contentHtmlZh } } (chưa có file thì bỏ qua)
const readOpt = (f) => { try { return JSON.parse(readFileSync(new URL(f, import.meta.url), 'utf8')); } catch { return {}; } };
const POST_CONTENT_ZH = readOpt('./post-content-zh.json');
// Bài spam (quảng cáo cờ bạc) lọt vào blog site gốc – không hiển thị
const BLOCKED_POSTS = new Set(['best-online-casinos-australia-top-aussie-gambling-sites-2024']);

// CDN ảnh của site gốc chỉ trả ảnh cho trình duyệt khi có ?format=auto (giống cách site gốc dùng)
const fixCdn = (s) => s.replace(/(https:\/\/cdn\.ngay\.net\/[^"'\s?]+\.(?:jpe?g|png|webp|gif))(?![?\w])/gi, '$1?format=auto');
const raw = JSON.parse(fixCdn(readFileSync(new URL('./vietlook.json', import.meta.url), 'utf8')));
// Bản dịch tiếng Trung của summary/contentHtml: { slug: { summaryZh, contentHtmlZh } }
const CONTENT_ZH = JSON.parse(fixCdn(readFileSync(new URL('./content-zh.json', import.meta.url), 'utf8')));

// Điểm đến (danh mục con của tour-packages) -> miền
const DEST = {
  'ha-noi-tour': ['Ha Noi', '河内', 'north'],
  'ha-long-tour': ['Ha Long Bay', '下龙湾', 'north'],
  'sapa-tour': ['Sapa', '沙坝', 'north'],
  'ha-giang-tour': ['Ha Giang', '河江', 'north'],
  'ninh-binh-tour': ['Ninh Binh', '宁平', 'north'],
  'cao-bang-tour': ['Cao Bang', '高平', 'north'],
  'hue-tour': ['Hue City', '顺化', 'central'],
  'da-nang-tour': ['Da Nang City', '岘港', 'central'],
  'hoi-an': ['Hoi An', '会安', 'central'],
  'quang-binh-tour': ['Quang Binh', '广平', 'central'],
  'nha-trang-tour': ['Nha Trang', '芽庄', 'central'],
  'ho-chi-minh-tour': ['Ho Chi Minh City', '胡志明市', 'south'],
  'mui-ne-tour': ['Mui Ne', '美奈', 'south'],
  'phu-quoc-tour': ['Phu Quoc', '富国岛', 'south'],
};

// Chủ đề theo menu của vietlooktravel.com
const THEMES = {
  'cruise-tour': ['Cruise Tours', '游轮之旅'],
  'travel-experience': ['Cultural Experience', '文化体验'],
  'vietnam-tours': ['Vietnam Tours', '越南线路'],
};

const CAR_CITIES = {
  'ha-noi-private-cars': ['Ha Noi', '河内'],
  'ho-chi-minh-private-cars': ['Ho Chi Minh City', '胡志明市'],
  'da-nang-private-cars': ['Da Nang', '岘港'],
  'nha-trang-private-cars': ['Nha Trang', '芽庄'],
  'mui-ne-private-cars': ['Mui Ne', '美奈'],
  'phu-quoc-private-cars': ['Phu Quoc', '富国岛'],
  'da-lat-private-cars': ['Da Lat', '大叻'],
};

const all = raw.tours.map((t) => {
  const destinations = t.categories.filter((c) => DEST[c]);
  const region = DEST[destinations[0]]?.[2] || null;
  const theme = Object.keys(THEMES).find((k) => t.categories.includes(k)) || (t.kind === 'tour' && !region ? 'vietnam-tours' : null);
  const real = PRICE_FROM[t.slug];
  return { ...t, title: TITLES_EN[t.slug] ?? t.title, summary: CONTENT_EN[t.slug]?.summaryEn ?? t.summary, contentHtml: CONTENT_EN[t.slug]?.contentHtmlEn ?? t.contentHtml, titleZh: TITLES_ZH[t.slug] ?? null, summaryZh: CONTENT_ZH[t.slug]?.summaryZh ?? null, contentHtmlZh: CONTENT_ZH[t.slug]?.contentHtmlZh ?? null, destinations, region, theme, priceFrom: real ?? estimatePrice(t), priceEstimated: real == null };
});

export const tours = all.filter((t) => t.kind === 'tour');
export const cars = all.filter((t) => t.kind === 'car');
export const fastTrack = all.filter((t) => t.kind === 'fast-track');
// Bài 'news' = có tính thời sự (mùa hoa, mùa lúa, lễ hội, sự kiện, giá năm nay); còn lại là 'guide' (cẩm nang lâu dài)
const NEWS_RE = /\b(festival|tet|lunar new year|summer|spring|autumn|winter|lotus|buckwheat|ripe|golden rice|rice season|cherry blossom|blooming|fireworks|event|new year|holiday|20\d\d)\b/i;
const EVERGREEN_RE = /\b(best time|when is|climate|weather by)\b/i;
export const posts = raw.posts.filter((p) => !BLOCKED_POSTS.has(p.slug)).map((p) => ({ ...p, titleZh: POSTS_ZH[p.slug] ?? null, excerptZh: POST_CONTENT_ZH[p.slug]?.excerptZh ?? null, contentHtmlZh: POST_CONTENT_ZH[p.slug]?.contentHtmlZh ?? null, type: NEWS_RE.test(p.title) && !EVERGREEN_RE.test(p.title) ? 'news' : 'guide' }));

const firstImage = (list) => list.find((t) => t.image)?.image || null;

export const destinations = Object.entries(DEST).map(([slug, [name, zh, region]]) => {
  const list = tours.filter((t) => t.destinations.includes(slug));
  return { slug, name, zh, region, count: list.length, image: firstImage(list) };
});

export const themes = Object.entries(THEMES).map(([slug, [name, zh]]) => ({
  slug, name, zh, count: tours.filter((t) => t.theme === slug).length,
}));

export const carCities = Object.entries(CAR_CITIES).map(([slug, [name, zh]]) => {
  const list = cars.filter((c) => c.categories.includes(slug));
  return { slug, name, zh, count: list.length, image: firstImage(list) };
});

export const vehicles = [
  { seats: 4, name: 'Sedan 4 seats', zh: '4座轿车', example: 'Toyota Vios / Camry' },
  { seats: 7, name: 'SUV / MPV 7 seats', zh: '7座商务车', example: 'Toyota Innova / Fortuner' },
  { seats: 16, name: 'Minivan 16 seats', zh: '16座面包车', example: 'Ford Transit / Hyundai Solati' },
  { seats: 29, name: 'Coach 29 seats', zh: '29座中巴', example: 'Hyundai County' },
  { seats: 45, name: 'Coach 45 seats', zh: '45座大巴', example: 'Hyundai Universe' },
];

// Bản rút gọn cho danh sách (bỏ HTML nặng)
export const brief = ({ contentHtml, contentHtmlZh, gallery, ...rest }) => ({ ...rest, gallery: (gallery || []).slice(0, 4) });
