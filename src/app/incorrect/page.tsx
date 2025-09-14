"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getIncorrectAnswers, 
  getIncorrectAnswersByPart, 
  clearAllIncorrectAnswers, 
  clearIncorrectAnswersByPart,
  removeIncorrectAnswer,
  saveIncorrectAnswer,
  IncorrectAnswer 
} from "../../utils/incorrectAnswers";

export default function IncorrectAnswersPage() {
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
  const [selectedPart, setSelectedPart] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Load incorrect answers on component mount
  useEffect(() => {
    loadIncorrectAnswers();
  }, [selectedPart]);

  function loadIncorrectAnswers() {
    if (selectedPart === 'all') {
      setIncorrectAnswers(getIncorrectAnswers());
    } else {
      setIncorrectAnswers(getIncorrectAnswersByPart(selectedPart));
    }
    setCurrentQuestionIndex(0);
    setPracticeMode(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
  }

  function handleClearAll() {
    if (confirm('Are you sure you want to clear all incorrect answers?')) {
      clearAllIncorrectAnswers();
      loadIncorrectAnswers();
    }
  }

  function handleClearByPart(part: 'part1' | 'part2' | 'part3' | 'part4') {
    if (confirm(`Are you sure you want to clear all incorrect answers for ${part.toUpperCase()}?`)) {
      clearIncorrectAnswersByPart(part);
      loadIncorrectAnswers();
    }
  }

  function startPractice() {
    if (incorrectAnswers.length > 0) {
      setPracticeMode(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }

  function handlePracticeAnswer(answer: any) {
    if (showAnswer) return;
    
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    const currentQuestion = incorrectAnswers[currentQuestionIndex];
    
    // Check if answer is correct based on part type
    let isCorrect = false;
    
    if (currentQuestion.part === 'part1' || currentQuestion.part === 'part4') {
      isCorrect = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.part === 'part2') {
      // For part 2, check if all speakers are correct
      isCorrect = Object.keys(currentQuestion.correctAnswer).every(
        speakerNum => answer[speakerNum] === currentQuestion.correctAnswer[speakerNum]
      );
    } else if (currentQuestion.part === 'part3') {
      // For part 3, check if all statements are correct
      isCorrect = currentQuestion.correctAnswer.every(
        (correctAns: any) => answer[correctAns.number - 1] === correctAns.answer
      );
    }
    
    if (isCorrect) {
      // Remove from incorrect answers if user got it right
      removeIncorrectAnswer(currentQuestion.id, currentQuestion.part);
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
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentQuestionIndex(incorrectAnswers.length - 1);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
  }

  const partCounts = {
    part1: getIncorrectAnswersByPart('part1').length,
    part2: getIncorrectAnswersByPart('part2').length,
    part3: getIncorrectAnswersByPart('part3').length,
    part4: getIncorrectAnswersByPart('part4').length,
  };

  const currentQuestion = practiceMode && incorrectAnswers.length > 0 ? incorrectAnswers[currentQuestionIndex] : null;

  return (
    <div className="gradient-bg" style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        
        {!practiceMode ? (
          // Main overview page
          <>
            <div className="card" style={{ marginBottom: "30px", textAlign: "center" }}>
              <h1 style={{ 
                color: "#1f2937", 
                fontSize: "32px", 
                fontWeight: "800",
                margin: "0 0 16px 0"
              }}>
                ❌ Incorrect Answers Review
              </h1>
              <p style={{ 
                color: "#6b7280", 
                fontSize: "18px", 
                margin: 0 
              }}>
                Review and practice your incorrect answers to improve your performance
              </p>
            </div>

            {/* Statistics Cards - Now clickable for filtering */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "20px",
              marginBottom: "30px"
            }}>
              <div 
                className="card" 
                onClick={() => setSelectedPart('all')}
                style={{ 
                  textAlign: "center", 
                  backgroundColor: selectedPart === 'all' ? "#dbeafe" : "#fef3c7",
                  border: selectedPart === 'all' ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <h3 style={{ color: selectedPart === 'all' ? "#1e40af" : "#92400e", margin: "0 0 8px 0" }}>📊 Total</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: selectedPart === 'all' ? "#1e40af" : "#78350f", margin: 0 }}>
                  {getIncorrectAnswers().length}
                </p>
                {selectedPart === 'all' && (
                  <div style={{ marginTop: "8px", color: "#1e40af", fontSize: "12px", fontWeight: "500" }}>
                    ✓ Active Filter
                  </div>
                )}
              </div>
              
              {Object.entries(partCounts).map(([part, count]) => (
                <div 
                  key={part} 
                  className="card" 
                  onClick={() => setSelectedPart(part as any)}
                  style={{ 
                    textAlign: "center",
                    backgroundColor: selectedPart === part ? "#dbeafe" : "#ffffff",
                    border: selectedPart === part ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    opacity: count === 0 ? 0.5 : 1
                  }}
                >
                  <h3 style={{ color: selectedPart === part ? "#1e40af" : "#374151", margin: "0 0 8px 0" }}>
                    {part === 'part1' ? '🎧' : part === 'part2' ? '🎙️' : part === 'part3' ? '📝' : '🎵'} {part.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", color: selectedPart === part ? "#1e40af" : "#1f2937", margin: 0 }}>
                    {count}
                  </p>
                  {selectedPart === part && (
                    <div style={{ marginTop: "8px", color: "#1e40af", fontSize: "12px", fontWeight: "500" }}>
                      ✓ Active Filter
                    </div>
                  )}
                  {count === 0 && (
                    <div style={{ marginTop: "4px", color: "#9ca3af", fontSize: "12px" }}>
                      No errors
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions Section */}
            <div className="card" style={{ marginBottom: "30px" }}>
              <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                alignItems: "center", 
                justifyContent: "space-between",
                gap: "16px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <h3 style={{ 
                    color: "#374151", 
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600"
                  }}>
                    {selectedPart === 'all' 
                      ? `Showing All Incorrect Answers (${incorrectAnswers.length})` 
                      : `Showing ${selectedPart.toUpperCase()} Errors (${incorrectAnswers.length})`
                    }
                  </h3>
                  
                  {selectedPart !== 'all' && (
                    <button 
                      onClick={() => setSelectedPart('all')}
                      className="btn btn-secondary"
                      style={{ fontSize: "14px", padding: "6px 12px" }}
                    >
                      🔄 Show All Parts
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {incorrectAnswers.length > 0 && (
                    <button 
                      onClick={startPractice}
                      className="btn btn-primary"
                    >
                      🎯 Start Practice
                    </button>
                  )}
                  
                  {selectedPart !== 'all' && incorrectAnswers.length > 0 && (
                    <button 
                      onClick={() => handleClearByPart(selectedPart)}
                      className="btn btn-secondary"
                    >
                      🗑️ Clear {selectedPart.toUpperCase()}
                    </button>
                  )}
                  
                  {getIncorrectAnswers().length > 0 && (
                    <button 
                      onClick={handleClearAll}
                      className="btn btn-danger"
                    >
                      🗑️ Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Incorrect Answers List */}
            {incorrectAnswers.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
                <h3 style={{ color: "#059669", fontSize: "24px", margin: "0 0 16px 0" }}>
                  🎉 Great job!
                </h3>
                <p style={{ color: "#6b7280", fontSize: "18px", margin: "0 0 20px 0" }}>
                  {selectedPart === 'all' 
                    ? "You have no incorrect answers to review!"
                    : `You have no incorrect answers in ${selectedPart.toUpperCase()}!`
                  }
                </p>
                <Link href="/" className="btn btn-primary">
                  🏠 Back to Home
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "20px" }}>
                {incorrectAnswers.map((item, index) => (
                  <div key={`${item.part}-${item.id}-${index}`} className="card">
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "flex-start",
                      marginBottom: "16px"
                    }}>
                      <div>
                        <h4 style={{ 
                          color: "#1f2937", 
                          margin: "0 0 8px 0",
                          fontSize: "18px",
                          fontWeight: "600"
                        }}>
                          {item.part === 'part1' ? '🎧' : item.part === 'part2' ? '🎙️' : item.part === 'part3' ? '📝' : '🎵'} {item.part.toUpperCase()} - {item.id}
                        </h4>
                        <p style={{ 
                          color: "#6b7280", 
                          margin: "0 0 12px 0",
                          fontSize: "14px"
                        }}>
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      
                      <Link 
                        href={`/${item.part}?questionId=${item.id}`}
                        className="btn btn-secondary btn-small"
                      >
                        📖 Go to {item.part.toUpperCase()}
                      </Link>
                    </div>
                    
                    <div style={{ 
                      padding: "16px", 
                      backgroundColor: "#fef2f2", 
                      borderRadius: "8px",
                      border: "1px solid #fecaca"
                    }}>
                      <p style={{ 
                        color: "#374151", 
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        <strong>Question:</strong> {item.questionData.question || "Audio-based question"}
                      </p>
                      <p style={{ 
                        color: "#dc2626", 
                        margin: "0 0 4px 0",
                        fontSize: "14px"
                      }}>
                        <strong>Your Answer:</strong> {JSON.stringify(item.userAnswer)}
                      </p>
                      <p style={{ 
                        color: "#059669", 
                        margin: 0,
                        fontSize: "14px"
                      }}>
                        <strong>Correct Answer:</strong> {JSON.stringify(item.correctAnswer)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Practice mode
          currentQuestion && (
            <>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <button 
                  onClick={() => setPracticeMode(false)}
                  className="btn btn-secondary"
                >
                  ⬅️ Back to List
                </button>
                
                <h2 style={{ 
                  color: "#1f2937", 
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "700"
                }}>
                  🎯 Practice Mode ({currentQuestionIndex + 1}/{incorrectAnswers.length})
                </h2>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <button 
                    onClick={previousQuestion}
                    className="btn btn-secondary"
                  >
                    ⬅️
                  </button>
                  <button 
                    onClick={nextQuestion}
                    className="btn btn-secondary"
                  >
                    ➡️
                  </button>
                </div>
              </div>

              {/* Practice Question Display */}
              <div className="card" style={{ marginBottom: "20px" }}>
                <h3 style={{ 
                  color: "#1f2937", 
                  margin: "0 0 16px 0"
                }}>
                  {currentQuestion.part === 'part1' ? '🎧' : currentQuestion.part === 'part2' ? '🎙️' : currentQuestion.part === 'part3' ? '📝' : '🎵'} {currentQuestion.part.toUpperCase()} - {currentQuestion.id}
                </h3>
                
                {currentQuestion.questionData.question && (
                  <p style={{ 
                    color: "#374151", 
                    marginBottom: "16px",
                    fontSize: "16px"
                  }}>
                    <strong>Question:</strong> {currentQuestion.questionData.question}
                  </p>
                )}

                {/* Audio Player */}
                {currentQuestion.questionData.audio_link && (
                  <div style={{ marginBottom: "20px" }}>
                    <audio
                      controls
                      src={currentQuestion.questionData.audio_link}
                      style={{ 
                        width: "100%", 
                        height: "45px",
                        borderRadius: "8px"
                      }}
                    />
                  </div>
                )}

                {/* Multiple Audio Players for Part 2 */}
                {currentQuestion.part === 'part2' && currentQuestion.questionData.audio_links && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#374151" }}>🎵 Audio Players</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      {currentQuestion.questionData.speakers?.map((speaker: string, index: number) => (
                        <div key={index} style={{ textAlign: "center" }}>
                          <h5 style={{ margin: "0 0 8px 0", color: "#4f46e5", fontSize: "14px" }}>
                            {speaker}
                          </h5>
                          <audio
                            controls
                            src={currentQuestion.questionData.audio_links[index]}
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
                )}

                {/* Show previous answers */}
                <div style={{ 
                  padding: "16px", 
                  backgroundColor: "#fef2f2", 
                  borderRadius: "8px",
                  border: "1px solid #fecaca",
                  marginBottom: "20px"
                }}>
                  <p style={{ 
                    color: "#dc2626", 
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    <strong>❌ Your Previous Answer:</strong> {JSON.stringify(currentQuestion.userAnswer)}
                  </p>
                  <p style={{ 
                    color: "#059669", 
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    <strong>✅ Correct Answer:</strong> {JSON.stringify(currentQuestion.correctAnswer)}
                  </p>
                </div>

                {/* Try again message */}
                <div className="card" style={{ 
                  backgroundColor: "#f0f9ff", 
                  border: "2px solid #3b82f6",
                  textAlign: "center",
                  padding: "20px"
                }}>
                  <h4 style={{ 
                    color: "#1e40af", 
                    margin: "0 0 12px 0"
                  }}>
                    🎯 Try Again!
                  </h4>
                  <p style={{ 
                    color: "#1e40af", 
                    margin: "0 0 16px 0"
                  }}>
                    Practice this question again. If you get it right, it will be removed from your incorrect answers list.
                  </p>
                  
                  <Link 
                    href={`/${currentQuestion.part}?questionId=${currentQuestion.id}`}
                    className="btn btn-primary"
                  >
                    📖 Practice in {currentQuestion.part.toUpperCase()}
                  </Link>
                </div>
              </div>

              {showAnswer && (
                <div className="card" style={{ 
                  backgroundColor: selectedAnswer === currentQuestion.correctAnswer || 
                    (typeof selectedAnswer === 'object' && JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer))
                    ? "#f0fdf4" : "#fef2f2",
                  border: `2px solid ${
                    selectedAnswer === currentQuestion.correctAnswer || 
                    (typeof selectedAnswer === 'object' && JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer))
                    ? "#10b981" : "#ef4444"
                  }`
                }}>
                  <h4 style={{ 
                    color: selectedAnswer === currentQuestion.correctAnswer || 
                      (typeof selectedAnswer === 'object' && JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer))
                      ? "#059669" : "#dc2626",
                    margin: "0 0 12px 0"
                  }}>
                    {selectedAnswer === currentQuestion.correctAnswer || 
                      (typeof selectedAnswer === 'object' && JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer))
                      ? "🎉 Correct! This question has been removed from your incorrect answers." 
                      : "❌ Still incorrect. Keep practicing!"
                    }
                  </h4>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}