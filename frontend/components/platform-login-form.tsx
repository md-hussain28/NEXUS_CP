"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { connectPlatform } from "@/lib/actions"
import { useUserStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

export function PlatformLoginForm() {
  const [activeTab, setActiveTab] = useState("leetcode")
  const [username, setUsername] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { addPlatformConnection } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await connectPlatform(activeTab, username, apiKey)

      if (result.success) {
        setSuccess(`Successfully connected to ${activeTab}`)
        addPlatformConnection(activeTab, { username, connected: true })
        setUsername("")
        setApiKey("")
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

  return (
    <div className="mt-4 border border-[#00FFFF]/30 bg-[#0D1117]/90 backdrop-blur-sm p-4 rounded-lg">
      <div className="font-mono text-[#00FFFF] text-sm mb-3">ESTABLISH_CONNECTION</div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-[#0D1117] border border-[#00FFFF]/30">
          <TabsTrigger
            value="leetcode"
            className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
          >
            LEETCODE
          </TabsTrigger>
          <TabsTrigger
            value="codeforces"
            className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
          >
            CODEFORCES
          </TabsTrigger>
          <TabsTrigger
            value="codechef"
            className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] font-mono"
          >
            CODECHEF
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
              API_KEY {activeTab === "leetcode" && "(Optional)"}
            </Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-[#0D1117] border-white/20 font-mono text-sm"
              placeholder="Enter your API key"
              required={activeTab !== "leetcode"}
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
              "CONNECT_PLATFORM"
            )}
          </Button>
        </form>
      </Tabs>
    </div>
  )
}

