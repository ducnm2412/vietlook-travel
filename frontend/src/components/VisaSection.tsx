import Link from "@/components/LocaleLink";
import Img from "./Img";
import { L, T } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPassport, faPersonWalkingLuggage, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

const POINTS = [
  { icon: faPassport, en: "E-visa support", zh: "电子签证协助", d: "We check and submit your application", dzh: "代为核对并提交申请" },
  { icon: faPersonWalkingLuggage, en: "VIP fast-track", zh: "VIP 快速通关", d: "Skip immigration queues on arrival or departure", dzh: "入境或出境免排队" },
  { icon: faPlaneArrival, en: "All major airports", zh: "各大机场", d: "Noi Bai, Da Nang, Tan Son Nhat and more", dzh: "内排、岘港、新山一等机场" },
];

// Visa + fast-track sân bay – section cuối nhóm dịch vụ trên trang chủ, dẫn sang /visa
export default function VisaSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"><L en="Visa and airport services" zh="签证与机场服务" /></p>
          <h2 className="mt-3 font-card text-3xl font-bold leading-tight md:text-4xl"><T k="sec.visa.t" /></h2>
          <p className="mt-4 text-muted"><T k="sec.visa.s" /></p>
          <div className="mt-8 grid gap-4">
            {POINTS.map((p) => (
              <div key={p.en} className="group flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white"><FontAwesomeIcon icon={p.icon} /></span>
                <span>
                  <span className="block font-semibold"><L en={p.en} zh={p.zh} /></span>
                  <span className="block text-sm text-muted"><L en={p.d} zh={p.dzh} /></span>
                </span>
              </div>
            ))}
          </div>
          <Link href="/visa" className="btn btn-brand mt-8 inline-flex"><L en="Visa and fast-track" zh="签证与快速通关" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
        <Img src="/images/heroes/visa.webp" alt="Vietnam visa and airport fast-track" width={600} className="order-1 aspect-[4/3] rounded-3xl shadow-xl lg:order-2" />
      </div>
    </section>
  );
}
