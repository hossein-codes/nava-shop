"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./Icons";

const slides = [
  {
    src: "/images/home/hero-slide-1.jpg",
    href: "/products?category=skincare",
    kicker: "مراقبت پوست",
    title: "درخشش از روتین درست",
    cta: "خرید مراقبت پوست",
  },
  {
    src: "/images/home/hero-slide-2.jpg",
    href: "/products?category=makeup",
    kicker: "آرایش صورت و لب",
    title: "رنگ، بدون ماسک",
    cta: "خرید آرایش",
  },
  {
    src: "/images/home/hero-slide-3.jpg",
    href: "/products",
    kicker: "روتین روزانه",
    title: "چهار قدم تا پوست آرام",
    cta: "شروع روتین",
  },
];

const promos = [
  {
    src: "/images/home/promo-coat.jpg",
    href: "/products/glow-serum",
    kicker: "پرفروش هفته",
    title: "سرم درخشش ویتامین C",
    cta: "خرید سرم",
  },
  {
    src: "/images/home/promo-sale.jpg",
    href: "/products?discount=1",
    kicker: "تا ۲۰٪ تخفیف",
    title: "فروش ویژه زیبایی",
    cta: "دیدن تخفیف‌ها",
  },
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const slide = slides[index];

  const go = useCallback((next: number) => {
    setIndex((i) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5200);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section className="container-x pt-4 lg:pt-6">
      <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
        <div
          className="relative h-[24rem] overflow-hidden rounded-2xl lg:col-span-8 lg:h-[32rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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
            <div
              key={s.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={i === 0}
                className={cn("object-cover object-[center_30%]", i === index && "hero-ken")}
                sizes="(min-width:1024px) 66vw, 100vw"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent lg:bg-none" />

          <div className="absolute inset-x-0 bottom-0 p-5 lg:inset-y-0 lg:end-auto lg:start-0 lg:flex lg:w-[48%] lg:flex-col lg:justify-center lg:p-10">
            <div key={slide.src} className="hero-copy text-white">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/75">{slide.kicker}</p>
              <h1 className="mt-2 max-w-[10ch] text-[1.85rem] font-semibold leading-[1.25] lg:text-[2.6rem]">
                {slide.title}
              </h1>
              <Link
                href={slide.href}
                className="mt-5 inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-ink transition hover:bg-cream"
              >
                {slide.cta}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-5 end-5 z-10 hidden gap-1.5 lg:flex">
            <button
              type="button"
              aria-label="قبلی"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur"
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

          <div className="absolute bottom-5 start-5 z-10 flex gap-1.5 lg:start-10 lg:bottom-8">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={s.title}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-white" : "w-2 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1 lg:gap-4">
          {promos.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative h-40 overflow-hidden rounded-2xl lg:h-[calc(16rem-0.5rem)]"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white lg:p-5">
                <p className="text-[11px] font-medium text-[#E8B89A]">{p.kicker}</p>
                <p className="mt-1 text-base font-semibold lg:text-lg">{p.title}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold">
                  {p.cta}
                  <ArrowIcon width={12} height={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
