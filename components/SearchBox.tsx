"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, getCategory, products } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowIcon, CloseIcon, HistoryIcon, SearchIcon } from "./Icons";

const HISTORY_KEY = "nava:search-history";
const MAX_HISTORY = 6;

const POPULAR = ["لباس زنانه", "لباس مردانه", "کفش", "کیف", "تخفیف‌ها", "کالکشن جدید"];

const POPULAR_HREFS: Record<string, string> = {
  "لباس زنانه": "/products?category=women",
  "لباس مردانه": "/products?category=men",
  کفش: "/products?q=%DA%A9%D9%81%D8%B4",
  کیف: "/products?q=%DA%A9%DB%8C%D9%81",
  "تخفیف‌ها": "/products?discount=1",
  "کالکشن جدید": "/products",
};

const COMPLETIONS: { trigger: string; items: string[] }[] = [
  { trigger: "کت", items: ["کت مردانه", "کت زنانه", "کت پاییزه"] },
  { trigger: "پیراهن", items: ["پیراهن مردانه", "پیراهن مجلسی", "پیراهن رسمی"] },
  { trigger: "شلوار", items: ["شلوار جین", "شلوار بچگانه"] },
  { trigger: "سویشرت", items: ["سویشرت مردانه", "سویشرت کژوال"] },
  { trigger: "کاپشن", items: ["کاپشن بچگانه", "کاپشن پاییزه"] },
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
          c.name.includes(q) ||
          products.some(
            (p) =>
              p.category === c.id &&
              `${p.name} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())
          )
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
      // ignore
    }
    setQuery("");
    onDone?.();
    const mapped = POPULAR_HREFS[final];
    router.push(mapped ?? `/products?q=${encodeURIComponent(final)}`);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
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
  const chips = history.length > 0 ? history : POPULAR;
  return (
    <div className="grid gap-6 p-5 sm:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-soft">
            <HistoryIcon width={14} height={14} />
            {history.length > 0 ? "آخرین جستجوها" : "جستجوهای محبوب"}
          </span>
          {history.length > 0 && (
            <button type="button" onClick={onClear} className="text-[11px] text-ink-soft hover:text-ink">
              پاک کردن
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onSearch(h)}
              className="rounded-full bg-[#f6f4f0] px-3.5 py-2 text-xs font-medium text-ink hover:bg-sand"
            >
              {h}
            </button>
          ))}
        </div>
        <p className="mb-2 mt-5 text-[11px] font-semibold text-ink-soft">دسته‌ها</p>
        <div className="flex flex-col">
          {categories
            .filter((c) => products.some((p) => p.category === c.id))
            .map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                onClick={onPick}
                className="rounded-lg px-1 py-2 text-[13px] text-ink hover:bg-[#f6f4f0]"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-semibold text-ink-soft">محصولات محبوب</p>
        <div className="space-y-1">
          {popularProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onPick}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#f6f4f0]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-14 w-11 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{p.name}</span>
                <span className="text-xs text-ink-soft">{formatPrice(p.price)}</span>
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
    <div className="max-h-[min(28rem,70vh)] overflow-y-auto">
      {completions.length > 0 && (
        <div className="border-b border-sand px-2 py-2">
          {completions.slice(0, 5).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSearch(c)}
              className="flex h-11 w-full items-center gap-2 rounded-xl px-3 text-start text-[13px] hover:bg-[#f6f4f0]"
            >
              <SearchIcon width={14} height={14} className="text-ink-soft" />
              {c}
            </button>
          ))}
        </div>
      )}
      {relatedCats.length > 0 && (
        <div className="border-b border-sand px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold text-ink-soft">دسته‌ها</p>
          <div className="flex flex-wrap gap-2">
            {relatedCats.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                onClick={onPick}
                className="rounded-full border border-sand px-3 py-1.5 text-xs hover:border-ink"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="p-2">
        {results.length > 0 ? (
          results.slice(0, 5).map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onPick}
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#f6f4f0]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-14 w-11 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{p.name}</span>
                <span className="text-xs text-ink-soft">{getCategory(p.category).name}</span>
              </span>
              <span className="text-xs font-semibold tabular-nums">{formatPrice(p.price)}</span>
            </Link>
          ))
        ) : (
          <p className="px-3 py-8 text-center text-sm text-ink-soft">نتیجه‌ای برای «{q}» نیست</p>
        )}
      </div>
      {results.length > 0 && (
        <div className="border-t border-sand p-2">
          <button
            type="button"
            onClick={onSeeAll}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-medium hover:bg-[#f6f4f0]"
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
          "flex h-10 items-center gap-2 rounded-full border bg-[#f6f4f0] px-3.5 transition-[width,background-color,border-color,box-shadow] duration-200 ease-out",
          active
            ? "w-[28rem] border-sand bg-white shadow-[0_8px_24px_rgb(26_24_22_/_0.06)]"
            : "w-48 border-transparent hover:bg-[#efece6]"
        )}
      >
        <SearchIcon width={16} height={16} className="shrink-0 text-ink-soft" />
        <input
          ref={inputRef}
          value={s.query}
          onChange={(e) => s.setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onKeyDown={(e) => e.key === "Enter" && s.doSearch(s.query, close)}
          placeholder="جستجو در نوا…"
          className="w-full bg-transparent text-[13px] outline-none placeholder:text-ink-soft/70"
        />
        {s.query && (
          <button
            type="button"
            onClick={() => {
              s.setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن"
            className="text-ink-soft hover:text-ink"
          >
            <CloseIcon width={14} height={14} />
          </button>
        )}
      </div>

      {active && (
        <div className="animate-dropdown absolute start-0 top-[calc(100%+0.6rem)] z-50 w-[36rem] overflow-hidden rounded-2xl border border-sand bg-white shadow-[0_16px_48px_rgb(26_24_22_/_0.12)]">
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
      <div className="flex items-center gap-1 border-b border-sand px-2 py-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="بازگشت"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink"
        >
          <ArrowIcon width={20} height={20} className="rotate-180" />
        </button>
        <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-[#f6f4f0] px-3.5">
          <SearchIcon width={18} height={18} className="text-ink-soft" />
          <input
            ref={inputRef}
            value={s.query}
            onChange={(e) => s.setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && s.doSearch(s.query, onClose)}
            placeholder="جستجو در نوا…"
            className="w-full bg-transparent text-sm outline-none"
          />
          {s.query && (
            <button type="button" onClick={() => s.setQuery("")} aria-label="پاک کردن" className="text-ink-soft">
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
