"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
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
        title: "پوشاک",
        links: [
          { label: "پیراهن و بلوز", href: "/products?category=women&q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86" },
          { label: "کت", href: "/products?category=women&q=%DA%A9%D8%AA" },
          { label: "مجلسی", href: "/products?category=women&q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C" },
          { label: "همه زنانه", href: "/products?category=women" },
        ],
      },
      {
        title: "پیشنهاد",
        links: [
          { label: "جدیدترین‌ها", href: "/products?category=women" },
          { label: "تخفیف زنانه", href: "/products?category=women&discount=1" },
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
        title: "پوشاک",
        links: [
          { label: "کت‌وشلوار", href: "/products?category=men&q=%DA%A9%D8%AA" },
          { label: "پیراهن", href: "/products?category=men&q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86" },
          { label: "سویشرت", href: "/products?category=men&q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA" },
          { label: "همه مردانه", href: "/products?category=men" },
        ],
      },
      {
        title: "پیشنهاد",
        links: [
          { label: "جدیدترین‌ها", href: "/products?category=men" },
          { label: "تخفیف مردانه", href: "/products?category=men&discount=1" },
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
        title: "پوشاک",
        links: [
          { label: "سرهمی", href: "/products?category=kids&q=%D8%B3%D8%B1%D9%87%D9%85%DB%8C" },
          { label: "کاپشن", href: "/products?category=kids&q=%DA%A9%D8%A7%D9%BE%D8%B4%D9%86" },
          { label: "شلوار", href: "/products?category=kids&q=%D8%B4%D9%84%D9%88%D8%A7%D8%B1" },
          { label: "همه بچگانه", href: "/products?category=kids" },
        ],
      },
    ],
    featured: {
      title: "پاییز کودک",
      text: "گرم و راحت",
      href: "/products?category=kids",
      image: "/images/products/kids-jacket.jpg",
    },
  },
  { id: "new", label: "جدیدترین", href: "/products" },
  { id: "sale", label: "تخفیف‌ها", href: "/products?discount=1" },
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
    timer.current = window.setTimeout(() => setOpenId(null), 120);
  };

  return (
    <div className="relative" onMouseLeave={closeSoon}>
      <div className="container-x flex h-12 items-center gap-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => open(item.mega ? item.id : null)}
            onFocus={() => open(item.mega ? item.id : null)}
            className={cn(
              "flex h-9 items-center rounded-lg px-3.5 text-[13px] font-semibold transition",
              openId === item.id ? "bg-white text-ink shadow-sm" : "text-ink/75 hover:bg-white/80 hover:text-ink",
              item.id === "sale" && "text-[#C45C26] hover:text-[#C45C26]"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-50 transition duration-150",
          active ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
        onMouseEnter={() => active && open(active.id)}
      >
        {active?.columns && (
          <div className="border-t border-[#ece8e2] bg-white shadow-[0_24px_48px_rgb(26_24_22_/_0.10)]">
            <div className="container-x grid grid-cols-[1fr_1fr_18rem] gap-10 py-8">
              {active.columns.map((col) => (
                <div key={col.title}>
                  <p className="mb-3 text-xs font-bold text-ink">{col.title}</p>
                  <ul className="space-y-0.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="block rounded-lg px-1 py-2 text-[13px] text-ink/70 hover:bg-[#f3efe9] hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.featured && (
                <Link href={active.featured.href} className="relative h-52 overflow-hidden rounded-2xl">
                  <Image src={active.featured.image} alt="" fill className="object-cover" sizes="288px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-sm font-bold">{active.featured.title}</p>
                    <p className="mt-1 text-xs text-white/75">{active.featured.text}</p>
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
