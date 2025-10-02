"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import ProductCard, { Product } from "./ProductCard";

export default function ProductsCarousel({ products }: { products: Product[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((p) => (
            <div
              key={p.name}
              className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 p-3"
            >
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Prev"
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow"
      >
        ›
      </button>
    </div>
  );
}
