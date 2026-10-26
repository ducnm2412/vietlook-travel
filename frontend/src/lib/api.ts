export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export type Tour = {
  slug: string;
  title: string;
  titleZh?: string | null;
  kind: "tour" | "car" | "fast-track";
  categories: string[];
  destinations: string[];
  region: "north" | "central" | "south" | null;
  theme: string | null;
  days: number;
  code: string | null;
  priceFrom: number | null; // VND
  priceEstimated?: boolean;
  image: string | null;
  summary: string;
  gallery?: string[];
  contentHtml?: string;
  summaryZh?: string | null;
  contentHtmlZh?: string | null;
};
export type Destination = { slug: string; name: string; zh: string; region: string; count: number; image: string | null };
export type Theme = { slug: string; name: string; zh: string; count: number };
export type CarCity = { slug: string; name: string; zh: string; count: number; image: string | null };
export type Vehicle = { seats: number; name: string; zh: string; example: string };
export type Post = { slug: string; title: string; titleZh?: string | null; date: string; category: string; type?: "news" | "guide"; image: string | null; excerpt: string; excerptZh?: string | null; contentHtml?: string; contentHtmlZh?: string | null };
export type PostList = { total: number; categories: string[]; items: Post[] };

// Gọi API từ server component; trả về giá trị rỗng nếu backend chưa chạy để trang vẫn hiển thị
async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const getTours = (query = "") => get<Tour[]>(`/tours${query}`, []);
export const getTour = (slug: string) => get<Tour | null>(`/tours/${slug}`, null);
export const getDestinations = () => get<Destination[]>("/destinations", []);
export const getThemes = () => get<Theme[]>("/themes", []);
export const getCarCities = () => get<CarCity[]>("/car-cities", []);
export const getVehicles = () => get<Vehicle[]>("/vehicles", []);
export const getPosts = (query = "") => get<PostList>(`/posts${query}`, { total: 0, categories: [], items: [] });
export const getPost = (slug: string) => get<Post | null>(`/posts/${slug}`, null);

// Giá lưu bằng VND, hiển thị bằng USD (cùng tỷ giá với backend/src/data/prices.js)
export const USD_TO_VND = 26000;
// 1768000 -> "$68"
export const formatUsd = (vnd: number) => `$${Math.round(vnd / USD_TO_VND).toLocaleString("en-US")}`;

export async function sendInquiry(data: Record<string, unknown>): Promise<{ id: string }> {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.message || "Request failed");
  return res.json();
}
