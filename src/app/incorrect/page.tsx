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
import { PART_1_DATA, PART_2_DATA, PART_3_DATA, PART_4_DATA } from "../../utils/data";

export default function IncorrectAnswersPage() {
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
  const [selectedPart, setSelectedPart] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, any>>({});
  const [practiceShowAnswer, setPracticeShowAnswer] = useState(false);

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
      setPracticeAnswers({});
      setPracticeShowAnswer(false);
    }
  }

  function handlePracticeSubmit() {
    if (practiceShowAnswer) return;
    
    const currentQuestion = incorrectAnswers[currentQuestionIndex];
    let isCorrect = false;
    
    // Check if answer is correct based on part type
    if (currentQuestion.part === 'part1') {
      isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.part === 'part2') {
      // For part 2, check if all speakers are correct
      isCorrect = Object.keys(currentQuestion.correctAnswer).every(
        speakerNum => practiceAnswers[speakerNum] === currentQuestion.correctAnswer[speakerNum]
      );
    } else if (currentQuestion.part === 'part3') {
      // For part 3, check if all statements are correct
      isCorrect = currentQuestion.correctAnswer.every(
        (correctAns: any) => practiceAnswers[correctAns.number - 1] === correctAns.answer
      );
    } else if (currentQuestion.part === 'part4') {
      isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
    }
    
    setPracticeShowAnswer(true);
    
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
    setPracticeAnswers({});
    setPracticeShowAnswer(false);
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentQuestionIndex(incorrectAnswers.length - 1);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setPracticeAnswers({});
    setPracticeShowAnswer(false);
  }

  const partCounts = {
    part1: getIncorrectAnswersByPart('part1').length,
    part2: getIncorrectAnswersByPart('part2').length,
    part3: getIncorrectAnswersByPart('part3').length,
    part4: getIncorrectAnswersByPart('part4').length,
  };

  const currentQuestion = practiceMode && incorrectAnswers.length > 0 ? incorrectAnswers[currentQuestionIndex] : null;

  // Helper function to get full question data from data files
  const getFullQuestionData = (question: IncorrectAnswer) => {
    if (question.part === 'part1') {
      return PART_1_DATA.find(q => q.id.toString() === question.id);
    } else if (question.part === 'part2') {
      return PART_2_DATA.find(q => q.exam_code === question.id);
    } else if (question.part === 'part3') {
      return PART_3_DATA.find(q => q.exam_code === question.id);
    } else if (question.part === 'part4') {
      // Find the audio that contains this question
      for (const audio of PART_4_DATA) {
        const foundQuestion = audio.questions.find(q => q.id.toString() === question.id);
        if (foundQuestion) {
          return { ...foundQuestion, audio_link: audio.audio_link };
        }
      }
    }
    return null;
  };

  // Helper function to handle practice answer submission
  const handlePracticeAnswerSubmit = () => {
    if (practiceShowAnswer) return;
    
    const currentQuestion = incorrectAnswers[currentQuestionIndex];
    let isCorrect = false;
    
    // Check if answer is correct based on part type
    if (currentQuestion.part === 'part1' || currentQuestion.part === 'part4') {
      isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.part === 'part2') {
      // For part 2, check if all speakers are correct
      isCorrect = Object.keys(currentQuestion.correctAnswer).every(
        speakerNum => practiceAnswers[speakerNum] === currentQuestion.correctAnswer[speakerNum]
      );
    } else if (currentQuestion.part === 'part3') {
      // For part 3, check if all statements are correct
      isCorrect = currentQuestion.correctAnswer.every(
        (correctAns: any) => practiceAnswers[correctAns.number - 1] === correctAns.answer
      );
    }
    
    setPracticeShowAnswer(true);
    
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
  };

  const fullQuestionData = currentQuestion ? getFullQuestionData(currentQuestion) : null;

  return (
    <div className="gradient-bg" style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        
        {!practiceMode ? (
          // Main overview page
          <>
            <div className="card" style={{ marginBottom: "30px", textAlign: "center" }}>
              <h1 style={{ 
                color: "var(--foreground)", 
                fontSize: "32px", 
                fontWeight: "800",
                margin: "0 0 16px 0"
              }}>
                ❌ Incorrect Answers Review
              </h1>
              <p style={{ 
                color: "var(--card-text)", 
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
                className={`filter-card ${selectedPart === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedPart('all')}
                style={{ 
                  textAlign: "center",
                  cursor: "pointer"
                }}
              >
                <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>📊 Total</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "inherit", margin: 0 }}>
                  {getIncorrectAnswers().length}
                </p>
                {selectedPart === 'all' && (
                  <div style={{ marginTop: "8px", color: "inherit", fontSize: "12px", fontWeight: "500" }}>
                    ✓ Active Filter
                  </div>
                )}
              </div>
              
              {Object.entries(partCounts).map(([part, count]) => (
                <div 
                  key={part} 
                  className={`filter-card ${selectedPart === part ? 'active' : ''}`}
                  onClick={() => setSelectedPart(part as any)}
                  style={{ 
                    textAlign: "center",
                    cursor: "pointer",
                    opacity: count === 0 ? 0.5 : 1
                  }}
                >
                  <h3 style={{ color: "inherit", margin: "0 0 8px 0" }}>
                    {part === 'part1' ? '🎧' : part === 'part2' ? '🎙️' : part === 'part3' ? '📝' : '🎵'} {part.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", color: "inherit", margin: 0 }}>
                    {count}
                  </p>
                  {selectedPart === part && (
                    <div style={{ marginTop: "8px", color: "inherit", fontSize: "12px", fontWeight: "500" }}>
                      ✓ Active Filter
                    </div>
                  )}
                  {count === 0 && (
                    <div style={{ marginTop: "4px", color: "var(--card-text)", fontSize: "12px" }}>
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
                    color: "var(--card-text)", 
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
                <p style={{ color: "var(--card-text)", fontSize: "18px", margin: "0 0 20px 0" }}>
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
                          color: "var(--foreground)", 
                          margin: "0 0 8px 0",
                          fontSize: "18px",
                          fontWeight: "600"
                        }}>
                          {item.part === 'part1' ? '🎧' : item.part === 'part2' ? '🎙️' : item.part === 'part3' ? '📝' : '🎵'} {item.part.toUpperCase()} - {item.id}
                        </h4>
                        <p style={{ 
                          color: "var(--card-text)", 
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
                    
                    <div className="question-detail-card" style={{ 
                      padding: "16px", 
                      borderRadius: "8px"
                    }}>
                      <p style={{ 
                        color: "var(--card-text)", 
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
          currentQuestion && fullQuestionData && (
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
                  color: "var(--foreground)", 
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

              {/* Interactive Practice Question */}
              <div className="card practice-mode" style={{ marginBottom: "20px" }}>
                <h3 style={{ 
                  color: "var(--foreground)", 
                  margin: "0 0 16px 0"
                }}>
                  {currentQuestion.part === 'part1' ? '🎧' : currentQuestion.part === 'part2' ? '🎙️' : currentQuestion.part === 'part3' ? '📝' : '🎵'} {currentQuestion.part.toUpperCase()} - {currentQuestion.id}
                </h3>
                
                {/* Audio Player - Part 1, 3, 4 */}
                {(currentQuestion.part === 'part1' || currentQuestion.part === 'part3' || currentQuestion.part === 'part4') && fullQuestionData && 'audio_link' in fullQuestionData && fullQuestionData.audio_link && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>🎵 Audio</h4>
                    <audio
                      controls
                      src={fullQuestionData.audio_link}
                      style={{ 
                        width: "100%", 
                        height: "45px",
                        borderRadius: "8px"
                      }}
                    />
                  </div>
                )}

                {/* Multiple Audio Players for Part 2 */}
                {currentQuestion.part === 'part2' && fullQuestionData && 'audio_links' in fullQuestionData && fullQuestionData.audio_links && (
                  <div className="audio-section" style={{ marginBottom: "20px" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>🎵 Audio Players</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      {'speakers' in fullQuestionData && fullQuestionData.speakers?.map((speaker: string, index: number) => (
                        <div key={index} style={{ textAlign: "center" }}>
                          <h5 style={{ margin: "0 0 8px 0", color: "var(--card-text)", fontSize: "14px" }}>
                            {speaker}
                          </h5>
                          <audio
                            controls
                            src={fullQuestionData.audio_links[index]}
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

                {/* Interactive Practice Question */}
                {currentQuestion.part === 'part1' && fullQuestionData && 'options' in fullQuestionData && typeof fullQuestionData.options === 'object' && !Array.isArray(fullQuestionData.options) && (
                  <div className="practice-question" style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--foreground)", marginBottom: "16px" }}>
                      {'question' in fullQuestionData && fullQuestionData.question}
                    </h4>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {Object.entries(fullQuestionData.options).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setPracticeAnswers({ selectedOption: key })}
                          disabled={practiceShowAnswer}
                          className={`option-button ${
                            practiceAnswers.selectedOption === key ? 'selected' : ''
                          } ${
                            practiceShowAnswer && key === currentQuestion.correctAnswer ? 'correct' : ''
                          } ${
                            practiceShowAnswer && practiceAnswers.selectedOption === key && key !== currentQuestion.correctAnswer ? 'incorrect' : ''
                          }`}
                          style={{
                            padding: "12px 16px",
                            border: "2px solid var(--border-color)",
                            borderRadius: "8px",
                            backgroundColor: "var(--card-background)",
                            color: "var(--card-text)",
                            cursor: practiceShowAnswer ? "default" : "pointer",
                            textAlign: "left",
                            width: "100%",
                            fontSize: "16px",
                            fontWeight: practiceAnswers.selectedOption === key ? "600" : "400"
                          }}
                        >
                          <strong>{key}.</strong> {value}
                        </button>
                      ))}
                    </div>
                    {!practiceShowAnswer && practiceAnswers.selectedOption && (
                      <button
                        onClick={handlePracticeAnswerSubmit}
                        className="btn btn-primary"
                        style={{ marginTop: "16px", width: "100%" }}
                      >
                        Submit Answer
                      </button>
                    )}
                  </div>
                )}

                {/* Part 2 - Speaker Matching */}
                {currentQuestion.part === 'part2' && fullQuestionData && 'options' in fullQuestionData && typeof fullQuestionData.options === 'object' && !Array.isArray(fullQuestionData.options) && (
                  <div className="practice-question" style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--foreground)", marginBottom: "16px" }}>
                      {'question' in fullQuestionData && fullQuestionData.question}
                    </h4>
                    <div style={{ display: "grid", gap: "20px" }}>
                      {Object.keys(currentQuestion.correctAnswer).map((speakerNum) => (
                        <div key={speakerNum} className="speaker-card" style={{ 
                          padding: "16px",
                          border: "2px solid var(--border-color)",
                          borderRadius: "8px",
                          backgroundColor: "var(--card-background)"
                        }}>
                          <h5 style={{ color: "var(--foreground)", margin: "0 0 12px 0" }}>
                            Speaker {speakerNum}
                          </h5>
                          <div style={{ display: "grid", gap: "8px" }}>
                            {Object.entries(fullQuestionData.options).map(([key, value]) => (
                              <button
                                key={key}
                                onClick={() => setPracticeAnswers(prev => ({ ...prev, [speakerNum]: key }))}
                                disabled={practiceShowAnswer}
                                className={`option-button ${
                                  practiceAnswers[speakerNum] === key ? 'selected' : ''
                                } ${
                                  practiceShowAnswer && key === currentQuestion.correctAnswer[speakerNum] ? 'correct' : ''
                                } ${
                                  practiceShowAnswer && practiceAnswers[speakerNum] === key && key !== currentQuestion.correctAnswer[speakerNum] ? 'incorrect' : ''
                                }`}
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid var(--border-color)",
                                  borderRadius: "6px",
                                  backgroundColor: practiceAnswers[speakerNum] === key ? "#3b82f6" : "var(--card-background)",
                                  color: practiceAnswers[speakerNum] === key ? "white" : "var(--card-text)",
                                  cursor: practiceShowAnswer ? "default" : "pointer",
                                  textAlign: "left",
                                  width: "100%",
                                  fontSize: "14px"
                                }}
                              >
                                <strong>{key}.</strong> {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!practiceShowAnswer && Object.keys(currentQuestion.correctAnswer).every(speaker => practiceAnswers[speaker]) && (
                      <button
                        onClick={handlePracticeAnswerSubmit}
                        className="btn btn-primary"
                        style={{ marginTop: "16px", width: "100%" }}
                      >
                        Submit Answer
                      </button>
                    )}
                  </div>
                )}

                {/* Part 3 - True/False/Both */}
                {currentQuestion.part === 'part3' && fullQuestionData && 'statements' in fullQuestionData && 'options' in fullQuestionData && Array.isArray(fullQuestionData.options) && (
                  <div className="practice-question" style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--foreground)", marginBottom: "16px" }}>
                      {'question' in fullQuestionData && fullQuestionData.question}
                    </h4>
                    <div style={{ display: "grid", gap: "16px" }}>
                      {fullQuestionData.statements?.map((statement: string, index: number) => (
                        <div key={index} className="statement-card" style={{ 
                          padding: "16px",
                          border: "2px solid var(--border-color)",
                          borderRadius: "8px",
                          backgroundColor: "var(--card-background)"
                        }}>
                          <p style={{ color: "var(--card-text)", margin: "0 0 12px 0", fontSize: "16px" }}>
                            <strong>{index + 1}.</strong> {statement}
                          </p>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {fullQuestionData.options.map((option: string) => (
                              <button
                                key={option}
                                onClick={() => setPracticeAnswers(prev => ({ ...prev, [index]: option }))}
                                disabled={practiceShowAnswer}
                                className={`option-button ${
                                  practiceAnswers[index] === option ? 'selected' : ''
                                } ${
                                  practiceShowAnswer && option === currentQuestion.correctAnswer[index]?.answer ? 'correct' : ''
                                } ${
                                  practiceShowAnswer && practiceAnswers[index] === option && option !== currentQuestion.correctAnswer[index]?.answer ? 'incorrect' : ''
                                }`}
                                style={{
                                  padding: "8px 16px",
                                  border: "1px solid var(--border-color)",
                                  borderRadius: "6px",
                                  backgroundColor: practiceAnswers[index] === option ? "#3b82f6" : "var(--card-background)",
                                  color: practiceAnswers[index] === option ? "white" : "var(--card-text)",
                                  cursor: practiceShowAnswer ? "default" : "pointer",
                                  fontSize: "14px",
                                  fontWeight: "500"
                                }}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!practiceShowAnswer && fullQuestionData.statements?.every((_: any, index: number) => practiceAnswers[index]) && (
                      <button
                        onClick={handlePracticeAnswerSubmit}
                        className="btn btn-primary"
                        style={{ marginTop: "16px", width: "100%" }}
                      >
                        Submit Answer
                      </button>
                    )}
                  </div>
                )}

                {/* Part 4 - Multiple Choice */}
                {currentQuestion.part === 'part4' && fullQuestionData && 'options' in fullQuestionData && Array.isArray(fullQuestionData.options) && (
                  <div className="practice-question" style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--foreground)", marginBottom: "16px" }}>
                      {'question' in fullQuestionData && fullQuestionData.question}
                    </h4>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {fullQuestionData.options.map((option: any) => (
                        <button
                          key={option.key}
                          onClick={() => setPracticeAnswers({ selectedOption: option.key })}
                          disabled={practiceShowAnswer}
                          className={`option-button ${
                            practiceAnswers.selectedOption === option.key ? 'selected' : ''
                          } ${
                            practiceShowAnswer && option.key === currentQuestion.correctAnswer ? 'correct' : ''
                          } ${
                            practiceShowAnswer && practiceAnswers.selectedOption === option.key && option.key !== currentQuestion.correctAnswer ? 'incorrect' : ''
                          }`}
                          style={{
                            padding: "12px 16px",
                            border: "2px solid var(--border-color)",
                            borderRadius: "8px",
                            backgroundColor: "var(--card-background)",
                            color: "var(--card-text)",
                            cursor: practiceShowAnswer ? "default" : "pointer",
                            textAlign: "left",
                            width: "100%",
                            fontSize: "16px",
                            fontWeight: practiceAnswers.selectedOption === option.key ? "600" : "400"
                          }}
                        >
                          <strong>{option.key}.</strong> {option.text}
                        </button>
                      ))}
                    </div>
                    {!practiceShowAnswer && practiceAnswers.selectedOption && (
                      <button
                        onClick={handlePracticeAnswerSubmit}
                        className="btn btn-primary"
                        style={{ marginTop: "16px", width: "100%" }}
                      >
                        Submit Answer
                      </button>
                    )}
                  </div>
                )}
              </div>

              {practiceShowAnswer && (
                <div className="card" style={{ 
                  backgroundColor: "var(--card-background)",
                  border: `2px solid ${
                    (() => {
                      let isCorrect = false;
                      if (currentQuestion.part === 'part1' || currentQuestion.part === 'part4') {
                        isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
                      } else if (currentQuestion.part === 'part2') {
                        isCorrect = Object.keys(currentQuestion.correctAnswer).every(
                          speakerNum => practiceAnswers[speakerNum] === currentQuestion.correctAnswer[speakerNum]
                        );
                      } else if (currentQuestion.part === 'part3') {
                        isCorrect = currentQuestion.correctAnswer.every(
                          (correctAns: any) => practiceAnswers[correctAns.number - 1] === correctAns.answer
                        );
                      }
                      return isCorrect ? "#10b981" : "#ef4444";
                    })()
                  }`
                }}>
                  <h4 style={{ 
                    color: (() => {
                      let isCorrect = false;
                      if (currentQuestion.part === 'part1' || currentQuestion.part === 'part4') {
                        isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
                      } else if (currentQuestion.part === 'part2') {
                        isCorrect = Object.keys(currentQuestion.correctAnswer).every(
                          speakerNum => practiceAnswers[speakerNum] === currentQuestion.correctAnswer[speakerNum]
                        );
                      } else if (currentQuestion.part === 'part3') {
                        isCorrect = currentQuestion.correctAnswer.every(
                          (correctAns: any) => practiceAnswers[correctAns.number - 1] === correctAns.answer
                        );
                      }
                      return isCorrect ? "#059669" : "#dc2626";
                    })(),
                    margin: "0 0 12px 0"
                  }}>
                    {(() => {
                      let isCorrect = false;
                      if (currentQuestion.part === 'part1' || currentQuestion.part === 'part4') {
                        isCorrect = practiceAnswers.selectedOption === currentQuestion.correctAnswer;
                      } else if (currentQuestion.part === 'part2') {
                        isCorrect = Object.keys(currentQuestion.correctAnswer).every(
                          speakerNum => practiceAnswers[speakerNum] === currentQuestion.correctAnswer[speakerNum]
                        );
                      } else if (currentQuestion.part === 'part3') {
                        isCorrect = currentQuestion.correctAnswer.every(
                          (correctAns: any) => practiceAnswers[correctAns.number - 1] === correctAns.answer
                        );
                      }
                      return isCorrect
                        ? "🎉 Correct! This question has been removed from your incorrect answers." 
                        : "❌ Still incorrect. Keep practicing!";
                    })()}
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