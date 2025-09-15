"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PART_1_DATA } from "../../utils/data";
import { saveIncorrectAnswer, removeIncorrectAnswer, saveAnswerResult, getAnswerStatuses } from "../../utils/incorrectAnswers";

function Part1Content() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string | number, boolean>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Navigate to specific question if questionId is provided
  useEffect(() => {
    if (questionId) {
      const questionIndex = PART_1_DATA.findIndex(q => q.id.toString() === questionId);
      if (questionIndex !== -1) {
        setCurrentIndex(questionIndex);
      }
    }
  }, [questionId]);

  // Load saved answer statuses when component mounts
  useEffect(() => {
    const savedStatuses = getAnswerStatuses('part1');
    const statusMap: Record<string | number, boolean> = {};
    
    Object.entries(savedStatuses).forEach(([id, isCorrect]) => {
      statusMap[id] = isCorrect;
    });
    
    setAnsweredQuestions(statusMap);
  }, []);

  const currentQuestion = PART_1_DATA[currentIndex];

  function handleSelect(option: string) {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
    
    const isCorrect = option === currentQuestion.answer;
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: isCorrect,
    }));
    
    // Save answer result (both correct and incorrect)
    saveAnswerResult(currentQuestion.id.toString(), 'part1', isCorrect);
    
    // Track incorrect answers for detailed review
    if (!isCorrect) {
      saveIncorrectAnswer({
        id: currentQuestion.id,
        part: 'part1',
        questionData: currentQuestion,
        userAnswer: option,
        correctAnswer: currentQuestion.answer
      });
    } else {
      // Remove from incorrect answers if user got it right
      removeIncorrectAnswer(currentQuestion.id, 'part1');
    }
  }

  function nextQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1 < PART_1_DATA.length ? prev + 1 : 0));
  }


  function previousQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : PART_1_DATA.length - 1));
  }

  function goToQuestion(index: number) {
    setCurrentIndex(index);
    setSelected(null);
    setShowAnswer(false);
    setIsDrawerOpen(false);
  }

  function tryAgain() {
    setSelected(null);
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
          📋 Danh sách câu hỏi - Part 1
        </h3>
        <div
          className="question-grid"
          style={{
            gridTemplateColumns: "repeat(8, 1fr)",
          }}
        >
          {PART_1_DATA.map((question, index) => {
            let className = "question-number";
            if (answeredQuestions[question.id] === true) {
              className += " correct";
            } else if (answeredQuestions[question.id] === false) {
              className += " incorrect";
            } else if (currentIndex === index) {
              className += " current";
            }

            return (
              <div
                key={question.key}
                onClick={() => goToQuestion(index)}
                className={className}
              >
                {index + 1}
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
            📋 Danh sách câu hỏi - Part 1
          </h3>
          <div
            className="question-grid"
            style={{
              gridTemplateColumns: "repeat(8, 1fr)",
            }}
          >
            {PART_1_DATA.map((question, index) => {
              let className = "question-number";
              if (answeredQuestions[question.id] === true) {
                className += " correct";
              } else if (answeredQuestions[question.id] === false) {
                className += " incorrect";
              } else if (currentIndex === index) {
                className += " current";
              }

              return (
                <div
                  key={question.id}
                  onClick={() => goToQuestion(index)}
                  className={className}
                >
                  {index + 1}
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
          maxWidth: 600,
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
          color: "#1f2937", 
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "700"
        }}>
          🎧 Part 1 - Câu {currentIndex + 1} / {PART_1_DATA.length}
          {questionId && currentQuestion.id.toString() === questionId && " 🎯"}
        </h2>

        {questionId && currentQuestion.id.toString() === questionId && (
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
            <strong>📋 Đề bài:</strong> {currentQuestion.question}
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
          {Object.entries(currentQuestion.options).map(([key, text]) => {
            const isCorrect = key === currentQuestion.answer;
            const isSelected = key === selected;
            
            let className = "answer-option";
            if (showAnswer) {
              if (isCorrect) className += " correct";
              else if (isSelected && !isCorrect) className += " incorrect";
            } else if (isSelected) {
              className += " selected";
            }

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                disabled={showAnswer}
                className={className}
              >
                <strong>{key}.</strong> {text}
              </button>
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

        {showAnswer && (
          <div className="card" style={{ marginTop: 20 }}>
            {selected === currentQuestion.answer ? (
              <p style={{ 
                color: "#059669", 
                fontSize: "18px", 
                fontWeight: "600", 
                textAlign: "center",
                margin: "0 0 16px 0"
              }}>
                ✅ Chính xác! 🎉
              </p>
            ) : (
              <p style={{ 
                color: "#dc2626", 
                fontSize: "18px", 
                fontWeight: "600", 
                textAlign: "center",
                margin: "0 0 16px 0"
              }}>
                ❌ Sai rồi! Đáp án đúng là <strong>{currentQuestion.answer}</strong>.
              </p>
            )}
            
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

export default function Part1() {
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
      <Part1Content />
    </Suspense>
  );
}