import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot, faPhone, faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "Contact Vietlook Travel",
  description: "Contact our Hanoi office by WhatsApp, Zalo, WeChat or email: +84 98.339.3588 · infovietlooktravel@gmail.com · No 58, Yen Nghia Ward, Ha Noi.",
  path: "/contact",
  image: "/images/heroes/contact.webp",
  keywords: ["contact Vietlook Travel","Hanoi travel agency contact"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero title={<T k="nav.contact" />} image="/images/heroes/contact.webp" />
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div className="space-y-6">
          <ul className="space-y-3 text-[15px]">
            <li className="flex gap-3"><FontAwesomeIcon icon={faBuilding} className="mt-1 w-4 text-brand" /><b>{SITE.name}</b></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faLocationDot} className="mt-1 w-4 text-brand" /><span>Head office: {SITE.address}</span></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faPhone} className="mt-1 w-4 text-brand" /><span>Hotline: <a href={`tel:+${SITE.phoneRaw}`} className="font-semibold text-brand">{SITE.phone}</a> (Zalo / WhatsApp / WeChat)</span></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faPhone} className="mt-1 w-4 text-brand" /><a href={`tel:+${SITE.phone2Raw}`} className="font-semibold text-brand">{SITE.phone2}</a></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faEnvelope} className="mt-1 w-4 text-brand" /><span>{SITE.email}</span></li>
            <li className="flex gap-3"><FontAwesomeIcon icon={faGlobe} className="mt-1 w-4 text-brand" /><a href={SITE.facebook} target="_blank" rel="noopener" className="text-brand hover:underline">facebook.com/vietlooktravelhanoi</a></li>
          </ul>
          <iframe src={SITE.mapEmbed} title="Map" className="h-80 w-full rounded-2xl border-0" loading="lazy" />
        </div>
        <ContactForm />
      </section>
    </>
  );
}
