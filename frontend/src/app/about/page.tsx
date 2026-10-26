import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Img from "@/components/Img";
import PageHero from "@/components/PageHero";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { CONSULTANT, INTRO, LANGUAGES, MISSION, PEOPLE, PRIVATE_BENEFITS, VALUES, VALUE_POINTS, VISION, WHY } from "@/lib/about";

export const metadata: Metadata = pageMeta({
  title: "About Vietlook Travel – Local Tour Operator in Hanoi since 2009",
  description: "Vietlook Travel (formerly A Thai Travel) has arranged private tours, golf packages and transport across Vietnam and Asia since 2009, with guides speaking English, Chinese, Japanese, Korean and more.",
  path: "/about",
  image: "/images/heroes/about.webp",
  keywords: ["Vietlook Travel", "Vietnam tour operator", "Hanoi travel agency", "private tour Vietnam"],
});

const kicker = "text-sm font-semibold uppercase tracking-[0.18em] text-accent";
const head = "font-card text-3xl font-bold leading-tight md:text-4xl";
const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function AboutPage() {
  return (
    <>
      <PageHero title={<T k="nav.about" />} sub={<L en="Local experts crafting private journeys across Asia since 2009." zh="自2009年起，本地专家为您打造亚洲私人旅程。" />} image="/images/heroes/about.webp" />

      {/* Giới thiệu */}
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <div className="space-y-5 text-[17px] leading-relaxed">
          <p className={kicker}><L en="Welcome to Vietlook Travel" zh="欢迎来到 Vietlook Travel" /></p>
          <h2 className={head}><L en="Private tours in Vietnam and across Asia" zh="越南及亚洲私人定制游" /></h2>
          {INTRO.map((p) => <p key={p.en.slice(0, 20)} className="text-ink/85"><L en={p.en} zh={p.zh} /></p>)}
          <div className="flex flex-wrap gap-2 pt-1">
            {LANGUAGES.map((l) => <span key={l.en} className="rounded-full bg-sand px-3 py-1 text-sm"><L en={l.en} zh={l.zh} /></span>)}
          </div>
        </div>
        <div className="lg:sticky lg:top-32">
          <Img src="https://cdn.ngay.net/khach/welcome-vietlook.png?format=auto" alt="Welcome to Vietlook Travel" className="aspect-[4/3] rounded-3xl" />
          <dl className="mt-6 grid grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-5 text-center">
            {[["2009", "Founded", "成立"], ["15+", "Years", "年经验"], ["1,796", "Reviews", "条评价"]].map(([n, en, zh]) => (
              <div key={en}><dt className="font-card text-3xl font-bold text-brand">{n}</dt><dd className="mt-1 text-xs uppercase tracking-wider text-muted"><L en={en} zh={zh} /></dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tầm nhìn, sứ mệnh, giá trị cốt lõi */}
      <section className="bg-brand-dark py-16 text-white md:py-20">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-2">
            {[["Vision", "愿景", VISION], ["Mission", "使命", MISSION]].map(([en, zh, v]) => (
              <div key={en as string} className="border-l-4 border-accent pl-6">
                <p className={kicker}><L en={en as string} zh={zh as string} /></p>
                <p className="mt-3 font-serif text-2xl leading-snug md:text-3xl"><L en={(v as typeof VISION).en} zh={(v as typeof VISION).zh} /></p>
              </div>
            ))}
          </div>
          <p className={`${kicker} mt-16`}><L en="Core values" zh="核心价值" /></p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.en} className="bg-brand-dark p-6">
                <span className="font-mono text-sm text-accent">{pad(i)}</span>
                <p className="mt-2 font-card text-xl font-bold"><L en={v.en} zh={v.zh} /></p>
                <p className="mt-2 text-sm text-white/70"><L en={v.d} zh={v.dzh} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Con người */}
      <section className="container-x py-16 md:py-20">
        <p className={kicker}><L en="Our people" zh="我们的团队" /></p>
        <h2 className={`${head} mt-2`}><L en="The values behind every trip" zh="每段旅程背后的价值观" /></h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {PEOPLE.map((g) => (
            <div key={g.title.en}>
              <p className="font-card text-lg font-bold"><L en={g.title.en} zh={g.title.zh} /></p>
              <dl className="mt-4 divide-y divide-black/10 border-y border-black/10">
                {g.items.map((it) => (
                  <div key={it.en} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
                    <dt className="font-semibold text-brand"><L en={it.en} zh={it.zh} /></dt>
                    <dd className="text-muted"><L en={it.d} zh={it.dzh} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Vì sao chọn chúng tôi */}
      <section className="bg-sand py-16 md:py-20">
        <div className="container-x">
          <p className={kicker}><L en="Why choose us" zh="为什么选择我们" /></p>
          <h2 className={`${head} mt-2 max-w-2xl`}><L en="Six reasons travellers come back to us" zh="旅客一再选择我们的六个理由" /></h2>
          <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <li key={w.en} className="border-t-2 border-ink pt-4">
                <span className="font-mono text-sm text-accent">{pad(i)}</span>
                <p className="mt-1 font-card text-lg font-bold"><L en={w.en} zh={w.zh} /></p>
                <p className="mt-2 text-sm text-muted"><L en={w.d} zh={w.dzh} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tour riêng là gì */}
      <section className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className={kicker}><L en="What is a private tour?" zh="什么是私人定制游？" /></p>
          <h2 className={`${head} mt-2`}><L en="Exclusive doesn't mean expensive" zh="专属不等于昂贵" /></h2>
          <p className="mt-4 text-muted"><L en="A private tour is exclusive to you and the people you travel with. The itinerary is built for you and the whole trip is organised around your needs, which matters most when travelling with children, seniors or anyone needing special care." zh="私人定制游只属于您和同行的人。行程为您量身打造，全程按您的需求安排，尤其适合带孩子、长者或需要特别照顾的旅客。" /></p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PRIVATE_BENEFITS.map((b) => (
            <div key={b.en} className="rounded-2xl p-6 ring-1 ring-black/10">
              <p className="font-card text-lg font-bold"><L en={b.en} zh={b.zh} /></p>
              <p className="mt-2 text-sm text-muted"><L en={b.d} zh={b.dzh} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Chất lượng, giá hợp lý */}
      <section className="container-x pb-16 md:pb-20">
        <div className="rounded-3xl bg-brand-light p-8 md:p-12">
          <p className={kicker}><L en="Quality holiday at an affordable price" zh="高品质，价格实惠" /></p>
          <h2 className={`${head} mt-2 max-w-3xl`}><L en="Travel for value, not for budget" zh="追求价值，而非低价" /></h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {VALUE_POINTS.map((v) => (
              <div key={v.en}>
                <p className="font-card font-bold text-brand"><L en={v.en} zh={v.zh} /></p>
                <p className="mt-2 text-sm text-ink/75"><L en={v.d} zh={v.dzh} /></p>
              </div>
            ))}
          </div>
          <ul className="mt-8 space-y-2 border-t border-brand/15 pt-6 text-sm">
            {CONSULTANT.map((c) => <li key={c.en} className="flex gap-3"><span className="text-accent">✓</span><L en={c.en} zh={c.zh} /></li>)}
          </ul>
        </div>
      </section>

      {/* Liên hệ */}
      <section className="bg-tarmac py-16 text-white md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h2 className={head}><L en="Enquire now, decide later" zh="先咨询，后决定" /></h2>
            <p className="mt-3 max-w-xl text-white/70"><L en="Filling out an inquiry form is not a commitment to book. Take advantage of our free quote: it only takes a few minutes to create a lifetime of memories." zh="填写咨询表并不代表必须预订。免费获取报价，只需几分钟，留下一生的回忆。" /></p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tailor-made" className="btn btn-accent"><L en="Custom-make a tour" zh="定制行程" /></Link>
              <Link href="/tours" className="btn border border-white/30 text-white hover:bg-white/10"><L en="Sample tour packages" zh="参考行程" /></Link>
            </div>
          </div>
          <address className="space-y-2 text-sm not-italic text-white/80">
            <p className="font-card text-base font-bold text-white">VIETLOOK TRAVEL AND TRADE COMPANY LIMITED</p>
            <p>No 58, Yen Nghia Ward, Ha Dong District, Ha Noi, Vietnam</p>
            <p>Hotline: (+84) 98.339.3488 / <a href={`tel:+${SITE.phoneRaw}`} className="hover:text-white">{SITE.phone}</a> · Zalo / WhatsApp / WeChat</p>
            <p>Email: <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://vietlooktravel.com/wp-content/uploads/2023/01/dathongbao-bocongthuong.png" alt="Registered with the Ministry of Industry and Trade of Vietnam" loading="lazy" className="mt-4 h-12 w-auto" />
          </address>
        </div>
      </section>
    </>
  );
}
