"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import HandNote from "./HandNote";
import { useLang } from "@/lib/i18n";

// Ảnh là ảnh minh hoạ chuyến đi (không phải ảnh của người đánh giá) – thay bằng ảnh khách thật khi có.
// Bản tiếng Trung là bản dịch. Đánh giá thật trên TripAdvisor (EXCELLENT – 35 reviews), trích từ vietlooktravel.com
const REVIEWS: { name: string; place: string; image: string; placeZh: string; title: string; titleZh: string; text: string; textZh: string; rating?: number }[] = [
  { name: "Bhavik Shah", place: "Ha Noi and Da Nang", image: "/images/reviews/biking.webp", placeZh: "河内 and 岘港", title: "Our Vietlook guides were excellent", titleZh: "Vietlook 的导游非常出色", text: "Our Vietlook guides Mr. Tinh and Ms. Alana were excellent – friendly, knowledgeable and always on time. A very well organised trip.", textZh: "Vietlook 的导游 Tinh 先生和 Alana 女士非常出色——友好、知识渊博，而且总是准时。行程安排得非常周到。" },
  { name: "Patel family", place: "Phu Quoc", image: "/images/reviews/boat.webp", placeZh: "富国岛", title: "They took great care of our family", titleZh: "他们把我们一家照顾得很好", text: "Our guide was very knowledgeable and took great care of our family throughout the tour.", textZh: "我们的导游知识丰富，整个行程中都把我们一家照顾得无微不至。" },
  { name: "Nisarg S", place: "Da Nang", image: "/images/reviews/oldquarter.webp", placeZh: "岘港", title: "A wonderful local guide in Da Nang", titleZh: "岘港一位很棒的当地导游", text: "Our Vietlook tour guide Alina was wonderful – friendly, helpful and full of stories about Da Nang and Hoi An.", textZh: "Vietlook 的导游 Alina 非常棒——友好、热心，还给我们讲了许多关于岘港和会安的故事。" },
  { name: "Niku P", place: "Phu Quoc", image: "/images/reviews/hats.webp", placeZh: "富国岛", title: "Helped us discover local food", titleZh: "带我们发现地道美食", text: "The guide was so kind and helped us discover the local food. Thank you Vietlook Travel!", textZh: "导游非常亲切，带我们品尝了当地美食。谢谢 Vietlook Travel！" },
  { name: "Kruti G", place: "Vietnam", image: "/images/reviews/tamcoc.webp", placeZh: "越南", title: "Knowledgeable guide, great English", titleZh: "导游知识渊博，英语流利", text: "Our guide had great knowledge of every place we visited and spoke very good English. Highly recommended.", textZh: "我们的导游对每个景点都非常了解，英语也说得很好。强烈推荐！" },
  { name: "Hetal S", place: "Vietnam", image: "/images/reviews/hmong.webp", placeZh: "越南", title: "A memorable trip", titleZh: "难忘的旅程", text: "Nice, friendly, good, memorable one. Should visit Vietnam once in life.", textZh: "友好、愉快、难忘的一次旅行。一生中一定要来一次越南。" },
];

// Avatar chữ cái đầu (chưa có ảnh thật của khách), màu theo vị trí
const AVATAR_BG = ["bg-brand", "bg-accent", "bg-[#b4532a]", "bg-[#2f6f8f]", "bg-[#6b4c9a]", "bg-[#3d7a4f]"];
const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

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
            {REVIEWS.map((r, i) => (
              <article key={r.name} className="flex w-[85%] flex-col shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={zh ? r.placeZh : r.place} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                <div className="relative flex flex-1 flex-col px-7 pb-7 pt-10">
                  <span className="absolute -top-6 left-7 grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-md">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </span>
                  {/* Sao đánh giá: các đánh giá này là 5 sao trên Tripadvisor (đổi r.rating nếu có đánh giá khác) */}
                  <div className="mb-2 flex gap-1 text-[#f5a623]" role="img" aria-label={`${r.rating ?? 5}/5`}>
                    {Array.from({ length: 5 }, (_, k) => <FontAwesomeIcon key={k} icon={faStar} className={k < (r.rating ?? 5) ? "" : "text-black/15"} />)}
                  </div>
                  <h3 className="font-card text-xl font-bold leading-snug">{zh ? r.titleZh : r.title}</h3>
                  <p className="mb-5 mt-3 text-base leading-relaxed text-muted">{zh ? r.textZh : r.text}</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-black/5 pt-5">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-card text-sm font-bold text-white ring-2 ring-white shadow ${AVATAR_BG[i % AVATAR_BG.length]}`} aria-hidden>{initials(r.name)}</span>
                    <span className="text-sm leading-tight">
                      <b className="block">{r.name}</b>
                      <span className="text-muted">{zh ? r.placeZh : r.place}</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
