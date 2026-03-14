export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export interface Settings {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface Stats {
  completedPomodoros: number;
  dailyStreaks: Record<string, number>; // date (YYYY-MM-DD) -> count
}
