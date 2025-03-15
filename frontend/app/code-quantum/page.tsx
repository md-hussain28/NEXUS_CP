"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { GlitchText } from "@/components/glitch-text"
import { HolographicCard } from "@/components/holographic-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Code, Filter, Search, Zap } from "lucide-react"
import { useUserStore } from "@/lib/store"
import { DifficultyBreakdown } from "@/components/difficulty-breakdown"

export default function CodeQuantumPage() {
  const [activeTab, setActiveTab] = useState("recommended")
  const { userData, isLoading } = useUserStore()
  const [generatingProblems, setGeneratingProblems] = useState(false)

  // Simulate problem generation
  const handleGenerateProblems = () => {
    setGeneratingProblems(true)
    setTimeout(() => {
      setGeneratingProblems(false)
    }, 3000)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D1117] text-white">
      {/* Animated code rain background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <CodeRain />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-sm">RETURN_TO_MAINFRAME</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse"></div>
              <span className="font-mono text-xs text-[#00FF41]">QUANTUM_ACTIVE</span>
            </div>
          </div>

          <div className="mb-8">
            <GlitchText
              text="CODE_QUANTUM"
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-[#00FF41]"
            />
            <div className="font-mono text-lg text-[#00FFFF] opacity-90">Intelligent Problem Selector</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <HolographicCard className="p-6">
                <div className="flex items-center mb-6">
                  <Code className="h-5 w-5 text-[#00FFFF] mr-2" />
                  <div className="font-mono text-[#00FFFF]">PROBLEM_STATS</div>
                </div>

                <div className="space-y-4">
                  <ProblemStat label="TOTAL_SOLVED" value={userData?.totalSolved || 421} />

                  <ProblemStat label="RECOMMENDED" value={15} />

                  <ProblemStat label="DIFFICULTY_MATCH" value={92} isPercentage />

                  <ProblemStat label="TOPIC_COVERAGE" value={78} isPercentage />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-[#00FF41] text-black hover:bg-[#00FF41]/80 font-mono"
                    onClick={handleGenerateProblems}
                    disabled={generatingProblems}
                  >
                    {generatingProblems ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin border-2 border-black border-t-transparent rounded-full"></div>
                        GENERATING...
                      </>
                    ) : (
                      <>
                        GENERATE_PROBLEMS
                        <Zap className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </HolographicCard>

              <div className="mt-6">
                <HolographicCard className="p-6">
                  <div className="flex items-center mb-4">
                    <Filter className="h-5 w-5 text-[#00FFFF] mr-2" />
                    <div className="font-mono text-[#00FFFF]">DIFFICULTY_BREAKDOWN</div>
                  </div>

                  <div className="h-[200px]">
                    <DifficultyBreakdown data={userData?.difficultyBreakdown} />
                  </div>

                  <div className="mt-4 font-mono text-xs text-white/70 text-center">
                    Your current problem-solving distribution by difficulty level.
                  </div>
                </HolographicCard>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-[#0D1117] border border-[#00FFFF]/30">
                  <TabsTrigger
                    value="recommended"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    RECOMMENDED
                  </TabsTrigger>
                  <TabsTrigger
                    value="by-topic"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    BY_TOPIC
                  </TabsTrigger>
                  <TabsTrigger
                    value="by-difficulty"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    BY_DIFFICULTY
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recommended" className="mt-6">
                  <HolographicCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">QUANTUM_RECOMMENDATIONS</div>
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-white/50 mr-2" />
                        <input
                          type="text"
                          placeholder="SEARCH_PROBLEMS"
                          className="bg-transparent border-b border-white/20 font-mono text-xs text-white focus:outline-none focus:border-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <RecommendedProblem
                        name="Maximum Subarray"
                        platform="LeetCode"
                        difficulty="Medium"
                        topic="Dynamic Programming"
                        matchScore={98}
                        url="#"
                      />

                      <RecommendedProblem
                        name="Shortest Path Problem"
                        platform="CodeForces"
                        difficulty="Hard"
                        topic="Graph Theory"
                        matchScore={95}
                        url="#"
                      />

                      <RecommendedProblem
                        name="Merge Intervals"
                        platform="LeetCode"
                        difficulty="Medium"
                        topic="Arrays"
                        matchScore={92}
                        url="#"
                      />

                      <RecommendedProblem
                        name="Counting Bits"
                        platform="LeetCode"
                        difficulty="Easy"
                        topic="Bit Manipulation"
                        matchScore={90}
                        url="#"
                      />

                      <RecommendedProblem
                        name="Number of Islands"
                        platform="LeetCode"
                        difficulty="Medium"
                        topic="Graph Theory"
                        matchScore={88}
                        url="#"
                      />
                    </div>
                  </HolographicCard>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                      title="SKILL_MATCHING"
                      description="Problems are matched to your current skill level for optimal learning."
                      icon={<Code className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="PATTERN_ANALYSIS"
                      description="Your solving patterns are analyzed to suggest problems that challenge but don't overwhelm."
                      icon={<Search className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="ADAPTIVE_DIFFICULTY"
                      description="Problem difficulty adapts to your progress, creating a personalized learning curve."
                      icon={<Filter className="h-5 w-5 text-[#00FF41]" />}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="by-topic" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">PROBLEMS_BY_TOPIC</div>
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-white/50 mr-2" />
                        <input
                          type="text"
                          placeholder="SEARCH_TOPICS"
                          className="bg-transparent border-b border-white/20 font-mono text-xs text-white focus:outline-none focus:border-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <TopicSection
                        topic="Graph Theory"
                        problems={[
                          { name: "Shortest Path Problem", difficulty: "Hard", platform: "CodeForces" },
                          { name: "Number of Islands", difficulty: "Medium", platform: "LeetCode" },
                          { name: "Network Delay Time", difficulty: "Medium", platform: "LeetCode" },
                        ]}
                      />

                      <TopicSection
                        topic="Dynamic Programming"
                        problems={[
                          { name: "Maximum Subarray", difficulty: "Medium", platform: "LeetCode" },
                          { name: "Coin Change", difficulty: "Medium", platform: "LeetCode" },
                          { name: "Longest Increasing Subsequence", difficulty: "Medium", platform: "LeetCode" },
                        ]}
                      />

                      <TopicSection
                        topic="Bit Manipulation"
                        problems={[
                          { name: "Counting Bits", difficulty: "Easy", platform: "LeetCode" },
                          { name: "Single Number", difficulty: "Easy", platform: "LeetCode" },
                          { name: "Bitwise AND of Numbers Range", difficulty: "Medium", platform: "LeetCode" },
                        ]}
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>

                <TabsContent value="by-difficulty" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">PROBLEMS_BY_DIFFICULTY</div>
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-white/50 mr-2" />
                        <input
                          type="text"
                          placeholder="SEARCH_PROBLEMS"
                          className="bg-transparent border-b border-white/20 font-mono text-xs text-white focus:outline-none focus:border-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <DifficultySection
                        difficulty="Easy"
                        problems={[
                          { name: "Counting Bits", topic: "Bit Manipulation", platform: "LeetCode" },
                          { name: "Single Number", topic: "Bit Manipulation", platform: "LeetCode" },
                          { name: "Valid Parentheses", topic: "Stack", platform: "LeetCode" },
                        ]}
                      />

                      <DifficultySection
                        difficulty="Medium"
                        problems={[
                          { name: "Maximum Subarray", topic: "Dynamic Programming", platform: "LeetCode" },
                          { name: "Number of Islands", topic: "Graph Theory", platform: "LeetCode" },
                          { name: "Merge Intervals", topic: "Arrays", platform: "LeetCode" },
                        ]}
                      />

                      <DifficultySection
                        difficulty="Hard"
                        problems={[
                          { name: "Shortest Path Problem", topic: "Graph Theory", platform: "CodeForces" },
                          { name: "Trapping Rain Water", topic: "Arrays", platform: "LeetCode" },
                          { name: "Median of Two Sorted Arrays", topic: "Binary Search", platform: "LeetCode" },
                        ]}
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProblemStat({
  label,
  value,
  isPercentage = false,
}: {
  label: string
  value: number
  isPercentage?: boolean
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="font-mono text-xs text-white/70">{label}</div>
        <div className="font-mono text-xs text-[#00FF41]">
          {value}
          {isPercentage ? "%" : ""}
        </div>
      </div>
      {isPercentage && (
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF]" style={{ width: `${value}%` }}></div>
        </div>
      )}
    </div>
  )
}

function RecommendedProblem({
  name,
  platform,
  difficulty,
  topic,
  matchScore,
  url,
}: {
  name: string
  platform: string
  difficulty: string
  topic: string
  matchScore: number
  url: string
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50 hover:bg-[#0D1117]/80 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{name}</div>
        <div className="px-2 py-0.5 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
          {matchScore}% MATCH
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-xs text-white/70">
          {platform} • <span className="text-[#00FFFF]">{topic}</span>
        </div>
        <div
          className={`font-mono text-xs ${
            difficulty === "Easy" ? "text-green-400" : difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
          }`}
        >
          {difficulty}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[#00FF41] hover:text-[#00FF41]/80 transition-colors"
        >
          SOLVE_PROBLEM
        </a>

        <Button size="sm" className="h-7 text-xs font-mono bg-[#00FFFF]/10 text-[#00FFFF] hover:bg-[#00FFFF]/20">
          ADD_TO_QUEUE
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="border border-[#00FF41]/30 bg-[#0D1117]/80 backdrop-blur-sm p-4 rounded-lg hover:border-[#00FF41] transition-colors group">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-mono text-[#00FF41] ml-2 group-hover:text-[#00FFFF] transition-colors">{title}</h3>
      </div>
      <p className="font-mono text-sm text-white/70">{description}</p>
      <div className="mt-4 h-1 w-0 bg-[#00FFFF] group-hover:w-full transition-all duration-300"></div>
    </div>
  )
}

function TopicSection({
  topic,
  problems,
}: {
  topic: string
  problems: Array<{ name: string; difficulty: string; platform: string }>
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-sm text-[#00FFFF]">{topic}</div>
        <Button size="sm" className="h-7 text-xs font-mono bg-[#00FF41]/10 text-[#00FF41] hover:bg-[#00FF41]/20">
          VIEW_ALL
        </Button>
      </div>

      <div className="space-y-2">
        {problems.map((problem, index) => (
          <div key={index} className="flex items-center justify-between py-1 border-b border-white/10 last:border-0">
            <div className="flex items-center">
              <div className="font-mono text-xs text-white">{problem.name}</div>
              <div className="ml-2 px-1.5 py-0.5 rounded text-[0.65rem] font-mono bg-white/10 text-white/70">
                {problem.platform}
              </div>
            </div>
            <div
              className={`font-mono text-xs ${
                problem.difficulty === "Easy"
                  ? "text-green-400"
                  : problem.difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {problem.difficulty}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DifficultySection({
  difficulty,
  problems,
}: {
  difficulty: string
  problems: Array<{ name: string; topic: string; platform: string }>
}) {
  return (
    <div
      className={`border rounded-lg p-4 bg-[#0D1117]/50 ${
        difficulty === "Easy"
          ? "border-green-400/30"
          : difficulty === "Medium"
            ? "border-yellow-400/30"
            : "border-red-400/30"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`font-mono text-sm ${
            difficulty === "Easy" ? "text-green-400" : difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
          }`}
        >
          {difficulty}
        </div>
        <Button size="sm" className="h-7 text-xs font-mono bg-[#00FF41]/10 text-[#00FF41] hover:bg-[#00FF41]/20">
          VIEW_ALL
        </Button>
      </div>

      <div className="space-y-2">
        {problems.map((problem, index) => (
          <div key={index} className="flex items-center justify-between py-1 border-b border-white/10 last:border-0">
            <div className="flex items-center">
              <div className="font-mono text-xs text-white">{problem.name}</div>
              <div className="ml-2 px-1.5 py-0.5 rounded text-[0.65rem] font-mono bg-white/10 text-white/70">
                {problem.platform}
              </div>
            </div>
            <div className="font-mono text-xs text-[#00FFFF]">{problem.topic}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

