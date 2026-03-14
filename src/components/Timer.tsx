import { motion } from 'motion/react';
import { SessionType } from '../types';

interface TimerProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  sessionType: SessionType;
}

export function Timer({ timeLeft, totalTime, sessionType }: TimerProps) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * circumference : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getColors = () => {
    switch (sessionType) {
      case 'work':
        return { stroke: '#f87171', text: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' }; // red-400
      case 'shortBreak':
        return { stroke: '#60a5fa', text: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' }; // blue-400
      case 'longBreak':
        return { stroke: '#34d399', text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' }; // emerald-400
    }
  };

  const colors = getColors();

  return (
    <div className={`relative flex items-center justify-center w-80 h-80 rounded-full shadow-inner ${colors.bg} transition-colors duration-500`}>
      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 280 280">
        {/* Background Circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          className="stroke-current text-gray-200 dark:text-gray-700 transition-colors duration-500"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="140"
          cy="140"
          r={radius}
          stroke={colors.stroke}
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: -progress }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-6xl font-mono font-bold tracking-tighter ${colors.text} transition-colors duration-500`}>
          {formatTime(timeLeft)}
        </span>
        <span className="mt-2 text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400 uppercase">
          {sessionType === 'work' ? 'Focus' : sessionType === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </span>
      </div>
    </div>
  );
}
