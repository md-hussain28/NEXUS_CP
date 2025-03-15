"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface DifficultyData {
  name: string
  value: number
  color: string
}

interface DifficultyBreakdownProps {
  data?: DifficultyData[]
}

const initialData = [
  { name: "Easy", value: 120, color: "#4ade80" },
  { name: "Medium", value: 80, color: "#facc15" },
  { name: "Hard", value: 40, color: "#f87171" },
]

export function DifficultyBreakdown({ data }: DifficultyBreakdownProps) {
  const [chartData, setChartData] = useState<DifficultyData[]>(data || initialData)

  useEffect(() => {
    if (data) {
      setChartData(data)
    }
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={{ stroke: "#00FFFF30", strokeWidth: 1 }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#0D1117" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#0D1117",
            borderColor: "#00FF41",
            color: "#00FFFF",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
          formatter={(value) => [`${value} problems`, ""]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

