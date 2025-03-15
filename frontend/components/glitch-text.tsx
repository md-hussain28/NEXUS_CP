"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchInterval?: number
}

export function GlitchText({ text, className, glitchInterval = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Initial glitch
    setTimeout(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 500)

    // Periodic glitching
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, glitchInterval)

    return () => clearInterval(interval)
  }, [glitchInterval])

  return (
    <div className={cn("relative inline-block", className)}>
      <span className={cn("relative inline-block", isGlitching && "animate-glitch")}>{text}</span>

      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 inline-block text-[#00FFFF] animate-glitch-1 clip-text">{text}</span>
          <span className="absolute top-0 left-0 inline-block text-[#FF00FF] animate-glitch-2 clip-text">{text}</span>
        </>
      )}
    </div>
  )
}

