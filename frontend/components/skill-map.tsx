"use client"

import { useEffect, useRef } from "react"
import ForceGraph2D from "react-force-graph-2d"

export function SkillMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Resize observer to handle container size changes
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        window.dispatchEvent(new Event("resize"))
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  // Sample skill map data
  const graphData = {
    nodes: [
      { id: "algorithms", name: "Algorithms", group: 1, val: 25, level: 85 },
      { id: "dataStructures", name: "Data Structures", group: 1, val: 20, level: 75 },
      { id: "dynamicProgramming", name: "Dynamic Programming", group: 2, val: 18, level: 90 },
      { id: "graphTheory", name: "Graph Theory", group: 2, val: 15, level: 45 },
      { id: "trees", name: "Trees", group: 3, val: 12, level: 75 },
      { id: "greedy", name: "Greedy Algorithms", group: 2, val: 10, level: 60 },
      { id: "bitManipulation", name: "Bit Manipulation", group: 4, val: 8, level: 40 },
      { id: "strings", name: "String Algorithms", group: 3, val: 15, level: 70 },
      { id: "segmentTrees", name: "Segment Trees", group: 3, val: 10, level: 30 },
      { id: "fenwickTrees", name: "Fenwick Trees", group: 3, val: 8, level: 25 },
      { id: "networkFlow", name: "Network Flow", group: 2, val: 12, level: 20 },
      { id: "binarySearch", name: "Binary Search", group: 1, val: 15, level: 80 },
      { id: "heaps", name: "Heaps", group: 3, val: 10, level: 65 },
      { id: "divideConquer", name: "Divide & Conquer", group: 1, val: 12, level: 70 },
      { id: "backtracking", name: "Backtracking", group: 4, val: 10, level: 55 },
    ],
    links: [
      { source: "algorithms", target: "dynamicProgramming", value: 5 },
      { source: "algorithms", target: "greedy", value: 4 },
      { source: "algorithms", target: "divideConquer", value: 5 },
      { source: "algorithms", target: "backtracking", value: 3 },
      { source: "algorithms", target: "binarySearch", value: 4 },
      { source: "dataStructures", target: "trees", value: 5 },
      { source: "dataStructures", target: "heaps", value: 4 },
      { source: "dataStructures", target: "segmentTrees", value: 3 },
      { source: "dataStructures", target: "fenwickTrees", value: 2 },
      { source: "graphTheory", target: "trees", value: 3 },
      { source: "graphTheory", target: "networkFlow", value: 2 },
      { source: "dynamicProgramming", target: "strings", value: 4 },
      { source: "trees", target: "segmentTrees", value: 3 },
      { source: "trees", target: "fenwickTrees", value: 2 },
      { source: "bitManipulation", target: "algorithms", value: 2 },
      { source: "strings", target: "bitManipulation", value: 2 },
      { source: "divideConquer", target: "binarySearch", value: 3 },
      { source: "backtracking", target: "dynamicProgramming", value: 2 },
    ],
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <ForceGraph2D
        graphData={graphData}
        nodeId="id"
        nodeVal="val"
        nodeLabel="name"
        nodeColor={(node) => {
          // Color based on mastery level
          const level = node.level as number
          if (level > 75) return "#00FF41"
          if (level > 50) return "#00FFFF"
          if (level > 25) return "#318CE7"
          return "#FFA116"
        }}
        nodeRelSize={6}
        linkWidth={(link) => (link.value as number) * 0.5}
        linkColor={() => "#00FFFF30"}
        backgroundColor="transparent"
        cooldownTicks={100}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticleSpeed={0.005}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.1}
        warmupTicks={100}
      />
    </div>
  )
}

