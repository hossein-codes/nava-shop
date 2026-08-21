import OrderSuccess from "@/components/OrderSuccess";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string | string[] }>;
}) {
  const sp = await searchParams;
  const order = Array.isArray(sp.order) ? sp.order[0] : sp.order;
  return <OrderSuccess orderId={order ?? ""} />;
}
