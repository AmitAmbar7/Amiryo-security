"use client";

import { motion } from "framer-motion";

type ScoreGaugeProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function scoreColor(score: number) {
  if (score >= 80) return "#00FF9C";
  if (score >= 60) return "#FACC15";
  return "#FF4D4F";
}

export function ScoreGauge({ value, size = 68, strokeWidth = 7 }: ScoreGaugeProps) {
  const normalized = clamp(Math.round(value), 0, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalized / 100) * circumference;
  const color = scoreColor(normalized);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-label={`Score ${normalized} מתוך 100`}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.25)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </svg>

      <span className="absolute text-sm font-semibold text-white">{normalized}</span>
    </div>
  );
}
