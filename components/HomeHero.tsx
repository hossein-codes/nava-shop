"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./Icons";

const slides = [
  {
    src: "/images/hero.jpg",
    href: "/products",
    kicker: "کالکشن پاییز ۱۴۰۵",
    title: "استایل جدید، نسخه تو",
  },
  {
    src: "/images/home/banner-collection.jpg",
    href: "/products?category=women",
    kicker: "زنانه",
    title: "کالکشن جدید زنانه",
  },
  {
    src: "/images/home/look-formal.jpg",
    href: "/products?category=men",
    kicker: "مردانه",
    title: "رسمی و کژوال",
  },
];

const promos = [
  {
    src: "/images/products/camel-blazer.jpg",
    href: "/products/camel-blazer",
    kicker: "پرفروش",
    title: "کت شتری صحرا",
    cta: "خرید محصول",
  },
  {
    src: "/images/home/banner-sale.jpg",
    href: "/products?discount=1",
    kicker: "تا ۲۰٪ تخفیف",
    title: "فروش ویژه پاییز",
    cta: "مشاهده تخفیف‌ها",
  },
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((i) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => go(index + 1), 5000);
    return () => window.clearInterval(t);
  }, [index, go]);

  return (
    <section className="container-x pt-4 lg:pt-6">
      <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
        {/* اسلایدر */}
        <div
          className="relative h-[22rem] overflow-hidden rounded-2xl lg:col-span-8 lg:h-[28rem]"
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (startX.current === null) return;
            const dx = e.changedTouches[0].clientX - startX.current;
            startX.current = null;
            if (dx > 40) go(index - 1);
            if (dx < -40) go(index + 1);
          }}
        >
          {slides.map((s, i) => (
            <Link
              key={s.src}
              href={s.href}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(min-width:1024px) 66vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-8">
                <p className="text-[11px] tracking-[0.16em] text-white/75">{s.kicker}</p>
                <h1 className="mt-1 text-2xl font-semibold lg:text-3xl">{s.title}</h1>
              </div>
            </Link>
          ))}

          <div className="absolute bottom-4 end-4 z-10 hidden gap-1 lg:flex">
            <button
              type="button"
              aria-label="قبلی"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink"
            >
              <ArrowIcon width={14} height={14} className="rotate-180" />
            </button>
            <button
              type="button"
              aria-label="بعدی"
              onClick={() => go(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
            >
              <ArrowIcon width={14} height={14} />
            </button>
          </div>

          <div className="absolute bottom-4 start-5 z-10 flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={s.title}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/45"
                )}
              />
            ))}
          </div>
        </div>

        {/* دو بنر فروش */}
        <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1 lg:gap-4">
          {promos.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative h-36 overflow-hidden rounded-2xl lg:h-[calc(14rem-0.5rem)]"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/5" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white lg:p-4">
                <p className="text-[11px] text-white/75">{p.kicker}</p>
                <p className="mt-0.5 text-sm font-semibold lg:text-base">{p.title}</p>
                <span className="mt-2 inline-block text-[11px] font-medium text-white/90">
                  {p.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
