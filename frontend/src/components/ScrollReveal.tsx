"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Hiệu ứng hiện dần khi cuộn: mọi <section> trong <main> (trừ section đầu – hero) sẽ mờ + trượt lên
// khi vào màn hình; các lưới thẻ (.grid) bên trong hiện lần lượt từng thẻ. Kèm thanh tiến độ cuộn ở đầu trang.
// Chỉ thêm class khi JS chạy, nên nếu JS lỗi nội dung vẫn hiện bình thường.
export default function ScrollReveal() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  // Thanh tiến độ cuộn
  useEffect(() => {
    let raf = 0;
    let max = 0;
    // Chiều cao trang chỉ đo lại khi đổi kích thước, không đo mỗi lần cuộn (tránh tính lại layout trên máy yếu)
    const measure = () => { max = document.documentElement.scrollHeight - window.innerHeight; };
    const update = () => {
      raf = 0;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    ro?.observe(document.body);
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Chạy lại mỗi lần đổi trang (layout không re-mount khi điều hướng phía client)
  useEffect(() => {
    // Trình duyệt cũ không có IntersectionObserver: bỏ hiệu ứng, nội dung vẫn hiện bình thường
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Máy cấu hình thấp hoặc bật tiết kiệm dữ liệu: chỉ giữ hiệu ứng section, bỏ hiệu ứng từng thẻ
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lite = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || !!nav.connection?.saveData;

    const els = [...document.querySelectorAll<HTMLElement>("main section")].slice(1);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    // Đọc vị trí của tất cả section trước rồi mới thêm class, tránh mỗi vòng lặp ép trình duyệt tính lại layout
    const vh = window.innerHeight;
    const tops = els.map((el) => el.getBoundingClientRect().top);
    els.forEach((el, k) => {
      // Section đã nằm trong màn hình lúc tải thì không cần hiệu ứng
      // (effect có thể chạy lại – StrictMode, đổi trang – nên section đã gắn .reveal mà chưa hiện vẫn phải được theo dõi tiếp)
      if (el.classList.contains("reveal-in")) return;
      if (!el.classList.contains("reveal") && tops[k] < vh * 0.9) return;
      el.classList.add("reveal");
      // Hiệu ứng phụ (tiêu đề trượt vào, ảnh mở dần) – bỏ trên máy yếu
      if (!lite) el.classList.add("reveal-fx");
      // Lưới thẻ có từ 2 phần tử: hiện lần lượt
      if (!lite) el.querySelectorAll<HTMLElement>(".grid").forEach((g) => { if (g.children.length > 1) g.classList.add("stagger"); });
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return <div ref={bar} aria-hidden="true" className="scroll-progress" />;
}
