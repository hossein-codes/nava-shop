"use client";

/** صفحه کامل سبد خرید */
import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import QuantityPicker from "@/components/QuantityPicker";
import { ArrowIcon, CartIcon, TrashIcon, TruckIcon } from "@/components/Icons";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x mt-10 flex flex-col items-center justify-center py-20 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-cream text-ink-soft">
          <CartIcon width={44} height={44} />
        </span>
        <h1 className="mt-6 text-2xl font-black">سبد خرید شما خالی است</h1>
        <p className="mt-2 max-w-sm text-sm leading-7 text-ink-soft">
          هنوز محصولی به سبد اضافه نکرده‌اید. به فروشگاه سر بزنید و از کالکشن جدید ما دیدن کنید.
        </p>
        <Link href="/products" className="btn btn-primary mt-7">
          مشاهده محصولات
          <ArrowIcon width={18} height={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x mt-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="transition hover:text-clay">خانه</Link>
        <span>/</span>
        <span className="font-bold text-ink">سبد خرید</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black sm:text-3xl">سبد خرید</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs font-bold text-ink-soft transition hover:text-clay"
        >
          <TrashIcon width={15} height={15} />
          خالی کردن سبد
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* لیست اقلام */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl border border-sand/60 bg-white p-4"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-32 w-26 shrink-0 overflow-hidden rounded-xl bg-cream"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-extrabold text-ink transition hover:text-clay sm:text-base"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-soft">
                        سایز: {item.size} — رنگ: {item.color}
                      </p>
                      <p className="mt-1 text-xs text-ink-soft">
                        قیمت واحد: {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      aria-label="حذف"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft/50 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <TrashIcon width={17} height={17} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityPicker
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.productId, item.size, item.color, q)}
                    />
                    <span className="text-base font-black">
                      {formatPrice(product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* خلاصه سفارش */}
        <aside className="h-fit rounded-3xl border border-sand/60 bg-white p-6 lg:sticky lg:top-32">
          <h2 className="mb-4 text-lg font-extrabold">خلاصه سفارش</h2>

          <div className="mb-4 rounded-2xl bg-cream/70 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
              <TruckIcon width={16} height={16} className="text-clay" />
              {remainingForFree > 0 ? (
                <>
                  تا ارسال رایگان <b className="text-clay">{formatPrice(remainingForFree)}</b> مانده
                </>
              ) : (
                <b className="text-sage">ارسال سفارش شما رایگان شد 🎉</b>
              )}
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/70">
              <div
                className="h-full rounded-full bg-clay transition-all duration-500"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2.5 border-b border-dashed border-sand pb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">جمع کالاها</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">هزینه ارسال</span>
              <span className="font-bold">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">تخفیف</span>
              <span className="font-bold text-sage">اعمال شده</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-extrabold">مبلغ قابل پرداخت</span>
            <span className="text-xl font-black text-clay">{formatPrice(total)}</span>
          </div>

          <Link href="/checkout" className="btn btn-clay mt-5 w-full">
            ادامه فرایند خرید
            <ArrowIcon width={18} height={18} />
          </Link>
          <Link
            href="/products"
            className="mt-3 block text-center text-xs font-bold text-ink-soft transition hover:text-clay"
          >
            ادامه خرید از فروشگاه
          </Link>
        </aside>
      </div>
    </div>
  );
}
