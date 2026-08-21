"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "./CartItem";
import { CartIcon } from "./Icons";

export default function MiniCart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { cartOpen, closeCart } = useUi();
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;

  if (!cartOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="بستن سبد"
        className="fixed inset-0 z-40 cursor-default bg-transparent"
        onClick={closeCart}
      />
      <div className="animate-dropdown absolute end-0 top-[calc(100%+0.45rem)] z-50 w-[min(22.5rem,calc(100vw-1.25rem))] overflow-hidden rounded-2xl border border-[#ece8e2] bg-white shadow-[0_16px_40px_rgb(26_24_22_/_0.14)]">
        <div className="flex items-center justify-between border-b border-[#ece8e2] px-4 py-3">
          <p className="text-sm font-semibold">
            سبد خرید
            {items.length > 0 && (
              <span className="ms-2 text-xs font-normal text-ink/45">
                {items.length.toLocaleString("fa-IR")} قلم
              </span>
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3efe9] text-ink/40">
              <CartIcon width={22} height={22} />
            </span>
            <p className="mt-3 text-sm font-medium">سبد خالی است</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-4 inline-flex h-10 items-center rounded-xl bg-ink px-4 text-xs font-semibold text-white"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-64 space-y-3 overflow-y-auto px-3 py-3">
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
            <div className="border-t border-[#ece8e2] px-4 py-3">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-ink/50">قابل پرداخت</span>
                <span className="font-bold">{formatPrice(subtotal + shipping)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex h-10 items-center justify-center rounded-xl border border-ink text-xs font-semibold"
                >
                  سبد کامل
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex h-10 items-center justify-center rounded-xl bg-ink text-xs font-semibold text-white"
                >
                  تسویه
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
