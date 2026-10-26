// Chủ đề cẩm nang du lịch (menu nhiều cấp kiểu localvietnam.com). Bài viết gốc chỉ có chuyên mục News/Blog,
// nên bài được xếp vào chủ đề theo từ khoá trong tiêu đề + tóm tắt. Mục có `href` dẫn sang trang riêng thay vì lọc bài.
export type GuideTopic = { slug: string; en: string; zh: string; re?: RegExp; href?: string };
export type GuideGroup = { title: string; zh: string; topics: GuideTopic[] };

export const GUIDE_GROUPS: GuideGroup[] = [
  {
    title: "Destinations", zh: "目的地",
    topics: [
      { slug: "north", en: "North Vietnam", zh: "越南北部", re: /\b(ha ?noi|sapa|ha ?giang|ninh binh|ha ?long|cao bang|moc chau|mu cang chai|northwest|north(ern)? vietnam|lao cai|yen bai|hoang su phi|tam coc|trang an)\b/i },
      { slug: "central", en: "Central Vietnam", zh: "越南中部", re: /\b(hue|da ?nang|hoi ?an|quang binh|phong nha|nha trang|quy nhon|central vietnam|my son|ba na|cham island)\b/i },
      { slug: "south", en: "South Vietnam", zh: "越南南部", re: /\b(ho chi minh|saigon|mekong|phu quoc|mui ne|vung tau|can tho|da ?lat|cu chi|south(ern)? vietnam|con dao)\b/i },
    ],
  },
  {
    title: "Need to know", zh: "旅行须知",
    topics: [
      { slug: "visa", en: "Visa & fast track", zh: "签证与快速通关", href: "/visa" },
      { slug: "money", en: "Money & costs", zh: "货币与花费", re: /\b(currency|money|dong|vnd|atm|exchange|tipping|cash|budget|cost)\b/i },
      { slug: "sim", en: "SIM & internet", zh: "电话卡与网络", re: /\b(sim|e-?sim|internet|wi-?fi|phone card|mobile data)\b/i },
      { slug: "tips", en: "Travel tips & safety", zh: "旅行贴士与安全", re: /\b(tips?|essential|need to know|safe|safety|scam|health|what to (pack|bring|wear))\b/i },
    ],
  },
  {
    title: "Vietnam by month", zh: "越南月历",
    topics: [
      { slug: "seasons", en: "Best time & weather", zh: "最佳时间与天气", re: /\b(by month|season|seasonal|weather|climate|best time)\b/i },
      { slug: "spring", en: "Spring (Feb – Apr)", zh: "春季（2–4月）", re: /\b(spring|february|march|april|tet|cherry blossom|plum blossom)\b/i },
      { slug: "summer", en: "Summer (May – Aug)", zh: "夏季（5–8月）", re: /\b(summer|may|june|july|august|lotus)\b/i },
      { slug: "autumn", en: "Autumn & winter (Sep – Jan)", zh: "秋冬（9–1月）", re: /\b(autumn|fall|winter|september|october|november|december|january|golden rice|buckwheat)\b/i },
    ],
  },
  {
    title: "Getting around", zh: "交通出行",
    topics: [
      { slug: "transport", en: "Trains, buses & flights", zh: "火车、巴士与航班", re: /\b(train|bus|flight|fly|airport|taxi|grab|transport|getting around|sleeper)\b/i },
      { slug: "boats", en: "Cruises & boats", zh: "游轮与游船", re: /\b(cruise|boat|kayak|junk)\b/i },
      { slug: "car", en: "Private car & motorbike", zh: "包车与摩托", href: "/car-rental" },
    ],
  },
];

export const GUIDE_TOPICS = GUIDE_GROUPS.flatMap((g) => g.topics);
export const findTopic = (slug: string) => GUIDE_TOPICS.find((t) => t.slug === slug && t.re) ?? null;
export const topicHref = (t: GuideTopic) => t.href ?? `/news?topic=${t.slug}`;

// Tác giả: dữ liệu gốc không ghi tác giả nên dùng tên đội ngũ biên tập
export const DEFAULT_AUTHOR = { name: "Vietlook Travel Team", zh: "Vietlook 旅行编辑部", role: "Local travel experts in Hanoi", roleZh: "河内本地旅行专家" };
