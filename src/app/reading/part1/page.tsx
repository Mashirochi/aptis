"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
// Note: Using local state for now, incorrect answers tracking can be extended later

import {
    questions1_1,
    questions1_2,
    questions1_3,
    questions1_4,
    questions1_5,
    questions1_6,
    questions1_7,
    questions1_8,
    questions1_9,
    questions1_10,
    questions1_11,
    questions1_12,
    questions1_13,
    questions1_14,
    questions1_15,
    questions1_16,
    questions1_17,
    questions1_18,
    questions1_19,
} from "../../../utils/reading";

// Define the base question interface
interface BaseQuestion {
    questionStart: string;
    answerOptions: string[];
    questionEnd: string;
    correctAnswer: string;
}

// Define the extended question interface with additional properties
interface Question extends BaseQuestion {
    id: string;
    setIndex: number;
    questionIndex: number;
}

// Group all question sets (Questions 1-5, 6-10, 11-15, etc.)
const ALL_QUESTION_SETS = [
    { name: "Questions 1-5", questions: questions1_1 },
    { name: "Questions 6-10", questions: questions1_2 },
    { name: "Questions 11-15", questions: questions1_3 },
    { name: "Questions 16-20", questions: questions1_4 },
    { name: "Questions 21-25", questions: questions1_5 },
    { name: "Questions 26-30", questions: questions1_6 },
    { name: "Questions 31-35", questions: questions1_7 },
    { name: "Questions 36-40", questions: questions1_8 },
    { name: "Questions 41-45", questions: questions1_9 },
    { name: "Questions 46-50", questions: questions1_10 },
    { name: "Questions 51-55", questions: questions1_11 },
    { name: "Questions 56-60", questions: questions1_12 },
    { name: "Questions 61-65", questions: questions1_13 },
    { name: "Questions 66-70", questions: questions1_14 },
    { name: "Questions 71-75", questions: questions1_15 },
    { name: "Questions 76-80", questions: questions1_16 },
    { name: "Questions 81-85", questions: questions1_17 },
    { name: "Questions 86-90", questions: questions1_18 },
    { name: "Questions 91-95", questions: questions1_19 },
].filter(set => set.questions && set.questions.length > 0); // Filter out empty sets

interface Question {
    questionStart: string;
    answerOptions: string[];
    questionEnd: string;
    correctAnswer: string;
    id: string;
    setIndex: number;
    questionIndex: number;
}

// Flatten all questions for full page mode
const ALL_QUESTIONS = ALL_QUESTION_SETS.flatMap((set, setIndex) => 
    set.questions.map((q: BaseQuestion, qIndex: number) => ({
        ...q,
        id: `${setIndex + 1}_${qIndex + 1}`,
        setIndex,
        questionIndex: qIndex
    }))
);

interface Question {
    questionStart: string;
    answerOptions: string[];
    questionEnd: string;
    correctAnswer: string;
    id: string;
    setIndex: number;
    questionIndex: number;
}

