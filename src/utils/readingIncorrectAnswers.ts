// Utility functions for managing reading answer tracking in localStorage

// Reading answer record interface for tracking both correct and incorrect answers
export interface ReadingAnswerRecord {
  id: string;
  part: 'reading_part1' | 'reading_part2' | 'reading_part3';
  isCorrect: boolean;
  timestamp: number;
}

// Reading incorrect answer interface for detailed tracking
export interface ReadingIncorrectAnswer {
  id: string;
  part: 'reading_part1' | 'reading_part2' | 'reading_part3';
  questionData: any;
  userAnswer: any;
  correctAnswer: any;
  timestamp: number;
}

const READING_ANSWER_RECORDS_KEY = 'reading_aptis_answer_records';
const READING_INCORRECT_ANSWERS_KEY = 'reading_aptis_incorrect_answers';

// === READING ANSWER RECORDS (Correct/Incorrect tracking) ===

// Save reading answer result (both correct and incorrect)
export function saveReadingAnswerResult(id: string, part: 'reading_part1' | 'reading_part2' | 'reading_part3', isCorrect: boolean): void {
  if (typeof window === 'undefined') return;
  
  try {
    const records = getReadingAnswerRecords();
    const existingIndex = records.findIndex(record => record.id === id && record.part === part);
    
    const newRecord: ReadingAnswerRecord = {
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
    
    localStorage.setItem(READING_ANSWER_RECORDS_KEY, JSON.stringify(records));
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new Event('readingAnswerRecordsUpdated'));
  } catch (error) {
    console.error('Error saving reading answer result:', error);
  }
}

// Get all reading answer records
export function getReadingAnswerRecords(): ReadingAnswerRecord[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(READING_ANSWER_RECORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting reading answer records:', error);
    return [];
  }
}

// Get reading answer records for a specific part
export function getReadingAnswerRecordsForPart(part: 'reading_part1' | 'reading_part2' | 'reading_part3'): ReadingAnswerRecord[] {
  return getReadingAnswerRecords().filter(record => record.part === part);
}

// Check if a reading question was answered correctly
export function isReadingQuestionCorrect(id: string, part: 'reading_part1' | 'reading_part2' | 'reading_part3'): boolean | null {
  const records = getReadingAnswerRecords();
  const record = records.find(r => r.id === id && r.part === part);
  return record ? record.isCorrect : null;
}

// Get reading answer statuses for multiple questions
export function getReadingAnswerStatuses(part: 'reading_part1' | 'reading_part2' | 'reading_part3'): Record<string, boolean> {
  const records = getReadingAnswerRecordsForPart(part);
  const statuses: Record<string, boolean> = {};
  
  records.forEach(record => {
    statuses[record.id] = record.isCorrect;
  });
  
  return statuses;
}

// Clear all reading answer records
export function clearReadingAnswerRecords(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(READING_ANSWER_RECORDS_KEY);
    window.dispatchEvent(new Event('readingAnswerRecordsUpdated'));
  } catch (error) {
    console.error('Error clearing reading answer records:', error);
  }
}

// === READING INCORRECT ANSWERS (Detailed tracking for review) ===

// Get all reading incorrect answers from localStorage
export function getReadingIncorrectAnswers(): ReadingIncorrectAnswer[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(READING_INCORRECT_ANSWERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading incorrect answers from localStorage:', error);
    return [];
  }
}

// Save a reading incorrect answer to localStorage
export function saveReadingIncorrectAnswer(answer: Omit<ReadingIncorrectAnswer, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getReadingIncorrectAnswers();
    const newAnswer: ReadingIncorrectAnswer = {
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
    
    localStorage.setItem(READING_INCORRECT_ANSWERS_KEY, JSON.stringify(incorrectAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('readingIncorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error saving reading incorrect answer to localStorage:', error);
  }
}

// Remove a reading incorrect answer when user gets it right
export function removeReadingIncorrectAnswer(id: string, part: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getReadingIncorrectAnswers();
    const filteredAnswers = incorrectAnswers.filter(
      item => !(item.id === id && item.part === part)
    );
    
    localStorage.setItem(READING_INCORRECT_ANSWERS_KEY, JSON.stringify(filteredAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('readingIncorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error removing reading incorrect answer from localStorage:', error);
  }
}

// Get reading incorrect answers by part
export function getReadingIncorrectAnswersByPart(part: 'reading_part1' | 'reading_part2' | 'reading_part3'): ReadingIncorrectAnswer[] {
  return getReadingIncorrectAnswers().filter(answer => answer.part === part);
}

// Clear all reading incorrect answers
export function clearAllReadingIncorrectAnswers(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(READING_INCORRECT_ANSWERS_KEY);
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('readingIncorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error clearing reading incorrect answers from localStorage:', error);
  }
}

// Clear reading incorrect answers by part
export function clearReadingIncorrectAnswersByPart(part: 'reading_part1' | 'reading_part2' | 'reading_part3'): void {
  if (typeof window === 'undefined') return;
  
  try {
    const incorrectAnswers = getReadingIncorrectAnswers();
    const filteredAnswers = incorrectAnswers.filter(answer => answer.part !== part);
    localStorage.setItem(READING_INCORRECT_ANSWERS_KEY, JSON.stringify(filteredAnswers));
    
    // Dispatch custom event to update UI
    window.dispatchEvent(new Event('readingIncorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error clearing reading incorrect answers by part from localStorage:', error);
  }
}

// Get count of reading incorrect answers
export function getReadingIncorrectAnswersCount(): number {
  return getReadingIncorrectAnswers().length;
}

// Get count of reading incorrect answers by part
export function getReadingIncorrectAnswersCountByPart(part: 'reading_part1' | 'reading_part2' | 'reading_part3'): number {
  return getReadingIncorrectAnswersByPart(part).length;
}