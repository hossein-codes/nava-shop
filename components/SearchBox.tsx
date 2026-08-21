"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, getCategory, products } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowIcon, CloseIcon, SearchIcon } from "./Icons";

const HISTORY_KEY = "nava:search-history";
const MAX_HISTORY = 6;
const POPULAR = ["لباس زنانه", "لباس مردانه", "کت", "پیراهن", "تخفیف‌ها", "کالکشن جدید"];
const POPULAR_HREFS: Record<string, string> = {
  "لباس زنانه": "/products?category=women",
  "لباس مردانه": "/products?category=men",
  کت: "/products?q=%DA%A9%D8%AA",
  پیراهن: "/products?q=%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86",
  "تخفیف‌ها": "/products?discount=1",
  "کالکشن جدید": "/products",
};
const COMPLETIONS: { trigger: string; items: string[] }[] = [
  { trigger: "کت", items: ["کت مردانه", "کت زنانه", "کت پاییزه"] },
  { trigger: "پیراهن", items: ["پیراهن مردانه", "پیراهن مجلسی", "پیراهن رسمی"] },
  { trigger: "شلوار", items: ["شلوار جین", "شلوار بچگانه"] },
  { trigger: "سویشرت", items: ["سویشرت مردانه", "سویشرت کژوال"] },
  { trigger: "کاپشن", items: ["کاپشن بچگانه"] },
  { trigger: "لباس", items: ["لباس زنانه", "لباس مردانه", "لباس بچگانه"] },
];

function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const q = query.trim();
  const completions = q
    ? COMPLETIONS.filter((c) => c.trigger.startsWith(q) || q.startsWith(c.trigger)).flatMap((c) =>
        c.items.filter((i) => i.includes(q) || q.length <= c.trigger.length)
      )
    : [];
  const relatedCats = q
    ? categories.filter(
        (c) =>
          products.some((p) => p.category === c.id) &&
          (c.name.includes(q) ||
            products.some(
              (p) =>
                p.category === c.id &&
                `${p.name} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())
            ))
      )
    : [];
  const results = q
    ? products.filter((p) => {
        const hay = `${p.name} ${getCategory(p.category).name} ${p.tags.join(" ")}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      })
    : [];
  const popularProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const doSearch = (term: string, onDone?: () => void) => {
    const final = term.trim();
    if (!final) return;
    const next = [final, ...history.filter((h) => h !== final)].slice(0, MAX_HISTORY);
    setHistory(next);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setQuery("");
    onDone?.();
    router.push(POPULAR_HREFS[final] ?? `/products?q=${encodeURIComponent(final)}`);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
  };

  return {
    query,
    setQuery,
    q,
    completions,
    relatedCats,
    results,
    history,
    popularProducts,
    doSearch,
    clearHistory,
  };
}

