import type { ReactNode } from "react";

export default function SectionHeading({ kicker, title, sub, center = false, light = false }: { kicker?: ReactNode; title: ReactNode; sub?: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{kicker}</p>}
      <h2 className={`font-serif text-3xl font-bold leading-tight md:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-3 text-base ${light ? "text-white/80" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}
