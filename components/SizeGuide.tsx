"use client";

import { CloseIcon } from "./Icons";

export default function SizeGuide({
  open,
  onClose,
  title = "نحوه استفاده",
  steps = [],
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  steps?: string[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/45" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-2xl bg-ivory p-5 sm:rounded-2xl sm:p-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-cream"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>
        <ol className="space-y-3">
          {(steps.length ? steps : ["طبق دستور روی جعبه استفاده کنید."]).map((s, i) => (
            <li key={s} className="flex gap-3 rounded-xl border border-sand bg-cream/50 px-4 py-3 text-sm leading-7">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                {(i + 1).toLocaleString("fa-IR")}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-6 text-ink-soft">
          اگر پلمب باز نشده باشد تا ۷ روز امکان بازگشت دارید. برای پوست حساس، اول روی ساعد تست کنید.
        </p>
      </div>
    </div>
  );
}
