"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, products } from "@/lib/products";
import { useUi } from "@/lib/store/ui-context";
import Sheet from "./Sheet";

export default function CategorySheet() {
  const { categoryOpen, closeCategory } = useUi();
  const live = categories.filter((c) => products.some((p) => p.category === c.id));

  return (
    <Sheet open={categoryOpen} onClose={closeCategory} title="خرید بر اساس دسته">
      <div className="grid grid-cols-1 gap-3">
        {live.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            onClick={closeCategory}
            className="relative h-28 overflow-hidden rounded-2xl"
          >
            <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-base font-semibold">{cat.name}</p>
              <p className="text-xs text-white/80">{cat.subtitle}</p>
            </div>
          </Link>
        ))}
        <Link
          href="/products?discount=1"
          onClick={closeCategory}
          className="flex h-14 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white"
        >
          تخفیف‌های فعال
        </Link>
        <Link
          href="/products"
          onClick={closeCategory}
          className="flex h-14 items-center justify-center rounded-2xl border border-sand bg-white text-sm font-medium"
        >
          همه محصولات
        </Link>
      </div>
    </Sheet>
  );
}
