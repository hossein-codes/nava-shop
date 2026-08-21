"use client";

import { CloseIcon } from "./Icons";

const rows = [
  { size: "S", chest: "۸۸–۹۲", waist: "۷۰–۷۴" },
  { size: "M", chest: "۹۲–۹۶", waist: "۷۴–۷۸" },
  { size: "L", chest: "۹۶–۱۰۲", waist: "۷۸–۸۴" },
  { size: "XL", chest: "۱۰۲–۱۰۸", waist: "۸۴–۹۰" },
  { size: "XXL", chest: "۱۰۸–۱۱۴", waist: "۹۰–۹۶" },
];

export default function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/45" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-2xl bg-white p-5 sm:rounded-2xl sm:p-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">راهنمای سایز</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-cream"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>
        <p className="mb-4 text-sm leading-7 text-ink-soft">
          اندازه‌ها به سانتی‌متر است. اگر بین دو سایز هستید، سایز بزرگ‌تر را انتخاب کنید. امکان تعویض سایز تا ۷ روز وجود دارد.
        </p>
        <div className="overflow-hidden rounded-xl border border-sand">
          <table className="w-full text-center text-sm">
            <thead className="bg-ivory text-ink-soft">
              <tr>
                <th className="px-3 py-3 font-medium">سایز</th>
                <th className="px-3 py-3 font-medium">سینه</th>
                <th className="px-3 py-3 font-medium">کمر</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-t border-sand">
                  <td className="px-3 py-3 font-semibold">{r.size}</td>
                  <td className="px-3 py-3 tabular-nums">{r.chest}</td>
                  <td className="px-3 py-3 tabular-nums">{r.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
