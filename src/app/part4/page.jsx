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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      {/* Sidebar desktop */}
      <div
        className="sidebar"
        style={{
          width: 500,
          backgroundColor: "#f5f5f5",
          padding: 20,
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h3>Danh sách câu hỏi - Part 4</h3>
        <div
          style={{
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "8px",
          }}
        >
          {PART_4_DATA.map((question, index) => (
            <div
              key={question.id}
              onClick={() => goToQuestion(index)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                cursor: "pointer",
                border: "1px solid #ddd",
                backgroundColor:
                  answeredQuestions[question.id] === true
                    ? "#4caf50"
                    : answeredQuestions[question.id] === false
                    ? "#f44336"
                    : currentIndex === index
                    ? "#e3f2fd"
                    : "white",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </div>
          ))}
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
            onClick={() => setIsDrawerOpen(false)}
            style={{ marginBottom: 20 }}
          >
            Đóng
          </button>
          <h3>Danh sách câu hỏi - Part 4</h3>
          <div
            style={{
              marginTop: 15,
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "8px",
            }}
          >
            {PART_4_DATA.map((question, index) => (
              <div
                key={question.id}
                onClick={() => goToQuestion(index)}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  backgroundColor:
                    answeredQuestions[question.id] === true
                      ? "#4caf50"
                      : answeredQuestions[question.id] === false
                      ? "#f44336"
                      : currentIndex === index
                      ? "#e3f2fd"
                      : "white",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </div>
            ))}
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
          className="open-drawer-btn"
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginBottom: 20, display: "none" }}
        >
          Danh sách câu hỏi
        </button>

        <h2>Luyện thi nghe Part 4 - Câu {currentIndex + 1}</h2>

        <div style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 5, marginBottom: 20 }}>
          <p><strong>Đề bài:</strong> {currentQuestion.question}</p>
        </div>

        <audio
          controls
          src={currentQuestion.audio_link}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <div style={{ marginTop: 20 }}>
          {currentQuestion.options.map((option) => {
            const isCorrect = option.key === currentQuestion.answer;
            const isSelected = option.key === selected;
            let bgColor = "white";

            if (showAnswer) {
              if (isCorrect) bgColor = "#a0e7a0";
              else if (isSelected && !isCorrect) bgColor = "#f7a0a0";
            } else if (isSelected) {
              bgColor = "#d0d0d0";
            }

            return (
              <button
                key={option.key}
                onClick={() => handleSelect(option.key)}
                disabled={showAnswer}
                style={{
                  display: "block",
                  width: "100%",
                  padding: 15,
                  marginBottom: 10,
                  backgroundColor: bgColor,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  cursor: showAnswer ? "default" : "pointer",
                  textAlign: "left",
                }}
              >
                <strong>{option.key}.</strong> {option.text}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div style={{ marginTop: 20 }}>
            {selected === currentQuestion.answer ? (
              <p style={{ color: "green", fontSize: "18px" }}>Chính xác! 🎉</p>
            ) : (
              <p style={{ color: "red", fontSize: "18px" }}>
                Sai rồi! Đáp án đúng là <strong>{currentQuestion.answer}</strong>.
              </p>
            )}
            <details style={{ marginTop: 15 }}>
              <summary style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
                Transcript (bản ghi)
              </summary>
              <div style={{ 
                marginTop: 10, 
                padding: 15, 
                backgroundColor: "#f9f9f9", 
                borderRadius: 5,
                whiteSpace: "pre-line",
                lineHeight: "1.6"
              }}>
                {currentQuestion.transcript}
              </div>
            </details>
            <button 
              onClick={nextQuestion} 
              style={{ 
                marginTop: 15, 
                padding: "10px 20px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Câu tiếp theo
            </button>
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