"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTop10Stocks } from "@/lib/api";
import { ScoreGauge } from "@/components/stocks/ScoreGauge";
import { AIInsightPanel } from "@/components/stocks/AIInsightPanel";
import { PriceMiniChart } from "@/components/stocks/PriceMiniChart";
import type { Stock } from "@/types/stock";

export default function StockDetailsPage() {
  const params = useParams<{ symbol: string }>();
  const symbol = (params?.symbol || "").toUpperCase();

  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const list = await fetchTop10Stocks();
        setStock(list.find((item) => item.symbol.toUpperCase() === symbol) ?? null);
      } finally {
        setIsLoading(false);
      }
    }

    if (symbol) load();
  }, [symbol]);

  const chartSeed = useMemo(() => {
    if (!stock) return [40, 52, 48, 66, 61, 72, 68];
    const base = Math.max(20, Math.min(90, stock.score));
    return [base - 15, base - 7, base - 10, base - 2, base + 2, base + 8, base + 5];
  }, [stock]);

  if (isLoading) {
    return <main className="min-h-screen bg-[#0B0F17] p-8 text-slate-200">Loading stock...</main>;
  }

  if (!stock) {
    return (
      <main className="min-h-screen bg-[#0B0F17] p-8 text-slate-200">
        <p>Stock not found in Top10 results.</p>
        <Link href="/top10" className="mt-4 inline-block text-blue-400">Back to Top10</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F17] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/top10" className="inline-block text-sm text-blue-400">← Back to Top10</Link>

        <section className="rounded-2xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{stock.symbol}</h1>
              <p className="mt-2 text-slate-400">{stock.sector} • {stock.recommendation}</p>
              <p className="mt-3 text-2xl font-semibold text-white">${stock.price.toFixed(2)}</p>
            </div>
            <ScoreGauge value={stock.score} size={82} strokeWidth={8} />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PriceMiniChart points={chartSeed} />
          <AIInsightPanel stock={stock} />
        </div>
      </div>
    </main>
  );
}
