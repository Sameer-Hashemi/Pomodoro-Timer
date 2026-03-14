import { useState, useEffect, useCallback, useRef } from 'react';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { SettingsModal } from './components/SettingsModal';
import { StatsModal } from './components/StatsModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Settings, Stats, SessionType } from './types';
import { Settings as SettingsIcon, BarChart2, Moon, Sun } from 'lucide-react';

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
  soundEnabled: true,
  notificationsEnabled: true,
};

const DEFAULT_STATS: Stats = {
  completedPomodoros: 0,
  dailyStreaks: {},
};

export default function App() {
  const [settings, setSettings] = useLocalStorage<Settings>('pomodoro-settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage<Stats>('pomodoro-stats', DEFAULT_STATS);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('pomodoro-theme', 'light');

  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const getDuration = useCallback(
    (type: SessionType) => {
      switch (type) {
        case 'work':
          return settings.workDuration * 60;
        case 'shortBreak':
          return settings.shortBreakDuration * 60;
        case 'longBreak':
          return settings.longBreakDuration * 60;
      }
    },
    [settings]
  );

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getDuration(sessionType));
    }
  }, [settings, sessionType, getDuration]); // Update time if settings change while paused

  const playSound = useCallback(() => {
    if (settings.soundEnabled) {
      if (!audioRef.current) {
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      }
      audioRef.current.play().catch(console.error);
    }
  }, [settings.soundEnabled]);

  const showNotification = useCallback(
    (title: string, body: string) => {
      if (settings.notificationsEnabled && Notification.permission === 'granted') {
        new Notification(title, { body });
      }
    },
    [settings.notificationsEnabled]
  );

  const handleSessionComplete = useCallback(() => {
    playSound();
    
    if (sessionType === 'work') {
      const today = new Date().toISOString().split('T')[0];
      setStats((prev) => ({
        ...prev,
        completedPomodoros: prev.completedPomodoros + 1,
        dailyStreaks: {
          ...prev.dailyStreaks,
          [today]: (prev.dailyStreaks[today] || 0) + 1,
        },
      }));

      const newCycleCount = cycleCount + 1;
      setCycleCount(newCycleCount);

      if (newCycleCount % settings.cyclesBeforeLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(getDuration('longBreak'));
        showNotification('Focus Complete!', 'Time for a long break.');
      } else {
        setSessionType('shortBreak');
        setTimeLeft(getDuration('shortBreak'));
        showNotification('Focus Complete!', 'Time for a short break.');
      }
    } else {
      setSessionType('work');
      setTimeLeft(getDuration('work'));
      showNotification('Break Over!', 'Time to focus.');
    }
    setIsRunning(false); // Auto-pause between sessions
  }, [sessionType, cycleCount, settings.cyclesBeforeLongBreak, getDuration, playSound, showNotification, setStats]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleSessionComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(sessionType));
  };

  const skipSession = () => {
    setIsRunning(false);
    handleSessionComplete();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center transition-colors duration-500 font-sans">
      <div className="absolute top-6 right-6 flex items-center space-x-4">
        <button
          onClick={() => setIsStatsOpen(true)}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
          title="Statistics"
        >
          <BarChart2 size={24} />
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
          title="Settings"
        >
          <SettingsIcon size={24} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      <main className="flex flex-col items-center">
        <div className="mb-12 flex space-x-2 bg-gray-200/50 dark:bg-zinc-800/50 p-1 rounded-full">
          {(['work', 'shortBreak', 'longBreak'] as SessionType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setIsRunning(false);
                setSessionType(type);
                setTimeLeft(getDuration(type));
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                sessionType === type
                  ? 'bg-white dark:bg-zinc-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {type === 'work' ? 'Focus' : type === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>

        <Timer timeLeft={timeLeft} totalTime={getDuration(sessionType)} sessionType={sessionType} />

        <Controls
          isRunning={isRunning}
          onStart={toggleTimer}
          onPause={toggleTimer}
          onReset={resetTimer}
          onSkip={skipSession}
        />
        
        <div className="mt-12 text-sm font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase">
          Cycle {cycleCount % settings.cyclesBeforeLongBreak} / {settings.cyclesBeforeLongBreak}
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />
    </div>
  );
}
