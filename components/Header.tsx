"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AccountDropdown from "./AccountDropdown";
import MegaMenu from "./MegaMenu";
import MiniCart from "./MiniCart";
import { CartIcon, HeartIcon, SearchIcon } from "./Icons";

function useSmartHide() {
  const [pinned, setPinned] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 72) {
        setPinned(true);
        lastY.current = y;
        return;
      }
      if (y > lastY.current + 8) setPinned(false);
      else if (y < lastY.current - 8) setPinned(true);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { pinned, scrolled };
}

function CartTrigger() {
  const { count } = useCart();
  const { cartOpen, openCart, closeCart } = useUi();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (cartOpen ? closeCart() : openCart())}
        aria-label="سبد خرید"
        aria-expanded={cartOpen}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream"
      >
        <CartIcon width={22} height={22} />
        {count > 0 && (
          <span className="absolute -top-0.5 -end-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-bold text-white">
            {count.toLocaleString("fa-IR")}
          </span>
        )}
      </button>
      <MiniCart />
    </div>
  );
}

export default function Header() {
  const { ids } = useWishlist();
  const { openSearch } = useUi();
  const { pinned, scrolled } = useSmartHide();
  const [dim, setDim] = useState(false);

  return (
    <>
      {dim && (
        <div className="fixed inset-0 z-[35] bg-ink/25 backdrop-blur-[2px] transition-opacity" />
      )}
    <header
      className={cn(
        "sticky top-0 z-40 bg-ivory transition-shadow duration-300",
        scrolled ? "shadow-[0_8px_24px_rgb(28_20_16_/_0.08)]" : ""
      )}
    >
      <div className="brand-bar" />
      <div
        className={cn(
          "hidden overflow-hidden bg-ink transition-[max-height,opacity] duration-300 lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"
        )}
      >
        <div className="container-x flex h-8 items-center justify-between text-[11px] text-white/80">
          <p>ارسال رایگان سفارش‌های بالای ۱٫۲ میلیون · مشاوره روتین پوست</p>
          <div className="flex items-center gap-5">
            <Link href="/account" className="hover:text-white">
              پیگیری سفارش
            </Link>
            <a href="tel:02191000000" className="hover:text-white">
              پشتیبانی ۰۲۱-۹۱۰۰۰۰۰۰
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="container-x flex h-[4.75rem] items-center gap-6">
          <Logo />
          <SearchBox />
          <div className="ms-auto flex items-center gap-1">
            <AccountDropdown />
            <Link
              href="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream"
            >
              <HeartIcon width={22} height={22} />
              {ids.length > 0 && (
                <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-clay" />
              )}
            </Link>
            <CartTrigger />
          </div>
        </div>

        <div
          className={cn(
            "border-t border-sand bg-cream/80 transition-[max-height,opacity] duration-300 ease-out",
            pinned ? "max-h-14 opacity-100" : "max-h-0 overflow-hidden opacity-0"
          )}
        >
          <MegaMenu onOpenChange={setDim} />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center">
            <Link href="/wishlist" aria-label="علاقه‌مندی‌ها" className="relative flex h-11 w-11 items-center justify-center">
              <HeartIcon width={22} height={22} />
              {ids.length > 0 && (
                <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-clay" />
              )}
            </Link>
            <CartTrigger />
          </div>
        </div>
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            pinned ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pb-3">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-12 w-full items-center gap-3 rounded-xl border border-sand bg-cream px-4 text-start text-sm text-ink/50"
            >
              <SearchIcon width={20} height={20} className="text-ink/70" />
              جستجو در فروشگاه نوا
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
