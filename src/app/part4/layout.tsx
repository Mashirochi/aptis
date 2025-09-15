import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part 4 - Extended Listening Tasks",
  description: "Master APTIS Part 4 with extended listening tasks featuring multiple questions per audio. Practice complex listening scenarios with detailed comprehension questions and comprehensive feedback.",
  keywords: ["APTIS Part 4", "extended listening", "complex audio", "multiple questions", "advanced comprehension"],
  openGraph: {
    title: "APTIS Part 4 - Extended Listening Practice",
    description: "Practice extended listening tasks with multiple questions for APTIS Part 4.",
    url: '/part4',
  },
  alternates: {
    canonical: '/part4',
  },
};

export default function Part4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}