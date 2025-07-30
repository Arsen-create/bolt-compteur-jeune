import { FastingSession, FastingStats } from '../types';
import { getDurationCategory, getWeekStart, getMonthStart, isValidFast } from './time';

export const calculateStats = (history: FastingSession[]): FastingStats => {
  const validFasts = history.filter(fast => fast.endTime && isValidFast(fast.duration || 0));
  const weekStart = getWeekStart();
  const monthStart = getMonthStart();

  const totalDuration = validFasts.reduce((sum, fast) => sum + (fast.duration || 0), 0);
  const averageDuration = validFasts.length > 0 ? totalDuration / validFasts.length : 0;
  const longestFast = validFasts.reduce((max, fast) => Math.max(max, fast.duration || 0), 0);

  // Duration breakdown
  const durationBreakdown: { [key: string]: number } = {
    '6-12h': 0,
    '12-18h': 0,
    '18-24h': 0,
    '24-36h': 0,
    '36-48h': 0,
    '48-60h': 0,
    '60-72h': 0,
    '72h+': 0
  };

  validFasts.forEach(fast => {
    const category = getDurationCategory(fast.duration || 0);
    if (category !== 'invalid') {
      durationBreakdown[category]++;
    }
  });

  // This week stats
  const thisWeekFasts = validFasts.filter(fast => 
    fast.endTime && fast.endTime >= weekStart
  );
  const thisWeekDuration = thisWeekFasts.reduce((sum, fast) => sum + (fast.duration || 0), 0);

  // This month stats
  const thisMonthFasts = validFasts.filter(fast => 
    fast.endTime && fast.endTime >= monthStart
  );
  const thisMonthDuration = thisMonthFasts.reduce((sum, fast) => sum + (fast.duration || 0), 0);

  return {
    totalFasts: validFasts.length,
    totalDuration,
    averageDuration,
    longestFast,
    durationBreakdown,
    thisWeek: {
      count: thisWeekFasts.length,
      totalDuration: thisWeekDuration
    },
    thisMonth: {
      count: thisMonthFasts.length,
      totalDuration: thisMonthDuration
    }
  };
};