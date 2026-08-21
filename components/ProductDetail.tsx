"use client";

/** بخش اصلی صفحه محصول: تصویر + انتخاب سایز/رنگ + افزودن به سبد + تب‌ها */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { getCategory } from "@/lib/products";
import type { Product } from "@/lib/types";
import { cn, discountPercent } from "@/lib/utils";
import Price from "./Price";
import RatingStars from "./RatingStars";
import QuantityPicker from "./QuantityPicker";
import {
  CartIcon,
  CheckIcon,
  EyeIcon,
  HeartIcon,
  RulerIcon,
  ShieldIcon,
  TagIcon,
  TruckIcon,
  RefreshIcon,
  StarIcon,
} from "./Icons";

type TabId = "description" | "details" | "reviews";

const sampleReviewNames = ["نگار محمدی", "حسین عظیمی", "الهام صادقی", "رضا کاظمی", "نازنین فرهادی"];
const sampleReviewTexts = [
  "کیفیت و دوختش عالی بود؛ دقیقاً همون چیزی بود که توی عکس‌ها دیدم. ارسال هم سریع بود.",
  "جنس پارچه خیلی خوبه و اندازه‌اش دقیقاً مطابق جدول سایز بود. خرید بعدیم رو هم از نوا انجام می‌دم.",
  "بسته‌بندی تمیز و شکیل بود و رنگش دقیقاً همون رنگی بود که انتخاب کردم. راضی‌ام.",
];

