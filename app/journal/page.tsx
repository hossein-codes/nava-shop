import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journal } from "@/lib/beauty";

export const metadata: Metadata = {
  title: "مجله زیبایی",
  description: "آموزش روتین پوست، راهنمای خرید و نکات آرایش از نوا لَب.",
};

export default function JournalPage() {
  return (
    <div className="container-x mt-8 pb-16">
      <p className="kicker">JOURNAL</p>
      <h1 className="section-title mt-2">مجله زیبایی نوا</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
        آموزش کوتاه، بدون ادعاهای معجزه. برای اینکه کمتر بخرید و درست استفاده کنید.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {journal.map((a) => (
          <Link
            key={a.slug}
            href={`/journal/${a.slug}`}
            className="overflow-hidden rounded-2xl border border-sand bg-ivory"
          >
            <div className="relative aspect-[16/10] bg-cream">
              <Image src={a.image} alt={a.title} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold text-clay">
                {a.kicker} · {a.minutes.toLocaleString("fa-IR")} دقیقه
              </p>
              <h2 className="mt-2 text-lg font-semibold">{a.title}</h2>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
