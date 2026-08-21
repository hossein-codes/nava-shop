"use client";

/** صفحه موفقیت سفارش — اطلاعات سفارش از localStorage خوانده می‌شود */
import Link from "next/link";
import { useMemo } from "react";
import type { Order } from "@/lib/types";
import { formatPersianDate, formatPrice } from "@/lib/utils";
import { CheckIcon, PackageIcon, PhoneIcon } from "@/components/Icons";

const statusStyles: Record<string, string> = {
  "پرداخت شده": "bg-emerald-100 text-emerald-700",
  "در انتظار پرداخت": "bg-amber-100 text-amber-700",
  "در حال ارسال": "bg-sky-100 text-sky-700",
  "تحویل شده": "bg-sand text-ink-soft",
};

export default function OrderSuccess({ orderId }: { orderId: string }) {
  const order = useMemo<Order | null>(() => {
    if (!orderId) return null;
    try {
      const raw = localStorage.getItem("nava:orders");
      if (!raw) return null;
      const orders: Order[] = JSON.parse(raw);
      return orders.find((o) => o.id === orderId) ?? null;
    } catch {
      return null;
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-x mt-10 flex flex-col items-center justify-center py-20 text-center">
        <h1 className="mt-5 text-2xl font-semibold">سفارشی یافت نشد</h1>
        <p className="mt-2 max-w-sm text-sm leading-7 text-ink-soft">
          امکان پیدا کردن این سفارش وجود ندارد. لطفاً از طریق حساب کاربری یا تماس با پشتیبانی،
          سفارش خود را پیگیری کنید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn btn-primary">ادامه خرید</Link>
          <Link href="/account" className="btn btn-outline">حساب کاربری</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x mt-8 max-w-3xl">
      {/* موفقیت */}
      <div className="rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage/15 text-sage">
          <CheckIcon width={40} height={40} strokeWidth={2.5} />
        </span>
        <h1 className="mt-5 text-2xl font-black sm:text-3xl">سفارش شما با موفقیت ثبت شد! 🎉</h1>
        <p className="mt-2 text-sm leading-7 text-ink-soft">
          از خرید شما از فروشگاه نوا سپاسگزاریم. جزئیات سفارش برایتان ارسال شد.
        </p>
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm">
          <span className="text-ink-soft">شماره سفارش:</span>
          <b dir="ltr">{order.id}</b>
          <span className="text-ink-soft">|</span>
          <span className="text-ink-soft">تاریخ:</span>
          <b>{formatPersianDate(order.date)}</b>
        </div>
        <span
          className={`mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${statusStyles[order.status] || statusStyles["پرداخت شده"]}`}
        >
          {order.status}
        </span>
      </div>

      {/* اقلام */}
      <div className="mt-6 rounded-3xl border border-sand/60 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold">
          <PackageIcon width={20} height={20} className="text-clay" />
          اقلام سفارش
        </h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-13 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{item.name}</p>
                <p className="text-xs text-ink-soft">
                  {item.size} / {item.color} × {item.quantity.toLocaleString("fa-IR")}
                </p>
              </div>
              <span className="text-sm font-extrabold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-dashed border-sand pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-soft">جمع کالاها</span>
            <span className="font-bold">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-soft">هزینه ارسال</span>
            <span className="font-bold">
              {order.shipping === 0 ? "رایگان" : formatPrice(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-dashed border-sand pt-3 text-base">
            <span className="font-extrabold">مبلغ قابل پرداخت</span>
            <span className="font-black text-clay">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* آدرس */}
      <div className="mt-6 rounded-3xl border border-sand/60 bg-white p-6">
        <h2 className="mb-3 text-base font-extrabold">اطلاعات ارسال</h2>
        <p className="text-sm leading-7 text-ink-soft">
          <b>{order.customer.name}</b> — {order.customer.phone}
          <br />
          {order.customer.province}، {order.customer.city}
          <br />
          {order.customer.address} — کد پستی: {order.customer.postalCode}
          <br />
          روش پرداخت: <b>{order.paymentMethod === "online" ? "پرداخت آنلاین" : order.paymentMethod === "cod" ? "پرداخت در محل" : "کارت به کارت"}</b>
        </p>
      </div>

      {/* اقدامات بعدی */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/account" className="btn btn-primary">
          پیگیری سفارش در حساب کاربری
        </Link>
        <Link href="/products" className="btn btn-outline">
          ادامه خرید
        </Link>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-ink-soft">
        <PhoneIcon width={14} height={14} />
        سوالی دارید؟ با پشتیبانی نوا تماس بگیرید: ۰۲۱-۹۱۰۰۰۰۰۰
      </p>
    </div>
  );
}
