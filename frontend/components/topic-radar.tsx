"use client"

import { useState, useEffect } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

interface TopicData {
  topic: string
  value: number
}

interface TopicRadarProps {
  data?: TopicData[]
  showAllData?: boolean
}

const initialData = [
  { topic: "Arrays", value: 85 },
  { topic: "Strings", value: 70 },
  { topic: "DP", value: 90 },
  { topic: "Graphs", value: 45 },
  { topic: "Trees", value: 75 },
  { topic: "Greedy", value: 60 },
]

export function TopicRadar({ data, showAllData = false }: TopicRadarProps) {
  const [chartData, setChartData] = useState<TopicData[]>(data || initialData)

  useEffect(() => {
    if (data) {
      setChartData(data)
    }
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="#00FFFF30" />
        <PolarAngleAxis dataKey="topic" tick={{ fill: "#00FFFF", fontSize: 10, fontFamily: "monospace" }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#00FFFF", fontSize: 10 }} stroke="#00FFFF30" />
        <Radar name="Topics" dataKey="value" stroke="#00FF41" fill="#00FF41" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

