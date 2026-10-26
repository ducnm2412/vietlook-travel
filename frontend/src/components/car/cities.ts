// Thành phố có dịch vụ xe riêng; slug khớp category trong dữ liệu, URL là /car-rental/<slug bỏ "-private-cars">
export const CAR_CITIES = [
  { slug: "ha-noi-private-cars", name: "Ha Noi", zh: "河内", airport: "Noi Bai International Airport (HAN)" },
  { slug: "da-nang-private-cars", name: "Da Nang", zh: "岘港", airport: "Da Nang International Airport (DAD)" },
  { slug: "nha-trang-private-cars", name: "Nha Trang", zh: "芽庄", airport: "Cam Ranh International Airport (CXR)" },
  { slug: "ho-chi-minh-private-cars", name: "Ho Chi Minh City", zh: "胡志明市", airport: "Tan Son Nhat International Airport (SGN)" },
  { slug: "phu-quoc-private-cars", name: "Phu Quoc", zh: "富国岛", airport: "Phu Quoc International Airport (PQC)" },
  { slug: "mui-ne-private-cars", name: "Mui Ne", zh: "美奈", airport: "Mui Ne – Phan Thiet" },
  { slug: "da-lat-private-cars", name: "Da Lat", zh: "大叻", airport: "Lien Khuong Airport (DLI)" },
];

export const cityPath = (slug: string) => `/car-rental/${slug.replace(/-private-cars$/, "")}`;

// Rút gọn tên tuyến thành điểm đến: "Hanoi To Ninh Binh Private Car" -> "Ninh Binh"
export const routeStop = (title: string) => title.replace(/.*? to /i, "").replace(/ (one way|round.?trip|by private car|private car( transfer)?|and return.*|transfer).*$/i, "").trim();
