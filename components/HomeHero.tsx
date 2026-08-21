"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProductById } from "@/lib/products";
import { useUi } from "@/lib/store/ui-context";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowIcon } from "./Icons";

type Slide = {
  id: string;
  kicker: string;
  season: string;
  title: string;
  text: string;
  image: string;
  thumbLabel: string;
  cta: { href: string; label: string };
  cta2: { href: string; label: string };
  productId?: string;
};

const slides: Slide[] = [
  {
    id: "new",
    kicker: "NEW COLLECTION",
    season: "پاییز / زمستان ۱۴۰۵",
    title: "استایل جدید، نسخه تو",
    text: "کالکشن مینیمال فصل؛ پارچه مشخص، برش تمیز.",
    image: "/images/hero.jpg",
    thumbLabel: "کالکشن جدید",
    cta: { href: "/products", label: "مشاهده کالکشن" },
    cta2: { href: "/products/camel-blazer", label: "خرید سریع" },
    productId: "p2",
  },
  {
    id: "sale",
    kicker: "SEASON SALE",
    season: "فروش ویژه پاییز",
    title: "تا ۲۰٪ روی کالکشن منتخب",
    text: "فرصت محدود روی مجلسی، کت و سویشرت.",
    image: "/images/home/banner-sale.jpg",
    thumbLabel: "تخفیف ویژه",
    cta: { href: "/products?discount=1", label: "مشاهده تخفیف" },
    cta2: { href: "/products/evening-dress", label: "خرید سریع" },
    productId: "p1",
  },
  {
    id: "men",
    kicker: "MEN",
    season: "استایل مردانه",
    title: "رسمی، بدون حاشیه",
    text: "کت‌وشلوار، پیراهن و کژوال برای روزهای مهم.",
    image: "/images/home/look-formal.jpg",
    thumbLabel: "مردانه",
    cta: { href: "/products?category=men", label: "کالکشن مردانه" },
    cta2: { href: "/products/navy-suit", label: "خرید سریع" },
    productId: "p4",
  },
  {
    id: "women",
    kicker: "WOMEN",
    season: "استایل زنانه",
    title: "نگاه آرام، دوخت دقیق",
    text: "مجلسی، کت و بلوز برای پاییز.",
    image: "/images/home/look-women.jpg",
    thumbLabel: "زنانه",
    cta: { href: "/products?category=women", label: "کالکشن زنانه" },
    cta2: { href: "/products/evening-dress", label: "خرید سریع" },
    productId: "p1",
  },
  {
    id: "acc",
    kicker: "DETAILS",
    season: "اکسسوری",
    title: "جزئیاتی که استایل را تمام می‌کند",
    text: "کیف و جزئیات فصل به‌زودی؛ الان کالکشن لباس موجود است.",
    image: "/images/home/banner-casual.jpg",
    thumbLabel: "اکسسوری",
    cta: { href: "/products", label: "مشاهده فروشگاه" },
    cta2: { href: "/products?category=women", label: "خرید لباس" },
  },
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const { openQuickView } = useUi();
  const slide = slides[index];
  const product = slide.productId ? getProductById(slide.productId) : undefined;

  const go = useCallback((next: number) => {
    setIndex((i) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => go(index + 1), 6000);
    return () => window.clearInterval(t);
  }, [index, paused, go]);

  const onPointerDown = (x: number) => {
    startX.current = x;
  };
  const onPointerUp = (x: number) => {
    if (startX.current === null) return;
    const dx = x - startX.current;
    startX.current = null;
    if (dx > 50) go(index - 1);
    if (dx < -50) go(index + 1);
  };

  return (
    <section className="container-x pt-4 lg:pt-6">
      {/* ---------- دسکتاپ ---------- */}
      <div
        className="relative hidden overflow-hidden rounded-[1.5rem] bg-[#efe8df] lg:block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative grid h-[580px] grid-cols-[minmax(20rem,0.42fr)_1fr]">
          <div className="relative z-10 flex flex-col justify-center px-10 xl:px-14">
            <div key={slide.id} className="hero-copy">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-ink/45">{slide.kicker}</p>
              <p className="mt-2 text-xs font-medium text-ink/55">{slide.season}</p>
              <h1 className="mt-4 max-w-[12ch] text-[2.35rem] font-semibold leading-[1.2] tracking-tight xl:text-[2.75rem]">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-7 text-ink/60">{slide.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={slide.cta.href} className="btn min-h-11 rounded-xl bg-ink px-6 text-white hover:bg-[#2c2926]">
                  {slide.cta.label}
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="btn min-h-11 rounded-xl border border-ink/15 bg-white px-6 text-ink hover:border-ink"
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-ink/35">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn("transition", i === index ? "text-ink" : "hover:text-ink/60")}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  i === index ? "opacity-100" : "opacity-0"
                )}
              >
                {i === index && (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    className="hero-ken object-cover object-center"
                    sizes="60vw"
                  />
                )}
              </div>
            ))}

            {product && (
              <div key={product.id} className="hero-copy absolute bottom-6 start-6 w-56">
                <button
                  type="button"
                  onClick={() => openQuickView(product.id)}
                  className="group w-full rounded-2xl bg-white/95 p-3 text-start shadow-[0_12px_32px_rgb(26_24_22_/_0.12)] backdrop-blur transition hover:-translate-y-0.5"
                >
                  <div className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-16 w-12 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-[12px] font-semibold leading-5">{product.name}</span>
                      <span className="mt-1 block text-[12px] font-bold text-[#C45C26]">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  </div>
                  <span className="mt-2 flex gap-1">
                    {product.colors.slice(0, 3).map((c) => (
                      <span
                        key={c.name}
                        className="h-3 w-3 rounded-full border border-ink/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold text-ink/40 opacity-0 transition group-hover:opacity-100">
                    انتخاب سایز
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-black/5 bg-white/40 px-6 py-3 backdrop-blur-sm">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex h-14 flex-1 items-center gap-3 overflow-hidden rounded-xl px-2 text-start transition",
                i === index ? "bg-white shadow-sm" : "hover:bg-white/70"
              )}
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image src={s.image} alt="" fill className="object-cover" sizes="40px" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold">{s.thumbLabel}</span>
                <span className="text-[10px] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              </span>
            </button>
          ))}
          <div className="flex shrink-0 gap-1 pe-1">
            <button
              type="button"
              aria-label="اسلاید قبلی"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
            >
              <ArrowIcon width={14} height={14} className="rotate-180" />
            </button>
            <button
              type="button"
              aria-label="اسلاید بعدی"
              onClick={() => go(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
            >
              <ArrowIcon width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- موبایل ---------- */}
      <div className="lg:hidden">
        <div
          className="relative overflow-hidden rounded-2xl"
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
        >
          <div className="relative h-[26.5rem]">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  i === index ? "opacity-100" : "opacity-0"
                )}
              >
                {i === index && (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                )}
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div key={slide.id} className="hero-copy absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[11px] tracking-[0.16em] text-white/70">{slide.kicker}</p>
              <h1 className="mt-1 text-2xl font-semibold leading-snug">{slide.title}</h1>
              <Link
                href={slide.cta.href}
                className="mt-4 inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-semibold text-ink"
              >
                {slide.cta.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.thumbLabel}
              onClick={() => setIndex(i)}
              className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/20")}
            />
          ))}
        </div>

        <div className="home-rail mt-4">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex h-[4.25rem] w-[7.5rem] shrink-0 snap-start flex-col justify-center overflow-hidden rounded-xl border px-2 text-start",
                i === index ? "border-ink bg-[#f7f4ef]" : "border-[#ece8e2] bg-white"
              )}
            >
              <span className="text-[10px] font-semibold text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="truncate text-[12px] font-semibold">{s.thumbLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
