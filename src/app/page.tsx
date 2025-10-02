"use client";

import { useEffect, useState } from "react";
import ProductsCarousel from "@/components/ProductsCarousel";
import type { Product } from "@/components/ProductCard";

export default function Page() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setProducts(data);
      } catch (e: any) {
        setErr(e.message || "Error");
      }
    })();
  }, []);

  if (err) return <main className="p-6">Hata: {err}</main>;
  if (!products) return <main className="p-6">Yükleniyor…</main>;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <ProductsCarousel products={products} />
    </main>
  );
}
