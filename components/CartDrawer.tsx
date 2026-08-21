"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import CartItemRow from "./CartItem";
import EmptyState from "./EmptyState";
import { CartIcon, CloseIcon, TruckIcon } from "./Icons";

export default function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { cartOpen, closeCart } = useUi();

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;

  return (
    <>
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-[0_16px_48px_rgb(26_24_22_/_0.16)] transition-transform duration-300",
          "inset-x-0 bottom-0 h-[92%] rounded-t-2xl",
          "lg:inset-y-0 lg:end-0 lg:start-auto lg:h-full lg:w-full lg:max-w-md lg:rounded-none",
          cartOpen
            ? "translate-y-0 lg:translate-x-0"
            : "translate-y-full lg:translate-y-0 lg:-translate-x-full"
        )}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-sand px-4 py-3">
          <h2 className="text-base font-semibold">
            سبد خرید
            {items.length > 0 && (
              <span className="ms-2 text-sm font-normal text-ink-soft">
                {items.length.toLocaleString("fa-IR")} قلم
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="بستن"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-soft hover:bg-cream"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<CartIcon width={32} height={32} />}
            title="سبد خرید خالی است"
            text="محصولی اضافه نشده. از کالکشن جدید دیدن کنید."
            action={
              <Link href="/products" onClick={closeCart} className="btn btn-primary">
                مشاهده محصولات
              </Link>
            }
          />
        ) : (
          <>
            <div className="border-b border-sand bg-ivory px-4 py-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs text-ink-soft">
                <TruckIcon width={16} height={16} />
                {remainingForFree > 0 ? (
                  <>
                    تا ارسال رایگان <b className="text-ink">{formatPrice(remainingForFree)}</b> مانده
                  </>
                ) : (
                  <b className="text-sage">ارسال این سفارش رایگان است</b>
                )}
              </p>
              <div className="h-1 w-full overflow-hidden rounded-full bg-sand">
                <div className="h-full bg-ink transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {items.map((item) => (
                <CartItemRow
                  key={`${item.productId}-${item.size}-${item.color}`}
                  item={item}
                  compact
                  onNavigate={closeCart}
                  onQty={(q) => updateQuantity(item.productId, item.size, item.color, q)}
                  onRemove={() => removeItem(item.productId, item.size, item.color)}
                />
              ))}
            </div>

            <div className="border-t border-sand px-4 py-4">
              <div className="mb-1 flex justify-between text-sm text-ink-soft">
                <span>جمع کالا</span>
                <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="mb-3 flex justify-between text-sm text-ink-soft">
                <span>ارسال</span>
                <span className="font-medium text-ink">{shipping ? formatPrice(shipping) : "رایگان"}</span>
              </div>
              <div className="mb-4 flex justify-between border-t border-sand pt-3">
                <span className="font-semibold">قابل پرداخت</span>
                <span className="text-lg font-semibold">{formatPrice(subtotal + shipping)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={closeCart} className="btn btn-outline">
                  سبد کامل
                </Link>
                <Link href="/checkout" onClick={closeCart} className="btn btn-primary">
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
