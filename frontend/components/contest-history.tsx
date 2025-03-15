"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ContestData {
  name: string
  rank: number
  rating: number
  platform?: string
}

interface ContestHistoryProps {
  data?: ContestData[]
}

const initialData = [
  { name: "Contest 1", rank: 1200, rating: 1500 },
  { name: "Contest 2", rank: 800, rating: 1550 },
  { name: "Contest 3", rank: 1500, rating: 1520 },
  { name: "Contest 4", rank: 600, rating: 1600 },
  { name: "Contest 5", rank: 400, rating: 1650 },
  { name: "Contest 6", rank: 900, rating: 1620 },
  { name: "Contest 7", rank: 300, rating: 1700 },
  { name: "Contest 8", rank: 200, rating: 1750 },
]

export function ContestHistory({ data }: ContestHistoryProps) {
  const [chartData, setChartData] = useState<ContestData[]>(data || initialData)

  useEffect(() => {
    if (data) {
      setChartData(data)
    }
  }, [data])

  // Invert rank for better visualization (lower rank is better)
  const maxRank = Math.max(...chartData.map((d) => d.rank))
  const processedData = chartData.map((d) => ({
    ...d,
    normalizedRank: maxRank - d.rank + 100, // Add offset to avoid negative values
  }))

  const getPlatformColor = (platform?: string) => {
    if (!platform) return "#00FF41"

    switch (platform.toLowerCase()) {
      case "leetcode":
        return "#FFA116"
      case "codeforces":
        return "#318CE7"
      case "codechef":
        return "#5B4638"
      default:
        return "#00FF41"
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={processedData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF41" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00FF41" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#00FFFF" fontSize={10} tickLine={false} axisLine={{ stroke: "#00FFFF30" }} />
        <YAxis stroke="#00FFFF" fontSize={10} tickLine={false} axisLine={{ stroke: "#00FFFF30" }} yAxisId="left" />
        <YAxis
          stroke="#00FFFF"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: "#00FFFF30" }}
          orientation="right"
          yAxisId="right"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0D1117",
            borderColor: "#00FF41",
            color: "#00FFFF",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
          formatter={(value, name, props) => {
            if (name === "normalizedRank") {
              // Convert back to actual rank
              return [maxRank - value + 100, "Rank"]
            }
            return [value, name]
          }}
        />
        <Area
          type="monotone"
          dataKey="normalizedRank"
          stroke="#00FF41"
          fillOpacity={1}
          fill="url(#colorRank)"
          yAxisId="left"
        />
        <Area
          type="monotone"
          dataKey="rating"
          stroke="#00FFFF"
          fillOpacity={1}
          fill="url(#colorRating)"
          yAxisId="right"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

