import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { L, T } from "@/lib/i18n";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Travel Guide & News",
  description: "Local travel tips, seasonal events and destination guides for Hanoi, Sapa, Ha Giang, Ninh Binh, Da Nang, Hoi An, Nha Trang and Phu Quoc.",
  path: "/news",
  image: "/images/heroes/news.webp",
  keywords: ["Vietnam travel guide","Vietnam travel tips","best time to visit Vietnam"],
});

const PER_PAGE = 16;
// Tên chuyên mục từ backend (tiếng Anh) -> tiếng Trung
const CAT_ZH: Record<string, string> = { News: "新闻", Blog: "博客" };
const pill = "grid h-10 min-w-10 place-items-center rounded-full border px-3 text-sm";

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
          <Link href="/news" className={`rounded-full border px-4 py-2 text-sm ${!c ? "border-brand bg-brand text-white" : ""}`}><L en="All" zh="全部" /> ({total && !c ? total : "…"})</Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/news?c=${encodeURIComponent(cat)}`} className={`rounded-full border px-4 py-2 text-sm ${c === cat ? "border-brand bg-brand text-white" : ""}`}><L en={cat} zh={CAT_ZH[cat] ?? cat} /></Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <GuideCard key={p.slug} post={p} />)}
        </div>
        {pages > 1 && (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 ? (
              <Link href={href(page - 1)} aria-label="Previous page" className={`${pill} hover:border-brand hover:text-brand`}><FontAwesomeIcon icon={faChevronLeft} className="text-xs" /></Link>
            ) : (
              <span className={`${pill} cursor-not-allowed opacity-30`} aria-hidden><FontAwesomeIcon icon={faChevronLeft} className="text-xs" /></span>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
              .flatMap((p, i, arr) => (i > 0 && p - arr[i - 1] > 1 ? ["gap" + p, p] : [p]))
              .map((p) =>
                typeof p === "string" ? (
                  <span key={p} className="px-1 text-sm text-ink/50" aria-hidden>…</span>
                ) : (
                  <Link key={p} href={href(p)} aria-current={p === page ? "page" : undefined} className={`${pill} ${p === page ? "border-brand bg-brand text-white" : "hover:border-brand"}`}>{p}</Link>
                ),
              )}
            {page < pages ? (
              <Link href={href(page + 1)} aria-label="Next page" className={`${pill} hover:border-brand hover:text-brand`}><FontAwesomeIcon icon={faChevronRight} className="text-xs" /></Link>
            ) : (
              <span className={`${pill} cursor-not-allowed opacity-30`} aria-hidden><FontAwesomeIcon icon={faChevronRight} className="text-xs" /></span>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
