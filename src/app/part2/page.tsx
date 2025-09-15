"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PART_2_DATA } from "../../utils/data";
import { saveIncorrectAnswer, removeIncorrectAnswer } from "../../utils/incorrectAnswers";

function Part2Content() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<number | null>(null);

  // Navigate to specific question if questionId is provided
  useEffect(() => {
    if (questionId) {
      const questionIndex = PART_2_DATA.findIndex(q => q.exam_code === questionId);
      if (questionIndex !== -1) {
        setCurrentIndex(questionIndex);
      }
    }
  }, [questionId]);

  const currentQuestion = PART_2_DATA[currentIndex];

  function handleSelect(speakerIndex: string, option: string) {
    if (showAnswer) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [speakerIndex]: option,
    }));
  }

  function previousQuestion() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentSpeaker(null);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : PART_2_DATA.length - 1));
  }

  function nextQuestion() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentSpeaker(null);
    setCurrentIndex((prev) => (prev + 1 < PART_2_DATA.length ? prev + 1 : 0));
  }

  function submitAnswers() {
    if (showAnswer) return;
    setShowAnswer(true);
    
    // Check if all speakers are answered correctly
    let allCorrect = true;
    const incorrectSpeakers = [];
    
    Object.keys(currentQuestion.answer).forEach((speakerNum) => {
      const isCorrect = selectedAnswers[speakerNum] === (currentQuestion.answer as any)[speakerNum];
      if (!isCorrect) {
        allCorrect = false;
        incorrectSpeakers.push(speakerNum);
      }
    });
    
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.exam_code]: allCorrect,
    }));
    
    // Track incorrect answers
    if (!allCorrect) {
      saveIncorrectAnswer({
        id: currentQuestion.exam_code,
        part: 'part2',
        questionData: currentQuestion,
        userAnswer: selectedAnswers,
        correctAnswer: currentQuestion.answer
      });
    } else {
      // Remove from incorrect answers if user got it right
      removeIncorrectAnswer(currentQuestion.exam_code, 'part2');
    }
  }

  function goToQuestion(index: number) {
    setCurrentIndex(index);
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentSpeaker(null);
    setIsDrawerOpen(false);
  }

  function tryAgain() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentSpeaker(null);
  }

  function playSpeakerAudio(index: number) {
    setCurrentSpeaker(index);
  }

  return (
    <div className="gradient-bg" style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar desktop */}
      <div
        className="sidebar"
        style={{
          width: 500,
          backgroundColor: "#f8fafc",
          padding: 20,
          borderRight: "2px solid #e2e8f0",
          overflowY: "auto",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
        }}
      >
        <h3 style={{
          color: "#1f2937",
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center"
        }}>
          🎙️ Danh sách câu hỏi - Part 2
        </h3>
        <div
          style={{
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {PART_2_DATA.map((question, index) => {
            let className = "question-number";
            if (answeredQuestions[question.exam_code] === true) {
              className += " correct";
            } else if (answeredQuestions[question.exam_code] === false) {
              className += " incorrect";
            } else if (currentIndex === index) {
              className += " current";
            }

            return (
              <div
                key={question.exam_code}
                onClick={() => goToQuestion(index)}
                className={className}
                style={{
                  width: 100,
                  height: 40,
                  fontSize: "12px",
                }}
              >
                {question.exam_code}
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer mobile */}
      {isDrawerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "white",
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
            ✖️ Đóng
          </button>
          <h3 style={{
            color: "#1f2937",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "700",
            textAlign: "center"
          }}>
            🎙️ Danh sách câu hỏi - Part 2
          </h3>
          <div
            style={{
              marginTop: 15,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {PART_2_DATA.map((question, index) => {
              let className = "question-number";
              if (answeredQuestions[question.exam_code] === true) {
                className += " correct";
              } else if (answeredQuestions[question.exam_code] === false) {
                className += " incorrect";
              } else if (currentIndex === index) {
                className += " current";
              }

              return (
                <div
                  key={question.exam_code}
                  onClick={() => goToQuestion(index)}
                  className={className}
                  style={{
                    width: 100,
                    height: 40,
                    fontSize: "12px",
                  }}
                >
                  {question.exam_code}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: 20,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <button
          className="btn btn-secondary open-drawer-btn"
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginBottom: 20, display: "none" }}
        >
          📋 Danh sách câu hỏi
        </button>

        <h2 style={{ 
          color: "#1f2937", 
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "700"
        }}>
          🎙️ Part 2 - Đề: {currentQuestion.exam_code}
          {questionId && currentQuestion.exam_code === questionId && " 🎯"}
        </h2>

        {questionId && currentQuestion.exam_code === questionId && (
          <div className="card" style={{
            marginBottom: 20,
            backgroundColor: "#dbeafe",
            border: "2px solid #3b82f6",
            padding: "16px"
          }}>
            <p style={{
              color: "#1e40af",
              margin: 0,
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center"
            }}>
              🎯 <strong>This question was incorrect.</strong> Practice it again to improve!
            </p>
          </div>
        )}

        <div className="card" style={{ marginBottom: 20, backgroundColor: "var(--card-background)", color: "var(--card-text)" }}>
          <p style={{ 
            fontSize: "16px", 
            lineHeight: "1.5", 
            margin: 0,
            color: "#374151"
          }}>
            <strong>📋 Hướng dẫn:</strong> {currentQuestion.question}
          </p>
        </div>

        {/* Audio players for each speaker */}
        <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 16px 0", color: "#374151" }}>🎵 Audio Players</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {currentQuestion.speakers.map((speaker, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <h5 style={{ margin: "0 0 8px 0", color: "#4f46e5", fontSize: "14px", fontWeight: "600" }}>
                  {speaker}
                </h5>
                <audio
                  controls
                  src={currentQuestion.audio_links[index]}
                  onPlay={() => playSpeakerAudio(index)}
                  style={{ 
                    width: "100%", 
                    height: "40px",
                    borderRadius: "8px"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Matching exercise */}
        <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 16px 0", color: "#374151" }}>🎯 Match Speakers to Options</h4>
          
          {/* Options */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>Available Options:</h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <div key={key} className="btn btn-secondary" style={{ 
                  fontSize: "14px", 
                  padding: "6px 12px",
                  cursor: "default",
                  opacity: 0.8
                }}>
                  <strong>{key === "." ? "⚫" : key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>

          {/* Speaker matching */}
          <div style={{ display: "grid", gap: "16px" }}>
            {currentQuestion.speakers.map((speaker, index) => {
              const speakerNum = (index + 1).toString();
              const correctAnswer = (currentQuestion.answer as any)[speakerNum];
              const selectedAnswer = selectedAnswers[speakerNum];
              
              return (
                <div key={index} style={{ 
                  padding: "16px", 
                  border: "2px solid #e5e7eb", 
                  borderRadius: "12px",
                  backgroundColor: currentSpeaker === index ? "#fef3c7" : "#fff"
                }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    marginBottom: "12px"
                  }}>
                    <h5 style={{ 
                      margin: 0, 
                      color: "#1f2937", 
                      fontSize: "16px", 
                      fontWeight: "600"
                    }}>
                      {speaker} (Question {speakerNum})
                    </h5>
                    {currentSpeaker === index && (
                      <span style={{ 
                        backgroundColor: "#fbbf24", 
                        color: "#92400e", 
                        padding: "4px 8px", 
                        borderRadius: "6px", 
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        🔊 Playing
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {Object.entries(currentQuestion.options).map(([key, value]) => {
                      let className = "btn btn-secondary";
                      if (showAnswer) {
                        if (key === correctAnswer) className = "btn btn-success";
                        else if (key === selectedAnswer && key !== correctAnswer) className = "btn btn-danger";
                      } else if (key === selectedAnswer) {
                        className = "btn btn-primary";
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => handleSelect(speakerNum, key)}
                          disabled={showAnswer}
                          className={className}
                          style={{ 
                            fontSize: "14px", 
                            padding: "8px 16px",
                            minWidth: "40px"
                          }}
                          title={value}
                        >
                          {key === "." ? "⚫" : key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons - always visible */}
        <div style={{ 
          marginTop: 30, 
          display: "flex", 
          gap: "12px", 
          justifyContent: "center", 
          flexWrap: "wrap" 
        }}>
          <button 
            onClick={previousQuestion} 
            className="btn btn-secondary"
          >
            ⬅️ Previous Question
          </button>
          {showAnswer && (
            <button 
              onClick={tryAgain} 
              className="btn btn-warning"
            >
              🔄 Try Again
            </button>
          )}
          <button 
            onClick={nextQuestion} 
            className="btn btn-primary"
          >
            Next Question ➡️
          </button>
        </div>

        {!showAnswer && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button 
              onClick={submitAnswers}
              className="btn btn-success btn-large"
            >
              📝 Nộp bài
            </button>
          </div>
        )}

        {showAnswer && (
          <div className="card" style={{ marginTop: 20 }}>
            <h3 style={{ 
              color: "#1f2937", 
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600"
            }}>
              📊 Kết quả:
            </h3>
            {Object.entries(currentQuestion.answer).map(([speakerNum, correctAnswer]) => {
              const isCorrect = selectedAnswers[speakerNum] === correctAnswer;
              const selectedOption = (currentQuestion.options as any)[selectedAnswers[speakerNum]] || "Not selected";
              const correctOption = (currentQuestion.options as any)[correctAnswer];
              
              return (
                <div key={speakerNum} style={{ 
                  marginBottom: "12px",
                  padding: "12px",
                  backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                  borderRadius: "8px",
                  border: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`
                }}>
                  <p style={{ 
                    color: isCorrect ? "#059669" : "#dc2626",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 4px 0"
                  }}>
                    {currentQuestion.speakers[parseInt(speakerNum) - 1]}: {isCorrect ? "✅" : "❌"}
                  </p>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#374151", 
                    margin: 0 
                  }}>
                    Your answer: <strong>{selectedAnswers[speakerNum] || "None"}</strong> ({selectedOption})
                    <br />
                    Correct answer: <strong>{correctAnswer}</strong> ({correctOption})
                  </p>
                </div>
              );
            })}
            
            <details style={{ marginTop: 16 }}>
              <summary style={{ 
                cursor: "pointer", 
                fontSize: "16px", 
                fontWeight: "600",
                color: "var(--foreground)",
                marginBottom: "12px"
              }}>
                📝 Transcripts (bản ghi)
              </summary>
              <div style={{ marginTop: 12 }}>
                {Object.entries(currentQuestion.transcript).map(([speaker, text]) => (
                  <div key={speaker} style={{ 
                    marginBottom: 16, 
                    padding: 16, 
                    backgroundColor: "var(--card-background)", 
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                    color: "var(--card-text)"
                  }}>
                    <h6 style={{ 
                      margin: "0 0 8px 0", 
                      color: "var(--foreground)", 
                      fontSize: "14px", 
                      fontWeight: "600" 
                    }}>
                      Speaker {speaker}:
                    </h6>
                    <p style={{ 
                      margin: 0, 
                      lineHeight: "1.6",
                      color: "var(--card-text)"
                    }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Ẩn sidebar trên mobile */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .open-drawer-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Part2() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    }>
      <Part2Content />
    </Suspense>
  );
}