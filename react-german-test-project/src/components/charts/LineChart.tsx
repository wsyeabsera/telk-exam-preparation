"use client";

import { format } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";
import type { ScorePoint } from "@/hooks/useProgressData";

interface LineChartProps {
  data: ScorePoint[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScorePoint }> }) {
  if (!active || !payload?.[0]) return null;
  const pt = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {pt.score}%
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
        {pt.testTitle}
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        {format(new Date(pt.date), "MMM d, yyyy")}
      </p>
      {pt.isPersonalBest && (
        <p className="text-xs font-medium text-emerald-500 mt-0.5">Personal Best</p>
      )}
    </div>
  );
}

export function LineChart({ data }: LineChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-400 dark:text-zinc-500 text-sm">
        Complete a test to see your progress
      </div>
    );
  }

  const personalBests = data.filter((pt) => pt.isPersonalBest);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
        <XAxis
          dataKey="date"
          tickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
          tick={{ fontSize: 12, fill: "#a1a1aa" }}
          tickLine={false}
          axisLine={{ stroke: "#a1a1aa", strokeOpacity: 0.3 }}
          minTickGap={40}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 12, fill: "#a1a1aa" }}
          tickLine={false}
          axisLine={false}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#f59e0b"
          strokeWidth={2.5}
          fill="url(#scoreGradient)"
          dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
        />
        {personalBests.map((pt) => (
          <ReferenceDot
            key={pt.date}
            x={pt.date}
            y={pt.score}
            r={6}
            fill="#10b981"
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
