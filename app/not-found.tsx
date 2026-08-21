import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-semibold text-ink">۴۰۴</p>
      <h1 className="mt-4 text-xl font-semibold">این صفحه پیدا نشد</h1>
      <p className="mt-3 max-w-sm text-sm leading-7 text-ink-soft">
        آدرس اشتباه است یا صفحه حذف شده. به خانه یا فروشگاه برگردید.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">خانه</Link>
        <Link href="/products" className="btn btn-outline">محصولات</Link>
      </div>
    </div>
  );
}
