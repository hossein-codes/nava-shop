/**
 * تایپ‌های فروشگاه زیبایی نوا
 */

export type CategoryId =
  | "skincare"
  | "makeup"
  | "eyes"
  | "lips"
  | "hair"
  | "fragrance"
  | "sun"
  | "natural";

export type ConcernId = "dry" | "oily" | "spots" | "acne" | "sensitive" | "aging";

export interface Category {
  id: CategoryId;
  name: string;
  subtitle: string;
  image: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  details: string[];
  howTo: string[];
  sizes: string[];
  colors: ProductColor[];
  variantLabel: string;
  optionLabel: string;
  concerns: ConcernId[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured?: boolean;
  staffPick?: boolean;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

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
  date: string;
}
