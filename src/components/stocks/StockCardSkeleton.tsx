export function StockCardSkeleton() {
  return (
    <div className="h-full animate-pulse rounded-2xl border border-white/10 bg-[#111827] p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-700/60" />
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-slate-700/60" />
            <div className="h-4 w-20 rounded bg-slate-700/50" />
            <div className="h-4 w-16 rounded bg-slate-700/50" />
          </div>
        </div>
        <div className="h-16 w-16 rounded-full bg-slate-700/60" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-14 rounded-xl bg-slate-700/40" />
        <div className="h-14 rounded-xl bg-slate-700/40" />
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-slate-700/50" />
        <div className="h-6 w-24 rounded-full bg-slate-700/50" />
      </div>
    </div>
  );
}
