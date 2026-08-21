import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/lib/products";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import ProductTabs from "@/components/ProductTabs";
import Newsletter from "@/components/Newsletter";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  QuoteIcon,
  RefreshIcon,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  WalletIcon,
} from "@/components/Icons";

/* ---------- نوار امکانات ---------- */
const features = [
  {
    icon: TruckIcon,
    title: "ارسال سریع",
    text: "ارسال رایگان برای خرید بالای ۲ میلیون تومان",
  },
  {
    icon: ShieldIcon,
    title: "ضمانت اصالت",
    text: "تضمین کیفیت و اصالت تمامی کالاها",
  },
  {
    icon: RefreshIcon,
    title: "۷ روز بازگشت",
    text: "امکان بازگشت کالا بدون قید و شرط",
  },
  {
    icon: WalletIcon,
    title: "پرداخت امن",
    text: "پرداخت آنلاین امن یا در محل",
  },
];

/* ---------- آیتم‌های نوار متحرک ---------- */
const marqueeItems = [
  "ارسال رایگان بالای ۲ میلیون تومان",
  "ضمانت اصالت کالا",
  "۷ روز ضمانت بازگشت",
  "پرداخت امن آنلاین",
  "ارسال به سراسر ایران",
  "جدیدترین کالکشن پاییز",
];

/* ---------- نظرات مشتریان ---------- */
const testimonials = [
  {
    name: "مریم احمدی",
    city: "تهران",
    text: "کیفیت پارچه‌ها واقعاً بالاست و ارسالش خیلی سریع بود. کت شتری که خریدم دقیقاً مثل عکس‌هاست. حتماً دوباره خرید می‌کنم!",
    rating: 5,
  },
  {
    name: "امیر رضایی",
    city: "اصفهان",
    text: "کت‌وشلوار رو برای مراسم عروسی سفارش دادم. دوخت و پارچه عالی بود و سایزبندی هم دقیق. تجربه‌ی خرید خیلی راحتی داشتم.",
    rating: 5,
  },
  {
    name: "سارا کریمی",
    city: "شیراز",
    text: "برای بچه‌ها لباس سفارش دادم؛ نرم و راحت بود و بعد از چند بار شست‌وشو هم رنگش نرفت. پیگیری سفارش هم از حساب کاربری راحت بود.",
    rating: 4,
  },
];

