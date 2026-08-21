"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const list = images.length ? images : [];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = list[active] ?? list[0];

  if (!current) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ivory"
      >
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </button>

      {list.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2",
                i === active ? "border-ink" : "border-transparent"
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setZoom(false)}
        >
          <Image
            src={current}
            alt={alt}
            width={1200}
            height={1600}
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
