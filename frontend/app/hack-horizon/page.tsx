"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { CodeRain } from "@/components/code-rain";
import { GlitchText } from "@/components/glitch-text";
import { HolographicCard } from "@/components/holographic-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Compass, Map, Zap } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { SkillMap } from "@/components/skill-map";

export default function HackHorizonPage() {
  const [activeTab, setActiveTab] = useState("skill-map");
  const { userData, isLoading } = useUserStore();
  const [generatingMap, setGeneratingMap] = useState(false);

  // Simulate map generation
  const handleGenerateMap = () => {
    setGeneratingMap(true);
    setTimeout(() => {
      setGeneratingMap(false);
    }, 3000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D1117] text-white">
      {/* Animated code rain background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <CodeRain />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-sm">RETURN_TO_MAINFRAME</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse"></div>
              <span className="font-mono text-xs text-[#00FF41]">
                HORIZON_ACTIVE
              </span>
            </div>
          </div>

          <div className="mb-8">
            <GlitchText
              text="HACK_HORIZON"
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-[#00FF41]"
            />
            <div className="font-mono text-lg text-[#00FFFF] opacity-90">
              Comprehensive Skill Development
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <HolographicCard className="p-6">
                <div className="flex items-center mb-6">
                  <Map className="h-5 w-5 text-[#00FFFF] mr-2" />
                  <div className="font-mono text-[#00FFFF]">SKILL_METRICS</div>
                </div>

                <div className="space-y-4">
                  <SkillMetric
                    label="MAPPED_SKILLS"
                    value={userData?.topicData?.length || 8}
                  />

                  <SkillMetric label="UNEXPLORED_AREAS" value={5} />

                  <SkillMetric label="SKILL_BRANCHES" value={12} />

                  <SkillMetric label="MASTERY_INDEX" value={72} isPercentage />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-[#00FF41] text-black hover:bg-[#00FF41]/80 font-mono"
                    onClick={handleGenerateMap}
                    disabled={generatingMap}
                  >
                    {generatingMap ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin border-2 border-black border-t-transparent rounded-full"></div>
                        GENERATING...
                      </>
                    ) : (
                      <>
                        GENERATE_SKILL_MAP
                        <Zap className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </HolographicCard>

              <div className="mt-6 space-y-4">
                <SkillBranch
                  name="Algorithm Design"
                  mastery={75}
                  subskills={[
                    "Greedy Algorithms",
                    "Divide and Conquer",
                    "Dynamic Programming",
                  ]}
                />

                <SkillBranch
                  name="Data Structures"
                  mastery={68}
                  subskills={["Trees", "Graphs", "Hash Tables", "Heaps"]}
                />

                <SkillBranch
                  name="Advanced Techniques"
                  mastery={45}
                  subskills={["Segment Trees", "Fenwick Trees", "Network Flow"]}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <Tabs
                defaultValue="skill-map"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full grid grid-cols-3 bg-[#0D1117] border border-[#00FFFF]/30">
                  <TabsTrigger
                    value="skill-map"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    SKILL_MAP
                  </TabsTrigger>
                  <TabsTrigger
                    value="expansion-paths"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    EXPANSION_PATHS
                  </TabsTrigger>
                  <TabsTrigger
                    value="cross-topic"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    CROSS_TOPIC
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="skill-map" className="mt-6">
                  <HolographicCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[#00FFFF]">
                        CURRENT_SKILL_LANDSCAPE
                      </div>
                      <div className="px-2 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
                        MAPPED
                      </div>
                    </div>

                    <div className="h-[400px]">
                      <SkillMap />
                    </div>

                    <div className="mt-4 font-mono text-xs text-white/70 text-center">
                      Your current skill landscape. Brighter nodes represent
                      higher mastery levels.
                    </div>
                  </HolographicCard>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                      title="SKILL_MAPPING"
                      description="Comprehensive visualization of your current programming skills and mastery levels."
                      icon={<Map className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="TERRITORY_DISCOVERY"
                      description="Identify unexplored coding territories and potential growth areas."
                      icon={<Compass className="h-5 w-5 text-[#00FF41]" />}
                    />

                    <FeatureCard
                      title="STRATEGIC_PATHS"
                      description="Visualize optimal learning paths to expand your programming expertise."
                      icon={<Zap className="h-5 w-5 text-[#00FF41]" />}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="expansion-paths" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-4">
                      <Compass className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">
                        SKILL_EXPANSION_PATHS
                      </div>
                    </div>

                    <div className="space-y-6">
                      <ExpansionPath
                        title="Advanced Graph Algorithms"
                        description="Expand your graph theory knowledge with advanced algorithms and applications."
                        currentLevel="Intermediate"
                        targetLevel="Expert"
                        requiredSkills={[
                          "Basic Graph Theory",
                          "Shortest Path Algorithms",
                          "Dynamic Programming",
                        ]}
                        expansionSteps={[
                          "Network Flow Algorithms",
                          "Minimum Spanning Trees",
                          "Advanced Graph Optimization",
                        ]}
                      />

                      <ExpansionPath
                        title="Competitive Data Structures"
                        description="Master advanced data structures used in competitive programming."
                        currentLevel="Intermediate"
                        targetLevel="Expert"
                        requiredSkills={[
                          "Basic Data Structures",
                          "Trees",
                          "Heaps",
                        ]}
                        expansionSteps={[
                          "Segment Trees",
                          "Fenwick Trees",
                          "Sparse Tables",
                        ]}
                      />

                      <ExpansionPath
                        title="String Algorithms"
                        description="Develop expertise in string processing and pattern matching algorithms."
                        currentLevel="Beginner"
                        targetLevel="Advanced"
                        requiredSkills={[
                          "Basic String Manipulation",
                          "Arrays",
                          "Dynamic Programming",
                        ]}
                        expansionSteps={[
                          "KMP Algorithm",
                          "Suffix Arrays",
                          "Aho-Corasick Algorithm",
                        ]}
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>

                <TabsContent value="cross-topic" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">
                        CROSS_TOPIC_CHALLENGES
                      </div>
                    </div>

                    <div className="space-y-6">
                      <CrossTopicChallenge
                        title="Graph Theory + Dynamic Programming"
                        description="Solve problems that combine graph traversal with dynamic programming techniques."
                        difficulty="Hard"
                        requiredSkills={[
                          "Graph Theory",
                          "Dynamic Programming",
                          "Shortest Path Algorithms",
                        ]}
                        recommendedProblems={[
                          {
                            name: "Longest Path in DAG",
                            platform: "CodeForces",
                          },
                          { name: "Minimum Path Sum", platform: "LeetCode" },
                          {
                            name: "Cheapest Flights Within K Stops",
                            platform: "LeetCode",
                          },
                        ]}
                      />

                      <CrossTopicChallenge
                        title="Data Structures + Bit Manipulation"
                        description="Master problems that require both advanced data structures and bit manipulation techniques."
                        difficulty="Medium"
                        requiredSkills={["Trees", "Heaps", "Bit Manipulation"]}
                        recommendedProblems={[
                          {
                            name: "Maximum XOR of Two Numbers in an Array",
                            platform: "LeetCode",
                          },
                          {
                            name: "Bitwise AND of Numbers Range",
                            platform: "LeetCode",
                          },
                          {
                            name: "Binary Tree Maximum XOR Path",
                            platform: "CodeForces",
                          },
                        ]}
                      />

                      <CrossTopicChallenge
                        title="String Algorithms + Dynamic Programming"
                        description="Tackle problems that combine string processing with dynamic programming approaches."
                        difficulty="Hard"
                        requiredSkills={[
                          "String Manipulation",
                          "Dynamic Programming",
                          "Pattern Matching",
                        ]}
                        recommendedProblems={[
                          {
                            name: "Longest Palindromic Substring",
                            platform: "LeetCode",
                          },
                          { name: "Edit Distance", platform: "LeetCode" },
                          {
                            name: "Regular Expression Matching",
                            platform: "LeetCode",
                          },
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
  );
}

function SkillMetric({
  label,
  value,
  isPercentage = false,
}: {
  label: string;
  value: number;
  isPercentage?: boolean;
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
          <div
            className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF]"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

function SkillBranch({
  name,
  mastery,
  subskills,
}: {
  name: string;
  mastery: number;
  subskills: string[];
}) {
  return (
    <div className="border border-white/10 bg-[#0D1117]/80 rounded-lg p-4 hover:border-[#00FFFF] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{name}</div>
        <div className="px-2 py-0.5 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
          {mastery}% MASTERY
        </div>
      </div>

      <div className="mb-2">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF]"
            style={{ width: `${mastery}%` }}
          ></div>
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 mb-2">Subskills:</div>
      <div className="flex flex-wrap gap-2">
        {subskills.map((skill, index) => (
          <div
            key={index}
            className="px-2 py-0.5 bg-white/10 rounded font-mono text-xs text-white/80"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-[#00FF41]/30 bg-[#0D1117]/80 backdrop-blur-sm p-4 rounded-lg hover:border-[#00FF41] transition-colors group">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-mono text-[#00FF41] ml-2 group-hover:text-[#00FFFF] transition-colors">
          {title}
        </h3>
      </div>
      <p className="font-mono text-sm text-white/70">{description}</p>
      <div className="mt-4 h-1 w-0 bg-[#00FFFF] group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}

function ExpansionPath({
  title,
  description,
  currentLevel,
  targetLevel,
  requiredSkills,
  expansionSteps,
}: {
  title: string;
  description: string;
  currentLevel: string;
  targetLevel: string;
  requiredSkills: string[];
  expansionSteps: string[];
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{title}</div>
        <div className="flex items-center">
          <div className="font-mono text-xs text-white/50 mr-2">
            {currentLevel}
          </div>
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00FF41] to-[#00FFFF] w-1/2"></div>
          </div>
          <div className="font-mono text-xs text-[#00FFFF] ml-2">
            {targetLevel}
          </div>
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 mb-3">{description}</div>

      <div className="mb-3">
        <div className="font-mono text-xs text-[#00FFFF] mb-1">
          REQUIRED_SKILLS:
        </div>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, index) => (
            <div
              key={index}
              className="px-2 py-0.5 bg-[#00FF41]/10 rounded font-mono text-xs text-[#00FF41]"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-mono text-xs text-[#00FFFF] mb-1">
          EXPANSION_STEPS:
        </div>
        <div className="space-y-2">
          {expansionSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[#0D1117] border border-[#00FFFF] flex items-center justify-center font-mono text-xs text-[#00FFFF] mr-2">
                {index + 1}
              </div>
              <div className="font-mono text-xs text-white">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrossTopicChallenge({
  title,
  description,
  difficulty,
  requiredSkills,
  recommendedProblems,
}: {
  title: string;
  description: string;
  difficulty: string;
  requiredSkills: string[];
  recommendedProblems: Array<{ name: string; platform: string }>;
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{title}</div>
        <div
          className={`px-2 py-0.5 rounded font-mono text-xs ${
            difficulty === "Easy"
              ? "bg-green-500/10 text-green-400"
              : difficulty === "Medium"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {difficulty}
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 mb-3">{description}</div>

      <div className="mb-3">
        <div className="font-mono text-xs text-[#00FFFF] mb-1">
          REQUIRED_SKILLS:
        </div>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, index) => (
            <div
              key={index}
              className="px-2 py-0.5 bg-[#00FF41]/10 rounded font-mono text-xs text-[#00FF41]"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-mono text-xs text-[#00FFFF] mb-1">
          RECOMMENDED_PROBLEMS:
        </div>
        <div className="space-y-2">
          {recommendedProblems.map((problem, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="font-mono text-xs text-white">{problem.name}</div>
              <div className="px-1.5 py-0.5 rounded text-[0.65rem] font-mono bg-white/10 text-white/70">
                {problem.platform}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
