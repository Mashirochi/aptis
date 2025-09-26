"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getIncorrectAnswersCount } from "../utils/incorrectAnswers";

export default function Home() {
  const parts = [
    { href: "part1", label: "Part 1" },
    { href: "part2", label: "Part 2" },
    { href: "part3", label: "Part 3" },
    { href: "part4", label: "Part 4" },
    { href: "reading/part1", label: "Reading p1" },
    { href: "reading/part2", label: "Reading p2" },
    { href: "reading/part4", label: "Reading p4" },
    { href: "reading/part5", label: "Reading p5" },
  ];

  const [hovered, setHovered] = useState<string | null>(null);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Load incorrect count on mount
  useEffect(() => {
    const updateCount = () => {
      setIncorrectCount(getIncorrectAnswersCount());
    };

    updateCount();

    // Listen for updates
    const handleUpdate = () => {
      updateCount();
    };

    window.addEventListener("incorrectAnswersUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("incorrectAnswersUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "APTIS Listening Practice Course",
            description:
              "Comprehensive English listening practice for APTIS test preparation with 4 distinct parts",
            provider: {
              "@type": "Organization",
              name: "Listening APTIS",
              url: "https://listening-aptis.vercel.app",
            },
            educationalLevel: "Intermediate to Advanced",
            learningResourceType: "Practice Exercises",
            teaches: "English Listening Comprehension",
            coursePrerequisites: "Basic English knowledge",
            hasCourseInstance: [
              {
                "@type": "CourseInstance",
                name: "Part 1 - Basic Listening",
                description: "Multiple choice listening exercises",
                url: "https://listening-aptis.vercel.app/part1",
              },
              {
                "@type": "CourseInstance",
                name: "Part 2 - Speaker Matching",
                description: "Speaker identification and matching exercises",
                url: "https://listening-aptis.vercel.app/part2",
              },
              {
                "@type": "CourseInstance",
                name: "Part 3 - Statement Analysis",
                description: "True/False statement evaluation exercises",
                url: "https://listening-aptis.vercel.app/part3",
              },
              {
                "@type": "CourseInstance",
                name: "Part 4 - Extended Listening",
                description: "Complex listening tasks with multiple questions",
                url: "https://listening-aptis.vercel.app/part4",
              },
            ],
          }),
        }}
      />
      <div
        className="gradient-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "grid", gap: "20px", padding: "20px" }}>
          {parts.map((part) => (
            <Link
              key={part.href}
              href={part.href}
              style={{
                padding: "14px 28px",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "14px",
                textAlign: "center",
                color: hovered === part.href ? "#fff" : "#4f46e5",
                background: hovered === part.href ? "#4f46e5" : "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                transform: hovered === part.href ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => setHovered(part.href)}
              onMouseLeave={() => setHovered(null)}
            >
              {" "}
              {part.label}
            </Link>
          ))}

          {/* Incorrect Answers Section */}
          {incorrectCount > 0 && (
            <Link
              href="incorrect"
              style={{
                padding: "14px 28px",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "14px",
                textAlign: "center",
                color: hovered === "incorrect" ? "#fff" : "#ef4444",
                background: hovered === "incorrect" ? "#ef4444" : "#fff",
                boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                transform: hovered === "incorrect" ? "scale(1.05)" : "scale(1)",
                border: "2px solid #ef4444",
                position: "relative",
              }}
              onMouseEnter={() => setHovered("incorrect")}
              onMouseLeave={() => setHovered(null)}
            >
              ❌ Review Incorrect Answers
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: "1",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {incorrectCount > 99 ? "99+" : incorrectCount}
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
