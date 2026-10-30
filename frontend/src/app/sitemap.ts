import { CITIES } from "@/lib/cities";
import { TRAVEL_GUIDES } from "@/lib/travelGuide";
import type { MetadataRoute } from "next";
import { getPosts, getTours } from "@/lib/content";
import { TOUR_THEMES } from "@/lib/themes";
import { langAlternates, SITE_URL } from "@/lib/seo";
import { CAR_CITIES, cityPath } from "@/components/car/cities";

// Sitemap gồm trang tĩnh + toàn bộ tour, dịch vụ xe, fast track và bài viết (từ dữ liệu tĩnh)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, cars, fastTrack, posts] = await Promise.all([getTours(), getTours("?kind=car"), getTours("?kind=fast-track"), getPosts("?limit=1000")]);
  const now = new Date();
  const statics = ["", "/tours", "/tailor-made", "/car-rental", "/visa", "/news", "/about", "/contact", "/partners", "/privacy-policy", "/payment-policy", "/cancellation-policy", "/terms-of-use", ...CITIES.map((c) => `/destinations/${c.path}`), ...TRAVEL_GUIDES.map((g) => `/travel-guide/${g.slug}`), ...TOUR_THEMES.map((t) => `/themes/${t.slug}`), ...CAR_CITIES.map((c) => cityPath(c.slug))].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  // Mỗi trang có 2 URL (/en, /zh) kèm khai báo hreflang cho nhau
  const both = (e: { url: string; lastModified: Date; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }) => {
    const path = e.url.slice(SITE_URL.length) || "/";
    const alt = langAlternates(path);
    const languages = { en: `${SITE_URL}${alt.en}`, "zh-Hans": `${SITE_URL}${alt["zh-Hans"]}` };
    return [{ ...e, url: languages.en, alternates: { languages } }, { ...e, url: languages["zh-Hans"], alternates: { languages } }];
  };
  return [
    ...statics,
    ...[...tours, ...cars, ...fastTrack].map((t) => ({ url: `${SITE_URL}/tours/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.items.map((p) => ({ url: `${SITE_URL}/news/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ].flatMap(both);
}
