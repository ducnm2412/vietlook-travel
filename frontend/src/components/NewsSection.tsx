import Link from "@/components/LocaleLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Img from "./Img";
import { L } from "@/lib/i18n";
import HandNote from "./HandNote";
import type { Post } from "@/lib/api";

const date = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Tin tức mới nhất: 1 bài nổi bật bên trái + danh sách bên phải
export default function NewsSection({ posts }: { posts: Post[] }) {
  const [main, ...rest] = posts;
  if (!main) return null;

  return (
    <section className="container-x py-12 md:py-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Seasons & Events" zh="季节与活动" /></p>
          <h2 className="font-card text-3xl font-bold leading-tight text-white md:text-5xl"><L en="What's happening in Vietnam" zh="越南最新动态" /></h2>
          <HandNote light lines={[{"en":"Fresh from Vietnam,","zh":"越南新鲜事，"},{"en":"every season.","zh":"四季更新。"}]} />
        </div>
        <Link href="/news" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
          <L en="All news" zh="全部新闻" /> <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <Link href={`/news/${main.slug}`} className="group block">
          <Img src={main.image} alt={main.title} width={1000} className="aspect-[16/10] rounded-3xl transition duration-500 group-hover:opacity-90" />
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">
            <FontAwesomeIcon icon={faCalendarDays} /> {date(main.date)}
          </p>
          <h3 className="mt-2 font-card text-2xl font-bold leading-snug text-white group-hover:text-accent md:text-3xl"><L en={main.title} zh={main.titleZh ?? undefined} /></h3>
          <p className="mt-3 line-clamp-2 text-lg text-white/75"><L en={main.excerpt} zh=" " /></p>
        </Link>

        <ul className="divide-y divide-white/15">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/news/${p.slug}`} className="group flex gap-5 py-5 first:pt-0">
                <Img src={p.image} alt={p.title} width={400} className="aspect-[4/3] w-32 shrink-0 rounded-xl md:w-40" />
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <FontAwesomeIcon icon={faCalendarDays} /> {date(p.date)}
                  </p>
                  <h3 className="mt-1 line-clamp-2 font-card text-lg font-bold leading-snug text-white group-hover:text-accent"><L en={p.title} zh={p.titleZh ?? undefined} /></h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70"><L en={p.excerpt} zh=" " /></p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
