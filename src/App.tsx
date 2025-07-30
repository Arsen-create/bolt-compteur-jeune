import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TimerPage } from './components/TimerPage';
import { StatisticsPage } from './components/StatisticsPage';
import { LanguageSelector } from './components/LanguageSelector';
import { Toast } from './components/Toast';
import { AppState, FastingSession, Language } from './types';
import { saveToStorage, loadFromStorage } from './utils/storage';
import { isValidFast } from './utils/time';
import { t } from './utils/translations';

function App() {
  const [appState, setAppState] = useState<AppState>({
    fastingHistory: [],
    language: 'fr',
    activeTab: 'timer'
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedState = loadFromStorage();
    if (savedState) {
      setAppState(savedState);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(appState);
  }, [appState]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const startFast = () => {
    const newFast: FastingSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      isValid: false
    };

    setAppState(prev => ({
      ...prev,
      currentFast: newFast,
      fastingHistory: [...prev.fastingHistory, newFast]
    }));

    showToast(t('fastStarted', appState.language), 'success');
  };

  const endFast = () => {
    if (!appState.currentFast) return;

    const endTime = new Date();
    const duration = endTime.getTime() - appState.currentFast.startTime.getTime();
    const isValid = isValidFast(duration);

    const completedFast: FastingSession = {
      ...appState.currentFast,
      endTime,
      duration,
      isValid
    };

    setAppState(prev => ({
      ...prev,
      currentFast: undefined,
      fastingHistory: prev.fastingHistory.map(fast =>
        fast.id === completedFast.id ? completedFast : fast
      )
    }));

    showToast(t('fastEnded', appState.language), 'success');
  };

  const modifyStartTime = (newStartTime: Date) => {
    if (!appState.currentFast) return;

    if (newStartTime > new Date()) {
      showToast(t('futureTime', appState.language), 'error');
      return;
    }

    const updatedFast = {
      ...appState.currentFast,
      startTime: newStartTime
    };

    setAppState(prev => ({
      ...prev,
      currentFast: updatedFast,
      fastingHistory: prev.fastingHistory.map(fast =>
        fast.id === updatedFast.id ? updatedFast : fast
      )
    }));

    showToast(t('startTimeUpdated', appState.language), 'success');
  };

  const changeLanguage = (language: Language) => {
    setAppState(prev => ({ ...prev, language }));
  };

  const changeTab = (tab: 'timer' | 'stats') => {
    setAppState(prev => ({ ...prev, activeTab: tab }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Suivi de Jeûne Intermittent
          </h1>
          <LanguageSelector
            currentLanguage={appState.language}
            onLanguageChange={changeLanguage}
          />
        </div>
      </header>

      <Navigation
        activeTab={appState.activeTab}
        onTabChange={changeTab}
        language={appState.language}
      />

      <main>
        {appState.activeTab === 'timer' ? (
          <TimerPage
            currentFast={appState.currentFast}
            language={appState.language}
            onStartFast={startFast}
            onEndFast={endFast}
            onModifyStartTime={modifyStartTime}
          />
        ) : (
          <StatisticsPage
            fastingHistory={appState.fastingHistory}
            language={appState.language}
            appState={appState}
          />
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;