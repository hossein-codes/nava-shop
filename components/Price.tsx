import { discountPercent, formatPrice } from "@/lib/utils";

/** نمایش قیمت به تومان + قیمت قبل از تخفیف (خط‌خورده) + درصد تخفیف */
export default function Price({
  price,
  oldPrice,
  size = "md",
  className = "",
}: {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const percent = discountPercent({ price, oldPrice });
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  } as const;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`font-extrabold text-ink ${sizes[size]}`}>{formatPrice(price)}</span>
      {oldPrice && oldPrice > price && (
        <>
          <span className={`text-ink-soft/60 line-through ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {formatPrice(oldPrice)}
          </span>
          {percent !== null && (
            <span className="rounded-full bg-clay/10 px-2 py-0.5 text-xs font-bold text-clay">
              ٪{percent.toLocaleString("fa-IR")} تخفیف
            </span>
          )}
        </>
      )}
    </div>
  );
}
