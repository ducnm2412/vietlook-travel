// Nội dung trang About lấy từ vietlooktravel.com/about-us (đã sửa lỗi chính tả, "AThai" đổi thành Vietlook Travel)
type T = { en: string; zh: string };
type Item = T & { d: string; dzh: string };

export const INTRO: T[] = [
  {
    en: "Established in 2009, Vietlook Travel (previously known as A Thai Travel) has become one of the most trusted travel companies providing private tours, golf packages, pilgrimage tours and transport services to high-end travellers in Asia. We also run daily shared tours around Vietnam: Ha Noi city tour, Ninh Binh, Ha Long Bay and Sa Pa in the north; Da Nang, the coconut forest, Hoi An old quarter and Ba Na Hills in the centre; Ho Chi Minh City, Cu Chi tunnels and the Mekong Delta in the south.",
    zh: "Vietlook Travel（前身为 A Thai Travel）成立于2009年，现已成为最值得信赖的旅行社之一，为亚洲高端旅客提供私人定制游、高尔夫套餐、朝圣之旅及交通服务。我们也在越南各地提供每日拼团游：北部的河内城市游、宁平、下龙湾和沙坝；中部的岘港、椰林、会安古镇和巴拿山；南部的胡志明市、古芝地道和湄公河三角洲。",
  },
  {
    en: "Our guides speak many languages: English, German, Spanish, French, Japanese, Korean, Chinese and more. We listen carefully to craft a unique holiday full of fun and exciting experiences, an adventure you will tell your friends and family about again and again.",
    zh: "我们的导游会说多种语言：英语、德语、西班牙语、法语、日语、韩语、中文等。我们认真倾听每位客人的需求，打造独一无二、充满乐趣的假期，让您回味无穷，向亲友一再讲述。",
  },
  {
    en: "For 15 years we have created thousands of tours for travellers from all over the globe and from Vietnam, and our partners and customers trust us for our quality and professional service. We arrange holidays to Vietnam, Cambodia, Laos, Thailand, Bali and Indonesia, Myanmar, Nepal, Sri Lanka, India and beyond.",
    zh: "15年来，我们为来自世界各地及越南本地的旅客打造了数千条行程，合作伙伴和客户一直信赖我们的品质与专业服务。我们的目的地包括越南、柬埔寨、老挝、泰国、巴厘岛及印尼、缅甸、尼泊尔、斯里兰卡、印度等。",
  },
];

export const LANGUAGES: T[] = [
  { en: "English", zh: "英语" }, { en: "German", zh: "德语" }, { en: "Spanish", zh: "西班牙语" }, { en: "French", zh: "法语" },
  { en: "Japanese", zh: "日语" }, { en: "Korean", zh: "韩语" }, { en: "Chinese", zh: "中文" },
];

export const VISION: T = { en: "To become Asia's best travel company offering high-quality tailor-made holidays within Asia and beyond.", zh: "成为亚洲最好的旅行社，为亚洲及更远的目的地提供高品质的定制假期。" };
export const MISSION: T = { en: "Create unique, personalized Asia holidays for discerning travellers from around the world.", zh: "为来自世界各地、品味独到的旅客打造独特的个性化亚洲假期。" };

export const VALUES: Item[] = [
  { en: "Pioneer Service", zh: "领先服务", d: "We live the service at its best: speed, attention to detail, a focus on quality and guest-centred operations. Heartfelt service, from the pioneer.", dzh: "以速度、细节、品质和以客为本的运营，践行最好的服务。真诚用心，敢为人先。" },
  { en: "Business of Humanity", zh: "人文之业", d: "We promote human-centred values that benefit our community: our guests, our employees and our country.", dzh: "我们推崇以人为本的价值观，惠及我们的社群：客人、员工与国家。" },
  { en: "Wow Experiences", zh: "惊喜体验", d: "We are local gurus, on-site specialists and Asian travel experts who deliver \"wow experiences\" to our guests every day.", dzh: "我们是本地达人、现场专家和亚洲旅行行家，每天为客人带来令人惊叹的体验。" },
];

export const PEOPLE: { title: T; items: Item[] }[] = [
  {
    title: { en: "What we are identified by", zh: "我们的特质" },
    items: [
      { en: "Integrity", zh: "正直", d: "We are honest and transparent people.", dzh: "我们诚实、透明。" },
      { en: "Proactivity", zh: "主动", d: "We lead our work, we create our future.", dzh: "主导工作，创造未来。" },
      { en: "Responsibility", zh: "责任", d: "We give our very best to our work and our community.", dzh: "为工作和社会贡献全力。" },
      { en: "Creativity", zh: "创意", d: "We are resourceful and bring our guests new things every day.", dzh: "足智多谋，每天为客人带来新意。" },
      { en: "Happy", zh: "快乐", d: "We are happy people who bring happiness to others.", dzh: "我们快乐，也把快乐带给他人。" },
    ],
  },
  {
    title: { en: "What is happening within us", zh: "我们的成长" },
    items: [
      { en: "Listening", zh: "倾听", d: "We listen to understand, and to do the right things right.", dzh: "用心倾听，把对的事做对。" },
      { en: "Learning", zh: "学习", d: "We never stop learning, not only to catch up but to stay ahead.", dzh: "不断学习，不只追赶，更要领先。" },
      { en: "Sharing", zh: "分享", d: "Every happiness and every success is shared for the benefit of all.", dzh: "每一份快乐和成功都与大家分享。" },
      { en: "Supporting", zh: "支持", d: "We are grateful for the help we receive and foster kindness in every interaction.", dzh: "感恩所得的帮助，在每次互动中传递善意。" },
      { en: "Changing", zh: "改变", d: "Today's success won't be tomorrow's. We pursue new successes every day.", dzh: "今天的成功不等于明天，我们每天追求新的成功。" },
    ],
  },
];

