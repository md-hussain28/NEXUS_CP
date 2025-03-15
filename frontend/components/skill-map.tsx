"use client";

import { useRef } from "react";

interface Node {
  id: string;
  name: string;
  group: number;
  val: number;
  level: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

export function SkillMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample skill map data
  const graphData = {
    nodes: [
      { id: "algorithms", name: "Algorithms", group: 1, val: 25, level: 85 },
      {
        id: "dataStructures",
        name: "Data Structures",
        group: 1,
        val: 20,
        level: 75,
      },
      {
        id: "dynamicProgramming",
        name: "Dynamic Programming",
        group: 2,
        val: 18,
        level: 90,
      },
      { id: "graphTheory", name: "Graph Theory", group: 2, val: 15, level: 45 },
      { id: "trees", name: "Trees", group: 3, val: 12, level: 75 },
      { id: "greedy", name: "Greedy Algorithms", group: 2, val: 10, level: 60 },
      {
        id: "bitManipulation",
        name: "Bit Manipulation",
        group: 4,
        val: 8,
        level: 40,
      },
      {
        id: "strings",
        name: "String Algorithms",
        group: 3,
        val: 15,
        level: 70,
      },
      {
        id: "segmentTrees",
        name: "Segment Trees",
        group: 3,
        val: 10,
        level: 30,
      },
      {
        id: "fenwickTrees",
        name: "Fenwick Trees",
        group: 3,
        val: 8,
        level: 25,
      },
      { id: "networkFlow", name: "Network Flow", group: 2, val: 12, level: 20 },
      {
        id: "binarySearch",
        name: "Binary Search",
        group: 1,
        val: 15,
        level: 80,
      },
      { id: "heaps", name: "Heaps", group: 3, val: 10, level: 65 },
      {
        id: "divideConquer",
        name: "Divide & Conquer",
        group: 1,
        val: 12,
        level: 70,
      },
      {
        id: "backtracking",
        name: "Backtracking",
        group: 4,
        val: 10,
        level: 55,
      },
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
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[600px] mx-auto perspective-1000"
    >
      {graphData.nodes.map((node, i) => {
        const angle = (i / graphData.nodes.length) * 360;
        const radius = 200;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const z = Math.sin((i * 20 * Math.PI) / 180) * 50;

        return (
          <div
            key={node.id}
            className="absolute transform transition-all duration-500 hover:scale-110"
            style={{
              transform: `translate3d(${x}px, ${y}px, ${z}px)`,
              left: "50%",
              top: "50%",
            }}
          >
            <div
              className="rounded-full p-4 text-center text-white"
              style={{
                backgroundColor:
                  node.level > 75
                    ? "#00FF41"
                    : node.level > 50
                    ? "#00FFFF"
                    : node.level > 25
                    ? "#318CE7"
                    : "#FFA116",
                width: `${node.val * 2}px`,
                height: `${node.val * 2}px`,
              }}
            >
              {node.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
