"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { isValidEmail } from "@/lib/utils";
import {
  ChevronDownIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsappIcon,
} from "./Icons";
import { cn } from "@/lib/utils";

const groups = [
  {
    title: "دسترسی سریع",
    links: [
      { href: "/products", label: "جدیدترین‌ها" },
      { href: "/products?discount=1", label: "فروش ویژه" },
      { href: "/products?category=women", label: "زنانه" },
      { href: "/products?category=men", label: "مردانه" },
      { href: "/products?category=kids", label: "بچگانه" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { href: "/account", label: "پیگیری سفارش" },
      { href: "/about", label: "راهنمای خرید" },
      { href: "/about", label: "شرایط بازگشت" },
      { href: "/contact", label: "تماس با ما" },
      { href: "/about", label: "درباره نوا" },
    ],
  },
];

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);
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
    <footer className="bg-ink text-ivory">
      <div className="brand-bar" />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <p className="text-2xl font-semibold tracking-tight">نوا</p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-ivory/65">
            پوشاک باکیفیت، قیمت روشن، ارسال سریع.
          </p>
          <p className="mt-6 text-sm font-medium">عضویت در خبرنامه</p>
          {status === "done" ? (
            <p className="mt-3 text-sm text-sage">عضویت ثبت شد.</p>
          ) : (
            <form onSubmit={submit} className="mt-3 flex gap-2">
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="ایمیل شما"
                className="h-11 flex-1 rounded-full border border-ivory/15 bg-ivory/10 px-4 text-sm text-ivory outline-none placeholder:text-ivory/40"
              />
              <button type="submit" className="h-11 shrink-0 rounded-full bg-white px-4 text-sm font-semibold text-ink">
                عضویت
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-red-300">ایمیل معتبر وارد کنید.</p>
          )}
        </div>

        {groups.map((g) => (
          <div key={g.title} className="border-t border-ivory/10 lg:border-0">
            <button
              type="button"
              className="flex h-14 w-full items-center justify-between text-sm font-semibold lg:pointer-events-none lg:mb-4 lg:h-auto"
              onClick={() => setOpen((v) => (v === g.title ? null : g.title))}
            >
              {g.title}
              <ChevronDownIcon
                width={16}
                height={16}
                className={cn("lg:hidden", open === g.title && "rotate-180")}
              />
            </button>
            <ul className={cn("space-y-2.5 pb-4 lg:block lg:pb-0", open === g.title ? "block" : "hidden")}>
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-ivory/65 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-t border-ivory/10 pt-4 lg:border-0 lg:pt-0">
          <h3 className="mb-4 text-sm font-semibold">تماس و شبکه‌ها</h3>
          <ul className="space-y-3 text-sm text-ivory/65">
            <li className="flex gap-2">
              <MapPinIcon width={16} height={16} className="mt-0.5 shrink-0" />
              تهران، ولیعصر، مجتمع نوا
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon width={16} height={16} />
              <a href="tel:02191000000">۰۲۱-۹۱۰۰۰۰۰۰</a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon width={16} height={16} />
              hello@nava-shop.ir
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[
              { icon: InstagramIcon, label: "اینستاگرام" },
              { icon: TelegramIcon, label: "تلگرام" },
              { icon: WhatsappIcon, label: "واتس‌اپ" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/45 sm:flex-row">
          <p>© ۱۴۰۵ فروشگاه پوشاک نوا</p>
          <p>ارسال سریع · ضمانت اصالت · ۷ روز بازگشت</p>
        </div>
      </div>
    </footer>
  );
}
