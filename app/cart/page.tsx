"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "@/components/CartItem";
import EmptyState from "@/components/EmptyState";
import { ArrowIcon, CartIcon, TruckIcon } from "@/components/Icons";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x mt-8">
        <EmptyState
          icon={<CartIcon width={36} height={36} />}
          title="سبد خرید خالی است"
          text="هنوز محصولی اضافه نشده. از کالکشن جدید دیدن کنید."
          action={
            <Link href="/products" className="btn btn-primary">
              مشاهده محصولات
              <ArrowIcon width={16} height={16} />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-x mt-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="hover:text-ink">خانه</Link>
        <span>/</span>
        <span className="text-ink">سبد خرید</span>
      </nav>

      <h1 className="mb-6 text-2xl font-semibold">سبد خرید</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow
              key={`${item.productId}-${item.size}-${item.color}`}
              item={item}
              onQty={(q) => updateQuantity(item.productId, item.size, item.color, q)}
              onRemove={() => removeItem(item.productId, item.size, item.color)}
            />
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-sand bg-white p-6 lg:sticky lg:top-28">
          <h2 className="mb-4 text-base font-semibold">خلاصه سفارش</h2>
          <div className="mb-4 rounded-xl bg-ivory p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-ink-soft">
              <TruckIcon width={16} height={16} />
              {remainingForFree > 0 ? (
                <>
                  تا ارسال رایگان <b className="text-ink">{formatPrice(remainingForFree)}</b>
                </>
              ) : (
                <b className="text-sage">ارسال رایگان شد</b>
              )}
            </p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-sand">
              <div
                className="h-full bg-ink"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>
          <div className="space-y-2.5 border-b border-sand pb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">جمع کالاها</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">ارسال</span>
              <span className="font-medium">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="font-semibold">قابل پرداخت</span>
            <span className="text-lg font-semibold">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary mt-5 w-full">
            ادامه خرید
            <ArrowIcon width={16} height={16} />
          </Link>
          <Link href="/products" className="mt-3 block text-center text-xs font-medium text-ink-soft hover:text-ink">
            بازگشت به فروشگاه
          </Link>
        </aside>
      </div>
    </div>
  );
}
