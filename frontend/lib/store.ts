"use client"

import { create } from "zustand"

interface PlatformConnection {
  username: string
  connected: boolean
}

interface UserData {
  username?: string
  avatar?: string
  title?: string
  totalSolved?: number
  globalRank?: string
  skills?: Record<string, number>
  platforms?: Record<
    string,
    {
      rating: number
      solved: number
      rank: string
    }
  >
  ratingHistory?: Array<{
    date: string
    rating: number
    platform?: string
  }>
  topicData?: Array<{
    topic: string
    value: number
  }>
  problemsSolvedByMonth?: Array<{
    month: string
    count: number
  }>
  difficultyBreakdown?: Array<{
    name: string
    value: number
    color: string
  }>
  contestHistory?: Array<{
    name: string
    rank: number
    rating: number
    platform?: string
  }>
  upcomingContests?: Array<{
    platform: string
    name: string
    date: string
    duration: string
    url: string
  }>
  recentActivity?: Array<{
    platform: string
    problem: string
    difficulty: string
    status: "success" | "failed"
    time: string
  }>
  recentSubmissions?: Array<{
    id: string
    problem: string
    platform: string
    language: string
    status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error"
    timestamp: string
    runtime?: string
    memory?: string
  }>
  recommendedProblems?: Array<{
    platform: string
    name: string
    difficulty: string
    topic: string
    url: string
  }>
}

interface UserStore {
  connections: Record<string, PlatformConnection>
  userData: UserData | null
  isLoading: boolean
  activePlatformModal: string | null

  addPlatformConnection: (platform: string, connection: PlatformConnection) => void
  removePlatformConnection: (platform: string) => void
  setUserData: (data: UserData) => void
  setIsLoading: (loading: boolean) => void
  togglePlatformModal: (platform: string | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  connections: {},
  userData: null,
  isLoading: false,
  activePlatformModal: null,

  addPlatformConnection: (platform, connection) =>
    set((state) => ({
      connections: {
        ...state.connections,
        [platform]: connection,
      },
    })),

  removePlatformConnection: (platform) =>
    set((state) => {
      const newConnections = { ...state.connections }
      delete newConnections[platform]
      return { connections: newConnections }
    }),

  setUserData: (data) => set({ userData: data }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  togglePlatformModal: (platform) => set({ activePlatformModal: platform }),
}))

