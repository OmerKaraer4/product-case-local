const OUNCE_TO_GRAM = 31.1034768;

// simple 5 min cache
let cached = { value: 0, at: 0 };
const CACHE_MS = 5 * 60 * 1000;

// Optional provider via env (GOLDAPI_IO) with GOLDAPI_IO_KEY
async function fetchFromGoldApiIo(): Promise<number> {
  const key = process.env.GOLDAPI_IO_KEY;
  if (!key) throw new Error("GOLDAPI_IO_KEY not set");
  const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
    headers: {
      "x-access-token": key,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("goldapi.io response not ok");
  const data = await res.json();
  const direct = Number(data.price_gram_24k ?? data.price_gram);
  if (!Number.isNaN(direct) && direct > 0) return direct;
  const ounce = Number(data.price ?? data.ask ?? data.bid);
  if (!ounce) throw new Error("no ounce price");
  return ounce / OUNCE_TO_GRAM;
}

export async function getGoldPricePerGramUSD(): Promise<number> {
  const now = Date.now();
  if (cached.value && now - cached.at < CACHE_MS) return cached.value;

  try {
    let perGram = 0;
    if ((process.env.GOLD_PROVIDER ?? "GOLDAPI_IO") === "GOLDAPI_IO") {
      perGram = await fetchFromGoldApiIo();
    } else {
      throw new Error("unsupported provider");
    }
    perGram = Math.round(perGram * 100) / 100;
    cached = { value: perGram, at: now };
    return perGram;
  } catch {
    const fallback = 80; // USD/gram fallback
    cached = { value: fallback, at: now };
    return fallback;
  }
}
