'use client';

import React, { useState } from 'react';
import { READING_PART_4 } from '../../../utils/part2';

// Define TypeScript interfaces
interface PersonWithName {
  name: string;
  text: string;
}

interface PersonWithPerson {
  person: string;
  text: string;
}

type Person = PersonWithName | PersonWithPerson;

interface QuestionWithNumber {
  number: number;
  question: string;
  answer: string;
}

interface QuestionWithoutNumber {
  question: string;
  answer: string;
}

type Question = QuestionWithNumber | QuestionWithoutNumber;

interface Topic {
  title: string;
  people: PersonWithName[];
  questions: QuestionWithoutNumber[];
}

interface ReadingSectionWithPeople {
  title: string;
  description?: string;
  people: Person[];
  questions: QuestionWithNumber[];
}

interface ReadingSectionWithTopics {
  topics: Topic[];
}

type ReadingSection = ReadingSectionWithPeople | ReadingSectionWithTopics;

const ReadingPart4 = () => {
  // State to track selected answers
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Check if an answer is correct
  const isAnswerCorrect = (questionId: string, selectedAnswer: string, correctAnswer: string) => {
    return selectedAnswer === correctAnswer;
  };

  // Helper function to get person name
  const getPersonName = (person: Person): string => {
    if ('name' in person) {
      return person.name;
    } else {
      return person.person;
    }
  };

  // Helper function to get question number
  const getQuestionNumber = (question: Question): number | undefined => {
    if ('number' in question) {
      return question.number;
    }
    return undefined;
  };

  return (
    <div
      className="gradient-bg"
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: 20,
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          📖 Reading Part 4 - Who Says What?
        </h1>

        <div
          className="card"
          style={{
            marginBottom: 20,
            backgroundColor: "var(--card-background)",
            color: "var(--card-text)",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              margin: 0,
              color: "var(--foreground)",
            }}
          >
            <strong>📋 Instructions:</strong> Read the texts and answer the questions below by selecting who says each opinion.
          </p>
        </div>

        {READING_PART_4.map((section: any, sectionIndex: number) => (
          <div 
            key={sectionIndex} 
            className="card"
            style={{
              marginBottom: "20px",
              backgroundColor: "var(--card-background)",
              color: "var(--card-text)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}
          >
            {'title' in section && (
              <>
                <h2 
                  style={{
                    color: "#1f2937",
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {section.title}
                </h2>
                
                {section.description && (
                  <p 
                    style={{
                      marginBottom: "20px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      color: "var(--card-text)",
                    }}
                  >
                    {section.description}
                  </p>
                )}
                
                {section.people && (
                  <div className="mb-8">
                    <h3 
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "var(--foreground)",
                      }}
                    >
                      Comments:
                    </h3>
                    <div className="space-y-4">
                      {section.people.map((person: Person, personIndex: number) => (
                        <div 
                          key={personIndex} 
                          style={{
                            padding: "16px",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            backgroundColor: "var(--card-background)",
                            marginBottom: "12px",
                          }}
                        >
                          <p 
                            style={{
                              fontWeight: "600",
                              color: "var(--foreground)",
                              marginBottom: "8px",
                            }}
                          >
                            {getPersonName(person)}:
                          </p>
                          <p 
                            style={{
                              color: "var(--card-text)",
                              lineHeight: "1.5",
                              margin: 0,
                            }}
                          >
                            {person.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {section.questions && (
                  <div style={{ marginTop: "20px" }}>
                    {section.questions.map((question: QuestionWithNumber, questionIndex: number) => {
                      const questionId = `${sectionIndex}-${questionIndex}`;
                      const selectedAnswer = answers[questionId] || '';
                      
                      return (
                        <div 
                          key={questionIndex} 
                          style={{
                            padding: "16px",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            backgroundColor: "var(--card-background)",
                            marginBottom: "16px",
                          }}
                        >
                          <p 
                            style={{
                              fontWeight: "500",
                              color: "var(--foreground)",
                              marginBottom: "12px",
                              fontSize: "16px",
                            }}
                          >
                            {question.number}. {question.question}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <span 
                              style={{
                                fontWeight: "500",
                                color: "var(--card-text)",
                              }}
                            >
                              Answer:
                            </span>
                            <select
                              value={selectedAnswer}
                              onChange={(e) => handleAnswerSelect(questionId, e.target.value)}
                              className="btn btn-secondary"
                              style={{
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid var(--border-color)",
                                backgroundColor: "var(--card-background)",
                                color: "var(--card-text)",
                                fontSize: "14px",
                                minWidth: "120px",
                              }}
                            >
                              <option value="">Select...</option>
                              {section.people?.map((person: Person, idx: number) => (
                                <option 
                                  key={idx} 
                                  value={getPersonName(person)}
                                  style={{
                                    backgroundColor: "var(--card-background)",
                                    color: "var(--card-text)",
                                  }}
                                >
                                  {getPersonName(person)}
                                </option>
                              ))}
                            </select>
                            
                            {selectedAnswer && (
                              <span 
                                style={{
                                  fontWeight: "600",
                                  color: isAnswerCorrect(questionId, selectedAnswer, question.answer) ? "#10b981" : "#ef4444",
                                }}
                              >
                                {isAnswerCorrect(questionId, selectedAnswer, question.answer) ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${question.answer}`}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            
            {'topics' in section && section.topics && (
              <>
                {section.topics.map((topic: Topic, topicIndex: number) => (
                  <div 
                    key={topicIndex} 
                    style={{
                      marginBottom: "20px",
                      padding: "16px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      backgroundColor: "var(--card-background)",
                    }}
                  >
                    <h3 
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "var(--foreground)",
                      }}
                    >
                      {topic.title}
                    </h3>
                    <div className="space-y-4 mb-6">
                      {topic.people.map((person: PersonWithName, personIndex: number) => (
                        <div 
                          key={personIndex} 
                          style={{
                            padding: "16px",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            backgroundColor: "var(--card-background)",
                            marginBottom: "12px",
                          }}
                        >
                          <p 
                            style={{
                              fontWeight: "600",
                              color: "var(--foreground)",
                              marginBottom: "8px",
                            }}
                          >
                            {person.name}:
                          </p>
                          <p 
                            style={{
                              color: "var(--card-text)",
                              lineHeight: "1.5",
                              margin: 0,
                            }}
                          >
                            {person.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ marginTop: "20px" }}>
                      {topic.questions.map((question: QuestionWithoutNumber, questionIndex: number) => {
                        const questionId = `${sectionIndex}-${topicIndex}-${questionIndex}`;
                        const selectedAnswer = answers[questionId] || '';
                        
                        return (
                          <div 
                            key={questionIndex} 
                            style={{
                              padding: "16px",
                              border: "1px solid var(--border-color)",
                              borderRadius: "8px",
                              backgroundColor: "var(--card-background)",
                              marginBottom: "16px",
                            }}
                          >
                            <p 
                              style={{
                                fontWeight: "500",
                                color: "var(--foreground)",
                                marginBottom: "12px",
                                fontSize: "16px",
                              }}
                            >
                              {question.question}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                              <span 
                                style={{
                                  fontWeight: "500",
                                  color: "var(--card-text)",
                                }}
                              >
                                Answer:
                              </span>
                              <select
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerSelect(questionId, e.target.value)}
                                className="btn btn-secondary"
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "6px",
                                  border: "1px solid var(--border-color)",
                                  backgroundColor: "var(--card-background)",
                                  color: "var(--card-text)",
                                  fontSize: "14px",
                                  minWidth: "120px",
                                }}
                              >
                                <option value="">Select...</option>
                                {topic.people.map((person: PersonWithName, idx: number) => (
                                  <option 
                                    key={idx} 
                                    value={person.name}
                                    style={{
                                      backgroundColor: "var(--card-background)",
                                      color: "var(--card-text)",
                                    }}
                                  >
                                    {person.name}
                                  </option>
                                ))}
                              </select>
                              
                              {selectedAnswer && (
                                <span 
                                  style={{
                                    fontWeight: "600",
                                    color: isAnswerCorrect(questionId, selectedAnswer, question.answer) ? "#10b981" : "#ef4444",
                                  }}
                                >
                                  {isAnswerCorrect(questionId, selectedAnswer, question.answer) ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${question.answer}`}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        :root {
          --card-background: #ffffff;
          --card-text: #4b5563;
          --foreground: #1f2937;
          --border-color: #e5e7eb;
        }

        .dark:root {
          --card-background: #1f2937;
          --card-text: #d1d5db;
          --foreground: #f9fafb;
          --border-color: #374151;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        .dark .gradient-bg {
          background: linear-gradient(135deg, #111827 0%, #1e293b 100%);
        }

        .card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .dark .card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
        }

        .btn {
          cursor: pointer;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary {
          background-color: #f3f4f6;
          color: #374151;
        }

        .dark .btn-secondary {
          background-color: #374151;
          color: #f9fafb;
        }

        .question-grid {
          display: grid;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .question-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReadingPart4;