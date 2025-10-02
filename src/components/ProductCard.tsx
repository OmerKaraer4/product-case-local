"use client";
import { useState } from "react";

type Images = { gold: string; silver: string; rose: string };

export type Product = {
  name: string;
  priceUsd: number;
  popularityOutOf5: number;
  images: Images;
};

export default function ProductCard({ name, priceUsd, popularityOutOf5, images }: Product) {
  const [color, setColor] = useState<keyof Images>("gold");

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4 flex flex-col gap-3">
      <div className="relative">
        <img
          src={images[color]}
          alt={`${name} - ${color}`}
          className="w-full h-auto rounded-xl"
        />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm opacity-70">{popularityOutOf5.toFixed(1)} / 5</p>
        </div>
        <div className="text-lg font-bold">${priceUsd.toFixed(2)}</div>
      </div>

      <div className="flex gap-2">
        {(["gold", "silver", "rose"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`px-3 py-1 rounded-full border text-sm capitalize ${
              color === c ? "bg-black text-white" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
