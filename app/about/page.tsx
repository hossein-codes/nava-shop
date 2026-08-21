import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, ShieldIcon, SparkleIcon, TruckIcon, WalletIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "داستان فروشگاه زیبایی نوا؛ مراقبت پوست و آرایش با ضمانت اصالت.",
};

const values = [
  {
    icon: SparkleIcon,
    title: "مشاوره، نه فشار فروش",
    text: "روتین را بر اساس پوست می‌چینیم. پنج محصول وقتی دو تا کافی است، پیشنهاد نمی‌شود.",
  },
  {
    icon: TruckIcon,
    title: "ارسال سریع و خنک",
    text: "فرمولاسیون حساس با بسته‌بندی محافظ. تهران معمولاً فردای سفارش.",
  },
  {
    icon: ShieldIcon,
    title: "ضمانت اصالت",
    text: "پلمب کارخانه. اگر پلمب باز نشده باشد تا ۷ روز بازگشت دارید.",
  },
  {
    icon: WalletIcon,
    title: "قیمت روشن",
    text: "تخفیف نمایشی نداریم. درصد روی قیمت واقعی است.",
  },
];

const stats = [
  { value: "+۱۸هزار", label: "مشتری روتین" },
  { value: "+۹۰۰۰", label: "سفارش موفق" },
  { value: "۴.۸", label: "امتیاز رضایت" },
  { value: "۷", label: "سال تجربه" },
];

export default function AboutPage() {
  return (
    <div className="container-x mt-8">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-clay">داستان ما</p>
          <h1 className="section-title mt-2">
            نوا؛ جایی که پوست <span className="text-clay">در اولویت</span> است
          </h1>
          <div className="mt-5 space-y-4 text-sm leading-8 text-ink-soft">
            <p>
              نوا لَب از ۱۳۹۸ به‌جای ویترین شلوغ، روی چند فرمول درست تمرکز کرد: سرم، آبرسان، ضدآفتاب
              و رنگ‌هایی که روی پوست مدیترانه‌ای طبیعی می‌نشینند.
            </p>
            <p>
              با آزمایشگاه‌های همکار در ایران و اروپا کار می‌کنیم. هر محصول قبل از عرضه روی حساسیت،
              بافت و پلمب کنترل می‌شود.
            </p>
            <p>
              تیم مشاوره پوست شنبه تا پنجشنبه پاسخ می‌دهد. هدف‌مان این است که کمتر بخرید، بهتر بخرید.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              مشاهده محصولات
            </Link>
            <Link href="/journal" className="btn btn-outline">
              مجله زیبایی
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-sand bg-ivory p-6 text-center">
              <p className="text-3xl font-black text-clay">{s.value}</p>
              <p className="mt-1 text-sm font-bold text-ink-soft">{s.label}</p>
            </div>
          ))}
          <div className="col-span-2 overflow-hidden rounded-3xl bg-ink p-6 text-center text-ivory">
            <p className="text-lg font-black">«پوست خوب، آرایش کم می‌خواهد.»</p>
            <p className="mt-1 text-xs text-ivory/60">— تیم نوا لَب</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold text-clay">چرا نوا؟</p>
          <h2 className="section-title mt-1">چهار اصل که به آن‌ها پایبندیم</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-sand bg-ivory p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-soft text-clay">
                <v.icon width={22} height={22} />
              </span>
              <p className="font-extrabold">{v.title}</p>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl pb-12">
        <div className="mb-8 text-center">
          <h2 className="section-title">سوالات متداول</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: "مدت زمان ارسال سفارش چقدر است؟",
              a: "سفارش‌های تهران معمولاً فردای کاری و شهرستان‌ها بین ۲ تا ۵ روز. بالای ۱٫۲ میلیون تومان ارسال رایگان است.",
            },
            {
              q: "اگر محصول مناسب پوستم نبود چه کنم؟",
              a: "تا ۷ روز اگر پلمب باز نشده باشد بازگشت دارید. برای راهنمایی روتین قبل از باز کردن با پشتیبانی تماس بگیرید.",
            },
            {
              q: "آیا محصولات اصل هستند؟",
              a: "بله. پلمب کارخانه و کد رهگیری. ادعای «اورجینال بازار» بدون فاکتور نداریم.",
            },
            {
              q: "چطور سرم مناسب را انتخاب کنم؟",
              a: "از بخش «مشکل پوستت چیست؟» شروع کنید یا مطلب راهنمای سرم را در مجله بخوانید.",
            },
          ].map((item) => (
            <details key={item.q} className="group rounded-2xl border border-sand bg-ivory p-5">
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
