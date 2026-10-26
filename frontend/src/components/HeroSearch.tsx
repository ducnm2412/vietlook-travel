"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import type { Destination, Theme } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const DURATIONS = [
  { value: "", en: "Any", zh: "不限" },
  { value: "1-3", en: "1–3 days", zh: "1–3天" },
  { value: "4-6", en: "4–6 days", zh: "4–6天" },
  { value: "7-9", en: "1 week", zh: "一周" },
  { value: "10-16", en: "2 weeks", zh: "两周" },
  { value: "17-30", en: "3 weeks+", zh: "三周以上" },
];

export default function HeroSearch({ destinations, themes }: { destinations: Destination[]; themes: Theme[] }) {
  const { t, lang } = useLang();
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [theme, setTheme] = useState("");
  const [duration, setDuration] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (destination) p.set("destination", destination);
    if (theme) p.set("theme", theme);
    if (duration) {
      const [min, max] = duration.split("-");
      p.set("minDays", min);
      p.set("maxDays", max);
    }
    router.push(`/tours?${p.toString()}`);
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
      <label>
        <span className="label">{t("search.destination")}</span>
        <select className="field" value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">{t("search.any")}</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>{lang === "zh" ? d.zh : d.name}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="label">{t("search.theme")}</span>
        <select className="field" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="">{t("search.any")}</option>
          {themes.map((th) => (
            <option key={th.slug} value={th.slug}>{lang === "zh" ? th.zh : th.name}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="label">{t("search.duration")}</span>
        <select className="field" value={duration} onChange={(e) => setDuration(e.target.value)}>
          {DURATIONS.map((d) => (
            <option key={d.value} value={d.value}>{lang === "zh" ? d.zh : d.en}</option>
          ))}
        </select>
      </label>
      <button className="btn btn-brand h-[46px]"><FontAwesomeIcon icon={faMagnifyingGlass} /> {t("search.btn")}</button>
    </form>
  );
}
