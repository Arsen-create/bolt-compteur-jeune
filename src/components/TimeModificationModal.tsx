import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface TimeModificationModalProps {
  currentStartTime: Date;
  language: Language;
  onSave: (newStartTime: Date) => void;
  onCancel: () => void;
}

export const TimeModificationModal: React.FC<TimeModificationModalProps> = ({
  currentStartTime,
  language,
  onSave,
  onCancel
}) => {
  const [date, setDate] = useState(currentStartTime.toISOString().split('T')[0]);
  const [time, setTime] = useState(
    currentStartTime.toTimeString().slice(0, 5)
  );
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      const newStartTime = new Date(`${date}T${time}`);
      
      if (isNaN(newStartTime.getTime())) {
        setError(t('invalidTime', language));
        return;
      }

      if (newStartTime > new Date()) {
        setError(t('futureTime', language));
        return;
      }

      onSave(newStartTime);
    } catch (err) {
      setError(t('invalidTime', language));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('modifyStartTime', language)}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('newStartDate', language)}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('newStartTime', language)}
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('save', language)}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              {t('cancel', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};