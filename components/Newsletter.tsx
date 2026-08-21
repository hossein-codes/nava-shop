"use client";

/** خبرنامه ایمیلی (شبیه‌سازی شده) */
import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/utils";
import { CheckIcon, MailIcon } from "./Icons";

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
    <section className="container-x mt-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-ivory sm:px-12">
        <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-clay/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -start-16 h-64 w-64 rounded-full bg-clay/20 blur-3xl" />

        <div className="relative mx-auto max-w-xl">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-white">
            <MailIcon width={22} height={22} />
          </span>
          <h2 className="mb-2 text-2xl font-black sm:text-3xl">از تخفیف‌ها جا نمانید!</h2>
          <p className="mb-6 text-sm leading-7 text-ivory/70">
            عضو خبرنامه‌ی نوا شوید تا اولین نفری باشید که از کالکشن‌های جدید و تخفیف‌های ویژه با
            خبر می‌شوید.
          </p>

          {status === "done" ? (
            <div className="flex items-center justify-center gap-2 rounded-full bg-sage/20 px-5 py-3.5 text-sm font-bold text-emerald-300">
              <CheckIcon width={18} height={18} />
              عضویت شما با موفقیت ثبت شد. به‌زودی خبرهای خوب برایتان می‌فرستیم!
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="you@example.com"
                className="input-base !border-ivory/20 bg-ivory/10 text-ivory placeholder:text-ivory/40"
              />
              <button type="submit" className="btn btn-clay shrink-0">
                عضویت در خبرنامه
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-xs font-bold text-red-400">
              لطفاً یک ایمیل معتبر وارد کنید.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
