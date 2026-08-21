"use client";

/**
 * Context سبد خرید
 * داده‌ها در localStorage مرورگر ذخیره می‌شوند (شبیه‌سازی یک بک‌اند ساده).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../types";
import { getProductById } from "../products";

const STORAGE_KEY = "nava:cart";

interface CartContextValue {
  items: CartItem[];
  /** تعداد کل اجناس (مجموع تعدادها) */
  count: number;
  /** جمع مبلغ بدون هزینه ارسال */
  subtotal: number;
  /** جمع مبلغ با احتساب تخفیف‌ها (قیمت‌ها از قبل با تخفیف هستند) */
  total: number;
  addItem: (productId: string, size?: string, color?: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // خواندن از localStorage بعد از mount (برای جلوگیری از مشکل hydration)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // ذخیره‌ی تغییرات
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addItem = useCallback(
    (productId: string, size?: string, color?: string, quantity = 1) => {
      setItems((prev) => {
        const product = getProductById(productId);
        const finalSize = size ?? product?.sizes[0] ?? "استاندارد";
        const finalColor = color ?? product?.colors[0]?.name ?? "پیش‌فرض";
        const existing = prev.find(
          (i) => i.productId === productId && i.size === finalSize && i.color === finalColor
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.size === finalSize && i.color === finalColor
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId, size: finalSize, color: finalColor, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback((productId: string) => {
    return items.some((i) => i.productId === productId);
  }, [items]);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) continue;
      c += item.quantity;
      s += product.price * item.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    total: subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
}
