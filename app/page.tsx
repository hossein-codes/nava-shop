import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductShelf from "@/components/ProductShelf";
import RecentlyViewed from "@/components/RecentlyViewed";
import HomeRail from "@/components/HomeRail";
import {
  ArrowIcon,
  PhoneIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
  WalletIcon,
} from "@/components/Icons";

const features = [
  { icon: TruckIcon, title: "ارسال سریع", text: "تهران ۲۴ ساعته" },
  { icon: ShieldIcon, title: "ضمانت اصالت", text: "کنترل کیفیت پیش از ارسال" },
  { icon: RefreshIcon, title: "۷ روز بازگشت", text: "بدون قید اگر سایز نخورد" },
  { icon: WalletIcon, title: "پرداخت امن", text: "آنلاین یا در محل" },
  { icon: PhoneIcon, title: "پشتیبانی", text: "شنبه تا پنجشنبه ۹ تا ۱۸" },
];

const circles = [
  { label: "زنانه", href: "/products?category=women", image: "/images/home/look-women.jpg" },
  { label: "مردانه", href: "/products?category=men", image: "/images/home/look-formal.jpg" },
  { label: "بچگانه", href: "/products?category=kids", image: "/images/products/kids-jacket.jpg" },
  { label: "کت", href: "/products?q=%D8%A9%D8%AA", image: "/images/products/camel-blazer.jpg" },
  { label: "پیراهن", href: "/products?q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86", image: "/images/products/white-shirt.jpg" },
  { label: "سویشرت", href: "/products?q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA", image: "/images/products/grey-hoodie.jpg" },
  { label: "مجلسی", href: "/products?q=%D9%85%D8%AC%D9%84%D8%B3%DB%8C", image: "/images/products/evening-dress.jpg" },
  { label: "روزمره", href: "/products?q=%DA%A9%DA%98%D9%88%D8%A7%D9%84", image: "/images/home/look-daily.jpg" },
];

const banners = [
  {
    href: "/products?discount=1",
    image: "/images/home/banner-sale.jpg",
    kicker: "فرصت محدود",
    title: "تخفیف‌های ویژه",
    text: "تا ۲۰٪ روی کالکشن منتخب",
    cta: "مشاهده تخفیف",
  },
  {
    href: "/products",
    image: "/images/home/banner-collection.jpg",
    kicker: "پاییز ۱۴۰۵",
    title: "کالکشن جدید",
    text: "New Collection",
    cta: "مشاهده کالکشن",
  },
  {
    href: "/products?q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA",
    image: "/images/home/banner-casual.jpg",
    kicker: "راحت و روزمره",
    title: "استایل کژوال",
    text: "سویشرت و پوشش آسان",
    cta: "خرید کژوال",
  },
];

const looks = [
  { href: "/products?category=men", image: "/images/home/look-daily.jpg", title: "استایل روزمره", text: "کژوال مردانه" },
  { href: "/products?category=men", image: "/images/home/look-formal.jpg", title: "رسمی", text: "کت‌وشلوار و پیراهن" },
  { href: "/products?category=women", image: "/images/home/look-women.jpg", title: "نگاه زنانه", text: "کت و مجلسی" },
  { href: "/products?q=%D8%B3%D9%88%DB%8C%D8%B4%D8%B1%D8%AA", image: "/images/home/look-street.jpg", title: "کژوال ترند", text: "سویشرت و راحتی" },
];

const insta = [
  "/images/home/look-women.jpg",
  "/images/home/look-formal.jpg",
  "/images/products/camel-blazer.jpg",
  "/images/home/look-daily.jpg",
  "/images/products/evening-dress.jpg",
  "/images/home/look-street.jpg",
];

