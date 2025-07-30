import { AppState, FastingSession } from '../types';

const STORAGE_KEY = 'fasting-tracker-data';

export const saveToStorage = (data: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = (): AppState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      if (parsed.currentFast) {
        parsed.currentFast.startTime = new Date(parsed.currentFast.startTime);
        if (parsed.currentFast.endTime) {
          parsed.currentFast.endTime = new Date(parsed.currentFast.endTime);
        }
      }
      parsed.fastingHistory = parsed.fastingHistory.map((fast: any) => ({
        ...fast,
        startTime: new Date(fast.startTime),
        endTime: fast.endTime ? new Date(fast.endTime) : undefined
      }));
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return null;
};

export const exportData = (data: AppState): void => {
  const exportData = {
    fastingHistory: data.fastingHistory,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fasting-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};