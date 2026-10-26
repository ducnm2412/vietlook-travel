"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import HandNote from "./HandNote";
import { useLang } from "@/lib/i18n";

// Ảnh là ảnh minh hoạ chuyến đi (không phải ảnh của người đánh giá) – thay bằng ảnh khách thật khi có.
// Đánh giá thật trên TripAdvisor (EXCELLENT – 35 reviews), trích từ vietlooktravel.com
const REVIEWS = [
  { name: "Bhavik Shah", place: "Ha Noi & Da Nang", image: "/images/reviews/biking.webp", title: "Our Vietlook guides were excellent", text: "Our Vietlook guides Mr. Tinh and Ms. Alana were excellent – friendly, knowledgeable and always on time. A very well organised trip." },
  { name: "Patel family", place: "Phu Quoc", image: "/images/reviews/boat.webp", title: "They took great care of our family", text: "Our guide was very knowledgeable and took great care of our family throughout the tour." },
  { name: "Nisarg S", place: "Da Nang", image: "/images/reviews/oldquarter.webp", title: "A wonderful local guide in Da Nang", text: "Our Vietlook tour guide Alina was wonderful – friendly, helpful and full of stories about Da Nang and Hoi An." },
  { name: "Niku P", place: "Phu Quoc", image: "/images/reviews/hats.webp", title: "Helped us discover local food", text: "The guide was so kind and helped us discover the local food. Thank you Vietlook Travel!" },
  { name: "Kruti G", place: "Vietnam", image: "/images/reviews/tamcoc.webp", title: "Knowledgeable guide, great English", text: "Our guide had great knowledge of every place we visited and spoke very good English. Highly recommended." },
  { name: "Hetal S", place: "Vietnam", image: "/images/reviews/hmong.webp", title: "A memorable trip", text: "Nice, friendly, good, memorable one. Should visit Vietnam once in life." },
];

// Thẻ đánh giá có ảnh, cuộn ngang bằng nút mũi tên (kiểu localvietnam.com)
export default function Reviews() {
  const { lang } = useLang();
  const zh = lang === "zh";
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 1.5), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="scroll-mt-32 py-12 md:py-20">
      <div className="container-x">
        <div className="mb-4 md:mb-10 flex flex-col gap-2 md:flex-row-reverse md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl md:text-right">
          <h2 className="font-card text-3xl font-bold leading-tight text-white md:text-5xl">{zh ? "客人的旅行体验" : "Guest Experiences"}</h2>
          </div>
          <HandNote light side="left" className="md:mb-10 md:ml-6" lines={[{"en":"Real trips. Real smiles.","zh":"真实的旅程，真实的笑容。"}]} />
        </div>

        <div className="relative mt-8 md:mt-12">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="absolute -left-3 top-[30%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white md:grid">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="absolute -right-3 top-[30%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white md:grid">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <div ref={track} className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map((r) => (
              <article key={r.name} className="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.place} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                <div className="relative px-7 pb-7 pt-10">
                  <span className="absolute -top-6 left-7 grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-md">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </span>
                  <h3 className="font-card text-xl font-bold leading-snug">{r.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{r.text}</p>
                  <p className="mt-5 text-sm"><b>{r.name}</b> · <span className="text-muted">{r.place}</span></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
