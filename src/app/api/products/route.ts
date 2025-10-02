import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getGoldPricePerGramUSD } from "@/lib/gold";

type Images = { gold: string; silver: string; rose: string };
type RawProduct = { name: string; popularityScore: number; weight: number; images: Images };

function toOutOf5(pct: number): number {
  return Math.round(((pct / 100) * 5) * 10) / 10; // 1 decimal
}

function readProducts(): RawProduct[] {
  const file = path.join(process.cwd(), "src", "data", "products.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  const minPop   = url.searchParams.get("minPopularity");
  const maxPop   = url.searchParams.get("maxPopularity");

  const gold = await getGoldPricePerGramUSD();
  const base = readProducts();

  let products = base.map((p) => {
    const priceUsd = (p.popularityScore + 1) * p.weight * gold;
    return {
      ...p,
      popularityOutOf5: toOutOf5(p.popularityScore),
      goldPricePerGramUsd: Math.round(gold * 100) / 100,
      priceUsd: Math.round(priceUsd * 100) / 100
    };
  });

  if (minPop) products = products.filter((p) => p.popularityScore >= Number(minPop));
  if (maxPop) products = products.filter((p) => p.popularityScore <= Number(maxPop));
  if (minPrice) products = products.filter((p) => p.priceUsd >= Number(minPrice));
  if (maxPrice) products = products.filter((p) => p.priceUsd <= Number(maxPrice));

  return NextResponse.json(products);
}
