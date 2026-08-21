"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AccountDropdown from "./AccountDropdown";
import MegaMenu from "./MegaMenu";
import { CartIcon, HeartIcon, SearchIcon } from "./Icons";

export default function Header() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { openCart, openSearch } = useUi();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <p className="hidden border-b border-[#eee] py-1.5 text-center text-[11px] tracking-wide text-ink/45 lg:block">
        ارسال رایگان برای سفارش بالای ۲ میلیون تومان
      </p>

      <div className="hidden lg:block">
        <div className="container-x flex h-[4.5rem] items-center gap-10">
          <Logo />
          <SearchBox />
          <div className="flex-1" />
          <div className="flex items-center gap-5">
            <AccountDropdown />
            <Link
              href="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative flex h-9 w-9 items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <HeartIcon width={18} height={18} strokeWidth={1.6} />
              {ids.length > 0 && (
                <span className="absolute top-1 end-1 h-1 w-1 rounded-full bg-ink" />
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-9 w-9 items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <CartIcon width={18} height={18} strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center text-[10px] font-medium leading-none">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav className="border-t border-[#eee]">
          <MegaMenu />
        </nav>
      </div>

      <div className="lg:hidden">
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4">
          <span />
          <Logo />
          <div className="flex items-center justify-end gap-1">
            <Link href="/wishlist" aria-label="علاقه‌مندی‌ها" className="relative flex h-11 w-11 items-center justify-center">
              <HeartIcon width={19} height={19} strokeWidth={1.6} />
              {ids.length > 0 && <span className="absolute top-2.5 end-2.5 h-1 w-1 rounded-full bg-ink" />}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center"
            >
              <CartIcon width={19} height={19} strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute top-1.5 end-1.5 text-[10px] font-medium">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={openSearch}
            className="flex h-10 w-full items-center gap-2.5 border-b border-[#d8d3cc] text-start text-[13px] text-ink/40"
          >
            <SearchIcon width={16} height={16} strokeWidth={1.6} />
            جستجو در نوا
          </button>
        </div>
      </div>
    </header>
  );
}
