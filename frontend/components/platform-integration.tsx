"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"
import { useUserStore } from "@/lib/store"

interface PlatformIntegrationProps {
  name: string
  icon: string
  color: string
  platform: string
}

export function PlatformIntegration({ name, icon, color, platform }: PlatformIntegrationProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const { connections, togglePlatformModal } = useUserStore()

  const isConnected = connections[platform]?.connected || false

  const handleConnect = () => {
    if (isConnected) return

    setIsConnecting(true)

    // Open the platform connection modal
    togglePlatformModal(platform)

    // Reset connecting state after a delay
    setTimeout(() => {
      setIsConnecting(false)
    }, 500)
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-3 transition-all duration-300 cursor-pointer",
        isConnected ? "border-[color] bg-[color]/10" : "border-white/20 hover:border-[color]/50",
        isConnecting && "animate-pulse",
      )}
      style={{ "--color": color } as any}
      onClick={handleConnect}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image src={icon || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-md" />
          {isConnected && (
            <div className="absolute -top-1 -right-1 bg-[#00FF41] rounded-full p-0.5">
              <Zap className="h-3 w-3 text-black" />
            </div>
          )}
        </div>

        <div>
          <div className="font-mono text-sm" style={{ color: isConnected ? color : "white" }}>
            {name}
          </div>
          <div className="font-mono text-xs text-white/50">
            {isConnected ? `Connected as ${connections[platform]?.username || "User"}` : "Click to connect"}
          </div>
        </div>
      </div>
    </div>
  )
}

