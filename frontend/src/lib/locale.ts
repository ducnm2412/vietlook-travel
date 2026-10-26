// Thêm/bỏ tiền tố ngôn ngữ (/en, /zh) cho đường dẫn nội bộ
export type Lang = "en" | "zh";

export const stripLang = (path: string) => path.replace(/^\/(en|zh)(?=\/|$|\?|#)/, "") || "/";

export function withLang(href: string, lang: Lang) {
  if (!href.startsWith("/") || href.startsWith("//") || /^\/(en|zh)(\/|$|\?|#)/.test(href)) return href;
  return `/${lang}${href === "/" ? "" : href}`;
}
