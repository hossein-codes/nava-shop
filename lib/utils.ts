/**
 * توابع کمکی عمومی
 */

/** ترکیب شرطی کلاس‌های CSS */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** تبدیل عدد به قیمت فارسی (با جداکننده هزارگان و ارقام فارسی) */
export function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

/** تبدیل عدد به ارقام فارسی بدون واحد */
export function toPersianDigits(value: number | string): string {
  return Number(value).toLocaleString("fa-IR");
}

/** درصد تخفیف بین قیمت قبلی و فعلی */
export function discountPercent(product: {
  price: number;
  oldPrice?: number;
}): number | null {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

/** تاریخ شمسی خوانا از رشته ISO */
export function formatPersianDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/** بررسی اعتبار موبایل ایرانی */
export function isValidPhone(phone: string): boolean {
  return /^09\d{9}$/.test(phone.replace(/\s/g, ""));
}

/** بررسی اعتبار کد پستی (۱۰ رقم) */
export function isValidPostalCode(code: string): boolean {
  return /^\d{10}$/.test(code.replace(/\s/g, ""));
}

/** بررسی اعتبار ایمیل ساده */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
