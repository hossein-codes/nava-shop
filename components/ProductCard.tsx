"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
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
  const { openQuickView } = useUi();
  const percent = discountPercent(product);
  const wished = has(product.id);

  return (
    <article className="group relative rounded-2xl border border-sand/80 bg-white p-2 transition hover:border-sand hover:shadow-[0_8px_24px_rgb(26_24_22_/_0.06)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f4f1ec]">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, 50vw"
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
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink">
              جدید
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          onClick={() => toggle(product.id)}
          className="absolute top-2 end-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink"
        >
          <HeartIcon filled={wished} className={wished ? "text-clay" : ""} width={17} height={17} />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-x-2 bottom-2 hidden h-10 items-center justify-center rounded-xl bg-white text-xs font-semibold text-ink opacity-0 shadow-sm transition group-hover:opacity-100 lg:flex"
        >
          انتخاب سایز
        </button>
      </div>

      <div className="px-1.5 pb-2 pt-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-1 text-[13px] font-medium text-ink">{product.name}</h3>
        </Link>
        <div className="mt-1.5">
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <RatingStars rating={product.rating} size={12} />
          <span className="text-[11px] text-ink-soft">{product.rating.toLocaleString("fa-IR")}</span>
        </div>
        {!compact && (
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
