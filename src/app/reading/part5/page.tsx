"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { READING_PART_5 } from "../../../utils/part2";

// Define interfaces for the matching headings exercise
interface ParagraphData {
  key: number;
  option: string;
  paragraph: string;
}

interface ExerciseGroup {
  group: number;
  data: ParagraphData[];
}

interface UserAnswer {
  paragraphKey: number;
  selectedHeading: string;
}

function ReadingPart3Content() {
  const searchParams = useSearchParams();
  const groupId = parseInt(searchParams.get("group") || "1");

  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [completedGroups, setCompletedGroups] = useState<
    Record<number, boolean>
  >({});
  const [availableHeadings, setAvailableHeadings] = useState<string[]>([]);

  // Initialize group based on URL parameter
  useEffect(() => {
    if (groupId && groupId >= 1 && groupId <= READING_PART_5.length) {
      const groupIndex = groupId - 1;
      setCurrentGroup(groupIndex);
    }
  }, [groupId]);

  // Load completed groups from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("reading_part3_completed");
      if (saved) {
        setCompletedGroups(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading completed groups:", error);
    }
  }, []);

  // Save completed groups to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "reading_part3_completed",
        JSON.stringify(completedGroups)
      );
    } catch (error) {
      console.error("Error saving completed groups:", error);
    }
  }, [completedGroups]);

  // Initialize available headings when group changes
  useEffect(() => {
    const currentExercise = READING_PART_5[currentGroup];
    if (currentExercise) {
      // Create a shuffled list of headings
      const headings = [...currentExercise.data.map((item) => item.option)];
      // Add 2-3 extra distractors to make it more challenging
      const extraHeadings = [
        "Additional challenges and considerations",
        "Future implications and developments",
        "Historical background and context",
      ];

      // Shuffle the combined headings
      const allHeadings = [...headings, ...extraHeadings.slice(0, 2)];
      for (let i = allHeadings.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allHeadings[i], allHeadings[j]] = [allHeadings[j], allHeadings[i]];
      }

      setAvailableHeadings(allHeadings);
      setUserAnswers({});
      setShowAnswers(false);
      setIsCompleted(false);
      setAttempts(0);
    }
  }, [currentGroup]);

  const currentExercise = READING_PART_5[currentGroup];

  const handleHeadingSelect = (paragraphKey: number, heading: string) => {
    if (showAnswers) return;

    // If heading is empty string, it means remove selection
    if (heading === "") {
      setUserAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[paragraphKey];
        return newAnswers;
      });
      return;
    }

    setUserAnswers((prev) => ({
      ...prev,
      [paragraphKey]: heading,
    }));
  };

  const checkAnswers = () => {
    setAttempts((prev) => prev + 1);

    // Check if all paragraphs have been matched
    const allAnswered = currentExercise.data.every(
      (item) => userAnswers[item.key]
    );
    if (!allAnswered) {
      alert(
        "Please match all paragraphs with headings before checking answers."
      );
      return;
    }

    // Check correctness
    const correctAnswers = currentExercise.data.filter(
      (item) => userAnswers[item.key] === item.option
    ).length;

    const isAllCorrect = correctAnswers === currentExercise.data.length;

    if (isAllCorrect) {
      setIsCompleted(true);
      setCompletedGroups((prev) => ({
        ...prev,
        [currentExercise.group]: true,
      }));
    }

    setShowAnswers(true);
  };

  const resetExercise = () => {
    // Re-shuffle the headings
    const headings = [...currentExercise.data.map((item) => item.option)];
    const extraHeadings = [
      "Additional challenges and considerations",
      "Future implications and developments",
      "Historical background and context",
    ];

    const allHeadings = [...headings, ...extraHeadings.slice(0, 2)];
    for (let i = allHeadings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allHeadings[i], allHeadings[j]] = [allHeadings[j], allHeadings[i]];
    }

    setAvailableHeadings(allHeadings);
    setUserAnswers({});
    setShowAnswers(false);
    setIsCompleted(false);
  };

  const goToGroup = (index: number) => {
    setCurrentGroup(index);
    setIsDrawerOpen(false);
  };

  const nextGroup = () => {
    if (currentGroup < READING_PART_5.length - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const previousGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  if (!currentExercise) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="gradient-bg"
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Desktop Sidebar */}
      <div
        className="sidebar sidebar-bg desktop-sidebar"
        style={{
          width: 320,
          padding: 20,
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "700",
            textAlign: "center",
            color: "var(--foreground)",
          }}
        >
          📖 Reading Part 3 Groups
        </h3>

        <div
          className="question-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {READING_PART_5.map((group, index) => {
            let className = "question-number";

            if (completedGroups[group.group]) {
              className += " correct";
            } else if (currentGroup === index) {
              className += " current";
            }

            return (
              <div
                key={group.group}
                onClick={() => goToGroup(index)}
                className={className}
                style={{
                  fontSize: "14px",
                  padding: "8px 4px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                title={`Group ${group.group}`}
              >
                {group.group}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="card" style={{ marginTop: 24, padding: 16 }}>
          <h4
            style={{
              margin: "0 0 12px 0",
              color: "var(--foreground)",
              fontSize: "16px",
            }}
          >
            📊 Progress
          </h4>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#059669",
                marginBottom: 4,
              }}
            >
              {Object.values(completedGroups).filter(Boolean).length}
            </div>
            <div style={{ fontSize: "14px", color: "var(--card-text)" }}>
              / {READING_PART_5.length} Completed
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "var(--card-background)",
            zIndex: 1000,
            overflowY: "auto",
            padding: 20,
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => setIsDrawerOpen(false)}
            style={{ marginBottom: 20 }}
          >
            ✖️ Close
          </button>

          <h3
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              color: "var(--foreground)",
            }}
          >
            📖 Reading Part 3 Groups
          </h3>

          <div
            className="question-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {READING_PART_5.map((group, index) => {
              let className = "question-number";

              if (completedGroups[group.group]) {
                className += " correct";
              } else if (currentGroup === index) {
                className += " current";
              }

              return (
                <div
                  key={group.group}
                  onClick={() => goToGroup(index)}
                  className={className}
                  style={{
                    fontSize: "12px",
                    padding: "8px 4px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  title={`Group ${group.group}`}
                >
                  {group.group}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: 20 }}>
        {/* Mobile menu button */}
        <button
          className="btn btn-secondary mobile-only"
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginBottom: 20, display: "none" }}
        >
          📋 Group List
        </button>

        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <h1
            style={{
              color: "var(--foreground)",
              marginBottom: 10,
              fontSize: "28px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            📖 Reading Part 3 - Group {currentExercise.group}
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "var(--card-text)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Match each heading to the most suitable paragraph
          </p>
        </div>

        {/* Instructions */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>
            📋 Instructions
          </h3>
          <ul
            style={{
              color: "var(--card-text)",
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: 20,
            }}
          >
            <li>Read each paragraph carefully</li>
            <li>
              Choose the most suitable heading for each paragraph from the list
              provided
            </li>
            <li>Each heading can only be used once</li>
            <li>There are extra headings that you do not need to use</li>
            <li>Click "Check Answers" when you have matched all paragraphs</li>
          </ul>
        </div>

        {/* Paragraphs */}
        <div style={{ marginBottom: 24 }}>
          {currentExercise.data.map((item, index) => {
            const userAnswer = userAnswers[item.key];
            const isCorrect = showAnswers && userAnswer === item.option;
            const isIncorrect =
              showAnswers && userAnswer && userAnswer !== item.option;

            return (
              <div
                key={item.key}
                className="card paragraph-card"
                style={{
                  marginBottom: 20,
                  border: showAnswers
                    ? isCorrect
                      ? "2px solid #10b981"
                      : isIncorrect
                      ? "2px solid #ef4444"
                      : "1px solid var(--border-color)"
                    : "1px solid var(--border-color)",
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <h4
                    style={{
                      margin: "0 0 12px 0",
                      color: "var(--foreground)",
                      fontSize: "18px",
                    }}
                  >
                    Paragraph {index + 1}
                  </h4>

                  {/* User's heading selection */}
                  <div style={{ marginBottom: 12 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 8,
                        color: "var(--foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Select heading for this paragraph:
                    </label>

                    {/* Show selected heading */}
                    {userAnswer ? (
                      <div
                        className="selected-heading"
                        style={{
                          padding: "16px 20px",
                          backgroundColor: "#10b981",
                          border: "2px solid #059669",
                          borderRadius: "12px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          minHeight: "60px",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                        }}
                      >
                        <span
                          style={{
                            color: "#ffffff",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "1.5",
                          }}
                        >
                          {availableHeadings.findIndex(
                            (h) => h === userAnswer
                          ) !== -1 &&
                            String.fromCharCode(
                              65 +
                                availableHeadings.findIndex(
                                  (h) => h === userAnswer
                                )
                            )}
                          . {userAnswer}
                        </span>
                        {!showAnswers && (
                          <button
                            onClick={() => handleHeadingSelect(item.key, "")}
                            style={{
                              background: "#ef4444",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              padding: "8px 16px",
                              fontSize: "14px",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Show available headings to choose from */
                      <div
                        className="heading-options-container"
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                          gap: "12px",
                          maxHeight: "400px",
                          overflowY: "auto",
                          overflowX: "auto",
                          padding: "16px",
                          border: "2px solid var(--border-color)",
                          borderRadius: "12px",
                          backgroundColor: "var(--background)",
                          scrollbarWidth: "thin",
                          scrollbarColor: "var(--border-color) transparent",
                        }}
                      >
                        {availableHeadings.map((heading, headingIndex) => {
                          const isUsedByOther =
                            Object.values(userAnswers).includes(heading);
                          const optionLetter = String.fromCharCode(
                            65 + headingIndex
                          );

                          return (
                            <button
                              key={headingIndex}
                              onClick={() =>
                                !isUsedByOther &&
                                !showAnswers &&
                                handleHeadingSelect(item.key, heading)
                              }
                              disabled={isUsedByOther || showAnswers}
                              className="option-button"
                              style={{
                                padding: "12px 16px",
                                border: `2px solid ${
                                  isUsedByOther
                                    ? "#d1d5db"
                                    : "var(--border-color)"
                                }`,
                                borderRadius: "8px",
                                backgroundColor: isUsedByOther
                                  ? "#f9fafb"
                                  : "var(--card-background)",
                                color: isUsedByOther
                                  ? "#6b7280"
                                  : "var(--foreground)",
                                cursor: isUsedByOther
                                  ? "not-allowed"
                                  : "pointer",
                                fontSize: "14px",
                                textAlign: "left",
                                transition: "all 0.2s ease",
                                opacity: isUsedByOther ? 0.5 : 1,
                                fontWeight: "normal",
                                minHeight: "50px",
                                display: "flex",
                                alignItems: "center",
                                lineHeight: "1.4",
                              }}
                              onMouseEnter={(e) => {
                                if (!isUsedByOther && !showAnswers) {
                                  e.currentTarget.style.backgroundColor =
                                    "#eff6ff";
                                  e.currentTarget.style.borderColor = "#3b82f6";
                                  e.currentTarget.style.transform =
                                    "translateY(-1px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 8px rgba(59, 130, 246, 0.15)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isUsedByOther && !showAnswers) {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--card-background)";
                                  e.currentTarget.style.borderColor =
                                    "var(--border-color)";
                                  e.currentTarget.style.transform = "none";
                                  e.currentTarget.style.boxShadow = "none";
                                }
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color: "#3b82f6",
                                  marginRight: "8px",
                                }}
                              >
                                {optionLetter}.
                              </span>
                              <span>{heading}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Paragraph text */}
                <div
                  style={{
                    padding: 16,
                    backgroundColor: "var(--background)",
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--card-text)",
                      lineHeight: 1.6,
                      margin: 0,
                      fontSize: "15px",
                    }}
                  >
                    {item.paragraph}
                  </p>
                </div>

                {/* Answer feedback */}
                {showAnswers && (
                  <div
                    className="feedback-slide"
                    style={{
                      marginTop: 12,
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: isCorrect ? "#065f46" : "#7f1d1d",
                      border: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: "600",
                        color: isCorrect ? "#dcfce7" : "#fecaca",
                      }}
                    >
                      {isCorrect
                        ? "✅ Correct!"
                        : `❌ Incorrect. Correct heading: "${item.option}"`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>
            🎮 Actions
          </h3>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {!showAnswers && (
              <>
                <button
                  onClick={checkAnswers}
                  className="btn btn-primary"
                  style={{ minWidth: 120 }}
                >
                  ✅ Check Answers
                </button>
                <button
                  onClick={resetExercise}
                  className="btn btn-warning"
                  style={{ minWidth: 120 }}
                >
                  🔄 Reset Exercise
                </button>
              </>
            )}

            {showAnswers && (
              <button
                onClick={resetExercise}
                className="btn btn-warning"
                style={{ minWidth: 120 }}
              >
                🔄 Try Again
              </button>
            )}
          </div>

          {/* Attempts counter */}
          {attempts > 0 && (
            <div
              style={{
                marginTop: 12,
                color: "var(--card-text)",
                fontSize: "14px",
              }}
            >
              Attempts: {attempts}
            </div>
          )}
        </div>

        {/* Result Display */}
        {showAnswers && (
          <div
            className="card"
            style={{
              marginBottom: 24,
              backgroundColor: isCompleted ? "#065f46" : "#7f1d1d",
              border: `2px solid ${isCompleted ? "#10b981" : "#ef4444"}`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h3
                style={{
                  margin: 0,
                  color: isCompleted ? "#dcfce7" : "#fecaca",
                  fontSize: "20px",
                }}
              >
                {isCompleted
                  ? "🎉 Perfect! All headings matched correctly!"
                  : `📝 ${
                      currentExercise.data.filter(
                        (item) => userAnswers[item.key] === item.option
                      ).length
                    } out of ${currentExercise.data.length} correct`}
              </h3>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <button
            onClick={previousGroup}
            disabled={currentGroup === 0}
            className="btn btn-secondary"
            style={{ minWidth: 120 }}
          >
            ⬅️ Previous
          </button>

          <button
            onClick={nextGroup}
            disabled={currentGroup === READING_PART_5.length - 1}
            className="btn btn-secondary"
            style={{ minWidth: 120 }}
          >
            Next ➡️
          </button>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        /* Smooth transitions for all interactive elements */
        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Paragraph card animations */
        .paragraph-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateY(0);
        }

        .paragraph-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        /* Custom scrollbar styling for heading options */
        .heading-options-container {
          scrollbar-width: thin;
          scrollbar-color: var(--border-color) transparent;
        }

        .heading-options-container::-webkit-scrollbar {
          width: 8px;
        }

        .heading-options-container::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }

        .heading-options-container::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        .heading-options-container::-webkit-scrollbar-thumb:hover {
          background: var(--card-text);
          background-clip: content-box;
        }

        /* Smooth scroll behavior */
        .heading-options-container {
          scroll-behavior: smooth;
        }

        /* Heading selection animations - more subtle */
        .selected-heading {
          animation: slideInFromTop 0.2s ease-out;
          transform: scale(1);
          transition: all 0.15s ease;
        }

        .selected-heading:hover {
          transform: scale(1.005);
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        }

        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-5px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Option buttons sliding animation - more subtle */
        .option-button {
          transition: all 0.15s ease;
          transform: translateY(0) scale(1);
        }

        .option-button:hover {
          transform: translateY(-1px) scale(1.005);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
        }

        .option-button:active {
          transform: translateY(0) scale(0.995);
          transition: all 0.05s ease;
        }

        /* Feedback animations */
        .feedback-slide {
          animation: slideInFromBottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slideInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Sidebar animations */
        .question-number {
          transition: all 0.2s ease;
          transform: scale(1);
        }

        .question-number:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .question-number:active {
          transform: scale(0.95);
        }

        /* Mobile drawer sliding */
        .mobile-drawer {
          animation: slideInFromLeft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Button animations */
        .btn {
          transition: all 0.2s ease;
          transform: translateY(0);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: translateY(0);
          transition: all 0.1s ease;
        }

        /* Page transition */
        .main-content {
          animation: fadeInSlide 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop improvements */
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }

          .main-content {
            max-width: 1000px;
            margin: 0 auto;
          }

          .card {
            padding: 24px 32px;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }

          .mobile-only {
            display: block !important;
          }

          .main-content {
            padding: 16px !important;
          }

          /* Mobile heading options - enable horizontal scroll */
          .heading-options-container {
            gridtemplatecolumns: repeat(
              auto-fit,
              minmax(250px, 1fr)
            ) !important;
            maxheight: 350px !important;
            overflowx: auto !important;
            overflowy: auto !important;
            padding: 12px !important;
          }

          /* Improve mobile scrollbar visibility */
          .heading-options-container::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .heading-options-container::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 3px;
          }

          /* Reduce animations on mobile for better performance */
          .card:hover {
            transform: none;
          }

          .paragraph-card:hover {
            transform: translateY(-1px);
          }

          /* Mobile option buttons - better touch targets */
          .option-button {
            minheight: 48px !important;
            padding: 12px 16px !important;
            fontsize: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ReadingPart3() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            fontSize: "18px",
            color: "var(--foreground)",
          }}
        >
          Loading Reading Part 3...
        </div>
      }
    >
      <ReadingPart3Content />
    </Suspense>
  );
}
