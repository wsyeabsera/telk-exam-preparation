"use client";

import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { CategoryAvg } from "@/hooks/useProgressData";

interface BarChartProps {
  data: CategoryAvg[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CategoryAvg }> }) {
  if (!active || !payload?.[0]) return null;
  const cat = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {cat.label}: {cat.avgScore}%
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {cat.count} {cat.count === 1 ? "test" : "tests"} completed
      </p>
    </div>
  );
}

function CustomLabel({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: number }) {
  if (!x || !y || !width || !value) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      textAnchor="middle"
      className="fill-zinc-700 dark:fill-zinc-300"
      fontSize={13}
      fontWeight={600}
    >
      {value}%
    </text>
  );
}

export function BarChart({ data }: BarChartProps) {
  // Replace 0s with small placeholder so bars are visible
  const chartData = data.map((cat) => ({
    ...cat,
    displayScore: cat.count > 0 ? cat.avgScore : 2,
    labelText: cat.count > 0 ? `${cat.label} (${cat.count})` : `${cat.label}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RechartsBarChart data={chartData} margin={{ top: 25, right: 10, bottom: 5, left: -10 }} barSize={56}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} vertical={false} />
        <XAxis
          dataKey="labelText"
          tick={{ fontSize: 12, fill: "#a1a1aa" }}
          tickLine={false}
          axisLine={{ stroke: "#a1a1aa", strokeOpacity: 0.3 }}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 12, fill: "#a1a1aa" }}
          tickLine={false}
          axisLine={false}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "currentColor", fillOpacity: 0.05 }} />
        <Bar
          dataKey="displayScore"
          radius={[6, 6, 0, 0]}
          label={<CustomLabel />}
        >
          {chartData.map((cat) => (
            <Cell
              key={cat.category}
              fill={cat.color}
              fillOpacity={cat.count > 0 ? 0.85 : 0.25}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
