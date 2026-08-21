"use client";

/** صفحه تماس با ما */
import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/utils";
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";

const contactCards = [
  {
    icon: PhoneIcon,
    title: "تلفن پشتیبانی",
    lines: ["۰۲۱-۹۱۰۰۰۰۰۰", "شنبه تا پنجشنبه، ۹ تا ۱۸"],
  },
  {
    icon: MailIcon,
    title: "ایمیل",
    lines: ["hello@nava-shop.ir", "پاسخ‌گویی تا ۲۴ ساعت"],
  },
  {
    icon: MapPinIcon,
    title: "آدرس",
    lines: ["تهران، خیابان ولیعصر، مجتمع تجاری نوا", "طبقه دوم، واحد ۲۰۱"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "سوال درباره محصول", message: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 3) return setError("نام خود را کامل وارد کنید.");
    if (!isValidEmail(form.email)) return setError("ایمیل معتبر وارد کنید.");
    if (form.message.trim().length < 10) return setError("متن پیام باید حداقل ۱۰ کاراکتر باشد.");
    setDone(true);
  };

  return (
    <div className="container-x mt-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold text-clay">ما همیشه در کنار شماییم</p>
        <h1 className="section-title mt-1">تماس با نوا</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink-soft">
          سوال، پیشنهاد یا انتقادی دارید؟ خوشحال می‌شویم صدای شما را بشنویم.
        </p>
      </div>

      {/* کارت‌های تماس */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {contactCards.map((c) => (
          <div key={c.title} className="rounded-3xl border border-sand/60 bg-white p-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-clay">
              <c.icon width={22} height={22} />
            </span>
            <p className="font-extrabold">{c.title}</p>
            {c.lines.map((l) => (
              <p key={l} className="mt-1 text-sm text-ink-soft">{l}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-2xl">
        {done ? (
          <div className="flex flex-col items-center rounded-3xl border border-sage/30 bg-white p-12 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage">
              <CheckIcon width={32} height={32} strokeWidth={2.5} />
            </span>
            <h2 className="mt-4 text-xl font-black">پیام شما ارسال شد! ✉️</h2>
            <p className="mt-2 text-sm text-ink-soft">
              تیم پشتیبانی نوا حداکثر تا ۲۴ ساعت آینده با شما تماس می‌گیرد.
            </p>
            <button onClick={() => { setDone(false); setForm({ name: "", email: "", subject: "سوال درباره محصول", message: "" }); }} className="btn btn-outline mt-6">
              ارسال پیام جدید
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-3xl border border-sand/60 bg-white p-7">
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base">نام شما *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثلاً: علی محمدی"
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">ایمیل *</label>
                <input
                  type="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-base text-start"
                />
              </div>
            </div>
            <div>
              <label className="label-base">موضوع</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input-base"
              >
                <option>مشاوره روتین پوست</option>
                <option>سوال درباره محصول</option>
                <option>پیگیری سفارش</option>
                <option>بازگشت کالا</option>
                <option>همکاری با نوا</option>
                <option>سایر</option>
              </select>
            </div>
            <div>
              <label className="label-base">متن پیام *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="پیام خود را بنویسید..."
                className="input-base resize-none"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              ارسال پیام
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
