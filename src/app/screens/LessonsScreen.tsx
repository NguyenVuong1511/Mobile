import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { StarRating } from '../components/StarRating';
import { useGame } from '../context/GameContext';
import { lessons } from '../data/lessons';

export default function LessonsScreen() {
  const navigate = useNavigate();
  const { lessonProgress } = useGame();

  const isUnlocked = (lessonId: string): boolean => {
    if (lessonId === 'numbers' || lessonId === 'counting') return true;
    if (lessonId === 'addition') return lessonProgress['numbers']?.completed ?? false;
    if (lessonId === 'subtraction') return lessonProgress['addition']?.completed ?? false;
    if (lessonId === 'compare') return lessonProgress['numbers']?.completed ?? false;
    return false;
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(160deg, #E8FFD5 0%, #F5F9FF 100%)' }}>
      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{ background: 'linear-gradient(135deg, #58CC02 0%, #2E9900 100%)', borderRadius: '0 0 32px 32px' }}
      >
        <button
          onClick={() => navigate('/home')}
          className="mb-3 flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '20px', color: 'white' }}>←</span>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
            Home
          </span>
        </button>

        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '30px', color: 'white' }}>
          📚 Choose a Lesson!
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '4px' }}>
          Pick what you want to learn today
        </div>
      </div>

      {/* Lessons grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 grid grid-cols-1 gap-4">
        {lessons.map((lesson, i) => {
          const progress = lessonProgress[lesson.id];
          const unlocked = isUnlocked(lesson.id);
          const completed = progress?.completed;

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={unlocked ? { scale: 0.97 } : {}}
              onClick={() => unlocked && navigate(`/exercise/${lesson.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-3xl text-left"
              style={{
                background: unlocked ? 'white' : '#f0f0f0',
                boxShadow: unlocked ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                border: completed ? `3px solid ${lesson.color}` : '3px solid transparent',
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.6,
              }}
            >
              {/* Lesson icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: unlocked ? lesson.gradient : '#ddd',
                  boxShadow: unlocked ? `0 4px 12px ${lesson.color}40` : 'none',
                }}
              >
                <span style={{ fontSize: '32px' }}>{unlocked ? lesson.emoji : '🔒'}</span>
              </div>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#333', fontSize: '16px' }}>
                  {lesson.title}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#aaa', fontSize: '12px', marginTop: '2px' }}>
                  {unlocked ? lesson.description : 'Complete previous lesson to unlock!'}
                </div>

                {/* Difficulty stars */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 3 }, (_, j) => (
                      <span key={j} style={{ fontSize: '12px', opacity: j < lesson.difficulty ? 1 : 0.25 }}>⭐</span>
                    ))}
                  </div>
                  {completed && progress.stars > 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: '#E8FFD5' }}>
                      <span style={{ fontSize: '10px' }}>✓</span>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#58CC02', fontSize: '10px' }}>
                        {progress.accuracy}% accuracy
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {completed && (
                  <div className="mt-2 h-2 rounded-full w-full" style={{ background: '#eee' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${progress.accuracy}%`, background: lesson.gradient }}
                    />
                  </div>
                )}
              </div>

              {/* Stars earned */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                {completed ? (
                  <>
                    <StarRating stars={progress.stars} size={16} />
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '11px' }}>
                      {progress.stars}/3
                    </span>
                  </>
                ) : unlocked ? (
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: lesson.gradient }}
                  >
                    <span style={{ color: 'white', fontSize: '18px' }}>▶</span>
                  </div>
                ) : (
                  <span style={{ fontSize: '24px' }}>🔒</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
