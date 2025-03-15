"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { GlitchText } from "@/components/glitch-text"
import { HolographicCard } from "@/components/holographic-card"
import { PerformanceChart } from "@/components/performance-chart"
import { TopicRadar } from "@/components/topic-radar"
import { ContestHistory } from "@/components/contest-history"
import { ProblemSolvedChart } from "@/components/problem-solved-chart"
import { DifficultyBreakdown } from "@/components/difficulty-breakdown"
import { RecentSubmissions } from "@/components/recent-submissions"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronDown, Shield, Terminal, Zap } from "lucide-react"
import { useUserStore } from "@/lib/store"
import { fetchUserData } from "@/lib/actions"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { userData, setUserData, isLoading, setIsLoading } = useUserStore()

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      try {
        // Fetch data for all connected platforms
        const data = await fetchUserData()
        if (data) {
          setUserData(data)
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [setUserData, setIsLoading])

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-mono text-sm">RETURN_TO_MAINFRAME</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse"></div>
            <span className="font-mono text-xs text-[#00FF41]">LIVE_CONNECTION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <HolographicCard className="p-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto relative">
                  <div className="absolute inset-0 border-2 border-[#00FFFF] rounded-full animate-pulse"></div>
                  <Image
                    src={userData?.avatar || "/placeholder.svg?height=96&width=96"}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="absolute top-0 right-0 h-4 w-4 bg-[#00FF41] rounded-full"></div>
              </div>

              <div className="text-center mb-4">
                <GlitchText
                  text={userData?.username || "CYBER_CODER"}
                  className="text-xl font-bold text-[#00FFFF] mb-1"
                />
                <div className="font-mono text-xs text-white/70">{userData?.title || "ELITE HACKER"}</div>
              </div>

              <div className="space-y-4">
                {userData?.skills ? (
                  Object.entries(userData.skills).map(([skill, value]) => (
                    <StatusBar key={skill} label={skill.toUpperCase()} value={value as number} />
                  ))
                ) : (
                  <>
                    <StatusBar label="ALGORITHM" value={78} />
                    <StatusBar label="DATA_STRUCT" value={65} />
                    <StatusBar label="DYNAMIC_PROG" value={92} />
                    <StatusBar label="GRAPH_THEORY" value={45} />
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-mono text-xs text-white/70">GLOBAL_RANK</div>
                  <div className="font-mono text-lg text-[#00FF41]">{userData?.globalRank || "#1,337"}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-mono text-xs text-white/70">PROBLEMS_SOLVED</div>
                  <div className="font-mono text-lg text-[#00FF41]">{userData?.totalSolved || 421}</div>
                </div>
              </div>
            </HolographicCard>

            <div className="mt-6 space-y-4">
              {userData?.platforms ? (
                Object.entries(userData.platforms).map(([platform, data]) => (
                  <PlatformCard
                    key={platform}
                    name={platform}
                    rating={data.rating}
                    solved={data.solved}
                    rank={data.rank}
                    color={
                      platform === "leetcode"
                        ? "#FFA116"
                        : platform === "codeforces"
                          ? "#318CE7"
                          : platform === "codechef"
                            ? "#5B4638"
                            : "#FFFFFF"
                    }
                  />
                ))
              ) : (
                <>
                  <PlatformCard name="LeetCode" rating={1842} solved={256} rank="#4,201" color="#FFA116" />
                  <PlatformCard name="CodeForces" rating={1756} solved={98} rank="#6,543" color="#318CE7" />
                  <PlatformCard name="CodeChef" rating={1921} solved={67} rank="#2,109" color="#5B4638" />
                </>
              )}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <GlitchText text="NEURAL_DASHBOARD" className="text-3xl font-bold text-[#00FF41] mb-2" />
              <div className="font-mono text-sm text-white/70">
                Visualizing your competitive programming neural network
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="bg-[#0D1117] border border-[#00FFFF]/30">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                >
                  OVERVIEW
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                >
                  PERFORMANCE
                </TabsTrigger>
                <TabsTrigger
                  value="topics"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                >
                  TOPICS
                </TabsTrigger>
                <TabsTrigger
                  value="contests"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                >
                  CONTESTS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">PERFORMANCE_MATRIX</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Terminal className="h-3 w-3 mr-1" /> DETAILS
                      </Button>
                    </div>
                    <div className="h-[250px]">
                      <PerformanceChart data={userData?.ratingHistory} />
                    </div>
                  </HolographicCard>

                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">TOPIC_COVERAGE</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Shield className="h-3 w-3 mr-1" /> ANALYZE
                      </Button>
                    </div>
                    <div className="h-[250px]">
                      <TopicRadar data={userData?.topicData} />
                    </div>
                  </HolographicCard>
                </div>

                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-[#00FFFF]">RECENT_ACTIVITY</div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                      VIEW_ALL <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {userData?.recentActivity ? (
                      userData.recentActivity.map((activity, index) => (
                        <ActivityItem
                          key={index}
                          platform={activity.platform}
                          problem={activity.problem}
                          difficulty={activity.difficulty}
                          status={activity.status}
                          time={activity.time}
                        />
                      ))
                    ) : (
                      <>
                        <ActivityItem
                          platform="LeetCode"
                          problem="Binary Tree Maximum Path Sum"
                          difficulty="Hard"
                          status="success"
                          time="2 hours ago"
                        />
                        <ActivityItem
                          platform="CodeForces"
                          problem="Divisibility Problem"
                          difficulty="Medium"
                          status="success"
                          time="Yesterday"
                        />
                        <ActivityItem
                          platform="LeetCode"
                          problem="Merge K Sorted Lists"
                          difficulty="Hard"
                          status="failed"
                          time="Yesterday"
                        />
                        <ActivityItem
                          platform="CodeChef"
                          problem="Chef and Strings"
                          difficulty="Easy"
                          status="success"
                          time="3 days ago"
                        />
                      </>
                    )}
                  </div>
                </HolographicCard>
              </TabsContent>

              <TabsContent value="performance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">RATING_PROGRESSION</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Terminal className="h-3 w-3 mr-1" /> EXPORT
                      </Button>
                    </div>
                    <div className="h-[300px]">
                      <PerformanceChart data={userData?.ratingHistory} showAllData={true} />
                    </div>
                  </HolographicCard>

                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">PROBLEMS_SOLVED</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Shield className="h-3 w-3 mr-1" /> DETAILS
                      </Button>
                    </div>
                    <div className="h-[300px]">
                      <ProblemSolvedChart data={userData?.problemsSolvedByMonth} />
                    </div>
                  </HolographicCard>
                </div>

                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-[#00FFFF]">DIFFICULTY_BREAKDOWN</div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                      ANALYZE <Zap className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="h-[300px]">
                    <DifficultyBreakdown data={userData?.difficultyBreakdown} />
                  </div>
                </HolographicCard>
              </TabsContent>

              <TabsContent value="topics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">TOPIC_MASTERY</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Terminal className="h-3 w-3 mr-1" /> DETAILS
                      </Button>
                    </div>
                    <div className="h-[300px]">
                      <TopicRadar data={userData?.topicData} showAllData={true} />
                    </div>
                  </HolographicCard>

                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">TOPIC_DISTRIBUTION</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Shield className="h-3 w-3 mr-1" /> ANALYZE
                      </Button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="font-mono text-white/50 text-center">
                        <Shield className="h-10 w-10 mx-auto mb-4 text-[#00FF41]" />
                        {isLoading ? (
                          <div className="loading-text">ANALYZING NEURAL PATTERNS...</div>
                        ) : (
                          <div>Topic distribution visualization would be displayed here</div>
                        )}
                      </div>
                    </div>
                  </HolographicCard>
                </div>

                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-[#00FFFF]">RECOMMENDED_PROBLEMS</div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                      GENERATE <Zap className="h-3 w-3 ml-1" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {userData?.recommendedProblems ? (
                      userData.recommendedProblems.map((problem, index) => (
                        <RecommendedProblem
                          key={index}
                          platform={problem.platform}
                          name={problem.name}
                          difficulty={problem.difficulty}
                          topic={problem.topic}
                          url={problem.url}
                        />
                      ))
                    ) : (
                      <>
                        <RecommendedProblem
                          platform="LeetCode"
                          name="Maximum Subarray"
                          difficulty="Medium"
                          topic="Dynamic Programming"
                          url="#"
                        />
                        <RecommendedProblem
                          platform="CodeForces"
                          name="Shortest Path Problem"
                          difficulty="Hard"
                          topic="Graph Theory"
                          url="#"
                        />
                        <RecommendedProblem
                          platform="LeetCode"
                          name="Merge Intervals"
                          difficulty="Medium"
                          topic="Arrays"
                          url="#"
                        />
                      </>
                    )}
                  </div>
                </HolographicCard>
              </TabsContent>

              <TabsContent value="contests">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">CONTEST_PERFORMANCE</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Terminal className="h-3 w-3 mr-1" /> DETAILS
                      </Button>
                    </div>
                    <div className="h-[300px]">
                      <ContestHistory data={userData?.contestHistory} />
                    </div>
                  </HolographicCard>

                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">UPCOMING_CONTESTS</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                        <Shield className="h-3 w-3 mr-1" /> CALENDAR
                      </Button>
                    </div>
                    <div className="space-y-4 mt-4">
                      {userData?.upcomingContests ? (
                        userData.upcomingContests.map((contest, index) => (
                          <UpcomingContest
                            key={index}
                            platform={contest.platform}
                            name={contest.name}
                            date={contest.date}
                            duration={contest.duration}
                            url={contest.url}
                          />
                        ))
                      ) : (
                        <>
                          <UpcomingContest
                            platform="LeetCode"
                            name="Weekly Contest 345"
                            date="Tomorrow, 8:30 AM"
                            duration="1 hour 30 minutes"
                            url="#"
                          />
                          <UpcomingContest
                            platform="CodeForces"
                            name="Codeforces Round #835 (Div. 2)"
                            date="Mar 18, 2025, 7:35 PM"
                            duration="2 hours"
                            url="#"
                          />
                          <UpcomingContest
                            platform="CodeChef"
                            name="March Long Challenge 2025"
                            date="Mar 20, 2025, 3:00 PM"
                            duration="10 days"
                            url="#"
                          />
                        </>
                      )}
                    </div>
                  </HolographicCard>
                </div>

                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-[#00FFFF]">RECENT_SUBMISSIONS</div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-[#00FF41]">
                      VIEW_ALL <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <RecentSubmissions data={userData?.recentSubmissions} />
                  </div>
                </HolographicCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatusBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="font-mono text-xs text-white/70">{label}</div>
        <div className="font-mono text-xs text-[#00FF41]">{value}%</div>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF]" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

function PlatformCard({
  name,
  rating,
  solved,
  rank,
  color,
}: {
  name: string
  rating: number
  solved: number
  rank: string
  color: string
}) {
  return (
    <div
      className="border border-white/10 bg-[#0D1117]/80 rounded-lg p-4 hover:border-[color] transition-colors"
      style={{ "--hover-color": color } as any}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-sm" style={{ color }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
        <div className="px-2 py-0.5 rounded text-xs font-mono bg-white/5">
          Rating: <span className="text-[#00FF41]">{rating}</span>
        </div>
      </div>
      <div className="flex justify-between text-xs font-mono text-white/70">
        <div>
          Solved: <span className="text-white">{solved}</span>
        </div>
        <div>
          Rank: <span className="text-white">{rank}</span>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({
  platform,
  problem,
  difficulty,
  status,
  time,
}: {
  platform: string
  problem: string
  difficulty: string
  status: "success" | "failed"
  time: string
}) {
  return (
    <div className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="font-mono text-sm text-white">{problem}</div>
        <div className={`text-xs font-mono ${status === "success" ? "text-[#00FF41]" : "text-red-500"}`}>
          {status === "success" ? "SOLVED" : "FAILED"}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="text-white/70">
          {platform} •
          <span
            className={`ml-1 ${
              difficulty === "Easy" ? "text-green-400" : difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
            }`}
          >
            {difficulty}
          </span>
        </div>
        <div className="text-white/50">{time}</div>
      </div>
    </div>
  )
}

function RecommendedProblem({
  platform,
  name,
  difficulty,
  topic,
  url,
}: {
  platform: string
  name: string
  difficulty: string
  topic: string
  url: string
}) {
  return (
    <div className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="font-mono text-sm text-white">{name}</div>
        <div
          className={`text-xs font-mono ${
            difficulty === "Easy" ? "text-green-400" : difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
          }`}
        >
          {difficulty}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="text-white/70">
          {platform} • <span className="text-[#00FFFF]">{topic}</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#00FF41] hover:underline">
          SOLVE_PROBLEM
        </a>
      </div>
    </div>
  )
}

function UpcomingContest({
  platform,
  name,
  date,
  duration,
  url,
}: {
  platform: string
  name: string
  date: string
  duration: string
  url: string
}) {
  return (
    <div className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="font-mono text-sm text-white">{name}</div>
        <div className="text-xs font-mono text-[#00FF41]">{platform}</div>
      </div>
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="text-white/70">
          {date} • <span className="text-[#00FFFF]">{duration}</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#00FF41] hover:underline">
          REGISTER
        </a>
      </div>
    </div>
  )
}

