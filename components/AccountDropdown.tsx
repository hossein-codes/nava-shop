"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { cn } from "@/lib/utils";
import { LogoutIcon, UserIcon } from "./Icons";

const menuItems = [
  { href: "/account", label: "حساب کاربری" },
  { href: "/account", label: "سفارش‌های من" },
  { href: "/account", label: "پیگیری سفارش" },
  { href: "/wishlist", label: "علاقه‌مندی‌ها" },
  { href: "/account", label: "آدرس‌ها" },
  { href: "/account", label: "تنظیمات حساب" },
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
        className="hidden items-center text-[13px] font-medium tracking-wide text-ink/80 transition-colors hover:text-ink lg:inline-flex"
      >
        ورود / ثبت‌نام
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="حساب کاربری"
        aria-expanded={open}
        className={cn(
          "flex h-9 w-9 items-center justify-center text-ink/80 transition-colors hover:text-ink",
          open && "text-ink"
        )}
      >
        <UserIcon width={18} height={18} strokeWidth={1.6} />
      </button>

      {open && (
        <div className="animate-dropdown absolute end-0 top-[calc(100%+0.75rem)] z-50 w-56 border border-[#eee] bg-white py-2 shadow-[0_16px_40px_rgb(26_24_22_/_0.08)]">
          <div className="border-b border-[#eee] px-4 py-3">
            <p className="text-[13px] font-medium">سلام، {user.name}</p>
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center px-4 text-[13px] text-ink/80 hover:bg-[#fafafa] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="mt-1 flex h-10 w-full items-center gap-2 border-t border-[#eee] px-4 text-[13px] text-ink/60 hover:text-ink"
          >
            <LogoutIcon width={14} height={14} />
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
