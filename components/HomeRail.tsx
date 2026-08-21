"use client";

import { useRef, type ReactNode } from "react";
import { ArrowIcon } from "./Icons";

export default function HomeRail({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="قبلی"
        onClick={() => scroll(220)}
        className="absolute start-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sand bg-white text-ink shadow-sm lg:flex"
      >
        <ArrowIcon width={16} height={16} className="rotate-180" />
      </button>
      <div ref={ref} className="home-rail container-x lg:px-14" aria-label={ariaLabel}>
        {children}
      </div>
      <button
        type="button"
        aria-label="بعدی"
        onClick={() => scroll(-220)}
        className="absolute end-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sand bg-white text-ink shadow-sm lg:flex"
      >
        <ArrowIcon width={16} height={16} />
      </button>
    </div>
  );
}