export default function HomePage() {
  const best = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="bg-white">
      {/* هیرو */}
      <section className="container-x pt-4 lg:pt-6">
        {/* موبایل: کارت روی عکس */}
        <Link href="/products" className="relative block overflow-hidden rounded-2xl lg:hidden">
          <div className="relative h-[22rem]">
            <Image
              src="/images/hero.jpg"
              alt="کالکشن پاییز نوا"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[11px] text-white/75">کالکشن پاییز و زمستان ۱۴۰۵</p>
              <h1 className="mt-1 text-2xl font-semibold leading-snug">استایل جدید، نسخه تو</h1>
              <p className="mt-1 text-xs text-white/80">جدیدترین‌های فصل با دوخت مشخص</p>
              <span className="mt-4 inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink">
                مشاهده کالکشن
              </span>
            </div>
          </div>
        </Link>

        {/* دسکتاپ: متن + تصویر */}
        <div className="relative hidden overflow-hidden rounded-[1.75rem] bg-[#efe8df] lg:grid lg:grid-cols-2 lg:min-h-[28rem]">
          <div className="flex flex-col justify-center px-10 py-14 xl:px-16">
            <p className="text-xs font-medium text-ink-soft">کالکشن پاییز و زمستان ۱۴۰۵</p>
            <h1 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-[1.2] tracking-tight xl:text-5xl">
              استایل جدید، نسخه تو
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink-soft">
              جدیدترین‌های فصل با پارچه مشخص، سایزبندی دقیق و ارسال سریع.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn min-h-11 rounded-full bg-ink px-6 text-white hover:bg-[#2c2926]">
                مشاهده کالکشن
              </Link>
              <Link href="/products?discount=1" className="btn min-h-11 rounded-full border-ink/15 bg-white px-6 text-ink">
                خرید کنید
              </Link>
            </div>
          </div>
          <div className="relative min-h-[28rem]">
            <Image
              src="/images/hero.jpg"
              alt="کالکشن پاییز نوا"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* دایره‌های دسته — موبایل بالای اعتماد مثل طرح */}
      <section className="mt-6 lg:hidden">
        <HomeRail ariaLabel="دسته‌بندی سریع">
          {circles.slice(0, 5).map((c) => (
            <Link key={c.label} href={c.href} className="flex w-[4.6rem] shrink-0 snap-start flex-col items-center gap-2">
              <span className="relative h-16 w-16 overflow-hidden rounded-full bg-[#f4f1ec] ring-1 ring-sand">
                <Image src={c.image} alt="" fill className="object-cover" sizes="64px" />
              </span>
              <span className="text-[11px] font-medium">{c.label}</span>
            </Link>
          ))}
          <Link href="/products?discount=1" className="flex w-[4.6rem] shrink-0 snap-start flex-col items-center gap-2">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sale text-lg font-semibold text-white">
              ٪
            </span>
            <span className="text-[11px] font-medium">تخفیف‌ها</span>
          </Link>
        </HomeRail>
      </section>

      {/* اعتماد */}
      <section className="container-x mt-6 lg:mt-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-2xl bg-[#f6f4f0] px-3 py-3.5 lg:flex-col lg:items-center lg:px-4 lg:py-5 lg:text-center"
            >
              <f.icon width={22} height={22} className="shrink-0 text-ink" />
              <div>
                <p className="text-xs font-semibold lg:mt-2 lg:text-sm">{f.title}</p>
                <p className="mt-0.5 text-[10px] leading-5 text-ink-soft lg:text-[11px]">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* دایره‌ها دسکتاپ */}
      <section className="mt-8 hidden lg:block">
        <HomeRail ariaLabel="دسته‌بندی سریع">
          {circles.map((c) => (
            <Link key={c.label} href={c.href} className="flex w-24 shrink-0 snap-start flex-col items-center gap-2">
              <span className="relative h-[4.75rem] w-[4.75rem] overflow-hidden rounded-full bg-[#f4f1ec] ring-1 ring-sand">
                <Image src={c.image} alt="" fill className="object-cover" sizes="76px" />
              </span>
              <span className="text-xs font-medium">{c.label}</span>
            </Link>
          ))}
          <Link href="/products?discount=1" className="flex w-24 shrink-0 snap-start flex-col items-center gap-2">
            <span className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-sale text-xl font-semibold text-white">
              ٪
            </span>
            <span className="text-xs font-medium">تخفیف‌ها</span>
          </Link>
          <Link href="/products" className="flex w-24 shrink-0 snap-start flex-col items-center gap-2">
            <span className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-[#f4f1ec] text-xs font-semibold ring-1 ring-sand">
              همه
            </span>
            <span className="text-xs font-medium">همه محصولات</span>
          </Link>
        </HomeRail>
      </section>

      {/* سه بنر */}
      <section className="container-x mt-8 lg:mt-10">
        <div className="grid gap-3 lg:grid-cols-3">
          {banners.map((b) => (
            <Link key={b.title} href={b.href} className="group relative h-44 overflow-hidden rounded-2xl lg:h-52">
              <Image
                src={b.image}
                alt={b.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(min-width:1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white lg:p-5">
                <p className="text-[11px] text-white/70">{b.kicker}</p>
                <p className="mt-1 text-lg font-semibold">{b.title}</p>
                <p className="text-xs text-white/80">{b.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">
                  {b.cta}
                  <ArrowIcon width={12} height={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductShelf title="پرفروش‌ترین‌ها" href="/products?sort=best" products={best} />

      {/* لوک‌بوک */}
      <section className="container-x mt-10 lg:mt-14">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {looks.map((l) => (
            <Link key={l.title} href={l.href} className="group relative h-52 overflow-hidden rounded-2xl lg:h-64">
              <Image
                src={l.image}
                alt={l.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(min-width:1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-semibold">{l.title}</p>
                <p className="text-[11px] text-white/75">{l.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* اینستاگرام */}
      <section className="container-x mt-10 lg:mt-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold lg:text-xl">از اینستاگرام نوا</h2>
          <span className="text-xs text-ink-soft">@nava.shop</span>
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
          {insta.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-[#f4f1ec]">
              <Image src={src} alt="" fill className="object-cover" sizes="16vw" />
            </div>
          ))}
        </div>
      </section>

      <RecentlyViewed />
      <div className="h-8 lg:h-12" />
    </div>
  );
}
