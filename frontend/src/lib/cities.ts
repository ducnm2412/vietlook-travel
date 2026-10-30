// Nội dung trang điểm đến /destinations/<path>: giới thiệu + điểm tham quan (EN/中文), liên kết dữ liệu tour (dest), xe riêng (car)
// và bài viết (posts: regex khớp tiêu đề). Văn bản giới thiệu là mô tả chung về điểm đến, Vietlook có thể chỉnh lại.
export type Spot = { en: string; zh: string; d: string; dzh: string };
export type City = {
  path: string;
  dest: string;
  car?: string;
  name: string;
  zh: string;
  tag: string;
  tagZh: string;
  intro: string;
  introZh: string;
  spots: Spot[];
  posts: RegExp;
  // Ảnh poster (cắt dán công trình + tên thành phố) thay cho lưới ảnh ở phần giới thiệu
  poster?: string;
  // Điểm đến không có mã trong dữ liệu tour: lọc tour theo tiêu đề (match) và link danh sách /tours?q=<q>
  match?: RegExp;
  q?: string;
  // Ảnh thêm (đặt trước ảnh tour) cho lưới ảnh
  photos?: string[];
};

export const CITIES: City[] = [
  {
    path: "ha-noi", dest: "ha-noi-tour", car: "ha-noi", poster: "/images/destinations/ha-noi-poster.webp", name: "Ha Noi", zh: "河内", posts: /ha ?noi/i,
    tag: "A thousand-year-old capital of lakes, temples and street food", tagZh: "千年古都：湖泊、寺庙与街头美食",
    intro: "Vietnam's capital mixes French colonial boulevards, quiet lakes and the busy 36 streets of the Old Quarter. Start your trip with history, coffee culture and some of the best street food in Asia.",
    introZh: "越南首都融合了法式林荫大道、宁静湖泊和热闹的三十六行街老城区。在这里感受历史、咖啡文化和亚洲最好的街头美食。",
    spots: [
      { en: "Hoan Kiem Lake & Old Quarter", zh: "还剑湖与老城区", d: "The heart of the city, best explored on foot or by cyclo.", dzh: "城市中心，适合步行或乘坐人力三轮车游览。" },
      { en: "Temple of Literature", zh: "文庙", d: "Vietnam's first university, founded in 1070.", dzh: "越南第一所大学，建于1070年。" },
      { en: "Ho Chi Minh Mausoleum complex", zh: "胡志明陵及周边", d: "Ba Dinh Square, the Presidential Palace and One Pillar Pagoda.", dzh: "巴亭广场、主席府和独柱寺。" },
      { en: "Train Street & street food", zh: "火车街与街头美食", d: "Pho, bun cha and egg coffee in narrow local lanes.", dzh: "在小巷中品尝河粉、烤肉米线和鸡蛋咖啡。" },
    ],
  },
  {
    path: "ha-long-bay", dest: "ha-long-tour", poster: "/images/destinations/ha-long-poster.webp", name: "Ha Long Bay", zh: "下龙湾", posts: /ha ?long|lan ha|cat ba/i,
    tag: "Thousands of limestone islands on emerald water", tagZh: "翡翠海面上的数千座石灰岩岛屿",
    intro: "A UNESCO World Heritage Site of nearly 2,000 limestone islets. Spend a night on a cruise, kayak into hidden lagoons and watch the sunrise over the bay.",
    introZh: "联合国教科文组织世界遗产，拥有近2000座石灰岩小岛。在游轮上过夜，划皮艇探访隐秘泻湖，欣赏海湾日出。",
    spots: [
      { en: "Overnight cruise", zh: "过夜游轮", d: "Cabins with sea views, cooking classes and sunset parties.", dzh: "海景客舱、烹饪课和日落派对。" },
      { en: "Sung Sot Cave", zh: "惊讶洞", d: "One of the largest and most beautiful caves in the bay.", dzh: "海湾中最大、最美的溶洞之一。" },
      { en: "Ti Top Island", zh: "迪托普岛", d: "Climb to the viewpoint for a panorama of the bay.", dzh: "登上观景台俯瞰整个海湾。" },
      { en: "Lan Ha Bay kayaking", zh: "兰夏湾皮划艇", d: "Quieter waters, floating villages and small beaches.", dzh: "更宁静的水域、水上村庄和小海滩。" },
    ],
  },
  {
    path: "sapa", poster: "/images/destinations/sapa-poster.webp", dest: "sapa-tour", name: "Sapa", zh: "沙坝", posts: /sa ?pa|fansipan/i,
    tag: "Rice terraces and ethnic villages in the clouds", tagZh: "云端梯田与少数民族村寨",
    intro: "High in the Hoang Lien Son mountains, Sapa is home to Hmong, Dao and Tay communities. Trek between villages, stay with local families and ride the cable car to Fansipan, the roof of Indochina.",
    introZh: "沙坝位于黄连山脉高处，是苗族、瑶族和岱族的家园。在村寨间徒步、入住当地民宿，乘缆车登上印度支那屋脊番西邦峰。",
    spots: [
      { en: "Fansipan peak", zh: "番西邦峰", d: "3,143 m, reached by one of the world's longest cable cars.", dzh: "海拔3143米，乘坐世界最长缆车之一登顶。" },
      { en: "Muong Hoa Valley", zh: "孟花山谷", d: "The classic trek through Lao Chai and Ta Van villages.", dzh: "穿越老寨和达万村的经典徒步路线。" },
      { en: "Cat Cat Village", zh: "猫猫村", d: "A Hmong village with waterfalls and handicrafts.", dzh: "有瀑布和手工艺品的苗族村寨。" },
      { en: "Bac Ha Sunday market", zh: "北河周日集市", d: "The most colourful ethnic market in the north.", dzh: "北部最多彩的少数民族集市。" },
    ],
  },
  {
    path: "ha-giang", poster: "/images/destinations/hagiang-poster.webp", dest: "ha-giang-tour", name: "Ha Giang", zh: "河江", posts: /ha ?giang|dong van|ma pi leng/i,
    tag: "Vietnam's wildest mountain loop", tagZh: "越南最壮观的山地环线",
    intro: "The far north of Vietnam is a land of karst plateaus, deep canyons and ethnic markets. The Ha Giang Loop is one of Southeast Asia's great road trips – by jeep, by private car or on the back of an easy rider.",
    introZh: "越南最北端，喀斯特高原、深峡谷与民族集市交织。河江环线是东南亚最经典的自驾之旅之一，可乘吉普车、专车或摩托车体验。",
    spots: [
      { en: "Ma Pi Leng Pass", zh: "马皮冷山口", d: "A cliff road above the turquoise Nho Que River.", dzh: "俯瞰碧绿瑙桂河的悬崖公路。" },
      { en: "Dong Van Karst Plateau", zh: "同文喀斯特高原", d: "A UNESCO Global Geopark with an old town.", dzh: "联合国教科文组织世界地质公园，有古镇。" },
      { en: "Lung Cu Flag Tower", zh: "龙鼓国旗塔", d: "The northernmost point of Vietnam.", dzh: "越南最北端。" },
      { en: "Hmong King's Palace", zh: "苗王宫", d: "A historic mansion in Sa Phin valley.", dzh: "位于萨芬山谷的历史宅邸。" },
    ],
  },
  {
    path: "ninh-binh", poster: "/images/destinations/ninhbinh-poster.webp", dest: "ninh-binh-tour", name: "Ninh Binh", zh: "宁平", posts: /ninh binh|trang an|tam coc/i,
    tag: "Ha Long Bay on land", tagZh: "陆上下龙湾",
    intro: "Two hours from Hanoi, Ninh Binh's limestone peaks rise from rice fields and rivers. Glide through caves on a rowing boat, cycle past villages and visit Vietnam's first capital, Hoa Lu.",
    introZh: "距河内两小时车程，宁平的石灰岩山峰矗立在稻田和河流之间。乘手划船穿越溶洞，骑行乡村，参观越南古都华闾。",
    spots: [
      { en: "Trang An boat trip", zh: "长安乘船游", d: "A UNESCO landscape of rivers, caves and temples.", dzh: "联合国教科文组织遗产：河流、溶洞与寺庙。" },
      { en: "Tam Coc", zh: "三谷", d: "Rice fields between karst cliffs, best in May–June.", dzh: "喀斯特峭壁间的稻田，5–6月最美。" },
      { en: "Mua Cave viewpoint", zh: "舞洞观景台", d: "500 steps to a dragon-topped view over Tam Coc.", dzh: "攀登500级台阶俯瞰三谷全景。" },
      { en: "Hoa Lu ancient capital", zh: "华闾古都", d: "Temples of the Dinh and Le dynasties.", dzh: "丁朝和黎朝的庙宇。" },
    ],
  },
  {
    path: "cao-bang", poster: "/images/destinations/caobang-poster.webp", dest: "cao-bang-tour", name: "Cao Bang", zh: "高平", posts: /cao bang|ban gioc/i,
    tag: "Waterfalls and quiet valleys on the border", tagZh: "边境上的瀑布与静谧山谷",
    intro: "A remote province on the Chinese border, Cao Bang rewards travellers with Ban Gioc Waterfall, green valleys and Tay and Nung villages far from the crowds.",
    introZh: "高平地处中越边境，远离人群，拥有板约瀑布、翠绿山谷以及岱族和侬族村寨。",
    spots: [
      { en: "Ban Gioc Waterfall", zh: "板约瀑布", d: "One of the largest waterfalls in Southeast Asia.", dzh: "东南亚最大的瀑布之一。" },
      { en: "Nguom Ngao Cave", zh: "鄂鳌洞", d: "A long cave with impressive stalactites.", dzh: "钟乳石壮观的长溶洞。" },
      { en: "Pac Bo", zh: "北坡", d: "Historic site where Ho Chi Minh returned in 1941.", dzh: "1941年胡志明回国的历史遗址。" },
      { en: "Thang Hen Lake", zh: "胜痕湖", d: "A mountain lake surrounded by karst hills.", dzh: "群山环绕的高山湖泊。" },
    ],
  },
  {
    path: "hue", poster: "/images/destinations/hue-poster.webp", dest: "hue-tour", name: "Hue", zh: "顺化", posts: /\bhue\b/i,
    tag: "The imperial city of the Nguyen dynasty", tagZh: "阮朝皇城",
    intro: "Vietnam's last royal capital sits on the Perfume River. Explore the Imperial Citadel, the tombs of the emperors and the city's refined royal cuisine.",
    introZh: "越南最后的皇都坐落在香江畔。探访皇城、帝王陵墓，品尝精致的宫廷美食。",
    spots: [
      { en: "Imperial Citadel", zh: "顺化皇城", d: "The walled palace complex of the Nguyen emperors.", dzh: "阮朝皇帝的城池宫殿群。" },
      { en: "Royal tombs", zh: "帝王陵墓", d: "Tu Duc, Minh Mang and Khai Dinh mausoleums.", dzh: "嗣德、明命和启定陵。" },
      { en: "Thien Mu Pagoda", zh: "天姥寺", d: "A seven-storey tower above the Perfume River.", dzh: "香江畔的七层宝塔。" },
      { en: "Perfume River boat trip", zh: "香江游船", d: "Dragon boats and traditional music at night.", dzh: "龙舟与夜间传统音乐表演。" },
    ],
  },
  {
    path: "da-nang", poster: "/images/destinations/danang-poster.webp", dest: "da-nang-tour", car: "da-nang", name: "Da Nang", zh: "岘港", posts: /da ?nang|ba na|golden bridge/i,
    tag: "Beaches, mountains and the Golden Bridge", tagZh: "海滩、山峦与金桥",
    intro: "Central Vietnam's modern coastal city, with long sandy beaches, the Marble Mountains and Ba Na Hills. It is also the gateway to Hoi An and Hue.",
    introZh: "越南中部的现代海滨城市，拥有绵长的沙滩、五行山和巴拿山，也是前往会安和顺化的门户。",
    spots: [
      { en: "Ba Na Hills & Golden Bridge", zh: "巴拿山与金桥", d: "The famous bridge held by two giant stone hands.", dzh: "由两只巨手托起的著名桥梁。" },
      { en: "My Khe Beach", zh: "美溪海滩", d: "A long city beach for swimming and seafood.", dzh: "适合游泳和吃海鲜的城市海滩。" },
      { en: "Marble Mountains", zh: "五行山", d: "Caves and pagodas inside five marble hills.", dzh: "五座大理石山中的溶洞与寺庙。" },
      { en: "Son Tra Peninsula", zh: "山茶半岛", d: "Linh Ung Pagoda and wild forest views.", dzh: "灵应寺与原始森林景观。" },
    ],
  },
  {
    path: "hoi-an", dest: "hoi-an", name: "Hoi An", zh: "会安", posts: /hoi an/i,
    tag: "A lantern-lit ancient trading port", tagZh: "灯笼点亮的古商港",
    intro: "Hoi An's yellow merchant houses, lanterns and riverside cafés make it one of Vietnam's most charming towns. Have clothes tailored, cycle to the rice fields and take a basket boat in the coconut forest.",
    introZh: "会安的黄色商屋、灯笼和河畔咖啡馆使其成为越南最迷人的小镇之一。定制服装、骑车穿过稻田、在椰林里乘坐簸箕船。",
    spots: [
      { en: "Ancient Town & Japanese Bridge", zh: "古镇与日本廊桥", d: "A UNESCO town best seen at night with lanterns.", dzh: "联合国教科文组织古镇，夜晚灯笼最美。" },
      { en: "Bay Mau coconut forest", zh: "七亩椰林", d: "Basket-boat rides through water coconut palms.", dzh: "乘簸箕船穿行水椰林。" },
      { en: "My Son Sanctuary", zh: "美山圣地", d: "Ruins of Cham Hindu temples in the jungle.", dzh: "丛林中的占婆印度教神庙遗址。" },
      { en: "An Bang Beach", zh: "安邦海滩", d: "A relaxed beach a short ride from town.", dzh: "离镇上不远的悠闲海滩。" },
    ],
  },
  {
    path: "quang-binh", dest: "quang-binh-tour", name: "Quang Binh", zh: "广平", posts: /quang binh|phong nha|son doong/i,
    tag: "The kingdom of caves", tagZh: "溶洞王国",
    intro: "Phong Nha – Ke Bang National Park hides some of the world's largest caves. Paddle into Phong Nha Cave, walk through Paradise Cave or join an adventure expedition.",
    introZh: "风牙-己榜国家公园拥有世界上最大的一些溶洞。乘船进入风牙洞，漫步天堂洞，或参加探险之旅。",
    spots: [
      { en: "Phong Nha Cave", zh: "风牙洞", d: "Reached by boat along an underground river.", dzh: "乘船沿地下河进入。" },
      { en: "Paradise Cave", zh: "天堂洞", d: "Kilometres of boardwalk among giant formations.", dzh: "数公里木栈道穿行于巨型石笋间。" },
      { en: "Dark Cave", zh: "暗洞", d: "Zipline, mud bath and kayaking.", dzh: "滑索、泥浴和皮划艇。" },
      { en: "Son Doong expeditions", zh: "韩松洞探险", d: "The world's largest cave, by special permit.", dzh: "世界最大溶洞，需特别许可。" },
    ],
  },
  {
    path: "nha-trang", dest: "nha-trang-tour", car: "nha-trang", name: "Nha Trang", zh: "芽庄", posts: /nha trang/i,
    tag: "Islands, diving and sunshine", tagZh: "海岛、潜水与阳光",
    intro: "A lively beach city on a wide bay with clear water and offshore islands. Go snorkelling, relax in mud baths and visit the ancient Po Nagar Cham towers.",
    introZh: "拥有宽阔海湾、清澈海水和离岛的热闹海滨城市。浮潜、泥浴，参观古老的婆那加占婆塔。",
    spots: [
      { en: "Island hopping", zh: "跳岛游", d: "Hon Mun marine park for snorkelling and diving.", dzh: "在木岛海洋公园浮潜和潜水。" },
      { en: "Po Nagar Cham Towers", zh: "婆那加占婆塔", d: "Hindu temples built from the 8th century.", dzh: "始建于8世纪的印度教神庙。" },
      { en: "Mud baths & hot springs", zh: "泥浴与温泉", d: "A local way to relax after the beach.", dzh: "海滩之后的当地放松方式。" },
      { en: "Nha Trang Beach", zh: "芽庄海滩", d: "Six kilometres of sand along the city.", dzh: "沿城市延伸六公里的沙滩。" },
    ],
  },
  {
    path: "ho-chi-minh-city", dest: "ho-chi-minh-tour", car: "ho-chi-minh", name: "Ho Chi Minh City", zh: "胡志明市", posts: /ho chi minh|saigon|cu chi|mekong/i,
    tag: "Vietnam's energetic southern metropolis", tagZh: "活力四射的南方大都市",
    intro: "Saigon is fast, modern and full of life, with French colonial landmarks, rooftop bars and endless street food. It is the starting point for the Cu Chi Tunnels and the Mekong Delta.",
    introZh: "西贡节奏快、现代而充满活力，有法式殖民地标、屋顶酒吧和吃不完的街头美食，也是前往古芝地道和湄公河三角洲的起点。",
    spots: [
      { en: "Notre-Dame Cathedral & Post Office", zh: "红教堂与中央邮局", d: "Two French-era landmarks side by side.", dzh: "并排而立的两座法式地标。" },
      { en: "Ben Thanh Market", zh: "滨城市场", d: "Souvenirs by day, street food at night.", dzh: "白天购物，夜晚美食。" },
      { en: "Cu Chi Tunnels", zh: "古芝地道", d: "The underground network from the Vietnam War.", dzh: "越战时期的地下通道网络。" },
      { en: "Mekong Delta day trip", zh: "湄公河三角洲一日游", d: "Floating markets, orchards and canals.", dzh: "水上市场、果园和运河。" },
    ],
  },
  {
    path: "mui-ne", dest: "mui-ne-tour", car: "mui-ne", name: "Mui Ne", zh: "美奈", posts: /mui ne|phan thiet/i,
    tag: "Sand dunes and sea breeze", tagZh: "沙丘与海风",
    intro: "A fishing town turned beach resort, famous for its red and white sand dunes, kitesurfing and fresh seafood.",
    introZh: "由渔村发展起来的海滩度假地，以红白沙丘、风筝冲浪和新鲜海鲜闻名。",
    spots: [
      { en: "White Sand Dunes", zh: "白沙丘", d: "Sunrise jeep rides over the dunes.", dzh: "乘吉普车在沙丘上看日出。" },
      { en: "Red Sand Dunes", zh: "红沙丘", d: "Sand sledding and sunset views.", dzh: "滑沙与日落美景。" },
      { en: "Fairy Stream", zh: "仙女溪", d: "Walk barefoot along a red-and-white canyon.", dzh: "赤脚漫步红白峡谷。" },
      { en: "Mui Ne fishing village", zh: "美奈渔村", d: "Colourful boats and the morning fish market.", dzh: "彩色渔船与早市。" },
    ],
  },
  {
    path: "phu-quoc", dest: "phu-quoc-tour", car: "phu-quoc", name: "Phu Quoc", zh: "富国岛", posts: /phu quoc/i,
    tag: "Vietnam's tropical island escape", tagZh: "越南热带海岛度假地",
    intro: "White-sand beaches, clear water and sunsets over the Gulf of Thailand. Ride the sea cable car to Hon Thom, snorkel the southern islands and enjoy the night market.",
    introZh: "白沙滩、清澈海水与泰国湾日落。乘跨海缆车前往香岛，在南部群岛浮潜，逛夜市。",
    spots: [
      { en: "Hon Thom cable car", zh: "香岛跨海缆车", d: "One of the world's longest over-sea cable cars.", dzh: "世界最长的跨海缆车之一。" },
      { en: "Sao Beach", zh: "星沙滩", d: "Soft white sand and calm turquoise water.", dzh: "细软白沙与平静碧水。" },
      { en: "An Thoi islands", zh: "安泰群岛", d: "Snorkelling and boat trips in the south.", dzh: "南部浮潜和乘船游。" },
      { en: "Phu Quoc night market", zh: "富国夜市", d: "Fresh seafood and local pepper.", dzh: "新鲜海鲜与当地胡椒。" },
    ],
  },
  {
    path: "da-lat", dest: "da-lat", car: "da-lat", match: /da ?lat/i, q: "Da Lat", name: "Da Lat", zh: "大叻", posts: /da ?lat/i,
    poster: "/images/destinations/dalat-poster.webp",
    tag: "The city of eternal spring", tagZh: "四季如春之城",
    intro: "At 1,500 m in the Central Highlands, Da Lat is cool all year, with pine forests, flower farms, French villas and lakes. A favourite escape for couples and families, and a great stop between Saigon and Nha Trang.",
    introZh: "大叻位于中部高原海拔1500米处，全年凉爽，松林、花田、法式别墅与湖泊遍布。是情侣与家庭的度假胜地，也是西贡与芽庄之间的理想停留点。",
    spots: [
      { en: "Xuan Huong Lake & night market", zh: "春香湖与夜市", d: "The heart of town, best for an evening walk.", dzh: "市中心，适合傍晚散步。" },
      { en: "Langbiang Mountain", zh: "朗比昂山", d: "Jeep ride or hike to views over the highlands.", dzh: "乘吉普车或徒步俯瞰高原。" },
      { en: "Datanla Waterfall", zh: "达坦拉瀑布", d: "Alpine coaster through the pine forest.", dzh: "乘高山滑车穿越松林。" },
      { en: "Truc Lam Monastery & cable car", zh: "竹林禅院与缆车", d: "Zen monastery above Tuyen Lam Lake.", dzh: "俯瞰泉林湖的禅院。" },
    ],
  },
  {
    path: "cu-chi", dest: "cu-chi", match: /cu ?chi/i, q: "Cu Chi", name: "Cu Chi Tunnels", zh: "古芝地道", posts: /cu ?chi/i,
    poster: "/images/destinations/cuchi-poster.webp", photos: ["/images/destinations/cuchi-2.webp", "/images/destinations/cuchi-3.webp"],
    tag: "An underground village from the Vietnam War", tagZh: "越战时期的地下村庄",
    intro: "An hour from Saigon, the Cu Chi Tunnels are a 250 km network of hand-dug passages, kitchens and meeting rooms. Crawl through a section of tunnel and learn how villagers lived and fought underground.",
    introZh: "距西贡约一小时车程，古芝地道是长达250公里的手挖地下通道网络，内有厨房和会议室。亲身钻入一段地道，了解当年村民如何在地下生活与战斗。",
    spots: [
      { en: "Ben Dinh tunnels", zh: "滨亭地道", d: "The most visited section, close to Saigon.", dzh: "离西贡最近、最受欢迎的一段。" },
      { en: "Ben Duoc tunnels", zh: "滨药地道", d: "Quieter, with the memorial temple.", dzh: "更安静，有纪念庙宇。" },
      { en: "Hidden trapdoors & traps", zh: "暗门与陷阱", d: "See how the entrances were camouflaged.", dzh: "了解入口如何伪装。" },
      { en: "Saigon River speedboat", zh: "西贡河快艇", d: "Arrive by boat instead of by road.", dzh: "乘快艇代替陆路前往。" },
    ],
  },
  {
    path: "mekong-delta", dest: "mekong-delta", match: /mekong|can tho|ben tre|cai be|my tho|chau doc/i, q: "Mekong", name: "Mekong Delta", zh: "湄公河三角洲", posts: /mekong|can tho|ben tre/i,
    poster: "/images/destinations/mekong-poster.webp", photos: ["/images/destinations/mekong-2.webp"],
    tag: "Rivers, orchards and floating markets", tagZh: "河流、果园与水上市场",
    intro: "Vietnam's rice bowl is a maze of rivers and canals. Take a sampan through coconut palms, visit fruit orchards and family workshops, and wake up early for the floating market in Can Tho.",
    introZh: "越南的鱼米之乡，河流与运河纵横交错。乘小船穿行椰林，参观果园和家庭作坊，清晨前往芹苴水上市场。",
    spots: [
      { en: "Cai Rang floating market", zh: "丐冷水上市场", d: "Boats piled with fruit at sunrise in Can Tho.", dzh: "芹苴清晨满载水果的船只。" },
      { en: "Ben Tre coconut canals", zh: "槟椥椰林水道", d: "Rowing boats under water-coconut palms.", dzh: "乘手划船穿行水椰林。" },
      { en: "Cai Be & Vinh Long", zh: "丐咪与永隆", d: "Orchards, homestays and local crafts.", dzh: "果园、民宿与手工艺。" },
      { en: "Chau Doc & Tra Su forest", zh: "朱笃与茶枢森林", d: "Floating villages and a cajuput forest.", dzh: "水上村庄与白千层林。" },
    ],
  },
  {
    path: "vung-tau", dest: "vung-tau", match: /vung ?tau/i, q: "Vung Tau", name: "Vung Tau", zh: "头顿", posts: /vung ?tau/i,
    poster: "/images/destinations/vungtau-poster.webp", photos: ["/images/destinations/vungtau-2.webp"],
    tag: "Saigon's seaside escape", tagZh: "西贡近郊的海滨度假地",
    intro: "Two hours from Ho Chi Minh City, Vung Tau has long beaches, fresh seafood and hilltop views from the giant Christ statue and the old lighthouse.",
    introZh: "距胡志明市两小时车程，头顿拥有绵长海滩、新鲜海鲜，还可在巨型耶稣像和古灯塔上俯瞰海景。",
    spots: [
      { en: "Christ of Vung Tau", zh: "头顿耶稣像", d: "Climb inside the statue for sea views.", dzh: "登上雕像内部眺望大海。" },
      { en: "Back Beach (Bai Sau)", zh: "后滩", d: "The longest beach for swimming.", dzh: "最长的游泳海滩。" },
      { en: "Vung Tau Lighthouse", zh: "头顿灯塔", d: "A French-era lighthouse on Small Mountain.", dzh: "小山上的法式古灯塔。" },
      { en: "Seafood at Front Beach", zh: "前滩海鲜", d: "Fresh catch grilled by the sea.", dzh: "海边现烤新鲜海鲜。" },
    ],
  },
];

export const cityByPath = (path: string) => CITIES.find((c) => c.path === path);
export const cityByDest = (dest: string) => CITIES.find((c) => c.dest === dest);
// Liên kết tới trang điểm đến; điểm đến chưa có trang thì về danh sách tour lọc theo điểm đến
export const destHref = (dest: string) => {
  const c = cityByDest(dest);
  return c ? `/destinations/${c.path}` : `/tours?destination=${dest}`;
};
