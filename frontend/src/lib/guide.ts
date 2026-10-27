// Chủ đề cẩm nang du lịch (menu nhiều cấp kiểu localvietnam.com). Bài viết gốc chỉ có chuyên mục News/Blog,
// nên bài được xếp vào chủ đề theo từ khoá trong TIÊU ĐỀ (tóm tắt hay nhắc lan man nên dễ xếp sai). Mục có `href` dẫn sang trang riêng thay vì lọc bài.
export type GuideTopic = { slug: string; en: string; zh: string; re?: RegExp; href?: string };
export type GuideGroup = { title: string; zh: string; topics: GuideTopic[] };

export const GUIDE_GROUPS: GuideGroup[] = [
  {
    title: "Destinations", zh: "目的地",
    topics: [
      { slug: "north", en: "North Vietnam", zh: "越南北部", re: /\b(ha ?noi|sapa|ha ?giang|ninh binh|ha ?long|halong|lan ha|bai tu long|cao bang|ban gioc|moc chau|mu cang chai|northwest|north(ern)? vietnam|lao cai|yen bai|hoang su phi|tam coc|trang an|mua cave|thung nham|duong lam|bat trang|van long|cuc phuong|quang phu cau|ha thai|bo hon|in the north)\b/i },
      { slug: "central", en: "Central Vietnam", zh: "越南中部", re: /\b(hue|da ?nang|hoi ?an|quang binh|phong nha|nha trang|quy nhon|binh hung|central vietnam|my son|ba na|cham island|son tra|bay mau|dong giang|than tai|han river|hon tam|hon mun|binh ba|vinh hy|ha my)\b/i },
      { slug: "south", en: "South Vietnam", zh: "越南南部", re: /\b(ho chi minh|saigon|mekong|phu quoc|mui ne|vung tau|can tho|ben tre|da ?lat|cu chi|south(ern)? vietnam|con dao|binh thuan|phu quy|ham thuan)\b/i },
    ],
  },
  {
    title: "Need to know", zh: "旅行须知",
    topics: [
      { slug: "visa", en: "Visa and fast track", zh: "签证与快速通关", href: "/visa" },
      { slug: "money", en: "Money and costs", zh: "货币与花费", href: "/travel-guide/vietnam-currency-money-tips", re: /\b(costs?|prices?|budget|money|currency|exchange rate|tipping|atm)\b/i },
      { slug: "sim", en: "SIM and internet", zh: "电话卡与网络", href: "/travel-guide/vietnam-sim-card-internet", re: /\b(sim card|e-?sim|internet|wi-?fi|mobile data)\b/i },
      { slug: "tipping", en: "Tipping and etiquette", zh: "小费与礼仪", href: "/travel-guide/tipping-etiquette-vietnam" },
      { slug: "tips", en: "Travel tips and safety", zh: "旅行贴士与安全", href: "/travel-guide/is-vietnam-safe", re: /\b(tips?|essential|need to know|things to know|what to (pack|bring|wear|buy|prepare)|prepare for|safe|safety|scams?|first-time)\b/i },
    ],
  },
  {
    title: "Vietnam by month", zh: "越南月历",
    topics: [
      { slug: "seasons", en: "Best time and weather", zh: "最佳时间与天气", href: "/travel-guide/best-time-to-visit-vietnam", re: /\b(best time|seasons?|seasonal|weather|climate|months? of the year|by month)\b/i },
      { slug: "spring", en: "Spring (Feb – Apr)", zh: "春季（2–4月）", re: /\b(spring season|in spring|february|march|april|tet|cherry blossom|plum blossom|new year)\b/i },
      { slug: "summer", en: "Summer (May – Aug)", zh: "夏季（5–8月）", re: /\b(summer|in may|may 1|june|july|august|lotus)\b/i },
      { slug: "autumn", en: "Autumn and winter (Sep – Jan)", zh: "秋冬（9–1月）", re: /\b(autumn|winter|september|october|november|december|january|ripe rice|golden rice|buckwheat)\b/i },
    ],
  },
  {
    title: "Getting around", zh: "交通出行",
    topics: [
      { slug: "transport", en: "Trains, buses and flights", zh: "火车、巴士与航班", re: /\b(train|bus|flights?|airport|taxi|grab|transport|getting around|how to (travel|get)|distance from|traveling from|travelling from|sleeper)\b/i },
      { slug: "boats", en: "Cruises and boats", zh: "游轮与游船", re: /\b(cruises?|boats?|kayak|junk|sailing)\b/i },
      { slug: "car", en: "Private car and motorbike", zh: "包车与摩托", href: "/car-rental" },
    ],
  },
];

export const GUIDE_TOPICS = GUIDE_GROUPS.flatMap((g) => g.topics);
export const findTopic = (slug: string) => GUIDE_TOPICS.find((t) => t.slug === slug && t.re) ?? null;
// Bài có thuộc chủ đề không: chỉ xét tiêu đề
export const inTopic = (t: GuideTopic, post: { title: string }) => !!t.re?.test(post.title);
export const topicHref = (t: GuideTopic) => t.href ?? `/news?topic=${t.slug}`;

// Tác giả: dữ liệu gốc không ghi tác giả nên dùng tên đội ngũ biên tập
export const DEFAULT_AUTHOR = { name: "Vietlook Travel Team", zh: "Vietlook 旅行编辑部", role: "Local travel experts in Hanoi", roleZh: "河内本地旅行专家" };
