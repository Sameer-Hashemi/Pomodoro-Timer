import { Play, Pause, Square, SkipForward } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({ isRunning, onStart, onPause, onReset, onSkip }: ControlsProps) {
  return (
    <div className="flex items-center space-x-6 mt-12">
      <button
        onClick={onReset}
        className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        title="Reset"
      >
        <Square size={24} fill="currentColor" />
      </button>

      {isRunning ? (
        <button
          onClick={onPause}
          className="p-6 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          title="Pause"
        >
          <Pause size={32} fill="currentColor" />
        </button>
      ) : (
        <button
          onClick={onStart}
          className="p-6 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          title="Start"
        >
          <Play size={32} fill="currentColor" />
        </button>
      )}

      <button
        onClick={onSkip}
        className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        title="Skip Session"
      >
        <SkipForward size={24} fill="currentColor" />
      </button>
    </div>
  );
}
