"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PART_3_DATA } from "../../utils/data";
import { saveIncorrectAnswer, removeIncorrectAnswer, saveAnswerResult, getAnswerStatuses } from "../../utils/incorrectAnswers";

function Part3Content() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Navigate to specific question if questionId is provided
  useEffect(() => {
    if (questionId) {
      const questionIndex = PART_3_DATA.findIndex(q => q.exam_code === questionId);
      if (questionIndex !== -1) {
        setCurrentIndex(questionIndex);
      }
    }
  }, [questionId]);

  // Load saved answer statuses when component mounts
  useEffect(() => {
    const savedStatuses = getAnswerStatuses('part3');
    const statusMap: Record<string, boolean> = {};
    
    Object.entries(savedStatuses).forEach(([id, isCorrect]) => {
      statusMap[id] = isCorrect;
    });
    
    setAnsweredQuestions(statusMap);
  }, []);

  const currentQuestion = PART_3_DATA[currentIndex];

  function handleSelect(statementIndex: number, option: string) {
    if (showAnswer) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [statementIndex]: option,
    }));
  }

  function submitAnswers() {
    if (showAnswer) return;
    setShowAnswer(true);
    
    // Check if all statements are answered correctly
    let allCorrect = true;
    currentQuestion.answers.forEach((answer) => {
      if (selectedAnswers[answer.number - 1] !== answer.answer) {
        allCorrect = false;
      }
    });
    
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.exam_code]: allCorrect,
    }));
    
    // Save answer result (both correct and incorrect)
    saveAnswerResult(currentQuestion.exam_code, 'part3', allCorrect);
    
    // Track incorrect answers for detailed review
    if (!allCorrect) {
      saveIncorrectAnswer({
        id: currentQuestion.exam_code,
        part: 'part3',
        questionData: currentQuestion,
        userAnswer: selectedAnswers,
        correctAnswer: currentQuestion.answers
      });
    } else {
      // Remove from incorrect answers if user got it right
      removeIncorrectAnswer(currentQuestion.exam_code, 'part3');
    }
  }

  function previousQuestion() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : PART_3_DATA.length - 1));
  }

  function nextQuestion() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1 < PART_3_DATA.length ? prev + 1 : 0));
  }

  function goToQuestion(index: number) {
    setCurrentIndex(index);
    setSelectedAnswers({});
    setShowAnswer(false);
    setIsDrawerOpen(false);
  }

  function tryAgain() {
    setSelectedAnswers({});
    setShowAnswer(false);
  }

  return (
    <div className="gradient-bg" style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar desktop */}
      <div
        className="sidebar sidebar-bg"
        style={{
          width: 500,
          padding: 20,
          overflowY: "auto"
        }}
      >
        <h3 style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center"
        }}>
          📝 Danh sách câu hỏi - Part 3
        </h3>
        <div
          className="question-grid"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {PART_3_DATA.map((question, index) => {
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
                  width: 80,
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
            ✖️ Đóng
          </button>
          <h3 style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "700",
            textAlign: "center"
          }}>
            📝 Danh sách câu hỏi - Part 3
          </h3>
          <div
            className="question-grid"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {PART_3_DATA.map((question, index) => {
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
                    width: 80,
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
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Nút mở drawer trên mobile */}
        <button
          className="btn btn-secondary open-drawer-btn"
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginBottom: 20, display: "none" }}
        >
          📋 Danh sách câu hỏi
        </button>

        <h2 style={{ 
          color: "var(--foreground)", 
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "700"
        }}>
          📝 Part 3 - Đề: {currentQuestion.exam_code}
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
            color: "var(--foreground)"
          }}>
            <strong>📋 Hướng dẫn:</strong> {currentQuestion.question}
          </p>
        </div>

        <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>🎵 Audio</h4>
          <audio
            controls
            src={currentQuestion.audio_link}
            style={{ 
              width: "100%", 
              height: "45px",
              borderRadius: "8px"
            }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          {currentQuestion.statements.map((statement, index) => {
            const correctAnswer = currentQuestion.answers.find(a => a.number === index + 1)?.answer;
            const selectedAnswer = selectedAnswers[index];
            
            return (
              <div key={index} className="card" style={{ marginBottom: 20, padding: 20 }}>
                <p style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  marginBottom: "12px",
                  color: "var(--foreground)"
                }}>
                  <strong>{index + 1}. {statement}</strong>
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: 10, flexWrap: "wrap" }}>
                  {currentQuestion.options.map((option) => {
                    let className = "btn btn-secondary";
                    if (showAnswer) {
                      if (option === correctAnswer) className = "btn btn-success";
                      else if (option === selectedAnswer && option !== correctAnswer) className = "btn btn-danger";
                    } else if (option === selectedAnswer) {
                      className = "btn btn-primary";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(index, option)}
                        disabled={showAnswer}
                        className={className}
                        style={{ minWidth: "60px" }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
              color: "var(--foreground)", 
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600"
            }}>
              📊 Kết quả:
            </h3>
            {currentQuestion.answers.map((answer, index) => (
              <p key={index} style={{ 
                color: selectedAnswers[answer.number - 1] === answer.answer ? "#059669" : "#dc2626",
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                Câu {answer.number}: {selectedAnswers[answer.number - 1] === answer.answer ? "✅" : "❌"} 
                (Đáp án: <strong>{answer.answer}</strong>)
              </p>
            ))}
            
            <details style={{ marginTop: 16 }}>
              <summary style={{ 
                cursor: "pointer", 
                fontSize: "16px", 
                fontWeight: "600",
                color: "var(--foreground)",
                marginBottom: "12px"
              }}>
                📝 Transcript (bản ghi)
              </summary>
              <div style={{ 
                marginTop: 12, 
                padding: 16, 
                backgroundColor: "var(--card-background)", 
                borderRadius: 8,
                lineHeight: "1.6",
                border: "1px solid var(--border-color)",
                whiteSpace: "pre-line",
                color: "var(--card-text)"
              }}>
                {currentQuestion.transcript}
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

export default function Part3() {
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
      <Part3Content />
    </Suspense>
  );
}