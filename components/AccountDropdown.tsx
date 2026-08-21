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
        className="hidden h-11 items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-ink transition hover:bg-[#f3efe9] lg:inline-flex"
      >
        <UserIcon width={18} height={18} />
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
          "flex h-11 items-center gap-2 rounded-xl px-3 text-[13px] font-semibold transition",
          open ? "bg-[#f3efe9]" : "hover:bg-[#f3efe9]"
        )}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1816] text-[11px] text-white">
          {user.name.charAt(0)}
        </span>
        {user.name.split(" ")[0]}
      </button>

      {open && (
        <div className="animate-dropdown absolute end-0 top-[calc(100%+0.5rem)] z-50 w-60 overflow-hidden rounded-2xl border border-[#ece8e2] bg-white py-2 shadow-[0_16px_40px_rgb(26_24_22_/_0.12)]">
          <p className="border-b border-[#ece8e2] px-4 py-3 text-[13px] font-semibold">سلام، {user.name}</p>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center px-4 text-[13px] hover:bg-[#f3efe9]"
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
            className="mt-1 flex h-10 w-full items-center gap-2 border-t border-[#ece8e2] px-4 text-[13px] text-red-600"
          >
            <LogoutIcon width={15} height={15} />
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