function ReadingPart1Content() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'full'; // 'full' or 'parts'
    const setIndex = parseInt(searchParams.get('set') || '0');
    
    const [viewMode, setViewMode] = useState<'full' | 'parts'>(mode as 'full' | 'parts');
    const [currentSet, setCurrentSet] = useState<number>(setIndex);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});

    // Load saved answer statuses from localStorage when component mounts
    useEffect(() => {
        try {
            const saved = localStorage.getItem('reading_part1_answers');
            if (saved) {
                setAnsweredQuestions(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading saved answers:', error);
        }
    }, []);

    // Save answers to localStorage whenever answeredQuestions changes
    useEffect(() => {
        try {
            localStorage.setItem('reading_part1_answers', JSON.stringify(answeredQuestions));
        } catch (error) {
            console.error('Error saving answers:', error);
        }
    }, [answeredQuestions]);

    const currentQuestions: Question[] = viewMode === 'full' ? ALL_QUESTIONS : 
        ALL_QUESTION_SETS[currentSet].questions.map((q: BaseQuestion, index: number) => ({
            ...q,
            id: `${currentSet + 1}_${index + 1}`,
            setIndex: currentSet,
            questionIndex: index
        }));

    function handleAnswerSelect(questionId: string, answer: string, question: Question) {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
        setShowAnswers(prev => ({ ...prev, [questionId]: true }));
        
        const isCorrect = answer === question.correctAnswer;
        setAnsweredQuestions(prev => ({ ...prev, [questionId]: isCorrect }));
        
        // Note: Answer tracking is handled by local state and localStorage for now
    }

    function resetQuestion(questionId: string) {
        setSelectedAnswers(prev => {
            const newState = { ...prev };
            delete newState[questionId];
            return newState;
        });
        setShowAnswers(prev => {
            const newState = { ...prev };
            delete newState[questionId];
            return newState;
        });
    }

    function resetAll() {
        setSelectedAnswers({});
        setShowAnswers({});
    }

    const QuestionComponent = ({ question, index }: { question: Question; index: number }) => {
        const questionId = question.id;
        const selectedAnswer = selectedAnswers[questionId];
        const showAnswer = showAnswers[questionId];
        const isCorrect = selectedAnswer === question.correctAnswer;

        return (
            <div key={questionId} className="card" style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>
                    <p style={{ 
                        fontSize: "16px", 
                        lineHeight: "1.6", 
                        margin: 0,
                        color: "var(--foreground)"
                    }}>
                        <strong>{index + 1}.</strong> {question.questionStart} <strong>_____</strong> {question.questionEnd}
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {question.answerOptions.map((option, optionIndex) => {
                        const optionLetter = String.fromCharCode(65 + optionIndex);
                        const isSelectedOption = selectedAnswer === option;
                        const isCorrectOption = option === question.correctAnswer;
                        
                        let className = "answer-option";
                        if (showAnswer) {
                            if (isCorrectOption) className += " correct";
                            else if (isSelectedOption && !isCorrectOption) className += " incorrect";
                        } else if (isSelectedOption) {
                            className += " selected";
                        }

                        return (
                            <button
                                key={optionIndex}
                                onClick={() => !showAnswer && handleAnswerSelect(questionId, option, question)}
                                disabled={showAnswer}
                                className={className}
                                style={{ textAlign: "left" }}
                            >
                                <strong>{optionLetter}.</strong> {option}
                            </button>
                        );
                    })}
                </div>

                {showAnswer && (
                    <div style={{ marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: isCorrect ? "#dcfce7" : "#fef2f2" }}>
                        <p className={isCorrect ? "correct-answer-text" : "incorrect-answer-text"} style={{ 
                            margin: 0, 
                            fontSize: "14px", 
                            fontWeight: "600"
                        }}>
                            {isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is: ${question.correctAnswer}`}
                        </p>
                        <button
                            onClick={() => resetQuestion(questionId)}
                            className="btn btn-warning"
                            style={{ marginTop: 8, fontSize: "12px", padding: "4px 8px" }}
                        >
                            🔄 Try Again
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="gradient-bg" style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
                {/* Header */}
                <div style={{ marginBottom: 30 }}>
                    <h1 style={{ 
                        color: "var(--foreground)", 
                        marginBottom: 10,
                        fontSize: "28px",
                        fontWeight: "700",
                        textAlign: "center"
                    }}>
                        📖 Reading Part 1 - Fill in the Blanks
                    </h1>
                    <p style={{ 
                        textAlign: "center", 
                        color: "var(--card-text)", 
                        fontSize: "16px",
                        margin: 0
                    }}>
                        Choose the best word to complete each sentence
                    </p>
                </div>

                {/* Mode Selection */}
                <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>📋 Display Mode</h3>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <button
                            onClick={() => setViewMode('full')}
                            className={`btn ${viewMode === 'full' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            📄 Full Page (All {ALL_QUESTIONS.length} Questions)
                        </button>
                        <button
                            onClick={() => setViewMode('parts')}
                            className={`btn ${viewMode === 'parts' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            📑 By Parts (5 Questions Each)
                        </button>
                    </div>
                </div>

                {/* Parts Navigation (only show in parts mode) */}
                {viewMode === 'parts' && (
                    <div className="card" style={{ marginBottom: 20 }}>
                        <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>
                            🎯 Current Set: {ALL_QUESTION_SETS[currentSet].name} 
                            <span style={{ fontSize: "14px", fontWeight: "normal", color: "var(--card-text)" }}>
                                ({ALL_QUESTION_SETS[currentSet].questions.length} questions)
                            </span>
                        </h3>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {ALL_QUESTION_SETS.map((set, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSet(index)}
                                    className={`btn ${currentSet === index ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ fontSize: "14px" }}
                                >
                                    {set.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Questions Display */}
                <div style={{ marginBottom: 30 }}>
                    {currentQuestions.map((question: Question, index: number) => (
                        <QuestionComponent 
                            key={question.id} 
                            question={question} 
                            index={viewMode === 'full' ? index : index}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="card" style={{ textAlign: "center" }}>
                    <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>🎮 Actions</h3>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                            onClick={resetAll}
                            className="btn btn-warning"
                        >
                            🔄 Reset All Answers
                        </button>
                        
                        {viewMode === 'parts' && (
                            <>
                                <button
                                    onClick={() => setCurrentSet(Math.max(0, currentSet - 1))}
                                    disabled={currentSet === 0}
                                    className="btn btn-secondary"
                                >
                                    ⬅️ Previous Set
                                </button>
                                <button
                                    onClick={() => setCurrentSet(Math.min(ALL_QUESTION_SETS.length - 1, currentSet + 1))}
                                    disabled={currentSet === ALL_QUESTION_SETS.length - 1}
                                    className="btn btn-secondary"
                                >
                                    Next Set ➡️
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Progress Summary */}
                <div className="card" style={{ marginTop: 20 }}>
                    <h3 style={{ margin: "0 0 16px 0", color: "var(--foreground)" }}>📊 Progress Summary</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
                        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "var(--card-background)", borderRadius: "8px" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#059669" }}>
                                {Object.values(answeredQuestions).filter(Boolean).length}
                            </div>
                            <div style={{ fontSize: "14px", color: "var(--card-text)" }}>Correct</div>
                        </div>
                        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "var(--card-background)", borderRadius: "8px" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>
                                {Object.values(answeredQuestions).filter(val => val === false).length}
                            </div>
                            <div style={{ fontSize: "14px", color: "var(--card-text)" }}>Incorrect</div>
                        </div>
                        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "var(--card-background)", borderRadius: "8px" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6" }}>
                                {currentQuestions.length - Object.keys(answeredQuestions).length}
                            </div>
                            <div style={{ fontSize: "14px", color: "var(--card-text)" }}>Remaining</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ReadingPart1() {
    return (
        <Suspense fallback={
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                fontSize: '18px'
            }}>
                Loading Reading Part 1...
            </div>
        }>
            <ReadingPart1Content />
        </Suspense>
    );
}