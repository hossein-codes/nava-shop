"use client";

/** حساب کاربری: مشخصات + سفارش‌ها */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/store/auth-context";
import type { Order } from "@/lib/types";
import { formatPersianDate, formatPrice } from "@/lib/utils";
import { HeartIcon, LogoutIcon, PackageIcon, ShoppingBagIcon } from "@/components/Icons";

const statusStyles: Record<string, string> = {
  "پرداخت شده": "bg-emerald-100 text-emerald-700",
  "در انتظار پرداخت": "bg-amber-100 text-amber-700",
  "در حال ارسال": "bg-sky-100 text-sky-700",
  "تحویل شده": "bg-sand text-ink-soft",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  // بارگذاری سفارش‌های کاربر
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem("nava:orders");
      if (raw) {
        const all: Order[] = JSON.parse(raw);
        setOrders(all.filter((o) => o.userEmail === user.email).reverse());
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, [user]);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!user || !ready) {
    return (
      <div className="container-x flex justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sand border-t-clay" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container-x mt-8">
      {/* سربرگ */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sand/60 bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-xl font-black text-ivory">
            {user.name.charAt(0)}
          </span>
          <div>
            <p className="text-xs text-ink-soft">خوش آمدید 👋</p>
            <h1 className="text-xl font-black">{user.name}</h1>
            <p className="text-sm text-ink-soft" dir="ltr">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/wishlist" className="btn btn-outline text-sm">
            <HeartIcon width={17} height={17} />
            علاقه‌مندی‌ها
          </Link>
          <button onClick={handleLogout} className="btn btn-outline text-sm !border-red-200 text-red-600 hover:!bg-red-600 hover:!text-white hover:!border-red-600">
            <LogoutIcon width={17} height={17} />
            خروج
          </button>
        </div>
      </div>

      {/* سفارش‌ها */}
      <div className="rounded-3xl border border-sand/60 bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold">
          <PackageIcon width={22} height={22} className="text-clay" />
          سفارش‌های من
          <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-bold text-ink-soft">
            {orders.length.toLocaleString("fa-IR")} سفارش
          </span>
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-ink-soft">
              <ShoppingBagIcon width={30} height={30} />
            </span>
            <p className="mt-4 font-extrabold">هنوز سفارشی ثبت نکرده‌اید</p>
            <p className="mt-1 text-sm text-ink-soft">اولین خرید خود را از نوا تجربه کنید.</p>
            <Link href="/products" className="btn btn-primary mt-5">
              شروع خرید
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-sand/60 bg-ivory/50 p-5"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-black" dir="ltr">{order.id}</span>
                    <span className="text-xs text-ink-soft">{formatPersianDate(order.date)}</span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status] || "bg-sand text-ink-soft"}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 4).map((item, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-10 rounded-lg border-2 border-white object-cover"
                      />
                    ))}
                    {order.items.length > 4 && (
                      <span className="flex h-12 w-10 items-center justify-center rounded-lg border-2 border-white bg-sand text-xs font-bold">
                        +{ (order.items.length - 4).toLocaleString("fa-IR") }
                      </span>
                    )}
                  </div>
                  <div className="text-start sm:text-end">
                    <p className="text-xs text-ink-soft">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0).toLocaleString("fa-IR")} قلم
                    </p>
                    <p className="text-base font-black text-clay">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
