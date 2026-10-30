// Thông tin lấy từ vietlooktravel.com
export const SITE = {
  name: "Vietlook Travel and Trading Company Limited",
  legalNameVi: "Công ty TNHH Du lịch và Thương mại Vietlook",
  // Mã số doanh nghiệp / số giấy phép lữ hành: để trống tới khi Vietlook cung cấp số thật (footer tự ẩn dòng này khi trống)
  taxId: "",
  travelLicense: "",
  shortName: "Vietlook Travel",
  slogan: "See the world, it's more fantastic than any dreams",
  logo: "/logo-vietlooktravel2-sm.webp", // bản 260px (đủ nét DPR 3 ở h-14), tự host để LCP không phải kết nối thêm tên miền
  logoFooter: "/images/logo-footer.webp", // cắt sát từ logo-chantrang.png của site gốc
  phone: "+84 98.339.3588",
  phoneRaw: "84983393588",
  phone2: "+84 98.339.3488",
  phone2Raw: "84983393488",
  whatsapp: "https://wa.me/84983393588",
  zalo: "https://zalo.me/0983393588",
  wechatId: "+84 98.339.3588",
  wechatQr: "https://cdn.ngay.net/khach/qrcode.png?format=auto",
  email: "infovietlooktravel@gmail.com",
  address: "No 58, Yen Nghia Ward, Ha Noi, Vietnam",
  facebook: "https://www.facebook.com/vietlooktravelhanoi",
  maps: "https://maps.app.goo.gl/ar5pqAHXgeW42U7W9",
  tripadvisor: "https://www.tripadvisor.com/Attraction_Review-g17733187-d27950353-Reviews-Vietlook_Travel-Ha_Dong_Hanoi.html",
  // Số đánh giá hiển thị ở RatingBadges: cập nhật theo số thật trên Google / Tripadvisor ("" = ẩn số)
  googleReviews: "",
  tripadvisorReviews: "35",
  mapEmbed: "https://www.google.com/maps?q=58+Yen+Nghia,+Ha+Dong,+Ha+Noi&output=embed",
};

export const REGIONS = [
  { key: "north", en: "North Vietnam", zh: "越南北部" },
  { key: "central", en: "Central Vietnam", zh: "越南中部" },
  { key: "south", en: "South Vietnam", zh: "越南南部" },
] as const;
