import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";

export const metadata: Metadata = {
  title: "محصولات",
  description: "همه محصولات فروشگاه پوشاک نوا با امکان فیلتر بر اساس دسته، سایز، رنگ و قیمت.",
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
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  return (
    <ProductBrowser
      initial={{
        q: str(sp.q) ?? "",
        category: str(sp.category) ?? "all",
        sizes: (str(sp.size) ?? "").split(",").filter(Boolean),
        colors: (str(sp.color) ?? "").split(",").filter(Boolean),
        min: str(sp.min) ? Number(str(sp.min)) : undefined,
        max: str(sp.max) ? Number(str(sp.max)) : undefined,
        sort: str(sp.sort) ?? "newest",
        discountOnly: str(sp.discount) === "1",
      }}
    />
  );
}
