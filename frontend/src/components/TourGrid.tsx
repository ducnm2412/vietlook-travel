"use client";

import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TourCard from "./TourCard";
import { useLang } from "@/lib/i18n";
import type { Tour } from "@/lib/api";

const MOBILE_LIMIT = 3;

// Lưới thẻ tour 3 cột; trên điện thoại chỉ hiện 3 thẻ đầu, bấm "Xem thêm" để mở phần còn lại
// `action`: nút "Xem tất cả" đặt cùng hàng với nút "Xem thêm"
export default function TourGrid({ tours, action }: { tours: Tour[]; action?: ReactNode }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const hidden = tours.length - MOBILE_LIMIT;

  return (
    <>
      <div className="stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <div key={tour.slug} className={!open && i >= MOBILE_LIMIT ? "hidden sm:block" : ""}>
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 sm:mt-10">
        {!open && hidden > 0 && (
          <button onClick={() => setOpen(true)} className="btn btn-outline whitespace-nowrap bg-white !px-4 !py-2.5 text-sm text-brand shadow-md sm:hidden">
            {lang === "zh" ? `查看更多 (${hidden})` : `Show more (${hidden})`} <FontAwesomeIcon icon={faChevronDown} />
          </button>
        )}
        {action}
      </div>
    </>
  );
}
