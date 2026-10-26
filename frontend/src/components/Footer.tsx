import Link from "@/components/LocaleLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { L, T } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Item = { en: string; zh: string; href: string };

const ABOUT_VIETNAM: Item[] = [
  { en: "Vietnam travel guide", zh: "越南旅游攻略", href: "/news" },
  { en: "North Vietnam", zh: "越南北部", href: "/tours?region=north" },
  { en: "Central Vietnam", zh: "越南中部", href: "/tours?region=central" },
  { en: "South Vietnam", zh: "越南南部", href: "/tours?region=south" },
  { en: "Best time to visit", zh: "最佳旅游时间", href: "/news/best-time-to-visit-ninh-binh-a-complete-seasonal-guide" },
  { en: "Best things to do", zh: "必做的事", href: "/news/top-tourist-attractions-in-ninh-binh-vietnam" },
];

const SERVICES: Item[] = [
  { en: "Tailor-made trips", zh: "定制旅游", href: "/tailor-made" },
  { en: "Package tours", zh: "跟团套餐", href: "/tours?theme=vietnam-tours" },
  { en: "Day & multi-day tours", zh: "一日游与多日游", href: "/tours" },
  { en: "Cruises", zh: "游轮之旅", href: "/tours?theme=cruise-tour" },
  { en: "Cultural experiences", zh: "文化体验", href: "/tours?theme=travel-experience" },
  { en: "Private car rental", zh: "包车服务", href: "/car-rental" },
  { en: "Airport fast track & visa", zh: "快速通关与签证", href: "/visa" },
  { en: "B2B partners", zh: "B2B合作", href: "/partners" },
];

const COMPANY: Item[] = [
  { en: "About us", zh: "关于我们", href: "/about" },
  { en: "Payment policy", zh: "付款政策", href: "/payment-policy" },
  { en: "Cancellation & changes", zh: "取消与变更", href: "/cancellation-policy" },
  { en: "Privacy policy", zh: "隐私政策", href: "/privacy-policy" },
  { en: "Guest reviews", zh: "客人评价", href: "/#reviews" },
  { en: "News & blog", zh: "新闻与博客", href: "/news" },
  { en: "Contact", zh: "联系我们", href: "/contact" },
];

function Column({ title, items }: { title: { en: string; zh: string }; items: Item[] }) {
  return (
    <div>
      <p className="mb-3 font-card text-sm font-bold uppercase tracking-wide text-white lg:mb-5 lg:text-base"><L en={title.en} zh={title.zh} /></p>
      <ul className="space-y-2 text-sm lg:space-y-3 lg:text-[15px]">
        {items.map((i) => (
          <li key={i.href + i.en}>
            <Link href={i.href} className="transition hover:text-accent"><L en={i.en} zh={i.zh} /></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/75">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-[1.3fr_1fr_1.1fr_0.8fr_1.3fr] lg:gap-10 lg:py-16">
        <div className="col-span-2 flex items-center justify-between gap-4 lg:col-span-1 lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.logoFooter} alt={SITE.shortName} className="h-12 w-auto lg:h-16" loading="lazy" />
          <p className="mt-4 hidden text-sm leading-relaxed lg:block"><T k="footer.about" /></p>
          <div className="flex gap-2 lg:mt-6 lg:gap-3">
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 lg:h-10 lg:w-10 transition hover:bg-accent hover:text-white"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 lg:h-10 lg:w-10 transition hover:bg-accent hover:text-white"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 lg:h-10 lg:w-10 text-xs font-bold transition hover:bg-accent hover:text-white">Zalo</a>
          </div>
        </div>

        <Column title={{ en: "About Vietnam", zh: "关于越南" }} items={ABOUT_VIETNAM} />
        <Column title={{ en: "Our services", zh: "我们的服务" }} items={SERVICES} />
        <Column title={{ en: "Company", zh: "公司" }} items={COMPANY} />

        <div>
          <p className="mb-3 font-card text-sm font-bold uppercase tracking-wide text-white lg:mb-5 lg:text-base"><L en="Contact us" zh="联系我们" /></p>
          <ul className="space-y-3 text-sm lg:space-y-4 lg:text-[15px]">
            <li className="flex gap-3"><FontAwesomeIcon icon={faLocationDot} className="mt-1 w-4 text-accent" /><span>{SITE.address}<a href={SITE.maps} target="_blank" rel="noopener" className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-accent lg:hidden"><FontAwesomeIcon icon={faDiamondTurnRight} /> <L en="Get directions" zh="获取路线" /></a></span></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faPhone} className="mt-1 w-4 text-accent" /><span><a href={`tel:+${SITE.phoneRaw}`} className="hover:text-accent">{SITE.phone}</a><br /><span className="text-xs text-white/50">Zalo / WhatsApp / WeChat</span></span></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faPhone} className="mt-1 w-4 text-accent" /><a href={`tel:+${SITE.phone2Raw}`} className="hover:text-accent">{SITE.phone2}</a></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faEnvelope} className="mt-1 w-4 text-accent" /><a href={`mailto:${SITE.email}`} className="break-all hover:text-accent">{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      {/* Văn phòng + bản đồ (chỉ máy tính; điện thoại dùng nút chỉ đường ở mục liên hệ) */}
      <div className="hidden border-t border-white/10 lg:block">
        <div className="container-x grid items-center gap-6 py-8 lg:grid-cols-[1fr_1.4fr] lg:gap-8 lg:py-10">
          <div>
            <p className="font-card text-base font-bold uppercase tracking-wide text-white"><L en="Our office" zh="我们的办公室" /></p>
            <p className="mt-4 flex gap-3 text-lg text-white">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1.5 w-4 text-accent" />
              <span>{SITE.name}<br /><span className="text-white/75">{SITE.address}</span></span>
            </p>
            <a href={SITE.maps} target="_blank" rel="noopener" className="btn mt-6 bg-accent text-ink hover:bg-accent-dark">
              <FontAwesomeIcon icon={faDiamondTurnRight} /> <L en="Get directions" zh="获取路线" />
            </a>
          </div>
          <iframe src={SITE.mapEmbed} title="Vietlook Travel office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-40 w-full rounded-2xl border-0 lg:h-56" />
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        Copyright {new Date().getFullYear()} © {SITE.name}
      </div>
    </footer>
  );
}
