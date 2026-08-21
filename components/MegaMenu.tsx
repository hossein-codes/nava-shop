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
    id: "skincare",
    label: "مراقبت پوست",
    href: "/products?category=skincare",
    mega: true,
    match: (_p, s) => s.includes("category=skincare"),
    columns: [
      {
        title: "محصول",
        links: [
          { label: "سرم", href: "/products?category=skincare&q=%D8%B3%D8%B1%D9%85" },
          { label: "کرم آبرسان", href: "/products?category=skincare&q=%DA%A9%D8%B1%D9%85" },
          { label: "شوینده", href: "/products?category=skincare&q=%D8%B4%D9%88%DB%8C%D9%86%D8%AF%D9%87" },
          { label: "همه مراقبت پوست", href: "/products?category=skincare" },
        ],
      },
      {
        title: "نگرانی",
        links: [
          { label: "خشکی", href: "/products?concern=dry" },
          { label: "لک و تیرگی", href: "/products?concern=spots" },
          { label: "جوش", href: "/products?concern=acne" },
          { label: "ضد پیری", href: "/products?concern=aging" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "تخفیف پوست", href: "/products?category=skincare&discount=1" },
          { label: "روتین صبح", href: "/journal/morning-routine" },
          { label: "راهنمای سرم", href: "/journal/choose-serum" },
        ],
      },
    ],
    productIds: ["p1", "p2", "p3"],
  },
  {
    id: "makeup",
    label: "آرایش",
    href: "/products?category=makeup",
    mega: true,
    match: (_p, s) =>
      s.includes("category=makeup") || s.includes("category=eyes") || s.includes("category=lips"),
    columns: [
      {
        title: "صورت و چشم",
        links: [
          { label: "کرم‌پودر", href: "/products?category=makeup" },
          { label: "کانسیلر", href: "/products?q=%DA%A9%D8%A7%D9%86%D8%B3%DB%8C%D9%84%D8%B1" },
          { label: "ریمل", href: "/products?category=eyes" },
          { label: "سایه", href: "/products?q=%D8%B3%D8%A7%DB%8C%D9%87" },
        ],
      },
      {
        title: "لب",
        links: [
          { label: "رژلب", href: "/products?category=lips" },
          { label: "روغن لب", href: "/products?q=%D8%B1%D9%88%D8%BA%D9%86%20%D9%84%D8%A8" },
          { label: "راهنمای رژ", href: "/journal/lipstick-guide" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "تخفیف آرایش", href: "/products?category=makeup&discount=1" },
          { label: "پرفروش‌ها", href: "/products?sort=best" },
        ],
      },
    ],
    productIds: ["p5", "p8", "p9"],
  },
  {
    id: "ritual",
    label: "عطر و مراقبت",
    href: "/products?category=fragrance",
    mega: true,
    match: (_p, s) =>
      s.includes("category=hair") ||
      s.includes("category=fragrance") ||
      s.includes("category=sun") ||
      s.includes("category=natural"),
    columns: [
      {
        title: "دسته",
        links: [
          { label: "عطر", href: "/products?category=fragrance" },
          { label: "مو", href: "/products?category=hair" },
          { label: "ضد آفتاب", href: "/products?category=sun" },
          { label: "طبیعی", href: "/products?category=natural" },
        ],
      },
      {
        title: "برند",
        links: [
          { label: "نوا لَب", href: "/products?q=%D9%86%D9%88%D8%A7" },
          { label: "مِیلِه", href: "/products?q=%D9%85%DB%8C%D9%84%D9%87" },
          { label: "گل‌سرخ", href: "/products?q=%DA%AF%D9%84" },
        ],
      },
      {
        title: "خرید سریع",
        links: [
          { label: "جدیدترین‌ها", href: "/products" },
          { label: "مجله نوا", href: "/journal" },
        ],
      },
    ],
    productIds: ["p12", "p13", "p11"],
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
                item.accent && "text-clay hover:text-clay"
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
          <Link href="/journal" className="rounded-lg px-3 py-2 hover:text-ink">
            مجله زیبایی
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
          <div className="border-t border-sand bg-ivory shadow-[0_18px_48px_rgb(28_20_16_/_0.14)]">
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
                        className="group rounded-2xl bg-cream p-2 transition hover:bg-cream"
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
                            <span className="absolute top-2 start-2 rounded-md bg-sale px-2 py-0.5 text-[10px] font-bold text-white">
                              ٪{off.toLocaleString("fa-IR")}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 line-clamp-1 px-1 text-[13px] font-medium">{p.name}</p>
                        <p className="px-1 text-[13px] font-semibold tabular-nums text-ink">{formatPrice(p.price)}</p>
                      </Link>
                    );
                  })}
              </div>
            </div>
            <div className="border-t border-sand bg-cream">
              <div className="container-x flex items-center justify-between py-3 text-[13px]">
                <p className="text-ink/50">ارسال رایگان بالای ۱٫۲ میلیون · ضمانت اصالت</p>
                <Link href={active.href} className="font-semibold text-clay hover:underline">
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
