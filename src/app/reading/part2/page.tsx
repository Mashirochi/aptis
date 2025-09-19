"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sortable from "sortablejs";
import { READING_PART_2 } from "../../../utils/part2";

// Define the interface for reading exercises
interface ReadingExercise {
  key: number;
  title: string;
  sentences: string[];
}

function ReadingPart2Content() {
  const searchParams = useSearchParams();
  const exerciseKey = parseInt(searchParams.get('exercise') || '1');
  
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [shuffledSentences, setShuffledSentences] = useState<string[]>([]);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});
  
  const sortableRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  // Initialize exercise based on URL parameter
  useEffect(() => {
    if (exerciseKey && exerciseKey >= 1 && exerciseKey <= READING_PART_2.length) {
      const exerciseIndex = exerciseKey - 1;
      setCurrentExercise(exerciseIndex);
    }
  }, [exerciseKey]);

  // Load completed exercises from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reading_part2_completed');
      if (saved) {
        setCompletedExercises(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading completed exercises:', error);
    }
  }, []);

  // Save completed exercises to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('reading_part2_completed', JSON.stringify(completedExercises));
    } catch (error) {
      console.error('Error saving completed exercises:', error);
    }
  }, [completedExercises]);

  // Initialize sortable and shuffle sentences when exercise changes
  useEffect(() => {
    const exercise = READING_PART_2[currentExercise];
    if (exercise) {
      const sentences = [...exercise.sentences];
      setOriginalOrder([...sentences]);
      
      // Shuffle sentences (but keep first sentence in place if it's marked as opening)
      const sentencesToShuffle = [...sentences];
      for (let i = sentencesToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sentencesToShuffle[i], sentencesToShuffle[j]] = [sentencesToShuffle[j], sentencesToShuffle[i]];
      }
      
      setShuffledSentences(sentencesToShuffle);
      setIsCompleted(false);
      setShowAnswer(false);
      setAttempts(0);
    }
  }, [currentExercise]);

  // Initialize SortableJS
  useEffect(() => {
    if (sortableRef.current && !sortableInstance.current) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (evt) => {
          // Update the sentences array based on new order
          const items = Array.from(sortableRef.current?.children || []);
          const newOrder = items.map(item => item.getAttribute('data-sentence')).filter(Boolean) as string[];
          setShuffledSentences(newOrder);
        },
      });
    }

    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy();
        sortableInstance.current = null;
      }
    };
  }, [shuffledSentences.length]);

  const currentExerciseData = READING_PART_2[currentExercise];

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    const isCorrect = JSON.stringify(shuffledSentences) === JSON.stringify(originalOrder);
    
    if (isCorrect) {
      setIsCompleted(true);
      setCompletedExercises(prev => ({
        ...prev,
        [currentExerciseData.key]: true
      }));
    }
    
    setShowAnswer(true);
  };

  const resetExercise = () => {
    const exercise = READING_PART_2[currentExercise];
    if (exercise) {
      const sentences = [...exercise.sentences];
      
      // Shuffle again
      for (let i = sentences.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
      }
      
      setShuffledSentences(sentences);
      setIsCompleted(false);
      setShowAnswer(false);
    }
  };

  const goToExercise = (index: number) => {
    setCurrentExercise(index);
    setIsDrawerOpen(false);
  };

  const nextExercise = () => {
    if (currentExercise < READING_PART_2.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  if (!currentExerciseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-bg" style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Desktop Sidebar */}
      <div
        className="sidebar sidebar-bg desktop-sidebar"
        style={{
          width: 320,
          padding: 20,
          overflowY: "auto"
        }}
      >
        <h3 style={{
          marginBottom: "24px",
          fontSize: "20px",
          fontWeight: "700",
          textAlign: "center",
          color: "var(--foreground)"
        }}>
          📖 Exercises
        </h3>
        
        <div
          className="question-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {READING_PART_2.map((exercise, index) => {
            let className = "question-number";
            
            if (completedExercises[exercise.key]) {
              className += " correct";
            } else if (currentExercise === index) {
              className += " current";
            }

            return (
              <div
                key={exercise.key}
                onClick={() => goToExercise(index)}
                className={className}
                style={{
                  fontSize: "14px",
                  padding: "8px 4px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                title={exercise.title}
              >
                {exercise.key}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="card" style={{ marginTop: 24, padding: 16 }}>
          <h4 style={{ margin: "0 0 12px 0", color: "var(--foreground)", fontSize: "16px" }}>📊 Progress</h4>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#059669", marginBottom: 4 }}>
              {Object.values(completedExercises).filter(Boolean).length}
            </div>
            <div style={{ fontSize: "14px", color: "var(--card-text)" }}>
              / {READING_PART_2.length} Completed
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="mobile-drawer"
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
            ✖️ Close
          </button>
          
          <h3 style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "700",
            textAlign: "center",
            color: "var(--foreground)"
          }}>
            📖 Reading Part 2 Exercises
          </h3>
          
          <div
            className="question-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {READING_PART_2.map((exercise, index) => {
              let className = "question-number";
              
              if (completedExercises[exercise.key]) {
                className += " correct";
              } else if (currentExercise === index) {
                className += " current";
              }

              return (
                <div
                  key={exercise.key}
                  onClick={() => goToExercise(index)}
                  className={className}
                  style={{
                    fontSize: "12px",
                    padding: "8px 4px",
                    textAlign: "center",
                    cursor: "pointer"
                  }}
                  title={exercise.title}
                >
                  {exercise.key}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: 20 }}>
        {/* Mobile menu button */}
        <button
          className="btn btn-secondary mobile-only"
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginBottom: 20, display: "none" }}
        >
          📋 Exercise List
        </button>

        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ 
            color: "var(--foreground)", 
            marginBottom: 10,
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center"
          }}>
            📖 Reading Part 2 - Exercise {currentExerciseData.key}
          </h1>
          <h2 style={{ 
            color: "var(--card-text)", 
            marginBottom: 10,
            fontSize: "20px",
            fontWeight: "500",
            textAlign: "center"
          }}>
            {currentExerciseData.title}
          </h2>

        </div>

        {/* Instructions */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>📋 Instructions</h3>
          <ul style={{ color: "var(--card-text)", lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
            <li>Read all the sentences carefully</li>
            <li>Drag and drop sentences to arrange them in logical order</li>
            <li>Click "Check Answer" when you think you have the correct order</li>
            <li>The sentences should form a coherent paragraph when arranged correctly</li>
          </ul>
        </div>

        {/* Sortable Sentences */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>
            ✋ Drag to Reorder ({shuffledSentences.length} sentences)
          </h3>
          
          <div
            ref={sortableRef}
            style={{
              minHeight: 200,
              border: "2px dashed var(--border-color)",
              borderRadius: 12,
              padding: 16,
              backgroundColor: "var(--background)"
            }}
          >
            {shuffledSentences.map((sentence, index) => (
              <div
                key={sentence}
                data-sentence={sentence}
                className="sentence-card"
                style={{
                  padding: 16,
                  margin: "8px 0",
                  backgroundColor: "var(--card-background)",
                  border: `2px solid ${showAnswer && isCompleted ? '#10b981' : 'var(--border-color)'}`,
                  borderRadius: 12,
                  cursor: "move",
                  transition: "all 0.2s ease",
                  position: "relative",
                  color: "var(--card-text)"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: 12 
                }}>
                  <div style={{
                    minWidth: 24,
                    height: 24,
                    backgroundColor: "var(--border-color)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "var(--card-text)",
                    marginTop: 2
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1, lineHeight: 1.5 }}>
                    {sentence}
                  </div>
                  <div style={{
                    fontSize: "18px",
                    color: "var(--card-text)",
                    opacity: 0.5,
                    cursor: "grab"
                  }}>
                    ⋮⋮
                  </div>
                </div>
                
                {/* Show correct position indicator */}
                {showAnswer && (
                  <div style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: sentence === originalOrder[index] ? "#10b981" : "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {sentence === originalOrder[index] ? "✓" : "✗"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>🎮 Actions</h3>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {!showAnswer && (
              <>
                <button
                  onClick={checkAnswer}
                  className="btn btn-primary"
                  style={{ minWidth: 120 }}
                >
                  ✅ Check Answer
                </button>
                <button
                  onClick={resetExercise}
                  className="btn btn-warning"
                  style={{ minWidth: 120 }}
                >
                  🔄 Shuffle Again
                </button>
              </>
            )}
            
            {showAnswer && (
              <button
                onClick={resetExercise}
                className="btn btn-warning"
                style={{ minWidth: 120 }}
              >
                🔄 Try Again
              </button>
            )}
          </div>
          
          {/* Attempts counter */}
          {attempts > 0 && (
            <div style={{ marginTop: 12, color: "var(--card-text)", fontSize: "14px" }}>
              Attempts: {attempts}
            </div>
          )}
        </div>

        {/* Result Display */}
        {showAnswer && (
          <div className="card" style={{ 
            marginBottom: 24,
            backgroundColor: isCompleted ? "#065f46" : "#7f1d1d",
            border: `2px solid ${isCompleted ? "#10b981" : "#ef4444"}`
          }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ 
                margin: 0,
                color: isCompleted ? "#dcfce7" : "#fecaca",
                fontSize: "20px"
              }}>
                {isCompleted ? "🎉 Excellent! Perfect Order!" : "❌ Not quite right. Try again!"}
              </h3>
            </div>
            
            {!isCompleted && (
              <div>
                <h4 style={{ 
                  margin: "16px 0 12px 0", 
                  color: "#fecaca",
                  fontSize: "16px"
                }}>
                  💡 Correct Order:
                </h4>
                <div>
                  {originalOrder.map((sentence, index) => (
                    <div
                      key={index}
                      style={{
                        padding: 12,
                        margin: "4px 0",
                        backgroundColor: "#065f46",
                        border: "2px solid #10b981",
                        borderRadius: 8,
                        color: "#dcfce7",
                        fontSize: "14px"
                      }}
                    >
                      <strong>{index + 1}.</strong> {sentence}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          marginTop: 30 
        }}>
          <button 
            onClick={previousExercise} 
            disabled={currentExercise === 0}
            className="btn btn-secondary"
            style={{ minWidth: 120 }}
          >
            ⬅️ Previous
          </button>
          
          <button 
            onClick={nextExercise} 
            disabled={currentExercise === READING_PART_2.length - 1}
            className="btn btn-secondary"
            style={{ minWidth: 120 }}
          >
            Next ➡️
          </button>
        </div>
      </div>

      {/* Simple CSS for basic SortableJS effect */}
      <style jsx>{`
        .sentence-card {
          margin: 4px 0;
          cursor: move;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          
          .mobile-only {
            display: block !important;
          }
          
          .main-content {
            padding: 16px !important;
          }
          
          .sentence-card {
            padding: 12px !important;
            cursor: grab;
          }
          
          .sentence-card:active {
            cursor: grabbing;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
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
        fontSize: '18px',
        color: 'var(--foreground)'
      }}>
        Loading Reading Part 2...
      </div>
    }>
      <ReadingPart2Content />
    </Suspense>
  );
}