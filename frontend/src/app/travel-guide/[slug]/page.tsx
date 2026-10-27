import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/LocaleLink";
import GuideCard from "@/components/GuideCard";
import TourCard from "@/components/TourCard";
import PageHero from "@/components/PageHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { pageMeta } from "@/lib/seo";
import { L, T } from "@/lib/i18n";
import { getTours, postsByTitle } from "@/lib/content";
import { DEFAULT_AUTHOR } from "@/lib/guide";
import { findGuide, TRAVEL_GUIDES } from "@/lib/travelGuide";

export const generateStaticParams = () => TRAVEL_GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: PageProps<"/travel-guide/[slug]">): Promise<Metadata> {
  const g = findGuide((await params).slug);
  if (!g) return {};
  return pageMeta({ title: g.title.en, description: g.intro.en, path: `/travel-guide/${g.slug}`, image: "/images/heroes/news.webp" });
}

export default async function TravelGuidePage({ params }: PageProps<"/travel-guide/[slug]">) {
  const g = findGuide((await params).slug);
  if (!g) notFound();
  // Tin tức cùng chủ đề + tour tham khảo + các bài cẩm nang khác
  // Chỉ lấy bài có tiêu đề đúng chủ đề của trang; không có bài nào (vd. SIM) thì ẩn mục tin liên quan
  const news = postsByTitle(g.related, 4);
  const tours = await getTours(g.tours);
  const others = TRAVEL_GUIDES.filter((x) => x.slug !== g.slug);

  return (
    <>
      <PageHero title={<L en={g.title.en} zh={g.title.zh} />} image="/images/heroes/news.webp" />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <article>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-brand-light" />
            <p className="text-sm leading-tight">
              <span className="font-semibold"><L en={`By ${DEFAULT_AUTHOR.name}`} zh={DEFAULT_AUTHOR.zh} /></span>
              <span className="block text-muted"><L en="Updated" zh="更新于" /> {new Date(g.updated).toLocaleDateString("en-GB")}</span>
            </p>
          </div>
          <p className="mt-8 text-lg leading-relaxed"><L en={g.intro.en} zh={g.intro.zh} /></p>
          {g.sections.map((s) => (
            <div key={s.title.en} className="mt-10">
              <h2 className="font-serif text-2xl font-bold md:text-3xl"><L en={s.title.en} zh={s.title.zh} /></h2>
              <ul className="mt-4 space-y-3">
                {s.items.map((it) => (
                  <li key={it.en} className="flex gap-3">
                    <FontAwesomeIcon icon={faCheck} className="mt-1.5 shrink-0 text-brand" />
                    <span><L en={it.en} zh={it.zh} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
        <aside className="space-y-3 lg:sticky lg:top-32 lg:h-fit">
          <p className="font-serif text-xl font-bold"><L en="More travel tips" zh="更多旅行须知" /></p>
          {others.map((x) => (
            <Link key={x.slug} href={`/travel-guide/${x.slug}`} className="block rounded-xl bg-sand p-4 text-sm font-medium hover:text-brand"><L en={x.title.en} zh={x.title.zh} /></Link>
          ))}
          <Link href="/tailor-made" className="btn btn-accent w-full"><T k="hero.cta1" /></Link>
        </aside>
      </section>

      {/* Tour tham khảo */}
      {tours.length > 0 && (
        <section className="container-x pb-14">
          <h2 className="mb-6 font-serif text-2xl font-bold md:text-3xl"><L en="Tours you may like" zh="推荐行程" /></h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{tours.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
        </section>
      )}

      {/* Tin tức cùng chủ đề */}
      {news.length > 0 && (
        <section className="bg-photo-light py-14">
          <div className="container-x">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold md:text-3xl"><L en="Related news" zh="相关资讯" /></h2>
              <Link href={`/news?topic=${g.topic}`} className="text-sm font-semibold text-brand hover:underline"><L en="View all" zh="查看全部" /> →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{news.map((p) => <GuideCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
