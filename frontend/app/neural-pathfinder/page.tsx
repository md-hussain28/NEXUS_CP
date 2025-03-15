"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { GlitchText } from "@/components/glitch-text"
import { HolographicCard } from "@/components/holographic-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Brain, ChevronRight, Compass, Lightbulb, Zap } from "lucide-react"
import { useUserStore } from "@/lib/store"
import { TopicRadar } from "@/components/topic-radar"

export default function NeuralPathfinderPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { userData, isLoading } = useUserStore()
  const [generatingPath, setGeneratingPath] = useState(false)

  // Simulate path generation
  const handleGeneratePath = () => {
    setGeneratingPath(true)
    setTimeout(() => {
      setGeneratingPath(false)
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
              <span className="font-mono text-xs text-[#00FF41]">NEURAL_ACTIVE</span>
            </div>
          </div>

          <div className="mb-8">
            <GlitchText
              text="NEURAL_PATHFINDER"
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-[#00FF41]"
            />
            <div className="font-mono text-lg text-[#00FFFF] opacity-90">AI-Powered Learning Trajectory</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <HolographicCard className="p-6">
                <div className="flex items-center mb-6">
                  <Brain className="h-5 w-5 text-[#00FFFF] mr-2" />
                  <div className="font-mono text-[#00FFFF]">NEURAL_STATS</div>
                </div>

                <div className="space-y-4">
                  <NeuralStat label="TOPICS_ANALYZED" value={userData?.topicData?.length || 8} />

                  <NeuralStat label="SKILL_GAPS" value={3} />

                  <NeuralStat label="LEARNING_PATHS" value={4} />

                  <NeuralStat label="CONFIDENCE_SCORE" value={87} isPercentage />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-[#00FF41] text-black hover:bg-[#00FF41]/80 font-mono"
                    onClick={handleGeneratePath}
                    disabled={generatingPath}
                  >
                    {generatingPath ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin border-2 border-black border-t-transparent rounded-full"></div>
                        GENERATING...
                      </>
                    ) : (
                      <>
                        GENERATE_PATH
                        <Zap className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </HolographicCard>

              <div className="mt-6 space-y-4">
                <RecommendedTopic name="Graph Theory" confidence={45} priority="HIGH" />

                <RecommendedTopic name="Dynamic Programming" confidence={92} priority="MEDIUM" />

                <RecommendedTopic name="Bit Manipulation" confidence={40} priority="HIGH" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-[#0D1117] border border-[#00FFFF]/30">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    OVERVIEW
                  </TabsTrigger>
                  <TabsTrigger
                    value="skill-gaps"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    SKILL_GAPS
                  </TabsTrigger>
                  <TabsTrigger
                    value="learning-path"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    LEARNING_PATH
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <HolographicCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">NEURAL_ANALYSIS</div>
                      <div className="px-2 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
                        ACTIVE
                      </div>
                    </div>

                    <div className="font-mono text-sm text-white/80 mb-4">
                      The Neural Pathfinder has analyzed your problem-solving patterns and identified optimal learning
                      trajectories to enhance your competitive programming skills.
                    </div>

                    <div className="h-[300px]">
                      <TopicRadar data={userData?.topicData} showAllData={true} />
                    </div>

                    <div className="mt-4 font-mono text-xs text-white/70">
                      Your current skill distribution across key competitive programming topics. The Neural Pathfinder
                      uses this data to identify areas for improvement.
                    </div>
                  </HolographicCard>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                      title="SKILL_ANALYSIS"
                      description="Advanced algorithms analyze your solved problems to identify patterns and skill levels."
                      icon={<Brain className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="GAP_DETECTION"
                      description="Neural networks identify knowledge gaps in your competitive programming skills."
                      icon={<Compass className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="ADAPTIVE_LEARNING"
                      description="Personalized learning paths adapt to your progress and performance."
                      icon={<Lightbulb className="h-5 w-5 text-[#00FF41]" />}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="skill-gaps" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-4">
                      <Compass className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">IDENTIFIED_SKILL_GAPS</div>
                    </div>

                    <div className="space-y-6">
                      <SkillGap
                        topic="Graph Theory"
                        confidence={45}
                        description="Your performance in graph algorithms shows room for improvement. Focus on shortest path algorithms, minimum spanning trees, and network flow problems."
                        recommendedProblems={[
                          { name: "Dijkstra's Algorithm", difficulty: "Medium" },
                          { name: "Kruskal's Algorithm", difficulty: "Medium" },
                          { name: "Ford-Fulkerson Algorithm", difficulty: "Hard" },
                        ]}
                      />

                      <SkillGap
                        topic="Bit Manipulation"
                        confidence={40}
                        description="Your bit manipulation skills need enhancement. Practice problems involving bitwise operations, bit masks, and binary representation."
                        recommendedProblems={[
                          { name: "Counting Bits", difficulty: "Easy" },
                          { name: "Single Number", difficulty: "Easy" },
                          { name: "Bitwise AND of Numbers Range", difficulty: "Medium" },
                        ]}
                      />

                      <SkillGap
                        topic="Advanced Data Structures"
                        confidence={55}
                        description="Improve your knowledge of advanced data structures like segment trees, Fenwick trees, and disjoint set unions."
                        recommendedProblems={[
                          { name: "Range Sum Query", difficulty: "Medium" },
                          { name: "Number of Islands", difficulty: "Medium" },
                          { name: "Largest Rectangle in Histogram", difficulty: "Hard" },
                        ]}
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>

                <TabsContent value="learning-path" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">PERSONALIZED_LEARNING_PATH</div>
                    </div>

                    <div className="space-y-6">
                      <LearningPathStage
                        stage={1}
                        title="Graph Theory Fundamentals"
                        description="Master the basics of graph representation and traversal algorithms."
                        duration="2 weeks"
                        status="IN_PROGRESS"
                      />

                      <LearningPathStage
                        stage={2}
                        title="Advanced Graph Algorithms"
                        description="Learn shortest path algorithms, minimum spanning trees, and network flow."
                        duration="3 weeks"
                        status="PENDING"
                      />

                      <LearningPathStage
                        stage={3}
                        title="Bit Manipulation Techniques"
                        description="Master bitwise operations and their applications in competitive programming."
                        duration="2 weeks"
                        status="PENDING"
                      />

                      <LearningPathStage
                        stage={4}
                        title="Advanced Data Structures"
                        description="Learn segment trees, Fenwick trees, and disjoint set unions."
                        duration="3 weeks"
                        status="PENDING"
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

function NeuralStat({
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

function RecommendedTopic({
  name,
  confidence,
  priority,
}: {
  name: string
  confidence: number
  priority: "HIGH" | "MEDIUM" | "LOW"
}) {
  return (
    <div className="border border-white/10 bg-[#0D1117]/80 rounded-lg p-4 hover:border-[#00FFFF] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{name}</div>
        <div
          className={`px-2 py-0.5 rounded text-xs font-mono ${
            priority === "HIGH"
              ? "bg-red-500/10 text-red-400"
              : priority === "MEDIUM"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-green-500/10 text-green-400"
          }`}
        >
          {priority}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <div className="font-mono text-xs text-white/70">CONFIDENCE</div>
          <div className="font-mono text-xs text-[#00FF41]">{confidence}%</div>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF]"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>
      <Link href="#" className="font-mono text-xs text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors">
        VIEW_LEARNING_PATH
        <ChevronRight className="inline-block ml-1 h-3 w-3" />
      </Link>
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

function SkillGap({
  topic,
  confidence,
  description,
  recommendedProblems,
}: {
  topic: string
  confidence: number
  description: string
  recommendedProblems: Array<{ name: string; difficulty: string }>
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{topic}</div>
        <div className="px-2 py-0.5 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
          {confidence}% CONFIDENCE
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 mb-4">{description}</div>

      <div className="font-mono text-xs text-[#00FFFF] mb-2">RECOMMENDED_PROBLEMS:</div>
      <div className="space-y-2">
        {recommendedProblems.map((problem, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="font-mono text-xs text-white">{problem.name}</div>
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

function LearningPathStage({
  stage,
  title,
  description,
  duration,
  status,
}: {
  stage: number
  title: string
  description: string
  duration: string
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING"
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50 relative">
      <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#00FF41] flex items-center justify-center font-mono text-xs text-black">
        {stage}
      </div>

      <div className="ml-8">
        <div className="flex items-center justify-between mb-2">
          <div className="font-mono text-sm text-white">{title}</div>
          <div
            className={`px-2 py-0.5 rounded font-mono text-xs ${
              status === "COMPLETED"
                ? "bg-green-500/10 text-green-400"
                : status === "IN_PROGRESS"
                  ? "bg-[#00FF41]/10 text-[#00FF41]"
                  : "bg-white/10 text-white/70"
            }`}
          >
            {status.replace("_", " ")}
          </div>
        </div>

        <div className="font-mono text-xs text-white/70 mb-2">{description}</div>

        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-white/50">
            Duration: <span className="text-[#00FFFF]">{duration}</span>
          </div>

          {status === "COMPLETED" ? (
            <div className="font-mono text-xs text-green-400">COMPLETED</div>
          ) : status === "IN_PROGRESS" ? (
            <Button size="sm" className="h-7 text-xs font-mono bg-[#00FF41] text-black hover:bg-[#00FF41]/80">
              CONTINUE
            </Button>
          ) : (
            <Button size="sm" className="h-7 text-xs font-mono bg-white/10 text-white hover:bg-white/20">
              START
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

