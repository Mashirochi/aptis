"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIncorrectAnswersCount } from "../utils/incorrectAnswers";
import ThemeToggle from "./ThemeToggle";
import PWAInstallButton from "./PWAInstallButton";
import DataManager from "./DataManager";

export default function NavigationHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isListeningDropdownOpen, setIsListeningDropdownOpen] = useState(false);
  const [isReadingDropdownOpen, setIsReadingDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch by ensuring component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update incorrect count on mount and when localStorage changes
  useEffect(() => {
    const updateCount = () => {
      setIncorrectCount(getIncorrectAnswersCount());
    };

    updateCount();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateCount();
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom events when localStorage is updated from the same tab
    window.addEventListener("incorrectAnswersUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "incorrectAnswersUpdated",
        handleStorageChange
      );
    };
  }, []);

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    {
      label: "Listening",
      icon: "🎧",
      isDropdown: true,
      items: [
        { href: "/part1", label: "Part 1", icon: "🎧" },
        { href: "/part2", label: "Part 2", icon: "🎙️" },
        { href: "/part3", label: "Part 3", icon: "📝" },
        { href: "/part4", label: "Part 4", icon: "🎵" },
      ]
    },
    {
      label: "Reading",
      icon: "📖",
      isDropdown: true,
      items: [
        { href: "/reading/part1", label: "Reading 1", icon: "📖" },
        { href: "/reading/part2", label: "Reading 2", icon: "🔄" },
        { href: "/reading/part3", label: "Reading 3", icon: "🏷️" },
      ]
    },
    {
      href: "/incorrect",
      label: "Incorrect",
      icon: "❌",
      badge: incorrectCount,
    },
  ];
  
  // All navigation items flattened for mobile drawer
  const flatNavigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/part1", label: "Part 1", icon: "🎧" },
    { href: "/part2", label: "Part 2", icon: "🎙️" },
    { href: "/part3", label: "Part 3", icon: "📝" },
    { href: "/part4", label: "Part 4", icon: "🎵" },
    { href: "/reading/part1", label: "Reading 1", icon: "📖" },
    { href: "/reading/part2", label: "Reading 2", icon: "🔄" },
    { href: "/reading/part3", label: "Reading 3", icon: "🏷️" },
    {
      href: "/incorrect",
      label: "Incorrect",
      icon: "❌",
      badge: incorrectCount,
    },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Prevent hydration issues with dynamic content
  if (!isMounted) {
    return (
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "var(--card-background)",
          borderBottom: "2px solid var(--border-color)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4f46e5",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎧 Listening APTIS
          </Link>
          <div style={{ width: "200px" }} />
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "var(--card-background)",
          borderBottom: "2px solid var(--border-color)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Logo/Title */}
          <Link
            href="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4f46e5",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎧 Listening APTIS
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {navigationItems.map((item, index) => {
              if (item.isDropdown) {
                const isOpen = item.label === "Listening" ? isListeningDropdownOpen : isReadingDropdownOpen;
                const setIsOpen = item.label === "Listening" ? setIsListeningDropdownOpen : setIsReadingDropdownOpen;
                const hasActiveChild = item.items?.some(subItem => pathname === subItem.href);
                
                return (
                  <div
                    key={item.label}
                    style={{ position: "relative" }}
                    onMouseEnter={() => isMounted && setIsOpen(true)}
                    onMouseLeave={() => isMounted && setIsOpen(false)}
                  >
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: hasActiveChild ? "#4f46e5" : "transparent",
                        border: hasActiveChild ? "none" : "1px solid var(--border-color)",
                        color: hasActiveChild ? "#fff" : "var(--card-text)",
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                      <span style={{ fontSize: "12px", marginLeft: "4px" }}>▼</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isMounted && isOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          backgroundColor: "var(--card-background)",
                          border: "1px solid var(--border-color)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          minWidth: "180px",
                          zIndex: 1000,
                          marginTop: "4px",
                        }}
                      >
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "12px 16px",
                              textDecoration: "none",
                              color: pathname === subItem.href ? "#4f46e5" : "var(--card-text)",
                              backgroundColor: pathname === subItem.href ? "#f3f4f6" : "transparent",
                              fontWeight: pathname === subItem.href ? "600" : "500",
                              transition: "all 0.2s ease",
                            }}
                            className="dropdown-link"
                          >
                            <span>{subItem.icon}</span>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: pathname === item.href ? "#4f46e5" : "transparent",
                      color: pathname === item.href ? "#fff" : "var(--card-text)",
                      border: pathname === item.href ? "none" : "1px solid var(--border-color)",
                      position: "relative",
                    }}
                    className="nav-link"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    {item.badge !== undefined && (
                      <span
                        style={{
                          backgroundColor: item.badge > 0 ? "#ef4444" : "#10b981",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          top: "-4px",
                          right: "-4px",
                        }}
                      >
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </Link>
                );
              }
            })}

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Data Manager */}
            <DataManager />

            {/* Theme Toggle for Desktop */}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleDrawer}
            style={{
              display: "none",
              padding: "8px",
              backgroundColor: "var(--card-background)",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              color: "var(--foreground)",
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMounted && isDrawerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            opacity: isDrawerOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={closeDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isMounted && isDrawerOpen ? 0 : "-300px",
          width: "300px",
          height: "100%",
          backgroundColor: "var(--card-background)",
          zIndex: 1001,
          boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
          transition: "right 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "var(--card-text)",
            }}
          >
            Navigation
          </h3>
          <button
            onClick={closeDrawer}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              color: "var(--card-text)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: "20px" }}>
          {flatNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href!}
              onClick={closeDrawer}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                marginBottom: "8px",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                backgroundColor:
                  pathname === item.href ? "#4f46e5" : "var(--card-background)",
                color: pathname === item.href ? "#fff" : "var(--card-text)",
                border:
                  pathname === item.href
                    ? "none"
                    : "1px solid var(--border-color)",
                position: "relative",
              }}
              className="mobile-nav-link"
            >
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              {item.label}
              {item.badge !== undefined && (
                <span
                  style={{
                    backgroundColor: item.badge > 0 ? "#ef4444" : "#10b981",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                  }}
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* PWA Install Button for Mobile */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <PWAInstallButton />
          </div>

          {/* Data Manager for Mobile */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <DataManager />
          </div>

          {/* Theme Toggle for Mobile */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <ThemeToggle isMobile={true} />
          </div>
        </nav>
      </div>
    </>
  );
}