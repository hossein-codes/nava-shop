/** اسکلت لودینگ هنگام تغییر مسیر */
export default function Loading() {
  return (
    <div className="container-x mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-sand/60 bg-white">
          <div className="aspect-[3/4] bg-cream" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 rounded-full bg-sand/70" />
            <div className="h-4 w-4/5 rounded-full bg-sand/70" />
            <div className="h-4 w-1/2 rounded-full bg-sand/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
