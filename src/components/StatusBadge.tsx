import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface StatusBadgeProps {
  isValid: boolean;
  language: Language;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isValid, language }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
        isValid
          ? 'bg-green-100 text-green-800 border border-green-200'
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}
    >
      {isValid ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      {isValid ? t('validFast', language) : t('fastingInProgressMinimum', language)}
    </div>
  );
};