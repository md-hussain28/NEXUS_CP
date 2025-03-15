"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface Submission {
  id: string
  problem: string
  platform: string
  language: string
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error"
  timestamp: string
  runtime?: string
  memory?: string
}

interface RecentSubmissionsProps {
  data?: Submission[]
}

const initialData: Submission[] = [
  {
    id: "1",
    problem: "Two Sum",
    platform: "LeetCode",
    language: "JavaScript",
    status: "Accepted",
    timestamp: "2 hours ago",
    runtime: "76 ms",
    memory: "42.1 MB",
  },
  {
    id: "2",
    problem: "Maximum Subarray",
    platform: "LeetCode",
    language: "Python",
    status: "Accepted",
    timestamp: "Yesterday",
    runtime: "120 ms",
    memory: "28.5 MB",
  },
  {
    id: "3",
    problem: "Merge Intervals",
    platform: "LeetCode",
    language: "C++",
    status: "Wrong Answer",
    timestamp: "Yesterday",
    runtime: "32 ms",
    memory: "14.2 MB",
  },
  {
    id: "4",
    problem: "Divisibility Problem",
    platform: "CodeForces",
    language: "Java",
    status: "Accepted",
    timestamp: "2 days ago",
    runtime: "156 ms",
    memory: "36.8 MB",
  },
  {
    id: "5",
    problem: "Chef and Strings",
    platform: "CodeChef",
    language: "Python",
    status: "Time Limit Exceeded",
    timestamp: "3 days ago",
    runtime: "TLE",
    memory: "N/A",
  },
]

export function RecentSubmissions({ data }: RecentSubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(data || initialData)

  useEffect(() => {
    if (data) {
      setSubmissions(data)
    }
  }, [data])

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">PROBLEM</th>
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">PLATFORM</th>
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">LANGUAGE</th>
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">STATUS</th>
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">RUNTIME</th>
            <th className="py-2 px-3 text-left font-mono text-xs text-[#00FFFF]">TIMESTAMP</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-2 px-3 font-mono text-xs text-white">{submission.problem}</td>
              <td className="py-2 px-3 font-mono text-xs text-white/70">{submission.platform}</td>
              <td className="py-2 px-3 font-mono text-xs text-white/70">{submission.language}</td>
              <td className="py-2 px-3">
                <Badge
                  className={`font-mono text-xs ${
                    submission.status === "Accepted"
                      ? "bg-[#00FF41]/20 text-[#00FF41] hover:bg-[#00FF41]/30"
                      : submission.status === "Wrong Answer"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : submission.status === "Time Limit Exceeded"
                          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  }`}
                >
                  {submission.status}
                </Badge>
              </td>
              <td className="py-2 px-3 font-mono text-xs text-white/70">{submission.runtime || "N/A"}</td>
              <td className="py-2 px-3 font-mono text-xs text-white/50">{submission.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

