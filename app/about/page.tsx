import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, ShieldIcon, SparkleIcon, TruckIcon, WalletIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "داستان فروشگاه پوشاک نوا؛ از ایده تا امروز.",
};

const values = [
  {
    icon: SparkleIcon,
    title: "کیفیت بی‌حاشیه",
    text: "همه‌ی محصولات نوا قبل از عرضه چند مرحله کنترل کیفیت می‌شوند.",
  },
  {
    icon: TruckIcon,
    title: "ارسال سریع",
    text: "سفارش‌های تهران در ۲۴ ساعت و شهرستان‌ها حداکثر ۷۲ ساعت ارسال می‌شوند.",
  },
  {
    icon: ShieldIcon,
    title: "ضمانت اصالت",
    text: "در صورت نارضایتی، تا ۷ روز امکان بازگشت بدون قید و شرط دارید.",
  },
  {
    icon: WalletIcon,
    title: "قیمت منصفانه",
    text: "با حذف واسطه‌ها، بهترین قیمت را مستقیم از تولیدکننده دریافت می‌کنید.",
  },
];

const stats = [
  { value: "+۱۲هزار", label: "مشتری راضی" },
  { value: "+۴۵۰۰", label: "سفارش موفق" },
  { value: "۴.۸", label: "امتیاز رضایت" },
  { value: "۷", label: "سال تجربه" },
];

export default function AboutPage() {
  return (
    <div className="container-x mt-8">
      {/* معرفی */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-clay">داستان ما</p>
          <h1 className="section-title mt-2">
            نوا؛ جایی که استایلِ تو <span className="text-clay">معنا</span> پیدا می‌کنه
          </h1>
          <div className="mt-5 space-y-4 text-sm leading-8 text-ink-soft">
            <p>
              فروشگاه پوشاک نوا در سال ۱۳۹۸ با یک هدف ساده شروع به کار کرد: رساندن پوشاک
              باکیفیت و به‌روز با قیمت منصفانه به دست همه‌ی مردم ایران.
            </p>
            <p>
              ما با همکاری مستقیم با تولیدکنندگان برتر داخلی، واسطه‌ها را حذف کردیم تا هم کیفیت
              بالاتر برود و هم قیمت پایین‌تر. امروز نوا میزبان هزاران مشتری وفادار در سراسر
              کشور است.
            </p>
            <p>
              تیم نوا متشکل از طراحان، تولیدکنندگان و پشتیبانانی است که عاشق لباس و استایل
              هستند و هر روز برای تجربه‌ی بهتر خرید شما تلاش می‌کنند.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              مشاهده محصولات
            </Link>
            <Link href="/contact" className="btn btn-outline">
              تماس با ما
            </Link>
          </div>
        </div>

        {/* اعداد */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-sand/60 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-clay">{s.value}</p>
              <p className="mt-1 text-sm font-bold text-ink-soft">{s.label}</p>
            </div>
          ))}
          <div className="col-span-2 overflow-hidden rounded-3xl bg-ink p-6 text-center text-ivory">
            <p className="text-lg font-black">«لباس خوب، حال خوب می‌آورد.»</p>
            <p className="mt-1 text-xs text-ivory/60">— تیم نوا</p>
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold text-clay">چرا نوا؟</p>
          <h2 className="section-title mt-1">چهار اصل که به آن‌ها پایبندیم</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-sand/60 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-clay">
                <v.icon width={22} height={22} />
              </span>
              <p className="font-extrabold">{v.title}</p>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* سوالات متداول */}
      <section className="mx-auto mt-16 max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="section-title">سوالات متداول</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: "مدت زمان ارسال سفارش چقدر است؟",
              a: "سفارش‌های تهران معمولاً در ۲۴ ساعت کاری و شهرستان‌ها بین ۲ تا ۵ روز کاری تحویل داده می‌شوند. سفارش‌های بالای ۲ میلیون تومان ارسال رایگان دارند.",
            },
            {
              q: "اگر سایز یا رنگ مناسب نبود چه کنم؟",
              a: "تا ۷ روز پس از تحویل، امکان بازگشت کالا بدون قید و شرط وجود دارد. کافیست با پشتیبانی تماس بگیرید تا مراحل بازگشت را انجام دهید.",
            },
            {
              q: "روش‌های پرداخت چیست؟",
              a: "پرداخت آنلاین از طریق درگاه امن بانکی، کارت به کارت و پرداخت در محل (برای برخی شهرها) فعال است.",
            },
            {
              q: "آیا امکان تعویض سایز وجود دارد؟",
              a: "بله، در صورت موجود بودن سایز دلخواه، تعویض سایز به‌صورت رایگان انجام می‌شود.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-sand/60 bg-white p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-extrabold">
                <span className="flex items-center gap-2">
                  <CheckIcon width={16} height={16} className="shrink-0 text-clay" />
                  {item.q}
                </span>
                <span className="text-ink-soft transition group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 border-t border-dashed border-sand pt-3 text-sm leading-7 text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
