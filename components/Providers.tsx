"use client";

/** ترکیب تمام Provider ها در یک مکان */
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/store/auth-context";
import { CartProvider } from "@/lib/store/cart-context";
import { WishlistProvider } from "@/lib/store/wishlist-context";
import { UiProvider } from "@/lib/store/ui-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <UiProvider>{children}</UiProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
