"use client";

/**
 * ناحیه حساب کاربری:
 * - لاگین‌نشده: دکمه «ورود | ثبت‌نام»
 * - لاگین‌شده: آواتار با حرف اول نام + دراپ‌داون
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  HeartIcon,
  LogoutIcon,
  MapPinIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "./Icons";

const menuItems = [
  { href: "/account", icon: PackageIcon, label: "سفارش‌های من" },
  { href: "/account", icon: MapPinIcon, label: "آدرس‌های من" },
  { href: "/wishlist", icon: HeartIcon, label: "علاقه‌مندی‌ها" },
  { href: "/account", icon: SettingsIcon, label: "تنظیمات حساب" },
];

export default function AccountDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ---------- کاربر وارد نشده ---------- */
  if (!user) {
    return (
      <Link
        href="/login"
        className="flex h-11 shrink-0 items-center gap-2 rounded-2xl border-2 border-ink bg-white px-4 text-sm font-black text-ink transition hover:bg-ink hover:text-white"
      >
        <UserIcon width={18} height={18} />
        <span className="hidden sm:inline">ورود | ثبت‌نام</span>
        <span className="sm:hidden">ورود</span>
      </Link>
    );
  }

  /* ---------- کاربر وارد شده ---------- */
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="حساب کاربری"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border-2 text-base font-black transition-all duration-200",
          open
            ? "border-clay bg-clay text-white"
            : "border-ink bg-ink text-white hover:border-clay hover:bg-clay"
        )}
      >
        {user.name.charAt(0)}
      </button>

      {open && (
        <div className="animate-dropdown absolute end-0 top-[calc(100%+0.7rem)] z-50 w-64 overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-2xl shadow-ink/20">
          {/* سربرگ */}
          <div className="border-b border-sand/60 bg-ivory px-4 py-4">
            <p className="text-sm font-black text-ink">{user.name}</p>
            <p className="mt-1 truncate text-xs font-medium text-ink-soft" dir="ltr">
              {user.email}
            </p>
          </div>

          {/* آیتم‌ها */}
          <div className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold text-ink transition hover:bg-ivory"
              >
                <item.icon width={18} height={18} className="text-clay" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* خروج */}
          <div className="border-t border-sand/60 p-2">
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-50"
            >
              <LogoutIcon width={18} height={18} />
              خروج از حساب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
