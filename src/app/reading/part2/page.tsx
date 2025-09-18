"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sortable from 'sortablejs';
import { READING_PART_2 } from '../../../utils/part2';
import NavigationHeader from '../../../components/NavigationHeader';

interface Exercise {
  key: number;
  question: string[];
}

interface UserProgress {
  [exerciseKey: number]: {
    userOrder: string[];
    isCorrect: boolean;
    attempts: number;
  };
}

function ReadingPart2Content() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [isAnswerMode, setIsAnswerMode] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const sortableRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  // Navigate to specific exercise if questionId is provided
  useEffect(() => {
    if (questionId) {
      const exerciseIndex = READING_PART_2.findIndex(ex => ex.key.toString() === questionId);
      if (exerciseIndex !== -1) {
        setCurrentExerciseIndex(exerciseIndex);
      }
    }
  }, [questionId]);
  
  const currentExercise = READING_PART_2[currentExerciseIndex];
  
  useEffect(() => {
    if (currentExercise) {
      const shuffled = [...currentExercise.question].sort(() => Math.random() - 0.5);
      setUserOrder(shuffled);
      setIsAnswerMode(false);
    }
  }, [currentExercise]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('reading-part2-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reading-part2-progress', JSON.stringify(progress));
  }, [progress]);

  // Initialize SortableJS
  useEffect(() => {
    if (sortableRef.current && !isAnswerMode) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (evt) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
            const newOrder = [...userOrder];
            const [moved] = newOrder.splice(evt.oldIndex, 1);
            newOrder.splice(evt.newIndex, 0, moved);
            setUserOrder(newOrder);
          }
        }
      });
    }
    
    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy();
        sortableInstance.current = null;
      }
    };
  }, [userOrder.length, isAnswerMode]);
  
  // Jump to specific question
  const jumpToQuestion = (index: number) => {
    setCurrentExerciseIndex(index);
    setIsDrawerOpen(false);
  };
  
  // Move item up or down
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isAnswerMode) return;
    
    const newOrder = [...userOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      setUserOrder(newOrder);
    }
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentExercise.question);
    const exerciseKey = currentExercise.key;
    
    setProgress(prev => ({
      ...prev,
      [exerciseKey]: {
        userOrder: [...userOrder],
        isCorrect,
        attempts: (prev[exerciseKey]?.attempts || 0) + 1
      }
    }));
    
    setIsAnswerMode(true);
  };

  const resetExercise = () => {
    const shuffled = [...currentExercise.question].sort(() => Math.random() - 0.5);
    setUserOrder(shuffled);
    setIsAnswerMode(false);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < READING_PART_2.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const getItemCorrectness = (item: string, index: number) => {
    if (!isAnswerMode) return null;
    const correctItem = currentExercise.question[index];
    return item === correctItem;
  };

  if (!currentExercise) return <div>Loading...</div>;

  const currentProgress = progress[currentExercise.key];

  return (
    <>
      <NavigationHeader />
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
            🔄 Exercises - Reading Part 2
          </h3>
          <div
            className="question-grid"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {READING_PART_2.map((exercise, index) => {
              let className = "question-number";
              const exerciseProgress = progress[exercise.key];
              
              if (exerciseProgress?.isCorrect) {
                className += " correct";
              } else if (exerciseProgress?.attempts) {
                className += " incorrect";
              } else if (currentExerciseIndex === index) {
                className += " current";
              }

              return (
                <div
                  key={exercise.key}
                  onClick={() => jumpToQuestion(index)}
                  className={className}
                  style={{
                    width: 80,
                    height: 40,
                    fontSize: "12px",
                  }}
                >
                  Ex {index + 1}
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
              🔄 Exercises - Reading Part 2
            </h3>
            <div
              className="question-grid"
              style={{
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              {READING_PART_2.map((exercise, index) => {
                let className = "question-number";
                const exerciseProgress = progress[exercise.key];
                
                if (exerciseProgress?.isCorrect) {
                  className += " correct";
                } else if (exerciseProgress?.attempts) {
                  className += " incorrect";
                } else if (currentExerciseIndex === index) {
                  className += " current";
                }

                return (
                  <div
                    key={exercise.key}
                    onClick={() => jumpToQuestion(index)}
                    className={className}
                    style={{
                      width: 80,
                      height: 40,
                      fontSize: "12px",
                    }}
                  >
                    Ex {index + 1}
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
            📋 Danh sách bài tập
          </button>

          <h2 style={{ 
            color: "var(--foreground)", 
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "700"
          }}>
            🔄 Reading Part 2 - Exercise {currentExerciseIndex + 1}
            {questionId && currentExercise.key.toString() === questionId && " 🎯"}
          </h2>

          {questionId && currentExercise.key.toString() === questionId && (
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
                🎯 <strong>This exercise needs practice.</strong> Try to get it right!
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
              <strong>📋 Instructions:</strong> Put the sentences below in the right order. Drag and drop to rearrange.
            </p>
          </div>

          <div ref={sortableRef} style={{ marginBottom: '32px' }}>
            {userOrder.map((sentence, index) => {
              const isCorrect = getItemCorrectness(sentence, index);
              
              return (
                <div
                  key={`${sentence}-${index}`}
                  data-id={sentence}
                  className="card sentence-card"
                  style={{
                    position: 'relative',
                    marginBottom: '20px',
                    padding: '24px 30px',
                    minHeight: '80px',
                    cursor: !isAnswerMode ? 'move' : 'default',
                    border: isAnswerMode && isCorrect === true 
                      ? '3px solid #10b981' 
                      : isAnswerMode && isCorrect === false 
                      ? '3px solid #ef4444' 
                      : '2px solid var(--border-color)',
                    backgroundColor: isAnswerMode 
                      ? (isCorrect === true ? 'rgba(16, 185, 129, 0.1)' : 
                         isCorrect === false ? 'rgba(239, 68, 68, 0.1)' : 'var(--card-background)')
                      : 'var(--card-background)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontWeight: '500'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '-16px',
                    top: '-16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '800',
                    background: isAnswerMode && isCorrect === true 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : isAnswerMode && isCorrect === false 
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                      : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    border: '3px solid var(--card-background)'
                  }}>
                    {index + 1}
                  </div>

                  {!isAnswerMode && (
                    <>
                      {/* Up/Down Arrow Controls */}
                      <div style={{
                        position: 'absolute',
                        right: '70px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <button
                          onClick={() => moveItem(index, 'up')}
                          disabled={index === 0}
                          className="arrow-control"
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: index === 0 ? 'not-allowed' : 'pointer',
                            opacity: index === 0 ? 0.4 : 1,
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveItem(index, 'down')}
                          disabled={index === userOrder.length - 1}
                          className="arrow-control"
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: index === userOrder.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: index === userOrder.length - 1 ? 0.4 : 1,
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          ↓
                        </button>
                      </div>
                      
                      {/* Drag handle */}
                      <div style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(156, 163, 175, 0.6)',
                        fontSize: '20px',
                        cursor: 'grab'
                      }}>
                        ⋮⋮
                      </div>
                    </>
                  )}

                  <div style={{
                    paddingRight: '140px', // Increased to accommodate arrow controls
                    color: 'var(--card-text)',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    {sentence}
                  </div>

                  {isAnswerMode && (
                    <div style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '18px'
                    }}>
                      {isCorrect === true ? '✅' : '❌'}
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
              onClick={prevExercise} 
              className="btn btn-secondary"
            >
              ⬅️ Previous Exercise
            </button>
            {isAnswerMode && (
              <button 
                onClick={resetExercise} 
                className="btn btn-warning"
              >
                🔄 Try Again
              </button>
            )}
            <button 
              onClick={nextExercise} 
              className="btn btn-primary"
            >
              Next Exercise ➡️
            </button>
          </div>

          {!isAnswerMode && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button 
                onClick={checkAnswer}
                className="btn btn-success btn-large"
              >
                📝 Check Answer
              </button>
            </div>
          )}

          {isAnswerMode && (
            <div className="card" style={{ marginTop: 20 }}>
              <h3 style={{ 
                color: "var(--foreground)", 
                marginBottom: "16px",
                fontSize: "18px",
                fontWeight: "600"
              }}>
                📊 Result: {currentProgress?.isCorrect ? "✅ Correct!" : "❌ Incorrect"}
              </h3>
              
              <div style={{ marginTop: 16 }}>
                <h4 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600",
                  color: "var(--foreground)",
                  marginBottom: "12px"
                }}>
                  📝 Correct Order:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentExercise.question.map((sentence: string, index: number) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginTop: '4px'
                      }}>
                        {index + 1}
                      </div>
                      <div style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        color: 'var(--card-text)'
                      }}>
                        {sentence}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
    </>
  );
}

export default function ReadingPart2() {
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
      <ReadingPart2Content />
    </Suspense>
  );
}