"use server"

import { revalidatePath } from "next/cache"

// Mock data for platforms
const mockLeetCodeData = {
  username: "cyber_coder",
  avatar: "/placeholder.svg?height=96&width=96",
  title: "ELITE HACKER",
  totalSolved: 421,
  globalRank: "#1,337",
  skills: {
    ALGORITHM: 78,
    DATA_STRUCT: 65,
    DYNAMIC_PROG: 92,
    GRAPH_THEORY: 45,
  },
  platforms: {
    leetcode: {
      rating: 1842,
      solved: 256,
      rank: "#4,201",
    },
    codeforces: {
      rating: 1756,
      solved: 98,
      rank: "#6,543",
    },
    codechef: {
      rating: 1921,
      solved: 67,
      rank: "#2,109",
    },
  },
  ratingHistory: [
    { date: "Jan", rating: 1200, platform: "leetcode" },
    { date: "Feb", rating: 1250, platform: "leetcode" },
    { date: "Mar", rating: 1300, platform: "leetcode" },
    { date: "Apr", rating: 1280, platform: "leetcode" },
    { date: "May", rating: 1350, platform: "leetcode" },
    { date: "Jun", rating: 1400, platform: "leetcode" },
    { date: "Jul", rating: 1450, platform: "leetcode" },
    { date: "Aug", rating: 1500, platform: "leetcode" },
    { date: "Sep", rating: 1550, platform: "leetcode" },
    { date: "Oct", rating: 1600, platform: "leetcode" },
    { date: "Nov", rating: 1650, platform: "leetcode" },
    { date: "Dec", rating: 1750, platform: "leetcode" },
    { date: "Jan", rating: 1100, platform: "codeforces" },
    { date: "Feb", rating: 1200, platform: "codeforces" },
    { date: "Mar", rating: 1250, platform: "codeforces" },
    { date: "Apr", rating: 1300, platform: "codeforces" },
    { date: "May", rating: 1400, platform: "codeforces" },
    { date: "Jun", rating: 1450, platform: "codeforces" },
    { date: "Jul", rating: 1500, platform: "codeforces" },
    { date: "Aug", rating: 1550, platform: "codeforces" },
    { date: "Sep", rating: 1600, platform: "codeforces" },
    { date: "Oct", rating: 1650, platform: "codeforces" },
    { date: "Nov", rating: 1700, platform: "codeforces" },
    { date: "Dec", rating: 1756, platform: "codeforces" },
  ],
  topicData: [
    { topic: "Arrays", value: 85 },
    { topic: "Strings", value: 70 },
    { topic: "DP", value: 90 },
    { topic: "Graphs", value: 45 },
    { topic: "Trees", value: 75 },
    { topic: "Greedy", value: 60 },
    { topic: "Backtracking", value: 55 },
    { topic: "Bit Manipulation", value: 40 },
  ],
  problemsSolvedByMonth: [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 19 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 8 },
    { month: "May", count: 22 },
    { month: "Jun", count: 14 },
    { month: "Jul", count: 18 },
    { month: "Aug", count: 25 },
    { month: "Sep", count: 17 },
    { month: "Oct", count: 21 },
    { month: "Nov", count: 16 },
    { month: "Dec", count: 23 },
  ],
  difficultyBreakdown: [
    { name: "Easy", value: 120, color: "#4ade80" },
    { name: "Medium", value: 80, color: "#facc15" },
    { name: "Hard", value: 40, color: "#f87171" },
  ],
  contestHistory: [
    { name: "Contest 1", rank: 1200, rating: 1500, platform: "leetcode" },
    { name: "Contest 2", rank: 800, rating: 1550, platform: "leetcode" },
    { name: "Contest 3", rank: 1500, rating: 1520, platform: "leetcode" },
    { name: "Contest 4", rank: 600, rating: 1600, platform: "leetcode" },
    { name: "Contest 5", rank: 400, rating: 1650, platform: "codeforces" },
    { name: "Contest 6", rank: 900, rating: 1620, platform: "codeforces" },
    { name: "Contest 7", rank: 300, rating: 1700, platform: "codeforces" },
    { name: "Contest 8", rank: 200, rating: 1750, platform: "codeforces" },
  ],
  upcomingContests: [
    {
      platform: "LeetCode",
      name: "Weekly Contest 345",
      date: "Tomorrow, 8:30 AM",
      duration: "1 hour 30 minutes",
      url: "#",
    },
    {
      platform: "CodeForces",
      name: "Codeforces Round #835 (Div. 2)",
      date: "Mar 18, 2025, 7:35 PM",
      duration: "2 hours",
      url: "#",
    },
    {
      platform: "CodeChef",
      name: "March Long Challenge 2025",
      date: "Mar 20, 2025, 3:00 PM",
      duration: "10 days",
      url: "#",
    },
  ],
  recentActivity: [
    {
      platform: "LeetCode",
      problem: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      status: "success",
      time: "2 hours ago",
    },
    {
      platform: "CodeForces",
      problem: "Divisibility Problem",
      difficulty: "Medium",
      status: "success",
      time: "Yesterday",
    },
    {
      platform: "LeetCode",
      problem: "Merge K Sorted Lists",
      difficulty: "Hard",
      status: "failed",
      time: "Yesterday",
    },
    {
      platform: "CodeChef",
      problem: "Chef and Strings",
      difficulty: "Easy",
      status: "success",
      time: "3 days ago",
    },
  ],
  recentSubmissions: [
    {
      id: "1",
      problem: "Two Sum",
      platform: "LeetCode",
      language: "JavaScript",
      status: "Accepted",
      timestamp: "2 hours ago",
      runtime: "76 ms",
      memory: "42.1 MB",
    },
    {
      id: "2",
      problem: "Maximum Subarray",
      platform: "LeetCode",
      language: "Python",
      status: "Accepted",
      timestamp: "Yesterday",
      runtime: "120 ms",
      memory: "28.5 MB",
    },
    {
      id: "3",
      problem: "Merge Intervals",
      platform: "LeetCode",
      language: "C++",
      status: "Wrong Answer",
      timestamp: "Yesterday",
      runtime: "32 ms",
      memory: "14.2 MB",
    },
    {
      id: "4",
      problem: "Divisibility Problem",
      platform: "CodeForces",
      language: "Java",
      status: "Accepted",
      timestamp: "2 days ago",
      runtime: "156 ms",
      memory: "36.8 MB",
    },
    {
      id: "5",
      problem: "Chef and Strings",
      platform: "CodeChef",
      language: "Python",
      status: "Time Limit Exceeded",
      timestamp: "3 days ago",
      runtime: "TLE",
      memory: "N/A",
    },
  ],
  recommendedProblems: [
    {
      platform: "LeetCode",
      name: "Maximum Subarray",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      url: "#",
    },
    {
      platform: "CodeForces",
      name: "Shortest Path Problem",
      difficulty: "Hard",
      topic: "Graph Theory",
      url: "#",
    },
    {
      platform: "LeetCode",
      name: "Merge Intervals",
      difficulty: "Medium",
      topic: "Arrays",
      url: "#",
    },
  ],
}

// Function to connect to a platform
export async function connectPlatform(platform: string, username: string, apiKey: string) {
  try {
    // In a real app, this would make API calls to the respective platforms
    console.log(`Connecting to ${platform} with username: ${username}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just return success
    return { success: true }
  } catch (error) {
    console.error(`Error connecting to ${platform}:`, error)
    return { success: false, error: "Failed to connect to platform" }
  }
}

// Function to fetch user data from all connected platforms
export async function fetchUserData() {
  try {
    // In a real app, this would fetch data from all connected platforms
    console.log("Fetching user data from connected platforms")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For demo purposes, we'll return mock data
    return mockLeetCodeData
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}

// Function to refresh user data
export async function refreshUserData() {
  try {
    // In a real app, this would refresh data from all connected platforms
    console.log("Refreshing user data")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Revalidate the dashboard page
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error refreshing user data:", error)
    return { success: false, error: "Failed to refresh data" }
  }
}

