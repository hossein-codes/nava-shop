"use client";

/**
 * سربرگ فروشگاه — ساختار تمیز و منظم:
 * ردیف ۱: نوار اطلاع‌رسانی
 * ردیف ۲: لوگو | جستجو | (سبد + حساب کاربری + منو موبایل)
 * ردیف ۳: مگامنو + لینک‌های اصلی + تخفیف‌ها
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/store/cart-context";
import { useAuth } from "@/lib/store/auth-context";
import { useUi } from "@/lib/store/ui-context";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AccountDropdown from "./AccountDropdown";
import MegaMenu from "./MegaMenu";
import { CartIcon, CloseIcon, MenuIcon, PhoneIcon, SparkleIcon } from "./Icons";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { openCart } = useUi();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      {/* ---------- ردیف ۱: نوار اطلاع‌رسانی ---------- */}
      <div className="bg-navy-dark text-ivory">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-xs font-semibold">
            <SparkleIcon width={13} height={13} className="text-clay-bright" />
            ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان
          </p>
          <div className="flex items-center gap-5 text-xs font-semibold text-ivory/80">
            <a
              href="tel:02191000000"
              className="hidden items-center gap-1.5 transition hover:text-clay-bright sm:flex"
            >
              <PhoneIcon width={13} height={13} />
              ۰۲۱-۹۱۰۰۰۰۰۰
            </a>
            <Link href="/account" className="hidden transition hover:text-clay-bright sm:block">
              پیگیری سفارش
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- ردیف ۲: اصلی ---------- */}
      <div className="border-b border-sand/60 bg-ivory">
        <div className="container-x flex h-16 items-center justify-between gap-5">
          {/* لوگو */}
          <Logo className="shrink-0" />

          {/* جستجو — دسکتاپ */}
          <SearchBox />

          {/* اکشن‌ها */}
          <div className="flex shrink-0 items-center gap-2">
            {/* سبد خرید */}
            <button
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink bg-white text-ink transition hover:border-clay hover:bg-clay hover:text-white"
            >
              <CartIcon width={21} height={21} />
              {count > 0 && (
                <span className="absolute -top-2 -end-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ivory bg-clay px-1 text-[10px] font-black leading-none text-white">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </button>

            {/* ورود / آواتار */}
            <AccountDropdown />

            {/* منوی موبایل */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="منو"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink bg-white text-ink transition hover:border-clay hover:bg-clay hover:text-white lg:hidden"
            >
              {mobileOpen ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
            </button>
          </div>
        </div>

        {/* جستجو — موبایل */}
        <div className="px-4 pb-3 lg:hidden">
          <SearchBox compact />
        </div>
      </div>

      {/* ---------- ردیف ۳: ناوبری ---------- */}
      <nav className="hidden border-b border-sand/60 bg-ivory lg:block">
        <div className="container-x flex h-12 items-center gap-1">
          <MegaMenu />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-bold transition",
                isActive(link.href)
                  ? "bg-ink text-white"
                  : "text-ink-soft hover:bg-cream hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/products?discount=1"
            className="ms-auto inline-flex items-center gap-1.5 rounded-xl bg-clay px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-clay-dark"
          >
            <SparkleIcon width={15} height={15} />
            تخفیف‌ها
          </Link>
        </div>
      </nav>

      {/* ---------- منوی موبایل ---------- */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 start-0 flex w-80 max-w-[88%] flex-col bg-ivory shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-sand/60 px-5 py-4">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="بستن"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-ink-soft transition hover:text-clay"
            >
              <CloseIcon width={18} height={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-bold transition",
                    isActive(link.href) ? "bg-ink text-white" : "text-ink-soft hover:bg-cream"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="mb-2 mt-5 px-4 text-xs font-black text-ink-soft">دسته‌بندی‌ها</p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-bold text-ink-soft transition hover:bg-cream"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              href="/products?discount=1"
              onClick={() => setMobileOpen(false)}
              className="mt-5 flex items-center gap-2 rounded-xl bg-clay px-4 py-3 text-sm font-black text-white"
            >
              <SparkleIcon width={16} height={16} />
              تخفیف‌های ویژه
            </Link>
          </div>

          <div className="border-t border-sand/60 p-4">
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-sm font-black text-white"
            >
              {user ? `حساب ${user.name}` : "ورود / ثبت‌نام"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
