"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Stock } from "@/types/stock";
import { ScoreGauge } from "@/components/stocks/ScoreGauge";

type StockCardProps = {
  stock: Stock;
};

function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function getInsightTag(stock: Stock) {
  if (stock.revenue_growth >= 20 && stock.eps_growth >= 15) {
    return { label: "🔥 Strong Growth", style: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" };
  }

  if (stock.eps_growth < 0 || stock.recommendation.toLowerCase().includes("sell")) {
    return { label: "⚠️ Weak Profitability", style: "bg-rose-500/15 text-rose-300 border-rose-400/30" };
  }

  return null;
}

export function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.day_change >= 0;
  const beat = stock.beat_miss === "BEAT";
  const insightTag = getInsightTag(stock);

  const normalizedScore = Math.max(0, Math.min(100, stock.score));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="h-full"
    >
      <Link href={`/stock/${stock.symbol}`} className="block h-full">
        <Card className="h-full rounded-2xl border border-white/10 bg-[#111827] text-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_16px_38px_rgba(0,0,0,0.45)]">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={stock.logo || `https://logo.clearbit.com/${stock.symbol}.com`}
                  alt={`${stock.symbol} logo`}
                  className="h-12 w-12 rounded-xl border border-white/10 bg-slate-900/70 object-cover"
                  loading="lazy"
                />

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{stock.symbol}</h3>
                  <p className="mt-1 text-base font-medium text-slate-200">{formatCurrency(stock.price)}</p>
                  <p className={`mt-1 text-sm font-semibold ${isPositive ? "text-[#00FF9C]" : "text-[#FF4D4F]"}`}>
                    {formatPercent(stock.day_change)}
                  </p>
                </div>
              </div>

              <ScoreGauge value={normalizedScore} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
                <p className="text-slate-400">Revenue Growth</p>
                <p className="mt-1 font-semibold text-slate-100">{formatPercent(stock.revenue_growth)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
                <p className="text-slate-400">EPS Growth</p>
                <p className="mt-1 font-semibold text-slate-100">{formatPercent(stock.eps_growth)}</p>
              </div>
            </div>


            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="rounded-full border border-white/10 px-2.5 py-1">{stock.sector}</span>
              <span className={stock.upside_pct >= 0 ? "text-emerald-300" : "text-rose-300"}>
                Upside {formatPercent(stock.upside_pct)}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                  beat
                    ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300"
                    : "border-rose-400/30 bg-rose-500/15 text-rose-300"
                }`}
              >
                {beat ? "BEAT" : "MISSED"}
              </span>

              {insightTag && (
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${insightTag.style}`}>
                  {insightTag.label}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
