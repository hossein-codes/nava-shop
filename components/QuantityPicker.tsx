"use client";

import { MinusIcon, PlusIcon } from "./Icons";
import { cn } from "@/lib/utils";

export default function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "xs" | "sm" | "md";
}) {
  const btnCls = size === "xs" ? "h-8 w-8" : "h-11 w-11";
  const numCls = size === "xs" ? "min-w-6 text-xs" : "min-w-8 text-sm";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-sand bg-white">
      <button
        type="button"
        aria-label="کاهش تعداد"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "flex items-center justify-center text-ink-soft transition hover:bg-cream hover:text-ink",
          btnCls
        )}
      >
        <MinusIcon width={16} height={16} />
      </button>
      <span className={cn("text-center font-semibold tabular-nums", numCls)}>
        {value.toLocaleString("fa-IR")}
      </span>
      <button
        type="button"
        aria-label="افزایش تعداد"
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "flex items-center justify-center text-ink-soft transition hover:bg-cream hover:text-ink",
          btnCls
        )}
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}
