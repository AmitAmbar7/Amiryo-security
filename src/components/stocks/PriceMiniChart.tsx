"use client";

type PriceMiniChartProps = {
  points: number[];
};

export function PriceMiniChart({ points }: PriceMiniChartProps) {
  const safePoints = points.length ? points : [40, 52, 48, 66, 61, 72, 68];
  const max = Math.max(...safePoints);
  const min = Math.min(...safePoints);
  const range = Math.max(1, max - min);

  const coords = safePoints
    .map((point, i) => {
      const x = (i / (safePoints.length - 1 || 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
      <p className="mb-3 text-sm text-slate-400">Price Momentum (preview)</p>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
        <polyline fill="none" stroke="#3B82F6" strokeWidth="3" points={coords} />
      </svg>
    </div>
  );
}
