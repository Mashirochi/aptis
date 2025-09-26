import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Part 2 - Sentence Ordering | APTIS",
  description:
    "Practice sentence ordering exercises with drag and drop functionality for APTIS Reading Part 2",
  keywords:
    "APTIS, reading, sentence ordering, drag and drop, English test preparation",
};

export default function ReadingPart2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
