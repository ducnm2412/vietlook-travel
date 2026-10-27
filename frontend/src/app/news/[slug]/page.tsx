import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { clip, pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import { L, LHtml, T } from "@/lib/i18n";
import { getPost, getPosts, relatedPosts } from "@/lib/content";
import GuideCard from "@/components/GuideCard";
import BestSellerTour from "@/components/BestSellerTour";
import BestSellerTours from "@/components/BestSellerTours";
import { DEFAULT_AUTHOR } from "@/lib/guide";

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "News" };
  return {
    ...pageMeta({
      title: post.title,
      description: clip(post.excerpt || post.title),
      path: `/news/${post.slug}`,
      image: post.image,
    }),
    authors: [{ name: DEFAULT_AUTHOR.name }],
  };
}

export default async function PostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const latest = (await getPosts("?limit=6")).items.filter((p) => p.slug !== slug).slice(0, 5);
  const related = relatedPosts(post, 4);

  return (
    <>
    <section className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_320px]">
      <article>
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-brand"><T k="nav.home" /></Link> / <Link href="/news" className="hover:text-brand"><T k="nav.news" /></Link>
        </nav>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-accent">{post.category} · {new Date(post.date).toLocaleDateString("en-GB")}</p>
        <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl"><L en={post.title} zh={post.titleZh ?? undefined} /></h1>
        {/* Tác giả */}
        <div className="mt-5 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-brand-light" />
          <p className="text-sm leading-tight">
            <span className="font-semibold"><L en={`By ${DEFAULT_AUTHOR.name}`} zh={DEFAULT_AUTHOR.zh} /></span>
            <span className="block text-muted"><L en={DEFAULT_AUTHOR.role} zh={DEFAULT_AUTHOR.roleZh} /></span>
          </p>
        </div>
        {post.image && <Img src={post.image} alt={post.title} className="mt-6 aspect-[16/9] rounded-2xl" />}
        <LHtml className="tour-content mt-8" en={post.contentHtml ?? ""} zh={post.contentHtmlZh} />
      </article>
      <aside className="space-y-4 lg:sticky lg:top-32 lg:h-fit">
        <p className="font-serif text-xl font-bold"><L en="Latest news" zh="最新资讯" /></p>
        {latest.map((p) => (
          <Link key={p.slug} href={`/news/${p.slug}`} className="group flex gap-3">
            <Img src={p.image} alt={p.title} className="h-16 w-24 shrink-0 rounded-lg" />
            <span className="text-sm font-medium leading-snug group-hover:text-brand"><L en={p.title} zh={p.titleZh ?? undefined} /></span>
          </Link>
        ))}
        <Link href="/tailor-made" className="btn btn-accent w-full"><T k="hero.cta1" /></Link>
      </aside>
    </section>

    {/* Bài viết liên quan */}
    {related.length > 0 && (
      <section className="bg-photo-light py-14">
        <div className="container-x">
          <h2 className="mb-6 font-serif text-2xl font-bold md:text-3xl"><L en="Related articles" zh="相关文章" /></h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((p) => <GuideCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    )}

    {/* Giới thiệu một tour đặc biệt (nền trắng xen giữa 2 section nền ảnh) + các tour tham khảo */}
    <BestSellerTour bg="bg-white" />
    <BestSellerTours />
    </>
  );
}
