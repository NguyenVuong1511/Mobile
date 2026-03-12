import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LessonProgress {
  completed: boolean;
  stars: number;
  accuracy: number;
  attempts: number;
}

export interface GameState {
  playerName: string;
  playerAvatar: number;
  level: number;
  xp: number;
  stars: number;
  coins: number;
  streak: number;
  isLoggedIn: boolean;
  badges: string[];
  lessonProgress: Record<string, LessonProgress>;
}

interface GameContextType extends GameState {
  login: (name: string, avatar: number) => void;
  addStars: (count: number) => void;
  addCoins: (count: number) => void;
  addXP: (amount: number) => void;
  completeLesson: (id: string, stars: number, accuracy: number) => void;
  earnBadge: (id: string) => void;
}

const defaultProgress: Record<string, LessonProgress> = {
  numbers: { completed: true, stars: 3, accuracy: 95, attempts: 2 },
  addition: { completed: true, stars: 2, accuracy: 80, attempts: 3 },
  subtraction: { completed: false, stars: 0, accuracy: 0, attempts: 0 },
  compare: { completed: false, stars: 0, accuracy: 0, attempts: 0 },
  counting: { completed: false, stars: 0, accuracy: 0, attempts: 0 },
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    playerName: 'Alex',
    playerAvatar: 0,
    level: 3,
    xp: 240,
    stars: 47,
    coins: 28,
    streak: 5,
    isLoggedIn: false,
    badges: ['first_lesson', 'streak_3', 'perfect_score'],
    lessonProgress: defaultProgress,
  });

  const login = (name: string, avatar: number) =>
    setState(s => ({ ...s, playerName: name, playerAvatar: avatar, isLoggedIn: true }));

  const addStars = (count: number) =>
    setState(s => ({ ...s, stars: s.stars + count }));

  const addCoins = (count: number) =>
    setState(s => ({ ...s, coins: s.coins + count }));

  const addXP = (amount: number) =>
    setState(s => {
      const newXP = s.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { ...s, xp: newXP, level: newLevel };
    });

  const completeLesson = (id: string, stars: number, accuracy: number) => {
    setState(s => ({
      ...s,
      lessonProgress: {
        ...s.lessonProgress,
        [id]: {
          completed: true,
          stars,
          accuracy,
          attempts: (s.lessonProgress[id]?.attempts || 0) + 1,
        },
      },
      stars: s.stars + stars * 5,
      coins: s.coins + stars * 3,
    }));
  };

  const earnBadge = (id: string) =>
    setState(s => ({
      ...s,
      badges: s.badges.includes(id) ? s.badges : [...s.badges, id],
    }));

  return (
    <GameContext.Provider value={{ ...state, login, addStars, addCoins, addXP, completeLesson, earnBadge }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
