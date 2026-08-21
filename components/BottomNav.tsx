"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/store/auth-context";
import { useUi } from "@/lib/store/ui-context";
import { cn } from "@/lib/utils";
import { GridIcon, HeartIcon, HomeIcon, SearchIcon, UserIcon } from "./Icons";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openSearch, openCategory, searchOpen, categoryOpen } = useUi();

  const hide =
    pathname.startsWith("/checkout") || /^\/products\/[^/]+$/.test(pathname);
  if (hide) return null;

  const itemCls =
    "relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] tracking-wide transition-colors duration-150";

  const active = "text-ink";
  const idle = "text-ink/40";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eee] bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-[3.25rem] items-stretch">
        <Link href="/" className={cn(itemCls, pathname === "/" && !searchOpen && !categoryOpen ? active : idle)}>
          <HomeIcon width={20} height={20} strokeWidth={1.6} />
          خانه
        </Link>
        <button type="button" onClick={openCategory} className={cn(itemCls, categoryOpen ? active : idle)}>
          <GridIcon width={20} height={20} strokeWidth={1.6} />
          دسته‌ها
        </button>
        <button type="button" onClick={openSearch} className={cn(itemCls, searchOpen ? active : idle)}>
          <SearchIcon width={20} height={20} strokeWidth={1.6} />
          جستجو
        </button>
        <Link href="/wishlist" className={cn(itemCls, pathname.startsWith("/wishlist") ? active : idle)}>
          <HeartIcon width={20} height={20} strokeWidth={1.6} />
          علاقه‌مندی
        </Link>
        <Link
          href={user ? "/account" : "/login"}
          className={cn(
            itemCls,
            pathname.startsWith("/account") || pathname.startsWith("/login") ? active : idle
          )}
        >
          <UserIcon width={20} height={20} strokeWidth={1.6} />
          حساب
        </Link>
      </div>
    </nav>
  );
}
