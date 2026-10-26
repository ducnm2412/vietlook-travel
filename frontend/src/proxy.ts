import { NextResponse, type NextRequest } from "next/server";

// Đường dẫn theo ngôn ngữ: /en/... và /zh/... dùng chung các trang trong app/ (rewrite bỏ tiền tố, truyền ngôn ngữ qua header x-lang).
// Đường dẫn chưa có tiền tố chuyển hướng sang /en hoặc /zh theo cookie "lang" (mặc định tiếng Anh).
const LANGS = ["en", "zh"] as const;

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  // File tĩnh (ảnh, icon, robots.txt, sitemap.xml…) đi thẳng
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();
  const seg = pathname.split("/")[1];
  if ((LANGS as readonly string[]).includes(seg)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(seg.length + 1) || "/";
    const headers = new Headers(req.headers);
    headers.set("x-lang", seg);
    const res = NextResponse.rewrite(url, { request: { headers } });
    res.cookies.set("lang", seg, { path: "/", maxAge: 31536000 });
    return res;
  }
  const lang = req.cookies.get("lang")?.value === "zh" ? "zh" : "en";
  return NextResponse.redirect(new URL(`/${lang}${pathname === "/" ? "" : pathname}${search}`, req.url));
}

export const config = {
  // Bỏ qua tài nguyên của Next và thư mục ảnh
  matcher: ["/((?!_next/|api/|images/).*)"],
};
