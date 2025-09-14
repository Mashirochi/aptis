"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PART_4_DATA } from "../../utils/data";
import { saveIncorrectAnswer, removeIncorrectAnswer } from "../../utils/incorrectAnswers";

export default function Part4() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Navigate to specific question if questionId is provided
  useEffect(() => {
    if (questionId) {
      // Find the audio and question that contains this questionId
      for (let audioIndex = 0; audioIndex < PART_4_DATA.length; audioIndex++) {
        const audio = PART_4_DATA[audioIndex];
        const questionExists = audio.questions.some(q => q.id.toString() === questionId);
        if (questionExists) {
          setCurrentIndex(audioIndex);
          break;
        }
      }
    }
  }, [questionId]);

  const currentAudio = PART_4_DATA[currentIndex];

  function handleSelect(questionId, option) {
    if (showAnswers[questionId]) return;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: true,
    }));
    
    const question = currentAudio.questions.find(q => q.id === questionId);
    const isCorrect = option === question.answer;
    
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: isCorrect,
    }));
    
    // Track incorrect answers
    if (!isCorrect) {
      saveIncorrectAnswer({
        id: questionId,
        part: 'part4',
        questionData: question,
        userAnswer: option,
        correctAnswer: question.answer
      });
    } else {
      // Remove from incorrect answers if user got it right
      removeIncorrectAnswer(questionId, 'part4');
    }
  }

  function previousAudio() {
    setSelectedAnswers({});
    setShowAnswers({});
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : PART_4_DATA.length - 1));
  }

  function nextAudio() {
    setSelectedAnswers({});
    setShowAnswers({});
    setCurrentIndex((prev) => (prev + 1 < PART_4_DATA.length ? prev + 1 : 0));
  }

  function goToAudio(index) {
    setCurrentIndex(index);
    setSelectedAnswers({});
    setShowAnswers({});
    setIsDrawerOpen(false);
  }

  function tryAgainQuestion(questionId) {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  }

  function tryAgainAll() {
    setSelectedAnswers({});
    setShowAnswers({});
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
          🎵 Danh sách Audio - Part 4
        </h3>
        <div
          style={{
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
          }}
        >
          {PART_4_DATA.map((audio, index) => {
            let className = "question-number";
            
            // Check if all questions in this audio are answered correctly
            const allCorrect = audio.questions.every(q => answeredQuestions[q.id] === true);
            const hasIncorrect = audio.questions.some(q => answeredQuestions[q.id] === false);
            
            if (allCorrect) {
              className += " correct";
            } else if (hasIncorrect) {
              className += " incorrect";
            } else if (currentIndex === index) {
              className += " current";
            }

            return (
              <div
                key={index}
                onClick={() => goToAudio(index)}
                className={className}
                style={{
                  width: 80,
                  height: 40,
                  fontSize: "12px",
                  padding: "2px"
                }}
              >
                Audio {index + 1}
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
            🎵 Danh sách Audio - Part 4
          </h3>
          <div
            style={{
              marginTop: 15,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {PART_4_DATA.map((audio, index) => {
              let className = "question-number";
              
              // Check if all questions in this audio are answered correctly
              const allCorrect = audio.questions.every(q => answeredQuestions[q.id] === true);
              const hasIncorrect = audio.questions.some(q => answeredQuestions[q.id] === false);
              
              if (allCorrect) {
                className += " correct";
              } else if (hasIncorrect) {
                className += " incorrect";
              } else if (currentIndex === index) {
                className += " current";
              }

              return (
                <div
                  key={index}
                  onClick={() => goToAudio(index)}
                  className={className}
                  style={{
                    width: 80,
                    height: 40,
                    fontSize: "12px",
                    padding: "2px"
                  }}
                >
                  Audio {index + 1}
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
          🎵 Part 4 - Audio {currentIndex + 1} / {PART_4_DATA.length}
        </h2>

        <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#374151" }}>🎵 Audio</h4>
          <audio
            controls
            src={currentAudio.audio_link}
            style={{ 
              width: "100%", 
              height: "45px",
              borderRadius: "8px"
            }}
          />
        </div>

        {/* Display all questions for this audio */}
        <div style={{ marginBottom: 20 }}>
          {currentAudio.questions.map((question, questionIndex) => {
            const isAnswered = showAnswers[question.id];
            const selectedAnswer = selectedAnswers[question.id];
            const isCorrect = selectedAnswer === question.answer;
            const isHighlighted = questionId && question.id.toString() === questionId;

            return (
              <div 
                key={question.id} 
                className="card" 
                style={{ 
                  marginBottom: 20, 
                  padding: "20px",
                  border: isHighlighted ? "3px solid #3b82f6" : undefined,
                  backgroundColor: isHighlighted ? "#eff6ff" : undefined,
                  boxShadow: isHighlighted ? "0 0 20px rgba(59, 130, 246, 0.3)" : undefined
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginBottom: "16px" 
                }}>
                  <h3 style={{ 
                    color: isHighlighted ? "#1d4ed8" : "#1f2937", 
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600"
                  }}>
                    Question {questionIndex + 1} {isHighlighted && "🎯"}
                  </h3>
                  {isAnswered && (
                    <button 
                      onClick={() => tryAgainQuestion(question.id)} 
                      className="btn btn-warning"
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                    >
                      🔄 Try Again
                    </button>
                  )}
                </div>

                {isHighlighted && (
                  <div style={{
                    padding: "12px",
                    backgroundColor: "#dbeafe",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    border: "1px solid #3b82f6"
                  }}>
                    <p style={{
                      color: "#1e40af",
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "500"
                    }}>
                      🎯 <strong>This question was incorrect.</strong> Practice it again!
                    </p>
                  </div>
                )}

                <div className="card" style={{ marginBottom: 16, backgroundColor: "#fef7ff", padding: "16px" }}>
                  <p style={{ 
                    fontSize: "16px", 
                    lineHeight: "1.5", 
                    margin: 0,
                    color: "#374151"
                  }}>
                    <strong>📋 Đề bài:</strong> {question.question}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  {question.options.map((option) => {
                    const isOptionCorrect = option.key === question.answer;
                    const isSelected = option.key === selectedAnswer;
                    
                    let className = "answer-option";
                    if (isAnswered) {
                      if (isOptionCorrect) className += " correct";
                      else if (isSelected && !isOptionCorrect) className += " incorrect";
                    } else if (isSelected) {
                      className += " selected";
                    }

                    return (
                      <button
                        key={option.key}
                        onClick={() => handleSelect(question.id, option.key)}
                        disabled={isAnswered}
                        className={className}
                        style={{ marginBottom: "8px" }}
                      >
                        <strong>{option.key}.</strong> {option.text}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div style={{ 
                    padding: "12px", 
                    borderRadius: "8px", 
                    backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                    border: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`
                  }}>
                    <p style={{ 
                      color: isCorrect ? "#059669" : "#dc2626", 
                      fontSize: "16px", 
                      fontWeight: "600", 
                      margin: 0
                    }}>
                      {isCorrect ? "✅ Chính xác! 🎉" : `❌ Sai rồi! Đáp án đúng là ${question.answer}.`}
                    </p>
                  </div>
                )}
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
            onClick={previousAudio} 
            className="btn btn-secondary"
          >
            ⬅️ Previous Audio
          </button>
          <button 
            onClick={tryAgainAll} 
            className="btn btn-warning"
          >
            🔄 Try Again All
          </button>
          <button 
            onClick={nextAudio} 
            className="btn btn-primary"
          >
            Next Audio ➡️
          </button>
        </div>

        {/* Show transcript when any question is answered */}
        {Object.keys(showAnswers).some(qId => 
          currentAudio.questions.some(q => q.id === parseInt(qId)) && showAnswers[qId]
        ) && (
          <div className="card" style={{ marginTop: 20 }}>
            <details>
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
                {currentAudio.transcript}
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