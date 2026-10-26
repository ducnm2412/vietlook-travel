"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "@/lib/i18n";
import { withLang } from "@/lib/locale";

// next/link tự gắn tiền tố ngôn ngữ hiện tại (/en, /zh) cho link nội bộ dạng chuỗi
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { lang } = useLang();
  return <Link href={typeof href === "string" ? withLang(href, lang) : href} {...props} />;
}
