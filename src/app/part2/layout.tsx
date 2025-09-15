import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part 2 - Speaker Matching Exercises",
  description: "Master APTIS Part 2 with speaker matching exercises. Practice identifying different speakers and matching them to appropriate responses with multiple audio players and real-time feedback.",
  keywords: ["APTIS Part 2", "speaker matching", "listening skills", "audio identification", "English speaking patterns"],
  openGraph: {
    title: "APTIS Part 2 - Speaker Matching Practice",
    description: "Practice speaker identification and matching exercises for APTIS Part 2.",
    url: '/part2',
  },
  alternates: {
    canonical: '/part2',
  },
};

export default function Part2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}