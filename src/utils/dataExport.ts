// Utility functions for exporting and importing localStorage data

export interface ExportedData {
  timestamp: string;
  version: string;
  data: {
    'reading_part1_answers'?: any;
    'reading_part2_completed'?: any;
    'reading_part3_completed'?: any;
    'listening_aptis_incorrect_answers'?: any;
    'listening_aptis_answer_records'?: any;
    'theme'?: any;
    [key: string]: any;
  };
}

// Keys that should be included in the export
const EXPORTABLE_KEYS = [
  'reading_part1_answers',
  'reading_part2_completed',
  'reading_part3_completed',
  'listening_aptis_incorrect_answers',
  'listening_aptis_answer_records',
  'theme' // Include theme preference
];

export function exportLocalStorageData(): string {
  try {
    const exportData: ExportedData = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {}
    };

    // Extract all relevant data from localStorage
    EXPORTABLE_KEYS.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          exportData.data[key] = JSON.parse(value);
        } catch (e) {
          // If it's not JSON, store as string
          exportData.data[key] = value;
        }
      }
    });

    console.log('Export data:', exportData); // Debug log
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting localStorage data:', error);
    throw new Error('Failed to export data');
  }
}

export function importLocalStorageData(jsonData: string): void {
  try {
    const importData: ExportedData = JSON.parse(jsonData);
    console.log('Import data:', importData); // Debug log
    
    // Validate the imported data structure
    if (!importData.data || typeof importData.data !== 'object') {
      throw new Error('Invalid data format');
    }

    // Import each piece of data
    Object.entries(importData.data).forEach(([key, value]) => {
      if (EXPORTABLE_KEYS.includes(key)) {
        try {
          const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, jsonValue);
          console.log(`Imported ${key}:`, value); // Debug log
        } catch (e) {
          console.warn(`Failed to import ${key}:`, e);
        }
      }
    });

    // Trigger storage change event to update UI
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
    
  } catch (error) {
    console.error('Error importing localStorage data:', error);
    throw new Error('Failed to import data. Please check the file format.');
  }
}

export function downloadDataAsFile(data: string, filename: string = 'listening-aptis-data.json'): void {
  try {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file');
  }
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}

export function getDataSummary(): { 
  totalProgress: number; 
  incorrectAnswers: number; 
  lastUpdated: string | null;
} {
  try {
    let totalProgress = 0;
    let incorrectAnswers = 0;
    let lastUpdated: string | null = null;

    // Count progress items
    let progressKeys = ['reading_part1_answers', 'reading_part2_completed', 'reading_part3_completed'];
    progressKeys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (key === 'reading_part1_answers') {
            // This is an object with answers
            totalProgress += Object.keys(parsed).length;
          } else {
            // These are completion arrays or objects
            totalProgress += Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
          }
        } catch (e) {
          // If it's a simple value, count as 1
          totalProgress += 1;
        }
      }
    });

    // Count incorrect answers
    const incorrectData = localStorage.getItem('listening_aptis_incorrect_answers');
    if (incorrectData) {
      try {
        const parsed = JSON.parse(incorrectData);
        incorrectAnswers = parsed.length || 0; // It's an array, not an object
      } catch (e) {
        // Ignore parsing errors
      }
    }

    // Get last updated timestamp (approximate)
    const answerStatuses = localStorage.getItem('listening_aptis_answer_records');
    if (answerStatuses) {
      try {
        const parsed = JSON.parse(answerStatuses);
        // Use current time as approximation since we don't store timestamps
        lastUpdated = new Date().toISOString();
      } catch (e) {
        // Ignore parsing errors
      }
    }

    return {
      totalProgress,
      incorrectAnswers,
      lastUpdated
    };
  } catch (error) {
    console.error('Error getting data summary:', error);
    return {
      totalProgress: 0,
      incorrectAnswers: 0,
      lastUpdated: null
    };
  }
}

export function clearAllData(): void {
  try {
    EXPORTABLE_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Trigger storage change event to update UI
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('incorrectAnswersUpdated'));
  } catch (error) {
    console.error('Error clearing data:', error);
    throw new Error('Failed to clear data');
  }
}