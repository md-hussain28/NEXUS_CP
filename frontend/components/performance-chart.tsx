"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface RatingData {
  date: string
  rating: number
  platform?: string
}

interface PerformanceChartProps {
  data?: RatingData[]
  showAllData?: boolean
}

const initialData = [
  { date: "Jan", rating: 1200 },
  { date: "Feb", rating: 1250 },
  { date: "Mar", rating: 1300 },
  { date: "Apr", rating: 1280 },
  { date: "May", rating: 1350 },
  { date: "Jun", rating: 1400 },
  { date: "Jul", rating: 1450 },
  { date: "Aug", rating: 1500 },
  { date: "Sep", rating: 1550 },
  { date: "Oct", rating: 1600 },
  { date: "Nov", rating: 1650 },
  { date: "Dec", rating: 1750 },
]

export function PerformanceChart({ data, showAllData = false }: PerformanceChartProps) {
  const [chartData, setChartData] = useState<RatingData[]>(data || initialData)
  const [animateData, setAnimateData] = useState(true)

  useEffect(() => {
    if (data) {
      setChartData(data)
      setAnimateData(false)
    }
  }, [data])

  useEffect(() => {
    if (!animateData) return

    // Simulate data updates
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData]
        // Slightly modify a random data point
        const randomIndex = Math.floor(Math.random() * newData.length)
        const randomChange = Math.floor(Math.random() * 30) - 15
        newData[randomIndex] = {
          ...newData[randomIndex],
          rating: newData[randomIndex].rating + randomChange,
        }
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [animateData])

  // If we have platform data and showAllData is true, we'll color by platform
  const hasPlatformData = chartData.some((item) => item.platform)

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
      <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <XAxis dataKey="date" stroke="#00FFFF" fontSize={10} tickLine={false} axisLine={{ stroke: "#00FFFF30" }} />
        <YAxis
          stroke="#00FFFF"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: "#00FFFF30" }}
          tickFormatter={(value) => `${value}`}
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
            const platform = props.payload.platform
            return [value, platform ? `${name} (${platform})` : name]
          }}
        />

        {hasPlatformData && showAllData ? (
          // Group by platform and render a line for each
          Array.from(new Set(chartData.filter((d) => d.platform).map((d) => d.platform))).map((platform) => (
            <Line
              key={platform}
              type="monotone"
              dataKey="rating"
              name="Rating"
              data={chartData.filter((d) => d.platform === platform)}
              stroke={getPlatformColor(platform)}
              strokeWidth={2}
              dot={{ fill: getPlatformColor(platform), r: 4 }}
              activeDot={{ fill: "#00FFFF", r: 6, stroke: getPlatformColor(platform) }}
            />
          ))
        ) : (
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#00FF41"
            strokeWidth={2}
            dot={{ fill: "#00FFFF", r: 4 }}
            activeDot={{ fill: "#00FF41", r: 6, stroke: "#00FFFF" }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

