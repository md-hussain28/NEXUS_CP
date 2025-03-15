"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { connectPlatform } from "@/lib/actions"
import { useUserStore } from "@/lib/store"
import { Loader2, Zap } from "lucide-react"

export function PlatformConnectionForm() {
  const [activePlatform, setActivePlatform] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { connections, addPlatformConnection } = useUserStore()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!activePlatform) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await connectPlatform(activePlatform, username, apiKey)

      if (result.success) {
        setSuccess(`Successfully connected to ${activePlatform}`)
        addPlatformConnection(activePlatform, { username, connected: true })
        setUsername("")
        setApiKey("")
        setActivePlatform(null)
      } else {
        setError(result.error || "Failed to connect. Please check your credentials.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const platforms = [
    { id: "leetcode", name: "LeetCode", icon: "/placeholder.svg?height=60&width=60", color: "#FFA116" },
    { id: "codeforces", name: "CodeForces", icon: "/placeholder.svg?height=60&width=60", color: "#318CE7" },
    { id: "codechef", name: "CodeChef", icon: "/placeholder.svg?height=60&width=60", color: "#5B4638" },
  ]

  return (
    <div className="space-y-6">
      {!activePlatform ? (
        <>
          <div className="font-mono text-sm text-[#00FFFF] mb-4">SELECT_PLATFORM_TO_CONNECT</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                id={platform.id}
                name={platform.name}
                icon={platform.icon}
                color={platform.color}
                isConnected={connections[platform.id]?.connected || false}
                username={connections[platform.id]?.username}
                onClick={() => {
                  if (!connections[platform.id]?.connected) {
                    setActivePlatform(platform.id)
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleConnect} className="space-y-4 border border-[#00FFFF]/30 rounded-lg p-4 bg-[#0D1117]/50">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-sm text-[#00FFFF]">CONNECT_TO_{activePlatform.toUpperCase()}</div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setActivePlatform(null)}
              className="h-8 text-xs font-mono text-[#00FFFF] hover:text-white"
            >
              CANCEL
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="font-mono text-xs text-white/70">
              USERNAME
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#0D1117] border-white/20 font-mono text-sm"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key" className="font-mono text-xs text-white/70">
              API_KEY {activePlatform === "leetcode" && "(Optional)"}
            </Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-[#0D1117] border-white/20 font-mono text-sm"
              placeholder="Enter your API key"
              required={activePlatform !== "leetcode"}
              type="password"
            />
          </div>

          {error && (
            <div className="text-red-500 font-mono text-xs p-2 border border-red-500/30 bg-red-500/10 rounded">
              ERROR: {error}
            </div>
          )}

          {success && (
            <div className="text-[#00FF41] font-mono text-xs p-2 border border-[#00FF41]/30 bg-[#00FF41]/10 rounded">
              SUCCESS: {success}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#00FF41] text-black hover:bg-[#00FF41]/80 font-mono"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                CONNECTING...
              </>
            ) : (
              "ESTABLISH_CONNECTION"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

function PlatformCard({
  id,
  name,
  icon,
  color,
  isConnected,
  username,
  onClick,
}: {
  id: string
  name: string
  icon: string
  color: string
  isConnected: boolean
  username?: string
  onClick: () => void
}) {
  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-300 cursor-pointer ${
        isConnected ? `border-[${color}] bg-[${color}]/10` : "border-white/20 hover:border-white/50"
      }`}
      style={{ borderColor: isConnected ? color : "", backgroundColor: isConnected ? `${color}10` : "" }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-16 h-16 mb-3">
          <Image src={icon || "/placeholder.svg"} alt={name} width={60} height={60} className="rounded-md" />
          {isConnected && (
            <div className="absolute -top-1 -right-1 bg-[#00FF41] rounded-full p-1">
              <Zap className="h-4 w-4 text-black" />
            </div>
          )}
        </div>

        <div className="font-mono text-sm mb-1" style={{ color: isConnected ? color : "white" }}>
          {name}
        </div>

        <div className="font-mono text-xs text-white/50">
          {isConnected ? `Connected as ${username}` : "Click to connect"}
        </div>
      </div>
    </div>
  )
}

