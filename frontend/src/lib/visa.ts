// Bảng giá đón – tiễn Fast-track (file "BẢNG GIÁ FT MẪU.xlsx", 27/10), đơn vị USD.
// Thứ tự giá theo FT_AIRPORTS; null = sân bay đó không có dịch vụ / chưa có giá.
export const FT_AIRPORTS = [
  { code: "SGN", en: "Tan Son Nhat", zh: "新山一", city: "Ho Chi Minh City", cityZh: "胡志明市" },
  { code: "HAN", en: "Noi Bai", zh: "内排", city: "Ha Noi", cityZh: "河内" },
  { code: "DAD", en: "Da Nang", zh: "岘港", city: "Da Nang", cityZh: "岘港" },
  { code: "CXR", en: "Cam Ranh", zh: "金兰", city: "Nha Trang", cityZh: "芽庄" },
  { code: "PQC", en: "Phu Quoc", zh: "富国", city: "Phu Quoc", cityZh: "富国岛" },
] as const;

export type FtService = { no: number; en: string; zh: string; d: string; dzh: string; price: (number | null)[]; note?: { en: string; zh: string } };
export type FtGroup = { key: "arrival" | "departure" | "addon"; en: string; zh: string; services: FtService[] };

export const FT_GROUPS: FtGroup[] = [
  {
    key: "arrival", en: "Arrival – meet and assist", zh: "入境接机协助",
    services: [
      { no: 1, en: "Fast-track immigration", zh: "快速通关入境", d: "Meet and escort to the priority immigration lane (lane 4)", dzh: "接机并带至优先入境通道（4号通道）", price: [15, 10, 8, 13, 14] },
      { no: 2, en: "Fast-track – Diplomatic lane", zh: "快速通关 – 外交通道", d: "Meet and escort to the diplomatic immigration lane", dzh: "接机并带至外交入境通道", price: [42, 17, 17, 19, 22] },
      { no: 3, en: "Fast-track – VIP lane", zh: "快速通关 – VIP通道", d: "Meet and escort through the priority lane with no queuing", dzh: "接机并经优先通道入境，全程免排队", price: [57, 27, 27, 32, 27] },
      { no: 4, en: "Visa on arrival + Fast-track", zh: "落地签 + 快速通关", d: "Express visa stamping, then the priority immigration lane (lane 4)", dzh: "快速办理落地签，再走优先入境通道（4号通道）", price: [20, 10, 8, 13, 14] },
      { no: 5, en: "Visa on arrival + Diplomatic lane", zh: "落地签 + 外交通道", d: "Express visa stamping, then the diplomatic immigration lane", dzh: "快速办理落地签，再走外交入境通道", price: [47, 17, 17, 19, 22] },
      { no: 6, en: "Visa on arrival + VIP lane", zh: "落地签 + VIP通道", d: "Express visa stamping, then immigration with no queuing", dzh: "快速办理落地签，入境全程免排队", price: [62, 27, 27, 32, 27] },
      { no: 7, en: "Visa on arrival only (regular lane)", zh: "仅办理落地签（普通通道）", d: "We meet you and handle the visa; you then use the regular immigration lane", dzh: "接机并办理签证，之后旅客自行走普通入境通道", price: [14, null, null, null, null] },
    ],
  },
  {
    key: "departure", en: "Departure – see-off", zh: "出境送机协助",
    services: [
      { no: 8, en: "Fast-track departure", zh: "快速通关出境", d: "Meet and escort to the priority emigration lane (lane 4)", dzh: "迎接并带至优先出境通道（4号通道）", price: [19, 12, 12, 22, 22] },
      { no: 9, en: "Fast-track departure + Security screening", zh: "快速通关出境 + 优先安检", d: "Priority emigration lane plus priority security screening", dzh: "优先出境通道并优先安检", price: [25, 22, 22, 25, null] },
      { no: 10, en: "Priority check-in (add-on)", zh: "优先值机（附加）", d: "Priority check-in, booked together with a departure service", dzh: "优先值机，需与送机服务一同预订", price: [null, 17, 17, 15, null], note: { en: "At Cam Ranh (CXR) only for flights to Russia", zh: "金兰机场（CXR）仅限飞往俄罗斯的航班" } },
      { no: 11, en: "VIP lane departure", zh: "VIP通道出境", d: "Meet and emigration with no queuing", dzh: "迎接并出境全程免排队", price: [62, 32, 32, null, null] },
      { no: 12, en: "VIP lane departure + Security screening", zh: "VIP通道出境 + 优先安检", d: "No-queue emigration plus priority security screening", dzh: "出境免排队并优先安检", price: [70, 42, 42, null, null] },
    ],
  },
  {
    key: "addon", en: "Add-on services", zh: "附加服务",
    services: [
      { no: 13, en: "Night surcharge (23:00 – 06:00)", zh: "夜间附加费（23:00–06:00）", d: "For flights arriving or departing at night", dzh: "适用于夜间抵达或出发的航班", price: [6, 6, 6, 5, 5] },
      { no: 14, en: "Porter service", zh: "行李搬运服务", d: "Help collecting your luggage", dzh: "协助提取行李", price: [6, 6, 6, null, null] },
      { no: 15, en: "Porter service + Security screening + escort out", zh: "行李搬运 + 安检 + 护送出关", d: "Luggage collection, customs screening and escort to the exit", dzh: "提取行李、海关查验并护送至出口", price: [12, 12, 12, null, null] },
    ],
  },
];

