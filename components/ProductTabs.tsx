"use client";

/** تب‌های صفحه اصلی: جدیدترین / پرفروش‌ترین / تخفیف‌دار */
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "new", label: "جدیدترین" },
  { id: "best", label: "پرفروش‌ترین" },
  { id: "sale", label: "تخفیف‌دار" },
] as const;

export default function ProductTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("new");

  const list = useMemo(() => {
    if (active === "new") return [...products].slice(0, 8);
    if (active === "best")
      return products.filter((p) => p.tags.includes("پرفروش")).slice(0, 8);
    return products.filter((p) => p.oldPrice && p.oldPrice > p.price).slice(0, 8);
  }, [active]);

  return (
    <section className="container-x mt-16">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h2 className="section-title text-center">محصولات منتخب</h2>
        <div className="flex rounded-full border border-sand bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition",
                active === tab.id ? "bg-ink text-ivory" : "text-ink-soft hover:text-ink"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
