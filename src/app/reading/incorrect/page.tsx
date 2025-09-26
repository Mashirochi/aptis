"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getReadingIncorrectAnswers,
  getReadingIncorrectAnswersByPart,
  clearAllReadingIncorrectAnswers,
  clearReadingIncorrectAnswersByPart,
  removeReadingIncorrectAnswer,
  saveReadingIncorrectAnswer,
  ReadingIncorrectAnswer,
} from "../../../utils/readingIncorrectAnswers";
import { READING_PART_2 } from "../../../utils/part2";
import { READING_PART_5 } from "../../../utils/part2";

export default function ReadingIncorrectAnswersPage() {
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    ReadingIncorrectAnswer[]
  >([]);
  const [selectedPart, setSelectedPart] = useState<
    "all" | "reading_part1" | "reading_part2" | "reading_part3"
  >("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, any>>(
    {}
  );
  const [practiceShowAnswer, setPracticeShowAnswer] = useState(false);

  // Load incorrect answers on component mount
  useEffect(() => {
    loadIncorrectAnswers();
  }, [selectedPart]);

  function loadIncorrectAnswers() {
    if (selectedPart === "all") {
      setIncorrectAnswers(getReadingIncorrectAnswers());
    } else {
      setIncorrectAnswers(getReadingIncorrectAnswersByPart(selectedPart));
    }
    setCurrentQuestionIndex(0);
    setPracticeMode(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
  }

  function handleClearAll() {
    if (
      confirm("Are you sure you want to clear all reading incorrect answers?")
    ) {
      clearAllReadingIncorrectAnswers();
      loadIncorrectAnswers();
    }
  }

  function handleClearByPart(
    part: "reading_part1" | "reading_part2" | "reading_part3"
  ) {
    if (
      confirm(
        `Are you sure you want to clear all incorrect answers for ${part
          .replace("_", " ")
          .toUpperCase()}?`
      )
    ) {
      clearReadingIncorrectAnswersByPart(part);
      loadIncorrectAnswers();
    }
  }

  function startPractice() {
    if (incorrectAnswers.length > 0) {
      setPracticeMode(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setPracticeAnswers({});
      setPracticeShowAnswer(false);
    }
  }

  function handlePracticeSubmit() {
    if (practiceShowAnswer) return;

    const currentQuestion = incorrectAnswers[currentQuestionIndex];
    let isCorrect = false;

    // Check if answer is correct based on part type
    if (currentQuestion.part === "reading_part1") {
      isCorrect =
        practiceAnswers.selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.part === "reading_part2") {
      // For reading part 2, check if the sentence order is correct
      isCorrect =
        JSON.stringify(practiceAnswers.sentenceOrder) ===
        JSON.stringify(currentQuestion.correctAnswer);
    } else if (currentQuestion.part === "reading_part3") {
      // For reading part 3, check if all heading assignments are correct
      isCorrect = Object.keys(currentQuestion.correctAnswer).every(
        (key) => practiceAnswers[key] === currentQuestion.correctAnswer[key]
      );
    }

    setPracticeShowAnswer(true);

    if (isCorrect) {
      // Remove from incorrect answers if user got it right
      removeReadingIncorrectAnswer(currentQuestion.id, currentQuestion.part);
      // Refresh the list
      setTimeout(() => {
        loadIncorrectAnswers();
        if (currentQuestionIndex >= incorrectAnswers.length - 1) {
          setCurrentQuestionIndex(0);
        }
      }, 2000);
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex < incorrectAnswers.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setPracticeAnswers({});
    setPracticeShowAnswer(false);
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentQuestionIndex(incorrectAnswers.length - 1);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setPracticeAnswers({});
    setPracticeShowAnswer(false);
  }

  const partCounts = {
    reading_part1: getReadingIncorrectAnswersByPart("reading_part1").length,
    reading_part2: getReadingIncorrectAnswersByPart("reading_part2").length,
    reading_part3: getReadingIncorrectAnswersByPart("reading_part3").length,
  };

  const currentQuestion =
    practiceMode && incorrectAnswers.length > 0
      ? incorrectAnswers[currentQuestionIndex]
      : null;

  // Helper function to get full question data from data files
  const getFullQuestionData = (question: ReadingIncorrectAnswer) => {
    if (question.part === "reading_part1") {
      // For reading part 1, the question data is already stored
      return question.questionData;
    } else if (question.part === "reading_part2") {
      return READING_PART_2.find((q: any) => q.key.toString() === question.id);
    } else if (question.part === "reading_part3") {
      return READING_PART_5.find(
        (q: any) => q.group.toString() === question.id
      );
    }
    return null;
  };

  return (
    <div
      className="gradient-bg"
      style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {!practiceMode ? (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1
                style={{
                  color: "var(--foreground)",
                  fontSize: "32px",
                  fontWeight: "800",
                  margin: "0 0 16px 0",
                }}
              >
                📖 Reading Incorrect Answers Review
              </h1>
              <p
                style={{
                  color: "var(--card-text)",
                  fontSize: "18px",
                  margin: 0,
                }}
              >
                Review and practice your incorrect reading answers to improve
                your performance
              </p>
            </div>

            {/* Statistics Cards - Now clickable for filtering */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div
                className={`filter-card ${
                  selectedPart === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedPart("all")}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>
                  📊 Total
                </h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "inherit",
                    margin: 0,
                  }}
                >
                  {getReadingIncorrectAnswers().length}
                </p>
              </div>

              <div
                className={`filter-card ${
                  selectedPart === "reading_part1" ? "active" : ""
                }`}
                onClick={() => setSelectedPart("reading_part1")}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>
                  📖 Reading Part 1
                </h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "inherit",
                    margin: 0,
                  }}
                >
                  {partCounts.reading_part1}
                </p>
              </div>

              <div
                className={`filter-card ${
                  selectedPart === "reading_part2" ? "active" : ""
                }`}
                onClick={() => setSelectedPart("reading_part2")}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>
                  🔄 Reading Part 2
                </h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "inherit",
                    margin: 0,
                  }}
                >
                  {partCounts.reading_part2}
                </p>
              </div>

              <div
                className={`filter-card ${
                  selectedPart === "reading_part3" ? "active" : ""
                }`}
                onClick={() => setSelectedPart("reading_part3")}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>
                  🏷️ Reading Part 3
                </h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "inherit",
                    margin: 0,
                  }}
                >
                  {partCounts.reading_part3}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="card"
              style={{ marginBottom: "30px", textAlign: "center" }}
            >
              <h3
                style={{
                  color: "var(--foreground)",
                  fontSize: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                🎮 Actions
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {incorrectAnswers.length > 0 && (
                  <button onClick={startPractice} className="btn btn-primary">
                    🎯 Practice Mode
                  </button>
                )}
                <Link href="/reading/part1" className="btn btn-secondary">
                  📖 Reading Part 1
                </Link>
                <Link href="/reading/part2" className="btn btn-secondary">
                  🔄 Reading Part 2
                </Link>
                <Link href="/reading/part5" className="btn btn-secondary">
                  🏷️ Reading Part 3
                </Link>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {partCounts.reading_part1 > 0 && (
                    <button
                      onClick={() => handleClearByPart("reading_part1")}
                      className="btn btn-warning"
                    >
                      🗑️ Clear Part 1
                    </button>
                  )}
                  {partCounts.reading_part2 > 0 && (
                    <button
                      onClick={() => handleClearByPart("reading_part2")}
                      className="btn btn-warning"
                    >
                      🗑️ Clear Part 2
                    </button>
                  )}
                  {partCounts.reading_part3 > 0 && (
                    <button
                      onClick={() => handleClearByPart("reading_part3")}
                      className="btn btn-warning"
                    >
                      🗑️ Clear Part 3
                    </button>
                  )}
                  {getReadingIncorrectAnswers().length > 0 && (
                    <button onClick={handleClearAll} className="btn btn-danger">
                      🗑️ Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Incorrect Answers List */}
            {incorrectAnswers.length === 0 ? (
              <div
                className="card"
                style={{ textAlign: "center", padding: "60px 20px" }}
              >
                <h3
                  style={{
                    color: "#059669",
                    fontSize: "24px",
                    margin: "0 0 16px 0",
                  }}
                >
                  🎉 Great job!
                </h3>
                <p
                  style={{
                    color: "var(--card-text)",
                    fontSize: "18px",
                    margin: "0 0 20px 0",
                  }}
                >
                  {selectedPart === "all"
                    ? "You have no reading incorrect answers to review!"
                    : `You have no incorrect answers in ${selectedPart
                        .replace("_", " ")
                        .toUpperCase()}!`}
                </p>
                <Link href="/reading/part1" className="btn btn-primary">
                  📖 Continue Reading Practice
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "20px" }}>
                {incorrectAnswers.map((item, index) => (
                  <div
                    key={`${item.part}-${item.id}-${index}`}
                    className="card"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            color: "var(--foreground)",
                            margin: "0 0 8px 0",
                            fontSize: "18px",
                            fontWeight: "600",
                          }}
                        >
                          {item.part === "reading_part1"
                            ? "📖"
                            : item.part === "reading_part2"
                            ? "🔄"
                            : "🏷️"}{" "}
                          {item.part.replace("_", " ").toUpperCase()} -{" "}
                          {item.id}
                        </h4>
                        <p
                          style={{
                            color: "var(--card-text)",
                            margin: "0 0 12px 0",
                            fontSize: "14px",
                          }}
                        >
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>

                      <Link
                        href={`/reading/${item.part.replace("reading_", "")}${
                          item.part === "reading_part1"
                            ? ""
                            : `?${
                                item.part === "reading_part2"
                                  ? "exercise"
                                  : "group"
                              }=${item.id}`
                        }`}
                        className="btn btn-secondary btn-small"
                        style={{ fontSize: "12px", padding: "6px 12px" }}
                      >
                        📚 Practice
                      </Link>
                    </div>

                    {/* Question Preview */}
                    <div
                      style={{
                        backgroundColor: "var(--background)",
                        padding: "16px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {item.part === "reading_part1" && item.questionData && (
                        <div>
                          <p
                            style={{
                              color: "var(--card-text)",
                              margin: "0 0 12px 0",
                              fontSize: "14px",
                              lineHeight: "1.5",
                            }}
                          >
                            <strong>Question:</strong>{" "}
                            {item.questionData.questionStart}{" "}
                            <strong>_____</strong>{" "}
                            {item.questionData.questionEnd}
                          </p>
                          <p
                            style={{
                              color: "#dc2626",
                              margin: "0 0 8px 0",
                              fontSize: "14px",
                            }}
                          >
                            <strong>Your Answer:</strong> {item.userAnswer}
                          </p>
                          <p
                            style={{
                              color: "#059669",
                              margin: 0,
                              fontSize: "14px",
                            }}
                          >
                            <strong>Correct Answer:</strong>{" "}
                            {item.correctAnswer}
                          </p>
                        </div>
                      )}

                      {item.part === "reading_part2" && (
                        <div>
                          <p
                            style={{
                              color: "var(--card-text)",
                              margin: "0 0 12px 0",
                              fontSize: "14px",
                            }}
                          >
                            <strong>Exercise:</strong> Sentence ordering task
                          </p>
                          <p
                            style={{
                              color: "#dc2626",
                              margin: "0 0 8px 0",
                              fontSize: "14px",
                            }}
                          >
                            <strong>Result:</strong> Incorrect sentence order
                          </p>
                        </div>
                      )}

                      {item.part === "reading_part3" && (
                        <div>
                          <p
                            style={{
                              color: "var(--card-text)",
                              margin: "0 0 12px 0",
                              fontSize: "14px",
                            }}
                          >
                            <strong>Exercise:</strong> Heading matching task
                          </p>
                          <p
                            style={{
                              color: "#dc2626",
                              margin: "0 0 8px 0",
                              fontSize: "14px",
                            }}
                          >
                            <strong>Result:</strong> Incorrect heading
                            assignments
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Practice Mode */
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  color: "var(--foreground)",
                  fontSize: "24px",
                  margin: 0,
                }}
              >
                🎯 Reading Practice Mode
              </h2>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <span
                  style={{
                    color: "var(--card-text)",
                    fontSize: "16px",
                  }}
                >
                  Question {currentQuestionIndex + 1} of{" "}
                  {incorrectAnswers.length}
                </span>
                <button
                  onClick={() => setPracticeMode(false)}
                  className="btn btn-secondary"
                >
                  ❌ Exit Practice
                </button>
              </div>
            </div>

            {currentQuestion && (
              <div className="card">
                <h3
                  style={{
                    color: "var(--foreground)",
                    margin: "0 0 20px 0",
                    fontSize: "20px",
                  }}
                >
                  {currentQuestion.part === "reading_part1"
                    ? "📖"
                    : currentQuestion.part === "reading_part2"
                    ? "🔄"
                    : "🏷️"}{" "}
                  {currentQuestion.part.replace("_", " ").toUpperCase()} -{" "}
                  {currentQuestion.id}
                </h3>

                {/* Question content would go here based on part type */}
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "var(--background)",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "var(--card-text)",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Practice functionality can be implemented here for each
                    reading part type.
                    <br />
                    <Link
                      href={`/reading/${currentQuestion.part.replace(
                        "reading_",
                        ""
                      )}${
                        currentQuestion.part === "reading_part1"
                          ? ""
                          : `?${
                              currentQuestion.part === "reading_part2"
                                ? "exercise"
                                : "group"
                            }=${currentQuestion.id}`
                      }`}
                      className="btn btn-primary"
                      style={{ marginTop: "16px" }}
                    >
                      📚 Go to Full Practice
                    </Link>
                  </p>
                </div>

                {/* Navigation */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <button
                    onClick={previousQuestion}
                    className="btn btn-secondary"
                  >
                    ⬅️ Previous
                  </button>
                  <button onClick={nextQuestion} className="btn btn-secondary">
                    Next ➡️
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
