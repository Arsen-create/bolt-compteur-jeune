import React from 'react';
import { Timer, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface NavigationProps {
  activeTab: 'timer' | 'stats';
  onTabChange: (tab: 'timer' | 'stats') => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  language
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onTabChange('timer')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'timer'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Timer className="w-4 h-4" />
              {t('timer', language)}
            </button>
            <button
              onClick={() => onTabChange('stats')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'stats'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {t('statistics', language)}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};