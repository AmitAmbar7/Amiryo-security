export type BeatMiss = "BEAT" | "MISSED";

export interface Stock {
  symbol: string;
  price: number;
  day_change: number;
  score: number;
  revenue_growth: number;
  eps_growth: number;
  sector: string;
  beat_miss: BeatMiss;
  target_price: number;
  upside_pct: number;
  recommendation: string;
  logo?: string;
}
