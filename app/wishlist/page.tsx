"use client";

/** صفحه علاقه‌مندی‌ها */
import Link from "next/link";
import { useWishlist } from "@/lib/store/wishlist-context";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { HeartIcon } from "@/components/Icons";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wished = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-x mt-8">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="transition hover:text-clay">خانه</Link>
        <span>/</span>
        <span className="font-bold text-ink">علاقه‌مندی‌ها</span>
      </nav>

      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay/10 text-clay">
          <HeartIcon width={22} height={22} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold">علاقه‌مندی‌های من</h1>
          <p className="text-sm text-ink-soft">
            {wished.length.toLocaleString("fa-IR")} محصول ذخیره شده
          </p>
        </div>
      </div>

      {wished.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sand bg-white py-20 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-ink-soft">
            <HeartIcon width={38} height={38} />
          </span>
          <p className="mt-5 text-lg font-extrabold">لیست علاقه‌مندی‌ها خالی است</p>
          <p className="mt-1 max-w-sm text-sm leading-7 text-ink-soft">
            روی آیکون قلب هر محصول بزنید تا بعداً راحت‌تر پیدایش کنید.
          </p>
          <Link href="/products" className="btn btn-primary mt-6">
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {wished.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
