import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { T } from "@/lib/i18n";
import { getPosts } from "@/lib/api";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Travel Guide & News",
  description: "Local travel tips, seasonal events and destination guides for Hanoi, Sapa, Ha Giang, Ninh Binh, Da Nang, Hoi An, Nha Trang and Phu Quoc.",
  path: "/news",
  image: "/images/heroes/news.webp",
  keywords: ["Vietnam travel guide","Vietnam travel tips","best time to visit Vietnam"],
});

const PER_PAGE = 16;

export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const sp = await searchParams;
  const c = typeof sp.c === "string" ? sp.c : "";
  const page = Math.max(1, Number(sp.page) || 1);
  const q = new URLSearchParams({ limit: String(PER_PAGE), page: String(page), ...(c && { category: c }) });
  const { items, total, categories } = await getPosts(`?${q}`);
  const pages = Math.ceil(total / PER_PAGE);
  const href = (p: number) => `/news?${new URLSearchParams({ ...(c && { c }), page: String(p) })}`;

  return (
    <>
      <PageHero title={<T k="nav.news" />} sub={<T k="sec.guide.t" />} image="/images/heroes/news.webp" />
      <section className="container-x py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/news" className={`rounded-full border px-4 py-2 text-sm ${!c ? "border-brand bg-brand text-white" : ""}`}>All ({total && !c ? total : "…"})</Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/news?c=${encodeURIComponent(cat)}`} className={`rounded-full border px-4 py-2 text-sm ${c === cat ? "border-brand bg-brand text-white" : ""}`}>{cat}</Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <GuideCard key={p.slug} post={p} />)}
        </div>
        {pages > 1 && (
          <nav className="mt-12 flex flex-wrap justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 2)
              .map((p) => (
                <Link key={p} href={href(p)} className={`grid h-10 min-w-10 place-items-center rounded-full border px-3 text-sm ${p === page ? "border-brand bg-brand text-white" : "hover:border-brand"}`}>{p}</Link>
              ))}
          </nav>
        )}
      </section>
    </>
  );
}
