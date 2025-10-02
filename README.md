# Product Case

Full-stack ürün listeleme uygulaması (Next.js 14 + TypeScript + Tailwind).

## Çalıştırma

```bash
npm install
npm run dev
```

- Uygulama: http://localhost:3000
- API: http://localhost:3000/api/products

## Özellikler
- Ürünler `src/data/products.json` içinden okunur.
- Fiyat formülü: `(popularityScore + 1) * weight * goldPricePerGramUsd`.
- Altın gram fiyatı: `src/lib/gold.ts` (GoldAPI.io + fallback).
- Popülerlik: 0–100 → 5 üzerinden **1 ondalık**.
- Karusel: ok + sürükleme (desktop + mobil).
- Renk seçimi görseli değiştirir.
- Bonus filtreler: `minPrice`, `maxPrice`, `minPopularity`, `maxPopularity`.

## Gerçek altın fiyatı
Proje köküne `.env.local` ekleyin:

```
GOLD_PROVIDER=GOLDAPI_IO
GOLDAPI_IO_KEY=BURAYA_API_ANAHTARIN
```

## Görseller
Tüm görseller `public/images/...` klasöründe yerel dosyalar olarak bulunur.
