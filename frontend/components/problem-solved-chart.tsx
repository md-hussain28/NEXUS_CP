"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface MonthlyData {
  month: string
  count: number
}

interface ProblemSolvedChartProps {
  data?: MonthlyData[]
}

const initialData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 19 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 8 },
  { month: "May", count: 22 },
  { month: "Jun", count: 14 },
  { month: "Jul", count: 18 },
  { month: "Aug", count: 25 },
  { month: "Sep", count: 17 },
  { month: "Oct", count: 21 },
  { month: "Nov", count: 16 },
  { month: "Dec", count: 23 },
]

export function ProblemSolvedChart({ data }: ProblemSolvedChartProps) {
  const [chartData, setChartData] = useState<MonthlyData[]>(data || initialData)

  useEffect(() => {
    if (data) {
      setChartData(data)
    }
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <XAxis dataKey="month" stroke="#00FFFF" fontSize={10} tickLine={false} axisLine={{ stroke: "#00FFFF30" }} />
        <YAxis stroke="#00FFFF" fontSize={10} tickLine={false} axisLine={{ stroke: "#00FFFF30" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0D1117",
            borderColor: "#00FF41",
            color: "#00FFFF",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
          formatter={(value) => [`${value} problems`, "Solved"]}
        />
        <Bar dataKey="count" fill="#00FF41" radius={[4, 4, 0, 0]} animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  )
}

