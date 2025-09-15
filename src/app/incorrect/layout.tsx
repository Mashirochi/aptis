import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Incorrect Answers",
  description: "Review and practice your incorrect answers from all APTIS listening parts. Track your progress and improve weak areas with targeted practice and detailed explanations.",
  keywords: ["incorrect answers", "review practice", "APTIS improvement", "learning from mistakes", "targeted practice"],
  openGraph: {
    title: "Review Incorrect Answers - APTIS Practice",
    description: "Review and improve your APTIS listening skills by practicing incorrect answers.",
    url: '/incorrect',
  },
  alternates: {
    canonical: '/incorrect',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function IncorrectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}