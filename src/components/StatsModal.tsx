import { Stats } from '../types';
import { X, Flame, CheckCircle2 } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stats;
}

export function StatsModal({ isOpen, onClose, stats }: StatsModalProps) {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const todayCount = stats.dailyStreaks[today] || 0;

  // Calculate current streak
  let currentStreak = 0;
  let checkDate = new Date();
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (stats.dailyStreaks[dateStr] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Statistics</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="text-indigo-500 mb-2" size={32} />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.completedPomodoros}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Total Focus</span>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <Flame className="text-orange-500 mb-2" size={32} />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{currentStreak}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Day Streak</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed Today</span>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{todayCount}</span>
        </div>
      </div>
    </div>
  );
}
