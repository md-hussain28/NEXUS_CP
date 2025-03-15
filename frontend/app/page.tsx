import Link from "next/link";
import { CodeRain } from "@/components/code-rain";
import { GlitchText } from "@/components/glitch-text";
import { PlatformIntegration } from "@/components/platform-integration";

import { Button } from "@/components/ui/button";
import { ChevronRight, Terminal, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen  overflow-hidden bg-[#0D1117] text-white">
      {/* Animated code rain background */}
      <div className="absolute min-h-screen inset-0 z-0 opacity-40">
        <CodeRain />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <Initial />
          <FeatureText />
          <ConnectionBox />
          <Cta />
          <Cards />
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Initial() {
  return (
    <div className="mb-2 flex items-center gap-2">
      <Terminal className="h-5 w-5 text-[#00FF41]" />
      <div className="text-sm font-mono text-[#00FFFF] opacity-80">
        SYSTEM::INITIALIZED
      </div>
    </div>
  );
}

function FeatureText() {
  return (
    <div className="mb-6">
      <GlitchText
        text="NEXUS_CP"
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-[#00FF41]"
      />
      <h2 className="text-xl md:text-2xl font-mono text-[#00FFFF] opacity-90 max-w-2xl">
        <span className="typing-animation">
          Hack your way through competitive programming stats
        </span>
      </h2>
    </div>
  );
}

function ConnectionBox() {
  return (
    <div className="my-12 max-w-3xl">
      <div className="p-4 border border-[#00FF41]/30 bg-[#0D1117]/80 backdrop-blur-sm rounded-lg">
        <div className="flex items-center mb-3">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] mr-2"></div>
          <div className="font-mono text-[#00FFFF] text-sm">
            CONNECTION_STATUS
          </div>
        </div>
        <div className="font-mono text-sm text-white/70 mb-4">
          <span className="text-[#00FF41]">$</span> Initializing neural
          interface...
          <br />
          <span className="text-[#00FF41]">$</span> Scanning for competitive
          programming platforms...
          <br />
          <span className="text-[#00FF41]">$</span> Ready to establish
          connection.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <PlatformIntegration
            name="LeetCode"
            icon="/placeholder.svg?height=40&width=40"
            color="#FFA116"
            platform="leetcode"
          />
          <PlatformIntegration
            name="CodeForces"
            icon="/placeholder.svg?height=40&width=40"
            color="#318CE7"
            platform="codeforces"
          />
          <PlatformIntegration
            name="CodeChef"
            icon="/placeholder.svg?height=40&width=40"
            color="#5B4638"
            platform="codechef"
          />
        </div>
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/connect">
        <Button className="bg-[#00FF41] text-black hover:bg-[#00FF41]/80 border border-[#00FF41] font-mono group">
          INITIALIZE CONNECTION
          <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button
          variant="outline"
          className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10 font-mono group"
        >
          ACCESS DASHBOARD
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}

function Cards() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/neural-pathfinder" className="block">
        <FeatureCard
          title="NEURAL PATHFINDER"
          description="AI-Powered Learning Trajectory: Analyzes your solved problems and identifies skill gaps."
        />
      </Link>

      <Link href="/code-quantum" className="block">
        <FeatureCard
          title="CODE QUANTUM"
          description="Intelligent Problem Selector: Matches problems to your skill level and solving patterns."
        />
      </Link>

      <Link href="/hack-horizon" className="block">
        <FeatureCard
          title="HACK HORIZON"
          description="Comprehensive Skill Development: Maps your skills and suggests strategic learning paths."
        />
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative z-10 h-20 bg-[#0D1117] border-t border-[#00FFFF]/20">
      <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="font-mono text-sm text-[#00FFFF]/70">
          NEXUS_CP v1.0.0
        </div>
        <div className="font-mono text-sm text-white/50">
          <span className="text-[#00FF41]">[</span> SYSTEM STATUS: ONLINE{" "}
          <span className="text-[#00FF41]">]</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#00FF41]/30 bg-[#0D1117]/80 backdrop-blur-sm p-4 rounded-lg hover:border-[#00FF41] transition-colors group h-full">
      <h3 className="font-mono text-[#00FF41] mb-2 group-hover:text-[#00FFFF] transition-colors">
        {title}
      </h3>
      <p className="font-mono text-sm text-white/70">{description}</p>
      <div className="mt-4 h-1 w-0 bg-[#00FFFF] group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}
