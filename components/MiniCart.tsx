"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import QuantityPicker from "./QuantityPicker";
import { CartIcon, TrashIcon } from "./Icons";

export default function MiniCart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { cartOpen, closeCart } = useUi();
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!cartOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="بستن سبد"
        className="fixed inset-0 z-40 cursor-default bg-transparent"
        onClick={closeCart}
      />
      <div
        role="dialog"
        aria-label="سبد خرید"
        className="animate-dropdown absolute end-0 top-[calc(100%+0.45rem)] z-50 w-[min(21rem,calc(100vw-1.25rem))] overflow-hidden rounded-2xl border border-[#ece8e2] bg-white shadow-[0_16px_40px_rgb(26_24_22_/_0.14)]"
      >
        <div className="border-b border-[#ece8e2] px-4 py-2.5">
          <p className="text-sm font-semibold">
            سبد شما
            {items.length > 0 && (
              <span className="ms-1.5 text-xs font-normal text-ink/45">
                {items.reduce((n, i) => n + i.quantity, 0).toLocaleString("fa-IR")} کالا
              </span>
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="px-4 py-7 text-center">
            <CartIcon width={22} height={22} className="mx-auto text-ink/30" />
            <p className="mt-2 text-sm">هنوز چیزی انتخاب نکرده‌اید</p>
            <button type="button" onClick={closeCart} className="mt-3 text-xs font-semibold text-[#C45C26]">
              ادامه خرید
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-[#ece8e2] px-4 py-2">
              <p className="text-[11px] text-ink/55">
                {remainingForFree > 0 ? (
                  <>
                    {formatPrice(remainingForFree)} تا ارسال رایگان
                  </>
                ) : (
                  "ارسال این سفارش رایگان است"
                )}
              </p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#ece8e2]">
                <div className="h-full bg-[#C45C26] transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="max-h-56 divide-y divide-[#f3efe9] overflow-y-auto">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 px-4 py-3">
                    <Link href={`/products/${product.slug}`} onClick={closeCart} className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f3efe9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeCart}
                          className="line-clamp-1 text-[13px] font-medium leading-5"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          aria-label="حذف"
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center text-ink/35 hover:text-[#C45C26]"
                        >
                          <TrashIcon width={14} height={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-ink/45">
                        {item.size} · {item.color}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantityPicker
                          size="xs"
                          value={item.quantity}
                          onChange={(q) => {
                            if (q < 1) removeItem(item.productId, item.size, item.color);
                            else updateQuantity(item.productId, item.size, item.color, q);
                          }}
                          min={0}
                        />
                        <span className="text-[13px] font-semibold">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[#ece8e2] px-4 py-3">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-ink/50">قابل پرداخت</span>
                <span className="font-bold">{formatPrice(subtotal + shipping)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white"
              >
                تسویه حساب
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 flex h-9 w-full items-center justify-center text-xs font-medium text-ink/55 hover:text-ink"
              >
                مشاهده سبد کامل
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
