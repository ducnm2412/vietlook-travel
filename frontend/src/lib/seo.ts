import type { Metadata } from "next";

// Domain chính thức – đổi qua biến môi trường khi deploy
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vietlooktravel.com";
const DEFAULT_IMAGE = "/images/heroes/tours.webp";

// Meta SEO đầy đủ cho một trang: title, description, canonical, Open Graph, Twitter card
export function pageMeta({ title, description, path, image = DEFAULT_IMAGE, keywords }: { title: string; description: string; path: string; image?: string | null; keywords?: string[] }): Metadata {
  const img = image || DEFAULT_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Vietlook Travel",
      title,
      description,
      url: path,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      alternateLocale: ["zh_CN"],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

// Rút gọn mô tả còn ~155 ký tự (giới hạn Google hiển thị)
export const clip = (s: string, n = 155) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, "")}…` : t;
};
