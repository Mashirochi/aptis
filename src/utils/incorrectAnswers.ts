// Utility functions for managing answer tracking in localStorage

// Answer record interface for tracking both correct and incorrect answers
export interface AnswerRecord {
  id: string;
  part: 'part1' | 'part2' | 'part3' | 'part4';
  isCorrect: boolean;
  timestamp: number;
}

// Incorrect answer interface for detailed tracking
export interface IncorrectAnswer {
  id: string;
  part: 'part1' | 'part2' | 'part3' | 'part4';
  questionData: any;
  userAnswer: any;
  correctAnswer: any;
  timestamp: number;
}

const ANSWER_RECORDS_KEY = 'listening_aptis_answer_records';
const INCORRECT_ANSWERS_KEY = 'listening_aptis_incorrect_answers';

// === ANSWER RECORDS (Correct/Incorrect tracking) ===

// Save answer result (both correct and incorrect)
export function saveAnswerResult(id: string, part: 'part1' | 'part2' | 'part3' | 'part4', isCorrect: boolean): void {
  if (typeof window === 'undefined') return;
  
  try {
    const records = getAnswerRecords();
    const existingIndex = records.findIndex(record => record.id === id && record.part === part);
    
    const newRecord: AnswerRecord = {
      id,
      part,
      isCorrect,
      timestamp: Date.now()
    };
    
    if (existingIndex !== -1) {
      records[existingIndex] = newRecord;
    } else {
      records.push(newRecord);
    }
    
    localStorage.setItem(ANSWER_RECORDS_KEY, JSON.stringify(records));
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new Event('answerRecordsUpdated'));
  } catch (error) {
    console.error('Error saving answer result:', error);
  }
}

// Get all answer records
export function getAnswerRecords(): AnswerRecord[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(ANSWER_RECORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting answer records:', error);
    return [];
  }
}

// Get answer records for a specific part
export function getAnswerRecordsForPart(part: 'part1' | 'part2' | 'part3' | 'part4'): AnswerRecord[] {
  return getAnswerRecords().filter(record => record.part === part);
}

// Check if a question was answered correctly
export function isQuestionCorrect(id: string, part: 'part1' | 'part2' | 'part3' | 'part4'): boolean | null {
  const records = getAnswerRecords();
  const record = records.find(r => r.id === id && r.part === part);
  return record ? record.isCorrect : null;
}

// Get answer statuses for multiple questions
export function getAnswerStatuses(part: 'part1' | 'part2' | 'part3' | 'part4'): Record<string, boolean> {
  const records = getAnswerRecordsForPart(part);
  const statuses: Record<string, boolean> = {};
  
  records.forEach(record => {
    statuses[record.id] = record.isCorrect;
  });
  
  return statuses;
}

// Clear all answer records
export function clearAnswerRecords(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(ANSWER_RECORDS_KEY);
    window.dispatchEvent(new Event('answerRecordsUpdated'));
  } catch (error) {
    console.error('Error clearing answer records:', error);
  }
}

// === INCORRECT ANSWERS (Detailed tracking for review) ===

// Get all incorrect answers from localStorage
export function getIncorrectAnswers(): IncorrectAnswer[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(INCORRECT_ANSWERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading incorrect answers from localStorage:', error);
    return [];
  }
}

// Save an incorrect answer to localStorage
export function saveIncorrectAnswer(answer: Omit<IncorrectAnswer, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getIncorrectAnswers();
    const newAnswer: IncorrectAnswer = {
      ...answer,
      timestamp: Date.now()
    };
    
    // Check if this question is already in incorrect answers
    const existingIndex = incorrectAnswers.findIndex(
      item => item.id === answer.id && item.part === answer.part
    );
    
    if (existingIndex !== -1) {
      // Update existing entry
      incorrectAnswers[existingIndex] = newAnswer;
    } else {
      // Add new entry
      incorrectAnswers.push(newAnswer);
    }
    
    localStorage.setItem(INCORRECT_ANSWERS_KEY, JSON.stringify(incorrectAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error saving incorrect answer to localStorage:', error);
  }
}

// Remove an incorrect answer when user gets it right
export function removeIncorrectAnswer(id: string, part: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getIncorrectAnswers();
    const filteredAnswers = incorrectAnswers.filter(
      item => !(item.id === id && item.part === part)
    );
    
    localStorage.setItem(INCORRECT_ANSWERS_KEY, JSON.stringify(filteredAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error removing incorrect answer from localStorage:', error);
  }
}

// Get incorrect answers by part
export function getIncorrectAnswersByPart(part: 'part1' | 'part2' | 'part3' | 'part4'): IncorrectAnswer[] {
  return getIncorrectAnswers().filter(answer => answer.part === part);
}

// Clear all incorrect answers
export function clearAllIncorrectAnswers(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(INCORRECT_ANSWERS_KEY);
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error clearing incorrect answers from localStorage:', error);
  }
}

// Clear incorrect answers by part
export function clearIncorrectAnswersByPart(part: 'part1' | 'part2' | 'part3' | 'part4'): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getIncorrectAnswers();
    const filteredAnswers = incorrectAnswers.filter(answer => answer.part !== part);
    localStorage.setItem(INCORRECT_ANSWERS_KEY, JSON.stringify(filteredAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error clearing incorrect answers by part from localStorage:', error);
  }
}

// Get count of incorrect answers
export function getIncorrectAnswersCount(): number {
  return getIncorrectAnswers().length;
}

// Get count of incorrect answers by part
export function getIncorrectAnswersCountByPart(part: 'part1' | 'part2' | 'part3' | 'part4'): number {
  return getIncorrectAnswersByPart(part).length;
}