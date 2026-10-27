import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { T } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = pageMeta({
  title: "B2B Partners – Vietnam DMC for Travel Agents",
  description: "Net rates, quotes within 24 hours, white-label service and 24/7 operations for travel agents and tour operators selling Vietnam.",
  path: "/partners",
  image: "/images/heroes/partners.webp",
  keywords: ["Vietnam DMC","B2B Vietnam travel","Vietnam ground handler"],
});

const SERVICES = ["FIT and group tours, MICE and incentives", "Hotel and Halong cruise contracting (3–5★)", "Private cars 4–45 seats nationwide", "English and Chinese speaking guides", "Visa and airport fast-track for groups", "White-label vouchers and itineraries"];

export default function PartnersPage() {
  return (
    <>
      <PageHero title={<T k="sec.b2b.t" />} sub={<T k="sec.b2b.s" />} image="/images/heroes/partners.webp" />
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-bold">Why agencies work with Vietlook</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(["1", "2", "3", "4"] as const).map((n) => (
              <div key={n} className="rounded-2xl bg-brand-light p-5">
                <p className="font-semibold text-brand"><T k={`b2b.${n}.t`} /></p>
                <p className="mt-1 text-sm text-muted"><T k={`b2b.${n}.d`} /></p>
              </div>
            ))}
          </div>
          <h3 className="mt-10 font-serif text-2xl font-bold">Ground services we handle</h3>
          <ul className="mt-4 space-y-2">{SERVICES.map((s) => <li key={s} className="flex gap-3"><FontAwesomeIcon icon={faCheck} className="mt-1 text-accent" />{s}</li>)}</ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-2xl font-bold">Request partner rates</h2>
          <ContactForm type="partner" />
        </div>
      </section>
    </>
  );
}
