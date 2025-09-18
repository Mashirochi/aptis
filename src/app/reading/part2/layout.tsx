import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Part 2 - Sentence Ordering",
  description: "Practice sentence ordering and text arrangement with drag and drop exercises",
};

export default function ReadingPart2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}