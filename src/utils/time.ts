export const formatDuration = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isValidFast = (duration: number): boolean => {
  return duration >= 6 * 60 * 60 * 1000; // 6 hours in milliseconds
};

export const getWeekStart = (): Date => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  return new Date(now.setDate(diff));
};

export const getMonthStart = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getDurationCategory = (duration: number): string => {
  const hours = duration / (1000 * 60 * 60);
  
  if (hours < 6) return 'invalid';
  if (hours < 12) return '6-12h';
  if (hours < 18) return '12-18h';
  if (hours < 24) return '18-24h';
  if (hours < 36) return '24-36h';
  if (hours < 48) return '36-48h';
  if (hours < 60) return '48-60h';
  if (hours < 72) return '60-72h';
  return '72h+';
};