import React, { useState, useEffect } from 'react';
import { Play, Square, Edit3 } from 'lucide-react';
import { FastingSession, Language } from '../types';
import { formatDuration, formatDateTime, isValidFast } from '../utils/time';
import { t } from '../utils/translations';
import { StatusBadge } from './StatusBadge';
import { TimeModificationModal } from './TimeModificationModal';

interface TimerPageProps {
  currentFast?: FastingSession;
  language: Language;
  onStartFast: () => void;
  onEndFast: () => void;
  onModifyStartTime: (newStartTime: Date) => void;
}

export const TimerPage: React.FC<TimerPageProps> = ({
  currentFast,
  language,
  onStartFast,
  onEndFast,
  onModifyStartTime
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentDuration = (): number => {
    if (!currentFast) return 0;
    return currentTime.getTime() - currentFast.startTime.getTime();
  };

  const currentDuration = getCurrentDuration();
  const isCurrentFastValid = isValidFast(currentDuration);

  const handleModifyStartTime = (newStartTime: Date) => {
    onModifyStartTime(newStartTime);
    setShowModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentFast ? t('fastingInProgress', language) : t('readyToStart', language)}
        </h1>

        {currentFast && (
          <div className="mb-6">
            <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
              {formatDuration(currentDuration)}
            </div>
            <StatusBadge isValid={isCurrentFastValid} language={language} />
          </div>
        )}

        <button
          id="main-button"
          onClick={currentFast ? onEndFast : onStartFast}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            currentFast
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {currentFast ? (
            <>
              <Square className="w-5 h-5 inline mr-2" />
              {t('endFasting', language)}
            </>
          ) : (
            <>
              <Play className="w-5 h-5 inline mr-2" />
              {t('startFasting', language)}
            </>
          )}
        </button>

        {currentFast && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-700">
                {t('startedOn', language)} {formatDateTime(currentFast.startTime)}
              </span>
              <button
                id="edit-start-time-btn"
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Edit3 className="w-4 h-4" />
                {t('modify', language)}
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && currentFast && (
        <TimeModificationModal
          currentStartTime={currentFast.startTime}
          language={language}
          onSave={handleModifyStartTime}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};