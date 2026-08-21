"use client";

import { useState } from "react";
import { getRecent } from "@/lib/recent";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [ids] = useState(() => {
    if (typeof window === "undefined") return [] as string[];
    return getRecent().filter((id) => id !== excludeId);
  });

  const list = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="container-x mt-16">
      <h2 className="section-title mb-6">اخیراً دیده‌اید</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-5 lg:grid-cols-4">
        {list.map((p) => p && <ProductCard key={p.id} product={p} compact />)}
      </div>
    </section>
  );
}
