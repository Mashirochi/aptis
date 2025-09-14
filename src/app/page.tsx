"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const parts = [
    { href: "part1", label: "Part 1" },
    { href: "part2", label: "Part 2" },
    { href: "part3", label: "Part 3" },
    { href: "part4", label: "Part 4" },
  ];

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0e7ff, #fdf4ff)",
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
            {part.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
