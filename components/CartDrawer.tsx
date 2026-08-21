"use client";

/** کشوی سبد خرید (از سمت چپ باز می‌شود) */
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import QuantityPicker from "./QuantityPicker";
import { CartIcon, CloseIcon, TrashIcon, TruckIcon } from "./Icons";

export default function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { cartOpen, closeCart } = useUi();

  // قفل اسکرول صفحه وقتی کشو باز است
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  // بستن با کلید Esc
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* پس‌زمینه تیره */}
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* پنل کشو */}
      <aside
        className={cn(
          "fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          cartOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!cartOpen}
      >
        {/* سربرگ */}
        <div className="flex items-center justify-between border-b border-sand/60 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <CartIcon width={22} height={22} className="text-clay" />
            سبد خرید
            {items.length > 0 && (
              <span className="rounded-full bg-clay/10 px-2 py-0.5 text-xs font-bold text-clay">
                {items.length.toLocaleString("fa-IR")} قلم
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="بستن"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-cream"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        {items.length === 0 ? (
          /* حالت خالی */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-ink-soft">
              <CartIcon width={36} height={36} />
            </div>
            <p className="font-bold text-ink">سبد خرید شما خالی است!</p>
            <p className="text-sm text-ink-soft">
              هنوز هیچ محصولی به سبد اضافه نکرده‌اید. از محصولات ما دیدن کنید.
            </p>
            <Link href="/products" onClick={closeCart} className="btn btn-primary mt-2">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <>
            {/* نوار ارسال رایگان */}
            <div className="border-b border-sand/60 bg-cream/60 px-5 py-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                <TruckIcon width={16} height={16} className="text-clay" />
                {remainingForFree > 0 ? (
                  <>
                    تا ارسال رایگان{" "}
                    <b className="text-clay">{formatPrice(remainingForFree)}</b> مانده
                  </>
                ) : (
                  <b className="text-sage">ارسال سفارش شما رایگان شد 🎉</b>
                )}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/70">
                <div
                  className="h-full rounded-full bg-clay transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* آیتم‌ها */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={closeCart}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                    >
                      {/* استفاده از img ساده برای سازگاری حداکثری */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeCart}
                          className="line-clamp-1 text-sm font-bold text-ink hover:text-clay"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          aria-label="حذف"
                          className="text-ink-soft/50 transition hover:text-clay"
                        >
                          <TrashIcon width={17} height={17} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        سایز: {item.size} — رنگ: {item.color}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QuantityPicker
                          size="sm"
                          value={item.quantity}
                          onChange={(q) =>
                            updateQuantity(item.productId, item.size, item.color, q)
                          }
                        />
                        <span className="text-sm font-extrabold">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* جمع و دکمه‌ها */}
            <div className="border-t border-sand/60 px-5 py-4">
              <div className="mb-1 flex items-center justify-between text-sm text-ink-soft">
                <span>جمع سبد خرید</span>
                <span className="font-bold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm text-ink-soft">
                <span>هزینه ارسال</span>
                <span className="font-bold text-ink">
                  {remainingForFree > 0 ? formatPrice(SHIPPING_COST) : "رایگان"}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between border-t border-dashed border-sand pt-3 text-base">
                <span className="font-bold">مبلغ قابل پرداخت</span>
                <span className="text-lg font-black text-clay">
                  {formatPrice(subtotal + (remainingForFree > 0 ? SHIPPING_COST : 0))}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={closeCart} className="btn btn-outline">
                  مشاهده سبد
                </Link>
                <Link href="/checkout" onClick={closeCart} className="btn btn-clay">
                  تسویه حساب
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
