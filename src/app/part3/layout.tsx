import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part 3 - Statement Analysis",
  description: "Excel in APTIS Part 3 with statement analysis exercises. Practice evaluating statements as true, false, or not given based on audio content with detailed explanations and transcripts.",
  keywords: ["APTIS Part 3", "statement analysis", "true false questions", "listening comprehension", "critical listening"],
  openGraph: {
    title: "APTIS Part 3 - Statement Analysis Practice",
    description: "Practice statement evaluation and analysis exercises for APTIS Part 3.",
    url: '/part3',
  },
  alternates: {
    canonical: '/part3',
  },
};

export default function Part3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}