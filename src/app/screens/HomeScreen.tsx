import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mascot, SpeechBubble } from '../components/Mascot';
import { BottomNav } from '../components/BottomNav';
import { useGame } from '../context/GameContext';

const AVATARS = ['🦊', '🐼', '🐱', '🐸'];

const MENU_BUTTONS = [
  { label: 'Start Learning', emoji: '📖', gradient: 'linear-gradient(135deg, #1CB0F6, #4B73E0)', shadow: '#2A5FC1', path: '/lessons' },
  { label: 'Practice Mode', emoji: '🏋️', gradient: 'linear-gradient(135deg, #58CC02, #2E9900)', shadow: '#1E6B00', path: '/exercise/addition' },
  { label: 'Quiz Mode', emoji: '🎯', gradient: 'linear-gradient(135deg, #FF9600, #FF5A36)', shadow: '#CC3A10', path: '/exercise/numbers' },
  { label: 'Count Objects', emoji: '🧮', gradient: 'linear-gradient(135deg, #CE82FF, #9B51E0)', shadow: '#6B2BAE', path: '/counting' },
  { label: 'Drag & Drop', emoji: '🎮', gradient: 'linear-gradient(135deg, #FF86D0, #FF4B9E)', shadow: '#CC1B78', path: '/dragdrop' },
  { label: 'My Rewards', emoji: '🏆', gradient: 'linear-gradient(135deg, #FFD900, #FF9600)', shadow: '#CC6600', path: '/rewards' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const { playerName, playerAvatar, stars, coins, streak, xp, level, lessonProgress } = useGame();

  const completedCount = Object.values(lessonProgress).filter(l => l.completed).length;
  const totalLessons = Object.keys(lessonProgress).length;
  const progressPct = (completedCount / totalLessons) * 100;
  const xpForLevel = (level - 1) * 100;
  const xpNext = level * 100;
  const xpProgress = ((xp - xpForLevel) / (xpNext - xpForLevel)) * 100;

  const greetings = ['Ready to learn?', 'Let\'s have fun!', 'Math is cool!', 'You\'re awesome!'];
  const greeting = greetings[Math.floor(Date.now() / 10000) % greetings.length];

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #E8F9FF 0%, #EEF5FF 100%)' }}
    >
      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{
          background: 'linear-gradient(135deg, #1CB0F6 0%, #4B73E0 100%)',
          borderRadius: '0 0 32px 32px',
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.25)', fontSize: '26px' }}
            >
              {AVATARS[playerAvatar]}
            </div>
            <div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
                Hello,
              </div>
              <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '20px', color: 'white' }}>
                {playerName}! 👋
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-2xl cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <span style={{ fontSize: '18px' }}>🔥</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '15px' }}>{streak}</span>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-2xl cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <span style={{ fontSize: '18px' }}>⭐</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '15px' }}>{stars}</span>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-2xl cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <span style={{ fontSize: '18px' }}>🪙</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '15px' }}>{coins}</span>
            </motion.div>
          </div>
        </div>

        {/* Mascot + greeting */}
        <div className="flex items-end gap-3 mb-4">
          <Mascot size={70} expression="happy" float />
          <SpeechBubble text={`${greeting} 🦉`} position="right" />
        </div>

        {/* XP / Level bar */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#FFD900', fontFamily: 'Fredoka One, sans-serif', fontSize: '14px', color: '#7A5000' }}
          >
            {level}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>
                Level {level}
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>
                {xp} / {xpNext} XP
              </span>
            </div>
            <div className="h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FFD900, #FF9600)' }}
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily goal */}
      <div className="mx-4 mt-4">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '28px' }}>🎯</span>
            <div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '14px' }}>
                Daily Goal
              </div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#aaa', fontSize: '12px' }}>
                {completedCount} of {totalLessons} lessons done
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 rounded-full" style={{ background: '#EEE' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #58CC02, #3A9E00)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#58CC02', fontSize: '14px' }}>
              {Math.round(progressPct)}%
            </span>
          </div>
        </div>
      </div>

      {/* Daily Reward */}
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="mx-4 mt-3"
        style={{ cursor: 'pointer' }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #FFD900 0%, #FF9600 100%)', boxShadow: '0 4px 16px rgba(255,150,0,0.3)' }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            style={{ fontSize: '32px' }}
          >
            🎁
          </motion.span>
          <div className="flex-1">
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: 'white', fontSize: '15px' }}>
              Daily Reward Ready!
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
              Tap to claim 5 coins 🪙
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
            <span style={{ fontSize: '18px' }}>›</span>
          </div>
        </div>
      </motion.div>

      {/* Menu grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '16px', marginBottom: '12px' }}>
          What do you want to do? 🚀
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MENU_BUTTONS.map((btn, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.93, y: 4 }}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => navigate(btn.path)}
              className="flex flex-col items-center gap-2 py-5 rounded-3xl"
              style={{
                background: btn.gradient,
                border: 'none',
                cursor: 'pointer',
                boxShadow: `0 6px 0 ${btn.shadow}, 0 8px 20px rgba(0,0,0,0.12)`,
              }}
            >
              <span style={{ fontSize: '36px' }}>{btn.emoji}</span>
              <span style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                color: 'white',
                fontSize: '13px',
                textAlign: 'center',
                lineHeight: 1.3,
              }}>
                {btn.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
