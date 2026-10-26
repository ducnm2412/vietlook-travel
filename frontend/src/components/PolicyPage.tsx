import Link from "@/components/LocaleLink";
import PageHero from "./PageHero";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight, faCircleCheck, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Text = { en: string; zh: string };
export type PolicySection = Text & { icon: IconDefinition; items: (Text & { strong?: Text })[] };

// Các trang chính sách (thanh toán, huỷ/đổi): hero, đoạn mở đầu, thẻ từng mục có icon, link chính sách khác, khối liên hệ
export const POLICIES = [
  { href: "/payment-policy", en: "Payment policy", zh: "付款政策" },
  { href: "/cancellation-policy", en: "Cancellation & changes", zh: "取消与变更" },
  { href: "/privacy-policy", en: "Privacy policy", zh: "隐私政策" },
];

export default function PolicyPage({ title, sub, image, intro, note, sections, current }: { title: Text; sub: Text; image: string; intro: Text; note?: Text; sections: PolicySection[]; current: string }) {
  return (
    <>
      <PageHero title={<L en={title.en} zh={title.zh} />} sub={<L en={sub.en} zh={sub.zh} />} image={image} />

      <section className="container-x max-w-5xl py-14">
        <p className="text-lg leading-relaxed text-ink/80"><L en={intro.en} zh={intro.zh} /></p>
        {note && <p className="mt-4 rounded-xl border-l-4 border-accent bg-sand px-5 py-4 text-sm text-ink/80"><L en={note.en} zh={note.zh} /></p>}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sections.map((s, k) => (
            <div key={s.en} className="group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-light text-2xl text-brand transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                  <FontAwesomeIcon icon={s.icon} />
                </span>
                <div>
                  <p className="font-mono text-xs text-accent">{String(k + 1).padStart(2, "0")}</p>
                  <h2 className="font-card text-xl font-bold"><L en={s.en} zh={s.zh} /></h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {s.items.map((i) => (
                  <li key={i.en} className="flex gap-3 leading-relaxed text-ink/80">
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-1 shrink-0 text-brand" />
                    <span>{i.strong && <b className="text-ink"><L en={i.strong.en} zh={i.strong.zh} /> </b>}<L en={i.en} zh={i.zh} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chính sách khác */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted"><L en="Other policies" zh="其他政策" /></span>
          {POLICIES.filter((p) => p.href !== current).map((p) => (
            <Link key={p.href} href={p.href} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white">
              <L en={p.en} zh={p.zh} /> <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-photo-dark py-14 text-white">
        <div className="container-x text-center">
          <h2 className="font-serif text-3xl font-bold"><L en="Questions about this policy?" zh="对本政策有疑问？" /></h2>
          <p className="mt-2 text-white/80"><L en="Talk to us before you book – we're happy to explain." zh="预订前欢迎咨询，我们乐意为您解答。" /></p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${SITE.phoneRaw}`} className="btn btn-accent"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</a>
            <a href={`tel:+${SITE.phoneRaw}`} className="btn border border-white/40 text-white hover:bg-white/10"><FontAwesomeIcon icon={faPhone} /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="btn border border-white/40 text-white hover:bg-white/10"><FontAwesomeIcon icon={faEnvelope} /> {SITE.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
