import Link from "@/components/LocaleLink";
import { HeroCredit } from "./PageHero";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendarXmark, faCreditCard, faEnvelope, faPhone, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Text = { en: string; zh: string };
export type PolicySection = Text & { icon: IconDefinition; items: (Text & { strong?: Text })[] };

// Các trang chính sách: hero căn giữa, 3 cột – menu chính sách | nội dung | mục lục + liên hệ
export const POLICIES = [
  { href: "/payment-policy", en: "Payment policy", zh: "付款政策", icon: faCreditCard },
  { href: "/cancellation-policy", en: "Cancellation and changes", zh: "取消与变更", icon: faCalendarXmark },
  { href: "/privacy-policy", en: "Privacy policy", zh: "隐私政策", icon: faShieldHalved },
];

const card = "rounded-2xl bg-white p-5 ring-1 ring-black/10";
const kicker = "px-2 text-xs font-bold uppercase tracking-[0.2em] text-brand";
const anchor = (s: Text) => s.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CONTACTS: [IconDefinition, string, string][] = [
  [faWhatsapp, "WhatsApp", `https://wa.me/${SITE.phoneRaw}`],
  [faPhone, "Hotline", `tel:+${SITE.phoneRaw}`],
  [faEnvelope, "Email", `mailto:${SITE.email}`],
];

export default function PolicyPage({ title, sub, image, intro, note, sections, current }: { title: Text; sub: Text; image: string; intro: Text; note?: Text; sections: PolicySection[]; current: string }) {
  return (
    <>
      <section className="relative isolate overflow-hidden text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="container-x py-20 md:py-28">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <Link href="/" className="hover:text-white"><T k="nav.home" /></Link> <span className="mx-2">›</span> <span className="text-white"><L en={title.en} zh={title.zh} /></span>
          </nav>
          <h1 className="mt-4 font-card text-5xl font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-6xl"><L en={title.en} zh={title.zh} /></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold drop-shadow"><L en={sub.en} zh={sub.zh} /></p>
        </div>
        <HeroCredit image={image} />
      </section>

      <section className="container-x grid items-start gap-10 py-14 lg:grid-cols-[240px_1fr_260px]">
        {/* Menu chính sách */}
        <nav className={`${card} lg:sticky lg:top-32`}>
          <p className={kicker}><L en="Booking policies" zh="预订政策" /></p>
          <div className="mt-3 space-y-1">
            {POLICIES.map((p) => {
              const on = p.href === current;
              return (
                <Link key={p.href} href={p.href} aria-current={on ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition ${on ? "bg-brand font-semibold text-white" : "hover:bg-sand"}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs ${on ? "bg-white/15" : "bg-brand-light text-brand"}`}><FontAwesomeIcon icon={p.icon} /></span>
                  <L en={p.en} zh={p.zh} />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Nội dung */}
        <article className="min-w-0">
          <p className="leading-loose text-ink/80"><L en={intro.en} zh={intro.zh} /></p>
          {note && <p className="mt-4 rounded-xl border-l-4 border-accent bg-sand px-5 py-3 text-sm text-ink/80"><L en={note.en} zh={note.zh} /></p>}
          {sections.map((s) => (
            <div key={s.en} id={anchor(s)} className="mt-10 scroll-mt-32">
              <h2 className="font-card text-3xl font-bold"><L en={s.en} zh={s.zh} /></h2>
              <ul className="mt-4 space-y-2 leading-loose text-ink/80">
                {s.items.map((i) => (
                  <li key={i.en} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{i.strong && <b className="text-ink"><L en={i.strong.en} zh={i.strong.zh} /> </b>}<L en={i.en} zh={i.zh} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>

        {/* Mục lục + liên hệ */}
        <aside className="space-y-5 lg:sticky lg:top-32">
          <div className={card}>
            <p className={kicker}><L en="On this page" zh="本页目录" /></p>
            <ul className="ml-2 mt-3 space-y-3 border-l border-black/10 pl-4 text-sm text-muted">
              {sections.map((s) => <li key={s.en}><a href={`#${anchor(s)}`} className="hover:text-brand"><L en={s.en} zh={s.zh} /></a></li>)}
            </ul>
          </div>
          <div className={card}>
            <p className="font-card text-lg font-bold leading-snug"><L en="Questions about this policy?" zh="对本政策有疑问？" /></p>
            <p className="mt-1 text-sm text-muted"><L en="Our team is happy to explain any detail before you book." zh="预订前，我们乐意为您解答任何细节。" /></p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold">
              {CONTACTS.map(([icon, label, href]) => (
                <a key={label} href={href} className="flex flex-col items-center gap-1.5 rounded-xl py-3 ring-1 ring-black/10 transition hover:text-brand hover:ring-brand">
                  <FontAwesomeIcon icon={icon} className="text-base text-brand" />{label}
                </a>
              ))}
            </div>
            <Link href="/tailor-made" className="btn btn-accent mt-4 w-full !py-2.5 text-sm"><L en="Free Trip Planning" zh="免费行程规划" /></Link>
          </div>
        </aside>
      </section>
    </>
  );
}
