import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nexus_CP | Competitive Programming Tracker",
    template: "%s | Nexus_CP",
  },
  description:
    "Track and improve your competitive programming skills across multiple platforms.",

  // Basic SEO
  keywords: [
    "competitive programming",
    "coding",
    "leetcode",
    "codeforces",
    "skill tracking",
  ],

  // Robots configuration
  robots: {
    index: true,
    follow: true,
  },

  // Open Graph (minimal)
  openGraph: {
    title: "Nexus_CP - CP Tracking Platform",
    description: "Transform your coding journey with intelligent insights",
    type: "website",
  },

  // Twitter Card (minimal)
  twitter: {
    card: "summary",
    title: "Nexus_CP - Competitive Programming Tracker",
    description: "Track and improve your coding skills",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
