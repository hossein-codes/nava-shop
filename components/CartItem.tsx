"use client";

import Link from "next/link";
import { getProductById } from "@/lib/products";
import type { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import QuantityPicker from "./QuantityPicker";
import { TrashIcon } from "./Icons";

export default function CartItemRow({
  item,
  onQty,
  onRemove,
  onNavigate,
  compact = false,
}: {
  item: CartItemType;
  onQty: (qty: number) => void;
  onRemove: () => void;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const product = getProductById(item.productId);
  if (!product) return null;

  return (
    <div className={`flex gap-3 ${compact ? "" : "rounded-2xl border border-sand bg-white p-3 sm:p-4"}`}>
      <Link
        href={`/products/${product.slug}`}
        onClick={onNavigate}
        className={`relative shrink-0 overflow-hidden rounded-xl bg-cream ${compact ? "h-24 w-20" : "h-28 w-24"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              onClick={onNavigate}
              className="line-clamp-2 text-sm font-medium text-ink hover:text-clay"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-ink-soft">
              {product.variantLabel} {item.size} · {item.color}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="حذف از سبد"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-soft transition hover:bg-cream hover:text-sale"
          >
            <TrashIcon width={17} height={17} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityPicker size={compact ? "sm" : "md"} value={item.quantity} onChange={onQty} />
          <span className="text-sm font-semibold tabular-nums">
            {formatPrice(product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