export const WHY: Item[] = [
  { en: "Experienced team", zh: "经验丰富的团队", d: "We've been planning travel since 2000, finding exciting and amazing destinations and experiences within your budget. Planning travel is not just a job for us, it's our passion.", dzh: "我们自2000年起从事旅行规划，在您的预算内寻找精彩的目的地与体验。规划旅行不只是工作，更是我们的热爱。" },
  { en: "Personalized services", zh: "个性化服务", d: "From the first email or call, throughout your stay, until you are safely home, we are always available. Save time, money and enjoy complete peace of mind.", dzh: "从第一封邮件或电话开始，直到您平安回家，我们随时在线。省时省钱，全程安心。" },
  { en: "Expert support 24/7", zh: "全天候专家支持", d: "Our dedicated staff support you around the clock so every part of your trip runs smoothly.", dzh: "专属团队全天候支持，确保行程每个环节顺利。" },
  { en: "Locally owned company", zh: "本地企业", d: "We employ only local staff and choose friendly, reputable suppliers with in-depth local knowledge, for an authentic and memorable trip.", dzh: "我们只聘用本地员工，并精选友善、可靠、熟悉当地的供应商，带来真实难忘的旅程。" },
  { en: "Money-back guarantee", zh: "退款保证", d: "We want you to be 100% satisfied. If you are unhappy with our services, we will make it right for you.", dzh: "我们希望您百分百满意。如对服务不满意，我们一定为您妥善解决。" },
  { en: "Positive reviews", zh: "好评如潮", d: "Read what our customers say on Tripadvisor, Trustpilot and more. Thousands of reviews since 2009 affirm that we're doing it right.", dzh: "看看客人在 Tripadvisor、Trustpilot 等平台的评价。自2009年以来的数千条评价证明了我们的用心。" },
];

export const PRIVATE_BENEFITS: Item[] = [
  { en: "Itinerary flexibility", zh: "行程灵活", d: "Your plan is tailor-made with advice from our consultants. On tour, skip what you don't like, add activities and tweak the itinerary as needed.", dzh: "顾问为您量身定制行程。途中可跳过不喜欢的项目、增加活动，随时调整。" },
  { en: "Private transport and guide", zh: "专车专导", d: "Your own driver, car and guide. Your questions are answered personally, and you go wherever you want at your own pace, not at the mercy of a group of strangers.", dzh: "专属司机、车辆和导游，问题即时解答，按自己的节奏随心游览，不必迁就陌生团友。" },
  { en: "Hand-picked accommodation", zh: "自选酒店", d: "Choose hotels to suit your budget, mix different levels, and upgrade during the tour depending on availability.", dzh: "按预算挑选酒店，可混搭不同等级，途中视房态还可升级。" },
  { en: "Your own meal choices", zh: "餐饮自选", d: "Eat where you like instead of touristy restaurants. Take our meal plan with varied local food, or go without one for a culinary adventure.", dzh: "不必总在旅游餐厅用餐。可选含丰富本地美食的餐食计划，也可不含餐，自由探索美食。" },
];

export const VALUE_POINTS: Item[] = [
  { en: "A private custom tour at an affordable price", zh: "价格实惠的私人定制游", d: "A private tour may cost more than a large fixed-departure group, but you get a plan built around your interests, a high-quality guide who brings the sites to life, and attention to detail that gets the most from your money.", dzh: "私人定制游的价格可能高于固定出发的大团，但您得到的是围绕兴趣设计的行程、让景点鲜活起来的优质导游，以及让每分钱物有所值的细致安排。" },
  { en: "Invite family and friends to save more", zh: "邀请亲友，人均更省", d: "Per-person prices are quoted for 1 person, 2–5, 6–9 and 10+ travellers. The more people travel together, the lower the price.", dzh: "人均价格按1人、2–5人、6–9人及10人以上分别报价。同行人数越多，价格越低。" },
  { en: "We discount the price, never the quality", zh: "只降价格，不降品质", d: "Our team keeps operating costs low while enhancing your experience, giving you the benefits of both independent travel and an organised tour.", dzh: "团队在降低运营成本的同时提升您的体验，兼得自由行与跟团游的优点。" },
];

export const CONSULTANT: T[] = [
  { en: "1-on-1 consulting and planning to get exactly what you want for your budget, with absolutely no pushy selling.", zh: "一对一咨询与规划，按预算满足您的需求，绝不强行推销。" },
  { en: "A personal travel consultant backs you up through your whole journey and pays attention to every detail.", zh: "专属旅行顾问全程跟进，关注每一个细节。" },
  { en: "Our experts handle emergencies and complaints promptly and properly, with extensive travel experience.", zh: "经验丰富的专家及时、妥善处理突发情况和投诉。" },
];
