import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part 1 - Basic Listening Comprehension",
  description: "Practice APTIS Part 1 listening exercises with multiple choice questions. Improve your basic English listening comprehension skills with interactive audio materials and instant feedback.",
  keywords: ["APTIS Part 1", "basic listening", "multiple choice", "English comprehension", "audio practice"],
  openGraph: {
    title: "APTIS Part 1 - Basic Listening Practice",
    description: "Practice basic English listening comprehension with APTIS Part 1 exercises.",
    url: '/part1',
  },
  alternates: {
    canonical: '/part1',
  },
};

export default function Part1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}