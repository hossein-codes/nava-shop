"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart-context";
import { useUi } from "@/lib/store/ui-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { getCategory } from "@/lib/products";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pushRecent } from "@/lib/recent";
import Price from "./Price";
import RatingStars from "./RatingStars";
import QuantityPicker from "./QuantityPicker";
import ProductGallery from "./ProductGallery";
import SizeGuide from "./SizeGuide";
import {
  CheckIcon,
  HeartIcon,
  RefreshIcon,
  RulerIcon,
  ShareIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "./Icons";

type TabId = "description" | "details" | "reviews";

const sampleReviewNames = ["نگار محمدی", "حسین عظیمی", "الهام صادقی", "رضا کاظمی", "نازنین فرهادی"];
const sampleReviewTexts = [
  "کیفیت و دوخت عالی بود؛ دقیقاً همان چیزی بود که در عکس‌ها دیدم. ارسال هم سریع بود.",
  "جنس پارچه خوب است و اندازه مطابق جدول سایز بود.",
  "بسته‌بندی تمیز بود و رنگ دقیقاً همان انتخابی بود.",
];

function buildSampleReviews(product: Product) {
  return [0, 1, 2].map((i) => ({
    author: sampleReviewNames[(product.id.length + i) % sampleReviewNames.length],
    rating: product.rating > 4.6 ? 5 : 4,
    date: `۱۴۰۵/۰${i + 3}/۱۵`,
    text: sampleReviewTexts[i],
  }));
}

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showToast } = useUi();
  const { has, toggle } = useWishlist();

  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<TabId>("description");
  const [guide, setGuide] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [reviews, setReviews] = useState(() => buildSampleReviews(product));
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, text: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const category = getCategory(product.category);
  const wished = has(product.id);
  const lowStock = product.stock <= 6;

  useEffect(() => {
    pushRecent(product.id);
  }, [product.id]);

  const addToCart = (goCheckout = false) => {
    if (!size) {
      setSizeError(true);
      return false;
    }
    addItem(product.id, size, color, quantity);
    if (goCheckout) router.push("/checkout");
    else showToast("به سبد خرید اضافه شد");
    return true;
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
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "توضیحات" },
    { id: "details", label: "جنس و نگهداری" },
    { id: "reviews", label: `دیدگاه‌ها (${reviews.length.toLocaleString("fa-IR")})` },
  ];

  return (
    <div>
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="hover:text-ink">خانه</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-ink">محصولات</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-ink">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <Link href={`/products?category=${product.category}`} className="text-xs font-medium text-clay">
            {category.name}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold leading-snug lg:text-[1.75rem]">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} size={15} showValue />
            <button
              type="button"
              onClick={() => setTab("reviews")}
              className="text-xs text-ink-soft hover:text-ink"
            >
              {product.reviewCount.toLocaleString("fa-IR")} دیدگاه
            </button>
          </div>

          <div className="mt-5 border-y border-sand py-5">
            <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
            <p className="mt-2 text-xs">
              {lowStock ? (
                <span className="font-medium text-amber-700">
                  فقط {product.stock.toLocaleString("fa-IR")} عدد باقی مانده
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-medium text-sage">
                  <CheckIcon width={14} height={14} />
                  موجود در انبار
                </span>
              )}
            </p>
          </div>

          <div className="mt-6">
            <p className="label-base">رنگ: {color}</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "h-11 w-11 rounded-full border-2",
                    color === c.name ? "border-ink" : "border-transparent ring-1 ring-sand"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="label-base !mb-0">سایز {size && <span className="text-ink">· {size}</span>}</p>
              <button
                type="button"
                onClick={() => setGuide(true)}
                className="inline-flex h-11 items-center gap-1 text-xs font-medium text-ink-soft hover:text-ink"
              >
                <RulerIcon width={15} height={15} />
                راهنمای سایز
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={cn(
                    "min-h-11 min-w-12 rounded-xl border px-3 text-sm font-medium",
                    size === s ? "border-ink bg-ink text-white" : "border-sand bg-white hover:border-ink"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs font-medium text-sale">برای افزودن به سبد، سایز را انتخاب کنید.</p>
            )}
          </div>

          <div className="mt-6 hidden items-center gap-4 lg:flex">
            <span className="text-sm font-medium">تعداد</span>
            <QuantityPicker value={quantity} onChange={setQuantity} max={Math.min(10, product.stock)} />
          </div>

          <div className="mt-7 hidden gap-3 lg:flex">
            <button type="button" onClick={() => addToCart(false)} className="btn btn-primary flex-1">
              افزودن به سبد
            </button>
            <button type="button" onClick={() => addToCart(true)} className="btn btn-outline flex-1">
              خرید سریع
            </button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              aria-label="علاقه‌مندی"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border",
                wished ? "border-clay text-clay" : "border-sand text-ink-soft"
              )}
            >
              <HeartIcon filled={wished} width={20} height={20} />
            </button>
            <button
              type="button"
              aria-label="اشتراک‌گذاری"
              onClick={() => {
                if (navigator.share) navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
                else navigator.clipboard.writeText(window.location.href);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-sand text-ink-soft"
            >
              <ShareIcon width={18} height={18} />
            </button>
          </div>

          <p className="mt-6 hidden text-sm leading-7 text-ink-soft lg:block">{product.description}</p>

          <ul className="mt-6 hidden gap-4 text-xs text-ink-soft lg:grid lg:grid-cols-3">
            {[
              { icon: TruckIcon, text: "ارسال سریع" },
              { icon: ShieldIcon, text: "ضمانت اصالت" },
              { icon: RefreshIcon, text: "۷ روز بازگشت" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-2">
                <f.icon width={16} height={16} className="text-ink" />
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex gap-1 overflow-x-auto border-b border-sand">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium",
                tab === t.id ? "border-ink text-ink" : "border-transparent text-ink-soft"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white py-6 lg:py-8">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-sm leading-8 text-ink-soft">
              <p>{product.description}</p>
              <p>در صورت عدم رضایت، تا ۷ روز پس از تحویل امکان بازگشت کالا وجود دارد.</p>
            </div>
          )}
          {tab === "details" && (
            <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-2 rounded-xl border border-sand bg-ivory px-4 py-3 text-sm">
                  <CheckIcon width={16} height={16} className="shrink-0 text-sage" />
                  {d}
                </li>
              ))}
            </ul>
          )}
          {tab === "reviews" && (
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-sand bg-ivory p-5">
                  <p className="text-4xl font-semibold">{product.rating.toLocaleString("fa-IR")}</p>
                  <div>
                    <RatingStars rating={product.rating} size={16} />
                    <p className="mt-1 text-xs text-ink-soft">
                      بر اساس {product.reviewCount.toLocaleString("fa-IR")} دیدگاه
                    </p>
                  </div>
                </div>
                <form onSubmit={submitReview} className="space-y-4">
                  <p className="font-semibold">ثبت دیدگاه</p>
                  <div>
                    <label className="label-base">نام</label>
                    <input
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="label-base">امتیاز</label>
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
                    <label className="label-base">متن</label>
                    <textarea
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      rows={4}
                      className="input-base resize-none"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">ثبت دیدگاه</button>
                  {reviewSubmitted && (
                    <p className="text-sm font-medium text-sage">دیدگاه شما ثبت شد.</p>
                  )}
                </form>
              </div>
              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-sand bg-ivory p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold">{r.author}</p>
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

      <SizeGuide open={guide} onClose={() => setGuide(false)} />

      {/* نوار خرید موبایل */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-ivory/95 p-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label="علاقه‌مندی"
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              wished ? "border-clay text-clay" : "border-sand"
            )}
          >
            <HeartIcon filled={wished} width={20} height={20} />
          </button>
          <button type="button" onClick={() => addToCart(false)} className="btn btn-primary min-h-12 flex-1">
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  );
}
