import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faHeadset, faHouseFlag, faMoneyBillWave, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "./SectionHeading";
import { L } from "@/lib/i18n";
import { WHY } from "@/lib/about";

const ICONS = [faUsers, faHandHoldingHeart, faHeadset, faHouseFlag, faMoneyBillWave, faStar];

// Khối "Lý do chọn Vietlook" trên trang chủ (nội dung dùng chung với trang About)
export default function WhyVietlook() {
  return (
    <section className="b2b-wallpaper pb-14 pt-4 md:pb-20 md:pt-6">
      <div className="container-x">
        <SectionHeading center kicker={<L en="Why Vietlook Travel" zh="为什么选择 Vietlook" />} title={<L en="Six reasons travellers choose us" zh="旅客选择我们的六个理由" />} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <div key={w.en} className="group rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-xl text-brand transition group-hover:bg-brand group-hover:text-white">
                <FontAwesomeIcon icon={ICONS[i]} />
              </span>
              <p className="mt-4 font-card text-lg font-bold"><L en={w.en} zh={w.zh} /></p>
              <p className="mt-2 text-sm leading-relaxed text-muted"><L en={w.d} zh={w.dzh} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
