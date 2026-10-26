import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TourCard from "@/components/TourCard";
import { L } from "@/lib/i18n";
import { findTour, getTours } from "@/lib/content";
import { findTheme, TOUR_THEMES } from "@/lib/themes";
import type { Tour } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const generateStaticParams = () => TOUR_THEMES.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: PageProps<"/themes/[slug]">): Promise<Metadata> {
  const theme = findTheme((await params).slug);
  if (!theme) return { title: "Tour styles" };
  return pageMeta({
    title: `${theme.name} Tours in Vietnam – ${theme.tagline}`,
    description: theme.intro,
    path: `/themes/${theme.slug}`,
    image: findTour(theme.tours[0])?.image ?? undefined,
    keywords: [`Vietnam ${theme.name.toLowerCase()} tours`, `private ${theme.name.toLowerCase()} tour Vietnam`],
  });
}

export default async function ThemePage({ params }: PageProps<"/themes/[slug]">) {
  const theme = findTheme((await params).slug);
  if (!theme) notFound();
  // Tour của chủ đề: bỏ nội dung dài như danh sách tour
  const tours = theme.tours.map(findTour).filter((t): t is Tour => !!t).map(({ contentHtml, contentHtmlZh, ...t }) => t);
  // Tour tham khảo cuối trang: tour dài ngày không thuộc chủ đề này
  const others = (await getTours("?minDays=4")).filter((t) => !theme.tours.includes(t.slug)).slice(0, 4);
  const hero = tours.find((t) => t.image)?.image ?? "/images/heroes/tours.webp";

  return (
    <>
      <PageHero
        title={<L en={`${theme.name} tours`} zh={`${theme.zh}之旅`} />}
        sub={<L en={theme.tagline} zh={theme.taglineZh} />}
        image={hero}
      />

      <section className="container-x py-14">
        <SectionHeading
          kicker={<L en="Tour styles" zh="旅行风格" />}
          title={<L en={`Browse our private ${theme.name} tours`} zh={`浏览我们的${theme.zh}私人线路`} />}
          sub={<L en={theme.intro} zh={theme.introZh} />}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{tours.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
      </section>

      {/* Chủ đề khác */}
      <section className="bg-brand-light py-14">
        <div className="container-x">
          <SectionHeading center title={<L en="Other tour styles" zh="其他旅行风格" />} />
          <div className="flex flex-wrap justify-center gap-3">
            {TOUR_THEMES.filter((t) => t.slug !== theme.slug).map((t) => (
              <Link key={t.slug} href={`/themes/${t.slug}`} className="rounded-full bg-white px-5 py-2.5 font-semibold text-ink shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:text-brand hover:shadow-md">
                <L en={t.name} zh={t.zh} />
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-brand-dark p-8 text-center text-white">
            <h2 className="font-serif text-3xl font-bold"><L en="Ready to explore Vietnam?" zh="准备好探索越南了吗？" /></h2>
            <p className="mt-3 text-white/80"><L en="Get a free, no-obligation itinerary from our local experts." zh="由本地专家为您免费定制行程，无任何义务。" /></p>
            <Link href="/tailor-made" className="btn btn-accent mt-6 inline-flex"><L en="Plan my trip" zh="规划我的行程" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
          </div>
        </div>
      </section>

      {/* Tour tham khảo phía trên footer */}
      {others.length > 0 && (
        <section className="container-x py-14">
          <SectionHeading kicker={<L en="You may also like" zh="猜您喜欢" />} title={<L en="More tours to consider" zh="更多推荐线路" />} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{others.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
          <div className="mt-8 text-center">
            <Link href="/tours" className="font-semibold text-brand hover:underline"><L en="View all tours" zh="查看全部线路" /> →</Link>
          </div>
        </section>
      )}
    </>
  );
}
