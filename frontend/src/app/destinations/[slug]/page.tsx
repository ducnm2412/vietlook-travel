import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCarSide, faCircleCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Img from "@/components/Img";
import { HeroCredit } from "@/components/PageHero";
import LogoBadge from "@/components/LogoBadge";
import TourCard from "@/components/TourCard";
import GuideCard from "@/components/GuideCard";
import { L } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import destGrid from "@/data/destGrid.json";

const GRID = destGrid as Record<string, { src: string; credit: string }[]>;
import { CITIES, cityByPath } from "@/lib/cities";
import { getDestinations, getTours, postsByTitle } from "@/lib/content";

export const generateStaticParams = () => CITIES.map((c) => ({ slug: c.path }));

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const c = cityByPath((await params).slug);
  if (!c) return { title: "Destination" };
  return pageMeta({ title: `${c.name} travel guide and private tours`, description: c.intro, path: `/destinations/${c.path}` });
}

const CAR_POINTS = [
  ["Airport pick-up & drop-off", "机场接送"],
  ["City tours and day trips", "市内游与一日游"],
  ["4 – 45 seat vehicles", "4–45座车型"],
  ["Fuel, tolls and parking included", "含油费、过路费和停车费"],
];

// Trang điểm đến (bố cục theo trang Bac Ha của villagesvietnam.com): hero chữ viết tay + tên lớn, giới thiệu + lưới ảnh,
// điểm tham quan, tour liên quan, xe riêng tại thành phố, bài viết
export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const c = cityByPath((await params).slug);
  if (!c) notFound();
  // Điểm đến không có mã trong dữ liệu (Đà Lạt, Củ Chi…) lọc tour theo tiêu đề
  const [tours, dests] = await Promise.all([
    c.match ? getTours("").then((all) => all.filter((t) => c.match!.test(t.title))) : getTours(`?destination=${c.dest}`),
    getDestinations(),
  ]);
  const listHref = c.q ? `/tours?q=${encodeURIComponent(c.q)}` : `/tours?destination=${c.dest}`;
  const dest = dests.find((d) => d.slug === c.dest);
  const posts = postsByTitle(c.posts, 6);
  // Ảnh: ảnh đại diện điểm đến + ảnh gallery các tour tại đây (bỏ trùng)
  const photos = [...new Set([...(c.photos ?? []), dest?.image, ...tours.flatMap((t) => [t.image, ...(t.gallery ?? [])])].filter(Boolean) as string[])];
  // Ảnh đầu trang: ảnh địa danh khổ 2560px (Wikimedia Commons) cho rõ nét trên màn hình lớn
  const hero = `/images/destinations/hero/${c.dest}.webp`;
  // Cùng kiểu tiêu đề trang chủ (SectionHeading): dòng nhỏ in hoa màu accent + tiêu đề Playfair
  const head = "font-serif text-3xl font-bold leading-tight text-ink md:text-4xl";
  const script = "mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[520px] items-end overflow-hidden md:min-h-[640px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero} alt={c.name} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <HeroCredit image={hero} />
        <div className="container-x w-full pb-14 pt-40 text-white md:pb-20">
          <p className="font-script text-4xl md:text-6xl"><L en="Discover" zh="探索" /></p>
          <h1 className="mt-1 font-serif text-5xl font-bold leading-tight md:text-7xl"><L en={c.name} zh={c.zh} /></h1>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-2xl text-base text-white/90 md:text-lg"><L en={c.tag} zh={c.tagZh} /></p>
          </div>
        </div>
      </section>

      {/* Giới thiệu + lưới ảnh */}
      <section id="explore" className="scroll-mt-28 bg-[#fdf6ec] py-14 md:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="min-w-0">
            <p className={script}><L en="Discover" zh="探索" /></p>
            <h2 className={`${head}`}><L en={`${c.name} – ${c.tag}`} zh={`${c.zh} – ${c.tagZh}`} /></h2>
            <p className="mt-5 leading-relaxed text-ink/80"><L en={c.intro} zh={c.introZh} /></p>
            {/* 2 nút nằm ngang; chữ dài (vd. trình duyệt tự dịch) thì nút xuống dòng thay vì đẩy cột ảnh ra ngoài */}
            <div className="mt-7 flex flex-wrap gap-2 sm:gap-3 [&_.btn]:flex-1 [&_.btn]:!px-3 [&_.btn]:text-center [&_.btn]:text-xs sm:[&_.btn]:flex-none sm:[&_.btn]:!px-7 sm:[&_.btn]:text-base">
              <Link href={listHref} className="btn btn-brand"><L en={`${tours.length} tours in ${c.name}`} zh={`${c.zh} ${tours.length} 条线路`} /> <FontAwesomeIcon icon={faArrowRight} /></Link>
              <Link href="/tailor-made" className="btn border border-brand text-brand hover:bg-brand hover:text-white"><L en="Plan a tailor-made trip" zh="定制行程" /></Link>
            </div>
          </div>
          {c.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.poster} alt={c.name} loading="lazy" className="mx-auto max-h-[620px] w-auto max-w-full rotate-1 lg:max-w-[560px] rounded-2xl shadow-2xl ring-8 ring-white transition duration-500 hover:rotate-0 hover:scale-[1.02]" />
          ) : (
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {/* Ảnh địa danh khổ 1600px (Wikimedia Commons) cho rõ nét; thiếu thì dùng ảnh tour */}
            {(GRID[c.dest] ?? photos.slice(1, 5).map((src) => ({ src, credit: "" }))).map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.src} src={g.src} alt={c.name} title={g.credit ? `Photo: ${g.credit}` : undefined} loading="lazy" decoding="async" className={`h-full w-full rounded-2xl object-cover shadow-md ${i === 0 ? "col-span-3 aspect-[16/7]" : "aspect-square"}`} />
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Điểm tham quan */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <p className={script}><L en="Must see" zh="必游" /></p>
          <h2 className={`${head}`}><L en={`Essential experiences in ${c.name}`} zh={`${c.zh}必体验`} /></h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.spots.map((s, i) => (
              <article key={s.en} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="font-card text-4xl font-bold text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 flex gap-2 font-card text-lg font-bold leading-snug"><FontAwesomeIcon icon={faLocationDot} className="mt-1 text-brand" /><L en={s.en} zh={s.zh} /></h3>
                <p className="mt-2 text-sm leading-relaxed text-muted"><L en={s.d} zh={s.dzh} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tour liên quan */}
      {tours.length > 0 && (
        <section className="bg-[#fdf6ec] py-14 md:py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={script}><L en="With Vietlook" zh="与 Vietlook 同行" /></p>
                <h2 className={`${head}`}><L en={`Tours in ${c.name}`} zh={`${c.zh}线路`} /></h2>
              </div>
              <Link href={listHref} className="font-semibold text-brand hover:text-accent"><L en={`View all ${tours.length} tours`} zh={`查看全部 ${tours.length} 条`} /> →</Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.slice(0, 6).map((t) => <TourCard key={t.slug} tour={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Xe riêng tại thành phố */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="relative grid items-center gap-8 rounded-3xl bg-brand-dark p-8 text-white md:grid-cols-[1.3fr_1fr] md:p-12">
            {/* Logo huy hiệu (vòng chữ xoay) đè lên góc trên bên phải của card, lơ lửng nhẹ */}
            <div className="pointer-events-none absolute -right-4 -top-12 md:-right-8 md:-top-14">
              <LogoBadge alt="" className="b2b-float h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"><FontAwesomeIcon icon={faCarSide} /> <L en="Private car with driver" zh="包车服务" /></p>
              <h2 className="mt-3 font-card text-3xl font-bold leading-tight md:text-4xl">
                {c.car ? <L en={`Private cars in ${c.name}`} zh={`${c.zh}包车`} /> : <L en={`Travel to ${c.name} by private car`} zh={`乘专车前往${c.zh}`} />}
              </h2>
              <ul className="mt-5 grid gap-2 text-white/85 sm:grid-cols-2">
                {CAR_POINTS.map(([en, zh]) => (
                  <li key={en} className="flex gap-2"><FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-accent" /><L en={en} zh={zh} /></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link href={c.car ? `/car-rental/${c.car}` : "/car-rental"} className="btn btn-accent">
                {c.car ? <L en={`See ${c.name} car prices`} zh={`查看${c.zh}包车价格`} /> : <L en="See car rental" zh="查看包车服务" />} <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link href="/visa" className="text-sm font-semibold text-white/80 hover:text-accent"><L en="Airport fast-track & visa →" zh="机场快速通关与签证 →" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bài viết */}
      {posts.length > 0 && (
        <section className="bg-[#fdf6ec] py-14 md:py-20">
          <div className="container-x">
            <p className={script}><L en="Go further" zh="深入了解" /></p>
            <h2 className={`${head}`}><L en={`${c.name} travel guide`} zh={`${c.zh}旅游攻略`} /></h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => <GuideCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
