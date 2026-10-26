// Giá thấp nhất / người lớn của từng tour (theo slug), trích tay từ bài viết gốc trên vietlooktravel.com (23/10/2026).
// Chỉ lấy giá tour; bỏ qua phụ phí, vé tham quan, giá trẻ em. Tour không có ở đây hiện "Price on request".
// Giá USD được quy đổi sang VND theo USD_TO_VND.

export const USD_TO_VND = 26000;

// Giá gốc ghi bằng USD
const USD = {
  'ha-noi-cultural-day-trip': 68,
  'hanoi-city-tour-full-day-history-and-culture': 28,
  'ha-giang-easy-rider-4-days': 292,
  'ha-giang-easy-rider-3-days': 216,
  'ha-giang-easy-rider-2-days': 148,
  'saigon-midnight-sightseeing-adventure': 44,
  'phu-quoc-city-tour': 10,
  'phu-quoc-north-island-sightseeing-tour': 26,
  'glamping-trip-two-days-one-night': 88,
  'camping-trip-two-days-one-night': 69,
  'luxury-speedboat-snorkeling-trip': 42,
  'sunset-barbecue-on-a-private-lagoon': 48,
  'saigon-discover-and-shop-at-traditional-local-markets-tour': 39,
  'cable-car-and-four-islands-trip-by-speed-boat': 45,
  'cable-car-and-3-islands-trip-by-boat': 46,
  'snorkeling-3-islands-trip-by-boat': 22,
  'fishing-and-snorkeling-2-islands-tour-by-boat': 17,
  'nha-trang-da-lat-mui-ne-mekong-delta-ho-chi-minh': 520,
  'ha-giang-cao-bang-easy-rider-5-days': 440,
  'nha-trang-da-lat-mui-ne-ho-chi-minh-city': 450,
  'hanoi-cat-cat-village-fansipan': 82,
  'ho-chi-minh-city-mui-ne-mekong-delta-cu-chi-tour': 338,
  'hanoi-sapa-cat-cat-lao-chai-ta-van-tram-ton-silver-waterfall': 124,
  'saigon-walking-foodie-and-history-tour': 44,
  'sunset-cocktail-and-dinner-cruise': 72,
  'ho-chi-minh-city-mui-ne-vung-tau-tour': 338,
  'discover-nha-trang-beach-mun-island-fishing-village-mini-beach': 32,
  'nha-trang-discovery-cruises-day-cruise': 48,
  'ao-dai-photo-shoot-experience': 95,
  'discovery-phong-nha-tu-lan-cave-tour-1-day': 90,
  'nha-trang-beach-mini-beach-fishing-village-hon-tam-island': 32,
  'saigon-slum-tour': 35,
  'discover-nha-trang-beach-diving-explore-the-ocean-tour': 32,
  'iconic-chill-spots-in-saigon-tour': 42,
  'saigon-iconic-sightseeing-tour': 35,
  'ha-giang-jeep-tour-3-days': 340,
  'saigon-iconic-food-tour': 45,
  'discovery-phong-nha-hang-tien-cave-tour-1-day': 140,
  'discover-nha-trang-beach': 32,
  'discover-nha-trang-city-tour': 25,
  'discovery-phong-nha-hang-tien-cave-2-day-tour': 290,
  'nha-trang-beach-hon-tam-island-tour': 58,
  'discovery-phong-nha-elephant-cave-and-ma-da-valley-jungle-trek': 75,
  'walking-under-the-sea-tour-nha-trang-beach': 42,
  'discover-nha-trang-beach-3-island-vip-tour': 28,
  'discover-hoi-an-craft-villages-preserving-traditional-culture': 32,
  'discover-nha-trang-beach-3-island-tour': 18,
  'non-touristy-hoi-an-craft-villages-tour-with-biking': 25,
  'lantern-making-be-a-real-farmer-at-tra-que-village': 52,
  'vinwonders-nam-hoi-an': 60,
  'my-son-holy-land-hoi-an-ancient-town': 52,
  'da-nang-city-full-day-tour': 42,
  'than-tai-hot-spring-park-da-nang': 40,
  'cham-island-full-day-tour': 20,
  'khai-dinh-tomb-imperial-citadel-thien-mu-pagoda': 35,
  'ba-na-hills-discover-the-golden-bridge': 54,
  'linh-ung-pagoda-marble-mountain-hoi-an-ancient-town': 25,
  'ha-giang-cao-bang-ban-gioc-waterfall-ba-be-lake': 520,
  'hang-en-cave-adventure-camp-2-days-1-night': 405,
  'marble-mountain-coconut-forest-hoi-an-ancient-town': 30,
  'cao-bang-3-days-2-nights': 250,
  'ha-giang-jeep-tour-2-days': 240,
  'hanoi-sapa-cat-cat-lao-chai-ta-van-bac-ha': 124,
  'hanoi-sapa-bac-ha-2-days-1-night': 105,
  'hanoi-sapa-catcat-fansipan-glass-bridge-lonely-tree-silver-waterfall-moana-check-in-point': 162,
  'hanoi-sapa-lao-chai-ta-van-giang-ta-chai': 72,
  'enjoy-ha-nois-unique-cuisine-and-vietnam-hair-washing': 62, // nhóm 5–6 khách
  'hanoi-sapa-catcat-lao-chai-ta-van-hanoi': 90,
  'hanoi-sapa-fansipan-catcat-moana-view-or-ham-rong': 92,
  'sapa-catcat-glass-bridge-lonely-tree-silver-waterfall': 124,
  'hanoi-sapa-catcat-moana-check-in-point': 80,
  'hanoi-sapa-catcat-fansipan-moana-sapa': 108,
  'hanoi-sapa-catcat-fansipan-glass-bridge-lonely-tree-silver-waterfall-moana-view': 108,
  'hanoi-catcat-moana-view': 80,
  'hanoi-food-tour-and-incense-stick-making-village-experience': 58, // nhóm 5–6 khách
  'duong-lam-ancient-village-private-day-tour-from-hanoi': 55,
  'perfume-pagoda-one-day-trip': 68,
  'ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour': 670,
  'ha-long-da-nang-9-days-8-nights-tour': 463,
  'ha-long-4-days-3-nights-tour-from-hanoi': 269,
  'da-nang-phu-quoc-tour-8-days-7-nights': 828,
  'ha-long-ninh-binh-sapa-8-days-7-nights-tour': 398,
};

