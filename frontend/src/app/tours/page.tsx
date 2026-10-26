import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import TourFilter from "@/components/TourFilter";
import { T } from "@/lib/i18n";
import { getDestinations, getThemes, getTours } from "@/lib/api";

export const metadata: Metadata = pageMeta({
  title: "Vietnam Tours & Holiday Packages",
  description: "Browse 200+ private tours across North, Central and South Vietnam: Halong Bay cruises, Sapa trekking, Hoi An, Mekong Delta and multi-week packages.",
  path: "/tours",
  image: "/images/heroes/tours.webp",
  keywords: ["Vietnam tours","Vietnam travel packages","Halong Bay tour","private tour Vietnam"],
});

export default async function ToursPage({ searchParams }: PageProps<"/tours">) {
  const sp = await searchParams;
  const pick = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const [tours, destinations, themes] = await Promise.all([getTours(), getDestinations(), getThemes()]);
  const initial = Object.fromEntries(["region", "destination", "theme", "minDays", "maxDays", "q"].map((k) => [k, pick(k)]));

  return (
    <>
      <PageHero title={<T k="nav.tours" />} sub={<T k="sec.long.s" />} image="/images/heroes/tours.webp" />
      <section className="container-x py-14">
        {/* key để bộ lọc reset khi điều hướng từ menu với query mới */}
        <TourFilter key={JSON.stringify(initial)} tours={tours} destinations={destinations} themes={themes} initial={initial} initialPage={Math.max(1, parseInt(pick("page")) || 1)} />
      </section>
    </>
  );
}
