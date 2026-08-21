"use client";

/**
 * جستجوی هوشمند هدر
 * - حالت عادی: شبه‌اینپوت (فقط ظاهر)
 * - با کلیک: تبدیل به اینپوت واقعی + باکس نتایجِ چسبیده به آن
 * - قبل از تایپ: تاریخچه‌ی جستجوها (یا پیشنهادهای پرطرفدار برای اولین بار)
 * - هنگام تایپ: نتایج زنده از محصولات
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCategory, products } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { CloseIcon, HistoryIcon, SearchIcon, SparkleIcon } from "./Icons";

/** جستجوهای پیشنهادی برای کاربران تازه‌وارد */
const POPULAR = ["پیراهن", "کت", "سویشرت", "جین", "کاپشن", "بلوز"];
const HISTORY_KEY = "nava:search-history";
const MAX_HISTORY = 6;

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setActive(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const q = query.trim();
  const results = q
    ? products.filter((p) => {
        const hay = `${p.name} ${getCategory(p.category).name} ${p.tags.join(" ")}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      })
    : [];

  const doSearch = (term: string) => {
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
    setActive(false);
    router.push(`/products?q=${encodeURIComponent(final)}`);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", compact ? "w-full" : "hidden w-full max-w-xl flex-1 md:block")}
    >
      {/* ---------- جعبه جستجو ---------- */}
      <div
        role="searchbox"
        tabIndex={0}
        onClick={() => {
          setActive(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className={cn(
          "flex h-12 cursor-text items-center gap-2.5 rounded-2xl border-2 bg-white px-3.5 transition-all duration-200",
          active
            ? "border-clay shadow-[0_0_0_4px_rgb(255_90_30/0.15)]"
            : "border-ink/25 hover:border-clay/60"
        )}
      >
        <SearchIcon width={20} height={20} className={cn("shrink-0 text-ink", active && "text-clay")} />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
          placeholder="جستجو در محصولات..."
          className="w-full bg-transparent text-sm font-bold text-ink outline-none placeholder:font-semibold placeholder:text-[#475069]"
        />

        {query && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن"
            className="shrink-0 text-ink-soft transition hover:text-clay"
          >
            <CloseIcon width={16} height={16} />
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            doSearch(query);
          }}
          className="shrink-0 rounded-xl bg-ink px-4 py-2 text-xs font-black text-white transition hover:bg-clay"
        >
          جستجو
        </button>
      </div>

      {/* ---------- باکس نتایج (چسبیده به جستجو) ---------- */}
      {active && (
        <div className="animate-dropdown absolute inset-x-0 top-[calc(100%+0.55rem)] z-50 overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-2xl shadow-ink/15">
          {q ? (
            <>
              <div className="p-2">
                {results.length > 0 ? (
                  results.slice(0, 5).map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={() => setActive(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-ivory"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-11 w-9 shrink-0 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">
                        {p.name}
                      </span>
                      <span className="shrink-0 text-xs font-black text-clay">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm font-bold text-ink-soft">
                      محصولی مطابق «{q}» پیدا نشد
                    </p>
                  </div>
                )}
              </div>
              <div className="border-t border-sand/50 p-2">
                <button
                  onClick={() => doSearch(q)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ivory px-3 py-2.5 text-xs font-black text-ink transition hover:bg-cream"
                >
                  <SearchIcon width={14} height={14} />
                  مشاهده همه نتایج «{q}»
                </button>
              </div>
            </>
          ) : (
            <div className="p-3">
              {history.length > 0 ? (
                <>
                  <div className="mb-2 flex items-center justify-between px-2">
                    <span className="flex items-center gap-1.5 text-xs font-black text-ink-soft">
                      <HistoryIcon width={14} height={14} />
                      جستجوهای اخیر
                    </span>
                    <button
                      onClick={clearHistory}
                      className="text-[11px] font-black text-clay transition hover:underline"
                    >
                      پاک کردن
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((h) => (
                      <button
                        key={h}
                        onClick={() => doSearch(h)}
                        className="rounded-full border border-ink/15 bg-ivory px-3.5 py-1.5 text-xs font-bold text-ink transition hover:border-clay hover:text-clay"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-2 flex items-center gap-1.5 px-2 text-xs font-black text-ink-soft">
                    <SparkleIcon width={14} height={14} className="text-clay" />
                    جستجوهای پرطرفدار
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((h) => (
                      <button
                        key={h}
                        onClick={() => doSearch(h)}
                        className="rounded-full border border-ink/15 bg-ivory px-3.5 py-1.5 text-xs font-bold text-ink transition hover:border-clay hover:text-clay"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
