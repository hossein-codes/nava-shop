"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AccountDropdown from "./AccountDropdown";
import MegaMenu from "./MegaMenu";
import { CartIcon, HeartIcon, PhoneIcon, SearchIcon } from "./Icons";

export default function Header() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { openCart, openSearch } = useUi();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="hidden border-b border-sand/60 bg-ink text-ivory lg:block">
        <div className="container-x flex h-8 items-center justify-between text-[11px] font-medium">
          <p>ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان</p>
          <a href="tel:02191000000" className="inline-flex items-center gap-1.5 text-ivory/75 hover:text-white">
            <PhoneIcon width={12} height={12} />
            ۰۲۱-۹۱۰۰۰۰۰۰
          </a>
        </div>
      </div>

      {/* دسکتاپ: لوگو | سرچ جمع‌وجور | اکشن‌ها */}
      <div className="hidden border-b border-sand/70 lg:block">
        <div className="container-x flex h-16 items-center gap-8">
          <Logo />
          <SearchBox />
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <AccountDropdown />
            <Link
              href="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-[#f6f4f0]"
            >
              <HeartIcon width={20} height={20} />
              {ids.length > 0 && (
                <span className="absolute top-1.5 end-1.5 h-1.5 w-1.5 rounded-full bg-clay" />
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-[#f6f4f0]"
            >
              <CartIcon width={20} height={20} />
              {count > 0 && (
                <span className="absolute top-1 end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-white">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav className="border-t border-sand/60">
          <MegaMenu />
        </nav>
      </div>

      {/* موبایل: ردیف ۱ لوگو وسط + قلب و سبد — ردیف ۲ سرچ */}
      <div className="border-b border-sand/70 lg:hidden">
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-3">
          <span />
          <Logo />
          <div className="flex items-center justify-end gap-0.5">
            <Link
              href="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <HeartIcon width={20} height={20} />
              {ids.length > 0 && (
                <span className="absolute top-2 end-2 h-1.5 w-1.5 rounded-full bg-clay" />
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <CartIcon width={20} height={20} />
              {count > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={openSearch}
            className="flex h-11 w-full items-center gap-2 rounded-full bg-[#f6f4f0] px-4 text-start text-[13px] text-ink-soft"
          >
            <SearchIcon width={18} height={18} />
            جستجو در نوا…
          </button>
        </div>
      </div>
    </header>
  );
}
