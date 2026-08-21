"use client";

import { useUi } from "@/lib/store/ui-context";

export default function Toast() {
  const { toast, openCart } = useUi();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4 lg:top-auto lg:bottom-8">
      <div className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-[0_16px_48px_rgb(26_24_22_/_0.16)]">
        <span className="flex-1 font-medium">{toast}</span>
        <button
          type="button"
          onClick={openCart}
          className="shrink-0 text-xs font-semibold text-cream underline-offset-2 hover:underline"
        >
          مشاهده سبد
        </button>
      </div>
    </div>
  );
}
