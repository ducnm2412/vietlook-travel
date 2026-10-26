import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "@/components/LocaleLink";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { L, T } from "@/lib/i18n";
import { headers } from "next/headers";
import { getPosts } from "@/lib/content";
import { findTopic } from "@/lib/guide";

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
  const str = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const c = str("c"), search = str("q").trim(), topic = findTopic(str("topic"));
  const page = Math.max(1, Number(sp.page) || 1);
  const zh = (await headers()).get("x-lang") === "zh";
  // Giữ chuyên mục, chủ đề và từ khoá khi chuyển trang
  const keep = { ...(c && { c }), ...(topic && { topic: topic.slug }), ...(search && { q: search }) };
  const q = new URLSearchParams({ limit: String(PER_PAGE), page: String(page), ...(c && { category: c }), ...(topic && { topic: topic.slug }), ...(search && { q: search }) });
  const { items, total, categories } = await getPosts(`?${q}`);
  const pages = Math.ceil(total / PER_PAGE);
  const href = (p: number) => `/news?${new URLSearchParams({ ...keep, page: String(p) })}`;

  return (
    <>
      <PageHero title={<T k="nav.news" />} sub={<T k="sec.guide.t" />} image="/images/heroes/news.webp" />
      <section className="container-x py-14">
        {/* Tìm bài viết (giữ chủ đề đang chọn) */}
        <form action="/news" className="mb-6 flex max-w-2xl items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-2 focus-within:border-brand">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-muted" />
          {topic && <input type="hidden" name="topic" value={topic.slug} />}
          <input name="q" defaultValue={search} placeholder={zh ? "搜索旅行指南…" : "Search travel guides…"} className="w-full bg-transparent py-1.5 outline-none" />
          <button className="btn btn-brand !px-5 !py-2 text-sm"><L en="Search" zh="搜索" /></button>
        </form>

        {(topic || search) && (
          <p className="mb-6 text-lg">
            <b>{total}</b> <L en="articles" zh="篇文章" />
            {topic && <> · <L en={topic.en} zh={topic.zh} /></>}
            {search && <> · “{search}”</>}
            <Link href="/news" className="ml-3 text-sm font-semibold text-brand hover:underline"><L en="Clear" zh="清除" /> ×</Link>
          </p>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/news" className={`rounded-full border px-4 py-2 text-sm ${!c ? "border-brand bg-brand text-white" : ""}`}><L en="All" zh="全部" /> ({total && !c ? total : "…"})</Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/news?c=${encodeURIComponent(cat)}`} className={`rounded-full border px-4 py-2 text-sm ${c === cat ? "border-brand bg-brand text-white" : ""}`}><L en={cat} zh={CAT_ZH[cat] ?? cat} /></Link>
          ))}
        </div>
        {items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => <GuideCard key={p.slug} post={p} />)}
          </div>
        ) : (
          <p className="rounded-2xl bg-sand p-10 text-center text-muted"><L en="No articles found. Try another keyword." zh="没有找到相关文章，请换个关键词。" /></p>
        )}
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
