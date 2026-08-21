"use client";

/** کارت محصول: تصویر + نشان‌ها + علاقه‌مندی + افزودن سریع به سبد */
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useUi } from "@/lib/store/ui-context";
import type { Product } from "@/lib/types";
import { discountPercent } from "@/lib/utils";
import Price from "./Price";
import RatingStars from "./RatingStars";
import { CartIcon, HeartIcon, TagIcon } from "./Icons";

const badgeStyles: Record<string, string> = {
  "پرفروش": "bg-ink text-ivory",
  "جدید": "bg-sage text-white",
  "کم‌موجود": "bg-amber-600 text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { openCart } = useUi();

  const percent = discountPercent(product);
  const wished = has(product.id);
  const isLowStock = product.stock <= 6;

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // جلوگیری از ناوبری لینک
    addItem(product.id);
    openCart();
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-sand/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      {/* تصویر */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* نشان‌ها */}
        <div className="absolute top-3 start-3 flex flex-col items-start gap-1.5">
          {percent !== null && (
            <span className="flex items-center gap-1 rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white shadow">
              <TagIcon width={12} height={12} />
              ٪{percent.toLocaleString("fa-IR")}
            </span>
          )}
          {product.tags.map(
            (tag) =>
              (badgeStyles[tag] || "bg-ink text-ivory") && (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold shadow ${badgeStyles[tag] || "bg-ink text-ivory"}`}
                >
                  {tag}
                </span>
              )
          )}
        </div>
        {isLowStock && (
          <span className="absolute bottom-3 start-3 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
            فقط {product.stock.toLocaleString("fa-IR")} عدد باقی مانده
          </span>
        )}

        {/* دکمه‌ی علاقه‌مندی */}
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:scale-110"
        >
          <HeartIcon
            filled={wished}
            className={wished ? "text-clay" : ""}
            width={18}
            height={18}
          />
        </button>
      </div>

      {/* اطلاعات */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <RatingStars rating={product.rating} size={13} />
          <span className="text-[11px] text-ink-soft/70">
            {product.reviewCount.toLocaleString("fa-IR")} دیدگاه
          </span>
        </div>
        <h3 className="mb-2 line-clamp-1 text-sm font-bold text-ink transition group-hover:text-clay">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" />
          <button
            aria-label="افزودن به سبد خرید"
            onClick={quickAdd}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-ivory transition hover:bg-clay"
          >
            <CartIcon width={17} height={17} />
          </button>
        </div>
      </div>
    </Link>
  );
}
