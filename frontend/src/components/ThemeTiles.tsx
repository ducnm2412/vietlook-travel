import Link from "@/components/LocaleLink";
import Img from "./Img";
import { L } from "@/lib/i18n";
import { themeCover } from "@/lib/content";
import type { TourTheme } from "@/lib/themes";

// Lưới thẻ ảnh dọc cho các chủ đề tour (trang chủ, trang chủ đề), mỗi thẻ dẫn tới /themes/<slug>
export default function ThemeTiles({ themes, cols = "lg:grid-cols-4" }: { themes: TourTheme[]; cols?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-4 ${cols}`}>
      {themes.map((t) => (
        <Link key={t.slug} href={`/themes/${t.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark shadow-sm sm:aspect-[3/4]">
          <Img src={themeCover(t.cover)} alt={t.name} width={320} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="block font-card text-lg font-bold"><L en={t.name} zh={t.zh} /></span>
            <span className="mt-0.5 block text-xs text-white/80"><L en={t.tagline} zh={t.taglineZh} /></span>
          </span>
        </Link>
      ))}
    </div>
  );
}