function IdlePanel({
  history,
  popularProducts,
  onSearch,
  onClear,
  onPick,
}: {
  history: string[];
  popularProducts: typeof products;
  onSearch: (t: string) => void;
  onClear: () => void;
  onPick: () => void;
}) {
  const terms = history.length > 0 ? history : POPULAR;
  return (
    <div className="grid gap-8 p-6 sm:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-ink/50">
            {history.length > 0 ? "آخرین جستجوها" : "جستجوهای محبوب"}
          </p>
          {history.length > 0 && (
            <button type="button" onClick={onClear} className="text-xs text-clay">
              پاک کردن
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {terms.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onSearch(h)}
              className="rounded-lg bg-cream px-3 py-2 text-[13px] text-ink transition hover:bg-sand"
            >
              {h}
            </button>
          ))}
        </div>
        <p className="mb-2 mt-5 text-xs font-semibold text-ink/50">دسته‌ها</p>
        <div className="flex flex-col gap-0.5">
          {categories
            .filter((c) => products.some((p) => p.category === c.id))
            .map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                onClick={onPick}
                className="rounded-lg px-2 py-2 text-[13px] font-medium hover:bg-cream"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold text-ink/50">پیشنهاد نوا</p>
        <div className="space-y-1">
          {popularProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onPick}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-[4.25rem] w-14 rounded-lg object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{p.name}</span>
                <span className="mt-0.5 block text-[13px] font-semibold text-ink">
                  {formatPrice(p.price)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypedPanel({
  q,
  completions,
  relatedCats,
  results,
  onSearch,
  onPick,
  onSeeAll,
}: {
  q: string;
  completions: string[];
  relatedCats: typeof categories;
  results: typeof products;
  onSearch: (t: string) => void;
  onPick: () => void;
  onSeeAll: () => void;
}) {
  return (
    <div className="max-h-[min(32rem,72vh)] overflow-y-auto">
      {completions.length > 0 && (
        <div className="border-b border-sand px-3 py-2">
          {completions.slice(0, 5).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSearch(c)}
              className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-start text-[13px] hover:bg-cream"
            >
              <SearchIcon width={16} height={16} className="text-ink/40" />
              <span>
                {c.split(q)[0]}
                <b className="font-semibold">{q}</b>
                {c.split(q).slice(1).join(q)}
              </span>
            </button>
          ))}
        </div>
      )}
      {relatedCats.length > 0 && (
        <div className="flex gap-2 border-b border-sand px-5 py-3">
          {relatedCats.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              onClick={onPick}
              className="rounded-lg bg-cream px-3 py-1.5 text-xs font-medium"
            >
              در {c.name}
            </Link>
          ))}
        </div>
      )}
      <div className="p-3">
        {results.length > 0 ? (
          results.slice(0, 5).map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onPick}
              className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-cream"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-[4.25rem] w-14 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{p.name}</span>
                <span className="text-xs text-ink/50">{getCategory(p.category).name}</span>
              </span>
              <span className="text-[13px] font-semibold text-ink">{formatPrice(p.price)}</span>
            </Link>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-ink/50">نتیجه‌ای برای «{q}» نیست</p>
        )}
      </div>
      {results.length > 0 && (
        <div className="border-t border-sand p-3">
          <button
            type="button"
            onClick={onSeeAll}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-ink text-[13px] font-semibold text-white"
          >
            مشاهده همه نتایج «{q}»
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchBox() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const s = useSearch();
  const close = () => setActive(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setActive(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className="relative hidden min-w-0 flex-1 lg:block">
      <div
        className={cn(
          "flex h-12 max-w-2xl items-center gap-3 rounded-xl border px-4 transition duration-200",
          active
            ? "border-ink bg-ivory shadow-[0_8px_28px_rgb(28_20_16_/_0.07)]"
            : "border-sand bg-cream hover:border-sand"
        )}
      >
        <SearchIcon width={20} height={20} className="shrink-0 text-ink/55" />
        <input
          ref={inputRef}
          value={s.query}
          onChange={(e) => s.setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "Enter") s.doSearch(s.query, close);
          }}
          placeholder="جستجوی لباس، کت، پیراهن یا دسته…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
        />
        {s.query ? (
          <button
            type="button"
            onClick={() => {
              s.setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن"
            className="text-ink/40 hover:text-ink"
          >
            <CloseIcon width={16} height={16} />
          </button>
        ) : (
          <span className="hidden shrink-0 rounded-md bg-white px-2 py-1 text-[11px] text-ink/35 xl:inline">
            Enter
          </span>
        )}
      </div>

      {active && (
        <div className="animate-dropdown absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 max-w-2xl overflow-hidden rounded-2xl border border-sand bg-ivory shadow-[0_18px_48px_rgb(28_20_16_/_0.14)]">
          {s.q ? (
            <TypedPanel
              q={s.q}
              completions={s.completions}
              relatedCats={s.relatedCats}
              results={s.results}
              onSearch={(t) => s.doSearch(t, close)}
              onPick={close}
              onSeeAll={() => s.doSearch(s.q, close)}
            />
          ) : (
            <IdlePanel
              history={s.history}
              popularProducts={s.popularProducts}
              onSearch={(t) => s.doSearch(t, close)}
              onClear={s.clearHistory}
              onPick={close}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function MobileSearchScreen({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const s = useSearch();

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[65] flex flex-col bg-white lg:hidden">
      <div className="flex items-center gap-2 border-b border-sand px-3 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="بازگشت"
          className="flex h-12 w-12 items-center justify-center rounded-xl hover:bg-cream"
        >
          <ArrowIcon width={20} height={20} className="rotate-180" />
        </button>
        <div className="flex h-12 flex-1 items-center gap-2 rounded-xl border border-ink bg-white px-3">
          <SearchIcon width={18} height={18} className="text-ink/50" />
          <input
            ref={inputRef}
            value={s.query}
            onChange={(e) => s.setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && s.doSearch(s.query, onClose)}
            placeholder="جستجو در فروشگاه نوا"
            className="w-full bg-transparent text-sm outline-none"
          />
          {s.query && (
            <button type="button" onClick={() => s.setQuery("")} aria-label="پاک کردن">
              <CloseIcon width={16} height={16} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {s.q ? (
          <TypedPanel
            q={s.q}
            completions={s.completions}
            relatedCats={s.relatedCats}
            results={s.results}
            onSearch={(t) => s.doSearch(t, onClose)}
            onPick={onClose}
            onSeeAll={() => s.doSearch(s.q, onClose)}
          />
        ) : (
          <IdlePanel
            history={s.history}
            popularProducts={s.popularProducts}
            onSearch={(t) => s.doSearch(t, onClose)}
            onClear={s.clearHistory}
            onPick={onClose}
          />
        )}
      </div>
    </div>
  );
}
