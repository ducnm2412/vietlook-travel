"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendInquiry } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export function useInquiry(type: string) {
  const { t, lang } = useLang();
  const [state, setState] = useState<{ status: "idle" | "sending" | "ok" | "error"; id?: string }>({ status: "idle" });

  const submit = async (data: Record<string, unknown>) => {
    setState({ status: "sending" });
    try {
      const res = await sendInquiry({ type, lang, ...data });
      setState({ status: "ok", id: res.id });
    } catch {
      setState({ status: "error" });
    }
  };

  const Success = () => (
    <div className="rounded-2xl bg-brand-light p-8 text-center text-brand">
      <FontAwesomeIcon icon={faCircleCheck} className="text-5xl text-brand" />
      <p className="mt-3">{t("common.success")} <b>{state.id}</b></p>
    </div>
  );
  const Error = () => (state.status === "error" ? <p className="text-sm text-red-600">{t("common.error")}</p> : null);
  const SubmitButton = ({ label }: { label?: string }) => (
    <button disabled={state.status === "sending"} className="btn btn-accent w-full sm:w-auto">{state.status === "sending" ? t("common.sending") : label ?? t("common.send")}</button>
  );

  return { state, submit, Success, Error, SubmitButton };
}

export function ContactFields() {
  const { t } = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label><span className="label">{t("form.name")} *</span><input required name="name" className="field" /></label>
      <label><span className="label">{t("form.email")} *</span><input required type="email" name="email" className="field" /></label>
      <label><span className="label">{t("form.phone")}</span><input name="phone" className="field" /></label>
      <label><span className="label">{t("form.company")}</span><input name="company" className="field" /></label>
    </div>
  );
}

export const formData = (e: React.FormEvent<HTMLFormElement>) => Object.fromEntries(new FormData(e.currentTarget));
