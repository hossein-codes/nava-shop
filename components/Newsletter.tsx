"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <section className="container-x mt-14 mb-6 lg:mt-20 lg:mb-10">
      <div className="rounded-2xl bg-ink px-5 py-12 text-center text-ivory sm:px-12 lg:py-16">
        <p className="text-[11px] font-medium tracking-[0.2em] text-ivory/55">NEWSLETTER</p>
        <h2 className="mt-3 text-xl font-semibold sm:text-2xl">روتین بعدی را از دست نده</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-ivory/65">
          راهنمای پوست، ورود کالکشن و تخفیف واقعی. بدون اسپم.
        </p>
        {status === "done" ? (
          <p className="mt-8 text-sm font-medium text-sage">عضویت ثبت شد.</p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="you@example.com"
              className="input-base !min-h-12 border-ivory/15 bg-ivory/10 text-start text-ivory placeholder:text-ivory/40"
            />
            <button type="submit" className="btn min-h-12 shrink-0 bg-white text-ink hover:bg-ivory">
              عضویت
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs font-medium text-red-300">ایمیل معتبر وارد کنید.</p>
        )}
      </div>
    </section>
  );
}
