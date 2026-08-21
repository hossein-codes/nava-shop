"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { cn } from "@/lib/utils";
import {
  HeartIcon,
  LogoutIcon,
  MapPinIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "./Icons";

const menuItems = [
  { href: "/account", icon: UserIcon, label: "حساب کاربری" },
  { href: "/account", icon: PackageIcon, label: "سفارش‌های من" },
  { href: "/account", icon: PackageIcon, label: "پیگیری سفارش" },
  { href: "/wishlist", icon: HeartIcon, label: "علاقه‌مندی‌ها" },
  { href: "/account", icon: MapPinIcon, label: "آدرس‌ها" },
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

  if (!user) {
    return (
      <Link
        href="/login"
        className="hidden h-10 items-center rounded-full px-3 text-[13px] font-medium text-ink transition hover:bg-[#f6f4f0] lg:inline-flex"
      >
        ورود / ثبت‌نام
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative hidden shrink-0 lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="حساب کاربری"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition duration-150",
          open ? "bg-ink text-white" : "text-ink hover:bg-[#f6f4f0]"
        )}
      >
        <UserIcon width={20} height={20} />
      </button>

      {open && (
        <div className="animate-dropdown absolute end-0 top-[calc(100%+0.55rem)] z-50 w-64 overflow-hidden rounded-2xl border border-sand bg-white shadow-[0_16px_48px_rgb(26_24_22_/_0.12)]">
          <div className="border-b border-sand px-4 py-3">
            <p className="text-sm font-medium text-ink">سلام، {user.name}</p>
            <p className="mt-0.5 truncate text-xs text-ink-soft" dir="ltr">
              {user.email}
            </p>
          </div>
          <div className="p-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-ink hover:bg-[#f6f4f0]"
              >
                <item.icon width={17} height={17} className="text-ink-soft" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-sand p-1.5">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-sale hover:bg-red-50"
            >
              <LogoutIcon width={17} height={17} />
              خروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