// Giá gốc ghi bằng VND
const VND = {
  'hoang-su-phi-tour-3-days-2-nights': 2960000,
  'tour-city-ha-noi-1-ngay': 790000,
  'tour-du-lich-lang-huong-1-ngay': 1030000, // nhóm 6–10 khách
  'tour-du-lich-ta-xua-2-ngay-1-dem-tu-hai-phong': 1590000,
  'ha-giang-tour-buckwheat-flower-season-3-days-2-nights': 2590000,
  'tour-du-lich-ha-noi-ha-giang-mua-hoa-tam-giac-mach-3-ngay-2-dem': 2390000,
  'tour-du-lich-vung-tau-4-ngay-3-dem': 8790000,
  'tour-du-lich-ha-giang-3-ngay-2-dem-2-9': 2390000,
  'tour-du-lich-ha-giang-3-ngay-2-dem-tet': 2390000,
  'du-lich-nha-trang-da-lat-4-ngay-3-dem': 6490000,
  'tour-du-lich-nha-trang-ninh-thuan-4-ngay-3-dem': 7090000,
  'du-lich-mui-ne-3-ngay-2-dem-tu-ho-chi-minh': 2499000,
  'tour-du-lich-mui-ne-phan-thiet-2-ngay-1-dem': 1290000,
  'du-lich-quang-binh-3-ngay-2-dem': 2950000,
  'du-lich-mien-tay-5-ngay-4-dem': 9290000,
  'du-lich-quang-binh-3-ngay-4-dem': 4195000, // đoàn 40 khách
  'tour-du-lich-ha-noi-phu-quoc-4-ngay-3-dem': 6390000,
  'du-lich-nha-trang-4-ngay-3-dem': 3620000,
  'tour-du-lich-ha-long-ninh-binh-sapa-5-ngay-4-dem': 5580000,
  'du-lich-hue-da-nang-quang-binh-5-ngay-4-dem': 5290000,
  'tour-du-lich-mu-cang-chai-sapa-mua-lua-chin-3-ngay': 2590000,
  'tour-ha-noi-ha-giang-le-30-4': 2390000,
  'tour-ha-noi-sapa-3-ngay-2-dem-le-30-4-1-5': 3090000,
  'tour-du-lich-ha-noi-cao-bang-bac-kan-3-ngay-2-dem-30-4-1-5': 2390000,
};

export const PRICE_FROM = {
  ...Object.fromEntries(Object.entries(USD).map(([slug, usd]) => [slug, usd * USD_TO_VND])),
  ...VND,
};

// GIÁ MẪU (demo) cho tour chưa có giá trong bài gốc: tính theo loại dịch vụ và số ngày.
// Cần thay bằng giá thật trước khi chạy chính thức.
const round = (n) => Math.round(n / 10000) * 10000;
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export function estimatePrice(tour) {
  const vary = 0.85 + (hash(tour.slug) % 31) / 100; // 0.85 – 1.15, cố định theo slug
  const base =
    tour.kind === 'car' ? 650000
    : tour.kind === 'fast-track' ? 750000
    : tour.categories.includes('cruise-tour') ? (tour.days > 1 ? 3900000 : 1650000)
    : tour.days <= 1 ? 950000
    : 1500000 * tour.days;
  return round(base * vary);
}
