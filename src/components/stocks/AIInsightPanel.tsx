import type { Stock } from "@/types/stock";

type AIInsightPanelProps = {
  stock: Stock;
};

export function AIInsightPanel({ stock }: AIInsightPanelProps) {
  const points = [
    `Composite score עומד על ${Math.max(0, Math.min(100, Math.round(stock.score)))} ומציב את ${stock.symbol} כיעד מעקב מרכזי.`,
    `Revenue growth ${stock.revenue_growth.toFixed(2)}% לצד EPS growth ${stock.eps_growth.toFixed(2)}% מצביעים על איכות צמיחה ${stock.eps_growth >= 0 ? "חיובית" : "לא יציבה"}.`,
    `Upside מול מחיר יעד: ${stock.upside_pct.toFixed(2)}% | Recommendation: ${stock.recommendation}.`,
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <h2 className="text-lg font-semibold text-white">AI Insight Panel</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-300">
        {points.map((point) => (
          <li key={point} className="rounded-xl bg-slate-900/50 px-3 py-2">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
