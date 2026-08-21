import { StarIcon } from "./Icons";

/** ستاره‌های امتیازدهی با پر شدن نسبی */
export default function RatingStars({
  rating,
  size = 16,
  showValue = false,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative inline-flex" dir="ltr">
        {/* ستاره‌های خاکستری (پس‌زمینه) */}
        <div className="flex text-sand">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} width={size} height={size} />
          ))}
        </div>
        {/* ستاره‌های رنگی (روی‌هم با عرض نسبی) */}
        <div
          className="absolute inset-0 flex overflow-hidden text-amber-500"
          style={{ width: `${percent}%` }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} filled width={size} height={size} />
          ))}
        </div>
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink-soft">
          {rating.toLocaleString("fa-IR")}
        </span>
      )}
    </div>
  );
}
