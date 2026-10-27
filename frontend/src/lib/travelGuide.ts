// Bài cẩm nang "Cần biết" / "Theo tháng" (nội dung lấy từ vietlooktravel-operators.vercel.app/travel-guide/*).
// `topic` = slug chủ đề trong guide.ts (link "Xem tất cả"); `related` = từ khoá trong TIÊU ĐỀ bài để lấy tin thật sự liên quan
// (không có bài nào khớp thì trang ẩn mục tin liên quan); `tours` = query tour tham khảo (như getTours).
type Tx = { en: string; zh: string };
export type GuideSection = { title: Tx; items: Tx[] };
export type TravelGuide = { slug: string; topic: string; related: RegExp; title: Tx; intro: Tx; sections: GuideSection[]; tours: string; updated: string };

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    slug: "vietnam-currency-money-tips", topic: "money", related: /\b(costs?|prices?|budget|money|currency|exchange rate|atm)\b/i, tours: "?category=ha-noi-tour&limit=4", updated: "2026-09-26",
    title: { en: "Money in Vietnam: Currency, ATMs and Card Payments", zh: "越南货币：现金、ATM与刷卡支付" },
    intro: { en: "The currency is the Vietnamese dong (VND). US$1 is roughly 26,000 VND, so prices quickly reach hundreds of thousands. Check the zeros on the 100,000 and 10,000 VND notes – they are easy to confuse.", zh: "越南货币为越南盾（VND），1美元约合26,000越南盾，价格动辄几十万。请留意100,000和10,000面额纸币上的零，很容易混淆。" },
    sections: [
      { title: { en: "Cash or card?", zh: "现金还是刷卡？" }, items: [
        { en: "Hotels, restaurants and shops in cities accept Visa and Mastercard.", zh: "城市里的酒店、餐厅和商店均可使用Visa和万事达卡。" },
        { en: "Street food, markets and small homestays take cash only.", zh: "街头小吃、市场和小型民宿只收现金。" },
        { en: "Grab (taxi and food delivery) accepts international cards in the app.", zh: "Grab（打车与外卖）可在应用内绑定国际信用卡。" },
      ] },
      { title: { en: "ATMs and exchange", zh: "ATM与换汇" }, items: [
        { en: "ATMs are widespread in cities.", zh: "城市里ATM随处可见。" },
        { en: "Most ATMs limit withdrawals to 3–5 million VND per transaction.", zh: "大多数ATM单笔取款上限为300–500万越南盾。" },
        { en: "Gold shops and banks give good rates for clean US dollar or euro notes.", zh: "金店和银行对干净的美元或欧元纸币汇率较好。" },
      ] },
      { title: { en: "Paying for your Vietlook tour", zh: "如何支付Vietlook行程" }, items: [
        { en: "Vietlook never asks for card details online.", zh: "Vietlook从不在网上索取银行卡信息。" },
        { en: "After you confirm your itinerary, you receive bank transfer details.", zh: "确认行程后，您将收到银行转账信息。" },
        { en: "Or pay in person at our Hanoi office.", zh: "也可以到我们的河内办公室当面支付。" },
      ] },
    ],
  },
  {
    slug: "vietnam-sim-card-internet", topic: "sim", related: /\b(sim card|e-?sim|internet|wi-?fi|mobile data|phone)\b/i, tours: "?category=ha-giang-tour&limit=4", updated: "2026-09-24",
    title: { en: "SIM Cards, eSIM and Internet in Vietnam", zh: "越南电话卡、eSIM与网络" },
    intro: { en: "Mobile internet in Vietnam is fast and cheap, with 4G (and growing 5G) coverage reaching many mountain areas.", zh: "越南的移动网络又快又便宜，4G（以及日益普及的5G）已覆盖许多山区。" },
    sections: [
      { title: { en: "Which network?", zh: "选哪家运营商？" }, items: [
        { en: "Viettel has the strongest coverage in remote areas such as Ha Giang and Sapa.", zh: "Viettel在河江、沙坝等偏远地区信号最好。" },
        { en: "Vinaphone and Mobifone work well in cities.", zh: "Vinaphone和Mobifone在城市表现良好。" },
      ] },
      { title: { en: "Where to buy", zh: "在哪里购买" }, items: [
        { en: "Tourist SIMs with data are sold in airport arrival halls.", zh: "机场到达大厅有出售带流量的旅游电话卡。" },
        { en: "Bring your passport – registration is required.", zh: "需要护照登记实名。" },
        { en: "Many phones support eSIM, which you can install before leaving home.", zh: "许多手机支持eSIM，可在出发前安装好。" },
      ] },
      { title: { en: "Useful apps", zh: "实用应用" }, items: [
        { en: "Grab for taxis, motorbike rides and food delivery.", zh: "Grab：打车、摩托车出行和外卖。" },
        { en: "Google Maps and Google Translate – download the Vietnamese pack for offline use.", zh: "谷歌地图和谷歌翻译——下载越南语离线包。" },
        { en: "WhatsApp, WeChat or Zalo to reach the Vietlook team around the clock.", zh: "通过WhatsApp、微信或Zalo全天候联系Vietlook团队。" },
      ] },
    ],
  },
  {
    slug: "best-time-to-visit-vietnam", topic: "seasons", related: /\b(best time|seasons?|seasonal|weather|climate|months? of the year)\b/i, tours: "?category=vietnam-tours&limit=4", updated: "2026-09-20",
    title: { en: "Best Time to Visit Vietnam: Region by Region", zh: "越南最佳旅行时间：分区指南" },
    intro: { en: "Vietnam has three climate zones, so there is no single best season for the whole country – plan by region.", zh: "越南有三个气候区，没有全国统一的最佳季节——请按地区规划。" },
    sections: [
      { title: { en: "North Vietnam: October to April", zh: "越南北部：10月至次年4月" }, items: [
        { en: "Autumn and spring are dry and comfortable.", zh: "秋季和春季干爽宜人。" },
        { en: "December to February is cold in the mountains.", zh: "12月至2月山区较冷。" },
        { en: "May to September is hot with heavy showers, but green and lush.", zh: "5月至9月炎热多阵雨，但满眼翠绿。" },
      ] },
      { title: { en: "Central Vietnam: February to August", zh: "越南中部：2月至8月" }, items: [
        { en: "A long, sunny beach season.", zh: "漫长而阳光充足的海滩季。" },
        { en: "September to December brings heavy rain, with typhoon and flood risk.", zh: "9月至12月多暴雨，有台风和洪水风险。" },
      ] },
      { title: { en: "South Vietnam: December to April", zh: "越南南部：12月至次年4月" }, items: [
        { en: "Dry season with clear skies.", zh: "旱季，天空晴朗。" },
        { en: "May to November is the green season, usually with short afternoon showers.", zh: "5月至11月为绿季，通常午后有短暂阵雨。" },
      ] },
      { title: { en: "Our tip", zh: "我们的建议" }, items: [
        { en: "For a North-to-South trip, March–April and late September–November offer the best balance.", zh: "纵贯南北的行程，3–4月及9月下旬至11月最为平衡。" },
      ] },
    ],
  },
  {
    slug: "is-vietnam-safe", topic: "tips", related: /\b(safe|safety|scams?|things to know|need to know|essential travel tips|first-time)\b/i, tours: "?category=sapa-tour&limit=4", updated: "2026-09-22",
    title: { en: "Is Vietnam Safe? Honest Advice from Locals", zh: "越南安全吗？本地人的真心建议" },
    intro: { en: "Vietnam is very safe for travellers, including families and solo women. Violent crime against visitors is rare – the main concerns are traffic and minor scams.", zh: "越南对游客非常安全，包括家庭和独行女性。针对游客的暴力犯罪极少，主要需注意交通和小骗局。" },
    sections: [
      { title: { en: "Traffic", zh: "交通" }, items: [
        { en: "Cross the street slowly and steadily without running – motorbikes will flow around you.", zh: "过马路时缓慢匀速前行，不要奔跑，摩托车会自然绕开您。" },
        { en: "Don't rent a motorbike without a valid licence and riding experience – hire an easy-rider driver instead.", zh: "没有有效驾照和骑行经验请勿租摩托车，可请“easy-rider”司机代驾。" },
      ] },
      { title: { en: "Petty theft and scams", zh: "小偷与骗局" }, items: [
        { en: "Keep phones away from the roadside in busy cities.", zh: "在繁华城市里，手机不要靠近马路一侧。" },
        { en: "Use Grab or hotel taxis, and agree on cyclo prices before the ride.", zh: "使用Grab或酒店出租车，坐三轮车前先谈好价格。" },
        { en: "Check your change – some banknotes look similar.", zh: "仔细核对找零，部分纸币长得很像。" },
      ] },
      { title: { en: "Health", zh: "健康" }, items: [
        { en: "Drink bottled or filtered water.", zh: "饮用瓶装水或过滤水。" },
        { en: "Use mosquito repellent and carry travel insurance.", zh: "使用驱蚊剂并购买旅游保险。" },
        { en: "Vietlook gives you a 24/7 local contact if anything goes wrong.", zh: "Vietlook提供24/7本地联系人，随时协助。" },
      ] },
    ],
  },
  {
    slug: "tipping-etiquette-vietnam", topic: "tips", related: /\b(tipping|etiquette|customs|culture and traditions|things to know when traveling to vietnam)\b/i, tours: "?category=cruise-tour&limit=4", updated: "2026-09-18",
    title: { en: "Tipping and Local Etiquette in Vietnam", zh: "越南小费与当地礼仪" },
    intro: { en: "Tipping is not required in Vietnam, but it is appreciated – especially in tourism. Here is how much to tip, plus simple do's and don'ts locals appreciate.", zh: "在越南小费并非强制，但很受欢迎，尤其在旅游业。以下是小费标准和当地人欣赏的礼仪。" },
    sections: [
      { title: { en: "Guide to tipping", zh: "小费指南" }, items: [
        { en: "Private guide: US$5–10 per traveller per day.", zh: "私人导游：每位旅客每天5–10美元。" },
        { en: "Driver: US$3–5 per traveller per day.", zh: "司机：每位旅客每天3–5美元。" },
        { en: "Cruise staff: a tip box is usually provided on board.", zh: "游轮员工：船上通常设有小费箱。" },
        { en: "Restaurants: round up the bill, or 5–10% in tourist areas.", zh: "餐厅：凑整账单，旅游区可付5–10%。" },
      ] },
      { title: { en: "Do's and don'ts", zh: "礼仪须知" }, items: [
        { en: "Dress modestly at temples and the Ho Chi Minh Mausoleum – cover shoulders and knees.", zh: "参观寺庙和胡志明陵时着装得体，遮住肩膀和膝盖。" },
        { en: "Remove your shoes when entering homes and some pagodas.", zh: "进入民宅和部分寺庙时请脱鞋。" },
        { en: "Ask before photographing people, especially in ethnic minority villages.", zh: "拍摄他人前先征得同意，尤其在少数民族村寨。" },
        { en: "Use both hands when handing things to someone.", zh: "递东西给别人时用双手，以示尊重。" },
      ] },
    ],
  },
];

export const findGuide = (slug: string) => TRAVEL_GUIDES.find((g) => g.slug === slug) ?? null;
