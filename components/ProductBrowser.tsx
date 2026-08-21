"use client";

/**
 * مرورگر محصولات: فیلتر + مرتب‌سازی + جستجو
 * فیلترها در URL ذخیره می‌شوند تا قابل اشتراک‌گذاری باشند.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import type { CategoryId } from "@/lib/types";
import { cn, discountPercent } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { ArrowIcon, CloseIcon, FilterIcon, SearchIcon } from "./Icons";

export interface InitialFilters {
  q: string;
  category: string;
  sizes: string[];
  colors: string[];
  min?: number;
  max?: number;
  sort: string;
  discountOnly: boolean;
}

const sortOptions = [
  { id: "newest", label: "جدیدترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "best", label: "محبوب‌ترین" },
  { id: "discount", label: "بیشترین تخفیف" },
];

const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
const allColors = Array.from(
  new Set(products.flatMap((p) => p.colors.map((c) => c.name)))
);
const availableCategories = categories.filter((c) =>
  products.some((p) => p.category === c.id)
);

export default function ProductBrowser({ initial }: { initial: InitialFilters }) {
  const router = useRouter();
  const [filters, setFilters] = useState<InitialFilters>(initial);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // به‌روزرسانی URL با فیلترهای جدید
  const updateUrl = (next: InitialFilters) => {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.category !== "all") params.set("category", next.category);
    if (next.sizes.length) params.set("size", next.sizes.join(","));
    if (next.colors.length) params.set("color", next.colors.join(","));
    if (next.min) params.set("min", String(next.min));
    if (next.max) params.set("max", String(next.max));
    if (next.sort !== "newest") params.set("sort", next.sort);
    if (next.discountOnly) params.set("discount", "1");
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  };

  const set = (patch: Partial<InitialFilters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      updateUrl(next);
      return next;
    });
  };

  const toggleSize = (size: string) =>
    set({
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });

  const toggleColor = (color: string) =>
    set({
      colors: filters.colors.includes(color)
        ? filters.colors.filter((c) => c !== color)
        : [...filters.colors, color],
    });

  const resetFilters = () => {
    const clean: InitialFilters = {
      q: "",
      category: "all",
      sizes: [],
      colors: [],
      min: undefined,
      max: undefined,
      sort: "newest",
      discountOnly: false,
    };
    setFilters(clean);
    updateUrl(clean);
  };

  const hasActiveFilters =
    filters.q ||
    filters.category !== "all" ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.min !== undefined ||
    filters.max !== undefined ||
    filters.discountOnly;

  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.q) {
      const q = filters.q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.details.join(" ").toLowerCase().includes(q)
      );
    }
    if (filters.category !== "all") {
      list = list.filter((p) => p.category === (filters.category as CategoryId));
    }
    if (filters.sizes.length) {
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length) {
      list = list.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }
    if (filters.min !== undefined) list = list.filter((p) => p.price >= (filters.min ?? 0));
    if (filters.max !== undefined) list = list.filter((p) => p.price <= (filters.max ?? Infinity));
    if (filters.discountOnly) list = list.filter((p) => p.oldPrice && p.oldPrice > p.price);

    switch (filters.sort) {
      case "cheapest":
        list.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        list.sort((a, b) => b.price - a.price);
        break;
      case "best":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort(
          (a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0)
        );
        break;
      default:
        break; // جدیدترین = ترتیب دیتا
    }
    return list;
  }, [filters]);

  // ---------- محتوای فیلترها (مشترک بین دسکتاپ و موبایل) ----------
  const filterPanel = (
    <div className="space-y-6">
      {/* جستجو */}
      <div>
        <label className="label-base">جستجو</label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector("input") as HTMLInputElement;
            set({ q: input.value });
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border-2 border-sand bg-white px-3 py-2">
            <SearchIcon width={16} height={16} className="text-ink-soft" />
            <input
              key={filters.q}
              defaultValue={filters.q}
              placeholder="نام محصول..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </form>
      </div>

      {/* دسته‌بندی */}
      <div>
        <p className="label-base">دسته‌بندی</p>
        <div className="space-y-1">
          {[
            { id: "all", name: "همه" },
            ...availableCategories.map((c) => ({ id: c.id, name: c.name })),
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => set({ category: cat.id })}
              className={cn(
                "block w-full rounded-xl px-3 py-2 text-start text-sm font-bold transition",
                filters.category === cat.id
                  ? "bg-ink text-ivory"
                  : "text-ink-soft hover:bg-cream"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* سایز */}
      <div>
        <p className="label-base">سایز</p>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                "rounded-full border-2 px-3 py-1.5 text-xs font-bold transition",
                filters.sizes.includes(size)
                  ? "border-clay bg-clay text-white"
                  : "border-sand bg-white text-ink-soft hover:border-clay/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* رنگ */}
      <div>
        <p className="label-base">رنگ</p>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => {
            const hex = products
              .flatMap((p) => p.colors)
              .find((c) => c.name === color)?.hex;
            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition",
                  filters.colors.includes(color)
                    ? "border-clay bg-clay/5 text-clay"
                    : "border-sand bg-white text-ink-soft hover:border-clay/50"
                )}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-ink/10"
                  style={{ backgroundColor: hex }}
                />
                {color}
              </button>
            );
          })}
        </div>
      </div>

      {/* قیمت */}
      <div>
        <p className="label-base">محدوده قیمت (تومان)</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="از"
            defaultValue={filters.min ?? ""}
            onBlur={(e) => set({ min: e.target.value ? Number(e.target.value) : undefined })}
            className="input-base !py-2 text-sm"
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="تا"
            defaultValue={filters.max ?? ""}
            onBlur={(e) => set({ max: e.target.value ? Number(e.target.value) : undefined })}
            className="input-base !py-2 text-sm"
          />
        </div>
      </div>

      {/* فقط تخفیف‌دار */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={filters.discountOnly}
          onChange={(e) => set({ discountOnly: e.target.checked })}
          className="h-4.5 w-4.5 accent-clay"
        />
        <span className="text-sm font-bold text-ink">فقط کالاهای تخفیف‌دار</span>
      </label>

      <button onClick={resetFilters} className="btn btn-outline w-full text-sm">
        حذف همه فیلترها
      </button>
    </div>
  );

  return (
    <div className="container-x mt-6">
      {/* مسیر */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="transition hover:text-clay">
          خانه
        </Link>
        <span>/</span>
        <span className="font-bold text-ink">محصولات</span>
        {filters.q && (
          <>
            <span>/</span>
            <span className="text-clay">جستجو: «{filters.q}»</span>
          </>
        )}
      </nav>

      {/* سربرگ */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">
            {filters.category !== "all"
              ? availableCategories.find((c) => c.id === filters.category)?.name
              : "همه محصولات"}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {filtered.length.toLocaleString("fa-IR")} محصول یافت شد
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* دکمه فیلتر موبایل */}
          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border-2 border-sand bg-white px-4 py-2 text-sm font-bold lg:hidden"
          >
            <FilterIcon width={16} height={16} />
            فیلترها
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>

          {/* مرتب‌سازی */}
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value })}
            className="rounded-full border-2 border-sand bg-white px-4 py-2 text-sm font-bold outline-none transition focus:border-clay"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                مرتب‌سازی: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* سایدبار فیلتر — دسکتاپ */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-32 rounded-2xl border border-sand/60 bg-white p-5">
            {filterPanel}
          </div>
        </aside>

        {/* فیلتر موبایل */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute inset-y-0 start-0 w-80 max-w-[88%] overflow-y-auto bg-ivory p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-black">فیلترها</p>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="بستن"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>
              {filterPanel}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="btn btn-primary mt-6 w-full"
              >
                نمایش {filtered.length.toLocaleString("fa-IR")} محصول
              </button>
            </div>
          </div>
        )}

        {/* گرید محصولات */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sand bg-white py-20 text-center">
              <p className="text-3xl">🔍</p>
              <p className="mt-3 text-lg font-extrabold">محصولی پیدا نشد!</p>
              <p className="mt-1 text-sm text-ink-soft">
                فیلترها را تغییر دهید یا همه‌ی فیلترها را حذف کنید.
              </p>
              <button onClick={resetFilters} className="btn btn-primary mt-5">
                حذف فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* دکمه نمایش بیشتر (نمایشی) */}
      {filtered.length > 6 && (
        <div className="mt-10 text-center">
          <button className="btn btn-outline">
            نمایش محصولات بیشتر
            <ArrowIcon width={16} height={16} className="rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
