// cover: slug tour lấy ảnh làm ảnh đại diện chủ đề (ô menu, thẻ "Other tour styles"), hoặc đường dẫn ảnh bắt đầu bằng "/"
// Trang chủ đề tour (/themes/<slug>): nội dung theo vietlooktravel-operators.vercel.app/themes/*, tour lấy theo slug trong dữ liệu
export type TourTheme = { slug: string; name: string; zh: string; tagline: string; taglineZh: string; intro: string; introZh: string; tours: string[]; cover: string };

export const TOUR_THEMES: TourTheme[] = [
  {
    slug: "luxury", cover: "essence-grand-cruise-halong-2-days-1-night", name: "Luxury", zh: "奢华",
    tagline: "5-star stays, private guides", taglineZh: "五星住宿，私人导游",
    intro: "Boutique cruises, five-star resorts, private transfers and dedicated guides. We take care of every detail so you can enjoy Vietnam at its finest.",
    introZh: "精品游轮、五星度假村、专车接送与专属导游。每个细节都由我们打理，让您尽享越南的极致之美。",
    tours: ["sunset-cocktail-and-dinner-cruise", "discover-nha-trang-beach-3-island-vip-tour", "luxury-speedboat-snorkeling-trip", "vietnam-luxury-tour", "halong-ambassador-cruise-2-days-1-night", "essence-grand-cruise-halong-2-days-1-night", "aspira-5-star-cruise-ha-long-lan-ha-2-days-1-night", "ambassador-day-cruise-halong-bay", "hanoi-ha-long-sonata-5-star-day-cruise-ninh-binh"],
  },
  {
    slug: "hand-picked", cover: "ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour", name: "Hand-picked", zh: "精选",
    tagline: "Our team's favourite routes", taglineZh: "团队最爱的线路",
    intro: "The itineraries our local team recommends most: balanced routes that pair Vietnam's best-known sights with authentic local experiences.",
    introZh: "本地团队最推荐的行程：节奏均衡，将越南最著名的景点与地道的本地体验相结合。",
    tours: ["ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour", "hanoi-ha-long-sapa-da-nang-ho-chi-minh", "hanoi-ha-long-ninh-binh-da-nang-phu-quoc", "nha-trang-da-lat-mui-ne-mekong-delta-ho-chi-minh", "nha-trang-da-lat-mui-ne-ho-chi-minh-city", "ho-chi-minh-city-mui-ne-mekong-delta-cu-chi-tour", "ho-chi-minh-city-mui-ne-vung-tau-tour", "hanoi-cat-cat-village-fansipan", "hanoi-city-tour-full-day-history-and-culture", "hanoi-sapa-catcat-fansipan-moana-sapa", "ha-noi-cultural-day-trip", "enjoy-ha-nois-unique-cuisine-and-vietnam-hair-washing"],
  },
  {
    slug: "culture", cover: "lantern-making-be-a-real-farmer-at-tra-que-village", name: "Culture", zh: "文化",
    tagline: "Crafts, heritage & people", taglineZh: "手艺、遗产与人文",
    intro: "Make conical hats with artisans, cook with a local family, cycle through craft villages and meet the ethnic communities of the highlands.",
    introZh: "与匠人一起制作斗笠，与当地家庭一起下厨，骑行穿过手工艺村，探访高原少数民族。",
    tours: ["hanoi-bat-trang-chuong-conical-hat-village-quang-phu-cau-ha-long-ninh-binh", "hanoi-cat-cat-village-fansipan", "hanoi-city-tour-full-day-history-and-culture", "ha-noi-cultural-day-trip", "enjoy-ha-nois-unique-cuisine-and-vietnam-hair-washing", "hanoi-food-tour-and-incense-stick-making-village-experience", "duong-lam-ancient-village-private-day-tour-from-hanoi", "lantern-making-be-a-real-farmer-at-tra-que-village", "my-son-holy-land-hoi-an-ancient-town", "linh-ung-pagoda-marble-mountain-hoi-an-ancient-town", "marble-mountain-coconut-forest-hoi-an-ancient-town", "discover-nha-trang-beach-mun-island-fishing-village-mini-beach"],
  },
  {
    slug: "family", cover: "ba-na-hills-discover-the-golden-bridge", name: "Family", zh: "家庭",
    tagline: "Easy pace, fun for all ages", taglineZh: "轻松节奏，老少皆宜",
    intro: "Family-friendly hotels, short transfers and hands-on activities such as basket boat rides, safari parks and beach days.",
    introZh: "亲子友好的酒店、短途接送，以及簸箕船、野生动物园和海滩等互动体验。",
    tours: ["ha-long-da-nang-9-days-8-nights-tour", "camping-trip-two-days-one-night", "than-tai-hot-spring-park-da-nang", "cham-island-full-day-tour", "ba-na-hills-discover-the-golden-bridge", "marble-mountain-coconut-forest-hoi-an-ancient-town", "discover-nha-trang-beach-mun-island-fishing-village-mini-beach", "nha-trang-beach-mini-beach-fishing-village-hon-tam-island", "discover-nha-trang-beach-diving-explore-the-ocean-tour", "discover-nha-trang-beach", "nha-trang-beach-hon-tam-island-tour", "walking-under-the-sea-tour-nha-trang-beach"],
  },
  {
    slug: "honeymoon", cover: "glamping-trip-two-days-one-night", name: "Honeymoon", zh: "蜜月",
    tagline: "Romantic escapes for two", taglineZh: "两个人的浪漫之旅",
    intro: "Sunset cruises, dinners on the sand and island villas: private trips planned just for the two of you to celebrate together.",
    introZh: "日落游轮、沙滩晚餐与海岛别墅：专为两人打造的私人旅程，一起庆祝爱情。",
    tours: ["glamping-trip-two-days-one-night", "sunset-cocktail-and-dinner-cruise", "sunset-barbecue-on-a-private-lagoon", "vietnam-a-special-honeymoon", "hanoi-bicycle-sunset-tour", "sunset-and-night-squid-fishing-tour"],
  },
  {
    slug: "classic", cover: "ha-long-4-days-3-nights-tour-from-hanoi", name: "Classic", zh: "经典",
    tagline: "Vietnam's must-see icons", taglineZh: "越南必游经典",
    intro: "Perfect for a first visit: private tours covering the best-known sights from north to south: Hanoi, Ha Long Bay, Hoi An, Saigon and the Mekong Delta.",
    introZh: "首次来越南的理想之选：私人行程覆盖从北到南最著名的景点：河内、下龙湾、会安、西贡和湄公河三角洲。",
    tours: ["ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour", "hanoi-ha-long-sapa-da-nang-ho-chi-minh", "hanoi-ha-long-ninh-binh-da-nang-phu-quoc", "ha-long-da-nang-9-days-8-nights-tour", "ha-long-ninh-binh-sapa-8-days-7-nights-tour", "hanoi-ha-long-ninh-binh-sapa", "hanoi-bat-trang-chuong-conical-hat-village-quang-phu-cau-ha-long-ninh-binh", "ha-long-4-days-3-nights-tour-from-hanoi", "hanoi-city-tour-full-day-history-and-culture", "ha-noi-city-tour-01-day-trip", "discover-nha-trang-city-tour", "ho-chi-minh-city-tour-and-cu-chi-tunnels"],
  },
  {
    slug: "photography", cover: "hanoi-sapa-cat-cat-lao-chai-ta-van-bac-ha", name: "Photography", zh: "摄影",
    tagline: "Golden hours & epic views", taglineZh: "黄金时刻与壮丽风光",
    intro: "Tours timed around the best natural light: terraced rice fields, lotus lakes, misty mountains and fishing villages at dawn.",
    introZh: "按最佳光线安排行程：梯田、荷花湖、云雾山峦与黎明时分的渔村。",
    tours: ["hanoi-ha-long-sapa-da-nang-ho-chi-minh", "ha-long-ninh-binh-sapa-8-days-7-nights-tour", "hanoi-ha-long-ninh-binh-sapa", "ha-giang-cao-bang-ban-gioc-waterfall-ba-be-lake", "ha-giang-cao-bang-easy-rider-5-days", "ha-giang-easy-rider-4-days", "hanoi-sapa-cat-cat-lao-chai-ta-van-tram-ton-silver-waterfall", "hanoi-sapa-cat-cat-lao-chai-ta-van-bac-ha", "hanoi-sapa-catcat-fansipan-glass-bridge-lonely-tree-silver-waterfall-moana-check-in-point", "hanoi-sapa-catcat-fansipan-glass-bridge-lonely-tree-silver-waterfall-moana-view", "cao-bang-3-days-2-nights", "ha-giang-easy-rider-3-days"],
  },
  {
    slug: "tailor-made", cover: "/images/tailor-hoian.webp", name: "Tailor-made", zh: "私人定制",
    tagline: "Designed around you", taglineZh: "为您量身打造",
    intro: "Choose your dates, pace, hotel class (3–5 stars) and budget. Tell us what you love, and we design a private itinerary just for you.",
    introZh: "您选择日期、节奏、酒店等级（3–5星）和预算，告诉我们您的喜好，我们为您设计专属私人行程。",
    tours: ["ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour", "hanoi-ha-long-sapa-da-nang-ho-chi-minh", "hanoi-ha-long-ninh-binh-da-nang-phu-quoc", "ha-long-da-nang-9-days-8-nights-tour", "duong-lam-ancient-village-private-day-tour-from-hanoi", "hue-dmz-1-day-private-tour", "sunset-barbecue-on-a-private-lagoon", "vietnam-tour-30-days-29-nights", "vietnam-tour-22-days-21-nights", "vietnam-tour-18-days-17-nights", "vietnam-family-adventure", "vietnam-vacation-tour-16-days-15-nights"],
  },
];

export const findTheme = (slug: string) => TOUR_THEMES.find((t) => t.slug === slug) ?? null;
