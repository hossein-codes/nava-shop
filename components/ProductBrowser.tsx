"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import type { CategoryId } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import ProductCard from "./ProductCard";
import Sheet from "./Sheet";
import EmptyState from "./EmptyState";
import { CloseIcon, FilterIcon, SearchIcon, SortIcon } from "./Icons";

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

const pricePresets = [
  { id: "p1", label: "تا ۱ میلیون", min: undefined, max: 1_000_000 },
  { id: "p2", label: "۱ تا ۳ میلیون", min: 1_000_000, max: 3_000_000 },
  { id: "p3", label: "بالای ۳ میلیون", min: 3_000_000, max: undefined },
];

const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
const allColors = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))));
const availableCategories = categories.filter((c) => products.some((p) => p.category === c.id));

export default function ProductBrowser({ initial }: { initial: InitialFilters }) {
  const router = useRouter();
  const [filters, setFilters] = useState<InitialFilters>(initial);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

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
    set({ sizes: filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size] });
  const toggleColor = (color: string) =>
    set({
      colors: filters.colors.includes(color) ? filters.colors.filter((c) => c !== color) : [...filters.colors, color],
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

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.q) chips.push({ key: "q", label: `جستجو: ${filters.q}`, clear: () => set({ q: "" }) });
  if (filters.category !== "all") {
    const name = availableCategories.find((c) => c.id === filters.category)?.name ?? filters.category;
    chips.push({ key: "cat", label: name, clear: () => set({ category: "all" }) });
  }
  filters.sizes.forEach((s) =>
    chips.push({ key: `s-${s}`, label: `سایز ${s}`, clear: () => toggleSize(s) })
  );
  filters.colors.forEach((c) => chips.push({ key: `c-${c}`, label: c, clear: () => toggleColor(c) }));
  if (filters.discountOnly)
    chips.push({ key: "d", label: "تخفیف‌دار", clear: () => set({ discountOnly: false }) });
  if (filters.min !== undefined || filters.max !== undefined) {
    const label =
      filters.min && filters.max
        ? `${formatPrice(filters.min)} تا ${formatPrice(filters.max)}`
        : filters.min
          ? `از ${formatPrice(filters.min)}`
          : `تا ${formatPrice(filters.max ?? 0)}`;
    chips.push({ key: "price", label, clear: () => set({ min: undefined, max: undefined }) });
  }

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
    if (filters.category !== "all") list = list.filter((p) => p.category === (filters.category as CategoryId));
    if (filters.sizes.length) list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.colors.length) list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
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
        list.sort((a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0));
        break;
      default:
        break;
    }
    return list;
  }, [filters]);

  const filterBody = (
    <div className="space-y-6">
      <div>
        <label className="label-base">جستجو در نتایج</label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.currentTarget.querySelector("input") as HTMLInputElement);
            set({ q: input.value });
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2">
            <SearchIcon width={16} height={16} className="text-ink-soft" />
            <input key={filters.q} defaultValue={filters.q} placeholder="نام محصول" className="w-full bg-transparent text-sm outline-none" />
          </div>
        </form>
      </div>

      <div>
        <p className="label-base">دسته</p>
        <div className="space-y-1">
          {[{ id: "all", name: "همه" }, ...availableCategories.map((c) => ({ id: c.id, name: c.name }))].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => set({ category: cat.id })}
              className={cn(
                "block w-full rounded-xl px-3 py-2.5 text-start text-sm font-medium",
                filters.category === cat.id ? "bg-ink text-white" : "text-ink-soft hover:bg-cream"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-base">سایز</p>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={cn(
                "min-h-11 rounded-xl border px-3 text-xs font-medium",
                filters.sizes.includes(size) ? "border-ink bg-ink text-white" : "border-sand bg-white"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-base">رنگ</p>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => {
            const hex = products.flatMap((p) => p.colors).find((c) => c.name === color)?.hex;
            return (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-xl border px-3 text-xs font-medium",
                  filters.colors.includes(color) ? "border-ink" : "border-sand bg-white"
                )}
              >
                <span className="h-3.5 w-3.5 rounded-full border border-ink/10" style={{ backgroundColor: hex }} />
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="label-base">قیمت</p>
        <div className="flex flex-col gap-2">
          {pricePresets.map((p) => {
            const active = filters.min === p.min && filters.max === p.max;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => set({ min: p.min, max: p.max })}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-start text-sm",
                  active ? "border-ink bg-ink text-white" : "border-sand bg-white"
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={filters.discountOnly}
          onChange={(e) => set({ discountOnly: e.target.checked })}
          className="h-4 w-4 accent-ink"
        />
        <span className="text-sm font-medium">فقط تخفیف‌دار</span>
      </label>

      <button type="button" onClick={resetFilters} className="btn btn-outline w-full text-sm">
        حذف فیلترها
      </button>
    </div>
  );

  const title =
    filters.category !== "all"
      ? availableCategories.find((c) => c.id === filters.category)?.name
      : filters.q
        ? `نتایج «${filters.q}»`
        : "همه محصولات";

  return (
    <div className="container-x mt-6">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="hover:text-ink">خانه</Link>
        <span>/</span>
        <span className="text-ink">محصولات</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {filtered.length.toLocaleString("fa-IR")} محصول
          </p>
        </div>
        <div className="hidden lg:block">
          <label className="sr-only">مرتب‌سازی</label>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value })}
            className="h-11 rounded-xl border border-sand bg-white px-3 text-sm outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.clear}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-sand bg-white px-3 text-xs"
            >
              {c.label}
              <CloseIcon width={12} height={12} />
            </button>
          ))}
        </div>
      )}

      <div className="sticky top-14 z-20 -mx-4 mb-4 flex gap-2 border-y border-sand bg-ivory/95 px-4 py-2 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sand bg-white text-sm font-medium"
        >
          <FilterIcon width={16} height={16} />
          فیلتر
          {chips.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink text-[10px] text-white">
              {chips.length.toLocaleString("fa-IR")}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSortOpen(true)}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sand bg-white text-sm font-medium"
        >
          <SortIcon width={16} height={16} />
          {sortOptions.find((o) => o.id === filters.sort)?.label}
        </button>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-32 rounded-2xl border border-sand bg-white p-5">{filterBody}</div>
        </aside>

        <Sheet
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          title="فیلترها"
          footer={
            <button type="button" onClick={() => setFilterOpen(false)} className="btn btn-primary w-full">
              نمایش {filtered.length.toLocaleString("fa-IR")} محصول
            </button>
          }
        >
          {filterBody}
        </Sheet>

        <Sheet open={sortOpen} onClose={() => setSortOpen(false)} title="مرتب‌سازی">
          <div className="space-y-1">
            {sortOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  set({ sort: o.id });
                  setSortOpen(false);
                }}
                className={cn(
                  "block w-full rounded-xl px-3 py-3 text-start text-sm font-medium",
                  filters.sort === o.id ? "bg-ink text-white" : "hover:bg-cream"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Sheet>

        <div className="flex-1 pb-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sand bg-white">
              <EmptyState
                icon={<SearchIcon width={28} height={28} />}
                title="محصولی پیدا نشد"
                text="فیلترها را تغییر دهید یا همه را حذف کنید."
                action={
                  <button type="button" onClick={resetFilters} className="btn btn-primary">
                    حذف فیلترها
                  </button>
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
