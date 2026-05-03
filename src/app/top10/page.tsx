"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTop10Stocks } from "@/lib/api";
import { StockCard } from "@/components/stocks/StockCard";
import { StockCardSkeleton } from "@/components/stocks/StockCardSkeleton";
import type { Stock } from "@/types/stock";

export default function Top10Page() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchTop10Stocks();
        setStocks(data);
      } catch {
        setError("Failed to load top opportunities. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F17] px-4 py-8 text-slate-100 md:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Top Market Opportunities</h1>
          <p className="mt-2 text-sm text-slate-400 md:text-base">Ranked by composite score</p>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <StockCardSkeleton key={i} />)
            : stocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <StockCard stock={stock} />
              </motion.div>
            ))}
        </section>
      </motion.div>
    </main>
  );
}
