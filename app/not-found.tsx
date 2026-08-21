import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-black text-clay">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-black">صفحه‌ای که دنبالش بودید پیدا نشد!</h1>
      <p className="mt-3 max-w-sm text-sm leading-7 text-ink-soft">
        ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد. بیایید به صفحه اصلی برگردیم.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">بازگشت به خانه</Link>
        <Link href="/products" className="btn btn-outline">مشاهده محصولات</Link>
      </div>
    </div>
  );
}
