"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { ChevronDownIcon } from "./Icons";

type Col = { title: string; links: { label: string; href: string }[] };
type Mega = {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  accent?: boolean;
  match?: (path: string, search: string) => boolean;
  columns?: Col[];
  productIds?: string[];
};

const items: Mega[] = [
  {
    id: "women",
    label: "زنانه",
    href: "/products?category=women",
    mega: true,
    match: (_p, s) => s.includes("category=women"),
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
    productIds: ["p2", "p1", "p3"],
  },
  {
    id: "men",
    label: "مردانه",
    href: "/products?category=men",
    mega: true,
    match: (_p, s) => s.includes("category=men"),
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
    productIds: ["p4", "p5", "p6"],
  },
  {
    id: "kids",
    label: "بچگانه",
    href: "/products?category=kids",
    mega: true,
    match: (_p, s) => s.includes("category=kids"),
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
    productIds: ["p8", "p7", "p9"],
  },
  { id: "new", label: "جدیدترین", href: "/products" },
  { id: "best", label: "پرفروش", href: "/products?sort=best", match: (_p, s) => s.includes("sort=best") },
  { id: "sale", label: "تخفیف‌ها", href: "/products?discount=1", accent: true, match: (_p, s) => s.includes("discount=1") },
];

export default function MegaMenu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
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

  useEffect(() => {
    onOpenChange?.(Boolean(active));
  }, [active, onOpenChange]);

  useEffect(() => {
    const close = () => setOpenId(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);



  return (
    <div className="relative" onMouseLeave={closeSoon}>
      <div className="container-x flex h-12 items-center gap-0.5">
        {items.map((item) => {
          const isOn = item.match
            ? item.match(pathname, search)
            : item.id === "new" && pathname.startsWith("/products") && !search;
          return (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => open(item.mega ? item.id : null)}
              onFocus={() => open(item.mega ? item.id : null)}
              className={cn(
                "flex h-9 items-center gap-1 rounded-lg px-3.5 text-[13px] font-semibold transition",
                openId === item.id || isOn ? "bg-white text-ink shadow-sm" : "text-ink/80 hover:bg-white/90 hover:text-ink",
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
          );
        })}
        <div className="ms-auto hidden items-center gap-1 text-[13px] font-medium text-ink/55 xl:flex">
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
            <div className="container-x grid grid-cols-12 gap-8 py-7">
              <div className="col-span-4 grid grid-cols-3 gap-5">
                {active.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-3 text-[11px] font-bold tracking-wide text-ink">{col.title}</p>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="block py-1.5 text-[13px] text-ink/70 transition hover:text-ink"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-span-8 grid grid-cols-3 gap-4">
                {(active.productIds ?? [])
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean)
                  .map((p) => {
                    if (!p) return null;
                    const off = discountPercent(p);
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        className="group rounded-2xl bg-[#faf8f5] p-2 transition hover:bg-[#f3efe9]"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            sizes="220px"
                          />
                          {off && (
                            <span className="absolute top-2 start-2 rounded-md bg-[#C45C26] px-2 py-0.5 text-[10px] font-bold text-white">
                              ٪{off.toLocaleString("fa-IR")}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 line-clamp-1 px-1 text-[13px] font-medium">{p.name}</p>
                        <p className="px-1 text-[13px] font-bold text-[#C45C26]">{formatPrice(p.price)}</p>
                      </Link>
                    );
                  })}
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
