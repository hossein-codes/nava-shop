import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";

export const metadata: Metadata = {
  title: "محصولات",
  description: "خرید لوازم آرایشی و مراقبت پوست نوا با فیلتر دسته، نگرانی پوست، برند و قیمت.",
};

interface SearchParams {
  q?: string | string[];
  category?: string | string[];
  size?: string | string[];
  color?: string | string[];
  min?: string | string[];
  max?: string | string[];
  sort?: string | string[];
  discount?: string | string[];
  concern?: string | string[];
  brand?: string | string[];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const rawCat = str(sp.category) ?? "all";
  const category =
    rawCat === "women" ? "makeup" : rawCat === "men" ? "fragrance" : rawCat === "kids" ? "natural" : rawCat;

  return (
    <ProductBrowser
      initial={{
        q: str(sp.q) ?? "",
        category,
        sizes: (str(sp.size) ?? "").split(",").filter(Boolean),
        colors: (str(sp.color) ?? "").split(",").filter(Boolean),
        min: str(sp.min) ? Number(str(sp.min)) : undefined,
        max: str(sp.max) ? Number(str(sp.max)) : undefined,
        sort: str(sp.sort) ?? "newest",
        discountOnly: str(sp.discount) === "1",
        concern: str(sp.concern) ?? "",
        brand: str(sp.brand) ?? "",
      }}
    />
  );
}
