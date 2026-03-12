import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mascot, SpeechBubble } from '../components/Mascot';
import { Confetti } from '../components/Confetti';

interface CountingQuestion {
  emoji: string;
  count: number;
  label: string;
  options: number[];
}

const QUESTIONS: CountingQuestion[] = [
  { emoji: '🍎', count: 4, label: 'apples', options: [3, 4, 5, 6] },
  { emoji: '⭐', count: 6, label: 'stars', options: [4, 5, 6, 7] },
  { emoji: '🐱', count: 3, label: 'cats', options: [2, 3, 4, 5] },
  { emoji: '🎈', count: 5, label: 'balloons', options: [3, 5, 6, 4] },
  { emoji: '🐸', count: 7, label: 'frogs', options: [5, 6, 7, 8] },
  { emoji: '🌸', count: 2, label: 'flowers', options: [1, 2, 3, 4] },
  { emoji: '🦋', count: 8, label: 'butterflies', options: [6, 7, 8, 9] },
];

const OPTION_COLORS = ['#FF9600', '#1CB0F6', '#58CC02', '#CE82FF'];

export default function CountingScreen() {
  const navigate = useNavigate();
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [tappedObjects, setTappedObjects] = useState<Set<number>>(new Set());

  const q = QUESTIONS[qIdx];
  const isLast = qIdx === QUESTIONS.length - 1;

  const handleObjectTap = (i: number) => {
    if (answered) return;
    setTappedObjects(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleAnswer = (num: number) => {
    if (answered) return;
    setSelected(num);
    setAnswered(true);
    if (num === q.count) {
      setScore(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2500);
    }
  };

  const handleNext = () => {
    if (isLast) {
      navigate('/home');
      return;
    }
    setQIdx(i => i + 1);
    setSelected(null);
    setAnswered(false);
    setTappedObjects(new Set());
  };

  const isCorrect = selected === q.count;

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #F5F0FF 100%)' }}
    >
      <Confetti active={confetti} />

      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{ background: 'linear-gradient(135deg, #FF86D0 0%, #CE82FF 100%)', borderRadius: '0 0 28px 28px' }}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', borderRadius: '12px', padding: '8px 12px', color: 'white', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px' }}
          >
            ← Back
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.25)' }}>
            <span style={{ fontSize: '18px' }}>🏆</span>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: 'white', fontSize: '16px' }}>{score}</span>
          </div>
        </div>
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '26px', color: 'white' }}>🧮 Counting Game!</div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
          Count the objects and pick the right number!
        </div>
        <div className="flex gap-2 mt-3">
          {QUESTIONS.map((_, i) => (
            <div key={i} className="flex-1 h-2 rounded-full" style={{ background: i < qIdx ? '#FFD900' : i === qIdx ? 'white' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-5 pb-6 overflow-y-auto">
        {/* Mascot */}
        <div className="flex items-end gap-3 mb-4 self-start">
          <Mascot size={60} expression={answered ? (isCorrect ? 'excited' : 'sad') : 'happy'} float={!answered} />
          <SpeechBubble
            text={answered ? (isCorrect ? 'Amazing! 🌟' : `It was ${q.count}! 🤓`) : `How many ${q.label}?`}
            position="right"
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-3xl p-5 mb-5 text-center"
            style={{ background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          >
            <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '20px', color: '#555', marginBottom: '12px' }}>
              How many {q.label}? 👀
            </div>

            {/* Tappable objects */}
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: q.count }, (_, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.8 }}
                  animate={tappedObjects.has(i) ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
                  onClick={() => handleObjectTap(i)}
                  className="flex items-center justify-center rounded-2xl"
                  style={{
                    fontSize: '40px',
                    background: tappedObjects.has(i) ? 'rgba(255,134,208,0.15)' : 'transparent',
                    border: tappedObjects.has(i) ? '2px solid #FF86D0' : '2px solid transparent',
                    width: '56px',
                    height: '56px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {q.emoji}
                </motion.button>
              ))}
            </div>

            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#bbb', fontSize: '12px', marginTop: '10px' }}>
              Tap them to count! ({tappedObjects.size} tapped)
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer buttons */}
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#666', fontSize: '15px', textAlign: 'center', marginBottom: '12px' }}>
          Pick the right number! 👇
        </div>
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((num, i) => {
            let style: React.CSSProperties = {
              background: OPTION_COLORS[i % OPTION_COLORS.length],
              boxShadow: `0 6px 0 ${OPTION_COLORS[i % OPTION_COLORS.length]}99`,
            };
            if (answered) {
              if (num === q.count) {
                style = { background: '#58CC02', boxShadow: '0 6px 0 #2E9900' };
              } else if (num === selected) {
                style = { background: '#FF4B4B', boxShadow: '0 6px 0 #CC1B1B' };
              } else {
                style = { background: '#ddd', boxShadow: '0 4px 0 #bbb', opacity: 0.5 };
              }
            }

            return (
              <motion.button
                key={num}
                whileTap={!answered ? { scale: 0.92, y: 4 } : {}}
                whileHover={!answered ? { scale: 1.03 } : {}}
                onClick={() => handleAnswer(num)}
                className="py-5 rounded-3xl flex items-center justify-center gap-2"
                style={{
                  ...style,
                  border: 'none',
                  cursor: answered ? 'default' : 'pointer',
                  minHeight: '72px',
                }}
              >
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '32px', color: 'white' }}>
                  {num}
                </span>
                {answered && num === q.count && <span style={{ color: 'white', fontSize: '20px' }}>✓</span>}
                {answered && num === selected && num !== q.count && <span style={{ color: 'white', fontSize: '20px' }}>✗</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Next button */}
        <AnimatePresence>
          {answered && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-5 w-full py-4 rounded-2xl"
              style={{
                background: isCorrect ? 'linear-gradient(135deg, #58CC02, #2E9900)' : 'linear-gradient(135deg, #FF9600, #FF5A36)',
                color: 'white',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isCorrect ? '0 6px 0 #1E6B00' : '0 6px 0 #CC3A10',
              }}
            >
              {isLast ? '🏠 Go Home!' : '▶ Next!'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
