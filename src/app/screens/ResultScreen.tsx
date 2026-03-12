import { useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mascot } from '../components/Mascot';
import { StarRating } from '../components/StarRating';
import { Confetti } from '../components/Confetti';

interface ResultState {
  stars: number;
  accuracy: number;
  correctCount: number;
  total: number;
  lessonId: string;
  lessonTitle: string;
}

const MESSAGES = [
  { min: 80, emoji: '🏆', text: 'AMAZING!', sub: "You're a Math Superstar! 🌟", color: '#FFD900' },
  { min: 60, emoji: '🎉', text: 'GREAT JOB!', sub: "Keep practicing to get 3 stars! 💪", color: '#58CC02' },
  { min: 0, emoji: '💪', text: 'KEEP GOING!', sub: "Practice makes perfect! Try again!", color: '#1CB0F6' },
];

export default function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  const stars = state?.stars ?? 2;
  const accuracy = state?.accuracy ?? 75;
  const correctCount = state?.correctCount ?? 3;
  const total = state?.total ?? 5;
  const lessonId = state?.lessonId ?? 'addition';
  const lessonTitle = state?.lessonTitle ?? 'Addition';

  const msg = MESSAGES.find(m => accuracy >= m.min) || MESSAGES[MESSAGES.length - 1];
  const xpEarned = stars * 20;
  const coinsEarned = stars * 5;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      style={{
        background: stars === 3
          ? 'linear-gradient(160deg, #FFD900 0%, #FF9600 50%, #FF5A36 100%)'
          : stars === 2
          ? 'linear-gradient(160deg, #58CC02 0%, #1CB0F6 100%)'
          : 'linear-gradient(160deg, #1CB0F6 0%, #4B73E0 100%)',
      }}
    >
      <Confetti active={stars >= 2} count={stars === 3 ? 60 : 30} />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
      <div className="absolute top-32 -left-20 w-64 h-64 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

      {/* Content */}
      <div className="flex flex-col items-center px-6 pt-14 pb-8 w-full h-full overflow-y-auto">
        {/* Mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <Mascot size={110} expression={stars === 3 ? 'excited' : stars === 2 ? 'happy' : 'sad'} bounce={stars === 3} />
        </motion.div>

        {/* Result text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-3"
        >
          <div style={{ fontSize: '48px' }}>{msg.emoji}</div>
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '38px', color: 'white', textShadow: '0 3px 15px rgba(0,0,0,0.2)' }}>
            {msg.text}
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '4px' }}>
            {msg.sub}
          </div>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="mt-5"
        >
          <StarRating stars={stars} size={44} animate />
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full mt-6 rounded-3xl p-5"
          style={{ background: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
        >
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '16px', textAlign: 'center', marginBottom: '16px' }}>
            📊 {lessonTitle} Results
          </div>

          {/* Score bars */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '13px' }}>
                  ✅ Correct Answers
                </span>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#58CC02', fontSize: '13px' }}>
                  {correctCount}/{total}
                </span>
              </div>
              <div className="h-3 rounded-full" style={{ background: '#eee' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #58CC02, #3A9E00)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(correctCount / total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#555', fontSize: '13px' }}>
                  🎯 Accuracy
                </span>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#1CB0F6', fontSize: '13px' }}>
                  {accuracy}%
                </span>
              </div>
              <div className="h-3 rounded-full" style={{ background: '#eee' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #1CB0F6, #4B73E0)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </div>
            </div>
          </div>

          {/* Rewards earned */}
          <div className="flex gap-3 mt-5">
            <div
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #FFD900, #FF9600)' }}
            >
              <span style={{ fontSize: '20px' }}>⭐</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: 'white', fontSize: '18px' }}>+{stars * 5}</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #FF9600, #FF5A36)' }}
            >
              <span style={{ fontSize: '20px' }}>🪙</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: 'white', fontSize: '18px' }}>+{coinsEarned}</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #CE82FF, #9B51E0)' }}
            >
              <span style={{ fontSize: '20px' }}>⚡</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: 'white', fontSize: '18px' }}>+{xpEarned}</span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 w-full mt-5"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/exercise/${lessonId}`)}
            className="w-full py-4 rounded-2xl"
            style={{
              background: 'white',
              color: '#333',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: '17px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            }}
          >
            🔁 Try Again
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/lessons')}
            className="w-full py-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.25)',
              color: 'white',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: '17px',
              border: '3px solid rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
          >
            📚 Next Lesson
          </motion.button>

          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              padding: '8px',
              textDecoration: 'underline',
            }}
          >
            🏠 Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
