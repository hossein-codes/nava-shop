"use client";

/** صفحه تسویه حساب: اطلاعات ارسال + روش پرداخت + ثبت سفارش */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { useCart } from "@/lib/store/cart-context";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, getProductById } from "@/lib/products";
import type { Order } from "@/lib/types";
import { cn, formatPrice, isValidPhone, isValidPostalCode } from "@/lib/utils";
import {
  ArrowIcon,
  BankIcon,
  CheckIcon,
  CreditCardIcon,
  TruckIcon,
  WalletIcon,
} from "@/components/Icons";

const provinces = [
  "تهران", "البرز", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "آذربایجان غربی",
  "مازندران", "گیلان", "خوزستان", "قم", "کرمان", "یزد", "همدان", "کرمانشاه", "سمنان",
  "گلستان", "زنجان", "اردبیل", "کردستان", "لرستان", "هرمزگان", "بوشهر", "چهارمحال و بختیاری",
  "مرکزی", "قزوین", "سیستان و بلوچستان", "ایلام", "کهگیلویه و بویراحمد", "خراسان شمالی",
  "خراسان جنوبی", "دماوند",
];

const paymentMethods = [
  {
    id: "online",
    title: "پرداخت آنلاین (درگاه آزمایشی)",
    desc: "پرداخت امن با تمام کارت‌های بانکی عضو شتاب",
    icon: CreditCardIcon,
  },
  {
    id: "cod",
    title: "پرداخت در محل",
    desc: "هنگام تحویل سفارش، وجه را به مأمور پست پرداخت کنید",
    icon: TruckIcon,
  },
  {
    id: "cart",
    title: "کارت به کارت",
    desc: "واریز به شماره کارت و ارسال تصویر رسید",
    icon: BankIcon,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    note: "",
  });
  const [payment, setPayment] = useState("online");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "gateway" | "processing">("form");

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = remainingForFree > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "نام و نام خانوادگی را کامل وارد کنید.";
    if (!isValidPhone(form.phone)) e.phone = "شماره موبایل معتبر وارد کنید (مثال: 09123456789).";
    if (!form.province) e.province = "استان را انتخاب کنید.";
    if (!form.city.trim()) e.city = "شهر را وارد کنید.";
    if (form.address.trim().length < 10) e.address = "آدرس کامل را وارد کنید (حداقل ۱۰ کاراکتر).";
    if (!isValidPostalCode(form.postalCode)) e.postalCode = "کد پستی ۱۰ رقمی وارد کنید.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /** ساخت سفارش و ذخیره در localStorage؛ شناسه سفارش را برمی‌گرداند */
  const placeOrder = (): string => {
    const orderId = `NVA-${Date.now().toString().slice(-8)}`;
    const order: Order = {
      id: orderId,
      userEmail: user?.email,
      items: items.map((item) => {
        const product = getProductById(item.productId)!;
        return {
          productId: item.productId,
          name: product.name,
          image: product.images[0],
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: product.price,
        };
      }),
      subtotal,
      shipping,
      total,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        province: form.province,
        city: form.city.trim(),
        address: form.address.trim(),
        postalCode: form.postalCode.trim(),
      },
      paymentMethod: payment,
      status: payment === "online" ? "پرداخت شده" : "در انتظار پرداخت",
      date: new Date().toISOString(),
    };

    const raw = localStorage.getItem("nava:orders");
    const orders: Order[] = raw ? JSON.parse(raw) : [];
    orders.push(order);
    localStorage.setItem("nava:orders", JSON.stringify(orders));
    return orderId;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (payment === "online") {
      setStep("gateway"); // نمایش درگاه آزمایشی
    } else {
      const id = placeOrder();
      clearCart();
      router.push(`/checkout/success?order=${id}`);
    }
  };

  const confirmGateway = () => {
    const id = placeOrder();
    setStep("processing");
    // شبیه‌سازی پردازش پرداخت
    setTimeout(() => {
      clearCart();
      router.push(`/checkout/success?order=${id}`);
    }, 2000);
  };

  if (items.length === 0 && step === "form") {
    return (
      <div className="container-x mt-10 flex flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-2xl">🛒</span>
        <h1 className="mt-5 text-2xl font-black">سبد خرید شما خالی است!</h1>
        <p className="mt-2 text-sm text-ink-soft">برای تسویه حساب، ابتدا محصولی به سبد اضافه کنید.</p>
        <Link href="/products" className="btn btn-primary mt-6">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x mt-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="transition hover:text-clay">خانه</Link>
        <span>/</span>
        <Link href="/cart" className="transition hover:text-clay">سبد خرید</Link>
        <span>/</span>
        <span className="font-bold text-ink">تسویه حساب</span>
      </nav>

      <h1 className="mb-8 text-2xl font-black sm:text-3xl">تسویه حساب</h1>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-3">
        {/* فرم اطلاعات */}
        <div className="space-y-6 lg:col-span-2">
          {/* اطلاعات گیرنده */}
          <section className="rounded-3xl border border-sand/60 bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs text-ivory">۱</span>
              اطلاعات گیرنده
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base">نام و نام خانوادگی *</label>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="مثلاً: علی محمدی"
                  className="input-base"
                />
                {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label-base">شماره موبایل *</label>
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="09123456789"
                  inputMode="tel"
                  dir="ltr"
                  className="input-base text-start"
                />
                {errors.phone && <p className="mt-1 text-xs font-bold text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </section>

          {/* آدرس ارسال */}
          <section className="rounded-3xl border border-sand/60 bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs text-ivory">۲</span>
              آدرس ارسال
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base">استان *</label>
                <select
                  value={form.province}
                  onChange={(e) => set("province", e.target.value)}
                  className="input-base"
                >
                  <option value="">انتخاب استان...</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.province && <p className="mt-1 text-xs font-bold text-red-600">{errors.province}</p>}
              </div>
              <div>
                <label className="label-base">شهر *</label>
                <input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="مثلاً: تهران"
                  className="input-base"
                />
                {errors.city && <p className="mt-1 text-xs font-bold text-red-600">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="label-base">آدرس کامل *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  rows={3}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  className="input-base resize-none"
                />
                {errors.address && <p className="mt-1 text-xs font-bold text-red-600">{errors.address}</p>}
              </div>
              <div>
                <label className="label-base">کد پستی *</label>
                <input
                  value={form.postalCode}
                  onChange={(e) => set("postalCode", e.target.value)}
                  placeholder="۱۰ رقم"
                  inputMode="numeric"
                  dir="ltr"
                  className="input-base text-start"
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs font-bold text-red-600">{errors.postalCode}</p>
                )}
              </div>
              <div>
                <label className="label-base">توضیحات (اختیاری)</label>
                <input
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  placeholder="مثلاً: تحویل عصر"
                  className="input-base"
                />
              </div>
            </div>
          </section>

          {/* روش پرداخت */}
          <section className="rounded-3xl border border-sand/60 bg-white p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs text-ivory">۳</span>
              روش پرداخت
            </h2>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3.5 rounded-2xl border-2 p-4 transition",
                    payment === m.id ? "border-clay bg-clay/5" : "border-sand hover:border-clay/40"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="mt-1 accent-clay"
                  />
                  <m.icon width={22} height={22} className={payment === m.id ? "text-clay" : "text-ink-soft"} />
                  <span>
                    <span className="block text-sm font-extrabold">{m.title}</span>
                    <span className="block text-xs text-ink-soft">{m.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {payment === "cart" && (
            <section className="rounded-3xl border border-clay/30 bg-clay/5 p-6 text-sm leading-7">
              <p className="font-extrabold text-clay">💳 مشخصات کارت برای واریز:</p>
              <p className="mt-2 font-mono font-bold" dir="ltr">
                6037-9971-2345-6789
              </p>
              <p className="text-xs text-ink-soft">به نام: فروشگاه پوشاک نوا</p>
              <p className="mt-2 text-xs text-ink-soft">
                پس از واریز، تصویر رسید را به واتس‌اپ پشتیبانی ارسال کنید تا سفارش شما ثبت شود.
              </p>
            </section>
          )}
        </div>

        {/* خلاصه سفارش */}
        <aside className="h-fit rounded-3xl border border-sand/60 bg-white p-6 lg:sticky lg:top-32">
          <h2 className="mb-4 text-lg font-extrabold">خلاصه سفارش</h2>
          <div className="max-h-64 space-y-3 overflow-y-auto pe-1">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-14 w-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold">{product.name}</p>
                    <p className="text-[11px] text-ink-soft">
                      {item.size} / {item.color} × {item.quantity.toLocaleString("fa-IR")}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold">
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-2 border-t border-dashed border-sand pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">جمع کالاها</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">هزینه ارسال</span>
              <span className="font-bold">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-extrabold">مبلغ قابل پرداخت</span>
              <span className="font-black text-clay">{formatPrice(total)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-clay mt-5 w-full">
            <WalletIcon width={18} height={18} />
            {payment === "online" ? "پرداخت و ثبت سفارش" : "ثبت سفارش"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-ink-soft">
            با ثبت سفارش، <b>قوانین فروشگاه</b> را می‌پذیرید. اطلاعات شما محرمانه می‌ماند.
          </p>
        </aside>
      </form>

      {/* ---------- درگاه پرداخت آزمایشی ---------- */}
      {step === "gateway" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage/15 text-sage">
              <CreditCardIcon width={30} height={30} />
            </span>
            <h3 className="text-lg font-black">درگاه پرداخت آزمایشی</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              این یک درگاه شبیه‌سازی‌شده برای نمونه‌کار است. با دکمه‌ی زیر، پرداخت را شبیه‌سازی
              کنید.
            </p>
            <div className="mt-5 space-y-2 rounded-2xl bg-ivory p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-soft">مبلغ پرداختی</span>
                <span className="font-black text-clay">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">شماره سفارش</span>
                <span className="font-bold" dir="ltr">NVA-TEST</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep("form")}
                className="btn btn-outline"
              >
                انصراف
              </button>
              <button onClick={confirmGateway} className="btn btn-clay">
                <CheckIcon width={18} height={18} />
                پرداخت موفق
              </button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-ink-soft">
              <ArrowIcon width={12} height={12} className="rotate-180" />
              در نسخه‌ی واقعی، درگاه‌هایی مثل زرین‌پال یا سامان به این بخش متصل می‌شوند
            </p>
          </div>
        </div>
      )}

      {/* ---------- پردازش ---------- */}
      {step === "processing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-sand border-t-clay" />
            <h3 className="text-lg font-black">در حال پردازش پرداخت...</h3>
            <p className="mt-2 text-sm text-ink-soft">لطفاً چند لحظه صبر کنید</p>
          </div>
        </div>
      )}
    </div>
  );
}
