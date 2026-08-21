"use client";

/** state سراسری پوسته: سبد، جستجو، دسته، پیش‌نمایش سریع، توست */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UiContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  categoryOpen: boolean;
  openCategory: () => void;
  closeCategory: () => void;
  quickViewId: string | null;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const closeAll = () => {
    setCartOpen(false);
    setSearchOpen(false);
    setCategoryOpen(false);
    setQuickViewId(null);
  };

  const openCart = useCallback(() => {
    setSearchOpen(false);
    setCategoryOpen(false);
    setQuickViewId(null);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const openSearch = useCallback(() => {
    setCartOpen(false);
    setCategoryOpen(false);
    setQuickViewId(null);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openCategory = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setQuickViewId(null);
    setCategoryOpen(true);
  }, []);
  const closeCategory = useCallback(() => setCategoryOpen(false), []);

  const openQuickView = useCallback((id: string) => {
    setCartOpen(false);
    setSearchOpen(false);
    setCategoryOpen(false);
    setQuickViewId(id);
  }, []);
  const closeQuickView = useCallback(() => setQuickViewId(null), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const locked = searchOpen || categoryOpen || Boolean(quickViewId);
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, categoryOpen, quickViewId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <UiContext.Provider
      value={{
        cartOpen,
        openCart,
        closeCart,
        searchOpen,
        openSearch,
        closeSearch,
        categoryOpen,
        openCategory,
        closeCategory,
        quickViewId,
        openQuickView,
        closeQuickView,
        toast,
        showToast,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi باید داخل UiProvider استفاده شود");
  return ctx;
}
