// Đọc nội dung từ src/data/content.json (xuất từ backend bằng `npm run export-content`) thay vì gọi API,
// lọc giống hệt các route của backend. Chỉ dùng phía server – không import file này từ client component.
import data from "@/data/content.json";
import "server-only";
import type { CarCity, Destination, Post, PostList, Theme, Tour, Vehicle } from "./api";

const all = data.tours as Tour[];
const posts = data.posts as Post[];

// Bỏ nội dung dài khi trả danh sách (giống brief() của backend)
const brief = ({ contentHtml, contentHtmlZh, gallery, ...rest }: Tour): Tour => ({ ...rest, gallery: (gallery || []).slice(0, 4) });

// query dạng "?kind=car&limit=6" như khi gọi API
export function queryTours(query: string): Tour[] {
  const p = new URLSearchParams(query);
  const kind = p.get("kind") || "tour";
  let result = all.filter((t) => t.kind === kind);
  const region = p.get("region"), destination = p.get("destination"), theme = p.get("theme"), category = p.get("category");
  const minDays = p.get("minDays"), maxDays = p.get("maxDays"), q = p.get("q"), limit = p.get("limit");
  if (region) result = result.filter((t) => t.region === region);
  if (destination) result = result.filter((t) => t.destinations.includes(destination));
  if (theme) result = result.filter((t) => t.theme === theme);
  if (category) result = result.filter((t) => t.categories.includes(category));
  if (minDays) result = result.filter((t) => t.days >= Number(minDays));
  if (maxDays) result = result.filter((t) => t.days <= Number(maxDays));
  if (q) {
    const s = q.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(s) || t.summary.toLowerCase().includes(s));
  }
  if (limit) result = result.slice(0, Number(limit));
  return result.map(brief);
}

export const findTour = (slug: string) => all.find((t) => t.slug === slug) ?? null;

export function queryPosts(query: string): PostList {
  const p = new URLSearchParams(query);
  const category = p.get("category"), type = p.get("type");
  const limit = Number(p.get("limit") || 12), page = Number(p.get("page") || 1);
  let list = category ? posts.filter((x) => x.category === category) : posts;
  if (type) list = list.filter((x) => x.type === type);
  const start = (page - 1) * limit;
  return {
    total: list.length,
    categories: [...new Set(posts.map((x) => x.category))],
    items: list.slice(start, start + limit).map(({ contentHtml, contentHtmlZh, ...x }) => x),
  };
}

export const findPost = (slug: string) => posts.find((x) => x.slug === slug) ?? null;
export const destinations = data.destinations as Destination[];
export const themes = data.themes as Theme[];
export const carCities = data.carCities as CarCity[];
export const vehicles = data.vehicles as Vehicle[];

// Hàm lấy dữ liệu cho server component (giữ tên cũ như khi còn gọi API)
export const getTours = async (query = "") => queryTours(query);
export const getTour = async (slug: string) => findTour(slug);
export const getDestinations = async () => destinations;
export const getThemes = async () => themes;
export const getCarCities = async () => carCities;
export const getVehicles = async () => vehicles;
export const getPosts = async (query = "") => queryPosts(query);
export const getPost = async (slug: string) => findPost(slug);

// Ảnh đại diện của chủ đề tour (TourTheme.cover)
export const themeCover = (cover: string) => (cover.startsWith("/") ? cover : findTour(cover)?.image ?? null);
