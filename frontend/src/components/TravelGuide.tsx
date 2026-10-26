import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GuideCard from "./GuideCard";
import { L } from "@/lib/i18n";
import HandNote from "./HandNote";
import type { Post } from "@/lib/api";

// Cẩm nang du lịch Việt Nam: lưới thẻ 4 cột (kiểu localvietnam.com)
export default function TravelGuide({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section className="bg-photo-light py-12 md:py-20">
      <div className="container-x">
        <div className="mb-6 md:mb-14 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Vietnam Travel Guide" zh="越南旅游攻略" /></p>
          <h2 className="font-card text-3xl font-bold leading-tight md:text-5xl"><L en="Plan with local knowledge" zh="用本地知识规划旅程" /></h2>
          </div>
          <HandNote side="right" className="md:mb-8 md:mr-10" lines={[{"en":"Tips from people","zh":"来自本地人的"},{"en":"who live here.","zh":"真实建议。"}]} />
        </div>

        <div className="stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => <GuideCard key={p.slug} post={p} />)}
        </div>

        <div className="mt-12 text-center">
          <Link href="/news" className="btn btn-brand">
            <L en="All travel guides" zh="全部攻略" /> <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
}
