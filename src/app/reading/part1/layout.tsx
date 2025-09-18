import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Part 1 - Practice",
  description: "Practice reading comprehension with multiple choice questions",
};

export default function Part1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}