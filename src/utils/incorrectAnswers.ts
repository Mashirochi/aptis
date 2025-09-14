// Utility functions for managing incorrect answers in localStorage

export interface IncorrectAnswer {
  id: string;
  part: 'part1' | 'part2' | 'part3' | 'part4';
  questionData: any;
  userAnswer: any;
  correctAnswer: any;
  timestamp: number;
}

const STORAGE_KEY = 'listening_aptis_incorrect_answers';

// Get all incorrect answers from localStorage
export function getIncorrectAnswers(): IncorrectAnswer[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
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
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incorrectAnswers));
    
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
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAnswers));
    
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
    localStorage.removeItem(STORAGE_KEY);
    
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAnswers));
    
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