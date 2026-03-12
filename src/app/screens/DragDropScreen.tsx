import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mascot, SpeechBubble } from '../components/Mascot';
import { Confetti } from '../components/Confetti';

interface Puzzle {
  question: string;
  emoji: string;
  answer: number;
  options: number[];
}

const PUZZLES: Puzzle[] = [
  { question: '2 + 3 = ?', emoji: '🍎🍎 + 🍎🍎🍎', answer: 5, options: [3, 5, 7, 4] },
  { question: '4 + 2 = ?', emoji: '⭐⭐⭐⭐ + ⭐⭐', answer: 6, options: [5, 8, 6, 3] },
  { question: '1 + 4 = ?', emoji: '🌸 + 🌸🌸🌸🌸', answer: 5, options: [4, 5, 6, 7] },
  { question: '3 + 3 = ?', emoji: '🎈🎈🎈 + 🎈🎈🎈', answer: 6, options: [5, 7, 6, 4] },
  { question: '5 + 1 = ?', emoji: '🐠🐠🐠🐠🐠 + 🐠', answer: 6, options: [6, 5, 7, 8] },
];

const BUBBLE_COLORS = ['#1CB0F6', '#FF9600', '#58CC02', '#CE82FF'];

export default function DragDropScreen() {
  const navigate = useNavigate();
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [droppedAnswer, setDroppedAnswer] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [confetti, setConfetti] = useState(false);
  const [draggingNum, setDraggingNum] = useState<number | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const puzzle = PUZZLES[puzzleIdx];
  const isLast = puzzleIdx === PUZZLES.length - 1;

  // Motion drag approach
  const handleDragEnd = (num: number, info: { point: { x: number; y: number } }) => {
    if (!dropRef.current) return;
    const rect = dropRef.current.getBoundingClientRect();
    const { x, y } = info.point;
    const isInDrop = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (isInDrop) {
      setDroppedAnswer(num);
      setDraggingNum(null);
      if (num === puzzle.answer) {
        setResult('correct');
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      } else {
        setResult('wrong');
        setTimeout(() => {
          setDroppedAnswer(null);
          setResult('idle');
        }, 1500);
      }
    } else {
      setDraggingNum(null);
    }
  };

  const handleNext = () => {
    if (isLast) {
      navigate('/home');
      return;
    }
    setPuzzleIdx(i => i + 1);
    setDroppedAnswer(null);
    setResult('idle');
    setDraggingNum(null);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #E3F8FF 0%, #EEF5FF 100%)' }}
    >
      <Confetti active={confetti} />

      {/* Header */}
      <div
        className="px-5 pt-10 pb-5"
        style={{ background: 'linear-gradient(135deg, #1CB0F6 0%, #4B73E0 100%)', borderRadius: '0 0 28px 28px' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', borderRadius: '12px', padding: '8px 12px' }}
          >
            <span style={{ color: 'white', fontSize: '16px' }}>← Back</span>
          </button>
        </div>
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '26px', color: 'white' }}>
          🎮 Drag & Drop!
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
          Drag the right answer to the box!
        </div>

        {/* Progress */}
        <div className="flex gap-2 mt-3">
          {PUZZLES.map((_, i) => (
            <div key={i} className="flex-1 h-2 rounded-full" style={{ background: i <= puzzleIdx ? '#FFD900' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-6 pb-6 overflow-y-auto">
        {/* Mascot */}
        <div className="flex items-end gap-3 mb-6 self-start">
          <Mascot size={65} expression={result === 'correct' ? 'excited' : result === 'wrong' ? 'sad' : 'thinking'} float={result === 'idle'} />
          <SpeechBubble
            text={result === 'correct' ? 'Perfect! 🎉' : result === 'wrong' ? 'Oops! Try another! 🤔' : 'Drag the number here! 👇'}
            position="right"
          />
        </div>

        {/* Problem card */}
        <motion.div
          key={puzzleIdx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-3xl p-6 text-center mb-6"
          style={{ background: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
        >
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '36px', color: '#333', marginBottom: '8px' }}>
            {puzzle.question}
          </div>
          <div style={{ fontSize: '26px' }}>{puzzle.emoji}</div>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          ref={dropRef}
          animate={dragOver ? { scale: 1.05 } : { scale: 1 }}
          onDragOver={() => setDragOver(true)}
          onDragLeave={() => setDragOver(false)}
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-8"
          style={{
            background: result === 'correct'
              ? 'linear-gradient(135deg, #58CC02, #2E9900)'
              : result === 'wrong'
              ? 'linear-gradient(135deg, #FF4B4B, #CC1B1B)'
              : dragOver
              ? 'rgba(28,176,246,0.2)'
              : 'rgba(0,0,0,0.05)',
            border: `4px dashed ${result === 'correct' ? '#58CC02' : result === 'wrong' ? '#FF4B4B' : dragOver ? '#1CB0F6' : '#ccc'}`,
            boxShadow: dragOver ? '0 0 30px rgba(28,176,246,0.3)' : 'none',
          }}
        >
          {droppedAnswer !== null ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '48px', color: 'white' }}
            >
              {droppedAnswer}
            </motion.div>
          ) : (
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#bbb', fontSize: '14px', textAlign: 'center' }}>
              Drop answer here!
            </div>
          )}
        </motion.div>

        {/* Draggable bubbles */}
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Drag a number ☝️
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {puzzle.options.map((num, i) => {
            const isDragging = draggingNum === num;
            const isUsed = droppedAnswer === num;
            return (
              <motion.div
                key={`${puzzleIdx}-${i}`}
                drag
                dragSnapToOrigin
                dragElastic={0.5}
                onDragStart={() => setDraggingNum(num)}
                onDragEnd={(_, info) => handleDragEnd(num, info)}
                whileDrag={{ scale: 1.2, zIndex: 50 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: isUsed ? '#ddd' : BUBBLE_COLORS[i % BUBBLE_COLORS.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isUsed ? 'default' : 'grab',
                  boxShadow: isUsed ? 'none' : `0 6px 0 ${BUBBLE_COLORS[i % BUBBLE_COLORS.length]}80`,
                  opacity: isUsed ? 0.4 : 1,
                  userSelect: 'none',
                  position: 'relative',
                  zIndex: isDragging ? 50 : 1,
                }}
              >
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '32px', color: 'white' }}>
                  {num}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Next button */}
        <AnimatePresence>
          {result === 'correct' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-6 px-8 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #58CC02, #2E9900)',
                color: 'white',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 0 #1E6B00',
              }}
            >
              {isLast ? '🏠 Go Home' : '▶ Next Puzzle!'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
