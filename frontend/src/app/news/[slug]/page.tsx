import type { Metadata } from "next";
import Link from "next/link";
import { clip, pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import { L, T } from "@/lib/i18n";
import { getPost, getPosts } from "@/lib/api";

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "News" };
  return pageMeta({
    title: post.title,
    description: clip(post.excerpt || post.title),
    path: `/news/${post.slug}`,
    image: post.image,
  });
}

export default async function PostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const latest = (await getPosts("?limit=6")).items.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <section className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_320px]">
      <article>
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-brand"><T k="nav.home" /></Link> / <Link href="/news" className="hover:text-brand"><T k="nav.news" /></Link>
        </nav>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-accent">{post.category} · {new Date(post.date).toLocaleDateString("en-GB")}</p>
        <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl"><L en={post.title} zh={post.titleZh ?? undefined} /></h1>
        {post.image && <Img src={post.image} alt={post.title} className="mt-6 aspect-[16/9] rounded-2xl" />}
        <div className="tour-content mt-8" dangerouslySetInnerHTML={{ __html: post.contentHtml ?? "" }} />
      </article>
      <aside className="space-y-4 lg:sticky lg:top-32 lg:h-fit">
        <p className="font-serif text-xl font-bold">Latest news</p>
        {latest.map((p) => (
          <Link key={p.slug} href={`/news/${p.slug}`} className="group flex gap-3">
            <Img src={p.image} alt={p.title} className="h-16 w-24 shrink-0 rounded-lg" />
            <span className="text-sm font-medium leading-snug group-hover:text-brand"><L en={p.title} zh={p.titleZh ?? undefined} /></span>
          </Link>
        ))}
        <Link href="/tailor-made" className="btn btn-accent w-full"><T k="hero.cta1" /></Link>
      </aside>
    </section>
  );
}
