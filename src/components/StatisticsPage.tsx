import React from 'react';
import { Download, Trophy, Clock, Target, Calendar, TrendingUp } from 'lucide-react';
import { FastingSession, Language } from '../types';
import { calculateStats } from '../utils/statistics';
import { formatDuration, formatDateTime } from '../utils/time';
import { t } from '../utils/translations';
import { exportData } from '../utils/storage';

interface StatisticsPageProps {
  fastingHistory: FastingSession[];
  language: Language;
  appState: any;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({
  fastingHistory,
  language,
  appState
}) => {
  const stats = calculateStats(fastingHistory);
  const recentFasts = fastingHistory
    .filter(fast => fast.endTime && fast.isValid)
    .sort((a, b) => (b.endTime?.getTime() || 0) - (a.endTime?.getTime() || 0))
    .slice(0, 10);

  const handleExport = () => {
    exportData(appState);
  };

  const StatCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    value: string; 
    color: string 
  }> = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* General Statistics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('generalStats', language)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Target className="w-5 h-5 text-blue-600" />}
            title={t('totalValidFasts', language)}
            value={stats.totalFasts.toString()}
            color="bg-blue-100"
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-green-600" />}
            title={t('totalCumulatedDuration', language)}
            value={formatDuration(stats.totalDuration)}
            color="bg-green-100"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
            title={t('averageDuration', language)}
            value={formatDuration(stats.averageDuration)}
            color="bg-purple-100"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-yellow-600" />}
            title={t('personalRecord', language)}
            value={formatDuration(stats.longestFast)}
            color="bg-yellow-100"
          />
        </div>
      </section>

      {/* Duration Breakdown */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('durationBreakdown', language)}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.durationBreakdown).map(([range, count]) => (
              <div key={range} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{count}</div>
                <div className="text-sm text-gray-600">{range}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Periodic Statistics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('periodicStats', language)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{t('thisWeek', language)}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('fastsCount', language)}:</span>
                <span className="font-semibold">{stats.thisWeek.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('totalDuration', language)}:</span>
                <span className="font-semibold">{formatDuration(stats.thisWeek.totalDuration)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">{t('thisMonth', language)}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('fastsCount', language)}:</span>
                <span className="font-semibold">{stats.thisMonth.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('totalDuration', language)}:</span>
                <span className="font-semibold">{formatDuration(stats.thisMonth.totalDuration)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('recentHistory', language)}
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-medium text-gray-900">{t('lastValidFasts', language)}</h3>
          </div>
          {recentFasts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentFasts.map((fast) => (
                <div key={fast.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold text-blue-600">
                        {formatDuration(fast.duration || 0)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDateTime(fast.startTime)} → {formatDateTime(fast.endTime!)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {t('noValidFasts', language)}
            </div>
          )}
        </div>
      </section>

      {/* Export Data */}
      <section>
        <div className="text-center">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download className="w-5 h-5" />
            {t('downloadData', language)}
          </button>
        </div>
      </section>
    </div>
  );
};