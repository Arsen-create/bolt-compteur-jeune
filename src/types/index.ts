export interface FastingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in milliseconds
  isValid: boolean; // true if duration >= 6 hours
}

export interface FastingStats {
  totalFasts: number;
  totalDuration: number; // in milliseconds
  averageDuration: number; // in milliseconds
  longestFast: number; // in milliseconds
  durationBreakdown: {
    [key: string]: number;
  };
  thisWeek: {
    count: number;
    totalDuration: number;
  };
  thisMonth: {
    count: number;
    totalDuration: number;
  };
}

export type Language = 'fr' | 'hy';

export interface AppState {
  currentFast?: FastingSession;
  fastingHistory: FastingSession[];
  language: Language;
  activeTab: 'timer' | 'stats';
}