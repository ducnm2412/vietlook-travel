import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Img from "./Img";
import { L } from "@/lib/i18n";
import type { Post } from "@/lib/api";

// Thẻ bài cẩm nang: ảnh trên, tiêu đề đậm + nút mũi tên tròn (kiểu localvietnam.com)
export default function GuideCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <Img src={post.image} alt={post.title} width={600} className="aspect-[16/10] transition duration-500 group-hover:scale-[1.03]" />
      <div className="flex flex-1 items-start justify-between gap-4 p-6">
        <h3 className="line-clamp-3 font-card text-xl font-bold leading-snug text-ink group-hover:text-brand"><L en={post.title} zh={post.titleZh ?? undefined} /></h3>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </Link>
  );
}
