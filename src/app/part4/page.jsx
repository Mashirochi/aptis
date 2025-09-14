"use client";
import { useState } from "react";
import { PART_4_DATA } from "../../utils/data";

export default function Part4() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentQuestion = PART_4_DATA[currentIndex];

  function handleSelect(option) {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: option === currentQuestion.answer,
    }));
  }

  function previousQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : PART_4_DATA.length - 1));
  }

  function nextQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1 < PART_4_DATA.length ? prev + 1 : 0));
  }

  function goToQuestion(index) {
    setCurrentIndex(index);
    setSelected(null);
    setShowAnswer(false);
    setIsDrawerOpen(false);
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
          🎵 Danh sách câu hỏi - Part 4
        </h3>
        <div
          style={{
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "8px",
          }}
        >
          {PART_4_DATA.map((question, index) => {
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
            🎵 Danh sách câu hỏi - Part 4
          </h3>
          <div
            style={{
              marginTop: 15,
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "8px",
            }}
          >
            {PART_4_DATA.map((question, index) => {
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
          maxWidth: 700,
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
          🎵 Part 4 - Câu {currentIndex + 1} / {PART_4_DATA.length}
        </h2>

        <div className="card" style={{ marginBottom: 20, backgroundColor: "#fef7ff" }}>
          <p style={{ 
            fontSize: "16px", 
            lineHeight: "1.5", 
            margin: 0,
            color: "#374151"
          }}>
            <strong>📋 Đề bài:</strong> {currentQuestion.question}
          </p>
        </div>

        <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#374151" }}>🎵 Audio</h4>
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
          {currentQuestion.options.map((option) => {
            const isCorrect = option.key === currentQuestion.answer;
            const isSelected = option.key === selected;
            
            let className = "answer-option";
            if (showAnswer) {
              if (isCorrect) className += " correct";
              else if (isSelected && !isCorrect) className += " incorrect";
            } else if (isSelected) {
              className += " selected";
            }

            return (
              <button
                key={option.key}
                onClick={() => handleSelect(option.key)}
                disabled={showAnswer}
                className={className}
              >
                <strong>{option.key}.</strong> {option.text}
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
                color: "#4f46e5",
                marginBottom: "12px"
              }}>
                📝 Transcript (bản ghi)
              </summary>
              <div style={{ 
                marginTop: 12, 
                padding: 16, 
                backgroundColor: "#f8fafc", 
                borderRadius: 8,
                lineHeight: "1.6",
                border: "1px solid #e2e8f0",
                whiteSpace: "pre-line"
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