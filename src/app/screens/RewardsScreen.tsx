import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useGame } from '../context/GameContext';

interface Badge {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  color: string;
}

const ALL_BADGES: Badge[] = [
  { id: 'first_lesson', emoji: '🎓', label: 'First Steps', desc: 'Complete your first lesson!', color: '#1CB0F6' },
  { id: 'perfect_score', emoji: '💯', label: 'Perfect!', desc: 'Get 100% accuracy!', color: '#FF9600' },
  { id: 'streak_3', emoji: '🔥', label: '3-Day Streak', desc: 'Learn 3 days in a row!', color: '#FF4B4B' },
  { id: 'streak_7', emoji: '⚡', label: 'Week Warrior', desc: 'Learn 7 days in a row!', color: '#FFD900' },
  { id: 'math_star', emoji: '🌟', label: 'Math Star', desc: 'Earn 50+ stars!', color: '#CE82FF' },
  { id: 'coin_master', emoji: '🪙', label: 'Coin Master', desc: 'Collect 100 coins!', color: '#FF9600' },
  { id: 'all_lessons', emoji: '🏆', label: 'Champion', desc: 'Complete all lessons!', color: '#58CC02' },
  { id: 'speed_run', emoji: '⏱️', label: 'Speed Demon', desc: 'Answer 5 correctly in a row!', color: '#4B73E0' },
];

const CHARACTERS = [
  { emoji: '🦊', name: 'Foxy', cost: 0, unlocked: true },
  { emoji: '🐼', name: 'Panda', cost: 0, unlocked: true },
  { emoji: '🐱', name: 'Kitty', cost: 0, unlocked: true },
  { emoji: '🐸', name: 'Froggo', cost: 0, unlocked: true },
  { emoji: '🦁', name: 'Leo', cost: 50, unlocked: false },
  { emoji: '🐯', name: 'Tiger', cost: 75, unlocked: false },
  { emoji: '🦄', name: 'Uni', cost: 100, unlocked: false },
  { emoji: '🐉', name: 'Dragon', cost: 150, unlocked: false },
];

export default function RewardsScreen() {
  const navigate = useNavigate();
  const { stars, coins, badges } = useGame();

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(160deg, #FFF8E0 0%, #FFF3F0 100%)' }}>
      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{ background: 'linear-gradient(135deg, #FFD900 0%, #FF9600 100%)', borderRadius: '0 0 32px 32px' }}
      >
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '28px', color: 'white' }}>
          🏆 My Rewards
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginTop: '2px' }}>
          Collect all badges and characters!
        </div>

        {/* Currency display */}
        <div className="flex gap-3 mt-4">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl flex-1"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{ fontSize: '24px' }}
            >⭐</motion.span>
            <div>
              <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '22px', color: 'white' }}>{stars}</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>Stars</div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl flex-1"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: '24px' }}
            >🪙</motion.span>
            <div>
              <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '22px', color: 'white' }}>{coins}</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>Coins</div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl flex-1"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <span style={{ fontSize: '24px' }}>🏅</span>
            <div>
              <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '22px', color: 'white' }}>{badges.length}</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>Badges</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Badges section */}
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '16px', marginBottom: '12px' }}>
          🎖️ Badges ({badges.length}/{ALL_BADGES.length})
        </div>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {ALL_BADGES.map((badge, i) => {
            const earned = badges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: earned ? `linear-gradient(135deg, ${badge.color}33, ${badge.color}66)` : '#f0f0f0',
                    border: earned ? `3px solid ${badge.color}` : '3px solid #e0e0e0',
                    boxShadow: earned ? `0 4px 16px ${badge.color}40` : 'none',
                  }}
                >
                  <span style={{ fontSize: '28px', filter: earned ? 'none' : 'grayscale(1) opacity(0.3)' }}>
                    {badge.emoji}
                  </span>
                  {earned && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: badge.color, fontSize: '10px' }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: earned ? '#333' : '#bbb', fontSize: '10px', textAlign: 'center', lineHeight: 1.2 }}>
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Characters section */}
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '16px', marginBottom: '12px' }}>
          🎭 Characters
        </div>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
                style={{
                  background: char.unlocked ? 'linear-gradient(135deg, #f0f0f0, #e0e0e0)' : '#f0f0f0',
                  border: char.unlocked ? '3px solid #58CC02' : '3px solid #e0e0e0',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: '28px', filter: char.unlocked ? 'none' : 'grayscale(1) opacity(0.4)' }}>
                  {char.emoji}
                </span>
                {!char.unlocked && (
                  <div
                    className="absolute -bottom-1 flex items-center gap-0.5 px-1.5 rounded-full"
                    style={{ background: '#FF9600', fontSize: '9px', color: 'white', fontFamily: 'Nunito, sans-serif', fontWeight: 700 }}
                  >
                    🪙{char.cost}
                  </div>
                )}
                {char.unlocked && (
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#58CC02', fontSize: '10px', color: 'white' }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: char.unlocked ? '#333' : '#bbb', fontSize: '10px', textAlign: 'center' }}>
                {char.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Daily reward claim */}
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="w-full p-4 rounded-3xl flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, #FF86D0, #CE82FF)',
            boxShadow: '0 6px 20px rgba(255,134,208,0.4)',
            cursor: 'pointer',
          }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '40px' }}
          >
            🎁
          </motion.span>
          <div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: 'white', fontSize: '16px' }}>
              Spin the Reward Wheel!
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
              Win stars, coins & special badges! 🌟
            </div>
          </div>
          <div className="ml-auto w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <span style={{ color: 'white', fontSize: '20px' }}>▶</span>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
