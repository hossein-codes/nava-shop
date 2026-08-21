import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductShelf({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mt-10 lg:mt-14">
      <div className="container-x mb-4 flex items-center justify-between lg:mb-6">
        <h2 className="text-base font-semibold lg:text-xl">{title}</h2>
        <Link href={href} className="text-xs font-medium text-ink-soft hover:text-ink lg:text-sm">
          مشاهده همه
        </Link>
      </div>
      <div className="container-x grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.slice(0, 6).map((p) => (
          <ProductCard key={p.id} product={p} compact />
        ))}
      </div>
    </section>
  );
}
