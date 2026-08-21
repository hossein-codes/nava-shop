"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./Icons";

type Col = { title: string; links: { label: string; href: string }[] };
type Card = { title: string; text: string; href: string; image: string };
type Mega = {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  accent?: boolean;
  columns?: Col[];
  cards?: Card[];
};

const items: Mega[] = [
  {
    id: "women",
    label: "زنانه",
    href: "/products?category=women",
    mega: true,
    columns: [
      {
        title: "پوشاک",
        links: [
          { label: "پیراهن مجلسی", href: "/products?category=women&q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C" },
          { label: "بلوز", href: "/products?category=women&q=%D8%A8%D9%84%D9%88%D8%B2" },
          { label: "کت", href: "/products?category=women&q=%DA%A9%D8%AA" },
          { label: "همه زنانه", href: "/products?category=women" },
        ],
      },
      {
        title: "استایل",
        links: [
          { label: "رسمی و مجلسی", href: "/products?category=women&q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C" },
          { label: "روزمره", href: "/products?category=women" },
          { label: "کالکشن پاییز", href: "/products?category=women" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "تخفیف زنانه", href: "/products?category=women&discount=1" },
          { label: "جدیدترین زنانه", href: "/products?category=women" },
          { label: "راهنمای سایز", href: "/about" },
        ],
      },
    ],
    cards: [
      {
        title: "کت شتری صحرا",
        text: "کالکشن پاییز",
        href: "/products/camel-blazer",
        image: "/images/products/camel-blazer.jpg",
      },
      {
        title: "پیراهن مهتاب",
        text: "مجلسی",
        href: "/products/evening-dress",
        image: "/images/products/evening-dress.jpg",
      },
    ],
  },
  {
    id: "men",
    label: "مردانه",
    href: "/products?category=men",
    mega: true,
    columns: [
      {
        title: "پوشاک",
        links: [
          { label: "کت‌وشلوار", href: "/products?category=men&q=%DA%A9%D8%AA" },
          { label: "پیراهن رسمی", href: "/products?category=men&q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86" },
          { label: "سویشرت", href: "/products?category=men&q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA" },
          { label: "همه مردانه", href: "/products?category=men" },
        ],
      },
      {
        title: "استایل",
        links: [
          { label: "رسمی", href: "/products?category=men&q=%DA%A9%D8%AA" },
          { label: "کژوال", href: "/products?category=men&q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA" },
          { label: "کالکشن پاییز", href: "/products?category=men" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "تخفیف مردانه", href: "/products?category=men&discount=1" },
          { label: "پرفروش‌ها", href: "/products?sort=best" },
          { label: "راهنمای سایز", href: "/about" },
        ],
      },
    ],
    cards: [
      {
        title: "کت‌وشلوار سلطان",
        text: "رسمی",
        href: "/products/navy-suit",
        image: "/images/products/navy-suit.jpg",
      },
      {
        title: "پیراهن کلاسیک",
        text: "سفید رسمی",
        href: "/products/white-shirt",
        image: "/images/products/white-shirt.jpg",
      },
    ],
  },
  {
    id: "kids",
    label: "بچگانه",
    href: "/products?category=kids",
    mega: true,
    columns: [
      {
        title: "پوشاک",
        links: [
          { label: "سرهمی", href: "/products?category=kids&q=%D8%B3%D8%B1%D9%87%D9%85%DB%8C" },
          { label: "کاپشن", href: "/products?category=kids&q=%DA%A9%D8%A7%D9%BE%D8%B4%D9%86" },
          { label: "شلوار جین", href: "/products?category=kids&q=%D8%B4%D9%84%D9%88%D8%A7%D8%B1" },
          { label: "همه بچگانه", href: "/products?category=kids" },
        ],
      },
      {
        title: "سن",
        links: [
          { label: "۲ تا ۵ سال", href: "/products?category=kids" },
          { label: "۶ تا ۹ سال", href: "/products?category=kids" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "جدیدترین‌ها", href: "/products?category=kids" },
          { label: "شرایط بازگشت", href: "/about" },
        ],
      },
    ],
    cards: [
      {
        title: "کاپشن لبخند",
        text: "گرم و سبک",
        href: "/products/kids-jacket",
        image: "/images/products/kids-jacket.jpg",
      },
      {
        title: "ست سرهمی بازی",
        text: "جین نرم",
        href: "/products/kids-overall",
        image: "/images/products/kids-overall.jpg",
      },
    ],
  },
  { id: "new", label: "جدیدترین", href: "/products" },
  { id: "best", label: "پرفروش", href: "/products?sort=best" },
  { id: "sale", label: "تخفیف‌ها", href: "/products?discount=1", accent: true },
];

export default function MegaMenu() {
  const [openId, setOpenId] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const active = items.find((i) => i.id === openId && i.mega);

  const open = (id: string | null) => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpenId(id);
  };
  const closeSoon = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpenId(null), 140);
  };

  return (
    <div className="relative" onMouseLeave={closeSoon}>
      <div className="container-x flex h-12 items-center gap-0.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => open(item.mega ? item.id : null)}
            onFocus={() => open(item.mega ? item.id : null)}
            className={cn(
              "flex h-9 items-center gap-1 rounded-lg px-3.5 text-[13px] font-semibold transition",
              openId === item.id ? "bg-white text-ink shadow-sm" : "text-ink/80 hover:bg-white/90 hover:text-ink",
              item.accent && "text-[#C45C26] hover:text-[#C45C26]"
            )}
          >
            {item.label}
            {item.mega && (
              <ChevronDownIcon
                width={12}
                height={12}
                className={cn("transition-transform duration-200", openId === item.id && "rotate-180")}
              />
            )}
          </Link>
        ))}
        <div className="ms-auto flex items-center gap-1 text-[13px] font-medium text-ink/55">
          <Link href="/about" className="rounded-lg px-3 py-2 hover:text-ink">
            راهنمای خرید
          </Link>
          <Link href="/account" className="rounded-lg px-3 py-2 hover:text-ink">
            پیگیری سفارش
          </Link>
          <Link href="/contact" className="rounded-lg px-3 py-2 hover:text-ink">
            تماس با ما
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top transition duration-200",
          active ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0"
        )}
        onMouseEnter={() => active && open(active.id)}
      >
        {active?.columns && (
          <div className="border-t border-[#ece8e2] bg-white shadow-[0_28px_60px_rgb(26_24_22_/_0.12)]">
            <div className="container-x grid grid-cols-12 gap-8 py-8">
              <div className="col-span-5 grid grid-cols-3 gap-6">
                {active.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-3 text-[11px] font-bold tracking-wide text-ink">{col.title}</p>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="block rounded-lg px-0 py-1.5 text-[13px] text-ink/70 transition hover:text-ink"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-span-7 grid grid-cols-2 gap-4">
                {active.cards?.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group relative h-56 overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-[11px] text-white/70">{card.text}</p>
                      <p className="mt-0.5 text-sm font-bold">{card.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-[#ece8e2] bg-[#faf8f5]">
              <div className="container-x flex items-center justify-between py-3 text-[13px]">
                <p className="text-ink/50">ارسال رایگان بالای ۲ میلیون · ۷ روز بازگشت</p>
                <Link href={active.href} className="font-semibold text-[#C45C26] hover:underline">
                  مشاهده همه {active.label}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
