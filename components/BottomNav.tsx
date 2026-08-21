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
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-medium transition-colors duration-150";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-white/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-14 items-stretch">
        <Link href="/" className={cn(itemCls, pathname === "/" && !searchOpen && !categoryOpen ? "text-ink" : "text-ink-soft")}>
          <HomeIcon width={22} height={22} />
          خانه
        </Link>
        <button
          type="button"
          onClick={openCategory}
          className={cn(itemCls, categoryOpen ? "text-ink" : "text-ink-soft")}
        >
          <GridIcon width={22} height={22} />
          دسته‌بندی
        </button>
        <button
          type="button"
          onClick={openSearch}
          className={cn(itemCls, searchOpen ? "text-ink" : "text-ink-soft")}
        >
          <SearchIcon width={22} height={22} />
          جستجو
        </button>
        <Link
          href="/wishlist"
          className={cn(itemCls, pathname.startsWith("/wishlist") ? "text-ink" : "text-ink-soft")}
        >
          <HeartIcon width={22} height={22} />
          علاقه‌مندی
        </Link>
        <Link
          href={user ? "/account" : "/login"}
          className={cn(
            itemCls,
            pathname.startsWith("/account") || pathname.startsWith("/login") ? "text-ink" : "text-ink-soft"
          )}
        >
          <UserIcon width={22} height={22} />
          حساب کاربری
        </Link>
      </div>
    </nav>
  );
}
