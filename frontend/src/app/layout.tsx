import type { Metadata } from "next";
import { Caveat, Great_Vibes, IBM_Plex_Mono, Inter, Playfair_Display, Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { pageMeta, SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import { themeCover, getCarCities, getDestinations } from "@/lib/content";
import { TOUR_THEMES } from "@/lib/themes";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ScrollReveal from "@/components/ScrollReveal";

// CSS của Font Awesome đã import ở trên, tắt tự chèn để tránh icon bị nháy khi tải trang
config.autoAddCss = false;

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Font chỉ dùng dưới màn hình đầu: không preload để không làm chậm LCP
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], preload: false });
const script = Great_Vibes({ variable: "--font-great-vibes", weight: "400", subsets: ["latin"], preload: false });
const hand = Caveat({ variable: "--font-caveat", weight: ["500", "600"], subsets: ["latin"], preload: false });
// Font kiểu biển báo/vé máy bay cho trang visa
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", weight: ["500", "700"], subsets: ["latin"], preload: false });
const poppins = Poppins({ variable: "--font-poppins", weight: ["600", "700", "800"], subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({
    title: "Vietlook Travel – Private Vietnam Tours, Car Rental & Visa",
    description: "Private and tailor-made tours across Vietnam by local born travel specialists: Halong Bay cruises, Sapa, Hoi An, Mekong Delta, private car with driver and airport fast track.",
    path: "/",
    image: "/images/hero-fallback.webp",
    keywords: ["Vietnam tours", "Vietnam travel agency", "private tour Vietnam", "tailor-made Vietnam", "Halong Bay cruise", "越南旅游"],
  }),
  title: { default: "Vietlook Travel – Private Vietnam Tours, Car Rental & Visa", template: "%s | Vietlook Travel" },
  robots: { index: true, follow: true },
};

// Dữ liệu có cấu trúc cho Google: doanh nghiệp du lịch
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-footer.webp`,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "No 58, Yen Nghia Ward", addressLocality: "Ha Noi", addressCountry: "VN" },
  sameAs: [SITE.facebook],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "35" },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = (await cookies()).get("lang")?.value === "zh" ? "zh" : "en";
  // Ảnh cho dropdown menu: điểm đến (/tours?destination=) và thành phố xe (/car-rental/<city>)
  const [dests, carCities] = await Promise.all([getDestinations(), getCarCities()]);
  const menuImages = Object.fromEntries([
    ...dests.map((d) => [`/tours?destination=${d.slug}`, d.image]),
    ...carCities.map((c) => [`/car-rental/${c.slug.replace(/-private-cars$/, "")}`, c.image]),
    ["/car-rental", "/images/heroes/car.webp"],
    // Ô "Special tours" chưa có ảnh trong dữ liệu nên dùng ảnh tĩnh
    ["/tours?theme=cruise-tour", "https://vietlooktravel.com/wp-content/uploads/2026/01/paradise-delight-ha-long-bay-cruise.jpg"],
    ["/tours?theme=travel-experience", "/images/reviews/hats.webp"],
    ["/tailor-made", "/images/tailor-hoian.webp"],
    ["/tailor-made#golf", "/images/tailor-bg.webp"],
    ["/tailor-made#senior", "/images/reviews/oldquarter.webp"],
    ["/tailor-made#wheelchair", "/images/reviews/tamcoc.webp"],
    ["/tailor-made#couple", "/images/reviews/tamcoc.webp"],
    ["/tailor-made#family", "/images/reviews/oldquarter.webp"],
    ["/tours?theme=vietnam-tours", "/images/heroes/tours.webp"],
    ["/tours?q=mekong", dests.find((d) => d.slug === "ho-chi-minh-tour")?.image ?? null],
    ["/tours?q=loop", dests.find((d) => d.slug === "ha-giang-tour")?.image ?? null],
    ["/tours?q=trek", dests.find((d) => d.slug === "sapa-tour")?.image ?? null],
    ["/tours?q=food", dests.find((d) => d.slug === "ha-noi-tour")?.image ?? null],
    ["/tours?q=adventure", dests.find((d) => d.slug === "cao-bang-tour")?.image ?? null],
    ["/tours?q=honeymoon", dests.find((d) => d.slug === "phu-quoc-tour")?.image ?? null],
    ...TOUR_THEMES.map((th) => [`/themes/${th.slug}`, themeCover(th.cover)]),
    ["/tours?q=luxury", "https://vietlooktravel.com/wp-content/uploads/2026/01/paradise-delight-ha-long-bay-cruise.jpg"],
    ["/tours?minDays=2&maxDays=5", dests.find((d) => d.slug === "ninh-binh-tour")?.image ?? null],
    ["/tours?minDays=6&maxDays=10", dests.find((d) => d.slug === "da-nang-tour")?.image ?? null],
    ["/tours?minDays=11&maxDays=17", dests.find((d) => d.slug === "hoi-an")?.image ?? null],
    ["/tours?minDays=18&maxDays=24", dests.find((d) => d.slug === "sapa-tour")?.image ?? null],
    ["/tours?minDays=25&maxDays=999", dests.find((d) => d.slug === "ha-long-tour")?.image ?? null],
    ["/tours?region=north", dests.find((d) => d.slug === "ha-long-tour")?.image ?? null],
    ["/tours?region=central", dests.find((d) => d.slug === "hue-tour")?.image ?? null],
    ["/tours?region=south", dests.find((d) => d.slug === "phu-quoc-tour")?.image ?? null],
  ]);
  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"} className={`${inter.variable} ${playfair.variable} ${script.variable} ${hand.variable} ${poppins.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
        <LangProvider initial={lang}>
          <Header images={menuImages} />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <ScrollReveal />
        </LangProvider>
      </body>
    </html>
  );
}
