"use client";

/** مدیریت state ساده‌ی UI (باز/بسته بودن سبد خرید) */
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface UiContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <UiContext.Provider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </UiContext.Provider>
  );
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi باید داخل UiProvider استفاده شود");
  return ctx;
}
