"use client";

import { useState } from "react";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { cn } from "@/lib/utils";
import Price from "./Price";
import { CloseIcon } from "./Icons";

export default function QuickView() {
  const { quickViewId, closeQuickView, openCart } = useUi();
  const { addItem } = useCart();
  const product = quickViewId ? getProductById(quickViewId) : undefined;
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  if (!product) return null;

  const selectedColor = color || product.colors[0]?.name || "";

  const add = () => {
    if (!size) {
      setError("سایز را انتخاب کنید");
      return;
    }
    addItem(product.id, size, selectedColor, 1);
    setError("");
    setSize("");
    closeQuickView();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/45" onClick={closeQuickView} />
      <div className="relative max-h-[92%] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl">
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="بستن"
          className="absolute top-3 end-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-ivory"
        >
          <CloseIcon width={18} height={18} />
        </button>
        <div className="grid sm:grid-cols-2">
          <div className="aspect-[3/4] bg-cream sm:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col p-5 sm:p-7">
            <h2 className="text-lg font-semibold leading-7">{product.name}</h2>
            <div className="mt-3">
              <Price price={product.price} oldPrice={product.oldPrice} />
            </div>

            <div className="mt-6">
              <p className="label-base">رنگ: {selectedColor}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "h-11 w-11 rounded-full border-2",
                      (color || product.colors[0].name) === c.name ? "border-ink" : "border-transparent"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="label-base">سایز</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    className={cn(
                      "min-h-11 min-w-11 rounded-xl border px-3 text-sm font-medium",
                      size === s ? "border-ink bg-ink text-white" : "border-sand bg-white hover:border-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="mt-2 text-xs font-medium text-sale">{error}</p>}
            </div>

            <button type="button" onClick={add} className="btn btn-primary mt-6 w-full">
              افزودن به سبد
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={closeQuickView}
              className="mt-3 text-center text-sm font-medium text-ink-soft hover:text-ink"
            >
              مشاهده جزئیات محصول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
