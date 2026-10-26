import type { MetadataRoute } from "next";
import { API_URL, type PostList, type Tour } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";
import { CAR_CITIES, cityPath } from "@/components/car/cities";

// Sitemap gồm trang tĩnh + toàn bộ tour, dịch vụ xe, fast track và bài viết (lấy từ backend)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetchJson = async <T,>(path: string, fallback: T): Promise<T> => {
    try {
      const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
      return res.ok ? ((await res.json()) as T) : fallback;
    } catch {
      return fallback;
    }
  };
  const [tours, cars, fastTrack, posts] = await Promise.all([
    fetchJson<Tour[]>("/tours", []),
    fetchJson<Tour[]>("/tours?kind=car", []),
    fetchJson<Tour[]>("/tours?kind=fast-track", []),
    fetchJson<PostList>("/posts?limit=1000", { total: 0, categories: [], items: [] }),
  ]);
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
