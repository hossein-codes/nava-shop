"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
import { useCart } from "@/lib/store/cart-context";
import type { Product } from "@/lib/types";
import { discountPercent } from "@/lib/utils";
import Price from "./Price";
import RatingStars from "./RatingStars";
import { HeartIcon } from "./Icons";

export default function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const { openQuickView, openCart } = useUi();
  const { addItem } = useCart();
  const percent = discountPercent(product);
  const wished = has(product.id);
  const needsChoice = product.colors.length > 1 || product.sizes.length > 1;

  const quickAdd = () => {
    if (needsChoice) {
      openQuickView(product.id);
      return;
    }
    addItem(product.id, product.sizes[0], product.colors[0]?.name, 1);
    openCart();
  };

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute top-2 start-2 flex flex-col items-start gap-1">
          {percent !== null && (
            <span className="rounded-full bg-sale px-2 py-0.5 text-[10px] font-semibold text-white">
              ٪{percent.toLocaleString("fa-IR")}
            </span>
          )}
          {product.tags.includes("جدید") && (
            <span className="rounded-full bg-ivory px-2 py-0.5 text-[10px] font-medium text-ink">
              جدید
            </span>
          )}
          {product.staffPick && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-ivory">
              انتخاب مشاور
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          onClick={() => toggle(product.id)}
          className="absolute top-2 end-2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 text-ink"
        >
          <HeartIcon filled={wished} className={wished ? "text-clay" : ""} width={17} height={17} />
        </button>

        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-2 bottom-2 hidden h-10 items-center justify-center rounded-xl bg-ink text-xs font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100 lg:flex"
        >
          {needsChoice ? "انتخاب سایه / حجم" : "افزودن به سبد"}
        </button>
      </div>

      <div className="px-0.5 pb-1 pt-3">
        <p className="text-[11px] font-medium tracking-wide text-ink-soft">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-0.5 line-clamp-1 text-[13px] font-medium text-ink">{product.name}</h3>
        </Link>
        <div className="mt-1.5">
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <RatingStars rating={product.rating} size={12} />
          <span className="text-[11px] text-ink-soft">
            {product.rating.toLocaleString("fa-IR")}
            <span className="text-ink/35"> ({product.reviewCount.toLocaleString("fa-IR")})</span>
          </span>
        </div>
        {!compact && product.colors.length > 1 && (
          <div className="mt-2 hidden items-center gap-1 lg:flex">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full border border-ink/10"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