function buildSampleReviews(product: Product) {
  const count = 3;
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const idx = (product.id.length + i) % sampleReviewNames.length;
    reviews.push({
      author: sampleReviewNames[idx],
      rating: product.rating > 4.6 ? 5 : 4,
      date: `۱۴۰۵/۰${i + 3}/۱۵`,
      text: sampleReviewTexts[i % sampleReviewTexts.length],
    });
  }
  return reviews;
}

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { openCart } = useUi();
  const { has, toggle } = useWishlist();

  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<TabId>("description");
  const [reviews, setReviews] = useState(() => buildSampleReviews(product));
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, text: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const category = getCategory(product.category);
  const percent = discountPercent(product);
  const wished = has(product.id);
  const lowStock = product.stock <= 6;

  const selectedColor = product.colors.find((c) => c.name === color);

  const addToCart = (goCheckout = false) => {
    addItem(product.id, size || product.sizes[0], color, quantity);
    if (goCheckout) router.push("/checkout");
    else openCart();
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;
    setReviews((prev) => [
      {
        author: reviewForm.name.trim(),
        rating: reviewForm.rating,
        date: "۱۴۰۵/۰۵/۳۰",
        text: reviewForm.text.trim(),
      },
      ...prev,
    ]);
    setReviewForm({ name: "", rating: 5, text: "" });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "توضیحات" },
    { id: "details", label: "ویژگی‌ها" },
    { id: "reviews", label: `دیدگاه‌ها (${reviews.length.toLocaleString("fa-IR")})` },
  ];

  return (
    <div>
      {/* مسیر */}
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="transition hover:text-clay">خانه</Link>
        <span>/</span>
        <Link href="/products" className="transition hover:text-clay">محصولات</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="transition hover:text-clay">
          {category.name}
        </Link>
        <span>/</span>
        <span className="font-bold text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* ---------- تصویر ---------- */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-cream">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* نشان‌ها */}
            <div className="absolute top-4 start-4 flex flex-col items-start gap-2">
              {percent !== null && (
                <span className="flex items-center gap-1 rounded-full bg-clay px-3 py-1.5 text-xs font-bold text-white shadow">
                  <TagIcon width={13} height={13} />
                  ٪{percent.toLocaleString("fa-IR")} تخفیف
                </span>
              )}
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-bold text-white shadow",
                    tag === "کم‌موجود" ? "bg-amber-600" : "bg-ink/85"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* نمادهای اعتماد */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: TruckIcon, text: "ارسال سریع" },
              { icon: ShieldIcon, text: "ضمانت اصالت" },
              { icon: RefreshIcon, text: "۷ روز بازگشت" },
            ].map((f) => (
              <div
                key={f.text}
                className="flex flex-col items-center gap-2 rounded-2xl border border-sand/60 bg-white py-3.5 text-center"
              >
                <f.icon width={20} height={20} className="text-clay" />
                <span className="text-[11px] font-bold text-ink-soft">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- اطلاعات ---------- */}
        <div>
          <Link
            href={`/products?category=${product.category}`}
            className="text-xs font-bold text-clay transition hover:text-clay-dark"
          >
            {category.name}
          </Link>
          <h1 className="mt-2 text-2xl font-black leading-snug sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} size={16} showValue />
            <span className="text-xs text-ink-soft">
              {product.reviewCount.toLocaleString("fa-IR")} دیدگاه ثبت‌شده
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-sand/60 bg-white p-5">
            <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
            <p className="mt-2 text-xs text-ink-soft">
              {lowStock ? (
                <span className="font-bold text-amber-600">
                  فقط {product.stock.toLocaleString("fa-IR")} عدد در انبار باقی مانده — عجله کنید!
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-sage">
                  <CheckIcon width={14} height={14} />
                  موجود در انبار
                </span>
              )}
            </p>
          </div>

          {/* انتخاب رنگ */}
          <div className="mt-6">
            <p className="label-base">
              رنگ: <span className="font-bold text-ink">{color}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "relative h-10 w-10 rounded-full border-2 transition",
                    color === c.name
                      ? "border-clay ring-2 ring-clay/30 ring-offset-2"
                      : "border-ink/10 hover:scale-105"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.name && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <CheckIcon width={16} height={16} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-xs text-ink-soft">رنگ انتخابی: {selectedColor.name}</p>
            )}
          </div>

          {/* انتخاب سایز */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="label-base !mb-0">
                سایز: <span className="font-bold text-ink">{size || "انتخاب کنید"}</span>
              </p>
              <button className="flex items-center gap-1 text-xs font-bold text-ink-soft transition hover:text-clay">
                <RulerIcon width={15} height={15} />
                راهنمای سایز
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition",
                    size === s
                      ? "border-clay bg-clay text-white"
                      : "border-sand bg-white text-ink-soft hover:border-clay/50"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* تعداد */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-bold">تعداد:</p>
            <QuantityPicker value={quantity} onChange={setQuantity} max={Math.min(10, product.stock)} />
          </div>

          {/* دکمه‌ها */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => addToCart(false)} className="btn btn-primary flex-1 min-w-44">
              <CartIcon width={18} height={18} />
              افزودن به سبد خرید
            </button>
            <button onClick={() => addToCart(true)} className="btn btn-clay flex-1 min-w-44">
              <EyeIcon width={18} height={18} />
              خرید سریع
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label="افزودن به علاقه‌مندی‌ها"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border-2 transition",
                wished
                  ? "border-clay bg-clay/10 text-clay"
                  : "border-sand bg-white text-ink-soft hover:border-clay/50"
              )}
            >
              <HeartIcon filled={wished} width={20} height={20} />
            </button>
          </div>

          {/* توضیح کوتاه */}
          <p className="mt-6 border-t border-dashed border-sand pt-5 text-sm leading-7 text-ink-soft">
            {product.description}
          </p>
        </div>
      </div>

      {/* ---------- تب‌ها ---------- */}
      <div className="mt-16">
        <div className="flex gap-2 overflow-x-auto border-b border-sand">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "whitespace-nowrap border-b-2 px-5 py-3 text-sm font-bold transition",
                tab === t.id
                  ? "border-clay text-clay"
                  : "border-transparent text-ink-soft hover:text-ink"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-b-3xl border border-t-0 border-sand/60 bg-white p-6 sm:p-8">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-sm leading-8 text-ink-soft">
              <p>{product.description}</p>
              <p>
                تمام محصولات نوا با دقت و وسواس در انتخاب پارچه و دوخت تهیه می‌شوند. در صورت عدم
                رضایت، تا ۷ روز پس از تحویل امکان بازگشت کالا بدون قید و شرط وجود دارد.
              </p>
              <ul className="space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <CheckIcon width={16} height={16} className="shrink-0 text-sage" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "details" && (
            <div className="max-w-3xl">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2.5 rounded-xl border border-sand/60 bg-ivory px-4 py-3 text-sm font-semibold"
                  >
                    <CheckIcon width={16} height={16} className="shrink-0 text-sage" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "reviews" && (
            <div className="grid gap-10 lg:grid-cols-2">
              {/* خلاصه امتیاز */}
              <div>
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-sand/60 bg-ivory p-5">
                  <p className="text-4xl font-black text-ink">
                    {product.rating.toLocaleString("fa-IR")}
                  </p>
                  <div>
                    <RatingStars rating={product.rating} size={18} />
                    <p className="mt-1 text-xs text-ink-soft">
                      بر اساس {product.reviewCount.toLocaleString("fa-IR")} دیدگاه
                    </p>
                  </div>
                </div>

                {/* فرم ثبت دیدگاه */}
                <form onSubmit={submitReview} className="space-y-4">
                  <p className="text-base font-extrabold">ثبت دیدگاه شما</p>
                  <div>
                    <label className="label-base">نام شما</label>
                    <input
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="مثلاً: علی محمدی"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="label-base">امتیاز شما</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: r })}
                          aria-label={`${r} ستاره`}
                        >
                          <StarIcon
                            filled={r <= reviewForm.rating}
                            width={26}
                            height={26}
                            className={r <= reviewForm.rating ? "text-amber-500" : "text-sand"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label-base">متن دیدگاه</label>
                    <textarea
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      rows={4}
                      placeholder="تجربه‌ی خودتان از این محصول را بنویسید..."
                      className="input-base resize-none"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    ثبت دیدگاه
                  </button>
                  {reviewSubmitted && (
                    <p className="flex items-center gap-1.5 text-sm font-bold text-sage">
                      <CheckIcon width={16} height={16} />
                      دیدگاه شما ثبت شد. متشکریم!
                    </p>
                  )}
                </form>
              </div>

              {/* لیست دیدگاه‌ها */}
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-sand/60 bg-ivory p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-extrabold">{r.author}</p>
                      <span className="text-[11px] text-ink-soft">{r.date}</span>
                    </div>
                    <RatingStars rating={r.rating} size={13} />
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
