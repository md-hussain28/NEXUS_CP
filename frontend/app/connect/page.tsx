"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { GlitchText } from "@/components/glitch-text"
import { HolographicCard } from "@/components/holographic-card"
import { PlatformConnectionForm } from "@/components/platform-connection-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Database, Lock, Shield, Terminal, Zap } from "lucide-react"
import { useUserStore } from "@/lib/store"

export default function ConnectPage() {
  const [activeTab, setActiveTab] = useState("connect")
  const { connections } = useUserStore()

  // Count connected platforms
  const connectedCount = Object.values(connections).filter((c) => c.connected).length

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
              <span className="font-mono text-xs text-[#00FF41]">SYSTEM_READY</span>
            </div>
          </div>

          <div className="mb-8">
            <GlitchText
              text="NEURAL_INTERFACE"
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-[#00FF41]"
            />
            <div className="font-mono text-lg text-[#00FFFF] opacity-90">
              Establish connection to competitive programming mainframes
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="connect" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-[#0D1117] border border-[#00FFFF]/30">
                  <TabsTrigger
                    value="connect"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    CONNECT
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    SECURITY
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
                  >
                    SETTINGS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="connect" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="font-mono text-[#00FFFF]">PLATFORM_CONNECTION_MATRIX</div>
                      <div className="px-2 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
                        {connectedCount}/3 CONNECTED
                      </div>
                    </div>

                    <div className="space-y-6">
                      <PlatformConnectionForm />
                    </div>
                  </HolographicCard>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-6">
                      <Shield className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">SECURITY_PROTOCOLS</div>
                    </div>

                    <div className="space-y-6">
                      <SecurityProtocol
                        title="DATA_ENCRYPTION"
                        description="All your competitive programming data is encrypted using advanced quantum algorithms."
                        icon={<Lock className="h-5 w-5 text-[#00FF41]" />}
                        status="ACTIVE"
                      />

                      <SecurityProtocol
                        title="API_SECURITY"
                        description="Your API keys are stored securely and never shared with third parties."
                        icon={<Terminal className="h-5 w-5 text-[#00FF41]" />}
                        status="ACTIVE"
                      />

                      <SecurityProtocol
                        title="DATABASE_ISOLATION"
                        description="Your data is stored in isolated database shards for maximum security."
                        icon={<Database className="h-5 w-5 text-[#00FF41]" />}
                        status="ACTIVE"
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <HolographicCard className="p-6">
                    <div className="flex items-center mb-6">
                      <Terminal className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="font-mono text-[#00FFFF]">CONNECTION_SETTINGS</div>
                    </div>

                    <div className="space-y-6">
                      <ConnectionSetting
                        title="AUTO_SYNC"
                        description="Automatically sync your data every 6 hours."
                        enabled={true}
                      />

                      <ConnectionSetting
                        title="REAL_TIME_UPDATES"
                        description="Receive real-time updates when you solve a problem."
                        enabled={true}
                      />

                      <ConnectionSetting
                        title="CONTEST_NOTIFICATIONS"
                        description="Get notified about upcoming contests."
                        enabled={true}
                      />
                    </div>
                  </HolographicCard>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <HolographicCard className="p-6 h-full">
                <div className="flex items-center mb-6">
                  <Zap className="h-5 w-5 text-[#00FFFF] mr-2" />
                  <div className="font-mono text-[#00FFFF]">CONNECTION_STATUS</div>
                </div>

                <div className="space-y-4">
                  <ConnectionStatus
                    platform="LeetCode"
                    status={connections.leetcode?.connected ? "CONNECTED" : "DISCONNECTED"}
                    username={connections.leetcode?.username}
                    color="#FFA116"
                  />

                  <ConnectionStatus
                    platform="CodeForces"
                    status={connections.codeforces?.connected ? "CONNECTED" : "DISCONNECTED"}
                    username={connections.codeforces?.username}
                    color="#318CE7"
                  />

                  <ConnectionStatus
                    platform="CodeChef"
                    status={connections.codechef?.connected ? "CONNECTED" : "DISCONNECTED"}
                    username={connections.codechef?.username}
                    color="#5B4638"
                  />
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <div className="font-mono text-xs text-white/70 mb-2">CONNECTION_LOG</div>
                  <div className="font-mono text-xs text-white/50 h-40 overflow-y-auto bg-black/20 p-2 rounded border border-white/10">
                    <div className="mb-1">
                      <span className="text-[#00FF41]">[SYSTEM]</span> Initializing neural interface...
                    </div>
                    <div className="mb-1">
                      <span className="text-[#00FF41]">[SYSTEM]</span> Scanning for competitive programming platforms...
                    </div>
                    {connections.leetcode?.connected && (
                      <div className="mb-1">
                        <span className="text-[#00FF41]">[SUCCESS]</span> Connected to LeetCode as{" "}
                        {connections.leetcode.username}
                      </div>
                    )}
                    {connections.codeforces?.connected && (
                      <div className="mb-1">
                        <span className="text-[#00FF41]">[SUCCESS]</span> Connected to CodeForces as{" "}
                        {connections.codeforces.username}
                      </div>
                    )}
                    {connections.codechef?.connected && (
                      <div className="mb-1">
                        <span className="text-[#00FF41]">[SUCCESS]</span> Connected to CodeChef as{" "}
                        {connections.codechef.username}
                      </div>
                    )}
                    <div className="mb-1">
                      <span className="text-[#00FF41]">[SYSTEM]</span> Neural interface ready.
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button className="w-full bg-[#00FF41] text-black hover:bg-[#00FF41]/80 font-mono">
                      ACCESS_DASHBOARD
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </HolographicCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function SecurityProtocol({
  title,
  description,
  icon,
  status,
}: {
  title: string
  description: string
  icon: React.ReactNode
  status: string
}) {
  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <div className="font-mono text-sm text-white ml-2">{title}</div>
        </div>
        <div className="px-2 py-0.5 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded font-mono text-xs text-[#00FF41]">
          {status}
        </div>
      </div>
      <div className="font-mono text-xs text-white/70">{description}</div>
    </div>
  )
}

function ConnectionSetting({
  title,
  description,
  enabled,
}: {
  title: string
  description: string
  enabled: boolean
}) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  return (
    <div className="border border-[#00FFFF]/20 rounded-lg p-4 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm text-white">{title}</div>
        <button
          className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? "bg-[#00FF41]" : "bg-white/20"}`}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="font-mono text-xs text-white/70">{description}</div>
    </div>
  )
}

function ConnectionStatus({
  platform,
  status,
  username,
  color,
}: {
  platform: string
  status: string
  username?: string
  color: string
}) {
  return (
    <div className="border border-white/10 rounded-lg p-3 bg-[#0D1117]/50">
      <div className="flex items-center justify-between mb-1">
        <div className="font-mono text-sm" style={{ color }}>
          {platform}
        </div>
        <div
          className={`px-2 py-0.5 rounded text-xs font-mono ${
            status === "CONNECTED" ? "bg-[#00FF41]/10 text-[#00FF41]" : "bg-red-500/10 text-red-400"
          }`}
        >
          {status}
        </div>
      </div>
      {status === "CONNECTED" && username && (
        <div className="font-mono text-xs text-white/70">
          Connected as <span className="text-white">{username}</span>
        </div>
      )}
      {status !== "CONNECTED" && <div className="font-mono text-xs text-white/70">Not connected</div>}
    </div>
  )
}