export const FT_NOTES = [
  { en: "Prices in USD. Government visa fees are not included.", zh: "价格以美元计，不含政府签证费。" },
  { en: "No-show or not meeting our staff: 100% charge unless cancelled in advance.", zh: "未登机或未与工作人员会合且未提前取消的，收取100%费用。" },
  { en: "“–” means the service is not available at that airport.", zh: "“–” 表示该机场暂不提供此服务。" },
];

// Lựa chọn trong form đặt dịch vụ: e-visa + các gói đón/tiễn chính (không gồm dịch vụ đi kèm)
export const VISA_SERVICES = [
  { v: "evisa", en: "Vietnam e-Visa support", zh: "越南电子签证协助" },
  ...FT_GROUPS.filter((g) => g.key !== "addon").flatMap((g) => g.services.map((s) => ({ v: `ft-${s.no}`, en: `${g.key === "arrival" ? "Arrival" : "Departure"} · ${s.en}`, zh: `${g.key === "arrival" ? "入境" : "出境"} · ${s.zh}` }))),
];

// Quy trình đón / tiễn (chị gửi 27/10) và quy trình e-visa (soạn theo cổng chính thức evisa.gov.vn – chờ duyệt)
export const FT_STEPS = {
  arrival: [
    { en: "You land and walk to the immigration area", zh: "旅客落地后前往入境区域" },
    { en: "Our staff hold up a name sign", zh: "工作人员举牌迎接" },
    { en: "You find the sign and meet our staff", zh: "旅客找到接机牌与工作人员会合" },
    { en: "Staff check your details and photograph the result", zh: "工作人员核对信息并拍照留存结果" },
    { en: "Staff take you to the priority immigration lane", zh: "工作人员带您走优先入境通道" },
  ],
  departure: [
    { en: "We meet you 2 hours before your flight", zh: "起飞前2小时与您约定会合" },
    { en: "You check in, then go to meeting point counter B", zh: "旅客办理值机后前往B柜台会合点" },
    { en: "Our staff hold up a name sign at the meeting point", zh: "工作人员在会合点举牌等候" },
    { en: "We meet and photograph the result", zh: "会合并拍照留存结果" },
    { en: "Staff take you to the priority emigration lane", zh: "工作人员带您走优先出境通道" },
  ],
  evisa: [
    { en: "Go to the official portal evisa.gov.vn (Vietnam Immigration Department)", zh: "访问越南出入境管理局官方网站 evisa.gov.vn" },
    { en: "Fill in the form, upload your passport data page and a portrait photo", zh: "填写申请表，上传护照资料页和证件照" },
    { en: "Pay the government fee online: USD 25 single entry, USD 50 multiple entry", zh: "在线支付政府费用：单次入境25美元，多次入境50美元" },
    { en: "Keep your registration code and check the result after about 3 working days", zh: "保存申请编号，约3个工作日后查询结果" },
    { en: "Print the approved e-visa and show it with your passport on arrival", zh: "打印获批的电子签证，入境时连同护照出示" },
  ],
};
