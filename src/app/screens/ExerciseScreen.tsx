import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mascot, SpeechBubble } from '../components/Mascot';
import { useGame } from '../context/GameContext';
import { lessons, getLessonById } from '../data/lessons';

const ANSWER_COLORS = [
  { bg: '#FF9600', shadow: '#CC6600', border: '#E68600' },
  { bg: '#1CB0F6', shadow: '#1080C0', border: '#10A0E0' },
  { bg: '#CE82FF', shadow: '#9B51E0', border: '#B870EE' },
  { bg: '#FF86D0', shadow: '#CC3A90', border: '#EE70BC' },
];

type AnswerState = 'idle' | 'correct' | 'wrong';

export default function ExerciseScreen() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson } = useGame();

  const lesson = getLessonById(lessonId || 'numbers') || lessons[0];
  const questions = lesson.questions;

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mascotExpr, setMascotExpr] = useState<'happy' | 'excited' | 'sad' | 'thinking'>('happy');

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleAnswer = (idx: number) => {
    if (answerState !== 'idle') return;
    setSelected(idx);
    const correct = idx === question.correct;
    setAnswerState(correct ? 'correct' : 'wrong');
    setMascotExpr(correct ? 'excited' : 'sad');
    if (correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      const accuracy = Math.round((correctCount / questions.length) * 100);
      const stars = accuracy >= 80 ? 3 : accuracy >= 60 ? 2 : 1;
      completeLesson(lesson.id, stars, accuracy);
      navigate('/result', { state: { stars, accuracy, correctCount, total: questions.length, lessonId: lesson.id, lessonTitle: lesson.title } });
      return;
    }
    setCurrentQ(q => q + 1);
    setSelected(null);
    setAnswerState('idle');
    setShowHint(false);
    setMascotExpr('happy');
  };

  const handleQuit = () => navigate('/lessons');

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: lesson.bgGradient }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button
          onClick={handleQuit}
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', fontSize: '18px' }}
        >
          ✕
        </button>

        {/* Progress dots */}
        <div className="flex-1 flex items-center gap-1.5">
          {questions.map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-3 rounded-full"
              animate={{
                background: i < currentQ
                  ? '#58CC02'
                  : i === currentQ
                  ? lesson.color
                  : '#E0E0E0',
              }}
              style={{ minWidth: 0 }}
            />
          ))}
        </div>

        {/* Sound icon */}
        <button
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', fontSize: '20px' }}
        >
          🔊
        </button>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col px-5 pb-4 overflow-y-auto">
        {/* Lesson badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="px-3 py-1.5 rounded-2xl flex items-center gap-2"
            style={{ background: lesson.gradient, display: 'inline-flex' }}
          >
            <span style={{ fontSize: '16px' }}>{lesson.emoji}</span>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '13px' }}>
              {lesson.title}
            </span>
          </div>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '13px' }}>
            {currentQ + 1} / {questions.length}
          </span>
        </div>

        {/* Mascot + hint */}
        <div className="flex items-end gap-3 mb-5">
          <motion.div
            key={answerState}
            animate={answerState === 'correct' ? { scale: [1, 1.2, 1] } : answerState === 'wrong' ? { x: [-5, 5, -5, 0] } : {}}
          >
            <Mascot
              size={70}
              expression={mascotExpr}
              float={answerState === 'idle'}
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {answerState === 'idle' && showHint && (
              <motion.div key="hint" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <SpeechBubble text={question.hint || 'You can do it! 💪'} position="right" />
              </motion.div>
            )}
            {answerState === 'correct' && (
              <motion.div key="correct" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <SpeechBubble text="Great job! 🎉🌟" position="right" />
              </motion.div>
            )}
            {answerState === 'wrong' && (
              <motion.div key="wrong" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <SpeechBubble text="Try again! 💪" position="right" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question card */}
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 mb-5 text-center"
          style={{ background: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
        >
          <div
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: '26px',
              color: '#333',
              marginBottom: '8px',
            }}
          >
            {question.question}
          </div>
          {question.emoji && (
            <div style={{ fontSize: '28px', letterSpacing: '2px' }}>{question.emoji}</div>
          )}
        </motion.div>

        {/* Answer buttons */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} className="grid grid-cols-2 gap-3">
            {question.options.map((option, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === question.correct;
              let btnStyle: React.CSSProperties = {
                background: ANSWER_COLORS[idx].bg,
                boxShadow: `0 6px 0 ${ANSWER_COLORS[idx].shadow}`,
                border: `3px solid ${ANSWER_COLORS[idx].border}`,
              };
              if (answerState !== 'idle') {
                if (isCorrect) {
                  btnStyle = { background: '#58CC02', boxShadow: '0 6px 0 #2E9900', border: '3px solid #46A602' };
                } else if (isSelected && !isCorrect) {
                  btnStyle = { background: '#FF4B4B', boxShadow: '0 6px 0 #CC1B1B', border: '3px solid #EE3030' };
                } else {
                  btnStyle = { background: '#ddd', boxShadow: '0 6px 0 #bbb', border: '3px solid #ccc', opacity: 0.5 };
                }
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.07 }}
                  whileTap={answerState === 'idle' ? { scale: 0.93, y: 4 } : {}}
                  onClick={() => handleAnswer(idx)}
                  className="py-5 rounded-3xl flex flex-col items-center gap-1"
                  style={{
                    ...btnStyle,
                    cursor: answerState === 'idle' ? 'pointer' : 'default',
                    border: 'none',
                    transition: 'all 0.2s',
                    minHeight: '80px',
                  }}
                >
                  {answerState !== 'idle' && isCorrect && (
                    <span style={{ fontSize: '18px' }}>✓</span>
                  )}
                  {answerState !== 'idle' && isSelected && !isCorrect && (
                    <span style={{ fontSize: '18px' }}>✗</span>
                  )}
                  <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '24px', color: 'white' }}>
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Hint button */}
        {answerState === 'idle' && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-4 mx-auto flex items-center gap-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '16px' }}>💡</span>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#aaa', fontSize: '13px', textDecoration: 'underline' }}>
              Show hint
            </span>
          </button>
        )}

        {/* Next / Continue button */}
        <AnimatePresence>
          {answerState !== 'idle' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-5 w-full py-4 rounded-2xl"
              style={{
                background: answerState === 'correct' ? 'linear-gradient(135deg, #58CC02, #2E9900)' : 'linear-gradient(135deg, #FF9600, #FF5A36)',
                color: 'white',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: answerState === 'correct' ? '0 6px 0 #1E6B00' : '0 6px 0 #CC3A10',
              }}
            >
              {isLast ? '🏁 See Results!' : (answerState === 'correct' ? '▶ Next Question' : '▶ Continue')}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}