export default function HomePage() {
  const availableCategories = categories.filter((c) =>
    products.some((p) => p.category === c.id)
  );
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* ---------- هیرو ---------- */}
      <section className="relative overflow-hidden">
        {/* تزئینات پس‌زمینه */}
        <div className="pointer-events-none absolute -top-32 -end-32 h-[28rem] w-[28rem] rounded-full bg-clay/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -start-40 h-80 w-80 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 start-1/3 h-40 w-40 rounded-full bg-clay/10 blur-2xl" />

        <div className="container-x relative grid items-center gap-14 pb-16 pt-10 lg:grid-cols-2 lg:pb-24 lg:pt-16">
          {/* ---------- متن ---------- */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-clay/25 bg-clay/10 px-4 py-1.5 text-xs font-black text-clay">
              <SparkleIcon width={14} height={14} />
              کالکشن جدید پاییز ۱۴۰۵
            </span>

            <h1 className="mt-6 text-[2.6rem] font-black leading-[1.25] tracking-tight sm:text-6xl">
              استایل تو،
              <br />
              با{" "}
              <span className="bg-gradient-to-l from-clay via-clay-bright to-clay-dark bg-clip-text text-transparent">
                نوا
              </span>{" "}
              می‌درخشه ✨
            </h1>

            <p className="mt-6 max-w-lg text-base font-medium leading-8 text-ink-soft">
              از کالکشن‌های جدید پاییزی تا استایل‌های کلاسیک؛ پوشاک باکیفیت و به‌روز را با
              ضمانت اصالت و ارسال سریع، مستقیم تا درِ خونه‌ات می‌آوریم.
            </p>

            {/* دکمه‌ها */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn btn-primary px-7 text-base">
                مشاهده محصولات
                <ArrowIcon width={18} height={18} />
              </Link>
              <Link
                href="/products?discount=1"
                className="btn border-2 border-ink/15 bg-white text-ink hover:border-clay hover:text-clay"
              >
                <TagIcon width={17} height={17} />
                تخفیف‌های ویژه
              </Link>
            </div>

            {/* آمار */}
            <div className="mt-11 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-sand rounded-2xl border border-sand/70 bg-white/80 py-4 shadow-sm backdrop-blur">
              {[
                { value: "+۱۲هزار", label: "مشتری راضی" },
                { value: "۴.۸", label: "امتیاز خرید" },
                { value: "۲۴ساعته", label: "ارسال تهران" },
              ].map((s, i) => (
                <div key={i} className="px-3 text-center">
                  <p className="text-xl font-black text-ink">{s.value}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- تصویر ---------- */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {/* هاله نارنجی پشت تصویر */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-clay/40 via-clay/10 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white shadow-2xl shadow-ink/20">
              <Image
                src="/images/hero.jpg"
                alt="کالکشن جدید پاییز نوا"
                width={900}
                height={1100}
                priority
                className="h-full w-full object-cover"
              />
              {/* گرادیان پایین */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>

            {/* کارت شناور: ضمانت */}
            <div className="absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl border border-sand/60 bg-white/95 p-3.5 pe-5 shadow-xl backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15 text-sage">
                <CheckIcon width={22} height={22} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-sm font-black">ضمانت اصالت</p>
                <p className="text-[11px] font-semibold text-ink-soft">۷ روز بازگشت بدون قید و شرط</p>
              </div>
            </div>

            {/* کارت شناور: تخفیف */}
            <div className="absolute -top-5 end-6 -rotate-3 rounded-2xl bg-clay px-4 py-2.5 text-white shadow-lg">
              <p className="text-xs font-black">
                <span className="text-2xl">٪۲۰</span> تخفیف پاییز
              </p>
            </div>

            {/* کارت شناور: ارسال */}
            <div className="absolute top-1/2 -end-3 hidden -translate-y-1/2 items-center gap-2 rounded-xl border border-sand/60 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur sm:flex">
              <ClockIcon width={16} height={16} className="text-clay" />
              <span className="text-xs font-black text-ink-soft">ارسال در ۲۴ ساعت کاری</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- نوار متحرک (مارکی) ---------- */}
      <div className="border-y-2 border-ink bg-navy-dark py-3.5 text-ivory">
        <div className="overflow-hidden" dir="ltr">
          <div className="flex w-max animate-marquee items-center">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-6 pe-6 text-sm font-extrabold tracking-wide"
              >
                {item}
                <span className="text-clay-bright">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- نوار امکانات ---------- */}
      <section className="container-x mt-16">
        <div className="grid gap-4 rounded-3xl border border-sand/60 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-clay/10 text-clay">
                <f.icon width={22} height={22} />
              </span>
              <div>
                <p className="font-black">{f.title}</p>
                <p className="mt-1 text-xs font-medium leading-6 text-ink-soft">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- دسته‌بندی‌ها ---------- */}
      <section className="container-x mt-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="kicker">خرید بر اساس دسته</span>
            <h2 className="section-title mt-2">دسته‌بندی محصولات</h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-black text-ink transition hover:text-clay sm:flex"
          >
            مشاهده همه
            <ArrowIcon width={16} height={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {availableCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group relative h-64 overflow-hidden rounded-3xl sm:h-72"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <p className="text-lg font-black">{cat.name}</p>
                <p className="text-xs font-medium text-ivory/80">{cat.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-clay-bright">
                  خرید از این دسته
                  <ArrowIcon width={14} height={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- محصولات منتخب (تب‌ها) ---------- */}
      <ProductTabs />

      {/* ---------- بنر تبلیغاتی ---------- */}
      <section className="container-x mt-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-clay to-clay-dark px-6 py-12 text-white sm:px-12">
          <div className="pointer-events-none absolute -top-16 -start-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -end-10 h-64 w-64 rounded-full bg-ink/20 blur-3xl" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
            <div>
              <p className="text-sm font-black text-amber-200">فروش ویژه‌ی پاییز</p>
              <h2 className="mt-2 text-3xl font-black">تا ۲۰٪ تخفیف روی کالکشن جدید</h2>
              <p className="mt-2 text-sm font-medium text-white/85">
                فرصت محدود — فقط تا پایان هفته
              </p>
            </div>
            <Link
              href="/products?discount=1"
              className="btn shrink-0 bg-white text-clay hover:bg-ivory"
            >
              مشاهده تخفیف‌ها
              <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- نظرات مشتریان ---------- */}
      <section className="container-x mt-16">
        <div className="mb-8 text-center">
          <span className="kicker justify-center">بازخورد واقعی</span>
          <h2 className="section-title mt-2">مشتری‌های ما چه می‌گویند؟</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-sand/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <QuoteIcon width={28} height={28} className="mb-3 text-clay/40" />
              <blockquote className="text-sm font-medium leading-7 text-ink-soft">
                {t.text}
              </blockquote>
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-sand pt-4">
                <div>
                  <figcaption className="text-sm font-black">{t.name}</figcaption>
                  <p className="text-xs font-medium text-ink-soft">{t.city}</p>
                </div>
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} filled width={15} height={15} />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- برندهای همکار ---------- */}
      <section className="container-x mt-16">
        <div className="rounded-3xl border border-sand/60 bg-white px-6 py-8">
          <p className="mb-6 text-center text-xs font-black tracking-[0.25em] text-ink-soft/60">
            برندهای در دسترس در نوا
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["دنیا", "استایلینو", "مُدا", "وینتیج", "پوشا", "کژوال", "سلکشن"].map((b) => (
              <span key={b} className="text-lg font-black text-ink">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- خبرنامه ---------- */}
      <Newsletter />

      {/* ---------- پیشنهاد ویژه ---------- */}
      <section className="container-x mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="kicker">پیشنهاد نوا</span>
            <h2 className="section-title mt-2">پیشنهاد ویژه‌ی امروز</h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-black text-ink transition hover:text-clay sm:flex"
          >
            مشاهده همه
            <ArrowIcon width={16} height={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
