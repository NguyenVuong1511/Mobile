import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { StarRating } from '../components/StarRating';
import { Mascot } from '../components/Mascot';
import { useGame } from '../context/GameContext';
import { lessons } from '../data/lessons';

const AVATARS = ['🦊', '🐼', '🐱', '🐸'];
const AVATAR_BG = ['#FF9600', '#4B73E0', '#CE82FF', '#58CC02'];

const SETTINGS = [
  { emoji: '🔔', label: 'Notifications', value: true },
  { emoji: '🔊', label: 'Sound Effects', value: true },
  { emoji: '🎵', label: 'Background Music', value: false },
  { emoji: '🌙', label: 'Dark Mode', value: false },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { playerName, playerAvatar, level, xp, stars, coins, streak, badges, lessonProgress } = useGame();
  const [settings, setSettings] = useState(SETTINGS.map(s => s.value));
  const [editing, setEditing] = useState(false);

  const xpForLevel = (level - 1) * 100;
  const xpNext = level * 100;
  const xpProgress = ((xp - xpForLevel) / (xpNext - xpForLevel)) * 100;

  const completedLessons = Object.values(lessonProgress).filter(l => l.completed);
  const totalStars = completedLessons.reduce((s, l) => s + l.stars, 0);
  const avgAccuracy = completedLessons.length > 0
    ? Math.round(completedLessons.reduce((s, l) => s + l.accuracy, 0) / completedLessons.length)
    : 0;

  const toggleSetting = (i: number) => setSettings(prev => prev.map((v, j) => j === i ? !v : v));

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #F0EBFF 100%)' }}>
      {/* Header */}
      <div
        className="px-5 pt-10 pb-6"
        style={{ background: 'linear-gradient(135deg, #FF86D0 0%, #CE82FF 100%)', borderRadius: '0 0 36px 36px' }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${AVATAR_BG[playerAvatar]}, ${AVATAR_BG[playerAvatar]}AA)`,
                fontSize: '52px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
              onClick={() => setEditing(true)}
            >
              {AVATARS[playerAvatar]}
            </motion.div>
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'white', fontSize: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              ✏️
            </div>
          </div>

          <div className="text-center">
            <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '28px', color: 'white' }}>
              {playerName}
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl mt-1"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <span style={{ fontSize: '14px' }}>⚡</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '13px' }}>
                Level {level} Math Explorer
              </span>
            </div>
          </div>

          {/* XP bar */}
          <div className="w-full">
            <div className="flex justify-between mb-1.5">
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>
                Level {level}
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>
                {xp}/{xpNext} XP
              </span>
            </div>
            <div className="h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FFD900, #FF9600)' }}
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-4">
        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '⭐', value: stars, label: 'Stars' },
            { emoji: '🪙', value: coins, label: 'Coins' },
            { emoji: '🔥', value: `${streak}d`, label: 'Streak' },
            { emoji: '🏅', value: badges.length, label: 'Badges' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center py-3 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            >
              <span style={{ fontSize: '22px' }}>{stat.emoji}</span>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '20px', color: '#333' }}>{stat.value}</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#aaa', fontSize: '10px' }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Achievement highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px', marginBottom: '12px' }}>
            📊 My Performance
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '13px' }}>
                🎯 Average Accuracy
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#1CB0F6', fontSize: '14px' }}>
                {avgAccuracy}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '13px' }}>
                📚 Lessons Completed
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#58CC02', fontSize: '14px' }}>
                {completedLessons.length} / {lessons.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '13px' }}>
                ⭐ Stars Collected
              </span>
              <div className="flex items-center gap-1">
                <StarRating stars={Math.min(totalStars, 3)} size={14} />
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#FF9600', fontSize: '14px' }}>
                  {totalStars}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mascot companion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl p-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #E3F8FF, #EEF5FF)', border: '2px solid #D0EDFF' }}
        >
          <Mascot size={60} expression="happy" float />
          <div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '14px' }}>
              🦉 Your Math Buddy
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#666', fontSize: '12px', marginTop: '2px' }}>
              "Keep learning every day and you'll be a Math Champion! 🏆"
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px', marginBottom: '12px' }}>
            ⚙️ Settings
          </div>
          <div className="flex flex-col gap-3">
            {SETTINGS.map((setting, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '20px' }}>{setting.emoji}</span>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '14px' }}>
                    {setting.label}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleSetting(i)}
                  className="w-12 h-7 rounded-full relative"
                  style={{ background: settings[i] ? '#58CC02' : '#ddd', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  <motion.div
                    className="absolute top-0.5 w-6 h-6 rounded-full bg-white"
                    style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                    animate={{ left: settings[i] ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logout / Switch user */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #FF4B4B, #CC1B1B)',
            color: 'white',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 900,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,75,75,0.3)',
          }}
        >
          🔄 Switch Player
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
