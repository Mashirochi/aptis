"use client";
import { useState } from "react";
import { PART_3_DATA } from "../../utils/data";

export default function Part3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentQuestion = PART_3_DATA[currentIndex];

  function handleSelect(statementIndex, option) {
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
  }

  function nextQuestion() {
    setSelectedAnswers({});
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1 < PART_3_DATA.length ? prev + 1 : 0));
  }

  function goToQuestion(index) {
    setCurrentIndex(index);
    setSelectedAnswers({});
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
        <h3>Danh sách câu hỏi - Part 3</h3>
        <div
          style={{
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
          }}
        >
          {PART_3_DATA.map((question, index) => (
            <div
              key={question.exam_code}
              onClick={() => goToQuestion(index)}
              style={{
                width: 80,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                cursor: "pointer",
                border: "1px solid #ddd",
                backgroundColor:
                  answeredQuestions[question.exam_code] === true
                    ? "#4caf50"
                    : answeredQuestions[question.exam_code] === false
                    ? "#f44336"
                    : currentIndex === index
                    ? "#e3f2fd"
                    : "white",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {question.exam_code}
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
          <h3>Danh sách câu hỏi - Part 3</h3>
          <div
            style={{
              marginTop: 15,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {PART_3_DATA.map((question, index) => (
              <div
                key={question.exam_code}
                onClick={() => goToQuestion(index)}
                style={{
                  width: 80,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  backgroundColor:
                    answeredQuestions[question.exam_code] === true
                      ? "#4caf50"
                      : answeredQuestions[question.exam_code] === false
                      ? "#f44336"
                      : currentIndex === index
                      ? "#e3f2fd"
                      : "white",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {question.exam_code}
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
          maxWidth: 800,
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

        <h2>Luyện thi nghe Part 3 - Đề: {currentQuestion.exam_code}</h2>

        <div style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 5, marginBottom: 20 }}>
          <p><strong>Hướng dẫn:</strong> {currentQuestion.question}</p>
        </div>

        <audio
          controls
          src={currentQuestion.audio_link}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <div style={{ marginTop: 20 }}>
          {currentQuestion.statements.map((statement, index) => {
            const correctAnswer = currentQuestion.answers.find(a => a.number === index + 1)?.answer;
            const selectedAnswer = selectedAnswers[index];
            
            return (
              <div key={index} style={{ marginBottom: 20, padding: 15, border: "1px solid #ddd", borderRadius: 5 }}>
                <p><strong>{index + 1}. {statement}</strong></p>
                <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                  {currentQuestion.options.map((option) => {
                    let bgColor = "white";
                    if (showAnswer) {
                      if (option === correctAnswer) bgColor = "#a0e7a0";
                      else if (option === selectedAnswer && option !== correctAnswer) bgColor = "#f7a0a0";
                    } else if (option === selectedAnswer) {
                      bgColor = "#d0d0d0";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(index, option)}
                        disabled={showAnswer}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: bgColor,
                          border: "1px solid #ccc",
                          borderRadius: 5,
                          cursor: showAnswer ? "default" : "pointer",
                        }}
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

        {!showAnswer && (
          <button 
            onClick={submitAnswers}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            Nộp bài
          </button>
        )}

        {showAnswer && (
          <div style={{ marginTop: 20 }}>
            <h3>Kết quả:</h3>
            {currentQuestion.answers.map((answer, index) => (
              <p key={index} style={{ 
                color: selectedAnswers[answer.number - 1] === answer.answer ? "green" : "red" 
              }}>
                Câu {answer.number}: {selectedAnswers[answer.number - 1] === answer.answer ? "✓" : "✗"} 
                (Đáp án: {answer.answer})
              </p>
            ))}
            
            <details style={{ marginTop: 15 }}>
              <summary>Transcript (bản ghi)</summary>
              <div style={{ whiteSpace: "pre-line", marginTop: 10 }}>
                {currentQuestion.transcript}
              </div>
            </details>
            
            <button onClick={nextQuestion} style={{ marginTop: 15, padding: "10px 20px" }}>
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