import type { Metadata } from "next";
import Link from "next/link";
import { clip, pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import BookingForm from "@/components/BookingForm";
import TourCard from "@/components/TourCard";
import { L, LHtml, T } from "@/lib/i18n";
import { formatUsd, getTour, getTours } from "@/lib/api";

// Bỏ style độ rộng cố định WordPress gắn vào bảng để bảng luôn vừa khung, không cuộn ngang
const fitTables = (html: string) => html.replace(/(<(?:table|td|th|col)\b[^>]*?)\s(?:style|width)="[^"]*"/g, "$1");

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const tour = await getTour((await params).slug);
  if (!tour) return { title: "Tour" };
  return pageMeta({
    title: tour.title,
    description: clip(`${tour.title}${tour.days > 1 ? ` – ${tour.days} days` : ""}. ${tour.summary}`),
    path: `/tours/${tour.slug}`,
    image: tour.image,
  });
}

export default async function TourDetail({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();
  const filter = tour.destinations[0] ? `?destination=${tour.destinations[0]}` : `?kind=${tour.kind}`;
  const related = (await getTours(`${filter}&limit=4`)).filter((t) => t.slug !== tour.slug).slice(0, 3);
  const gallery = tour.gallery ?? [];

  return (
    <>
      {/* Đầu trang: đường dẫn, tiêu đề, thông tin nhanh */}
      <section className="bg-sand">
        <div className="container-x pb-8 pt-6">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-brand"><T k="nav.home" /></Link>
            <span className="mx-2">/</span>
            <Link href="/tours" className="hover:text-brand"><T k="nav.tours" /></Link>
            <span className="mx-2">/</span>
            <span className="text-ink"><L en={tour.title} zh={tour.titleZh ?? undefined} /></span>
          </nav>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h1 className="max-w-3xl font-card text-3xl font-bold leading-tight md:text-4xl"><L en={tour.title} zh={tour.titleZh ?? undefined} /></h1>
            {tour.priceFrom ? (
              <p className="text-sm text-muted"><T k="card.from" /> <b className="font-card text-3xl text-accent">{formatUsd(tour.priceFrom)}</b></p>
            ) : null}
          </div>

          {gallery.length > 0 && (
            // 1 ảnh to bên trái + 2 ảnh nhỏ xếp dọc bên phải; khung thấp hơn để ảnh gốc (~555px) bớt bị phóng to
            <div className={`mt-6 grid h-[240px] gap-2 overflow-hidden rounded-3xl md:h-[400px] ${gallery.length > 1 ? "md:grid-cols-[3fr_2fr] md:grid-rows-2" : ""}`}>
              {gallery.slice(0, 3).map((src, i) => (
                <Img key={src} src={src} alt={`${tour.title} ${i + 1}`} width={1200} className={i === 0 ? "h-full w-full md:row-span-2" : "hidden h-full w-full md:block"} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article className="min-w-0">
          {/* Nội dung gốc từ vietlooktravel.com; ảnh trong bài đã có ở thư viện ảnh phía trên nên ẩn đi cho gọn */}
          <LHtml className={`tour-content ${gallery.length ? "hide-media" : ""}`} en={fitTables(tour.contentHtml ?? "")} zh={tour.contentHtmlZh ? fitTables(tour.contentHtmlZh) : undefined} />
        </article>
        {/* Form dính và cuộn riêng khi cao hơn màn hình, nội dung bên trái cuộn theo trang */}
        <aside className="min-w-0 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:rounded-3xl lg:[scrollbar-width:thin]">
          <BookingForm tour={tour} />
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-sand py-14">
          <div className="container-x">
            <h2 className="mb-6 font-card text-2xl font-bold md:text-3xl"><L en="You may also like" zh="您可能还喜欢" /></h2>
            <div className="grid gap-6 md:grid-cols-3">{related.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
