export default function Loading() {
  return (
    <div className="container-x mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-5 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] rounded-2xl bg-cream" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-2/3 rounded bg-sand/80" />
            <div className="h-3 w-1/3 rounded bg-sand/80" />
          </div>
        </div>
      ))}
    </div>
  );
}
