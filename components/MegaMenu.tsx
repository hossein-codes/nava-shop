"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Col = { title: string; links: { label: string; href: string }[] };

type Mega = {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  columns?: Col[];
  featured?: { title: string; text: string; href: string; image: string };
};

const items: Mega[] = [
  {
    id: "women",
    label: "زنانه",
    href: "/products?category=women",
    mega: true,
    columns: [
      {
        title: "لباس",
        links: [
          { label: "پیراهن و بلوز", href: "/products?category=women&q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86" },
          { label: "کت", href: "/products?category=women&q=%DA%A9%D8%AA" },
          { label: "مجلسی", href: "/products?category=women&q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C" },
          { label: "همه زنانه", href: "/products?category=women" },
        ],
      },
      {
        title: "کفش",
        links: [
          { label: "روزمره", href: "/products?category=women" },
          { label: "مجلسی", href: "/products?category=women" },
        ],
      },
      {
        title: "اکسسوری",
        links: [
          { label: "کیف", href: "/products?category=women" },
          { label: "شال و کلاه", href: "/products?category=women" },
        ],
      },
    ],
    featured: {
      title: "کالکشن پاییز زنانه",
      text: "کت و مجلسی فصل",
      href: "/products?category=women",
      image: "/images/products/camel-blazer.jpg",
    },
  },
  {
    id: "men",
    label: "مردانه",
    href: "/products?category=men",
    mega: true,
    columns: [
      {
        title: "لباس",
        links: [
          { label: "تیشرت و سویشرت", href: "/products?category=men&q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA" },
          { label: "پیراهن", href: "/products?category=men&q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86" },
          { label: "کت‌وشلوار", href: "/products?category=men&q=%DA%A9%D8%AA" },
          { label: "همه مردانه", href: "/products?category=men" },
        ],
      },
      {
        title: "کفش",
        links: [
          { label: "اسپرت", href: "/products?category=men" },
          { label: "رسمی", href: "/products?category=men" },
        ],
      },
      {
        title: "اکسسوری",
        links: [
          { label: "کیف", href: "/products?category=men" },
          { label: "کمربند", href: "/products?category=men" },
        ],
      },
    ],
    featured: {
      title: "رسمی مردانه",
      text: "کت‌وشلوار و پیراهن",
      href: "/products?category=men",
      image: "/images/products/navy-suit.jpg",
    },
  },
  {
    id: "kids",
    label: "بچگانه",
    href: "/products?category=kids",
    mega: true,
    columns: [
      {
        title: "لباس",
        links: [
          { label: "سرهمی", href: "/products?category=kids&q=%D8%B3%D8%B1%D9%87%D9%85%DB%8C" },
          { label: "کاپشن", href: "/products?category=kids&q=%DA%A9%D8%A7%D9%BE%D8%B4%D9%86" },
          { label: "شلوار", href: "/products?category=kids&q=%D8%B4%D9%84%D9%88%D8%A7%D8%B1" },
          { label: "همه بچگانه", href: "/products?category=kids" },
        ],
      },
      {
        title: "براساس سن",
        links: [
          { label: "۲–۳ سال", href: "/products?category=kids" },
          { label: "۴–۷ سال", href: "/products?category=kids" },
        ],
      },
    ],
    featured: {
      title: "پاییز کودک",
      text: "گرم، سبک، قابل شست‌وشو",
      href: "/products?category=kids",
      image: "/images/products/kids-jacket.jpg",
    },
  },
  {
    id: "shoes",
    label: "کفش",
    href: "/products?q=%DA%A9%D9%81%D8%B4",
    mega: true,
    columns: [
      {
        title: "نوع",
        links: [
          { label: "اسپرت", href: "/products" },
          { label: "رسمی", href: "/products" },
          { label: "بوت", href: "/products" },
        ],
      },
    ],
    featured: {
      title: "به‌زودی کفش نوا",
      text: "کالکشن در راه است",
      href: "/products",
      image: "/images/products/grey-hoodie.jpg",
    },
  },
  {
    id: "acc",
    label: "اکسسوری",
    href: "/products?q=%DA%A9%DB%8C%D9%81",
    mega: true,
    columns: [
      {
        title: "دسته‌ها",
        links: [
          { label: "کیف", href: "/products" },
          { label: "ساعت", href: "/products" },
          { label: "کمربند", href: "/products" },
        ],
      },
    ],
    featured: {
      title: "اکسسوری فصل",
      text: "جزئیاتی که استایل را تمام می‌کند",
      href: "/products",
      image: "/images/products/silk-blouse.jpg",
    },
  },
  {
    id: "brands",
    label: "برندها",
    href: "/products",
    mega: true,
    columns: [
      {
        title: "خطوط نوا",
        links: [
          { label: "نوا کلاسیک", href: "/products?category=men" },
          { label: "نوا کژوال", href: "/products?q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA" },
          { label: "نوا مجلسی", href: "/products?q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C" },
        ],
      },
    ],
    featured: {
      title: "خانه نوا",
      text: "طراحی و تولید برای همین فروشگاه",
      href: "/about",
      image: "/images/hero.jpg",
    },
  },
  {
    id: "sale",
    label: "تخفیف‌ها",
    href: "/products?discount=1",
    mega: false,
  },
];

export default function MegaMenu() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = items.find((i) => i.id === openId && i.mega);

  return (
    <div
      className="relative"
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="container-x flex h-12 items-center gap-0.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => setOpenId(item.mega ? item.id : null)}
            onFocus={() => setOpenId(item.mega ? item.id : null)}
            className={cn(
              "flex h-12 items-center px-3.5 text-[13px] font-medium transition-colors duration-150",
              openId === item.id ? "text-clay" : "text-ink hover:text-clay",
              item.id === "sale" && "text-sale hover:text-sale"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top transition duration-150",
          active ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
      >
        {active?.columns && (
          <div className="border-t border-sand bg-white shadow-[0_16px_40px_rgb(26_24_22_/_0.10)]">
            <div className="container-x grid grid-cols-4 gap-8 py-8">
              {active.columns.map((col) => (
                <div key={col.title}>
                  <p className="mb-3 text-xs font-semibold tracking-wide text-ink">{col.title}</p>
                  <ul className="space-y-1">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="block py-1.5 text-[13px] text-ink-soft transition-colors hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.featured && (
                <Link href={active.featured.href} className="relative min-h-[13.5rem] overflow-hidden rounded-2xl">
                  <Image
                    src={active.featured.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-sm font-semibold">{active.featured.title}</p>
                    <p className="mt-1 text-xs text-white/75">{active.featured.text}</p>
                    <span className="mt-2 inline-block text-xs font-medium">مشاهده همه</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
