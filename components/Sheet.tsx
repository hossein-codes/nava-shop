"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "./Icons";

export default function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[88%] flex-col rounded-t-2xl bg-ivory shadow-[0_16px_48px_rgb(26_24_22_/_0.16)] transition-transform duration-300",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sand px-4 py-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-soft hover:bg-cream"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        {footer && <div className="border-t border-sand bg-white p-4">{footer}</div>}
      </div>
    </div>
  );
}
