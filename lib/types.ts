/**
 * تعریف تایپ‌های اصلی پروژه
 * همه‌ی داده‌ها (محصولات، کاربران، سفارش‌ها) بر پایه‌ی همین تایپ‌ها ساخته می‌شوند.
 */

export type CategoryId = "women" | "men" | "kids" | "accessories";

export interface Category {
  id: CategoryId;
  name: string;
  subtitle: string;
  image: string;
}

/** یک رنگ قابل انتخاب برای محصول */
export interface ProductColor {
  name: string;
  hex: string;
}

/** یک دیدگاه ثبت‌شده برای محصول */
export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

/** مدل کامل محصول */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number; // قیمت به تومان
  oldPrice?: number; // قیمت قبل از تخفیف
  images: string[];
  description: string;
  details: string[]; // ویژگی‌های کلیدی
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[]; // «جدید» | «پرفروش» | «تخفیف» | «کم‌موجود»
  featured?: boolean;
}

/** یک آیتم داخل سبد خرید */
export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

/** کاربر ثبت‌نام‌شده (شبیه‌سازی شده در localStorage) */
export interface User {
  name: string;
  email: string;
  password: string;
}

/** سفارش ثبت‌شده */
export interface Order {
  id: string;
  userEmail?: string;
  items: {
    productId: string;
    name: string;
    image: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
  paymentMethod: string;
  status: string;
  date: string; // ISO
}
