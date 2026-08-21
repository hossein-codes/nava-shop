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
    <div className="grid gap-10 p-7 sm:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.14em] text-ink/40">
            {history.length > 0 ? "آخرین جستجوها" : "جستجوهای محبوب"}
          </p>
          {history.length > 0 && (
            <button type="button" onClick={onClear} className="text-[11px] text-ink/40 hover:text-ink">
              پاک کردن
            </button>
          )}
        </div>
        <ul>
          {terms.map((h) => (
            <li key={h}>
              <button
                type="button"
                onClick={() => onSearch(h)}
                className="flex h-9 w-full items-center text-[13px] text-ink/80 hover:text-ink"
              >
                {h}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-4 text-[11px] font-medium tracking-[0.14em] text-ink/40">پیشنهادها</p>
        <ul className="space-y-3">
          {popularProducts.map((p) => (
            <li key={p.id}>
              <Link href={`/products/${p.slug}`} onClick={onPick} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt="" className="h-16 w-12 object-cover" />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] text-ink">{p.name}</span>
                  <span className="mt-0.5 block text-[12px] text-ink/50">{formatPrice(p.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
    <div className="max-h-[min(28rem,70vh)] overflow-y-auto py-2">
      {completions.length > 0 && (
        <div className="px-6 py-2">
          {completions.slice(0, 5).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSearch(c)}
              className="flex h-10 w-full items-center gap-3 text-start text-[13px] text-ink/80 hover:text-ink"
            >
              <SearchIcon width={14} height={14} className="text-ink/35" strokeWidth={1.6} />
              {c}
            </button>
          ))}
        </div>
      )}
      {relatedCats.length > 0 && (
        <div className="px-6 py-3">
          <p className="mb-2 text-[11px] tracking-[0.14em] text-ink/40">دسته</p>
          {relatedCats.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              onClick={onPick}
              className="flex h-9 items-center text-[13px] text-ink/80 hover:text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
      <div className="px-6 py-2">
        {results.length > 0 ? (
          results.slice(0, 5).map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onPick}
              className="flex items-center gap-3 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-16 w-12 object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px]">{p.name}</span>
                <span className="text-[12px] text-ink/50">{formatPrice(p.price)}</span>
              </span>
            </Link>
          ))
        ) : (
          <p className="py-10 text-center text-[13px] text-ink/50">نتیجه‌ای برای «{q}» نیست</p>
        )}
      </div>
      {results.length > 0 && (
        <div className="border-t border-[#eee] px-6">
          <button
            type="button"
            onClick={onSeeAll}
            className="flex h-12 w-full items-center text-[13px] font-medium"
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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setActive(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const close = () => setActive(false);

  return (
    <div ref={rootRef} className="relative hidden lg:block">
      <div
        className={cn(
          "flex h-9 items-center gap-2.5 border-b bg-transparent transition-[width,border-color] duration-200 ease-out",
          active ? "w-[26rem] border-ink" : "w-[13.5rem] border-[#d8d3cc] hover:border-ink/50"
        )}
      >
        <SearchIcon width={15} height={15} className="shrink-0 text-ink/45" strokeWidth={1.6} />
        <input
          ref={inputRef}
          value={s.query}
          onChange={(e) => s.setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onKeyDown={(e) => e.key === "Enter" && s.doSearch(s.query, close)}
          placeholder="جستجو در نوا"
          className="w-full bg-transparent text-[13px] tracking-wide outline-none placeholder:text-ink/35"
        />
        {s.query && (
          <button
            type="button"
            onClick={() => {
              s.setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن"
            className="text-ink/40 hover:text-ink"
          >
            <CloseIcon width={14} height={14} />
          </button>
        )}
      </div>

      {active && (
        <div className="animate-dropdown absolute start-0 top-[calc(100%+1rem)] z-50 w-[34rem] border border-[#eee] bg-white shadow-[0_20px_50px_rgb(26_24_22_/_0.08)]">
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
      <div className="flex items-center gap-1 border-b border-[#eee] px-2 py-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="بازگشت"
          className="flex h-11 w-11 items-center justify-center"
        >
          <ArrowIcon width={18} height={18} className="rotate-180" strokeWidth={1.6} />
        </button>
        <div className="flex h-11 flex-1 items-center gap-2 border-b border-ink">
          <SearchIcon width={16} height={16} className="text-ink/40" strokeWidth={1.6} />
          <input
            ref={inputRef}
            value={s.query}
            onChange={(e) => s.setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && s.doSearch(s.query, onClose)}
            placeholder="جستجو در نوا"
            className="w-full bg-transparent text-[15px] outline-none"
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
