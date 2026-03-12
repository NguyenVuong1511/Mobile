import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = ['#FF9600', '#58CC02', '#1CB0F6', '#CE82FF', '#FF86D0', '#FFD900', '#FF4B4B'];
const SHAPES = ['circle', 'rect', 'star'];

interface Piece {
  id: number;
  x: number;
  color: string;
  shape: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1.5,
    size: 8 + Math.random() * 10,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 80,
  }));
}

interface ConfettiProps {
  active: boolean;
  count?: number;
}

export function Confetti({ active, count = 40 }: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(generatePieces(count));
    }
  }, [active, count]);

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: piece.rotation, scale: 1 }}
              animate={{
                y: 900,
                x: `calc(${piece.x}vw + ${piece.drift}px)`,
                opacity: [1, 1, 0],
                rotate: piece.rotation + 360 * 2,
              }}
              transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeIn' }}
              style={{
                position: 'absolute',
                top: 0,
                width: piece.size,
                height: piece.shape === 'circle' ? piece.size : piece.size * 0.6,
                background: piece.color,
                borderRadius: piece.shape === 'circle' ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
