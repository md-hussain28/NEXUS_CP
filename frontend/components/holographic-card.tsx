"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export function HolographicCard({ children, className }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50)
  const [glowY, setGlowY] = useState(50)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation (max 5 degrees)
    const rotX = (y / rect.height - 0.5) * -10
    const rotY = (x / rect.width - 0.5) * 10

    // Calculate glow position (0-100%)
    const glX = (x / rect.width) * 100
    const glY = (y / rect.height) * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlowX(glX)
    setGlowY(glY)
  }

  const handleMouseLeave = () => {
    // Reset to default position
    setRotateX(0)
    setRotateY(0)
    setGlowX(50)
    setGlowY(50)
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-lg border border-[#00FFFF]/30 bg-[#0D1117]/80 backdrop-blur-sm overflow-hidden transition-transform duration-200 transform-gpu",
        className,
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        backgroundImage: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 255, 255, 0.1) 0%, rgba(13, 17, 23, 0) 60%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic edge effect */}
      <div
        className="absolute inset-0 pointer-events-none border border-[#00FFFF]/10 rounded-lg"
        style={{
          boxShadow: `0 0 15px rgba(0, 255, 255, 0.2), 
                      inset 0 0 15px rgba(0, 255, 255, 0.1)`,
        }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="scan-lines"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

