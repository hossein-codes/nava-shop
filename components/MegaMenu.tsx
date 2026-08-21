import Link from "next/link";
import { categories } from "@/lib/products";
import {
  ArrowIcon,
  ChevronDownIcon,
  MenuIcon,
  SparkleIcon,
} from "./Icons";

/** زیردسته‌های هر دسته برای مگامنو */
const subLinks: Record<string, string[]> = {
  women: ["پیراهن و بلوز", "کت و پالتو", "شلوار و جین", "مجلسی"],
  men: ["کت‌وشلوار", "پیراهن", "تی‌شرت و سویشرت", "شلوار"],
  kids: ["دخترانه", "پسرانه", "ست نوزاد", "کاپشن"],
  accessories: ["کیف", "کفش", "عینک", "شال و کلاه"],
};

/** مگامنوی دسته‌بندی‌ها — با هاور باز می‌شود */
export default function MegaMenu() {
  return (
    <div className="group relative">
      {/* دکمه مگامنو */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-ink transition group-hover:bg-ink group-hover:text-white"
      >
        <MenuIcon width={18} height={18} />
        دسته‌بندی‌ها
        <ChevronDownIcon
          width={14}
          height={14}
          className="transition-transform duration-300 group-hover:rotate-180"
        />
      </button>

      {/* پنل مگامنو */}
      <div className="invisible absolute start-0 top-full z-40 w-[52rem] pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-3xl border border-sand/60 bg-white shadow-2xl shadow-ink/15">
          {/* ستون دسته‌ها */}
          <div className="grid grid-cols-4 gap-3 p-6">
            {categories.map((cat) => (
              <div key={cat.id} className="rounded-2xl p-3 transition hover:bg-ivory">
                <Link
                  href={`/products?category=${cat.id}`}
                  className="flex items-center justify-between border-b-2 border-clay/20 pb-2.5"
                >
                  <span className="text-base font-black text-ink">{cat.name}</span>
                  <ArrowIcon width={15} height={15} className="text-clay" />
                </Link>
                <ul className="mt-3 space-y-1">
                  {(subLinks[cat.id] || []).map((label) => (
                    <li key={label}>
                      <Link
                        href={`/products?category=${cat.id}`}
                        className="block rounded-lg px-2 py-1.5 text-[13px] font-semibold text-ink-soft transition hover:bg-white hover:text-clay"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="mt-1 block rounded-lg bg-ivory px-2 py-1.5 text-[13px] font-black text-clay transition hover:bg-cream"
                    >
                      مشاهده همه {cat.name}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* بنر پایین */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-dark px-6 py-4 text-ivory">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-clay text-white">
                <SparkleIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-black">فروش ویژه پاییز — تا ۲۰٪ تخفیف</p>
                <p className="text-xs font-medium text-ivory/60">
                  ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/products?discount=1"
                className="rounded-xl bg-clay px-4 py-2.5 text-xs font-black text-white transition hover:bg-clay-dark"
              >
                مشاهده تخفیف‌ها
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-ivory/30 px-4 py-2.5 text-xs font-black text-ivory transition hover:bg-ivory/10"
              >
                همه محصولات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
