import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { StarRating } from '../components/StarRating';
import { useGame } from '../context/GameContext';
import { lessons } from '../data/lessons';
import { RadialBarChart, RadialBar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WEEKLY_DATA = [
  { day: 'Mon', questions: 8 },
  { day: 'Tue', questions: 12 },
  { day: 'Wed', questions: 5 },
  { day: 'Thu', questions: 15 },
  { day: 'Fri', questions: 10 },
  { day: 'Sat', questions: 18 },
  { day: 'Sun', questions: 7 },
];

export default function ProgressScreen() {
  const navigate = useNavigate();
  const { stars, coins, streak, level, xp, playerName, lessonProgress } = useGame();

  const completedLessons = Object.values(lessonProgress).filter(l => l.completed);
  const totalLessons = Object.keys(lessonProgress).length;
  const avgAccuracy = completedLessons.length > 0
    ? Math.round(completedLessons.reduce((s, l) => s + l.accuracy, 0) / completedLessons.length)
    : 0;
  const totalStarsEarned = completedLessons.reduce((s, l) => s + l.stars, 0);
  const maxStars = totalLessons * 3;
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  const xpForLevel = (level - 1) * 100;
  const xpNext = level * 100;
  const xpProgress = Math.round(((xp - xpForLevel) / (xpNext - xpForLevel)) * 100);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(160deg, #F0EBFF 0%, #EEF5FF 100%)' }}>
      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{ background: 'linear-gradient(135deg, #CE82FF 0%, #4B73E0 100%)', borderRadius: '0 0 32px 32px' }}
      >
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '28px', color: 'white', marginBottom: '4px' }}>
          📈 My Progress
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
          Keep it up, {playerName}! You're doing great!
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: '🔥 Streak', value: `${streak}d` },
            { label: '⭐ Stars', value: stars },
            { label: '🪙 Coins', value: coins },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center py-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '22px', color: 'white' }}>{stat.value}</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-4">
        {/* Level progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px' }}>
              ⚡ Level Progress
            </div>
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFD900, #FF9600)', fontFamily: 'Fredoka One, sans-serif', fontSize: '18px', color: 'white' }}
            >
              {level}
            </div>
          </div>
          <div className="h-4 rounded-full" style={{ background: '#eee' }}>
            <motion.div
              className="h-full rounded-full flex items-center justify-end pr-2"
              style={{ background: 'linear-gradient(90deg, #CE82FF, #4B73E0)' }}
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
            </motion.div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#aaa', fontSize: '11px' }}>{xp} XP</span>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#aaa', fontSize: '11px' }}>{xpNext} XP</span>
          </div>
        </motion.div>

        {/* Accuracy + completion card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div
            className="rounded-3xl p-4 flex flex-col items-center"
            style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>🎯</div>
            <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '32px', color: '#1CB0F6' }}>{avgAccuracy}%</div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '11px', textAlign: 'center' }}>Avg Accuracy</div>
          </div>
          <div
            className="rounded-3xl p-4 flex flex-col items-center"
            style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>📚</div>
            <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '32px', color: '#58CC02' }}>
              {completedLessons.length}/{totalLessons}
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '11px', textAlign: 'center' }}>
              Lessons Done
            </div>
          </div>
        </motion.div>

        {/* Stars collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px' }}>⭐ Star Collection</div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#FF9600', fontSize: '15px' }}>
              {totalStarsEarned} / {maxStars}
            </div>
          </div>
          <div className="h-4 rounded-full" style={{ background: '#eee' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FFD900, #FF9600)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(totalStarsEarned / maxStars) * 100}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {Array.from({ length: maxStars }, (_, i) => (
              <span key={i} style={{ fontSize: '18px', opacity: i < totalStarsEarned ? 1 : 0.2 }}>⭐</span>
            ))}
          </div>
        </motion.div>

        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px', marginBottom: '12px' }}>
            📆 This Week's Activity
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={WEEKLY_DATA}>
              <defs>
                <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CE82FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#CE82FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontFamily: 'Nunito', fontWeight: 700, borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="questions" stroke="#CE82FF" strokeWidth={3} fill="url(#weekGrad)" dot={{ fill: '#CE82FF', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Lesson breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl p-4"
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '15px', marginBottom: '12px' }}>
            📋 Lesson Breakdown
          </div>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => {
              const prog = lessonProgress[lesson.id];
              return (
                <div key={lesson.id} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: lesson.gradient }}
                  >
                    <span style={{ fontSize: '20px' }}>{lesson.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#333', fontSize: '13px' }}>{lesson.title}</span>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '12px' }}>
                        {prog?.completed ? `${prog.accuracy}%` : '—'}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ background: '#eee' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: lesson.gradient }}
                        initial={{ width: 0 }}
                        animate={{ width: prog?.completed ? `${prog.accuracy}%` : '0%' }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  {prog?.completed ? (
                    <StarRating stars={prog.stars} size={12} />
                  ) : (
                    <span style={{ fontSize: '16px', opacity: 0.4 }}>🔒</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
