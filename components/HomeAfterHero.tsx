import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { beautyCategories, brands, collections, concerns, journal } from "@/lib/beauty";
import ProductShelf from "@/components/ProductShelf";
import RecentlyViewed from "@/components/RecentlyViewed";
import Newsletter from "@/components/Newsletter";
import HomeRail from "@/components/HomeRail";
import {
  ArrowIcon,
  PhoneIcon,
  RefreshIcon,
  ShieldIcon,
  SparkleIcon,
  TruckIcon,
} from "@/components/Icons";

const trust = [
  { icon: ShieldIcon, title: "تضمین اصالت", text: "پلمب کارخانه، کد رهگیری" },
  { icon: TruckIcon, title: "ارسال سریع", text: "تهران فردای سفارش" },
  { icon: SparkleIcon, title: "مشاوره تخصصی", text: "روتین پوست، رایگان" },
  { icon: RefreshIcon, title: "۷ روز بازگشت", text: "اگر پلمب باز نشده" },
  { icon: PhoneIcon, title: "پشتیبانی", text: "شنبه تا پنجشنبه ۹–۱۸" },
];

export default function HomeAfterHero() {
  const best = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const trending = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  const fresh = products.filter((p) => p.tags.includes("جدید")).slice(0, 8);
  const staff = products.filter((p) => p.staffPick).slice(0, 8);

  return (
    <div>
      {/* موبایل: دسته سریع سوایپ */}
      <section className="mt-6 lg:hidden">
        <HomeRail ariaLabel="دسته‌های زیبایی">
          {beautyCategories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="w-[7.25rem] shrink-0 snap-start"
            >
              <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ivory">
                <Image src={c.image} alt="" fill className="object-cover" sizes="116px" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-2.5 text-[12px] font-semibold text-white">
                  {c.name}
                </span>
              </span>
            </Link>
          ))}
        </HomeRail>
      </section>

      {/* دسکتاپ: کارت‌های دسته */}
      <section className="container-x mt-10 hidden lg:block">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="kicker">CATEGORIES</p>
            <h2 className="section-title mt-2">چه چیزی لازم داری؟</h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-ink-soft hover:text-ink">
            همه محصولات
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {beautyCategories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group relative h-64 overflow-hidden rounded-2xl"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] tracking-[0.16em] text-white/70">{c.kicker}</p>
                <p className="mt-1 text-lg font-semibold">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* مشکل پوست */}
      <section className="container-x mt-10 lg:mt-14">
        <div className="mb-5 lg:mb-6">
          <p className="kicker">SKIN CONCERN</p>
          <h2 className="section-title mt-2">مشکل پوستت چیست؟</h2>
          <p className="mt-2 max-w-lg text-sm leading-7 text-ink-soft">
            مثل مشاوره حضوری: یک نگرانی را انتخاب کن تا محصولات مناسب همان پوست بیاید.
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {concerns.map((c) => (
            <Link
              key={c.id}
              href={`/products?concern=${c.id}`}
              className={`min-w-[9.5rem] shrink-0 rounded-2xl px-4 py-5 transition hover:-translate-y-0.5 lg:min-w-0 ${c.tone}`}
            >
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-[11px] leading-5 text-ink/60">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* کالکشن‌ها — موبایل یک ریل، دسکتاپ گرید داستانی */}
      <section className="mt-10 lg:mt-14">
        <div className="container-x mb-5 flex items-end justify-between lg:mb-6">
          <div>
            <p className="kicker">COLLECTIONS</p>
            <h2 className="section-title mt-2">کالکشن‌های نوا</h2>
          </div>
        </div>
        <div className="lg:hidden">
          <HomeRail ariaLabel="کالکشن‌ها">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                className="relative h-52 w-[17rem] shrink-0 snap-start overflow-hidden rounded-2xl"
              >
                <Image src={col.image} alt="" fill className="object-cover" sizes="272px" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[11px] text-white/70">{col.kicker}</p>
                  <p className="mt-1 font-semibold">{col.title}</p>
                </div>
              </Link>
            ))}
          </HomeRail>
        </div>
        <div className="container-x hidden gap-4 lg:grid lg:grid-cols-2">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-ink/20 via-ink/40 to-ink/75" />
              <div className="absolute inset-y-0 start-0 flex w-[58%] flex-col justify-end p-8 text-white">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-brass">{col.kicker}</p>
                <h3 className="mt-2 text-2xl font-semibold">{col.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{col.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                  {col.cta}
                  <ArrowIcon width={14} height={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductShelf title="پرفروش‌ترین‌ها" href="/products?sort=best" products={best} />
      <ProductShelf title="ترند این هفته" href="/products?sort=best" products={trending} />

      <div className="hidden lg:block">
        <ProductShelf title="تازه‌واردها" href="/products" products={fresh} />
        <ProductShelf title="انتخاب مشاوران نوا" href="/products" products={staff} />
      </div>
      <div className="lg:hidden">
        <ProductShelf title="تازه‌ها و انتخاب مشاور" href="/products" products={[...fresh, ...staff].slice(0, 6)} />
      </div>

      {/* برندها */}
      <section className="container-x mt-10 lg:mt-14">
        <p className="kicker">BRANDS</p>
        <h2 className="section-title mt-2">برندهای نوا</h2>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:overflow-visible lg:gap-4">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={b.href}
              className="min-w-[16rem] shrink-0 rounded-2xl border border-sand bg-ivory p-5 transition hover:border-clay/40 lg:min-w-0"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{b.name}</p>
                {b.premium && (
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-ivory">
                    Premium
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-ink-soft">{b.origin}</p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{b.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-clay">
                مشاهده محصولات
                <ArrowIcon width={12} height={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* مجله */}
      <section className="container-x mt-10 lg:mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="kicker">JOURNAL</p>
            <h2 className="section-title mt-2">از مجله زیبایی نوا</h2>
          </div>
          <Link href="/journal" className="text-sm font-medium text-ink-soft hover:text-ink">
            همه مطالب
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {journal.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="group overflow-hidden rounded-2xl border border-sand bg-ivory"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width:1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-4 lg:p-5">
                <p className="text-[11px] font-semibold tracking-wide text-clay">
                  {a.kicker} · {a.minutes.toLocaleString("fa-IR")} دقیقه
                </p>
                <h3 className="mt-1.5 text-base font-semibold leading-7">{a.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-7 text-ink-soft">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* اعتماد — مینیمال */}
      <section className="container-x mt-10 lg:mt-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-y border-sand py-8 lg:grid-cols-5 lg:py-10">
          {trust.map((t) => (
            <div key={t.title} className="flex items-start gap-3 lg:flex-col lg:items-center lg:text-center">
              <t.icon width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="mt-0.5 text-[11px] leading-5 text-ink-soft">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RecentlyViewed />
      <Newsletter />
      <div className="h-6 lg:h-4" />
    </div>
  );
}
