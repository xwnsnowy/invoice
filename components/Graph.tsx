"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const chartData = [
//   { date: "Nov 5", amount: 560 },
//   { date: "Nov 7", amount: 550 },
//   { date: "Nov 8", amount: 400 },
// ];

const chartConfig = {};

interface GraphProps {
  data: {
    date: string;
    total: number;
  }[];
}

export function Graph({ data }: GraphProps) {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Total",
          color: "hsl(var(--primary))",
        },
      }}
      className="min-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--color-total)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
