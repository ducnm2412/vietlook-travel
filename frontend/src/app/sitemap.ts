import type { MetadataRoute } from "next";
import { getPosts, getTours } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { CAR_CITIES, cityPath } from "@/components/car/cities";

// Sitemap gồm trang tĩnh + toàn bộ tour, dịch vụ xe, fast track và bài viết (từ dữ liệu tĩnh)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, cars, fastTrack, posts] = await Promise.all([getTours(), getTours("?kind=car"), getTours("?kind=fast-track"), getPosts("?limit=1000")]);
  const now = new Date();
  const statics = ["", "/tours", "/tailor-made", "/car-rental", "/visa", "/news", "/about", "/contact", "/partners", ...CAR_CITIES.map((c) => cityPath(c.slug))].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...statics,
    ...[...tours, ...cars, ...fastTrack].map((t) => ({ url: `${SITE_URL}/tours/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.items.map((p) => ({ url: `${SITE_URL}/news/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
